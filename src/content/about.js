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
    /* 'the judgement required for long-term wealth stewardship' was reworded
       in ASP-60. 'Stewardship' is one of the reference site's signature words
       ('20+ YEARS OF STEWARDSHIP', 'generational stewardship', 'Stewarded the
       Swiss way'); ASP-59 took it off Philosophy and this finished the job. */
    'We draw on senior experience across private banking, wealth advisory and institutional ' +
    'finance, pairing analytical rigour with judgement earned over decades.',
    /* ASP-52. This sentence used to read 'ALFI does not manage portfolios nor
       give investment advice', which contradicted the whole Services page —
       three cards there are titled Advice. The client settled it on 19 Oct:
       ALFI DOES advise, so the denial was the thing that was wrong.

       The limit stayed in, deliberately. ASP-48 removed the regulatory notice
       and ASP-58 removed the 'advisory only; execution and custody remain with
       the client's own bank' line, so this is now the ONLY statement of scope
       anywhere on the site. Do not reduce it to 'ALFI advises' — a site that
       describes advice with no stated limit reads as discretionary management,
       which is a different regulated activity again. */
    'As an independent firm, ALFI advises on the decisions in front of a client, but does ' +
    'not manage portfolios or hold assets. We also introduce our clients to a carefully ' +
    'selected network of financial institutions, preserving our objectivity in every ' +
    'recommendation and giving clients continuity and direct access to decision makers.',
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
  /* ASP-61. This read 'An exclusive structure built around clarity, discretion
     and senior judgement' — the same heading, word for word, as the Home
     pillars section. That one kept it: clarity, discretion and senior
     judgement map onto its four cards (Integrated view, Confidentiality,
     Senior attention). These three are about independence, so the heading
     here says that instead. Keep them different. */
  heading: 'What independence actually changes.',
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
      /* Was 'Curated bank introductions' / 'We introduce clients to the
         financial institutions, trust companies or other advisers best
         suited to their needs and objectives.' The reference site describes
         the same service in nearly the same words — 'we introduce clients to
         associated Swiss banks and independent portfolio and asset managers'
         — and this was the closest substantive overlap the ASP-60 audit
         found. Reworded rather than removed: it is ALFI's core proposition. */
      title: 'Access to the right institutions',
      text:
        'Where a bank, trust company or specialist adviser is needed, a partner makes the ' +
        'introduction personally and explains why that one.',
    },
    {
      n: '03',
      image: 'card-long-term',
      title: 'Long-term perspective',
      /* 'legacy preservation' reworded in ASP-60 — see the note on `story`. */
      text:
        'Success is measured by durable outcomes, client continuity and decisions that ' +
        'still hold years later.',
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
