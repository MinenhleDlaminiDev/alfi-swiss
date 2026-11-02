import { useParams, Link } from 'react-router-dom'
import {
  PageHero, Section, Eyebrow, Button, Split, Figure, Bullets,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { pillars, closing } from '../content/services.js'
import NotFound from './NotFound.jsx'
import './ServicePillar.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* One service pillar (ASP-70).
 *
 * ONE COMPONENT, FOUR PAGES. The client's brief gives every pillar the same
 * four parts in the same order — a one-line promise, 'What we do' as
 * bullets, 'How it helps you', and a call to action — so there is one
 * template and the differences live in src/content/services.js. Three more
 * pillars are written and waiting on the partners' approval; when it comes
 * they are data, not code.
 *
 * AN UNKNOWN SLUG RENDERS NotFound, not a crash and not a redirect. A
 * mistyped /services/anything is a page that does not exist, and saying so
 * is more useful than bouncing someone silently back to the index. It also
 * means the three unpublished pillars 404 if anyone guesses their URLs. */
export default function ServicePillar() {
  const { slug } = useParams()
  const pillar = pillars.find((p) => p.slug === slug)

  if (!pillar) return <NotFound />

  const meta = seo.servicePillars[slug]

  return (
    <>
      <Seo title={meta.title} description={meta.description} />

      <PageHero
        eyebrow={`${pillar.n} — Services`}
        headingLines={[pillar.title]}
        lead={pillar.promise}
      />

      {/* What we do, beside the photograph. */}
      <Section tone="paper">
        <Split>
          <Figure
            slug={pillar.figure.slug}
            alt={pillar.figure.alt}
            caption={pillar.figure.caption}
            live
          />
          {/* The section heading is 'What we do', not the pillar's name.
              The name is already the H1 two inches above it, and a page that
              says 'Projects & Project Finance' twice in one screen reads as
              a template showing through. It is also the heading this list
              needs: a screen-reader user moving by heading lands on what the
              section contains rather than on the page title again.

              u-stagger: the heading and the bullets arrive in sequence
              rather than as one slab, matching every other list on the site. */}
          <div className="u-stagger">
            <h2 className="pillar__heading">What we do</h2>
            <Bullets items={pillar.points} />
          </div>
        </Split>
      </Section>

      {/* How it helps you. Its own band rather than a paragraph under the
          bullets: it is the only part of the page written from the client's
          side of the table, and it reads as an aside if it sits in the list's
          column. */}
      <Section tone="cream">
        <div className="pillar__helps u-stagger">
          <h2 className="pillar__heading">How it helps you</h2>
          <p className="pillar__helps-body">{pillar.helps}</p>
        </div>
      </Section>

      {/* Closing */}
      <section className="ui-section ui-section--navy pillar__closing">
        <div className="wrap">
          <Eyebrow tone="dim">{closing.eyebrow}</Eyebrow>
          <h2 className="pillar__closing-heading">{closing.heading}</h2>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
          {/* The way back. A pillar page is reached from the index, from Home
              or from a shared link, and only the first of those leaves
              anything behind to go back to. */}
          <p className="pillar__back">
            <Link to="/services">All services</Link>
          </p>
        </div>
      </section>
    </>
  )
}
