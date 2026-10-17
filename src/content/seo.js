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
         itself. The services listed are unchanged — strategic advisory lost
         its detail section, not the service. */
      'Wealth management, portfolio and investment advisory, alternatives, risk and credit, ' +
      'and corporate and strategic advisory for private clients, families and entrepreneurs.',
  },
  philosophy: {
    title: 'Investment Philosophy',
    description:
      'Protect capital, seek opportunity, stay disciplined. The four principles and the ' +
      'five-stage client process behind every ALFI Swiss Partners recommendation.',
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
