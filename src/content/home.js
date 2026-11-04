/* Home — gateway page (ASP-03).
 *
 * Rewritten in ASP-71 from the client's own documents:
 *
 *   ASP-Website CR.docx   29 Oct 2026 — the content brief, which supersedes
 *                         whatever is live. The founders were not happy with
 *                         the October copy and this is what they want instead.
 *   ANSWERS-ASP.docx      2 Nov 2026 — their written replies to our audit of
 *                         that brief. Most recent word on anything it touches.
 *
 * Every string below is theirs except two headings the brief does not supply
 * (`positioning.heading` and `pillars.heading`); both are flagged where they
 * sit. The brief's Home page has to answer three questions in one scroll —
 * who ALFI is, who it serves, and why it is different — in this order:
 * hero, introduction, four service tiles, 'Why ALFI', a Partners link with no
 * photos, and a closing call to action.
 *
 * TWO OCTOBER DECISIONS ARE REVERSED HERE, by the founders themselves:
 *
 *   'independent family office'  — removed in ASP-60 because it clashed with
 *                                  'we manage no assets' and echoed the
 *                                  reference site. It is their core
 *                                  positioning again, and the brief writes
 *                                  the no-assets line in the same paragraph.
 *   60+ years  ->  more than 80  — the brief and the answers both say 80, and
 *                                  40+ years each.
 *
 * Do not restore either on the grounds that the client asked for it in
 * October. They asked for the opposite in November, in writing.
 */

export const hero = {
  /* Kept. The user cut the tagline question from the audit list because the
     firm is keeping this strapline — the brief's tagline goes in the heading
     below, not here. `site.js` carries the same string for the footer. */
  eyebrow: 'Independent Wealth Planning Firm',
  /* The brief's tagline, which the answers document confirms opens the page.
     FULL STOPS, not commas: the brief is the drafted copy and writes it this
     way, while the answers document renders it with commas in passing.

     Three lines now, not two. `.home-hero__line:nth-child(n+3)` already
     provided for a third, and ASP-71 shifted the rule, lead and buttons
     90ms later so the sequence keeps its spacing. */
  headingLines: [
    'Independent advice.',
    'The right partners.',
    'Your family’s interests first.',
  ],
  /* Hero backdrop (ASP-26 / ASP-27). Order is the rotation order; the first is
     the one that loads eagerly and is preloaded in index.html, so changing it
     means changing the preload too. Credits in assets/images/CREDITS.md. */
  slides: [
    { slug: 'hero-geneva' },
    { slug: 'hero-alps' },
    { slug: 'hero-arcade' },
    { slug: 'hero-boardroom' },
  ],
  /* The pause control's accessible name (ASP-30). It reads as what pressing
     the button will DO, not as what the rotation is currently doing, which is
     the convention every media player follows. */
  controls: {
    pause: 'Pause background images',
    play: 'Play background images',
  },
  /* The brief's sub-headline, verbatim. It replaces the October lead, which
     described the firm; this one says what the firm does for the reader. */
  lead:
    'We help entrepreneurs and families structure their wealth and choose the ' +
    'institutions and advisers they can trust — worldwide.',
};

export const credentials = [
  {
    /* 60+ -> 80+ (ASP-71). The brief says 'more than 80 years of combined
       experience in Swiss private banking' and the answers repeat it. This
       was the only place on the site carrying the 60 figure. */
    figure: '80+',
    /* ASP-28: the numeric part counts up on first entry. `figure` stays the
       truth — this only says how much of it is a number, and the rest ('+')
       is carried through unchanged. Remove this line and it renders flat.
       Both numbers move together, or the strip counts to one and displays
       the other. */
    count: 80,
    /* 'across private banking, wealth advisory and institutional finance'
       narrowed to the brief's own wording. */
    text: 'Years of combined experience in Swiss private banking.',
  },
  {
    figure: 'Direct',
    /* 'to leading private banks' removed in ASP-63 — the fourth instruction to
       take the phrase off a page. The site does not say 'private banks'. */
    text: 'Senior-partner access and curated introductions around the globe.',
  },
  {
    figure: 'Geneva',
    text: 'Headquartered in Switzerland.',
  },
];

