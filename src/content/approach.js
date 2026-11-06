/* Philosophy (ASP-03). Source: content deck v1, slides 9-10.

   REWRITTEN IN ASP-59. The client asked for this page to stop resembling the
   reference site the project was benchmarked against, prosperityam.ch. Three
   phrases were doing that work and are deliberately absent now:

     'stewardship'           — theirs: 'generational stewardship', '20+ YEARS
                               OF STEWARDSHIP'
     'purpose'               — their hero headline is 'Investing with purpose'
     'Investment Philosophy' — the exact title of their third section, and the
                               eyebrow this page used to open with

   Keep them out. The page title and nav label are still 'Philosophy', and the
   SEO title still reads 'Investment Philosophy' because that is what the page
   is about and search needs the term — but no visible copy uses it.

   The four PRINCIPLES that used to sit between the hero and the process were
   removed outright, with nothing in their place, on the same instruction. The
   card images went with them (card-preservation, card-diversification,
   card-risk-opportunity, card-monitoring); the masters stay in assets/images
   with their CREDITS rows. */

export const hero = {
  eyebrow: 'How We Work',
  headingLines: ['We start with the circumstances,', 'not with a model portfolio.'],
  lead:
    /* 'decades inside private banks' -> 'decades on the other side of the
       table' (ASP-63). It still says where the partners came from without
       naming private banks, which the site no longer does anywhere. */
    'Geneva has no shortage of firms with a house view to recommend. ALFI has none. What a ' +
    'client gets instead is the judgement of people who spent decades on the other side of ' +
    'the table, applied to their particular circumstances rather than to a template.',
};

/* The process (ASP-72). The client's brief sets out five steps and supplies
 * the wording for each; this is theirs, verbatim.
 *
 * THIS REVERSES ASP-64, which is worth knowing before anyone "fixes" it.
 * Two stages were taken off this page on the client's own instruction —
 * 'Strategy' in ASP-48, and 'The work' in ASP-64. The second went because it
 * described examining risks, liquidity, costs and exposures, and they asked
 * the site to shy away from advisory and investment language.
 *
 * Step 02 below says "we map your current structures, providers and costs,
 * and identify gaps, risks and opportunities" — that same language, put back
 * by the founders themselves in the November brief. The brief beats the live
 * site on the user's standing instruction, so it stays.
 *
 * The `n` values are display text, not indices, so nothing derives them.
 * Renumber by hand if a step is added or removed, AND update the section
 * heading, which states the count, AND the search description in
 * content/seo.js, which states it too. That description has now been wrong
 * three times running for exactly this reason.
 */
export const process = {
  eyebrow: 'How An Engagement Runs',
  heading: 'Five steps, and the same partner through all of them.',
  /* The brief's intro, verbatim. It replaces the October lead, which made the
     same point about continuity in different words — kept in the heading
     above, so nothing is lost. */
  lead:
    'Every engagement starts with listening. Our process is simple, transparent and led by a ' +
    'senior partner from start to finish.',
  steps: [
    {
      n: '01',
      title: 'Confidential conversation',
      text:
        'We meet to understand your family, your assets and your priorities. No commitment, ' +
        'no cost.',
    },
    {
      n: '02',
      title: 'Analysis',
      text:
        'We map your current structures, providers and costs, and identify gaps, risks and ' +
        'opportunities.',
    },
    {
      n: '03',
      title: 'Recommendations',
      text:
        'We present a clear plan: the structure we propose and the providers we recommend, ' +
        'with the reasons for each choice.',
    },
    {
      n: '04',
      title: 'Implementation',
      text:
        'We coordinate lawyers, tax advisers, banks and other specialists, and manage the ' +
        'process to completion.',
    },
    {
      n: '05',
      title: 'Ongoing oversight',
      text:
        'We review structures and providers regularly and adapt the plan as your family and ' +
        'circumstances evolve.',
    },
  ],
};

/* RETAINED, NOT RENDERED (5 Nov). The closing band came off this page when
   the client asked for 'Arrange a Conversation' on the first and last pages
   only. Home's band is the one that remains. */
export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'The best decisions are the ones a client understands completely.',
};
