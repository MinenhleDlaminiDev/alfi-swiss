import { PageHero, Section, SectionHead, Eyebrow, Button, NumberedCards } from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, profiles, closing } from '../content/whoweserve.js'
import './WhoWeServe.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Who We Serve (ASP-72).
 *
 * The seventh page in the client's sitemap, and the simplest one on the site:
 * a hero, three profiles, a closing band. There is deliberately nothing else
 * — the brief pairs these profiles with anonymised case studies and the
 * founders dropped those for good on compliance grounds, so the page is
 * short by decision rather than by omission. See content/whoweserve.js.
 *
 * The cards carry no images, which is why this page has its own entrance
 * treatment rather than the shared one. */
export default function WhoWeServe() {
  return (
    <>
      <Seo title={seo.whoWeServe.title} description={seo.whoWeServe.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* The three profiles.
        *
        * `--serve` moved here from About.css in ASP-72, with the cards it was
        * written for. It scopes a slower, taller entrance to this grid alone:
        * the cards rise into place one after another rather than lifting
        * together on the shared 70ms step. */}
      <Section tone="paper">
        <SectionHead eyebrow={profiles.eyebrow} heading={profiles.heading} />
        <div className="serve-grid serve-grid--serve">
          <NumberedCards items={profiles.items} />
        </div>
      </Section>

      {/* Closing */}
      <section className="ui-section ui-section--navy serve-closing">
        <div className="wrap">
          <Eyebrow tone="dim">{closing.eyebrow}</Eyebrow>
          <h2 className="serve-closing__heading">{closing.heading}</h2>
          <p className="serve-closing__body">{closing.body}</p>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
        </div>
      </section>
    </>
  )
}