export const positioning = {
  eyebrow: 'Who We Are',
  /* OURS, not the client's — the brief gives this paragraph no heading. Drawn
     from its own opening sentence, which says ALFI 'sits on the family's side
     of the table'. Flagged on ASP-71 for sign-off; if they want their own
     line here, this is the one string on the page to change. */
  heading: 'An independent family office, on your side of the table.',
  /* The brief's Introduction paragraph, verbatim. Note that it restores
     'independent family office' and denies managing portfolios in the same
     breath — which is exactly the pairing ASP-60 removed as contradictory.
     The founders wrote it that way on purpose: they advise, the regulated
     institutions they select manage. */
  body:
    'ALFI Swiss Partners is an independent family office. We do not manage portfolios ' +
    'or sell financial products. Instead, we design the right structure for your wealth, ' +
    'select the best banks, lawyers, tax advisers and specialists for your needs, and ' +
    'make sure they deliver. Our clients work directly with our two founding partners, ' +
    'who bring more than 80 years of combined experience in Swiss private banking.',
  link: { label: 'More about the firm', to: '/about' },
  /* The caption (ASP-28) is thematic, not a location. The stock photograph is
     a colonnaded hall of unrecorded place — captioning it "Geneva" would be a
     claim about a building nobody here has identified, on a client site where
     every other factual line has been through the client. */
  image: {
    slug: 'home-positioning',
    alt: 'Arches and columns lining an empty hallway',
    caption: 'Independent by structure',
  },
};

/* 'Why ALFI' — the brief's section, and the five key messages it says must
 * all appear on the Home page.
 *
 * FOUR CARDS BECAME FIVE in ASP-71. Our audit put it to the founders that the
 * brief demands five messages and then gives the Home page only four slots,
 * with 'international scope' missing. Their answer: the five will either be
 * listed here or moved to a page of their own, and 'both layouts will be
 * tested before a final decision'. This is the Home layout. Moving it later
 * is a cut-and-paste of this array.
 *
 * Titles and text are the brief's own 'Why ALFI' lines; `International` is
 * its fifth key message, which the Home section had left out.
 *
 * Every image already existed. `card-integrated-view` and
 * `card-confidentiality` outlived the card titles they were chosen for —
 * reused rather than replaced, on the user's instruction to reuse what we
 * have. See [card-system-and-images] for how a new one would be added.
 */
export const pillars = {
  eyebrow: 'Why ALFI',
  /* OURS. The brief names the section and supplies the five lines but no
     heading, so the October one stays rather than a new one being invented. */
  heading: 'An exclusive structure built around clarity, discretion and senior judgement.',
  items: [
    {
      n: '01', title: 'Independent', image: 'card-independence',
      text: 'No products, no assets under management, no conflicts.',
    },
    {
      n: '02', title: 'Experienced', image: 'card-senior-attention',
      /* The client's own rewording, 5 Nov. It was the brief's 'Four decades
         each inside leading Swiss banks.' The new line drops the count, so
         this card no longer repeats the 40-each figure that the credentials
         strip already carries as 80+ combined. The title is unchanged — they
         rewrote the line under it, not the word above it. */
      text: 'Decades of experience with leading Swiss banks.',
    },
    {
      n: '03', title: 'Connected', image: 'card-bank-introductions',
      text: 'A vetted international network of specialists.',
    },
    {
      n: '04', title: 'International', image: 'card-integrated-view',
      text: 'Cross-border families, multiple jurisdictions, multiple languages.',
    },
    {
      n: '05', title: 'Personal', image: 'card-confidentiality',
      text: 'You deal with a senior partner, always.',
    },
  ],
};

export const servicesTeaser = {
  eyebrow: 'Our Services',
  heading: 'A coordinated view of wealth.',
  body:
    /* Mirrors the Services hero lead, so the two move together (ASP-49).
       Rewritten in ASP-70 when that lead became the client's own overview
       intro — the old wording named risk and succession as the services,
       and neither is a published pillar now. */
    'We design the structure, assemble the right team of specialists, and make sure ' +
    'everyone delivers.',
  link: { label: 'View All Services', to: '/services' },
};

/* The network (ASP-71).
 *
 * The brief offers this as 'optional page or Home section'. The founders
 * parked Network and Insights as PAGES — 'they are marked as optional' — so
 * it lives here as a band, which also keeps the menu at the six items the
 * routes support.
 *
 * The regions are not a guess. The brief listed them and then wrote 'adjust
 * to reality'; we asked, and the answer was 'Switzerland, Europe, the Middle
 * East, the Americas and Asia' — the draft list confirmed as the real one.
 *
 * The only change to their words is punctuation: their single sentence ended
 * '...quality and independence; none pays us for introductions.' The clause
 * after the semicolon is the heading, because a band of this size needs a
 * real h2 and the brief supplies no other candidate.
 */
export const network = {
  eyebrow: 'Our Network',
  heading: 'Every partner is chosen for quality and independence.',
  body:
    'We work with a carefully selected network of private banks, law firms, tax advisers, ' +
    'trust companies, real-estate advisers and private-equity firms in Switzerland, Europe, ' +
    'the Middle East, the Americas and Asia. None pays us for introductions.',
  /* The brief's 'Partners link only, no photos (photos and bios stay on the
     Partners page)'. This is that link, and Home carries no portrait. */
  link: { label: 'Meet the partners', to: '/partners' },
};

/* The brief's closing call to action, split across the heading and the line
   under it. Their text: 'Every family's situation is unique. Let us start
   with a conversation.' */
export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'Every family’s situation is unique.',
  body: 'Let us start with a conversation.',
};
