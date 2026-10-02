import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="band band--navy">
      <div className="wrap">
        <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 11, color: 'var(--c-gold)' }}>
          Error 404
        </p>
        <h1 style={{ marginTop: 16 }}>This page could not be found.</h1>
        <p style={{ marginTop: 20, maxWidth: 520, color: 'var(--c-on-dark-70)' }}>
          The page you requested does not exist or has been moved.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link to="/" style={{ color: 'var(--c-gold)', borderBottom: '1px solid currentColor', paddingBottom: 4 }}>
            Return home
          </Link>
        </p>
      </div>
    </section>
  )
}
