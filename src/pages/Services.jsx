import { hero } from '../content/services.js'

/* Services (ASP-02 route stub). Built out in ASP-0X. */
export default function Services() {
  return (
    <section className="band band--navy">
      <div className="wrap">
        <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 11, color: 'var(--c-gold)' }}>
          {hero.eyebrow}
        </p>
        <h1 style={{ marginTop: 16 }}>{hero.headingLines.join(' ')}</h1>
        <p style={{ marginTop: 20, maxWidth: 620, color: 'var(--c-on-dark-70)' }}>{hero.lead}</p>
      </div>
    </section>
  )
}
