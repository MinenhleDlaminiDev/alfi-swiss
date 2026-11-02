/* Services (ASP-70). Rebuilt from the client's own documents.
 *
 * SOURCES, AND WHY THAT MATTERS. Every sentence below is the client's, taken
 * from one of two places and marked where it is not obvious:
 *
 *   the brief    ASP-Website CR.docx, written by the founders after they
 *                reviewed the built site. It supplies the overview intro and
 *                the promise and bullets for all seven pillars.
 *   the answers  ANSWERS-ASP.docx, 2 Nov 2026. It supplies the five missing
 *                'How it helps you' paragraphs and the whole of Concierge.
 *
 * Do not reword any of it to fit a line length. The founders rejected the
 * previous copy on this page; this is what they wrote in its place.
 *
 * ---- THIS PAGE REVERSES ASP-52 ----
 *
 * Until now Services offered 'Portfolio & Investment Advice', 'Risk & Credit
 * Advice' and 'Corporate & Strategic Advice'. Those titles came from October,
 * when the client had the About disclaimer flipped to say ALFI does advise.
 * The brief says the opposite in plain words:
 *
 *   'ALFI does not manage portfolios, give investment or financial-markets
 *    advice, hold client assets or act as a bank.'
 *
 * The founders wrote that after seeing the site, and the standing instruction
 * is that the brief wins. So those three titles are gone. If anyone asks why
 * the Advice cards disappeared, that is the answer.
 *
 * ---- FOUR PUBLISHED, THREE HELD ----
 *
 * The brief marks three pillars as suggestions borrowed from peer family
 * offices that 'need the partners' approval before publication'. The answers
 * document names them: Succession & Family Governance, Entrepreneurs &
 * Business Owners, International Mobility & Residency. Not approved means not
 * published, so they are not here at all — not as stubs, not in the index.
 * Their copy is written and waiting on ASP-70 in Notion.
 *
 * The same rule removed one bullet from Provider Selection below.
 *
 * ---- PILLARS ARE PAGES NOW ----
 *
 * The brief says Services 'opens into seven subpages' and the sitemap diagram
 * draws them as pages, so each has a route at /services/<slug> rendered by
 * one template, src/pages/ServicePillar.jsx. The old `details` array and its
 * in-page anchors are gone with it.
 *
 * That also fixed a defect: Home builds its teaser links from this array, and
 * three of the four old entries had no `linkTo`, so Home was linking to
 * /services#undefined. A pillar now carries a `slug` that is a real route.
 *
 * ---- PHOTOGRAPHS ----
 *
 * All reused from the existing set in assets/images, on the user's
 * instruction — no new sourcing, no new licence checks. Each pillar uses a
 * picture nothing else on the site uses, so no photograph appears twice.
 */

export const hero = {
  eyebrow: 'Our Services',
  /* The brief gives no headline for this page, only the overview intro. Rather
     than write one, the intro is split across the two slots the hero already
     has: its first sentence here, the rest as the lead. Still their words. */
  headingLines: [
    'We act as the architect and coordinator',
    'of your family’s wealth.',
  ],
  lead:
    'We design the structure, assemble the right team of specialists, and make sure ' +
    'everyone delivers — so you can focus on your business, your family and your life.',
};

/* The four published pillars. This single array drives the index on /services,
   the four subpages, and the teaser list on Home — one definition, so the
   three cannot drift apart.

   `image` is the card photograph; `figure` is the wide one on the subpage. */
