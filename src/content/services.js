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
 * ---- ALL SEVEN ARE PUBLISHED NOW (ASP-76) ----
 *
 * The brief marked three pillars as suggestions borrowed from peer family
 * offices that 'need the partners' approval before publication', and the
 * answers document named them: Succession & Family Governance, Entrepreneurs
 * & Business Owners, International Mobility & Residency. They were held back
 * from ASP-70 entirely — not as stubs, not in the index.
 *
 * On 2 Nov the founders supplied the client-facing copy for all three in
 * 'Website - Profiles of AF & AD.docx'. Writing the copy is the approval the
 * brief asked for, so they are in. Their promise and bullets come from the
 * brief; the 'How it helps you' paragraph on each is from that document,
 * which is the only place it exists.
 *
 * ONE PROPOSED ITEM IS STILL OUT: the fifth bullet on Provider Selection,
 * which the brief marks '[Proposed]' in its own text. The founders approved
 * three PILLARS, not that bullet, and nobody has asked them about it. See the
 * note on that pillar below.
 *
 * ---- NUMBERING FOLLOWS THE BRIEF, SLUGS DO NOT CHANGE ----
 *
 * `n` runs 01 to 07 in the brief's order, which is also the order the
 * founders used when they wrote the three new paragraphs ('3.', '4.', '6.').
 * That renumbered two existing pillars — Projects moved from 03 to 05 and
 * Concierge from 04 to 07 — but their slugs are untouched, so every URL that
 * has ever been shared still resolves. Keep it that way: `n` is display text,
 * the slug is the contract.
 *
 * ---- FOUR OF THE SEVEN APPEAR ON HOME ----
 *
 * `onHome` marks them. The brief is explicit that the Home page carries four
 * service tiles while Services holds seven, and it names the four: Wealth
 * Structuring, Provider Selection & Oversight, Succession & Family Governance
 * and Projects & Project Finance. Bespoke Concierge was on Home only because
 * it was one of the four that existed; it comes off now, and stays on
 * Services.
 *
 * A flag rather than a slice of four, because a slice silently picks whatever
 * happens to be first if this array is ever reordered.
 *
 * ---- PILLARS ARE PAGES NOW ----
 *
 * The brief says Services 'opens into seven subpages' and the sitemap diagram
 * draws them as pages, so each has a route at /services/<slug>. The old
 * `details` array and its in-page anchors are gone with it.
 *
 * ASP-82 CHANGED WHAT THAT ROUTE RENDERS, not whether it exists. The write-up
 * is a dialog over the Services index now — src/components/PillarModal — and
 * the route opens the index with it showing. Every slug below is still a live
 * URL. The old one-page-per-pillar template, src/pages/ServicePillar.jsx, was
 * deleted; this data is unchanged and drives the dialog as it drove the page.
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
 *
 * ASP-76 took the last six that were free. Three of them are card masters
 * used as the wide `figure` on the new subpages, which is fine — Figure
 * imposes its own frame ratio and crops to it — but it means there are only
 * four unused slugs left in the manifest. A new section needing photography
 * now needs new photography, with the licence check that comes with it. See
 * [card-system-and-images].
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

/* All seven pillars. This single array drives the index on /services, the
   seven subpages, and the teaser list on Home — one definition, so the three
   cannot drift apart. Home shows only the four marked `onHome`.

   `image` is the card photograph; `figure` is the wide one on the subpage. */
