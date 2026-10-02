import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

/* Shared shell for every route (ASP-02, filled in by ASP-04 / ASP-05). */
export default function RootLayout() {
  useHashScroll()

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
