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
 * THE CARDS HAVE PHOTOGRAPHS NOW (ASP-80), reversing the decision carried
 * over from About. That decision was ours, not the client's: the cards
 * describe PEOPLE, and abstract architectural photography reads as a stand-in
 * for a client when it sits above a heading like 'Entrepreneurs'. The page
 * was judged too plain without them and the reversal was asked for directly.
 *
 * ASP-84 REPLACED ALL THREE AGAIN, and the brief changed with them. ASP-80
 * read the permission as "no people" and chose place instead: a crane, a
 * stone courtyard, a harbour. The user's verdict was that the set said
 * nothing about these three profiles, and that "too many of our pictures is
 * just old architecture and landscapes" — which is a fair description of the
 * whole library.
 *
 * THE TEST IS NOW RELEVANCE, not subject matter. Each picture has to say
 * something about ITS OWN heading: swapping any two of them should look
 * obviously wrong. A photograph that could sit equally well above all three
 * has failed, which is exactly what was wrong with the ASP-80 set.
 *
 *   01  a row of working looms      — a business built, with plant and value
 *   02  three generations at a table — continuity between people
 *   03  an airport departures hall   — moving between countries
 *
 * People are allowed where they serve the picture. Where they appear, the
 * preference is still for faces that are not the subject, because the
 * Unsplash License covers the photograph and not the people in it. Card 02
 * is the exception and is flagged in CREDITS.md.
 *
 * Licences and photo IDs are in assets/images/CREDITS.md. Every card- slug in
 * the manifest is in use — verified with a script, not a grep.
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
      image: 'card-serve-entrepreneurs',
      title: 'Entrepreneurs',
      text:
        'You have built a successful business and are preparing for, or have completed, a ' +
        'sale or a liquidity event. You need a structure for the proceeds, the right banking ' +
        'partners and a plan for what comes next.',
    },
    {
      n: '02',
      image: 'card-serve-generations',
      title: 'Families across generations',
      text:
        'Your wealth spans several family members, assets and countries. You want continuity, ' +
        'clear governance and one trusted coordinator for all your advisers.',
    },
    {
      n: '03',
      image: 'card-serve-international',
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
