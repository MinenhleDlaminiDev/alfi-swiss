import { Link } from 'react-router-dom'
import {
  PageHero, Section, SectionHead, Eyebrow, Button,
  NumberedCards, Split, Figure,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, story, values, remuneration, scope } from '../content/about.js'
import './About.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* About (ASP-08), rebuilt in ASP-72 to the four sections the client's brief
   asks for: our story, our philosophy and values, how we are remunerated, and
   what we do not do — then a link to Partners and Contact.

   The 'Who we serve' section that used to sit between the values and the
   closing band is a page of its own now. See content/about.js. */
export default function About() {
  return (
    <>
      <Seo title={seo.about.title} description={seo.about.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* Our story */}
      <Section tone="paper">
        <Split flip>
          <Figure
            slug={story.image.slug}
            alt={story.image.alt}
            caption={story.image.caption}
            live
          />
          <div>
            {story.paragraphs.map((p, i) => (
              <p key={i} className="about-para">{p}</p>
            ))}
            <blockquote className="about-quote">{story.pullquote}</blockquote>
          </div>
        </Split>
      </Section>

      {/* Our philosophy — five values */}
      <Section tone="cream">
        <SectionHead eyebrow={values.eyebrow} heading={values.heading} />
        <div className="about-grid about-grid--values">
          <NumberedCards items={values.items} />
        </div>
      </Section>

      {/* How we are remunerated, and what we do not do.
        *
        * One band, two columns, each under its own h2. These are the two
        * sections that make independence checkable rather than claimed, so
        * they sit together and at the same weight — neither is a footnote to
        * the other.
        *
        * Real headings, not eyebrows: a reader skimming the page by its
        * headings has to be able to find 'What we do not do', and an eyebrow
        * is a styled <p>. */}
      <Section tone="paper">
        <div className="about-terms">
          <div className="u-stagger">
            <h2 className="about-terms__heading">{remuneration.heading}</h2>
            <p className="about-para">{remuneration.body}</p>
          </div>
          <div className="u-stagger">
            <h2 className="about-terms__heading">{scope.heading}</h2>
            <p className="about-para">{scope.body}</p>
          </div>
        </div>
      </Section>

      {/* Closing. The brief's last structure item for this page is 'Link to
          Partners and Contact', so the band carries both: the partners as a
          text link and contact as the button it already had. */}
      <section className="ui-section ui-section--navy about-closing">
        <div className="wrap">
          <Eyebrow tone="dim">Begin a Conversation</Eyebrow>
          {/* CHANGED IN ASP-79. This read 'Senior-led relationships, conducted
              in confidence.', which is also the Contact page's h1 — one
              sentence doing two different jobs on two pages. Contact keeps it,
              because there it is the main heading. This band is a closing call
              to action, so its line stays on this page's own subject and leads
              into the two links under it. Home's matching band carries the
              brief's own line and is untouched. */}
          <h2 className="about-closing__heading">
            Independence is easier to judge in person.
          </h2>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
          <p className="about-closing__alt">
            <Link to="/partners">Meet the partners</Link>
          </p>
        </div>
      </section>
    </>
  )
}
