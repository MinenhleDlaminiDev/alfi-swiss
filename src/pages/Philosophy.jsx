import {
  PageHero, Section, SectionHead, Eyebrow, Button, ProcessSteps,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, process, closing } from '../content/philosophy.js'
import './Philosophy.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Philosophy (ASP-10). Deck slides 9-10. */
export default function Philosophy() {
  return (
    <>
      <Seo title={seo.philosophy.title} description={seo.philosophy.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* The four principles that used to sit here were removed in ASP-59 on
          the client's instruction, with nothing in their place — see the note
          at the top of content/philosophy.js. The process section below was
          `cream` because it followed a `paper` one; with the paper section
          gone it is the first band after the hero, and `paper` is the tone
          every other page opens on. */}

      {/* Four-stage process */}
      <Section tone="paper">
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
