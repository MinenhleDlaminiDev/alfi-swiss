import {
  PageHero, Section, Eyebrow, Button,
  ServiceRows, Split, Figure, Bullets,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, index, details, closing } from '../content/services.js'
import './Services.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Services (ASP-09). Deck slides 5-8.

   The `details` sections own the anchor ids; the index rows link into them,
   so `anchors` is left false on ServiceRows to avoid duplicate ids. */
export default function Services() {
  return (
    <>
      <Seo title={seo.services.title} description={seo.services.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* Index of the five service areas */}
      <Section tone="paper">
        <div className="svc-index">
          <ServiceRows items={index} />
        </div>
      </Section>

      {/* Detail sections, alternating sides */}
      {details.map((d, i) => (
        <Section key={d.id} id={d.id} tone={i % 2 === 0 ? 'cream' : 'paper'}>
          <Split flip={d.flip}>
            {d.image && (
              <Figure
                slug={d.image.slug}
                alt={d.image.alt}
                caption={d.image.caption}
                live
              />
            )}
            {/* u-stagger (ASP-34): eyebrow, heading, body and the bullet
                list arrive in sequence rather than as one slab. */}
            <div className="u-stagger">
              <Eyebrow>{d.eyebrow}</Eyebrow>
              <h2 className="svc-detail__heading">{d.heading}</h2>
              <p className="svc-detail__body">{d.body}</p>
              <Bullets items={d.points} />
            </div>
          </Split>
        </Section>
      ))}

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
