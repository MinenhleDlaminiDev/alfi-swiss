import { PageHero, Section, Eyebrow } from '../components/ui/index.jsx'
import EnquiryForm from '../components/EnquiryForm/EnquiryForm.jsx'
import { contact } from '../content/site.js'
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

      {/* Enquiry form beside the office details.
          u-stagger (ASP-43): three nested levels, on purpose. The outer one
          sequences the two COLUMNS so the form leads and the office trails;
          the inner ones sequence each column's own lines. A child of a
          staggered parent fades inside a fading parent, which is what makes
          the address read as arriving after its heading rather than with it.
          This section sits directly under the hero, so its observer fires on
          load and the whole thing plays as a page-open entrance. */}
      <Section tone="paper">
        <div className="contact-main u-stagger">
          <div className="u-stagger">
            <Eyebrow>{form.eyebrow}</Eyebrow>
            {/* 'Send a confidential note.' was removed from view in ASP-48,
                but kept in the accessibility tree rather than deleted. It is
                the only heading this column has: without it the enquiry form
                sits in an unnamed region, and a screen-reader user moving by
                heading would skip straight from the page title to the office
                details with no sign the form exists. Hidden, not gone. */}
            <h2 className="contact-heading u-sr-only">{form.heading}</h2>
            <div className="contact-form">
              <EnquiryForm />
            </div>
          </div>

          <aside className="contact-aside u-stagger">
            <Eyebrow>{office.eyebrow}</Eyebrow>
            <h2 className="contact-heading">{office.heading}</h2>
            <address className="contact-address">
              {contact.addressLines.map((line) => <span key={line}>{line}</span>)}
            </address>
            <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
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
