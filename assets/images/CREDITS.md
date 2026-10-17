# Image credits

All images sourced from Unsplash and used under the Unsplash License,
which permits free commercial use without attribution.
Licence terms: https://unsplash.com/license

| File | Placement | Description | Unsplash ID |
| --- | --- | --- | --- |
| home-positioning.jpg | Home — positioning | Arches and columns lining an empty hallway | `photo-1774661779928-270b4e08f3cf` |
| services-wealth-management.jpg | Services — wealth management | Stone walkway inside a stone building | `photo-1650744668398-40e319111a10` |
| about-firm.jpg | About — the firm | Mountains above water, black & white | `photo-1604337248907-83c3e9536fe7` |
| contact-geneva.jpg | Contact — Geneva | Geneva, the lake and the Jet d Eau | `photo-1574904935745-7e40279f589d` |
| services-strategic-advisory.jpg | Services — strategic advisory | Concrete staircase in light and shadow | `photo-1741524915320-8fee76e41424` |
| philosophy-principles.jpg | Philosophy — principles | A tall stone column against the sky | `photo-1691967878704-6a5036338eb3` |
| services-investment-advisory.jpg | Services — investment advisory | Dark facade, windows in a grid | `photo-1778182281857-1a5e8c5c4a64` |
| hero-geneva.jpg | Home — hero, slide 1 | Geneva from above, city meeting the lake | `photo-1584200463394-bba4b2117e4d` |
| hero-alps.jpg | Home — hero, slide 2 | Alps above a sea of cloud | `photo-1507039915464-9d829b6d2d78` |
| hero-arcade.jpg | Home — hero, slide 3 | Classical stone arcade | `photo-1786296651642-43cf245aaae3` |
| hero-boardroom.jpg | Home — hero, slide 4 | Long boardroom table | `photo-1775492783040-9ebacb1f7861` |
| card-independence.jpg | Home card 01 - Independence | Row of stone columns with strong shadows | `photo-1759507058804-cc729b38d1ed` |
| card-senior-attention.jpg | Home card 02 - Senior attention | A library with wooden bookshelves | `photo-1739918069081-78dddf3240a6` |
| card-integrated-view.jpg | Home card 03 - Integrated view | Star-shaped muqarnas ceiling, Alhambra | `photo-1772388864609-6e3bc22abe98` |
| card-confidentiality.jpg | Home card 04 - Confidentiality | Closed antique doors with metal handles | `photo-1759722127686-64c79dc12b5c` |
| card-independent-advice.jpg | About - Independent advice | Stone archway in an ancient wall | `photo-1768855394865-bdf2e5504884` |
| card-bank-introductions.jpg | About - Curated bank introductions | A pair of wooden doors | `photo-1530982900219-d13d50b354e6` |
| card-long-term.jpg | About - Long-term perspective | A long passageway, Weimar | `photo-1633913001609-f0b3632c1d70` |
| card-hnw-individuals.jpg | About - High-net-worth individuals | Windows on a historic limestone building | `photo-1642457744397-d6a031ce8eb0` |
| card-families.jpg | About - Families and family offices | A spiral staircase from above | `photo-1448454050639-2f8d4bf26975` |
| card-business-owners.jpg | About - Business owners | Modern building corner, black & white | `photo-1784434376843-0b2622013edd` |
| card-institutions.jpg | About - Institutions and foundations | A bank building facade | `photo-1553801613-9b225d58f429` |
| card-preservation.jpg | Philosophy - Preservation first | The wall of an ancient fortress | `photo-1662360366368-f818a244403c` |
| card-diversification.jpg | Philosophy - Diversification with purpose | Patterned tiles, Lisbon | `photo-1669967282608-2917ed5c4d05` |
| card-risk-opportunity.jpg | Philosophy - Risk-adjusted opportunity | A concrete structure, black & white | `photo-1559763194-521eef49b386` |
| card-monitoring.jpg | Philosophy - Transparent monitoring | A glass facade | `photo-1523477593243-78bbf626fd3b` |
| card-partner-dimanow.jpg | Contact - Alexander Dimanow | Portrait supplied by the client | `n/a - client supplied` |
| card-partner-fiuza.jpg | Contact - Antonio Fiuza | Portrait supplied by the client | `n/a - client supplied` |
| card-svc-wealth.jpg | Services 01 - Wealth Management | A large room with arched ceilings | `photo-1661621201294-3bebf30d4d24` |
| card-svc-portfolio.jpg | Services 02 - Portfolio & Investment Advisory | A stacked stone wall | `photo-1784528780206-6a0545dec6fd` |
| card-svc-alternatives.jpg | Services 03 - Alternatives & Structured Solutions | Abstract view of the Kunstmuseum, Bonn | `photo-1593466486574-71b38f2ff423` |
| card-svc-risk.jpg | Services 04 - Risk & Credit Advisory | A bridge, black & white | `photo-1714474597969-8395a0793a28` |
| card-svc-strategic.jpg | Services 05 - Corporate & Strategic Advisory | Interior of the Stroganov Palace | `photo-1577887546572-144f62fceb9e` |

