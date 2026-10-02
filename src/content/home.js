/* Home — gateway page (ASP-03). Source: content deck v1, slides 1-2. */

export const hero = {
  eyebrow: 'Independent Wealth Advisory Firm',
  headingLines: ['Navigating Wealth.', 'Preserving Legacies.'],
  lead:
    'An independent wealth advisory firm headquartered in Geneva, providing senior-level ' +
    'strategic counsel and introductions to leading private banks for private clients, ' +
    'families, entrepreneurs and institutions.',
};

export const credentials = [
  {
    figure: '40+',
    text: 'Years of combined experience across private banking, wealth advisory and institutional finance.',
  },
  {
    figure: 'Direct',
    text: 'Senior-partner access and curated introductions to leading private banks around the globe.',
  },
  {
    figure: 'Geneva',
    text: 'Headquartered in Switzerland, with international meetings across Europe by arrangement.',
  },
];

export const positioning = {
  eyebrow: 'A Discreet Partner',
  heading: 'A discreet partner for complex wealth decisions.',
  body:
    'ALFI Swiss Partners combines the independence of an exclusive family office with the ' +
    'practical judgement of senior banking professionals. Our role is to help clients ' +
    'translate financial complexity into clear, durable decisions across investments, ' +
    'financing, estate planning and strategic opportunities.',
  link: { label: 'More about the firm', to: '/about' },
  image: { src: '/images/home-positioning.jpg', alt: 'Colonnaded stone hall' },
};

export const pillars = {
  eyebrow: 'Why Clients Come To Us',
  heading: 'An exclusive structure built around clarity, discretion and senior judgement.',
  items: [
    {
      n: '01', title: 'Independence',
      text: 'As an independent family office, we find the most adequate advisers for our clients.',
    },
    {
      n: '02', title: 'Senior attention',
      text: 'Direct access to experienced partners throughout the relationship.',
    },
    {
      n: '03', title: 'Integrated view',
      text: 'Investments, risk, credit and estate planning considered together.',
    },
    {
      n: '04', title: 'Confidentiality',
      text: 'Relationships handled with the utmost discretion expected from a Swiss institution.',
    },
  ],
};

export const servicesTeaser = {
  eyebrow: 'Our Services',
  heading: 'A coordinated view of wealth.',
  body:
    'Clients rarely need isolated products. They need banking relationships, risk and ' +
    'succession considered together.',
  link: { label: 'View All Services', to: '/services' },
};

export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'Senior-led relationships, conducted in confidence.',
  body: 'Every engagement begins with a confidential discovery conversation.',
};
