/* Who We Serve (ASP-72). A page of its own, from the client's content brief.
 *
 * The brief: "This page lets visitors recognise themselves in one of three
 * client profiles, then proves the point with short anonymised case studies."
 *
 * THERE ARE NO CASE STUDIES, and no placeholder for them. The founders
 * dropped them for good in their answers of 2 Nov, on compliance grounds —
 * each one would need that client's approval. Do not add a 'coming soon'
 * band or an empty section where they would have gone.
 *
 * These three replace four October profiles that lived on the About page
 * (see the note at the foot of content/about.js). The difference is not just
 * the count: the brief writes them in the second person, so a reader places
 * themselves in one rather than being sorted into a category.
 *
 * No images on these cards, carried over from the About decision. They
 * describe PEOPLE, and the abstract architectural photography that works for
 * a principle or a service reads as a stand-in for a client when it sits
 * above 'Entrepreneurs'. NumberedCards renders an item with no image as a
 * plain panel, so nothing else has to change.
 */

export const hero = {
  eyebrow: 'Who We Serve',
  /* OURS. The brief gives this page no hero copy — only the three profiles
     and the one line of intent quoted above. Both lines below are built from
     that sentence and nothing else, and are the only invented copy on the
     page; everything under `profiles` is the client's, verbatim. */
  headingLines: ['Three situations we are', 'built to work in.'],
  lead:
    'Most of the families and founders we act for recognise themselves in one of these. ' +
    'If yours is a version of more than one, that is usual rather than unusual.',
};

export const profiles = {
  eyebrow: 'Client Profiles',
  heading: 'Where our clients usually start.',
  items: [
    {
      n: '01',
      title: 'Entrepreneurs',
      text:
        'You have built a successful business and are preparing for, or have completed, a ' +
        'sale or a liquidity event. You need a structure for the proceeds, the right banking ' +
        'partners and a plan for what comes next.',
    },
    {
      n: '02',
      title: 'Families across generations',
      text:
        'Your wealth spans several family members, assets and countries. You want continuity, ' +
        'clear governance and one trusted coordinator for all your advisers.',
    },
    {
      n: '03',
      title: 'International families',
      text:
        'You live, invest or plan to settle in more than one country. You need advice that ' +
        'joins up the legal, tax and banking pieces across borders.',
    },
  ],
};

export const closing = {
  eyebrow: 'Begin a Conversation',
  heading: 'Every family’s situation is unique.',
  body: 'Let us start with a conversation.',
};
