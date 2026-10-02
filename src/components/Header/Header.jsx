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
    // labelled "Close menu" control.
    const getFocusables = () => {
      const inPanel = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll('a[href], button:not([disabled])'))
        : []
      return toggleRef.current ? [...inPanel, toggleRef.current] : inPanel
    }

    getFocusables()[0]?.focus()

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
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
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
    <header className="hdr">
      <div className="wrap hdr__inner">
        <NavLink to="/" className="hdr__brand" aria-label={firm.fullName}>
          <Seal size={34} />
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
  )
}
