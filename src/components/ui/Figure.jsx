import manifest from '../../content/image-manifest.json'
import './Figure.css'

/* Responsive image (ASP-12).
 *
 * Takes a slug (e.g. "home-positioning") rather than a path, looks its
 * intrinsic size up in the generated manifest, and emits WebP with a JPEG
 * fallback plus width/height so the browser reserves the right box before the
 * image arrives — no layout shift.
 *
 * `sizes` describes the CSS width of the slot so the browser can pick the
 * smallest adequate file. Default matches the two-column Split: full width on
 * mobile, half the 1180px wrap above it.
 *
 * Two opt-in treatments (ASP-28), both off by default so the figures on
 * About, Services, Philosophy and Contact are untouched:
 *
 *   live     — the image settles from 1.08 inside its frame on entry, and
 *              drifts within it as the section passes. The frame itself never
 *              moves or resizes, so neither costs a pixel of layout.
 *   caption  — an editorial label on the image. A photograph that says what
 *              it is carries information; one that does not is wallpaper.
 */
const DEFAULT_SIZES = '(max-width: 900px) 100vw, 560px'

export default function Figure({
  slug,
  alt,
  ratio,
  sizes = DEFAULT_SIZES,
  priority = false,
  live = false,
  caption,
}) {
  const meta = manifest[slug]

  if (!meta || !meta.widths?.length) {
    // Fail loudly in development rather than rendering a broken image.
    if (import.meta.env.DEV) {
      console.error(`Figure: "${slug}" missing or has no widths in src/content/image-manifest.json. Run: npm run images`)
    }
    return null
  }

  const srcset = (ext) =>
    meta.widths.map((w) => `/images/${slug}-${w}w.${ext} ${w}w`).join(', ')

  const fallbackWidth = meta.widths[meta.widths.length - 1]

  const picture = (
    <picture>
      {/* Order is the negotiation: the browser takes the FIRST type it
          understands, so AVIF must precede WebP or no one ever gets it.
          AVIF is roughly half the bytes at a quality indistinguishable from
          the WebP beside it (ASP-47); the JPEG on the <img> is the floor for
          anything that understands neither. */}
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/images/${slug}-${fallbackWidth}w.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        /* lowercase: React 18 does not recognise the camelCase `fetchPriority`
           (that landed in React 19) and warns on every render. Spread so the
           attribute is absent entirely unless it is actually wanted. */
        {...(priority ? { fetchpriority: 'high' } : {})}
        decoding="async"
      />
    </picture>
  )

  /* A real <figure>, so a real <figcaption> is allowed to be its child. An
     earlier attempt put the caption inside a <div> and the markup did not
     validate — figcaption is only meaningful as a direct child of figure. */
  return (
    <figure
      className={'ui-figure' + (live ? ' ui-figure--par ui-figure--live' : '')}
      style={ratio ? { '--figure-ratio': ratio } : undefined}
    >
      {/* The parallax wrapper is the only thing that moves. It exists solely
          to separate the drift (on the wrapper) from the entry settle (on the
          image), because one element cannot hold two transforms. */}
      {live ? <div className="ui-figure__par">{picture}</div> : picture}

      {caption && (
        <figcaption className="ui-figure__cap">
          <span className="ui-figure__cap-rule" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
