/* Site-wide content: navigation, contact details, legal (ASP-03) */

export const firm = {
  name: 'ALFI',
  suffix: 'Swiss Partners',
  fullName: 'ALFI Swiss Partners',
  tagline: 'Independent Wealth Advisory Firm',
  blurb:
    'An independent wealth advisory firm headquartered in Geneva, serving private clients, ' +
    'families, entrepreneurs and institutions.',
};

export const nav = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Philosophy', to: '/philosophy' },
  { label: 'Team',       to: '/team' },
  { label: 'Contact',    to: '/contact' },
];

export const contact = {
  email: 'info@alfiswisspartners.com',
  addressLines: ['36 Boulevard Helvétique', 'CH – 1207 Geneva'],
  reach:
    'Geneva headquarters · International meetings across Europe by arrangement · ' +
    'Virtual consultations worldwide',
};

/* `regulatory` was removed in ASP-48. It read:

     'ALFI Swiss Partners provides independent advisory services and
      introduces clients to selected banking partners; it does not hold
      client assets or provide discretionary portfolio management.'

   It had been a placeholder awaiting compliance sign-off since ASP-03, and
   the client removed it from the footer and the Contact page together.
   Recorded here rather than silently deleted, because a firm of this kind
   may still be required to carry a status statement — if one is ever
   approved, this is where it goes. */

/* `primary` ('Book a Confidential Consultation') was removed from the home
   hero in ASP-48 and deleted here rather than left behind: nothing rendered
   it any more, and an unused label in the content file is the kind of thing
   that gets reinstated by accident later. `request` already carries the same
   destination with its own wording. */
export const cta = {
  secondary: { label: 'Explore Our Services', to: '/services' },
  request:   { label: 'Request a Consultation', to: '/contact' },
};