export const pillars = [
  {
    n: '01',
    slug: 'wealth-structuring',
    onHome: true,
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
    /* NOTHING RENDERS `helps` SINCE ASP-85, on all seven pillars.
     *
     * The service dialog used to carry a 'How it helps you' band and the user
     * had it taken out. The copy is kept rather than deleted, because every
     * one of these paragraphs is the founders' own and the brief asks for the
     * section by name — this is not ours to throw away, and restoring the
     * band is a few lines in components/PillarModal.
     *
     * Where each came from, checked against the documents on 3 Nov:
     *
     *   wealth-structuring, provider-selection    the brief, ASP-Website CR.docx
     *   projects, concierge                       ANSWERS-ASP.docx
     *   succession-governance, entrepreneurs,
     *   international-mobility                    Website - Profiles of AF & AD.docx
     */
    helps:
      'Your wealth is protected, compliant and organised in a way that serves your ' +
      'family’s goals — today and for the next generation.',
  },
  {
    n: '02',
    slug: 'provider-selection',
    onHome: true,
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
       banks, fee and cost reviews, performance and service reviews.'

       STILL OUT as of ASP-76. The three held pillars were signed off when the
       founders wrote their copy, but this bullet was never put to them — it
       was not one of the three they were asked about. Adding it on the
       strength of their answer to a different question would be us deciding
       what service they offer. Ask, then add. */
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
    slug: 'succession-governance',
    onHome: true,
    title: 'Succession & Family Governance',
    promise: 'Keeping wealth and family together across generations.',
    image: 'card-families',
    figure: {
      slug: 'card-preservation',
      caption: 'One generation to the next',
      alt: 'A stone colonnade receding into shadow',
    },
    points: [
      'Succession and estate planning, coordinated with legal and tax advisers.',
      'Family charters, family councils and decision-making frameworks.',
      'Preparing and educating the next generation.',
      'Philanthropy: setting up foundations and shaping a giving strategy.',
      'Mediation support and coordination when tensions or disputes arise.',
    ],
    /* From the profiles document, 2 Nov. The brief gave this pillar no
       'How it helps you' paragraph at all. */
    helps:
      'Wealth that lasts across generations needs more than a will. We help families plan ' +
      'how assets, responsibilities and decision-making will pass from one generation to ' +
      'the next, and put in place the structures that keep everyone aligned, from family ' +
      'charters and councils to clear roles for the next generation. Working with trusted ' +
      'legal and tax partners, we make sure your intentions are documented, understood ' +
      'and carried out.',
  },
  {
    n: '04',
    slug: 'entrepreneurs',
    title: 'Entrepreneurs & Business Owners',
    promise: 'Turning business success into lasting family wealth.',
    image: 'card-svc-strategic',
    figure: {
      slug: 'card-svc-portfolio',
      caption: 'The business and the family, considered together',
      alt: 'A glass facade reflecting the building opposite',
    },
    points: [
      'Preparing the owner and the family before a sale, IPO or transfer of the business.',
      'Coordinating M&A advisers, lawyers and tax specialists.',
      'Structuring and placing sale proceeds with selected institutions.',
      'Governance of the family business and separation of business and private wealth.',
    ],
    /* From the profiles document, 2 Nov. */
    helps:
      'For founders and business owners, personal and company wealth are often deeply ' +
      'intertwined. We help you see the full picture, from structuring your holdings and ' +
      'planning for liquidity to preparing for a sale, a handover or the next venture. ' +
      'Whether you are growing, exiting or reinvesting, we coordinate the right ' +
      'specialists so your business decisions and your family’s long-term interests work ' +
      'together.',
  },
  {
    n: '05',
    slug: 'projects',
    onHome: true,
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
    n: '06',
    slug: 'international-mobility',
    title: 'International Mobility & Residency',
    promise: 'Moving your life across borders, smoothly.',
    image: 'card-hnw-individuals',
    figure: {
      slug: 'card-diversification',
      caption: 'Several countries, one plan',
      alt: 'An arched passage opening onto daylight',
    },
    points: [
      'Coordinating advice on residency, relocation and citizenship, including relocation to Switzerland.',
      'Tax and legal planning before and after a move, through our specialist network.',
      'Practical support: banking, property, schooling and healthcare access.',
    ],
    /* From the profiles document, 2 Nov. */
    helps:
      'Moving between countries, or living across several, raises questions about ' +
      'residency, tax, property and family logistics. We help you and your family plan ' +
      'relocations and cross-border lives with clarity, coordinating with specialists in ' +
      'each jurisdiction to handle residency options, compliance and practical ' +
      'arrangements. The aim is simple: a move that feels considered, not complicated.',
  },
  {
    n: '07',
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
