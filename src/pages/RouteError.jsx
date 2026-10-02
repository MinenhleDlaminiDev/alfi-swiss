import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

/* Router error boundary (ASP-02 fix).
   Distinguishes a genuine 404 from a real render/loader failure, so an
   application error is not reported to the visitor as a missing page. */
export default function RouteError() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  const eyebrow = is404 ? 'Error 404' : 'Something went wrong'
  const heading = is404
    ? 'This page could not be found.'
    : 'This page could not be displayed.'
  const body = is404
    ? 'The page you requested does not exist or has been moved.'
    : 'An unexpected error occurred. Please try again, or return to the home page.'

  if (!is404 && error) {
    // Surface the real cause for diagnosis without showing it to the visitor.
    console.error('Route error:', error)
  }

  return (
    <section className="ui-section ui-section--navy">
      <div className="wrap">
        <p className="ui-eyebrow ui-eyebrow--on-dark">{eyebrow}</p>
        <h1 style={{ marginTop: 'var(--s-4)' }}>{heading}</h1>
        <p className="ui-sechead__lead" style={{ maxWidth: '32rem' }}>{body}</p>
        <p style={{ marginTop: 'var(--s-6)' }}>
          <Link to="/" className="ui-link">Return home</Link>
        </p>
      </div>
    </section>
  )
}
