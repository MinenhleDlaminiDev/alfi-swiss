import { Link } from 'react-router-dom'
import { useCountUp } from '../../lib/countUp.js'
import manifest from '../../content/image-manifest.json'
import './ui.css'

export { default as Figure } from './Figure.jsx'

/* Shared UI primitives (ASP-06).
   Every page composes from these; none of them hard-code a colour or size.

   Note on keys: list keys are derived from stable identifiers (`n`, `id`) or
   the array index — never from editable prose, which can repeat and would then
   produce duplicate keys. */

export function Eyebrow({ children, tone = 'default', as: Tag = 'p' }) {
  const mod =
    tone === 'on-dark' ? ' ui-eyebrow--on-dark' : tone === 'dim' ? ' ui-eyebrow--dim' : ''
  return <Tag className={'ui-eyebrow' + mod}>{children}</Tag>
}

export function Section({ tone = 'paper', children, id, className = '' }) {
  return (
    <section id={id} className={`ui-section ui-section--${tone} ${className}`.trim()}>
      <div className="wrap u-reveal">{children}</div>
    </section>
  )
}

/* `u-stagger` (ASP-28): the eyebrow, heading and lead arrive in sequence
   rather than together. Defined once in index.css and inert without a
   `.u-reveal` ancestor, so a head used outside a Section is unaffected. */
export function SectionHead({ eyebrow, heading, lead, tone = 'default', center = false }) {
  return (
    <div className={'ui-sechead u-stagger' + (center ? ' ui-sechead--center' : '')}>
      {eyebrow && <Eyebrow tone={tone === 'on-dark' ? 'on-dark' : 'default'}>{eyebrow}</Eyebrow>}
      {heading && <h2 className="ui-sechead__heading">{heading}</h2>}
      {lead && <p className="ui-sechead__lead">{lead}</p>}
    </div>
  )
}

/* Renders as a router Link, an anchor, or a button depending on props.
   `{...rest}` is spread BEFORE className so a caller cannot accidentally wipe
   the variant classes; an explicit `className` prop is merged instead. */
export function Button({ to, href, variant = 'gold', className = '', children, ...rest }) {
  const cls = `ui-btn ui-btn--${variant} ${className}`.trim()
  if (to) return <Link to={to} {...rest} className={cls}>{children}</Link>
  if (href) return <a href={href} {...rest} className={cls}>{children}</a>
  return <button type="button" {...rest} className={cls}>{children}</button>
}

export function TextLink({ to, children }) {
  return <Link to={to} className="ui-link">{children}</Link>
}

export function PageHero({ eyebrow, headingLines = [], lead }) {
  return (
    <section className="ui-pagehero">
      <div className="wrap u-reveal u-reveal--hero">
        {eyebrow && <Eyebrow tone="on-dark">{eyebrow}</Eyebrow>}
        <h1 className="ui-pagehero__heading">
          {headingLines.map((line, i) => (
            <span key={i} className="ui-pagehero__line">{line}</span>
          ))}
        </h1>
        {lead && <p className="ui-pagehero__lead">{lead}</p>}
      </div>
    </section>
  )
}

/* A figure that counts up to its value on first entry (ASP-28).
 *
 * Its own component rather than a branch inside the map, because the hook
 * cannot be called conditionally or once per iteration of a list.
 *
 * `figure` stays the single source of truth for what the strip says. `count`
 * only declares the numeric part to animate, and the remainder of `figure`
 * is carried through verbatim — so '40+' animates 0..40 and keeps its '+',
 * and nothing can drift out of step with the content file. */
function CountingFigure({ figure, count }) {
  const [ref, value] = useCountUp(count)
  const suffix = figure.slice(String(count).length)
  return <div ref={ref} className="ui-stat__figure">{value}{suffix}</div>
}

export function StatBlock({ items = [] }) {
  return (
    <div className="ui-stats">
      {items.map((s, i) => (
        <div key={i} className="ui-stat">
          {typeof s.count === 'number'
            ? <CountingFigure figure={s.figure} count={s.count} />
            : <div className="ui-stat__figure">{s.figure}</div>}
          <p className="ui-stat__text">{s.text}</p>
        </div>
      ))}
    </div>
  )
}

