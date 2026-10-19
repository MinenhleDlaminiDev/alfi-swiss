/* Per-route metadata (ASP-14).
   Descriptions are written for search results: ~150-160 characters, each
   distinct, each describing what is actually on that page. */

export const seo = {
  home: {
    title: null, // home uses the bare firm name
    description:
      'ALFI Swiss Partners is an independent wealth advisory firm in Geneva, providing ' +
      'senior-level counsel and introductions to leading private banks.',
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
      /* 'coordinated through a selected network of private banks' was
         dropped in ASP-49 with the same subordination wording on the page
         itself. The list below tracks the four index cards and was last
         brought into line in ASP-58, when 'alternatives' stopped being a
         card and 'management'/'advisory' became 'planning'/'advice'. A
         description that advertises a service the page no longer lists is
         worse than a short one — re-check it whenever the cards change. */
      'Wealth planning, portfolio and investment advice, risk and credit, and corporate ' +
      'and strategic advice for private clients, families and entrepreneurs.',
  },
  philosophy: {
    title: 'Investment Philosophy',
    description:
      /* Rewritten in ASP-59 with the page itself. The old one advertised
         'four principles' (removed) and a 'five-stage' process (four since
         ASP-48) — both wrong by the time anyone read them. The title above
         keeps the term 'Investment Philosophy' for search; no visible copy
         on the page uses it. */
      'How ALFI Swiss Partners works: independent judgement from senior Geneva advisers, ' +
      'and the four stages of a client engagement from first conversation to ongoing review.',
  },
  team: {
    title: 'Team',
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
