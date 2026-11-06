/* `Eyebrow`, `Button`, `cta` and `closing` went with the closing band on
   5 Nov — see the note where it stood. */
import { PageHero, Section, SectionHead, NumberedCards } from '../components/ui/index.jsx'
import { hero, profiles } from '../content/whoweserve.js'
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

      {/* THE CLOSING BAND IS GONE (5 Nov) — 'Arrange a Conversation' only on
          the first page and the last page, on the client's instruction. It
          carried the brief's own closing lines, 'Every family's situation is
          unique.' and 'Let us start with a conversation.', which Home's band
          still carries. The `closing` export stays in content/whoweserve.js. */}
    </>
  )
}
