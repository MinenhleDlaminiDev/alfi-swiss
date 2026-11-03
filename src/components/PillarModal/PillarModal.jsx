import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eyebrow, Split, Figure, Bullets } from '../ui/index.jsx'
import { pillars } from '../../content/services.js'
import './PillarModal.css'

/* One service pillar, in a dialog over the Services index (ASP-82).
 *
 * REPLACES ServicePillar.jsx, which was a page per pillar. Seven pages each
 * holding a promise line, a photograph, five bullets and one paragraph was
 * more navigation than the content asked for, and comparing two services
 * meant two page loads and a trip back through the index.
 *
 * THE ROUTES DID NOT GO. `/services/<slug>` still resolves for all seven: the
 * route renders the index with this dialog already open. So a shared link
 * still lands on the service, search engines still have a URL per pillar, and
 * nothing that was ever published 404s. Opening a card is ordinary link
 * navigation — the card is still an `<a>` — which keeps middle-click and
 * open-in-new-tab working and updates the address bar without a click
 * handler doing it by hand.
 *
 * History: opening pushes, because Back should close the dialog. Closing and
 * stepping between pillars REPLACE, so walking through all seven leaves one
 * entry rather than seven, and Back after closing goes where the reader was
 * before the index rather than back into the dialog.
 *
 * TRIMMED IN ASP-85. Two sections came out at the user's instruction: 'How it
 * helps you', and the 'Arrange a Conversation' closing band. What is left is
 * the promise, the photograph and what we do.
 *
 * The closing band cost nothing — the identical call to action is on the
 * Services index directly behind this. 'How it helps you' did: all seven of
 * those paragraphs are the founders' own writing and this was the only place
 * on the site they appeared. The copy is still in content/services.js as
 * `helps`, with a note there on where each one came from, so restoring the
 * section is a few lines rather than another request to the client.
 */
export default function PillarModal({ slug }) {
  const navigate = useNavigate()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  const index = pillars.findIndex((p) => p.slug === slug)
  const pillar = pillars[index]
  /* Wrapping, so the last pillar leads back to the first. Seven items with
     dead ends at both ends would make 'next' look broken on the one card a
     reader is most likely to reach last. */
  const prev = pillars[(index - 1 + pillars.length) % pillars.length]
  const next = pillars[(index + 1) % pillars.length]

  const close = useCallback(() => {
    navigate('/services', { replace: true })
  }, [navigate])

  const go = useCallback(
    (to) => navigate(`/services/${to.slug}`, { replace: true }),
    [navigate],
  )

  /* Focus goes to the close button, not into the content. The dialog's title
     is read from `aria-labelledby` on open, so a screen-reader user hears
     what opened; landing on the exit means the way out is the first thing
     reachable, which is what a reader who opened the wrong card wants. */
  useEffect(() => {
    closeRef.current?.focus()
  }, [slug])

  /* Lock the page behind, trap focus, and handle the keyboard.
   *
   * The scrollbar compensation matters more here than it looks: `overflow:
   * hidden` on the body removes the scrollbar, the page behind widens by its
   * width, and every centred thing on it jumps sideways as the dialog opens.
   * Padding the body by the same amount holds it still.
   */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    const barWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (barWidth > 0) document.body.style.paddingRight = `${barWidth}px`

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      /* Arrows step between pillars, but not while someone is typing or
         working a control that uses them itself. Nothing in this dialog does
         today; the guard is here so adding a select or a slider later cannot
         silently break it. */
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const t = e.target
        const tag = t && t.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return
        e.preventDefault()
        go(e.key === 'ArrowRight' ? next : prev)
        return
      }
      if (e.key !== 'Tab') return

      const items = panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll('a[href], button:not([disabled])'),
          ).filter((el) => el.offsetParent !== null)
        : []
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      /* Focus can sit outside the dialog entirely — click any non-focusable
         part of the backdrop and the browser moves it to <body>. Wrapping
         only at the two ends misses that, and the next Tab walks into the
         page underneath. Same defect, and same fix, as the mobile menu in
         Header.jsx. */
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
      document.body.style.paddingRight = prevPad
    }
  }, [close, go, next, prev])

  /* On the way out, put focus back on the card that opened this. The card is
     an ordinary link to the same URL, so it can be found by href — no ref has
     to be threaded through the grid to do it. If the reader arrived straight
     from a shared link there is no card behind, and focus falls back to the
     document, which is correct: there is nothing to go back to. */
  useEffect(() => {
    const opener = `/services/${slug}`
    return () => {
      const card = document.querySelector(`.svc-index a[href="${opener}"]`)
      card?.focus()
    }
  }, [slug])

  if (!pillar) return null

  const titleId = `pillar-title-${pillar.slug}`

  return (
    <div className="pm" role="presentation">
      {/* The backdrop is a sibling button rather than a click handler on the
          wrapper, so closing by clicking away cannot be triggered by a click
          that started inside the panel and drifted out — a text selection
          dragged past the edge used to close dialogs built the other way.
          It is aria-hidden because Escape and the close button already give
          the same exit, named. */}
      <button
        type="button"
        className="pm__scrim"
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
      />

      <div
        className="pm__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className="pm__bar">
          <Eyebrow>{`${pillar.n} — Services`}</Eyebrow>
          <button
            type="button"
            className="pm__close"
            onClick={close}
            ref={closeRef}
          >
            <span className="pm__closeicon" aria-hidden="true" />
            Close
          </button>
        </div>

        <div className="pm__scroll">
          <header className="pm__head">
            <h2 className="pm__title" id={titleId}>{pillar.title}</h2>
            <p className="pm__promise">{pillar.promise}</p>
          </header>

          <div className="pm__body">
            <Split>
              <Figure
                slug={pillar.figure.slug}
                alt={pillar.figure.alt}
                caption={pillar.figure.caption}
              />
              <div>
                {/* 'What we do', not the pillar's name: the name is the
                    dialog's own heading a few lines above, and repeating it
                    reads as a template showing through. Kept from the page
                    this replaced, along with the reason. */}
                <h3 className="pm__heading">What we do</h3>
                <Bullets items={pillar.points} />
              </div>
            </Split>

          </div>
        </div>

        {/* Previous and next carry the neighbouring pillar's NAME, not just a
            direction. Seven services are not an order anyone holds in their
            head, so an unlabelled arrow asks the reader to click to find out
            where it goes. */}
        <nav className="pm__nav" aria-label="Services">
          <button type="button" className="pm__step pm__step--prev" onClick={() => go(prev)}>
            <span className="pm__steplabel">Previous</span>
            <span className="pm__steptitle">{prev.title}</span>
          </button>
          <button type="button" className="pm__step pm__step--next" onClick={() => go(next)}>
            <span className="pm__steplabel">Next</span>
            <span className="pm__steptitle">{next.title}</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
