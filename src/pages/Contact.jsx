import { PageHero, Section, Eyebrow, Split, Figure } from '../components/ui/index.jsx'
import EnquiryForm from '../components/EnquiryForm/EnquiryForm.jsx'
import { contact, regulatory } from '../content/site.js'
import { hero, leadership, form, office, cardSection } from '../content/contact.js'
import VCard from '../components/VCard/VCard.jsx'
import manifest from '../content/image-manifest.json'
import './Contact.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Contact (ASP-11). Deck slide 12. */
export default function Contact() {
  return (
    <>
      <Seo title={seo.contact.title} description={seo.contact.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* Enquiry form beside the office details */}
      <Section tone="paper">
        <div className="contact-main">
          <div>
            <Eyebrow>{form.eyebrow}</Eyebrow>
            <h2 className="contact-heading">{form.heading}</h2>
            <div className="contact-form">
              <EnquiryForm />
            </div>
          </div>

          <aside className="contact-aside">
            <Eyebrow>{office.eyebrow}</Eyebrow>
            <h2 className="contact-heading">{office.heading}</h2>
            <address className="contact-address">
              {contact.addressLines.map((line) => <span key={line}>{line}</span>)}
            </address>
            <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
            <p className="contact-reach">{contact.reach}</p>
            <div className="contact-figure">
              <Figure
                slug={office.image.slug}
                alt={office.image.alt}
                caption={office.image.caption}
                ratio="4 / 3"
                live
              />
            </div>
          </aside>
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="cream">
        <Eyebrow>{leadership.eyebrow}</Eyebrow>
        <h2 className="contact-heading">{leadership.heading}</h2>
        <div className="contact-people">
          {leadership.people.map((p) => (
            <article key={p.name} className="contact-person">
              {p.portrait && (
                <div className="contact-person__media">
                  <Portrait slug={p.portrait} name={p.name} role={p.role} />
                </div>
              )}
              <div className="contact-person__body">
                <h3 className="contact-person__name">{p.name}</h3>
                <p className="contact-person__role">{p.role}</p>
                <p className="contact-person__bio">
                  {p.bio}
                  {p.placeholder && <span className="contact-person__flag"> (Pending approval)</span>}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Digital business card (ASP-19) */}
        <div className="contact-card">
          <Eyebrow>{cardSection.eyebrow}</Eyebrow>
          <h3 className="contact-heading">{cardSection.heading}</h3>
          <p className="contact-card__lead">{cardSection.lead}</p>
          <div className="contact-card__slot">
            <VCard />
          </div>
        </div>
      </Section>

      {/* Regulatory notice — placeholder pending legal sign-off */}
      <Section tone="paper">
        <div className="contact-reg">
          <Eyebrow>Regulatory Notice</Eyebrow>
          <p className="contact-reg__body">{regulatory}</p>
        </div>
      </Section>
    </>
  )
}

/* Partner portrait (ASP-35).
 *
 * NOT decorative, unlike the card images elsewhere on the site. Those are
 * abstract architecture standing in for an idea, and the title beside them
 * carries the meaning. This is a photograph of a named person, and a reader
 * who cannot see it is entitled to know that is what it is.
 *
 * Supplied by the client. No stock photograph is ever shown under a
 * partner's name, which is why this component takes a slug from content
 * rather than falling back to anything when one is missing.
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
  const sizes = '(max-width: 560px) calc(100vw - 3rem), 300px'

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        className="contact-person__img"
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
