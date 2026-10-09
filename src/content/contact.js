/* Contact (ASP-03). Source: content deck v1, slide 12.
   Second partner biography is a placeholder pending approved background and credentials. */

export const hero = {
  eyebrow: 'Leadership & Contact',
  headingLines: ['Senior-led relationships,', 'conducted in confidence.'],
  lead:
    'Every engagement begins with a confidential discovery conversation. Reach us directly, ' +
    'or send a note and a partner will respond.',
};

/* `cardSection` was the copy introducing the static card block on this page.
   Both moved out in ASP-38: the partners to team.js, and the card itself to
   a modal opened from the partner it belongs to. `card` below stays here,
   because VCard and scripts/build-vcard.mjs both import it from this file. */

/* Digital business card details (ASP-18).
   This is the single source of truth: scripts/build-vcard.mjs generates both
   public/<slug>.vcf and the QR from this object, and <VCard> renders from it.
   Change a number here and all three follow. Never hard-code these in a
   component or re-type them into the .vcf by hand.

   Phone numbers are stored in E.164 (`tel`) for the dial links and separately
   as the spaced form the partner's printed card uses (`display`), because the
   two are not mechanically derivable from each other across countries. */
export const card = {
  slug: 'alexander-dimanow',
  name: 'Alexander Dimanow',
  firstName: 'Alexander',
  lastName: 'Dimanow',
  role: 'Managing Partner',
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

/* leadership moved to src/content/team.js in ASP-38. */

export const form = {
  eyebrow: 'Enquiries',
  heading: 'Send a confidential note.',
  fields: {
    name: { label: 'Full name', placeholder: 'Full name', required: true },
    email: { label: 'Email address', placeholder: 'Email address', required: true },
    message: { label: 'Message', placeholder: 'How can we help? (optional)', required: false },
  },
  submit: 'Request a Consultation',
  submitting: 'Sending…',
  success: {
    title: 'Thank you',
    body: 'We have received your details and will reach out shortly.',
  },
  error:
    'Something went wrong sending your message. Please try again, or email us directly.',
  validation: {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
  },
};

export const office = {
  eyebrow: 'Office',
  heading: 'Geneva.',
  image: {
    slug: 'contact-geneva',
    alt: 'Geneva across the lake, with the Jet d’Eau',
    /* Safe to name the place here, unlike the other captions: this master IS
       recorded as Geneva in CREDITS.md. */
    caption: 'Geneva',
  },
};
