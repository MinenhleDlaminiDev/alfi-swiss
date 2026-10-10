/* About (ASP-03). Source: content deck v1, slides 3, 4 and 11.
   Deck typos corrected: 'financial constitutions' to 'financial institutions';
   'ifrom' to 'from'; 'the internal pressures of large large' to 'of large institutions'. */

export const hero = {
  eyebrow: 'About Us',
  headingLines: ['Independent by design.', 'Relationship-led by nature.'],
  lead:
    'Headquartered in Geneva, ALFI Swiss Partners serves high-net-worth individuals, families, ' +
    'entrepreneurs and institutions seeking thoughtful guidance outside the constraints of a ' +
    'large institution.',
};

export const story = {
  paragraphs: [
    'We draw on senior experience across private banking, wealth advisory and institutional ' +
    'finance, pairing analytical rigour with the judgement required for long-term wealth ' +
    'stewardship.',
    'As an independent firm, ALFI does not manage portfolios nor give investment advice. ' +
    'Instead, we introduce our clients to a carefully selected network of financial ' +
    'institutions, preserving our objectivity in every recommendation and giving clients ' +
    'continuity and direct access to decision makers.',
  ],
  pullquote: 'An independent, connected and enduring Swiss partner.',
  /* "Swiss" was dropped from the alt text when the landscape masters came in:
     the new photograph's location is not recorded, and the old one named a
     country nobody had verified. */
  image: {
    slug: 'about-firm',
    alt: 'Mountains above open water, in black and white',
    /* Thematic, not a place. The master's location is not recorded, and
       "Swiss" was already removed from this image's alt text for exactly
       that reason — a caption naming a country would put it straight back. */
    caption: 'Judgement built over decades',
  },
};

export const differentiators = {
  eyebrow: 'Why ALFI Swiss Partners',
  heading: 'An exclusive structure built around clarity, discretion and senior judgement.',
  items: [
    {
      n: '01',
      image: 'card-independent-advice',
      title: 'Independent advice',
      text:
        'Free from the internal pressures of large institutions, we assess solutions and ' +
        'partners on merit and suitability alone.',
    },
    {
      n: '02',
      image: 'card-bank-introductions',
      title: 'Curated bank introductions',
      text:
        'We introduce clients to the financial institutions, trust companies or other ' +
        'advisers best suited to their needs and objectives.',
    },
    {
      n: '03',
      image: 'card-long-term',
      title: 'Long-term perspective',
      text: 'Success is measured by durable outcomes, client continuity and legacy preservation.',
    },
  ],
};

export const clients = {
  eyebrow: 'Who We Serve',
  heading: 'Advisory for clients whose financial lives require discretion.',
  note: 'Selective, discreet, reassuring — never mass-market.',
  /* No `image` on these four, unlike every other card set on the site. They
     describe PEOPLE, and the abstract architectural photography that works
     for a principle or a service reads as a stand-in for a client when it
     sits above "High-net-worth individuals". NumberedCards renders an item
     without an image as a plain panel, so nothing else has to change. */
  items: [
    {
      n: '01',
      title: 'High-net-worth individuals',
      text: 'Portfolio strategy guidance, risk review and long-term wealth planning.',
    },
    {
      n: '02',
      title: 'Families and family offices',
      text: 'Intergenerational continuity, governance and specialist coordination.',
    },
    {
      n: '03',
      title: 'Business owners',
      text: 'Strategic advice around liquidity, concentration risk and business transitions.',
    },
    {
      n: '04',
      title: 'Institutions and foundations',
      text: 'Investment governance, risk oversight and advisory support.',
    },
  ],
};
