/* Site-wide content: navigation, contact details, legal (ASP-03) */

export const firm = {
  name: 'ALFI',
  suffix: 'Swiss Partners',
  fullName: 'ALFI Swiss Partners',
  /* 'Wealth Advisory' -> 'Wealth Planning' in ASP-63. ASP-57 renamed the Home
     hero eyebrow on the client's instruction and left everything else, so the
     site described itself two ways on one screen. The blurb is the footer, on
     every page — change these two together with the Home lead and the Home
     search description, or the split comes straight back. */
  tagline: 'Independent Wealth Planning Firm',
  blurb:
    'An independent wealth planning firm headquartered in Geneva, serving private clients, ' +
    'families, entrepreneurs and institutions.',
};

/* The menu, restructured in ASP-69 to the diagram in the client's answers
   document (2 Nov). Header.jsx and Footer.jsx both map over this array and
   neither keeps a list of its own, so one edit here changes both.

   Two of the seven pages the diagram shows are not here yet:

     Who We Serve  — a new page, built in ASP-72. The item joins this array
                     with the page, not before it: a menu link to a route
                     that does not exist is worse than a short menu.
     Insights      — drawn with a dashed border and keyed 'Optional at
                     launch' in their own diagram, and they confirmed it
                     needs content from the partners first.

   Home stays at the user's instruction. The diagram puts it above the seven
   rather than inside them, reached from the brand mark, but keeping it means
   the menu lands on exactly seven items once Who We Serve arrives. */
export const nav = [
  { label: 'Home',         to: '/' },
  { label: 'About ALFI',   to: '/about' },
  { label: 'Services',     to: '/services' },
  { label: 'Our Approach', to: '/our-approach' },
  { label: 'Partners',     to: '/partners' },
  { label: 'Contact',      to: '/contact' },
];

export const contact = {
  email: 'info@alfiswisspartners.com',
  addressLines: ['36 Boulevard Helvétique', 'CH – 1207 Geneva'],
  /* The floating WhatsApp button (ASP-66). `tel` is E.164 without the plus,
     which is the form wa.me takes; `display` is how a person reads it.
     Do not derive one from the other — spacing conventions differ by country.

     UNVERIFIED AT TIME OF WRITING. 022 is a Geneva LANDLINE prefix, and
     wa.me only resolves for a number actually registered on WhatsApp — on a
     landline that means a WhatsApp Business account verified by voice call.
     If it is not registered, tapping the button opens WhatsApp saying
     'The phone number shared via url is invalid.' Confirm before production. */
  whatsapp: {
    tel: '41227078281',
    display: '+41 22 707 8281',
  },
  /* `reach` removed in ASP-53. It read 'Geneva headquarters · International
     meetings across Europe by arrangement · Virtual consultations
     worldwide'. The same claim about European meetings had already been
     taken off the Home credentials strip in ASP-48, so this was the last
     place it survived. */
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
/* `request` was 'Request a Consultation' until ASP-69. The client named
   'Arrange a conversation' for the header button only, but Home, About,
   Services and Our Approach all render this same object, so keeping the old
   wording on those four would have put two names for one action on the site —
   twice on the same screen on three of those pages. One label, one action. */
export const cta = {
  secondary: { label: 'Explore Our Services', to: '/services' },
  request:   { label: 'Arrange a Conversation', to: '/contact' },
};
