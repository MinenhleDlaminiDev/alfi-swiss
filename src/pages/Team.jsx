import { useState } from 'react'
import { PageHero, Section, Eyebrow } from '../components/ui/index.jsx'
import Modal from '../components/Modal/Modal.jsx'
import VCard from '../components/VCard/VCard.jsx'
import manifest from '../content/image-manifest.json'
import { card } from '../content/contact.js'
import { hero, leadership } from '../content/team.js'
import './Team.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Team (ASP-38).
 *
 * The partners used to sit at the bottom of Contact, below the enquiry form,
 * which is the last place anyone looks for them. Their own page, and the
 * cards stacked vertically so a biography has room to be a biography.
 */
export default function Team() {
  /* Holds the person whose card is open, not a boolean. Only one partner has
     a card today (ASP-39, option (a)), but the dialog is given a person so
     the second drops in without rework when the client supplies details. */
  const [cardFor, setCardFor] = useState(null)

  return (
    <>
      <Seo title={seo.team.title} description={seo.team.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      <Section tone="cream">
        <Eyebrow>{leadership.eyebrow}</Eyebrow>
        <h2 className="team-heading">{leadership.heading}</h2>

        <div className="team-people">
          {leadership.people.map((p) => (
            <article key={p.name} className="team-person">
              {p.portrait && (
                <div className="team-person__media">
                  <Portrait slug={p.portrait} name={p.name} role={p.role} />
                </div>
              )}
              <div className="team-person__body">
                <h3 className="team-person__name">{p.name}</h3>
                <p className="team-person__role">{p.role}</p>
                <p className="team-person__bio">
                  {p.bio}
                  {p.placeholder && <span className="team-person__flag"> (Pending approval)</span>}
                </p>

                {/* Only the partner who HAS a card gets a button. A button
                    opening a contact card with no way to make contact would
                    be worse than no button at all. */}
                {p.hasCard && (
                  <button
                    type="button"
                    className="team-person__cardbtn"
                    onClick={() => setCardFor(p)}
                  >
                    {/* Named for the person, not a bare "View card": with two
                        of these on a page, a screen reader listing the
                        buttons would otherwise read the same label twice. */}
                    Digital card
                    <span className="u-sr-only"> for {p.name}</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Modal
        open={cardFor !== null}
        onClose={() => setCardFor(null)}
        title={cardFor ? `the digital card for ${cardFor.name}` : undefined}
        labelledBy="team-card-title"
      >
        {/* The dialog's accessible name. Visually hidden because the card
            itself already shows the name in its own typography, and
            repeating it above would look like a mistake. */}
        <h2 id="team-card-title" className="u-sr-only">
          {cardFor ? `Digital card for ${cardFor.name}` : ''}
        </h2>
        <VCard />

        {/* The .vcf has been generated and served with the right MIME type
            since ASP-18, and `card.download` has carried its label since
            then, but nothing was ever linked to it — the old Contact copy
            promised a download that did not exist. The QR covers a phone;
            this covers everyone on a desktop.

            Outside <VCard> on purpose: that component is the client's own
            card design, ported verbatim, and a button is not part of it. */}
        <a className="team-cardfile" href={`/${card.slug}.vcf`} download>
          {card.download}
        </a>
      </Modal>
    </>
  )
}

/* Partner portrait.
 *
 * NOT decorative, unlike the card images elsewhere on the site. Those are
 * abstract architecture standing in for an idea, and the title beside them
 * carries the meaning. This is a photograph of a named person, and a reader
 * who cannot see it is entitled to know that is what it is.
 *
 * Supplied by the client. No stock photograph is ever shown under a
 * partner's name, which is why this takes a slug from content rather than
 * falling back to anything when one is missing.
 */
function Portrait({ slug, name, role }) {
  const meta = manifest[slug]

  if (!meta || !meta.widths?.length) {
    if (import.meta.env.DEV) {
      console.error(`Portrait: "${slug}" is not in the image manifest. Run: npm run images`)
    }
    return null
  }

  const srcset = (ext) => meta.widths.map((w) => `/images/${slug}-${w}w.${ext} ${w}w`).join(', ')
  const fallback = meta.widths[meta.widths.length - 1]
  /* The card is wider now that the portrait sits above the text rather than
     beside it, so this asks for a bigger file than the Contact version did. */
  const sizes = '(max-width: 560px) 230px, 300px'

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        className="team-person__img"
        src={`/images/${slug}-${fallback}w.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        /* The role comes from content rather than being written in here:
           both partners happen to be Managing Partners today, and a
           hardcoded title would quietly become a lie the day one is not. */
        alt={role ? `${name}, ${role}` : name}
        width={meta.width}
        height={meta.height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
