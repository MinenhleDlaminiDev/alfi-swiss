import {
  PageHero, Section, SectionHead, Eyebrow, Button,
  NumberedCards, ProcessSteps,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, principles, process, closing } from '../content/philosophy.js'
import './Philosophy.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Philosophy (ASP-10). Deck slides 9-10. */
export default function Philosophy() {
  return (
    <>
      <Seo title={seo.philosophy.title} description={seo.philosophy.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* Four principles.
          The standalone photograph that used to sit beside these was removed
          once the cards themselves gained images: one large picture of a
          colonnade next to four smaller pictures was just the biggest thing
          on screen, and it illustrated nothing the cards did not. Without it
          the column constraint goes too, so the four run across the section
          the way every other card grid on the site does. */}
      <Section tone="paper">
        <div className="u-stagger">
          <Eyebrow>{principles.eyebrow}</Eyebrow>
          <h2 className="svc-detail__heading">{principles.heading}</h2>
        </div>
        <div className="phil-grid">
          <NumberedCards items={principles.items} />
        </div>
      </Section>

      {/* Five-stage process */}
      <Section tone="cream">
        <SectionHead eyebrow={process.eyebrow} heading={process.heading} lead={process.lead} />
        <div className="phil-process">
          <ProcessSteps items={process.steps} />
        </div>
      </Section>

      {/* Closing */}
      <section className="ui-section ui-section--navy phil-closing">
        <div className="wrap">
          <Eyebrow tone="dim">{closing.eyebrow}</Eyebrow>
          <h2 className="phil-closing__heading">{closing.heading}</h2>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
        </div>
      </section>
    </>
  )
}
