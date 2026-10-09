import { PageHero, Section, Eyebrow, Figure } from '../components/ui/index.jsx'
import EnquiryForm from '../components/EnquiryForm/EnquiryForm.jsx'
import { contact, regulatory } from '../content/site.js'
import { hero, form, office } from '../content/contact.js'
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

      {/* Leadership and the digital card both moved to /team in ASP-38. The
          partners sat below the enquiry form here, which is the last place
          anyone looks for them, and the card now opens from the partner it
          belongs to rather than floating under both of them. */}

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
