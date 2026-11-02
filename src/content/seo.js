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
      'Independent by design and relationship-led by nature. ALFI Swiss Partners serves ' +
      'high-net-worth individuals, families, entrepreneurs and institutions from Geneva.',
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
      /* This description has now been wrong twice. ASP-59 replaced a version
         advertising 'four principles' and a 'five-stage' process; the
         replacement said 'four stages', and ASP-64 then removed stage 02.
         It says THREE because the page shows three. Count the stages in
         content/approach.js before editing this line. */
      'How ALFI Swiss Partners works: independent judgement from senior Geneva advisers, ' +
      'and the three stages of a client engagement from first conversation to ongoing review.',
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
