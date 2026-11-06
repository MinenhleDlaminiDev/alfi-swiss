/* Partners (ASP-38, renamed from Team in ASP-69). Moved out of contact.js,
 * where the partners sat below the enquiry form.
 *
 * BOTH BIOGRAPHIES ARE THE CLIENT'S, VERBATIM, from 'Website - Profiles of AF
 * & AD.docx' supplied 2 Nov 2026 (ASP-76). This page was blocked on them for
 * weeks — the November audit asked for them twice and the answer both times
 * was "this is coming". The `placeholder` flag that used to mark Fiúza's
 * section as pending is gone with them.
 *
 * Do not reword any of it. These are the partners' own accounts of their own
 * careers, on the page where a reader decides whether to trust them.
 *
 * TWO THINGS IN THIS COPY THAT THE REST OF THE SITE AVOIDS, both deliberate:
 *
 *   Named banks       Mirabaud, Credit Suisse, BPI Suisse, Barclays,
 *                     Hyposwiss, ABN AMRO, Merrill Lynch. ASP-63 took
 *                     'private banks' off the site as a phrase, and the user
 *                     kept career-history lines as the standing exception.
 *                     These are career history.
 *   'private banking' In Dimanow's second paragraph and in Fiúza's first.
 *                     Same exception, same reason.
 *
 * THE TITLES ARE THE ONES IN THEIR OWN PARAGRAPHS, and they differ from each
 * other. ASP-72 had set both to 'Founding Partner', from the brief's Partners
 * template. This document, which is newer and specifically about the
 * partners, says Dimanow joined as Managing Partner and Fiúza as a General
 * Partner — and says so INSIDE the biography text. A title line that
 * disagreed with the paragraph under it would contradict itself on screen, so
 * the paragraphs win.
 *
 * The Home page still says clients work directly with 'our two founding
 * partners'. That stays true: it describes who founded the firm, not what
 * title either of them holds.
 *
 * THE SURNAME CARRIES AN ACCENT (ASP-78, the user's instruction): António
 * Fiúza, as the profiles document writes it in prose. The site had said
 * Fiuza since ASP-35, and once ASP-76 published his biography verbatim the
 * page showed both spellings at once — the heading unaccented, his first
 * paragraph accented. The prose form wins over the document's capitalised
 * heading, 'ANTÓNIO FIÚZA DE OLIVEIRA', because a name field is a name in a
 * sentence; 'de Oliveira' is there to add if the firm ever wants the full
 * legal name. The image slug `card-partner-fiuza` is deliberately unchanged —
 * see the note in CREDITS.md.
 *
 * THE BIRTH YEARS ARE SETTLED, 5 Nov: they come off. Both paragraphs opened
 * 'Born in 1960,' as supplied and the client asked for it removed from each.
 * This was the longest-running open question on the page — it is closed, so
 * do not restore the dates from the source biographies.
 *
 * The language lists were reordered in the same message and both are now the
 * client's own order. See the notes beside each.
 */

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
  /* CHANGED IN ASP-79. This said 'Senior partners.' — word for word the hero
     heading about 400px above it. ASP-54 shortened both lines to the client's
     wording in separate passes, each in isolation, and nobody put the two side
     by side. The hero keeps those words: it is the page h1 and the client
     supplied the paragraph under it. This heading now says what the section
     below it actually shows. */
  heading: 'Who you will be working with.',
  /* `bio` is an ARRAY now (ASP-76). It was a single string while the copy was
     one placeholder line each; the supplied biographies are two paragraphs
     apiece, and running them together would make a wall of text out of a
     career summary and an education summary. */
  people: [
    {
      name: 'Alexander Dimanow',
      role: 'Managing Partner',
      /* Portraits supplied by the client (ASP-35). A named partner is never
         illustrated with stock photography, so there is no fallback: if a
         slug is missing the card simply renders without a picture. */
      portrait: 'card-partner-dimanow',
      bio: [
        /* 'Born in 1960, ' removed 5 Nov — see the note at the head of this
           file. The sentence now opens on his name, which is also how the
           second paragraph opens. */
        'Alexander Dimanow worked at Mirabaud from 2012 until 2025, when he ' +
        'joined ALFI as Managing Partner. He previously served on the Executive Committee ' +
        'of Hyposwiss Private Bank (Switzerland). Prior to that, he was Director for the ' +
        'Iberian Peninsula at ABN AMRO Bank (Switzerland).',
        'He began his private banking career in 1986 at Merrill Lynch Bank (Suisse), ' +
        'holding roles across Central Europe, Latin America, and Southern Europe. He holds ' +
        'a degree in Economics from the University of Lausanne and an MBA degree from ' +
        'Cornell University’s Johnson Graduate School of Management. He speaks six ' +
        'languages fluently.',
      ],
      /* His paragraph already says he speaks six languages; this lists them.
         Both are kept because both are his — the sentence is the claim, the
         list is the detail a reader actually wants. */
      /* ORDER IS THE CLIENT'S, dictated 5 Nov, and it is not alphabetical or
         a count of fluency — do not re-sort it. It was 'Spanish, German,
         French, English, Portuguese and Italian' as first supplied. */
      languages: 'English, French, German, Spanish, Portuguese and Italian',
    },
    {
      name: 'António Fiúza',
      role: 'General Partner',
      /* Supplied at 325px wide, which is under the 560w a card wants on a 2x
         screen, so this one is softer than Dimanow's. Flagged to the client
         for a larger file; the ladder already declines to upscale it. */
      portrait: 'card-partner-fiuza',
      bio: [
        /* 'Born in 1960, ' removed 5 Nov, with Dimanow's. */
        'António Fiúza covered the Portuguese market at Mirabaud until the ' +
        'end of 2025, when he joined ALFI as a General Partner. Before Mirabaud, he spent ' +
        'six years at Credit Suisse Group in Geneva as a Director in the private banking ' +
        'unit serving Portugal. Earlier, he worked for 10 years in wealth management at ' +
        'BPI Suisse in Geneva.',
        'António began his banking career in 1984 at Banco Português do Atlántico in Lisbon ' +
        'and later gained experience at Banco Commercial Português, Banco Internacional de ' +
        'Crédito, and Barclays Bank. He holds a degree in Psychology from ISPA in Lisbon, ' +
        'along with several advanced qualifications in economics and finance.',
      ],
      /* Reordered 5 Nov with Dimanow's; was 'Portuguese, English and French'. */
      languages: 'English, French and Portuguese',
    },
  ],
};

/* The combined-experience figure on Home checks out against these dates:
   Fiúza from 1984 and Dimanow from 1986 is 42 and 40 years to 2026, so the
   brief's 'more than 80 years combined' and '40+ years each' are both true.
   If either biography is ever revised, re-check `credentials` in
   content/home.js, which states 80+. */
