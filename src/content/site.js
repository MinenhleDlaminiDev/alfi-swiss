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

/* Placeholder pending compliance/legal confirmation. Do not publish a final
   regulatory status, authorisation or licensing statement until approved. */
export const regulatory =
  'ALFI Swiss Partners provides independent advisory services and introduces clients to ' +
  'selected banking partners; it does not hold client assets or provide discretionary ' +
  'portfolio management.';

export const cta = {
  primary:   { label: 'Book a Confidential Consultation', to: '/contact' },
  secondary: { label: 'Explore Our Services',             to: '/services' },
  request:   { label: 'Request a Consultation',           to: '/contact' },
};
