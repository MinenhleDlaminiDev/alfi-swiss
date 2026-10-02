import { Eyebrow, TextLink } from '../components/ui/index.jsx'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

export default function NotFound() {
  return (
    <>
      <Seo title={seo.notFound.title} description={seo.notFound.description} />
      <section className="ui-section ui-section--navy">
        <div className="wrap">
          <Eyebrow tone="on-dark">Error 404</Eyebrow>
          <h1 className="ui-pagehero__heading">This page could not be found.</h1>
          <p className="ui-sechead__lead">
            The page you requested does not exist or has been moved.
          </p>
          <TextLink to="/">Return home</TextLink>
        </div>
      </section>
    </>
  )
}
