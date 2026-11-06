/* In-frame parallax (ASP-28).
 *
 * Moves a photograph INSIDE a frame that never changes size. The frame owns
 * the layout; only the inner wrapper is transformed. That distinction is the
 * whole safety argument:
 *
 *   - nothing reflows, so the scroll handler cannot become a layout thrash
 *   - the frame's box is fixed, so the contribution to CLS is exactly zero
 *   - the effect degrades to "a photograph in a box" the instant it is off
 *
 * Shape mirrors reveal.js on purpose — start / scan / stop, driven from
 * RootLayout — so there is one place where page-level motion is wired up.
 *
 * Reduced motion: this one is disabled outright rather than softened, and
 * that is not the ASP-24 mistake repeating. Parallax IS the trigger the
 * preference exists for: two planes moving at different speeds is the
 * textbook vestibular case. There is no "gentler parallax" to fall back to,
 * so the fallback is a still image — which is what the figure already is.
 */

const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const SELECTOR = '.ui-figure--par'

/* Travel, as a fraction of the frame's own height, in each direction. The
   CSS reserves 8% of overflow at the top and bottom to pay for it; raising
   this without widening `.ui-figure--par .ui-figure__par` shows the edge. */
const SHIFT = 0.08

const tracked = new Set()
const onScreen = new Set()

let io = null
let frame = 0
let listening = false

function motionWanted() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(MOTION_OK).matches
  )
}

function supported() {
  return typeof IntersectionObserver !== 'undefined' && typeof requestAnimationFrame !== 'undefined'
}

/* Read every visible frame's position, then write every offset. Kept in one
   rAF callback so the reads cannot interleave with the writes and force a
   synchronous layout per element. */
function measure() {
  frame = 0
  const vh = window.innerHeight || document.documentElement.clientHeight || 0
  if (!vh) return

  for (const el of onScreen) {
    const rect = el.getBoundingClientRect()

    /* 0 when the frame's top edge is level with the bottom of the viewport,
       1 when its bottom edge is level with the top: the full span over which
       the frame is on screen at all, so the travel is spent evenly across the
       scroll rather than racing through near the middle. */
    const span = vh + rect.height
    const p = span > 0 ? (vh - rect.top) / span : 0.5
    const clamped = p < 0 ? 0 : p > 1 ? 1 : p

    /* +shift on the way in, 0 at the midpoint, -shift on the way out. */
    const y = (0.5 - clamped) * 2 * (rect.height * SHIFT)
    el.style.setProperty('--par', y.toFixed(1) + 'px')
  }
}

function request() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function listen() {
  if (listening) return
  /* passive: this handler never calls preventDefault, and saying so is what
     keeps it off the scroll's critical path. */
  window.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', request)
  listening = true
}

function unlisten() {
  if (!listening) return
  window.removeEventListener('scroll', request)
  window.removeEventListener('resize', request)
  listening = false
}

export function startParallax() {
  if (typeof document === 'undefined') return
  if (!supported() || !motionWanted()) return

  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) onScreen.add(entry.target)
      else {
        onScreen.delete(entry.target)
        /* Park it in the middle of its travel on the way out, so a frame
           that is scrolled past and returned to does not jump. */
        entry.target.style.setProperty('--par', '0px')
      }
    }

    /* No listener at all while nothing is on screen — the common case on
       every page that has no parallax figure below the fold. */
    if (onScreen.size) { listen(); request() }
    else unlisten()
  })

  scanParallax()
}

/* Safe to call repeatedly. Route changes bring new figures and take the old
   ones away; the observer only ever holds what is currently in the document. */
export function scanParallax() {
  if (!io) return

  for (const el of document.querySelectorAll(SELECTOR)) {
    if (tracked.has(el)) continue
    tracked.add(el)
    io.observe(el)
  }

  for (const el of tracked) {
    if (!el.isConnected) {
      tracked.delete(el)
      onScreen.delete(el)
      io.unobserve(el)
    }
  }

  if (!onScreen.size) unlisten()
}

export function stopParallax() {
  unlisten()
  if (frame) { cancelAnimationFrame(frame); frame = 0 }
  if (io) { io.disconnect(); io = null }
  tracked.clear()
  onScreen.clear()
}
