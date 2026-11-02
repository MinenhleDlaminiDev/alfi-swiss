/* Per-route metadata (ASP-14).
   Descriptions are written for search results: ~150-160 characters, each
   distinct, each describing what is actually on that page. */

export const seo = {
  home: {
    title: null, // home uses the bare firm name
    description:
      /* Rewritten in ASP-71 to the client's own positioning: an independent
         family office that structures wealth and selects providers but
         manages no assets. 'Independent wealth planning firm' is still the
         firm's strapline in the header and footer — this describes what the
         Home page now says, which is the brief's Introduction paragraph.
         Keep this matching the Home hero and that paragraph. */
      'An independent family office in Geneva. We structure wealth and select the banks, ' +
      'lawyers and advisers who serve you — with no products to sell.',
  },
  about: {
    title: 'About',
    description:
      /* Rewritten in ASP-72 to what the page now says: the brief's story,
         values, fee basis and the statement of what ALFI does not do. The
         fee line is the distinctive thing here, so it leads. */
      'Founded by two senior Swiss private bankers. Paid by clients alone, with no ' +
      'commissions or referral fees from the providers we recommend.',
  },
  whoWeServe: {
    title: 'Who We Serve',
    description:
      'Entrepreneurs after a sale or liquidity event, families across generations, and ' +
      'families living and investing in more than one country.',
  },
  services: {
    title: 'Services',
    description:
      /* Tracks the four published pillars. This has now been wrong twice for
         the same reason — it kept advertising services the page had stopped
         listing — so re-check it whenever a pillar is added or removed, and
         remember that three more are written and awaiting sign-off.

         It no longer says 'investment advice': the client's brief states
         that ALFI gives none (ASP-70). */
      'Wealth structuring, provider selection and oversight, projects and project ' +
      'finance, and bespoke concierge for entrepreneurs and international families.',
  },

  /* One entry per published service pillar, keyed by the slug in
     content/services.js. Each is built from that pillar's own promise and
     bullets rather than written fresh, so the search result and the page say
     the same thing. ServicePillar.jsx looks the slug up here directly, so a
     new pillar needs a row here or the page will fail to render. */
  servicePillars: {
    'wealth-structuring': {
      title: 'Wealth Structuring',
      description:
        'Holding, trust and foundation structures designed around your family, your ' +
        'assets and your jurisdictions, coordinated with lawyers and tax advisers in each.',
    },
    'provider-selection': {
      title: 'Provider Selection & Oversight',
      description:
        'We shortlist, select and negotiate with the banks and advisers who serve you — ' +
        'fees, service levels and credit terms — then hold them to account on your behalf.',
    },
    projects: {
      title: 'Projects & Project Finance',
      description:
        'Senior project management and project finance advice for complex ventures, with ' +
        'ALFI as the family’s single point of contact with every party involved.',
    },
    concierge: {
      title: 'Bespoke Concierge',
      description:
        'Travel and private aviation, events, and property search and management, handled ' +
        'through a small circle of trusted partners with the discretion of our advisory work.',
    },
  },
  /* Keyed `philosophy` and `team` until ASP-69, when the pages became Our
     Approach and Partners. The keys follow the routes so there is one name
     per page to look for. */
  ourApproach: {
    title: 'Our Approach',
    description:
      /* This description has now been wrong twice and corrected three times.
         ASP-59 replaced a version advertising 'four principles' and a
         'five-stage' process; the replacement said 'four stages', ASP-64 then
         removed stage 02 and it became three, and ASP-72 rebuilt the page to
         the client's five steps. It says FIVE because the page shows five.
         Count the steps in content/approach.js before editing this line. */
      'How ALFI Swiss Partners works: independent judgement from senior Geneva advisers, ' +
      'and the five steps of an engagement from first conversation to ongoing oversight.',
  },
  partners: {
    title: 'Partners',
    description:
      'The senior partners of ALFI Swiss Partners. Every engagement is led by a partner, ' +
      'with no layer between them and the work.',
  },
  contact: {
    title: 'Contact',
    description:
      'Senior-led relationships, conducted in confidence. Contact ALFI Swiss Partners in ' +
      'Geneva to begin a confidential discovery conversation.',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested does not exist or has been moved.',
  },
}
