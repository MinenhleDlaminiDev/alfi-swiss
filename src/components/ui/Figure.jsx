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
 */
const DEFAULT_SIZES = '(max-width: 900px) 100vw, 560px'

export default function Figure({ slug, alt, ratio, sizes = DEFAULT_SIZES, priority = false }) {
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

  return (
    <div className="ui-figure" style={ratio ? { '--figure-ratio': ratio } : undefined}>
      <picture>
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
    </div>
  )
}
