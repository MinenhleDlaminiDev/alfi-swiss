import './Seal.css'

/* The ALFI seal. Shared by the header and footer.
   `animate` draws the outer ring on first paint; the animation is defined in
   Seal.css (not inline) so the reduced-motion rule can override it. */
export default function Seal({ size = 34, animate = false, title }) {
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
      <line x1="66" y1="66" x2="66" y2="14" stroke="var(--c-gold)" strokeWidth="2.4" />
      <path d="M66 40 L84 92 L74 92 L66 66 L58 92 L48 92 Z" fill="var(--c-cream)" />
      <circle cx="66" cy="66" r="3.4" fill="var(--c-gold)" />
    </svg>
  )
}
