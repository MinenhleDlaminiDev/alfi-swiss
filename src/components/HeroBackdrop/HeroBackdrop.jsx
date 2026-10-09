import { useEffect, useState } from 'react'
import manifest from '../../content/image-manifest.json'
import './HeroBackdrop.css'

/* Rotating hero background (ASP-26 / ASP-27).
 *
 * Full-bleed photographs behind the hero, crossfading once through the set.
 *
 * Three things here are deliberate and easy to undo by accident:
 *
 * 1. Only the first slide is rendered on mount. The rest are held back until
 *    the page has loaded, because all four sit in the viewport at once — a
 *    `loading="lazy"` attribute would not defer them, it would just let four
 *    hero-sized images race the LCP.
 *
 * 2. The rotation runs ONE pass and stops. WCAG 2.2.2 requires anything
 *    auto-updating for more than five seconds to be pausable, stoppable or
 *    hideable; a carousel looping forever with no control fails it. Stopping
 *    by itself satisfies the criterion without putting a control in the hero.
 *
 * 3. Reduced motion does NOT stop the rotation (ASP-29). It used to, and that
 *    was wrong: the crossfade is a pure opacity change, with no travel, scale
 *    or parallax for it to provoke, and switching the whole feature off meant
 *    anyone with the preference set — which on Windows is a great many people
 *    — saw one still photograph and never knew there were four. The thing the
 *    preference is actually about here is the Ken Burns drift, and that is
 *    guarded in the stylesheet beside the rule that creates it.
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

export default function HeroBackdrop({ slides = [] }) {
  const [index, setIndex] = useState(0)
  const [rest, setRest] = useState(false)

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

  // One pass, then stop. Paused while the tab is hidden.
  useEffect(() => {
    if (!rest || slides.length < 2) return
    if (index >= slides.length - 1) return

    let timer = 0
    const tick = () => setIndex((i) => Math.min(i + 1, slides.length - 1))
    const start = () => { timer = window.setTimeout(tick, HOLD_MS) }
    const stop = () => window.clearTimeout(timer)

    if (!document.hidden) start()
    const onVisibility = () => { stop(); if (!document.hidden) start() }
    document.addEventListener('visibilitychange', onVisibility)

    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [rest, index, slides.length])

  if (!slides.length) return null

  return (
    /* aria-hidden: these are decorative. The hero's meaning is in the heading
       beside them, and announcing four photograph descriptions before it
       would bury the thing a screen reader user actually came for. */
    <div className="hero-bd" aria-hidden="true">
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
  )
}
