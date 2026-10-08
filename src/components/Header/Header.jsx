import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, firm } from '../../content/site.js'
import Seal from '../Seal.jsx'
import './Header.css'

/* Breakpoint at which the mobile menu stops existing. Must match the
   `max-width: 900px` query in Header.css. */
const MOBILE_QUERY = '(max-width: 900px)'

/* Sticky site header with mobile menu (ASP-04).
   The menu traps focus while open, closes on Escape, on navigation, and when
   the viewport widens past the mobile breakpoint, and restores focus to the
   toggle on close. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const sentinelRef = useRef(null)
  const stuck = useStuck(sentinelRef)
  const { pathname } = useLocation()

  const close = useCallback(() => setOpen(false), [])

  // Close on navigation
  useEffect(() => { close() }, [pathname, close])

  // Close if the viewport grows past the mobile breakpoint, otherwise the
  // scroll lock would persist with no visible way to release it.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => { if (!e.matches) close() }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open, close])

  // Lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // The toggle sits outside the panel but is part of the trap — it is the
    // labelled "Close menu" control. It must come FIRST, because it precedes
    // the panel in the DOM: listing it last would mean tabbing forward off the
    // final panel link is not intercepted, and focus escapes into the page
    // underneath the open overlay.
    const getFocusables = () => {
      const inPanel = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll('a[href], button:not([disabled])'))
        : []
      return toggleRef.current ? [toggleRef.current, ...inPanel] : inPanel
    }

    // Focus the first menu link, not the toggle — the toggle leads the array
    // for DOM-order trapping, but it is not where a user wants to land.
    panelRef.current?.querySelector('a[href]')?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        close()
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      // Focus can sit outside the trap entirely while the panel is open: tap
      // any non-focusable part of the overlay and the browser moves focus to
      // <body>. Wrapping only at the two ends does not catch that, so the next
      // Tab walks into the page underneath the overlay. Pull it back in.
      if (!items.includes(active)) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
        return
      }

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  const renderLinks = (onNavigate) =>
    nav.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === '/'}
        onClick={onNavigate}
        className={({ isActive }) => 'hdr__link' + (isActive ? ' is-active' : '')}
      >
        {item.label}
      </NavLink>
    ))

  return (
    <>
      {/* Sentinel for the stuck state. It sits in normal flow immediately
          above the sticky header, so "the sentinel has scrolled out of view"
          and "the header is now stuck" are the same event. */}
      <span ref={sentinelRef} className="hdr__sentinel" aria-hidden="true" />
      <header className={'hdr' + (stuck ? ' is-stuck' : '')}>
      <div className="wrap hdr__inner">
        <NavLink to="/" className="hdr__brand" aria-label={firm.fullName}>
          <Seal size={34} animate />
          <span className="hdr__brandtext">
            <span className="hdr__name">{firm.name}</span>
            <span className="hdr__sub">{firm.suffix}</span>
          </span>
        </NavLink>

        <nav className="hdr__nav" aria-label="Primary">{renderLinks()}</nav>

        <button
          ref={toggleRef}
          type="button"
          className="hdr__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={'hdr__bars' + (open ? ' is-open' : '')} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={'hdr__panel' + (open ? ' is-open' : '')}
        hidden={!open}
      >
        {/* onClick closes even when the tapped link is the current route,
            which would not re-run the pathname effect. */}
        <nav className="hdr__panelnav" aria-label="Mobile">{renderLinks(close)}</nav>
      </div>
      </header>
    </>
  )
}

/* ASP-20 — sticky header state.
 *
 * True once the page has scrolled far enough that the header has left its
 * resting place, so it can fade in a translucent blurred background and let
 * content read as passing behind glass rather than colliding with it.
 *
 * Watches a zero-height sentinel sitting in normal flow just above the
 * header, not the header itself. Observing the sticky element directly does
 * not work: it is pinned at `top: 0`, so any negative top rootMargin clips it
 * by that much even while resting, and it reports "stuck" from the first
 * paint — which is exactly what the first attempt here did.
 *
 * A sentinel also costs nothing on scroll: the browser reports the crossing,
 * instead of us recomputing a position on every frame.
 */
function useStuck(ref) {
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const el = ref.current
    // Guarded: without IntersectionObserver the header simply stays solid,
    // which is the pre-ASP-20 appearance and perfectly usable.
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return isStuck
}
