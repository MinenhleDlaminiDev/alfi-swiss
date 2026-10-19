/* Home — gateway page (ASP-03). Source: content deck v1, slides 1-2. */

export const hero = {
  eyebrow: 'Independent Wealth Planning Firm',
  headingLines: ['Navigating Wealth.', 'Preserving Legacies.'],
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
  lead:
    'An independent wealth advisory firm headquartered in Geneva, providing senior-level ' +
    'strategic counsel and introductions for private clients, families, entrepreneurs ' +
    'and institutions.',
};

export const credentials = [
  {
    figure: '60+',
    /* ASP-28: the numeric part counts up on first entry. `figure` stays the
       truth — this only says how much of it is a number, and the rest ('+')
       is carried through unchanged. Remove this line and it renders flat.
       Both numbers move together, or the strip counts to one and displays
       the other. */
    count: 60,
    text: 'Years of combined experience across private banking, wealth advisory and institutional finance.',
  },
  {
    figure: 'Direct',
    text: 'Senior-partner access and curated introductions to leading private banks around the globe.',
  },
  {
    figure: 'Geneva',
    text: 'Headquartered in Switzerland.',
  },
];

export const positioning = {
  eyebrow: 'A Discreet Partner',
  heading: 'A discreet partner for complex wealth decisions.',
  body:
    /* 'combines the independence of an exclusive family office with' was
       rewritten in ASP-60. Family Office is a named service line of the
       reference site this project was benchmarked against, and ALFI calling
       itself one also implies managing assets, which the About page denies. */
    'ALFI Swiss Partners pairs genuine independence with the ' +
    'practical judgement of senior banking professionals. Our role is to help clients ' +
    'translate financial complexity into clear, durable decisions across investments, ' +
    'financing, estate planning and strategic opportunities.',
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

export const pillars = {
  eyebrow: 'Why Clients Come To Us',
  heading: 'An exclusive structure built around clarity, discretion and senior judgement.',
  items: [
    {
      n: '01', title: 'Independence', image: 'card-independence',
      /* 'As an independent family office' — see the note on `positioning`. */
      text:
        'Independent of any bank or group, so the institution or adviser we point a client ' +
        'towards is chosen on fit alone.',
    },
    {
      n: '02', title: 'Senior attention', image: 'card-senior-attention',
      text: 'Direct access to experienced partners throughout the relationship.',
    },
    {
      n: '03', title: 'Integrated view', image: 'card-integrated-view',
      text: 'Investments, risk, credit and estate planning considered together.',
    },
    {
      n: '04', title: 'Confidentiality', image: 'card-confidentiality',
      text: 'Relationships handled with the utmost discretion expected from a Swiss institution.',
    },
  ],
};

export const servicesTeaser = {
  eyebrow: 'Our Services',
  heading: 'A coordinated view of wealth.',
  body:
    /* Mirrors the Services hero lead, so the two move together (ASP-49). */
    'Clients rarely need isolated arrangements. They need banking relationships, risk and ' +
    'succession considered together.',
  link: { label: 'View All Services', to: '/services' },
};

export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'Senior-led relationships, conducted in confidence.',
  body: 'Every engagement begins with a confidential discovery conversation.',
};
