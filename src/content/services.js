/* Services (ASP-03). Source: content deck v1, slides 5-8. */

export const hero = {
  eyebrow: 'Our Services',
  headingLines: [
    'Integrated analysis across investments,',
    'credit, risk control and legacy planning.',
  ],
  lead:
    'Clients rarely need isolated products. They need a coordinated view of wealth: how ' +
    'banking relationships are structured, risks are controlled, opportunities are assessed, ' +
    'and decisions are prepared for the next generation.',
};

export const index = [
  {
    n: '01',
    id: 'wealth-management',
    title: 'Wealth Management',
    text:
      'Financial planning, intergenerational wealth transfer and coordination of banking ' +
      'relationships.',
  },
  {
    n: '02',
    id: 'investment-advisory',
    title: 'Portfolio & Investment Advisory',
    text:
      'Independent advice and introductions to private banks for portfolio strategy aligned ' +
      'with objectives and risk profile.',
  },
  {
    n: '03',
    id: 'alternatives',
    title: 'Alternatives & Structured Solutions',
    text:
      'Access-oriented review of hedge funds, structured products and alternative strategies ' +
      'sourced through partner banks.',
  },
  {
    n: '04',
    id: 'risk-credit',
    title: 'Risk & Credit Advisory',
    text:
      'Assessment and advisory on financial, market and credit risk, in coordination with ' +
      'banking partners.',
  },
  {
    n: '05',
    id: 'strategic-advisory',
    title: 'Corporate & Strategic Advisory',
    text: 'Independent counsel for entrepreneurs and family-owned businesses.',
  },
];

export const details = [
  {
    id: 'wealth-management',
    eyebrow: '01 — Wealth Management',
    heading: 'Bringing structure to complex financial lives.',
    body:
      'A client’s wealth is rarely held in one place or defined by one objective. We help ' +
      'bring structure to complex financial lives by advising on investment strategy, ' +
      'coordinating banking relationships, and aligning liquidity needs with long-term family ' +
      'priorities.',
    points: [
      'Personal balance-sheet review and planning priorities',
      'Portfolio strategy guidance and risk-profile alignment, delivered through partner banks',
      'Banking relationship coordination and reporting clarity',
      'Intergenerational wealth transfer considerations',
    ],
    image: {
      src: '/images/services-wealth-management.jpg',
      alt: 'Empty colonnaded stone corridor',
    },
    flip: false,
  },
  {
    id: 'investment-advisory',
    eyebrow: '02 — Investment Advisory, Alternatives & Risk',
    heading: 'Disciplined investing is not about chasing performance.',
    body:
      'This work is rigorous rather than promotional. It is how ALFI evaluates opportunities, ' +
      'advises on portfolio construction, and helps manage risk across changing market ' +
      'conditions — always delivered in partnership with the client’s chosen bank.',
    points: [
      'Strategic asset-allocation guidance and tactical positioning input',
      'Liquidity planning and ongoing monitoring, executed through partner banks',
      'Careful assessment of hedge funds, structured products and differentiated strategies',
      'A disciplined view of concentration, volatility, leverage, counterparty and credit exposure',
    ],
    image: {
      src: '/images/services-strategic-advisory.jpg',
      alt: 'Stone staircase descending into shadow',
    },
    flip: true,
  },
  {
    id: 'strategic-advisory',
    eyebrow: '03 — Strategic Advisory',
    heading: 'Wealth decisions often extend beyond portfolios.',
    body:
      'Families and family-owned businesses need guidance that recognises personal priorities, ' +
      'governance questions and the emotional complexity of succession.',
    points: [
      'Family governance: decision processes, roles and communication around shared assets',
      'Corporate advisory for owners facing strategic financial decisions and liquidity events',
      'Family-business continuity and succession planning',
    ],
    image: {
      src: '/images/philosophy-principles.jpg',
      alt: 'Monument pillars against the sky',
    },
    flip: false,
  },
];

export const closing = {
  eyebrow: 'Next Step',
  heading: 'Begin with a confidential discovery conversation.',
};
