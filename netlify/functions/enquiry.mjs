/* Enquiry endpoint — Netlify, UAT (ASP-67).
 *
 * The production twin of this file is public/api/enquiry.php. Infomaniak runs
 * Apache and PHP and cannot run this; Netlify cannot run that. They must stay
 * behaviourally identical — same payload, same status codes, same JSON — or
 * UAT stops predicting production, which is the only reason UAT exists.
 * Change one, change the other.
 *
 * No SDK. Resend's REST API is one POST, and a dependency here would have to
 * be installed on Netlify and have no counterpart on the PHP side.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const LIMITS = { name: 100, email: 254, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      /* Same-origin form. Deliberately no Access-Control-Allow-Origin: a
         cross-site POST to this endpoint is not something to serve. */
      'Cache-Control': 'no-store',
    },
  })

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export default async function handler(req) {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' })

  let body
  try {
    body = await req.json()
  } catch {
    return json(422, { error: 'invalid_payload' })
  }

  const name = String(body?.name ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const message = String(body?.message ?? '').trim()
  const honeypot = String(body?.company ?? '').trim()

  /* The honeypot is a field no human can see or tab to. Anything in it came
     from something filling the form programmatically. Answer 200 and send
     nothing: an error would tell the sender what tripped it. */
  if (honeypot) return json(200, { ok: true })

  if (
    !name ||
    name.length > LIMITS.name ||
    !EMAIL_RE.test(email) ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return json(422, { error: 'invalid_payload' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO
  const from = process.env.ENQUIRY_FROM

  if (!apiKey || !to || !from) {
    /* Names only — never the values, and never which one was missing in a
       way that confirms the others exist. */
    console.error('enquiry: RESEND_API_KEY, ENQUIRY_TO or ENQUIRY_FROM is not set')
    return json(500, { error: 'not_configured' })
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message || '(no message)'),
  }

  let res
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        /* The only header carrying user data, and it takes the address that
           has already passed EMAIL_RE. Replying to the enquiry is the whole
           point of the message. */
        reply_to: email,
        subject: `Website enquiry — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message || '(no message)'}`,
        html:
          `<p><strong>Name:</strong> ${safe.name}<br>` +
          `<strong>Email:</strong> ${safe.email}</p>` +
          `<p style="white-space:pre-wrap">${safe.message}</p>`,
      }),
    })
  } catch (err) {
    console.error('enquiry: request to Resend failed:', err?.message)
    return json(502, { error: 'send_failed' })
  }

  if (!res.ok) {
    /* Logged for us, never returned: an upstream body can quote the request,
       and the request carries the key. */
    console.error('enquiry: Resend returned', res.status, await res.text().catch(() => ''))
    return json(502, { error: 'send_failed' })
  }

  return json(200, { ok: true })
}
