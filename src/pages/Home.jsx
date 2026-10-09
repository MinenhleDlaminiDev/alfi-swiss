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
            {hero.headingLines.map((line, i) => (
              <span key={i} className="home-hero__line">{line}</span>
            ))}
          </h1>
          <div className="home-hero__rule" />
          <p className="home-hero__lead">{hero.lead}</p>
          <div className="home-hero__cta">
            <Button to={cta.primary.to} variant="gold">{cta.primary.label}</Button>
            <Button to={cta.secondary.to} variant="ghost">{cta.secondary.label}</Button>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="ui-section ui-section--navy home-creds">
        <div className="wrap">
          <StatBlock items={credentials} />
        </div>
      </section>

      {/* Positioning */}
      <Section tone="paper">
        <Split>
          <Figure slug={positioning.image.slug} alt={positioning.image.alt} />
          <div>
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
          <div>
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
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Closing CTA */}
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
