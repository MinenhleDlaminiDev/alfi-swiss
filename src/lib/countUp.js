import { useEffect, useRef, useState } from 'react'

/* Count a figure up on first entry (ASP-28).
 *
 * The '40+' in the credentials strip is the firm's one hard number, and it
 * read as flat text. Counting it draws the eye to it once.
 *
 * Two rules it must not break:
 *
 * 1. The DOM has to settle on the real value. A figure left mid-count — by an
 *    unsupported browser, a reduced-motion preference, a throw before the
 *    observer attaches — would publish a wrong number, which is worse than a
 *    static one. So the state is INITIALISED to the final value and only
 *    stepped down to zero when we have already confirmed we can animate it.
 *
 * 2. It counts once. The observer disconnects on the first intersection, so
 *    scrolling back up does not replay it.
 *
 * Reduced motion shows the final value immediately. Unlike a fade, there is
 * no reduced form of a number changing — the motion IS the content changing.
 */

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/* Decelerating, so the last digits land slowly and the figure reads as
   arriving rather than stopping dead. */
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

function animatable() {
  return (
    typeof window !== 'undefined' &&
    typeof IntersectionObserver !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    typeof requestAnimationFrame !== 'undefined' &&
    window.matchMedia(MOTION_OK).matches
  )
}

export function useCountUp(to, { duration = 860, threshold = 0.4 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(() => (animatable() ? 0 : to))

  useEffect(() => {
    const el = ref.current
    if (!el || !animatable()) return

    let raf = 0
    let observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return

        // Once only.
        observer.disconnect()
        observer = null

        const started = performance.now()
        const step = (now) => {
          const t = Math.min(1, (now - started) / duration)
          /* easeOut(1) is exactly 1, so the last frame sets `to` itself and
             the rendered text is the real figure, not a rounding of it. */
          setValue(Math.round(easeOut(t) * to))
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold },
    )

    observer.observe(el)

    /* No setValue in here. Strict Mode runs the effect, tears it down and
       runs it again; writing the final value on teardown would leave the
       second run counting from 40 to 40 and the animation would never be
       seen in development. */
    return () => {
      if (observer) observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [to, duration, threshold])

  return [ref, value]
}
