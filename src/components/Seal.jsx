import './Seal.css'

/* The ALFI seal. Shared by the header, the footer and the page-hero
   watermark, so the geometry exists once and cannot drift between them.

   `animate` draws the outer ring on first paint.
   `sweep` adds a gold arc that travels continuously around the ring; it is
   only used by the watermark, at a size where it is legible as movement.

   Both animations are defined in Seal.css rather than inline, so the
   reduced-motion rules can override them — an inline `style` would win over
   any stylesheet declaration. */
export default function Seal({ size = 34, animate = false, sweep = false, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 132 132"
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle
        cx="66" cy="66" r="62"
        fill="none" stroke="var(--c-cream)" strokeWidth="2.2"
        className={animate ? 'seal__ring--draw' : undefined}
      />
      <circle cx="66" cy="66" r="53" fill="none" stroke="var(--c-cream)" strokeWidth="1" opacity="0.4" />
      {/* The travelling arc. Same radius as the outer ring, so it reads as
          something moving ALONG the ring rather than a second circle. The
          dash pattern leaves one visible segment of roughly a fifth of the
          circumference (2π × 62 ≈ 390) and hides the rest. */}
      {sweep && (
        <circle
          className="seal__sweep"
          cx="66" cy="66" r="62"
          fill="none" stroke="var(--c-gold)" strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="74 316"
        />
      )}
      <line x1="66" y1="66" x2="66" y2="14" stroke="var(--c-gold)" strokeWidth="2.4" />
      <path d="M66 40 L84 92 L74 92 L66 66 L58 92 L48 92 Z" fill="var(--c-cream)" />
      <circle cx="66" cy="66" r="3.4" fill="var(--c-gold)" />
    </svg>
  )
}
