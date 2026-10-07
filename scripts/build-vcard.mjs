/* vCard + QR pipeline (ASP-18).
 *
 * Generates the two artefacts the digital business card needs, both derived
 * from the single `card` object in src/content/contact.js:
 *
 *   public/<slug>.vcf       the downloadable contact file (vCard 3.0)
 *   public/<slug>-qr.svg    a QR whose payload is that same vCard text
 *
 * The QR encodes the vCard itself rather than a URL, so scanning saves the
 * contact with no network round-trip — it works from a printed page, on a
 * plane, or after the domain eventually moves.
 *
 * vCard 3.0, not 4.0: 3.0 is what iOS and Android both import without
 * complaint. 4.0 is the newer spec but support is still uneven on phones,
 * which is the only place this file is ever opened.
 *
 *   npm run vcard          rebuild
 *   node scripts/...       rebuild only if stale (used by predev)
 */
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import QRCode from 'qrcode'

const SOURCE = 'src/content/contact.js'
const OUT = 'public'
const FORCE = process.argv.includes('--force')

const { card } = await import('../src/content/contact.js')

const VCF = path.join(OUT, `${card.slug}.vcf`)
const QR = path.join(OUT, `${card.slug}-qr.svg`)

/* ---- Staleness check ----
 * Compare against the content file's mtime, and verify BOTH outputs exist.
 * Checking only one would leave a half-generated pair looking up to date —
 * the same trap ASP-12 hit when it trusted the manifest without checking the
 * derivatives behind it. */
function isStale() {
  if (FORCE) return true
  if (!existsSync(VCF) || !existsSync(QR)) return true
  /* This script is an input too: changing the vCard format or the QR settings
     must invalidate the outputs, or `npm run dev` keeps serving artefacts built
     by the previous version of the generator. */
  const newestInput = Math.max(
    statSync(SOURCE).mtimeMs,
    statSync(new URL(import.meta.url)).mtimeMs,
  )
  return statSync(VCF).mtimeMs < newestInput || statSync(QR).mtimeMs < newestInput
}

/* RFC 2426 §2.4.2: backslash, comma and semicolon are structural inside a
 * value and must be escaped, and newlines are written as a literal \n.
 * An unescaped semicolon in a street name would silently split the field. */
function esc(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function buildVCard(c) {
  const a = c.address
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    /* N is structured: family;given;additional;prefix;suffix */
    `N:${esc(c.lastName)};${esc(c.firstName)};;;`,
    `FN:${esc(c.name)}`,
    `ORG:${esc(c.org)}`,
    `TITLE:${esc(c.role)}`,
    ...c.phones.map(
      (p) => `TEL;TYPE=${p.kind === 'cell' ? 'CELL' : 'WORK,VOICE'}:${esc(p.tel)}`,
    ),
    `EMAIL;TYPE=INTERNET,WORK:${esc(c.email)}`,
    /* ADR is structured: pobox;extended;street;locality;region;postcode;country */
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};;${esc(a.postalCode)};${esc(a.country)}`,
    `URL:${esc(c.website)}`,
    'END:VCARD',
  ]
  /* vCard requires CRLF line endings (RFC 2426 §2.4.1). Some parsers tolerate
     LF; Outlook is not among them. Trailing CRLF terminates the final line. */
  return lines.join('\r\n') + '\r\n'
}

if (!isStale()) {
  console.log('vcard: up to date')
  process.exit(0)
}

await mkdir(OUT, { recursive: true })

const vcf = buildVCard(card)
await writeFile(VCF, vcf, 'utf8')

/* Error correction level M (~15% recoverable). Measured against this payload:
   L=67 modules, M=75, Q=87, H=99. L would let the code render ~11% smaller,
   which is not worth losing M's tolerance for print, glare and angled scans.

   margin: 4 is the spec-mandated quiet zone (ISO/IEC 18004). A narrower one
   often still decodes in software — jsQR read a 1-module margin here without
   complaint — but real phone cameras need the full border to find the symbol
   against a surrounding background. Do not trim it to save space. */
const qrSvg = await QRCode.toString(vcf, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
  color: { dark: '#0B1C33', light: '#FFFFFF' },
})
await writeFile(QR, qrSvg, 'utf8')

const sizeKb = (Buffer.byteLength(vcf) / 1024).toFixed(2)
console.log(`vcard: wrote ${VCF} (${sizeKb} kB) and ${QR}`)
