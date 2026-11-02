/* About (ASP-03).
 *
 * REWRITTEN IN ASP-72 from the client's content brief, `ASP-Website CR.docx`
 * (29 Oct 2026). The brief gives this page four sections and draft copy for
 * each: our story, our philosophy and values, how we are remunerated, and
 * what we do not do, then a link to Partners and Contact. Every string below
 * is theirs, verbatim, except the section headings they do not supply.
 *
 * THIS PAGE REVERSES ASP-52. On 19 October the client settled a contradiction
 * the other way round: About had said 'ALFI does not manage portfolios nor
 * give investment advice' while three Services cards were titled Advice, and
 * they ruled that ALFI DOES advise. The brief reverses that ruling in the
 * founders' own words — see `scope` below. The user's standing instruction is
 * that the brief beats the live site, because the founders are not happy with
 * the October content.
 *
 * The tension that creates is theirs, knowingly. Our audit asked how the
 * denial sits with the Projects pillar, which offers advice on project
 * finance and on sourcing lenders and co-investors. Their answer: "Let's
 * leave as is they are okay with it." Do not soften either side to make them
 * agree.
 */

export const hero = {
  eyebrow: 'About Us',
  headingLines: ['Independent by design.', 'Relationship-led by nature.'],
  lead:
    'Headquartered in Geneva, ALFI Swiss Partners serves high-net-worth individuals, families, ' +
    'entrepreneurs and institutions seeking thoughtful guidance outside the constraints of a ' +
    'large institution.',
};

export const story = {
  /* The brief's 'Our story', verbatim and as one paragraph. It replaces two
     October paragraphs: the 'senior experience across private banking' opener
     and the ASP-52 sentence that began 'As an independent firm, ALFI advises
     on the decisions in front of a client'. That second one is now contained
     in `scope`, stated the way the founders want it. */
  paragraphs: [
    'ALFI Swiss Partners was founded by two senior private bankers who spent more than four ' +
    'decades each advising international families at leading Swiss banks. Over those years we ' +
    'saw how often families were served by advisers whose interests were not fully aligned ' +
    'with their own. We created ALFI to offer the opposite: experienced, independent advice ' +
    'that works solely for the family.',
  ],
  /* Kept. The brief supplies no pull quote and does not ask for this one to
     go, and it still reads as a summary of the paragraph above it. */
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

/* The brief's 'Our philosophy' — five values, replacing the three
 * `differentiators` cards that stood here.
 *
 * Those three were Independent advice, Access to the right institutions and
 * Long-term perspective. Two of their images are reused below; the third,
 * `card-bank-introductions`, moved to the Home page in ASP-71.
 *
 * ASP-77 changed three of the five photographs. ASP-72 had given this section
 * pictures that were already in use elsewhere — two on Home and one on the
 * Services index — against the standing rule in services.js that no
 * photograph appears twice. Each comment below records what it replaced.
 *
 * Two of the three replacements are black and white, which is a mix inside
 * one card row, but not a new one: the Services index already sets
 * `card-business-owners` beside colour cards. Checked on the page.
 *
 * THERE ARE NO CARD PHOTOGRAPHS LEFT. These three took the last slugs in the
 * manifest with a card-size ladder (320/560/720). One image is still unused,
 * `philosophy-principles`, but its ladder is 480/768/1200 — a figure, not a
 * card. A new card now needs new photography and a fresh licence check; see
 * [card-system-and-images] and [images-and-hero].
 *
 * FIVE CARDS, so the grid needs the 18rem minmax — at the shared 15rem four
 * fit across and the fifth is orphaned on a row of its own. Same fix and the
 * same number as `.home-pillars` and `.ui-cards--svc`.
 */
export const values = {
  eyebrow: 'Why ALFI Swiss Partners',
  /* OURS, kept from October. The brief names the section but gives it no
     heading. ASP-61 wrote this line specifically so it would not repeat the
     Home pillars heading word for word, which is what it used to do. Keep
     the two different. */
  heading: 'What independence actually changes.',
  items: [
    {
      n: '01',
      image: 'card-independent-advice',
      title: 'Independence',
      text:
        'Our only loyalty is to our clients. We hold no assets, sell no products and have no ' +
        'ties that limit our choice of providers.',
    },
    {
      n: '02',
      /* `card-confidentiality` until ASP-77 — it was already Home's
         'Personal' card, and services.js carries a standing rule that no
         photograph appears twice. */
      image: 'card-risk-opportunity',
      title: 'Discretion',
      text: 'Confidentiality is the foundation of every relationship we have.',
    },
    {
      n: '03',
      image: 'card-long-term',
      title: 'Long-term thinking',
      text: 'We plan across generations, not quarters.',
    },
    {
      n: '04',
      /* `card-senior-attention` until ASP-77 — it was already Home's
         'Experienced' card. */
      image: 'card-svc-risk',
      title: 'Personal commitment',
      text: 'Each client works directly with a founding partner.',
    },
    {
      n: '05',
      /* `card-institutions` until ASP-77, and this was the worst of the three
         duplicates: the same bank facade carried a SERVICE card on the
         Services index and a VALUE card here, two clicks apart. */
      image: 'card-monitoring',
      title: 'Global perspective, Swiss standards',
      text: 'We advise across jurisdictions with Swiss rigour and precision.',
    },
  ],
};

/* How the firm is paid (ASP-72). New — the brief asks for this section by
   name, and it is the section that turns independence from a claim into a
   business model. Verbatim. */
export const remuneration = {
  heading: 'How we are remunerated',
  body:
    'We are paid by our clients alone, through transparent advisory fees agreed in advance. ' +
    'We do not accept commissions, retrocessions or referral fees from the providers we ' +
    'recommend. This keeps our advice free from conflicts of interest.',
};

/* What ALFI does not do (ASP-72). New, verbatim, and load-bearing.
 *
 * ASP-48 removed the regulatory notice from the footer and the Contact page,
 * and ASP-58 removed the 'advisory only; execution and custody remain with
 * the client's own bank' line. With those gone, this paragraph is the ONLY
 * statement of scope anywhere on the site. Do not trim it to 'ALFI does not
 * manage portfolios' — a site that describes advice with no stated limit
 * reads as discretionary management, which is a different regulated activity
 * again, and the second sentence is what explains who does the managing. */
export const scope = {
  heading: 'What we do not do',
  body:
    'ALFI does not manage portfolios, give investment or financial-markets advice, hold ' +
    'client assets or act as a bank. These activities are carried out by the regulated ' +
    'institutions we help you select and whose work we oversee on your behalf.',
};

/* `clients` MOVED OUT in ASP-72, to content/whoweserve.js and a page of its
 * own, which is where the client's sitemap puts it.
 *
 * It held four October profiles — High-net-worth individuals, Families and
 * family offices, Business owners, Institutions and foundations — under the
 * heading 'Advice for clients whose financial lives require discretion.' The
 * brief replaces all four with three written in the second person, so they
 * were not carried across. Recorded here so nobody reinstates them later as
 * a fix for a page that looks short.
 *
 * The decision to give those cards NO images went with them, and the reason
 * still holds: they describe people, and the abstract architectural
 * photography used everywhere else reads as a stand-in for a client when it
 * sits above a profile heading.
 */
