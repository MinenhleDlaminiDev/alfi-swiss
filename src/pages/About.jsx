import {
  PageHero, Section, SectionHead, Eyebrow, Button,
  NumberedCards, Split, Figure,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, story, differentiators, clients } from '../content/about.js'
import './About.css'

/* About (ASP-08). Deck slides 3, 4 and 11. */
export default function About() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* The firm */}
      <Section tone="paper">
        <Split flip>
          <Figure src={story.image.src} alt={story.image.alt} />
          <div>
            {story.paragraphs.map((p, i) => (
              <p key={i} className="about-para">{p}</p>
            ))}
            <blockquote className="about-quote">{story.pullquote}</blockquote>
          </div>
        </Split>
      </Section>

      {/* Why ALFI */}
      <Section tone="cream">
        <SectionHead eyebrow={differentiators.eyebrow} heading={differentiators.heading} />
        <div className="about-grid">
          <NumberedCards items={differentiators.items} />
        </div>
      </Section>

      {/* Who we serve */}
      <Section tone="paper">
        <SectionHead eyebrow={clients.eyebrow} heading={clients.heading} />
        <div className="about-grid">
          <NumberedCards items={clients.items} />
        </div>
      </Section>

      {/* Closing */}
      <section className="ui-section ui-section--navy about-closing">
        <div className="wrap">
          <Eyebrow tone="dim">Begin a Conversation</Eyebrow>
          <h2 className="about-closing__heading">
            Senior-led relationships, conducted in confidence.
          </h2>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
        </div>
      </section>
    </>
  )
}
