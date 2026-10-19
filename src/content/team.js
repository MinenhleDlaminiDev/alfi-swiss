/* Team (ASP-38). Moved out of contact.js, where the partners sat below the
   enquiry form.

   The second biography is a placeholder pending the client's approved
   background and credentials; `placeholder: true` is what renders the flag
   beside it, and removing the flag before the copy is approved would publish
   filler as though it were final. */

export const hero = {
  eyebrow: 'Our Team',
  /* One line since ASP-54. PageHero renders a span per entry and the
     entrance staggers them, so a trailing empty string here would animate
     a blank line — keep this array to exactly the lines that have text. */
  headingLines: ['Senior partners.'],
  /* Client-supplied, ASP-55. Set verbatim. */
  lead:
    'Our approach is defined by the calibre of our people and the relationships we build. ' +
    'Every client benefits from direct access to our highly experienced team of senior ' +
    'professionals, each bringing a depth of expertise, sound judgement and personal ' +
    'commitment to every engagement. With no unnecessary layers between you and those ' +
    'entrusted with your work, we deliver a discreet, seamless and highly personalised ' +
    'experience, underpinned by the highest standards of excellence.',
};

export const leadership = {
  eyebrow: 'Leadership',
  heading: 'Senior partners.',
  people: [
    {
      name: 'Alexander Dimanow',
      role: 'Managing Partner',
      /* Portraits supplied by the client (ASP-35). A named partner is never
         illustrated with stock photography, so there is no fallback: if a
         slug is missing the card simply renders without a picture. */
      portrait: 'card-partner-dimanow',
      /* The second sentence — 'Background spans portfolio strategy, alternative
         investments, structured solutions, credit risk and investment advisory'
         — was removed in ASP-58. The client is supplying replacement detail, so
         this biography is expected to grow again rather than stay at one line. */
      bio:
        'Geneva-based banking executive with more than 40 years of experience in private ' +
        'banking, wealth advisory and institutional finance.',
      placeholder: false,
    },
    {
      name: 'António Fiuza',
      role: 'Managing Partner',
      /* Supplied at 325px wide, which is under the 560w a card wants on a 2x
         screen, so this one is softer than Dimanow's. Flagged to the client
         for a larger file; the ladder already declines to upscale it. */
      portrait: 'card-partner-fiuza',
      bio:
        'Biography to be completed with approved background, key roles, areas of expertise ' +
        'and credentials.',
      placeholder: true,
    },
  ],
};