/* Numbered cards (ASP-06, rebuilt as surfaces in ASP-31).
 *
 * `image` is optional on every item. A card without one renders as a panel
 * with no picture rather than a gap, which is what lets the fifteen cards on
 * the site be migrated a page at a time instead of all at once.
 *
 * The images are DECORATIVE and take alt="". The title sits immediately
 * beside each one and already says what the card is about; fifteen
 * descriptions of abstract architectural photography would add nothing to a
 * screen reader except fifteen interruptions before the actual content. */
export function NumberedCards({ items = [] }) {
  return (
    <div className="ui-cards">
      {items.map((it) => (
        <article key={it.n} className="ui-card">
          {it.image && (
            <div className="ui-card__media">
              <CardImage slug={it.image} />
            </div>
          )}
          <div className="ui-card__body">
            <div className="ui-card__n">{it.n}</div>
            <h3 className="ui-card__title">{it.title}</h3>
            <p className="ui-card__text">{it.text}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

/* Deliberately not <Figure>: that component owns a frame ratio, a shadow, an
   optional caption and the parallax wrapper, none of which a card wants. This
   is the same srcset maths and nothing else. */
function CardImage({ slug }) {
  const meta = manifest[slug]

  if (!meta || !meta.widths?.length) {
    if (import.meta.env.DEV) {
      console.error(`NumberedCards: "${slug}" is not in the image manifest. Run: npm run images`)
    }
    return null
  }

  const srcset = (ext) => meta.widths.map((w) => `/images/${slug}-${w}w.${ext} ${w}w`).join(', ')
  const fallback = meta.widths[meta.widths.length - 1]

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={CARD_SIZES} />
      <img
        className="ui-card__img"
        src={`/images/${slug}-${fallback}w.jpg`}
        srcSet={srcset('jpg')}
        sizes={CARD_SIZES}
        alt=""
        width={meta.width}
        height={meta.height}
        /* Every card grid on the site sits below the fold. Eager loading
           would put four more images in front of the hero's LCP for nothing. */
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

/* Four across inside the 1180px wrap is ~270px; two across on a tablet is
   ~340px; one across on a phone is the viewport less its gutters. */
const CARD_SIZES = '(max-width: 560px) calc(100vw - 3rem), (max-width: 900px) 45vw, 280px'

/* Service index (ASP-06, rebuilt as cards in ASP-34).
 *
 * Index cards link INTO the detail sections below them. The details own the
 * DOM ids; these cards carry none, so a deep link is never ambiguous. Cards
 * whose service is covered by a shared detail section point at that section
 * — the deck groups five service areas into three details, so three of these
 * five legitimately share a destination.
 *
 * The whole card is the link (ASP-23), not just the title. A card that lifts
 * under the cursor has to be clickable across its whole surface or the lift
 * is a lie about where to aim. The anchor wraps the content rather than
 * being stretched over it with a pseudo-element, so the link text a screen
 * reader announces is the real title and the card is one tab stop, not two.
 */
export function ServiceRows({ items = [] }) {
  return (
    <div className="ui-cards ui-cards--svc">
      {items.map((it) => (
        <article key={it.n} className="ui-card ui-card--link">
          <a className="ui-card__hit" href={it.linkTo ? `#${it.linkTo}` : undefined}>
            {it.image && (
              <div className="ui-card__media">
                <CardImage slug={it.image} />
              </div>
            )}
            <div className="ui-card__body">
              <div className="ui-card__n">{it.n}</div>
              <h3 className="ui-card__title">{it.title}</h3>
              <p className="ui-card__text">{it.text}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  )
}

export function ProcessSteps({ items = [] }) {
  return (
    <ol className="ui-steps">
      {items.map((s) => (
        <li key={s.n} className="ui-step">
          <div className="ui-step__n">{s.n}</div>
          <h3 className="ui-step__title">{s.title}</h3>
          <p className="ui-step__text">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Split({ flip = false, children }) {
  return <div className={'ui-split' + (flip ? ' ui-split--flip' : '')}>{children}</div>
}

export function Bullets({ items = [] }) {
  return (
    <ul className="ui-bullets">
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  )
}
