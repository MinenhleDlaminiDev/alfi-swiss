/* Reveal-on-entry (ASP-24).
 *
 * One observer for the whole document, watching every `.u-reveal`. Elements
 * are revealed once and then unobserved — scrolling back up must not replay
 * anything.
 *
 * The opt-in is deliberate and load-bearing: `js-motion` is what makes the
 * CSS hide anything at all. Until this runs, the page is fully visible. See
 * the long comment above `.u-reveal` in index.css before changing this.
 */

const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const REVEALED = 'is-in'

/* Elements already on screen when the page loads are revealed immediately
   rather than being held back for a scroll that may never come — a short page,
   or a visitor who reads without scrolling, would otherwise sit looking at
   content stuck at opacity 0. */
const STAGGER_MS = 70
const MAX_STAGGER = 5

let observer = null

function motionWanted() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(MOTION_OK).matches
  )
}

function supported() {
  return typeof IntersectionObserver !== 'undefined'
}

/* Reveal an element, staggering siblings so a row of cards arrives in sequence
   instead of as one slab. The delay is capped: past a handful of items the
   stagger stops reading as rhythm and starts reading as lag. */
function reveal(el, index) {
  const step = Math.min(index, MAX_STAGGER)
  if (step > 0) el.style.setProperty('--reveal-delay', step * STAGGER_MS + 'ms')
  el.classList.add(REVEALED)
}

/* Index among the sibling .u-reveal elements that share a parent, so the
   stagger restarts per group rather than running up across the whole page. */
function groupIndex(el) {
  const parent = el.parentElement
  if (!parent) return 0
  const siblings = [...parent.children].filter((c) => c.classList && c.classList.contains('u-reveal'))
  const i = siblings.indexOf(el)
  return i < 0 ? 0 : i
}

export function startReveal() {
  if (typeof document === 'undefined') return

  /* `js-motion` is set by the inline script in index.html, before first paint,
     so the content never blinks. That means it may already be on the element
     when we get here — and if we cannot actually observe anything, it must
     come back off, or every `.u-reveal` stays at opacity 0 forever with no
     observer coming to rescue it.

     This is the one path where the opt-in can strand content, so it is handled
     explicitly rather than left to the default. */
  /* Only the observer gates this now. `prefers-reduced-motion` used to gate it
     too, which meant no animation at all for anyone with the setting on. The
     preference is handled in CSS instead: under `reduce` the reveal becomes a
     plain fade with no movement, which is what the preference is actually
     about — vestibular triggers are travel, scale and spin, not opacity. */
  if (!supported()) {
    document.documentElement.classList.remove('js-motion')
    return
  }

  // Harmless if the inline script already added it; needed if it never ran.
  document.documentElement.classList.add('js-motion')

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target, groupIndex(entry.target))
        observer.unobserve(entry.target)
      }
    },
    {
      /* Start the reveal slightly before the element reaches the viewport, so
         it is settling as it arrives rather than visibly popping once there. */
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.01,
    },
  )

  scan()
}

/* Observe anything not yet revealed. Safe to call repeatedly — on route
   changes the new page's elements are picked up and the old ones are gone. */
export function scan() {
  if (!observer) return
  const pending = document.querySelectorAll('.u-reveal:not(.' + REVEALED + ')')
  pending.forEach((el) => observer.observe(el))
}

export function stopReveal() {
  if (!observer) return
  observer.disconnect()
  observer = null
  document.documentElement.classList.remove('js-motion')
}
