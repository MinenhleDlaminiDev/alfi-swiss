import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop/HeroBackdrop.jsx'
import {
  Section, SectionHead, Eyebrow, Button, TextLink,
  StatBlock, NumberedCards, Split, Figure,
} from '../components/ui/index.jsx'
import { cta } from '../content/site.js'
import { hero, credentials, positioning, pillars, servicesTeaser, closing } from '../content/home.js'
import { index as serviceIndex } from '../content/services.js'
import './Home.css'
import Seo from '../components/Seo.jsx'
import { seo } from '../content/seo.js'

/* Home — gateway page (ASP-07).
   Deliberately does NOT carry the full services list or the process steps;
   those belong to the Services and Philosophy pages. */
export default function Home() {
  return (
    <>
      <Seo title={seo.home.title} description={seo.home.description} />

      {/* Hero */}
      <section className="home-hero">
        <HeroBackdrop slides={hero.slides} />
        <div className="wrap home-hero__inner u-reveal u-reveal--hero">
          <Eyebrow tone="on-dark">{hero.eyebrow}</Eyebrow>
          <h1 className="home-hero__heading">
            {/* Two spans per line (ASP-28): the outer one clips, the inner one
                travels. That is what makes the line rise out from behind its
                own baseline instead of sliding in across empty space. */}
            {hero.headingLines.map((line, i) => (
              <span key={i} className="home-hero__line">
                <span className="home-hero__line-in">{line}</span>
              </span>
            ))}
          </h1>
          <div className="home-hero__rule" />
          <p className="home-hero__lead">{hero.lead}</p>
          <div className="home-hero__cta">
            <Button to={cta.primary.to} variant="gold">{cta.primary.label}</Button>
            <Button to={cta.secondary.to} variant="ghost">{cta.secondary.label}</Button>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* Credentials */}
      <section className="ui-section ui-section--navy home-creds">
        {/* u-reveal (ASP-28): the strip was the one band on the page with no
            entry at all. It also gives the rules beside each stat something
            to key their wipe off. */}
        <div className="wrap u-reveal">
          <StatBlock items={credentials} />
        </div>
      </section>

      {/* Positioning */}
      <Section tone="paper">
        <Split>
          <Figure
            slug={positioning.image.slug}
            alt={positioning.image.alt}
            caption={positioning.image.caption}
            live
          />
          <div className="u-stagger">
            <Eyebrow>{positioning.eyebrow}</Eyebrow>
            <h2 className="home-pos__heading">{positioning.heading}</h2>
            <p className="home-pos__body">{positioning.body}</p>
            <TextLink to={positioning.link.to}>{positioning.link.label}</TextLink>
          </div>
        </Split>
      </Section>

      {/* Why clients come to us */}
      <Section tone="cream">
        <SectionHead eyebrow={pillars.eyebrow} heading={pillars.heading} />
        <div className="home-pillars">
          <NumberedCards items={pillars.items} />
        </div>
      </Section>

      {/* Services teaser — names only */}
      <Section tone="paper">
        <div className="home-teaser">
          <div className="u-stagger">
            <Eyebrow>{servicesTeaser.eyebrow}</Eyebrow>
            <h2 className="home-teaser__heading">{servicesTeaser.heading}</h2>
            <p className="home-teaser__body">{servicesTeaser.body}</p>
            <Button to={servicesTeaser.link.to} variant="navy" className="home-teaser__btn">
              {servicesTeaser.link.label}
            </Button>
          </div>
          <ul className="home-teaser__list">
            {serviceIndex.map((s) => (
              <li key={s.n}>
                <Link to={`/services#${s.linkTo}`}>
                  <span className="home-teaser__n">{s.n}</span>
                  <span className="home-teaser__label">
                    {s.title}
                    {/* The description is already written for the Services
                        page; showing it here on hover or focus (ASP-28) costs
                        no new copy and turns a bare list into a preview. The
                        grid-rows collapse, not `height`, is what lets it
                        animate from nothing to its natural height. */}
                    <span className="home-teaser__more">
                      <span className="home-teaser__more-in">{s.text}</span>
                    </span>
                  </span>
                  <span className="home-teaser__arrow" aria-hidden="true">&#8594;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Closing CTA — ScrollCue is defined below the page component. */}
      <section className="ui-section ui-section--navy home-closing">
        <div className="wrap">
          <Eyebrow tone="dim">{closing.eyebrow}</Eyebrow>
          <h2 className="home-closing__heading">{closing.heading}</h2>
          <p className="home-closing__body">{closing.body}</p>
          <Button to={cta.request.to} variant="gold">{cta.request.label}</Button>
        </div>
      </section>
    </>
  )
}

/* Scroll cue (ASP-28).
 *
 * The hero fills the viewport, which is the point of it and also its one
 * problem: there is no visible evidence that the page continues underneath.
 * A hairline at the bottom edge supplies that evidence and then gets out of
 * the way for good on the first scroll.
 *
 * Decorative in the strict sense — aria-hidden, not focusable, carrying no
 * information that is not also carried by the scrollbar and the content
 * itself. It is a nudge, never the only signal.
 */
function ScrollCue() {
  const gone = useScrolledPast(40)
  return <span className={'home-hero__cue' + (gone ? ' is-gone' : '')} aria-hidden="true" />
}

/* True once the page has been scrolled past `px`, and true from then on.
 *
 * One-way on purpose: a cue that came back when you scrolled to the top would
 * be telling you something you have already acted on. The listener detaches
 * as soon as it has fired, so the common case — a visitor reading down the
 * page — carries no scroll handler at all. */
function useScrolledPast(px) {
  const [past, setPast] = useState(() => typeof window !== 'undefined' && window.scrollY > px)

  useEffect(() => {
    if (past) return

    const onScroll = () => {
      if (window.scrollY > px) setPast(true)
    }

    /* Check once on mount: a reload part-way down the page restores the
       scroll position without ever firing a scroll event. */
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [past, px])

  return past
}
