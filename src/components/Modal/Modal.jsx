import { useEffect, useRef } from 'react'
import './Modal.css'

/* Modal dialog (ASP-39).
 *
 * The most accessibility-sensitive component on the site, so nearly all of
 * this is keyboard and screen-reader behaviour rather than the animation.
 *
 * What it guarantees:
 *   - focus moves inside on open and returns to the EXACT element that
 *     opened it on close, not the first button on the page
 *   - Tab and Shift+Tab are trapped, including when focus has escaped to
 *     <body>, which is the leak that had to be fixed in the header menu
 *   - Escape closes; a backdrop click closes; a click inside does not
 *   - the page behind cannot scroll, and does not jump when the scrollbar
 *     is taken away
 *   - the page behind is hidden from screen readers entirely
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function Modal({ open, onClose, title, labelledBy, children }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  /* Captured on open rather than read on close: by the time the dialog is
     closing, document.activeElement is something inside the dialog. */
  const openerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    openerRef.current = document.activeElement
    const panel = panelRef.current
    const main = document.getElementById('main')
    const header = document.querySelector('.hdr')
    const footer = document.querySelector('.ftr')

    /* Hide everything else from assistive technology. aria-modal alone is
       not reliably honoured, and without this a screen reader can still
       walk the page behind the dialog. */
    const hidden = [main, header, footer].filter(Boolean)
    const previous = hidden.map((el) => el.getAttribute('aria-hidden'))
    hidden.forEach((el) => el.setAttribute('aria-hidden', 'true'))

    /* Lock the scroll, and pay back the width the scrollbar was occupying,
       or the whole page shifts sideways as it disappears. */
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    // The close button, not the panel: an explicit, predictable landing spot.
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return

      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (!items.length) {
        e.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      /* Containment branch. If focus has left the dialog entirely — which
         happens the moment it reaches <body> — the wrap-around checks below
         both miss and Tab walks away into the page behind. Pull it back. */
      if (!panel.contains(active)) {
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

    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      hidden.forEach((el, i) => {
        if (previous[i] === null) el.removeAttribute('aria-hidden')
        else el.setAttribute('aria-hidden', previous[i])
      })
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPad

      /* Return focus to whatever opened it. The guard matters: if that
         element has since left the DOM, focusing it throws. */
      const opener = openerRef.current
      if (opener && document.contains(opener)) opener.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" role="presentation">
      {/* The backdrop is its own element and carries the dismiss click, so
          "clicked outside" is a real hit test rather than an inference from
          where the event bubbled up to. */}
      <div className="modal__backdrop" onClick={onClose} />

      <div
        className="modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <button
          type="button"
          className="modal__close"
          ref={closeRef}
          onClick={onClose}
        >
          {/* Named for what it closes, so a screen reader user who lands on
              it out of context knows which dialog they are in. */}
          <span className="u-sr-only">{title ? `Close ${title}` : 'Close'}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="modal__closeicon">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>

        <div className="modal__content">{children}</div>
      </div>
    </div>
  )
}
