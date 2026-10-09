/* Image pipeline (ASP-12).
 *
 * Reads the licensed masters from assets/images/ and writes responsive,
 * modern-format derivatives into public/images/, plus a manifest of intrinsic
 * dimensions so <Figure> can reserve space and avoid layout shift.
 *
 * The manifest is written to src/content/ (not public/) so it is imported as a
 * module and not also copied verbatim into dist/.
 *
 * Masters are NOT shipped: only the generated derivatives land in public/.
 *
 *   npm run images          rebuild
 *   node scripts/...        rebuild only if stale (used by predev)
 */
import { mkdir, readdir, writeFile, rm } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets/images'
const OUT = 'public/images'
const MANIFEST = 'src/content/image-manifest.json'
/* Figure slots are at most ~590px CSS wide (half of the 1180px wrap), so 1200w
   already covers a 2x display. Anything larger is downloaded and never used. */
const WIDTHS = [480, 768, 1200]

/* Hero masters are the exception to the note above (ASP-26).
 *
 * A figure slot is at most ~590px CSS wide, so 1200w covers a 2x display and
 * anything larger is downloaded and never used. A hero is 100vw, so on a
 * 1440px screen at 2x it genuinely wants ~2880px, and capping it at 1200 would
 * show visibly soft. These get their own ladder.
 *
 * Matched by filename prefix rather than a list, so adding a fifth hero slide
 * needs no change here. */
const HERO_PREFIX = 'hero-'
const HERO_WIDTHS = [768, 1200, 1800, 2560, 3200]

/* Card masters are the exception in the other direction (ASP-31).
 *
 * A card in a four-across grid is about 270px CSS wide, so 560w already
 * covers a 2x display and the 1200w from the content ladder would be more
 * than four times the pixels the slot can ever use. With fifteen of them on
 * the site that difference is the whole page weight of a card page.
 *
 * Same prefix mechanism as the heroes, so adding a card needs no change here. */
const CARD_PREFIX = 'card-'
const CARD_WIDTHS = [320, 560, 720]

const widthsFor = (slug) => {
  if (slug.startsWith(HERO_PREFIX)) return HERO_WIDTHS
  if (slug.startsWith(CARD_PREFIX)) return CARD_WIDTHS
  return WIDTHS
}
const QUALITY = { webp: 76, jpeg: 80 }
const FORCE = process.argv.includes('--force')

if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}. Masters must live there; public/images is generated.`)
  process.exit(1)
}

await mkdir(OUT, { recursive: true })

const masters = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f))
if (masters.length === 0) {
  console.error(`No masters found in ${SRC}.`)
  process.exit(1)
}

/* ---- Staleness check ----
 * Must verify the DERIVATIVES exist, not just the manifest. public/images is
 * gitignored while the manifest is tracked, so a fresh clone or `git clean -fdX`
 * leaves a valid-looking manifest with no images behind it. */
if (!FORCE && existsSync(MANIFEST)) {
  const manifestTime = statSync(MANIFEST).mtimeMs
  const scriptTime = statSync(new URL(import.meta.url)).mtimeMs
  const sourcesNewer = masters.some((f) => statSync(path.join(SRC, f)).mtimeMs > manifestTime)

  let derivativesPresent = true
  try {
    const existing = JSON.parse(await (await import('node:fs/promises')).readFile(MANIFEST, 'utf8'))
    const slugs = Object.keys(existing)
    derivativesPresent =
      slugs.length === masters.length &&
      slugs.every((slug) =>
        (existing[slug].widths || []).every(
          (w) =>
            existsSync(path.join(OUT, `${slug}-${w}w.webp`)) &&
            existsSync(path.join(OUT, `${slug}-${w}w.jpg`)),
        ),
      )
  } catch {
    derivativesPresent = false
  }

  if (!sourcesNewer && scriptTime < manifestTime && derivativesPresent) {
    console.log(`Images up to date (${masters.length} masters). Use --force to rebuild.`)
    process.exit(0)
  }
}

/* ---- Generate ----
 * Write everything first and only then remove stale files and commit the
 * manifest, so a failure part-way leaves the previous set intact rather than
 * a site with no images at all. */
const manifest = {}
const written = new Set()
let totalIn = 0
let totalOut = 0

for (const file of masters) {
  const slug = file.replace(/\.[^.]+$/, '')
  const input = path.join(SRC, file)
  const meta = await sharp(input).metadata()
  totalIn += statSync(input).size

  const widths = widthsFor(slug).filter((w) => w <= meta.width)
  if (widths.length === 0) {
    // Narrower than the smallest target: emit it at its native width so the
    // manifest never carries an empty `widths` array.
    widths.push(meta.width)
  }

  const sizes = []
  for (const w of widths) {
    const webp = `${slug}-${w}w.webp`
    const jpg = `${slug}-${w}w.jpg`
    const a = await sharp(input).resize({ width: w }).webp({ quality: QUALITY.webp }).toFile(path.join(OUT, webp))
    const b = await sharp(input).resize({ width: w }).jpeg({ quality: QUALITY.jpeg, mozjpeg: true }).toFile(path.join(OUT, jpg))
    written.add(webp)
    written.add(jpg)
    totalOut += a.size + b.size
    sizes.push(a.size)
  }

  manifest[slug] = {
    width: meta.width,
    height: meta.height,
    aspect: +(meta.width / meta.height).toFixed(4),
    widths,
  }

  const kb = (n) => (n / 1024).toFixed(0) + 'KB'
  console.log(`${slug.padEnd(32)} ${meta.width}x${meta.height}  webp ${sizes.map(kb).join('/')}`)
}

// Remove derivatives from a previous run that are no longer produced.
for (const f of await readdir(OUT)) {
  if (/-\d+w\.(webp|jpg)$/.test(f) && !written.has(f)) {
    await rm(path.join(OUT, f))
    console.log(`removed stale ${f}`)
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

console.log(
  `\n${masters.length} images | masters ${(totalIn / 1048576).toFixed(1)}MB ` +
  `-> derivatives ${(totalOut / 1048576).toFixed(1)}MB`,
)
