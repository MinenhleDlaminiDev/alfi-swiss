import { useEffect, useRef, useState } from 'react'
import manifest from '../../content/image-manifest.json'
import './HeroBackdrop.css'

/* Rotating hero background (ASP-26 / ASP-27 / ASP-29 / ASP-30).
 *
 * Full-bleed photographs behind the hero, crossfading continuously.
 *
 * Four things here are deliberate and easy to undo by accident:
 *
 * 1. Only the first slide is rendered on mount. The rest are held back until
 *    the page has loaded, because all four sit in the viewport at once — a
 *    `loading="lazy"` attribute would not defer them, it would just let four
 *    hero-sized images race the LCP.
 *
 * 2. The rotation LOOPS, and the pause control is what makes that allowed
 *    (ASP-30). WCAG 2.2.2 requires a way to pause, stop or hide anything that
 *    auto-updates for more than five seconds. Until ASP-30 this ran one pass
 *    and stopped, which satisfied the criterion by ending. It no longer ends,
 *    so the button is not decoration — deleting it reintroduces a failure.
 *
 * 3. Reduced motion does NOT stop the rotation (ASP-29). It used to, and that
 *    was wrong: the crossfade is a pure opacity change, with no travel, scale
 *    or parallax for it to provoke, and switching the whole feature off meant
 *    anyone with the preference set — which on Windows is a great many people
 *    — saw one still photograph and never knew there were four. The thing the
 *    preference is actually about here is the Ken Burns drift, and that is
 *    guarded in the stylesheet beside the rule that creates it.
 *
 * 4. The button is a SIBLING of the backdrop, not a child. The backdrop is
 *    aria-hidden, and a focusable element inside an aria-hidden subtree is a
 *    broken state: the keyboard can reach it and a screen reader cannot see
 *    it. Moving the button inside `.hero-bd` to simplify the markup would
 *    quietly reintroduce exactly that.
 */

const HOLD_MS = 5200

function srcset(slug, ext) {
  return manifest[slug].widths.map((w) => `/images/${slug}-${w}w.${ext} ${w}w`).join(', ')
}

function Slide({ slug, alt, active, priority }) {
  const meta = manifest[slug]
  if (!meta) return null
  return (
    <picture>
      <source type="image/webp" srcSet={srcset(slug, 'webp')} sizes="100vw" />
      <img
        className={'hero-bd__img' + (active ? ' is-active' : '')}
        src={`/images/${slug}-1800w.jpg`}
        srcSet={srcset(slug, 'jpg')}
        sizes="100vw"
        alt={alt}
        width={meta.width}
        height={meta.height}
        decoding={priority ? 'sync' : 'async'}
        loading={priority ? 'eager' : 'lazy'}
        /* lowercase: React 18 does not know the camelCase form and warns. */
        {...(priority ? { fetchpriority: 'high' } : { fetchpriority: 'low' })}
      />
    </picture>
  )
}

export default function HeroBackdrop({ slides = [], labels }) {
  const [index, setIndex] = useState(0)
  const [rest, setRest] = useState(false)
  /* Set by the visitor, and it outranks everything else: scrolling away and
     back must not quietly restart something they asked to stop. */
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const rootRef = useRef(null)

  /* Bring in slides 2..n only once the FIRST one has actually decoded.
   *
   * Keying this off window `load` is not enough: on a fast connection load
   * fires almost immediately and the other three go out on its heels, racing
   * the very image they are supposed to wait for. Waiting for slide 1's own
   * load event ties the deferral to the LCP itself.
   *
   * The timeout is a backstop for a first image that errors or never fires. */
  useEffect(() => {
    if (slides.length < 2) return

    const first = document.querySelector('.hero-bd__img')
    let idle = 0
    let backstop = 0

    const bring = () => {
      idle = (window.requestIdleCallback || window.setTimeout)(() => setRest(true), { timeout: 1500 })
    }

    if (first && first.complete) bring()
    else if (first) first.addEventListener('load', bring, { once: true })
    backstop = window.setTimeout(() => setRest(true), 6000)

    return () => {
      ;(window.cancelIdleCallback || window.clearTimeout)(idle)
      window.clearTimeout(backstop)
      if (first) first.removeEventListener('load', bring)
    }
  }, [slides.length])

  /* Stop crossfading at a visitor who has scrolled past (ASP-30).
   *
   * `visibilitychange` below already covers a backgrounded tab, but not
   * someone reading the bottom of the page while the hero carries on
   * decoding images three thousand pixels above them. */
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Loops. Held while the tab is hidden, while the hero is off screen, or
     while the visitor has paused it. */
  useEffect(() => {
    if (!rest || slides.length < 2) return
    if (paused || !onScreen) return

    let timer = 0
    const tick = () => setIndex((i) => (i + 1) % slides.length)
    const start = () => { timer = window.setTimeout(tick, HOLD_MS) }
    const stop = () => window.clearTimeout(timer)

    if (!document.hidden) start()
    const onVisibility = () => { stop(); if (!document.hidden) start() }
    document.addEventListener('visibilitychange', onVisibility)

    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [rest, index, slides.length, paused, onScreen])

  if (!slides.length) return null

  const label = paused ? labels?.play : labels?.pause

  return (
    <>
      {/* aria-hidden: these are decorative. The hero's meaning is in the
          heading beside them, and announcing four photograph descriptions
          before it would bury the thing a screen reader user came for. */}
      <div
        ref={rootRef}
        className={'hero-bd' + (paused ? ' is-paused' : '')}
        aria-hidden="true"
      >
        {slides.map((s, i) => {
          if (i > 0 && !rest) return null
          return (
            <Slide
              key={s.slug}
              slug={s.slug}
              alt=""
              active={i === index}
              priority={i === 0}
            />
          )
        })}
        <div className="hero-bd__veil" />
      </div>

      {/* Only once there is something to pause. With a single slide nothing
          auto-updates and a control would be a button that does nothing. */}
      {slides.length > 1 && (
        <button
          type="button"
          className="hero-bd__toggle"
          onClick={() => setPaused((p) => !p)}
        >
          {/* The accessible name changes with the state rather than only the
              icon, so the button says what pressing it will DO. No
              aria-pressed alongside it: "Play background images, pressed" is
              a worse announcement than either half on its own. */}
          <span className="u-sr-only">{label}</span>
          <svg className="hero-bd__toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {paused
              ? <path d="M9 7.5v9l7.5-4.5z" fill="currentColor" />
              : (
                <>
                  <rect x="9" y="7.5" width="2" height="9" fill="currentColor" />
                  <rect x="13" y="7.5" width="2" height="9" fill="currentColor" />
                </>
              )}
          </svg>
        </button>
      )}
    </>
  )
}
