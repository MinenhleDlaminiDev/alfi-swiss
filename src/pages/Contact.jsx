import { PageHero, Section, Eyebrow } from '../components/ui/index.jsx'
import { contact } from '../content/site.js'
import { hero, direct, office } from '../content/contact.js'
import './Contact.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Contact (ASP-11). Deck slide 12. */
export default function Contact() {
  return (
    <>
      <Seo title={seo.contact.title} description={seo.contact.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      {/* The two ways to make contact, beside the office details.

          The enquiry form stood in the left column until ASP-68, when the
          client removed it. Rather than leave a two-column grid with one
          side empty, the column became what the form was for: the email
          address and WhatsApp, with the heading now VISIBLE. It was
          sr-only before because the form named the column well enough on
          its own; a column of two links needs a heading anyone can read.

          u-stagger (ASP-43): three nested levels, on purpose. The outer one
          sequences the two COLUMNS so the contact details lead and the
          office trails; the inner ones sequence each column's own lines. A
          child of a staggered parent fades inside a fading parent, which is
          what makes the address read as arriving after its heading rather
          than with it. This section sits directly under the hero, so its
          observer fires on load and the whole thing plays as a page-open
          entrance. */}
      <Section tone="paper">
        <div className="contact-main u-stagger">
          <div className="u-stagger">
            <Eyebrow>{direct.eyebrow}</Eyebrow>
            <h2 className="contact-heading">{direct.heading}</h2>
            <p className="contact-body">{direct.body}</p>
            <a className="contact-primary" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            {/* The same number the floating button dials, from the same
                object — two links to one WhatsApp account, not two numbers
                to keep in step. Still unverified as a WhatsApp-registered
                line; see the note in site.js. */}
            <a
              className="contact-wa"
              href={`https://wa.me/${contact.whatsapp.tel}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {direct.whatsappLabel}
              <span className="u-sr-only"> — opens in a new tab</span>
            </a>
          </div>

          <aside className="contact-aside u-stagger">
            <Eyebrow>{office.eyebrow}</Eyebrow>
            <h2 className="contact-heading">{office.heading}</h2>
            <address className="contact-address">
              {contact.addressLines.map((line) => <span key={line}>{line}</span>)}
            </address>
            {/* The email moved to the left column in ASP-68, where it is the
                page's primary action rather than a footnote to the address. */}
            {/* The 'Geneva headquarters / International meetings / Virtual
                consultations' line sat here until ASP-53. The same
                'international meetings across Europe by arrangement' wording
                came off the Home credentials strip in ASP-48; this was the
                last place it appeared. */}
            {/* The Geneva photograph was here until ASP-43. */}
          </aside>
        </div>
      </Section>

      {/* Leadership and the digital card both moved to /team in ASP-38. The
          partners sat below the enquiry form here, which is the last place
          anyone looks for them, and the card now opens from the partner it
          belongs to rather than floating under both of them. */}

      {/* The regulatory notice section stood here until ASP-48. It was a
          placeholder awaiting compliance sign-off and the client removed it
          from this page and the footer together. */}
    </>
  )
}
