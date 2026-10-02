import { PageHero, Section, Eyebrow, Split, Figure } from '../components/ui/index.jsx'
import EnquiryForm from '../components/EnquiryForm/EnquiryForm.jsx'
import { contact, regulatory } from '../content/site.js'
import { hero, leadership, form, office } from '../content/contact.js'
import './Contact.css'

/* Contact (ASP-11). Deck slide 12. */
export default function Contact() {
  return (
    <>
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
              <Figure src={office.image.src} alt={office.image.alt} ratio="4 / 3" />
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
              <h3 className="contact-person__name">{p.name}</h3>
              <p className="contact-person__role">{p.role}</p>
              <p className="contact-person__bio">
                {p.bio}
                {p.placeholder && <span className="contact-person__flag"> (Pending approval)</span>}
              </p>
            </article>
          ))}
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
