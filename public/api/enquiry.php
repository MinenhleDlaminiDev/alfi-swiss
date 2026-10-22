<?php
/* Enquiry endpoint — Infomaniak, production (ASP-67).
 *
 * The UAT twin of this file is netlify/functions/enquiry.mjs. Netlify cannot
 * run PHP and Infomaniak cannot run the function, so both exist and both must
 * behave identically — same payload, same status codes, same JSON. Change one,
 * change the other.
 *
 * Deployed because it sits in public/, which Vite copies into dist/ verbatim,
 * and GitHub Actions FTPs dist/ to the web root. It lands at /api/enquiry.php;
 * the .htaccess rewrite maps /api/enquiry onto it.
 *
 * ---- Where the key lives ----
 *
 * NOT in this file and not anywhere in the repository. Two sources, in order:
 *
 *   1. Environment variables, if Infomaniak is configured to pass them.
 *   2. A PHP config file ONE LEVEL ABOVE the web root — outside everything
 *      Apache can serve, so it cannot be fetched even if PHP stops executing.
 *      Upload it once by FTP; the deploy never touches it.
 *
 * The file should return an array:
 *
 *   <?php return [
 *     'RESEND_API_KEY' => 're_...',
 *     'ENQUIRY_TO'     => 'info@alfiswisspartners.com',
 *     'ENQUIRY_FROM'   => 'ALFI Swiss Partners <enquiries@alfiswisspartners.com>',
 *   ];
 */

declare(strict_types=1);

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const LIMIT_NAME = 100;
const LIMIT_EMAIL = 254;
const LIMIT_MESSAGE = 5000;

/** Send a JSON response and stop. */
function respond(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    // Same-origin form. Deliberately no Access-Control-Allow-Origin.
    header('Cache-Control: no-store');
    echo json_encode($body);
    exit;
}

function config(string $key): ?string
{
    static $file = null;

    $env = getenv($key);
    if (is_string($env) && $env !== '') {
        return $env;
    }

    if ($file === null) {
        // __DIR__ is <web root>/api, so this is one level above the web root.
        $path = __DIR__ . '/../../alfi-config.php';
        $file = is_readable($path) ? (require $path) : [];
        if (!is_array($file)) {
            $file = [];
        }
    }

    $value = $file[$key] ?? null;
    return (is_string($value) && $value !== '') ? $value : null;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw === false ? '' : $raw, true);
if (!is_array($body)) {
    respond(422, ['error' => 'invalid_payload']);
}

/* Casting straight to string would emit "Array to string conversion" on a
   payload like {"name":{"a":1}} — a warning printed before our headers, which
   would corrupt the response as well as leaking a file path. Anything that is
   not a scalar is simply not a name. */
function field(array $body, string $key): string
{
    $value = $body[$key] ?? '';
    return is_scalar($value) ? trim((string) $value) : '';
}

/* mb_strlen counts characters; strlen counts bytes, and an accented name in
   UTF-8 costs more bytes than letters. mbstring is present on Infomaniak, but
   a missing extension should not take the form down — the byte count is a
   stricter limit, never a looser one, so falling back is safe. */
function textLength(string $s): int
{
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

$name = field($body, 'name');
$email = field($body, 'email');
$message = field($body, 'message');
$honeypot = field($body, 'company');

/* The honeypot is a field no human can see or tab to. Anything in it came
   from something filling the form programmatically. Answer 200 and send
   nothing: an error would tell the sender what tripped it. */
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

$valid = $name !== ''
    && textLength($name) <= LIMIT_NAME
    && textLength($email) <= LIMIT_EMAIL
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
    && textLength($message) <= LIMIT_MESSAGE;

if (!$valid) {
    respond(422, ['error' => 'invalid_payload']);
}

$apiKey = config('RESEND_API_KEY');
$to = config('ENQUIRY_TO');
$from = config('ENQUIRY_FROM');

if ($apiKey === null || $to === null || $from === null) {
    // Names only — never the values.
    error_log('enquiry: RESEND_API_KEY, ENQUIRY_TO or ENQUIRY_FROM is not set');
    respond(500, ['error' => 'not_configured']);
}

$messageOrNone = $message !== '' ? $message : '(no message)';
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeMessage = htmlspecialchars($messageOrNone, ENT_QUOTES, 'UTF-8');

$payload = json_encode([
    'from' => $from,
    'to' => $to,
    /* The only header carrying user data, and it takes the address that has
       already passed FILTER_VALIDATE_EMAIL. */
    'reply_to' => $email,
    'subject' => 'Website enquiry — ' . $name,
    'text' => "Name: {$name}\nEmail: {$email}\n\n{$messageOrNone}",
    'html' => "<p><strong>Name:</strong> {$safeName}<br>"
        . "<strong>Email:</strong> {$safeEmail}</p>"
        . "<p style=\"white-space:pre-wrap\">{$safeMessage}</p>",
], JSON_UNESCAPED_UNICODE);

/* json_encode returns false on malformed UTF-8, and posting "" to Resend
   would read as an empty request rather than a failure. Fail here instead. */
if ($payload === false) {
    error_log('enquiry: could not encode payload: ' . json_last_error_msg());
    respond(422, ['error' => 'invalid_payload']);
}

$ch = curl_init(RESEND_ENDPOINT);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
]);

$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    error_log('enquiry: request to Resend failed: ' . $curlError);
    respond(502, ['error' => 'send_failed']);
}

if ($status < 200 || $status >= 300) {
    /* Logged for us, never returned: an upstream body can quote the request,
       and the request carries the key. */
    error_log('enquiry: Resend returned ' . $status . ' ' . (string) $response);
    respond(502, ['error' => 'send_failed']);
}

respond(200, ['ok' => true]);
