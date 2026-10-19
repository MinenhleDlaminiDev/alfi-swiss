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
    'Geneva has no shortage of firms with a house view to recommend. ALFI has none. What a ' +
    'client gets instead is the judgement of people who spent decades inside private banks, ' +
    'applied to their particular circumstances rather than to a template.',
};

export const process = {
  eyebrow: 'How An Engagement Runs',
  heading: 'Four stages, and the same partner through all of them.',
  lead:
    'Nothing is handed to a junior team once the relationship starts. The partner who takes ' +
    'the first meeting is the one who reviews the file two years later.',
  /* 'Strategy' was removed on the client's instruction (ASP-48), which is why
     there are four and not five. The `n` values are display text, not indices,
     so nothing derives them — renumber by hand if a stage is ever added. */
  steps: [
    {
      n: '01',
      title: 'The first conversation',
      text:
        'Objectives, family circumstances, what is already in place, and what is actually ' +
        'causing concern.',
    },
    {
      n: '02',
      title: 'The work',
      text:
        'Risks, liquidity, costs and exposures examined in detail, with specialists brought ' +
        'in where a question needs them.',
    },
    {
      n: '03',
      title: 'Putting it in place',
      text:
        'Decisions carried through with the client’s banks and other advisers, in the order ' +
        'that makes sense.',
    },
    {
      n: '04',
      title: 'Staying with it',
      text:
        'Assumptions revisited, reporting kept plain, and the approach adjusted when ' +
        'circumstances change.',
    },
  ],
};

export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'The best decisions are the ones a client understands completely.',
};
