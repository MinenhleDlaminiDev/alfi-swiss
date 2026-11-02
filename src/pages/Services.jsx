import { PageHero, Section, Eyebrow, Button, ServiceRows } from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, pillars, closing } from '../content/services.js'
import './Services.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Services overview (ASP-09, rebuilt in ASP-70).
 *
 * This page is now an index and nothing else. Until ASP-70 it carried the
 * service write-ups inline as `details` sections, with the cards above
 * linking down to anchors; the client's brief asks for a subpage per pillar,
 * so the write-ups moved to ServicePillar.jsx and the anchors went with them.
 *
 * Each card therefore carries `to`, a real route, rather than `linkTo`, an
 * in-page fragment. Every card is a link now — there are no panels here that
 * look clickable and are not. */
export default function Services() {
  return (
    <>
      <Seo title={seo.services.title} description={seo.services.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      <Section tone="paper">
        <div className="svc-index">
          <ServiceRows
            items={pillars.map((p) => ({
              n: p.n,
              title: p.title,
              image: p.image,
              /* The card shows the pillar's promise. It is one line by
                 design — the brief specifies a one-line promise per pillar —
                 so it needs no separate summary written for the card. */
              text: p.promise,
              to: `/services/${p.slug}`,
            }))}
          />
        </div>
      </Section>

      {/* Closing */}
      <section className="ui-section ui-section--navy svc-closing">
        <div className="wrap">
          <Eyebrow tone="dim">{closing.eyebrow}</Eyebrow>
          <h2 className="svc-closing__heading">{closing.heading}</h2>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
        </div>
      </section>
    </>
  )
}
