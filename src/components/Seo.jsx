import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { firm } from '../content/site.js'

const SITE_URL = 'https://alfiswisspartners.com'
const OG_IMAGE = `${SITE_URL}/images/home-positioning-1200w.jpg`

/* Per-route metadata (ASP-14).
 *
 * Sets title, description, canonical and Open Graph tags on navigation.
 * Tags are created once and then updated, so repeated navigation does not
 * accumulate duplicates in <head>.
 *
 * Note: this runs client-side. Crawlers that execute JavaScript (Google,
 * Bing) will see it; simpler scrapers and some social-preview fetchers read
 * only the served HTML and will fall back to the defaults in index.html.
 * Pre-rendering is the fix if that ever matters — out of scope here.
 */
function upsertMeta(selector, attrs) {
  // Never write "undefined" into a tag: that would clobber the static default
  // in index.html with a literal string.
  if (attrs.content == null || attrs.content === '') return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    for (const [k, v] of Object.entries(attrs)) {
      if (k !== 'content') el.setAttribute(k, v)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', attrs.content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} — ${firm.fullName}` : firm.fullName
    const url = SITE_URL + (pathname === '/' ? '' : pathname)

    document.title = fullTitle

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertLink('canonical', url)

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: firm.fullName })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: OG_IMAGE })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: OG_IMAGE })
  }, [title, description, pathname])

  return null
}
