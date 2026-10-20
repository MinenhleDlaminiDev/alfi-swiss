/* Services (ASP-03, rewritten in ASP-49). Source: content deck v1, slides 5-8.

   Anchor ownership: the `details` sections own the DOM ids. The `index` rows
   are links INTO them (`linkTo`), and deliberately carry no id of their own —
   otherwise a deep link like #wealth-management would match two elements.
   After ASP-58 only row 01 still links anywhere. Rows 02, 03 and 04 point at
   NOTHING by design: the sections they described have been removed while the
   cards were kept, so `linkTo` is omitted and each renders as a plain panel
   rather than a link to an anchor that is not there.

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
   place that was stated. So ASP-49 restated the SCOPE once, plainly, as a
   fact about who does what: 'advisory only; execution and custody remain with
   the client's own bank'.

   THAT LINE IS NOW GONE TOO. It sat inside the investment-advisory section,
   which the client removed entirely in ASP-58. Nothing on the site now
   distinguishes an independent adviser from a discretionary manager, while
   Services offers 'Investment Advice' and About says ALFI gives none. That is
   a live question for the client and is tracked on ASP-52 — do not treat the
   silence as settled. */

export const hero = {
  eyebrow: 'Our Services',
  headingLines: [
    'Integrated analysis across investments,',
    /* 'legacy planning' reworded in ASP-60: 'legacy' is reference-site
       vocabulary ('building a legacy', 'Preserving values. Building
       legacies.'). */
    'credit, risk control and family continuity.',
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
    title: 'Portfolio & Investment Advice',
    image: 'card-svc-portfolio',
    /* ASP-62: 'private banks' out, 'banking needs' in, on the client's
       instruction. Their note read 'Remove private banks to banking needs',
       which does not parse as a straight swap, so this is the grammatical
       version of it — the same rule agreed for the ASP-58 heading. */
    text:
      'Introductions for banking needs and portfolio strategy aligned with objectives and ' +
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
    title: 'Risk & Credit Advice',
    image: 'card-svc-risk',
    /* 'market' removed here, not from a Philosophy principle: the fix list
       said 'the fourth card', and this is the fourth card that contains the
       word. Confirmed with the client before editing. */
    text:
      'Assessment and advice on financial and credit risk, including concentration, ' +
      'leverage and counterparty exposure.',
  },
  {
    /* No `linkTo`: the Strategic Advisory detail section was removed in
       ASP-49 and this card was kept. Pointing it at #strategic-advisory
       would scroll to nothing. */
    n: '04',
    title: 'Corporate & Strategic Advice',
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
    heading: 'Bringing complex needs together — coordinating banking relationships and other services.',
    /* ASP-58: the client struck out everything after the opening sentence, so
       the body is now that one line. Their replacement heading read 'Bringing
       complex needs to cordinagimg banking needs and other services'; the
       grammatical version above was agreed before it went in. */
    body: 'A client’s wealth is rarely held in one place or defined by one objective.',
    points: [
      'Personal balance-sheet review and planning priorities',
      /* 'Portfolio strategy guidance and risk-profile alignment, delivered
         through partner banks' was removed here on the client's instruction
         (ASP-49). */
      'Banking relationship coordination and consolidated reporting',
      /* 'Intergenerational wealth transfer considerations' was point three
         until ASP-58, when the client replaced it with the two below. They
         wrote them as bare titles; they are set in the list's sentence case. */
      'Wealth structuring',
      'Intermediation',
    ],
    image: {
      slug: 'services-wealth-management',
      caption: 'Structure, held over time',
      alt: 'An empty stone walkway inside a stone building',
    },
    flip: false,
  },
  /* Two further detail sections have been removed on the client's instruction:
     '03 — Strategic Advisory' in ASP-49, and '02 — Investment Advice,
     Alternatives & Risk' in ASP-58. Only the write-ups have gone; the services
     themselves are still offered and still appear as index cards, which is why
     cards 02, 03 and 04 now carry no `linkTo`.

     Both master photographs — services-investment-advisory.jpg and
     services-strategic-advisory.jpg — stay in assets/images with their CREDITS
     rows, so either section can be restored from git history without
     re-sourcing the picture.

     WHAT WENT WITH SECTION 02. It held the site's only statement of scope:
     'Liquidity planning and ongoing monitoring — advisory only; execution and
     custody remain with the client's own bank'. ASP-48 had already removed the
     regulatory notice, so nothing on the site now says ALFI does not execute,
     hold or manage client money. The removal was confirmed with that
     consequence on the table; it is recorded on ASP-52 for the client. */
];

export const closing = {
  eyebrow: 'Next Step',
  heading: 'Begin with a confidential discovery conversation.',
};