The two partner portraits were supplied by the client and are not Unsplash
images. They are the only photographs of identifiable people on the site.

**card-partner-dimanow.jpg is the client's file, untouched.** It is the
reference the other portrait was matched to, and nothing has been done to
it. An earlier attempt converted both to monochrome; that was reverted —
the brief was to leave this one alone.

**card-partner-fiuza.jpg was reworked in ASP-50 to match it.** Both stay in
colour. What was done, all to Fiuza only:

| Step | Detail |
| --- | --- |
| Measured both | Dimanow: crown at 4.5% of frame, chin at 68%, head = 63% of height. Fiuza: crown at y=1, jaw at y=181, head = 42%. |
| Canvas extended | 12px added above his crown in his own backdrop colour. His head touched the very top edge, so headroom had to be created before he could be moved down. His backdrop is perfectly flat — rgb(236,231,225) at every sample point — so this is blank studio paper, not invented detail. |
| Re-cropped | 212x283 at 3:4, placing his head at 63% of frame with 4.5% headroom, centred on the head at x=173. Matches Dimanow's framing. |
| Backdrop replaced | Keyed by flood fill FROM THE BORDER, not a global colour key — his shirt is bright and nearly neutral, and a global key would have dissolved it. Mask dilated before feathering to remove the pale fringe. Replaced with Dimanow's measured gradient, rgb(146,168,186) to rgb(171,190,204). |
| Graded | Brightness +5%, saturation -4%, slight contrast lift, to match Dimanow's brighter, cooler rendering. |
| Resampled ONCE | 212x283 to 320x427, Lanczos, light sharpening, 4:4:4 chroma. The master is written at exactly the card ladder's first rung so the build copies it instead of resampling it again. |

An earlier version wrote a 600x800 master, which the build then downscaled
to 320 and the page displayed at 300 — three resamples, with the sharpening
applied at a scale nobody ever saw. The face looked smeared. One enlargement,
at the size actually served, is the whole difference.

The card's portrait box was also reduced from 300px to 240px, for BOTH
partners, so the pair stays identical. At 300px his crop was a 1.42x
enlargement and visibly broke up; at 240px it is 1.13x.

**His face was not altered.** No feature reshaped, no skin retouched, no
AI generation of any kind — none is available here. Everything above is
cropping, canvas extension into flat backdrop, a background key and a
global tone adjustment.

**The honest caveat:** the master was 325px wide and the matching crop uses
212px of it, upscaled. At the 300px card slot it is fine at 1x and soft on
a high-DPI screen. **A larger original from Fiuza is still the real fix** —
his file is almost certainly a downscaled copy, and no amount of processing
adds detail that was never captured.

Originals of both are in git history: `git log --follow` either file.
