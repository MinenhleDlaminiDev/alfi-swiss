import { useParams } from 'react-router-dom'
import { PageHero, Section, Eyebrow, Button, ServiceRows } from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, pillars, closing } from '../content/services.js'
import './Services.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'
import PillarModal from '../components/PillarModal/PillarModal.jsx'
import NotFound from './NotFound.jsx'

/* Services overview (ASP-09, rebuilt in ASP-70, dialog added in ASP-82).
 *
 * This page is an index. Until ASP-70 it carried the service write-ups inline
 * as `details` sections with the cards linking down to anchors; the client's
 * brief asked for a subpage per pillar, so the write-ups moved out and the
 * anchors went with them.
 *
 * ASP-82 BROUGHT THEM BACK ONTO THIS PAGE WITHOUT BRINGING BACK THE ANCHORS.
 * `/services/<slug>` now renders this component with PillarModal open, so:
 *
 *   - every published pillar URL still resolves, and still has its own title
 *     and description for search;
 *   - a card is still an ordinary `<a href="/services/...">`, so middle-click,
 *     open-in-new-tab and the status bar all behave;
 *   - clicking one opens the dialog instead of loading a page, because the
 *     route resolves to the component already on screen.
 *
 * An unknown slug still renders NotFound. A mistyped /services/anything is a
 * page that does not exist, and saying so beats bouncing someone silently
 * back to the index.
 */
export default function Services() {
  const { slug } = useParams()
  const pillar = slug ? pillars.find((p) => p.slug === slug) : null

  if (slug && !pillar) return <NotFound />

  /* One `<Seo>`, never two. With a pillar open the document should describe
     the pillar, because that is what the URL is and what gets shared. */
  const meta = pillar ? seo.servicePillars[pillar.slug] : seo.services

  return (
    <>
      <Seo title={meta.title} description={meta.description} />

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

      {/* Keyed on the slug so that stepping to the next pillar remounts the
          dialog. Without it the panel keeps the previous pillar's scroll
          position, and a reader who has scrolled to the bottom of one service
          arrives halfway down the next. */}
      {pillar && <PillarModal key={pillar.slug} slug={pillar.slug} />}
    </>
  )
}
