/* `Link`, `Eyebrow`, `Button` and `cta` are no longer imported — the closing
   band that used all four came off this page on 5 Nov, when the client asked
   for 'Arrange a Conversation' to appear only on the first and last pages. */
import {
  PageHero, Section, SectionHead,
  NumberedCards, Split, Figure,
} from '../components/ui/index.jsx'
/* `remuneration` is no longer imported — the client removed that section on
   5 Nov. The export is still in content/about.js; see the note there. */
import { hero, story, values, scope } from '../content/about.js'
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

      {/* What we do not do.
        *
        * 'How we are remunerated' stood in the first column of this band until
        * 5 Nov, when the client removed it — all of it, their words. The text
        * is kept in content/about.js, unrendered, with the reasoning.
        *
        * The band is now one column, so about-terms runs at a single readable
        * measure rather than leaving the right half of the grid empty.
        *
        * A real heading, not an eyebrow: a reader skimming the page by its
        * headings has to be able to find 'What we do not do', and an eyebrow
        * is a styled <p>. */}
      <Section tone="paper">
        <div className="about-terms">
          <div className="u-stagger">
            <h2 className="about-terms__heading">{scope.heading}</h2>
            <p className="about-para">{scope.body}</p>
          </div>
        </div>
      </Section>

      {/* THE CLOSING BAND IS GONE (5 Nov). The client asked for 'Arrange a
          Conversation' to appear only on the first page and the last page,
          so Home keeps its band and the four middle pages lose theirs.
          The header carries the same button on every page, so the action is
          never more than one click away.

          What went with it, and is worth knowing before anyone restores it:

            - the eyebrow 'Begin a Conversation';
            - the heading 'Independence is easier to judge in person.',
              written in ASP-79 to stop this page repeating the Contact
              page's h1 word for word;
            - a 'Meet the partners' text link, which was the brief's last
              structure item for this page ('Link to Partners and Contact').
              Partners is still in the header nav and in the footer, so the
              page is not stranded — but the brief's own link is no longer
              at the foot of About. */}
    </>
  )
}