export const pillars = [
  {
    n: '01',
    slug: 'wealth-structuring',
    title: 'Wealth Structuring',
    promise:
      'A clear, robust structure for your assets, built around your family and your ' +
      'jurisdictions.',
    image: 'card-svc-wealth',
    figure: {
      slug: 'services-wealth-management',
      caption: 'Structure, held over time',
      alt: 'An empty stone walkway inside a stone building',
    },
    points: [
      'Map the family’s assets, residences, citizenships and objectives.',
      'Design holding, trust, foundation and partnership structures.',
      'Coordinate lawyers, tax advisers and trust companies in each jurisdiction.',
      'Review existing structures for efficiency, compliance and fitness for purpose.',
      'Structure the ownership of real estate, operating businesses and lifestyle assets (art, yachts, aircraft).',
    ],
    helps:
      'Your wealth is protected, compliant and organised in a way that serves your ' +
      'family’s goals — today and for the next generation.',
  },
  {
    n: '02',
    slug: 'provider-selection',
    title: 'Provider Selection & Oversight',
    promise: 'The right banks and advisers, on the right terms, held to account.',
    image: 'card-institutions',
    figure: {
      slug: 'services-investment-advisory',
      caption: 'Institutions, chosen and held to account',
      alt: 'A dark building facade, its windows set in a grid',
    },
    /* The brief has a fifth bullet here that it marks '[Proposed]' in its own
       text: 'Monitor providers on your behalf: consolidated reporting across
       banks, fee and cost reviews, performance and service reviews.' Same
       rule as the three held pillars — proposed means unpublished. It goes in
       when they are signed off. */
    points: [
      'Define your requirements and draw up a shortlist of banks, lawyers, tax advisers, trust companies, real-estate advisers and private-equity firms.',
      'Run a structured selection process: due diligence, proposals, interviews, comparison.',
      'Negotiate fees, service levels and credit terms (including Lombard loans and mortgages).',
      'Support account opening and onboarding.',
    ],
    helps:
      'With 40+ years each on the banking side, our partners know what to ask, what is ' +
      'negotiable and what good looks like. You get a better choice, better terms and an ' +
      'independent check that your providers deliver.',
  },
  {
    n: '03',
    slug: 'projects',
    title: 'Projects & Project Finance',
    promise: 'Senior hands-on support for complex projects.',
    image: 'card-business-owners',
    figure: {
      slug: 'services-strategic-advisory',
      caption: 'One point of contact, start to finish',
      alt: 'A concrete staircase in light and shadow',
    },
    points: [
      'Project management on behalf of the family: planning, coordination, reporting.',
      'Advice on project finance: structuring, sourcing lenders and co-investors, negotiating terms.',
      'Oversight of real-estate developments and other major investments.',
      'Acting as the family’s single point of contact with all parties.',
    ],
    /* From the answers document — the brief left this one blank. */
    helps:
      'Complex projects need someone senior who represents only your interests. We keep ' +
      'the timetable, budget and financing on track, challenge the parties involved and ' +
      'report to you clearly. You get the benefit of an experienced project lead without ' +
      'building a team of your own.',
  },
  {
    n: '04',
    slug: 'concierge',
    title: 'Bespoke Concierge',
    /* The brief gave this pillar only a paragraph and a note to 'keep this
       short and discreet so it does not dilute the advisory image'. The
       promise and the three lines below are from the answers document, which
       is newer — so where its list drops the brief's mention of security, the
       list wins. The brief's 'through our partners' is carried in the body
       rather than the title, which the client wrote without it. */
    promise: 'Life’s practical details, handled with the same care as your wealth.',
    image: 'card-svc-alternatives',
    figure: {
      slug: 'contact-geneva',
      caption: 'Geneva, and wherever else life requires',
      alt: 'Geneva, the lake and the Jet d’Eau',
    },
    points: [
      'Travel and private aviation',
      'Events and private occasions',
      'Property search, rental and management',
    ],
    helps:
      'One trusted point of contact for the practical side of life, as well as for your ' +
      'wealth. You save time, and every provider is one we know and stand behind.',
  },
];

export const closing = {
  eyebrow: 'Next Step',
  /* The brief asks every subpage to end with its own call to action and never
     writes one; question 7 to the client came back answered with the menu
     structure by mistake. Rather than hold the build for one line, the
     subpages close with the wording already on the site. The user's decision,
     2 Nov: leave it as it is for now. */
  heading: 'Begin with a confidential discovery conversation.',
};
