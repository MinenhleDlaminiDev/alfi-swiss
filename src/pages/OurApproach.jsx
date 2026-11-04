/* `Eyebrow`, `Button`, `cta` and `closing` went with the closing band on
   5 Nov — see the note where it stood. */
import {
  PageHero, Section, SectionHead, ProcessSteps,
} from '../components/ui/index.jsx'
import { hero, process } from '../content/approach.js'
import './OurApproach.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Philosophy (ASP-10). Deck slides 9-10. */
export default function Philosophy() {
  return (
    <>
      <Seo title={seo.ourApproach.title} description={seo.ourApproach.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* The four principles that used to sit here were removed in ASP-59 on
          the client's instruction, with nothing in their place — see the note
          at the top of content/approach.js. The process section below was
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

      {/* THE CLOSING BAND IS GONE (5 Nov) — 'Arrange a Conversation' only on
          the first page and the last page, on the client's instruction. The
          `closing` export stays in content/approach.js. */}
    </>
  )
}
