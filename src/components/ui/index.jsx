import { Link } from 'react-router-dom'
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

export function SectionHead({ eyebrow, heading, lead, tone = 'default', center = false }) {
  return (
    <div className={'ui-sechead' + (center ? ' ui-sechead--center' : '')}>
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

export function StatBlock({ items = [] }) {
  return (
    <div className="ui-stats">
      {items.map((s, i) => (
        <div key={i} className="ui-stat">
          <div className="ui-stat__figure">{s.figure}</div>
          <p className="ui-stat__text">{s.text}</p>
        </div>
      ))}
    </div>
  )
}

export function NumberedCards({ items = [] }) {
  return (
    <div className="ui-cards">
      {items.map((it) => (
        <article key={it.n} className="ui-card">
          <div className="ui-card__n">{it.n}</div>
          <h3 className="ui-card__title">{it.title}</h3>
          <p className="ui-card__text">{it.text}</p>
        </article>
      ))}
    </div>
  )
}

/* Index rows link INTO the detail sections below them. The details own the
   DOM ids; these rows carry none, so a deep link is never ambiguous. Rows
   whose service is covered by a shared detail section point at that section. */
export function ServiceRows({ items = [] }) {
  return (
    <div className="ui-rows">
      {items.map((it) => (
        <article key={it.n} className="ui-row">
          <div className="ui-row__n">{it.n}</div>
          <h3 className="ui-row__title">
            {it.linkTo
              ? <a className="ui-row__link" href={`#${it.linkTo}`}>{it.title}</a>
              : it.title}
          </h3>
          <p className="ui-row__text">{it.text}</p>
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
