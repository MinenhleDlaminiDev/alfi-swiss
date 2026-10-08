import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { startReveal, scan, stopReveal } from '../lib/reveal.js'

/* Shared shell for every route (ASP-02, filled in by ASP-04 / ASP-05). */
export default function RootLayout() {
  useHashScroll()
  useReveal()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {/* Resets scroll on navigation and restores it on back/forward. */}
      <ScrollRestoration />
    </>
  )
}

/* ASP-17 — in-page anchors.
 *
 * ScrollRestoration treats a hash change as a navigation with no saved
 * position and resets scrollY to 0, so clicking a #section link moved the URL
 * but not the page. Restore the expected behaviour here: when the location
 * carries a hash, scroll that element into view after render.
 *
 * Runs after ScrollRestoration's own effect, so it wins. The no-hash case is
 * left entirely alone, which keeps "navigate to a new page => top of page".
 */
function useHashScroll() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return

    let frame = 0
    const scroll = () => {
      let target = null
      try {
        target = document.querySelector(hash)
      } catch {
        return // malformed hash, e.g. "#1" — not a valid selector
      }
      if (!target) return
      // scroll-margin-top on [id] already clears the sticky header.
      target.scrollIntoView({ block: 'start', behavior: 'auto' })
    }

    // Two frames: one for ScrollRestoration to run, one to land after it.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(scroll)
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key])
}

/* ASP-24 — reveal on entry.
 *
 * Starts the shared observer once, then re-scans after each navigation so the
 * incoming page's elements are picked up. The observer itself is in
 * src/lib/reveal.js; everything about why it opts in rather than out is
 * documented beside `.u-reveal` in index.css.
 */
function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    startReveal()

    /* A reveal must never hide something the keyboard has reached. Tabbing to
       a link inside a section that has not scrolled into view would otherwise
       move focus to an invisible element — the focus ring would be there and
       the text would not. Reveal the whole group the moment focus lands in it. */
    const onFocusIn = (e) => {
      const group = e.target.closest && e.target.closest('.u-reveal:not(.is-in)')
      if (!group) return
      /* Revealed WITHOUT the transition. Fading in over half a second is fine
         when scrolling brought you to it, but a keyboard user who just tabbed
         here would spend that half second looking at a focus ring around
         nothing. Arriving by keyboard means it should already be there. */
      group.classList.add('is-instant', 'is-in')
    }
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('focusin', onFocusIn)
      stopReveal()
    }
  }, [])

  /* After the route renders, pick up whatever the new page brought with it.
     Two frames, for the same reason useHashScroll needs them: the DOM has to
     exist before it can be observed. */
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(scan)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])
}
