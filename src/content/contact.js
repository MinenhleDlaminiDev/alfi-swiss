/* Contact (ASP-03). Source: content deck v1, slide 12.
   Second partner biography is a placeholder pending approved background and credentials. */

export const hero = {
  eyebrow: 'Leadership & Contact',
  headingLines: ['Senior-led relationships,', 'conducted in confidence.'],
  lead:
    /* 'or submit a confidential enquiry' until ASP-68. The enquiry form is
       gone, so there is nothing to submit; the rest of the client's wording
       is untouched. */
    'We invite you to begin a conversation grounded in discretion, personal attention and ' +
    'mutual understanding. Whether you write to us directly or send a message on ' +
    'WhatsApp, a member of our team will respond personally, ensuring your request ' +
    'receives the care, consideration and attention it deserves.',
};

/* RETAINED, NOT RENDERED (ASP-51).
 *
 * The digital business card was removed from the site entirely on the
 * client's instruction — the button, the modal, the QR, the .vcf download
 * and the generator that built them. Nothing imports this object any more.
 *
 * It is kept because it is REAL DATA: a managing partner's two phone
 * numbers, his direct email and the office address, carefully transcribed
 * from his printed card and verified against it. Deleting live contact
 * details to tidy up after a feature removal would throw away the only
 * accurate copy of them in the codebase, and the client may well want the
 * card back. If the feature returns, it is rebuilt from here.
 *
 * Phone numbers are stored in E.164 (`tel`) for dial links and separately
 * as the spaced form the partner's printed card uses (`display`), because
 * the two are not mechanically derivable from each other across countries.
 */
export const card = {
  slug: 'alexander-dimanow',
  name: 'Alexander Dimanow',
  firstName: 'Alexander',
  lastName: 'Dimanow',
  role: 'Founding Partner',
  org: 'ALFI Swiss Partners',
  phones: [
    { kind: 'cell', label: 'M', display: '+41 79 208 72 96', tel: '+41792087296' },
    { kind: 'work', label: 'D', display: '+41 22 707 82 80', tel: '+41227078280' },
  ],
  email: 'alexander.dimanow@alfiswisspartners.com',
  address: {
    street: '36 Boulevard Helvétique',
    postalCode: '1207',
    city: 'Geneva',
    country: 'Switzerland',
    /* As printed on the card, which abbreviates the country. */
    displayLines: ['36 Boulevard Helvétique', 'CH – 1207 Geneva'],
  },
  website: 'https://www.alfiswisspartners.com',
  websiteDisplay: 'www.alfiswisspartners.com',
  qrCaption: 'Scan to save contact',
  download: 'Download contact file',
};

/* leadership moved to src/content/partners.js in ASP-38. */

/* What replaced the form (ASP-68). The client's answers document settled the
   brief's own contradiction about the message box against it:

     'Message form must be removed. Just the email add and the WhatsApp
      widget should remain.'

   So this column is now the two ways to make contact. The WhatsApp link is
   an ordinary text link, deliberately NOT in WhatsApp green — the floating
   button already carries the brand mark, and a second green thing on the
   page would compete with it rather than support it. */
export const direct = {
  eyebrow: 'Enquiries',
  heading: 'Reach us directly.',
  body:
    'Write to us and a partner will respond personally. If a message is easier, the ' +
    'same people answer on WhatsApp.',
  whatsappLabel: 'Message us on WhatsApp',
};

/* COMMENTED OUT, NOT DELETED (ASP-68), at the user's instruction: the client
 * has reversed a removal before, and this is the whole form in one object.
 *
 * It is NOT dead weight in the bundle — nothing imports it, so Vite drops it
 * either way. The same goes for src/components/EnquiryForm/, which still
 * exists on disk and is no longer rendered by anything.
 *
 * export const form = {
 *   eyebrow: 'Enquiries',
 *   heading: 'Send a confidential note.',
 *   fields: {
 *     name: { label: 'Full name', placeholder: 'Full name', required: true },
 *     email: { label: 'Email address', placeholder: 'Email address', required: true },
 *     message: { label: 'Message', placeholder: 'How can we help? (optional)', required: false },
 *   },
 *   submit: 'Arrange a Conversation',
 *   submitting: 'Sending…',
 *   success: {
 *     title: 'Thank you',
 *     body: 'We have received your details and will reach out shortly.',
 *   },
 *   error:
 *     'Something went wrong sending your message. Please try again, or email us directly.',
 *   validation: {
 *     name: 'Please enter your name.',
 *     email: 'Please enter a valid email address.',
 *   },
 * };
 */

/* `image` removed in ASP-43. It was a view of Geneva across the lake sitting
   under the office address, which is decoration beside the thing people came
   to this page for. The master and its CREDITS row stay in assets/, so
   restoring it is a matter of putting this object back. */
export const office = {
  eyebrow: 'Office',
  heading: 'Geneva.',
};
