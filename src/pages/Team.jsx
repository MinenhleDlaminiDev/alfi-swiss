import { PageHero, Section, Eyebrow } from '../components/ui/index.jsx'
import manifest from '../content/image-manifest.json'
import { hero, leadership } from '../content/team.js'
import './Team.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Team (ASP-38).
 *
 * The partners used to sit at the bottom of Contact, below the enquiry form,
 * which is the last place anyone looks for them. Their own page, and the
 * cards stacked vertically so a biography has room to be a biography.
 */
export default function Team() {
  return (
    <>
      <Seo title={seo.team.title} description={seo.team.description} />

      <PageHero eyebrow={hero.eyebrow} headingLines={hero.headingLines} lead={hero.lead} />

      <Section tone="cream">
        <Eyebrow>{leadership.eyebrow}</Eyebrow>
        <h2 className="team-heading">{leadership.heading}</h2>

        <div className="team-people">
          {leadership.people.map((p) => (
            <article key={p.name} className="team-person">
              {p.portrait && (
                <div className="team-person__media">
                  <Portrait slug={p.portrait} name={p.name} role={p.role} />
                </div>
              )}
              <div className="team-person__body">
                <h3 className="team-person__name">{p.name}</h3>
                <p className="team-person__role">{p.role}</p>
                <p className="team-person__bio">
                  {p.bio}
                  {p.placeholder && <span className="team-person__flag"> (Pending approval)</span>}
                </p>
                {/* The 'Digital card' button stood here until ASP-51, where
                    the client removed the V-card feature entirely. Both
                    partners now render the same shape, which is what the
                    page wanted anyway — only one of them ever had a card. */}
              </div>
            </article>
          ))}
        </div>
      </Section>

    </>
  )
}

/* Partner portrait.
 *
 * NOT decorative, unlike the card images elsewhere on the site. Those are
 * abstract architecture standing in for an idea, and the title beside them
 * carries the meaning. This is a photograph of a named person, and a reader
 * who cannot see it is entitled to know that is what it is.
 *
 * Supplied by the client. No stock photograph is ever shown under a
 * partner's name, which is why this takes a slug from content rather than
 * falling back to anything when one is missing.
 */
function Portrait({ slug, name, role }) {
  const meta = manifest[slug]

  if (!meta || !meta.widths?.length) {
    if (import.meta.env.DEV) {
      console.error(`Portrait: "${slug}" is not in the image manifest. Run: npm run images`)
    }
    return null
  }

  const srcset = (ext) => meta.widths.map((w) => `/images/${slug}-${w}w.${ext} ${w}w`).join(', ')
  const fallback = meta.widths[meta.widths.length - 1]
  /* Must track `.team-person__media` in Team.css. If this says 300px while
     the box renders at 240, the browser reserves the wrong candidate and
     either wastes bytes or picks a file too small to be sharp. */
  const sizes = '(max-width: 560px) 220px, 240px'

  return (
    <picture>
      {/* AVIF first (ASP-47). This is the fourth <picture> on the site and
          the one easiest to forget — the partner portraits are built here
          rather than through Figure, so a format added to the shared
          components does not reach them. It was found by measuring: /team
          was still being served WebP after every other page had moved. */}
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        className="team-person__img"
        src={`/images/${slug}-${fallback}w.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        /* The role comes from content rather than being written in here:
           both partners happen to be Managing Partners today, and a
           hardcoded title would quietly become a lie the day one is not. */
        alt={role ? `${name}, ${role}` : name}
        width={meta.width}
        height={meta.height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
