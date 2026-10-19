/* Services (ASP-03, rewritten in ASP-49). Source: content deck v1, slides 5-8.

   Anchor ownership: the `details` sections own the DOM ids. The `index` rows
   are links INTO them (`linkTo`), and deliberately carry no id of their own —
   otherwise a deep link like #wealth-management would match two elements.
   Row 03 points at the investment-advisory section, which covers it. Row 04
   points at NOTHING by design: its detail section was removed in ASP-49 and
   the card was kept, so `linkTo` is omitted and the card renders as a plain
   panel rather than a link to an anchor that is not there.

   The section ids are the old names (`wealth-management`) while the copy now
   reads 'Wealth Planning' (ASP-57). The id is only a URL fragment, so it was
   left alone rather than break any link already shared.

   ---- On the bank wording (ASP-49) ----

   The client asked that the copy stop reading as though ALFI operates under a
   bank's authority. It previously said work was 'delivered through partner
   banks', 'executed through partner banks', 'sourced through partner banks'
   and 'always delivered in partnership with the client's chosen bank' — four
   separate phrases putting ALFI in the junior seat.

   Those phrases were doing a second job, though: they were the site's signal
   that ALFI does not execute, hold or manage client money. ASP-48 removed the
   regulatory notice from the footer and Contact, which was the only other
   place that was stated. So the subordination is gone and the SCOPE is now
   stated once, plainly, as a fact about who does what — see the second point
   under investment-advisory. ALFI advises; the client's own bank executes and
   custodies. That reads as independence rather than deference, and it keeps
   the site from implying a regulated activity it does not perform.

   If that single line is ever removed, nothing on the site distinguishes an
   independent adviser from a discretionary manager. */

export const hero = {
  eyebrow: 'Our Services',
  headingLines: [
    'Integrated analysis across investments,',
    'credit, risk control and legacy planning.',
  ],
  lead:
    'Clients rarely need isolated arrangements. They need a coordinated view of wealth: how ' +
    'banking relationships are structured, risks are controlled, opportunities are assessed, ' +
    'and decisions are prepared for the next generation.',
};

export const index = [
  {
    n: '01',
    linkTo: 'wealth-management',
    title: 'Wealth Planning',
    image: 'card-svc-wealth',
    text:
      'Financial planning, intergenerational wealth transfer and coordination of banking ' +
      'relationships.',
  },
  {
    n: '02',
    linkTo: 'investment-advisory',
    title: 'Portfolio & Investment Advice',
    image: 'card-svc-portfolio',
    text:
      'Introductions to private banks for portfolio strategy aligned with objectives and ' +
      'risk profile.',
  },
  /* 'Alternatives & Structured Solutions' was card 03 until ASP-57, when the
     client removed it. The service itself is not gone: the investment-advisory
     section below still carries 'Careful assessment of hedge funds, structured
     solutions and differentiated strategies'. Only the card has gone, so the
     cards below renumbered. Its master photograph, card-svc-alternatives, is
     now unused and stays in assets/images with its CREDITS row. */
  {
    n: '03',
    linkTo: 'investment-advisory',
    title: 'Risk & Credit Advisory',
    image: 'card-svc-risk',
    /* 'market' removed here, not from a Philosophy principle: the fix list
       said 'the fourth card', and this is the fourth card that contains the
       word. Confirmed with the client before editing. */
    text:
      'Assessment and advisory on financial and credit risk, including concentration, ' +
      'leverage and counterparty exposure.',
  },
  {
    /* No `linkTo`: the Strategic Advisory detail section was removed in
       ASP-49 and this card was kept. Pointing it at #strategic-advisory
       would scroll to nothing. */
    n: '04',
    title: 'Corporate & Strategic Advisory',
    /* Was card-svc-strategic, an ornate nineteenth-century ballroom — the
       least modern image on the site, which is what the client objected to.
       This one is a glass tower seen from below, and it came free when the
       'Who we serve' pictures were removed in ASP-48. */
    image: 'card-business-owners',
    text: 'Independent counsel for entrepreneurs and family-owned businesses.',
  },
];

export const details = [
  {
    id: 'wealth-management',
    eyebrow: '01 — Wealth Planning',
    heading: 'Bringing structure to complex financial lives.',
    body:
      'A client’s wealth is rarely held in one place or defined by one objective. We help ' +
      'bring structure to complex financial lives by advising on investments, coordinating ' +
      'banking relationships, and aligning liquidity needs with long-term family priorities.',
    points: [
      'Personal balance-sheet review and planning priorities',
      /* 'Portfolio strategy guidance and risk-profile alignment, delivered
         through partner banks' was removed here on the client's instruction
         (ASP-49). The risk-profile work it described is still covered by the
         investment-advisory section below. */
      'Banking relationship coordination and consolidated reporting',
      'Intergenerational wealth transfer considerations',
    ],
    image: {
      slug: 'services-wealth-management',
      caption: 'Structure, held over time',
      alt: 'An empty stone walkway inside a stone building',
    },
    flip: false,
  },
  {
    id: 'investment-advisory',
    eyebrow: '02 — Investment Advice, Alternatives & Risk',
    heading: 'Disciplined investing is not about chasing performance.',
    body:
      'This work is rigorous rather than promotional. It is how ALFI evaluates opportunities, ' +
      'advises on allocation, and assesses the risks a client is carrying as conditions ' +
      'change.',
    points: [
      'Strategic asset-allocation guidance and tactical positioning input',
      /* The one place the site now states the division of responsibility.
         It replaces four separate 'through partner banks' phrases, and it
         is the only thing distinguishing an independent adviser from a
         discretionary manager now that the regulatory notice is gone
         (ASP-48). Do not remove it without replacing it. */
      'Liquidity planning and ongoing monitoring — advisory only; execution and custody ' +
      'remain with the client’s own bank',
      'Careful assessment of hedge funds, structured solutions and differentiated strategies',
      'A disciplined view of concentration, volatility, leverage, counterparty and credit exposure',
    ],
    image: {
      slug: 'services-investment-advisory',
      caption: 'Discipline over performance',
      alt: 'Windows repeating in a grid across a dark facade',
    },
    flip: true,
  },
  /* The third detail section, '03 — Strategic Advisory', was removed in
     ASP-49 on the client's instruction. The service itself is still offered
     and still appears as index card 05; only the long write-up has gone, so
     that card no longer links anywhere.

     Its master photograph, services-strategic-advisory.jpg, stays in
     assets/images with its CREDITS row — the section can be restored from
     git history without re-sourcing the picture. */
];

export const closing = {
  eyebrow: 'Next Step',
  heading: 'Begin with a confidential discovery conversation.',
};
