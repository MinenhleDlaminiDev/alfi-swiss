import { card } from '../../content/contact.js'
import './VCard.css'

/* Digital business card (ASP-19).
 *
 * Ported from the supplied design (alfi-vcard-white.html), which was a
 * self-unpacking bundler export — React, a QR generator and seven font
 * subsets wrapped around ~14 kB of actual page. Only the card itself is
 * reproduced here; the runtime, the bundled React and the fonts are already
 * provided by this site.
 *
 * Three things were deliberately changed from that file, each noted at the
 * point it matters:
 *   1. the QR comes from our own build-time artefact, not a third-party API
 *   2. it renders large enough to actually scan
 *   3. the values come from content/contact.js rather than being inline
 *
 * Every value still comes from `card`, the same object scripts/build-vcard.mjs
 * turns into the .vcf and the QR. Do not inline a number here.
 */
export default function VCard() {
  const qrSrc = `/${card.slug}-qr.svg`

  return (
    <article className="vcard" aria-label={`Business card for ${card.name}`}>
      {/* Oversized seal bleeding off the top-right corner. Decorative. */}
      <svg className="vcard__watermark" viewBox="0 0 132 132" aria-hidden="true" focusable="false">
        <circle cx="66" cy="66" r="63" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="66" cy="66" r="55" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <line x1="66" y1="66" x2="66" y2="12" stroke="var(--vc-gold)" strokeWidth="1.6" />
        <path d="M66 40 L84 92 L74 92 L66 66 L58 92 L48 92 Z" fill="currentColor" />
        <circle cx="66" cy="66" r="2.4" fill="var(--vc-gold)" />
      </svg>

      <div className="vcard__inner">
        <svg className="vcard__seal" viewBox="0 0 132 132" aria-hidden="true" focusable="false">
          <circle cx="66" cy="66" r="63" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="66" cy="66" r="55" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          <line x1="66" y1="66" x2="66" y2="12" stroke="var(--vc-gold)" strokeWidth="1.6" />
          <path d="M66 40 L84 92 L74 92 L66 66 L58 92 L48 92 Z" fill="currentColor" />
          <circle cx="66" cy="66" r="2.4" fill="var(--vc-gold)" />
        </svg>

        <p className="vcard__wordmark">ALFI</p>

        <p className="vcard__suffix">
          <span className="vcard__rule vcard__rule--l" aria-hidden="true" />
          <span className="vcard__suffixtext">Swiss&nbsp;Partners</span>
          <span className="vcard__rule vcard__rule--r" aria-hidden="true" />
        </p>

        <span className="vcard__divider" aria-hidden="true" />

        <p className="vcard__name">{card.name}</p>
        <p className="vcard__role">{card.role}</p>

        <div className="vcard__rows">
          {card.phones.map((phone) => (
            <a className="vcard__row" key={phone.tel} href={`tel:${phone.tel}`}>
              {/* The badge letter is the printed card's abbreviation. Hidden
                  from assistive tech, which would read a bare "M"; the real
                  label is carried in the link text instead. */}
              <span className="vcard__badge" aria-hidden="true">{phone.label}</span>
              <span className="vcard__value vcard__value--tel">
                <span className="u-sr-only">
                  {phone.kind === 'cell' ? 'Mobile' : 'Direct line'}:{' '}
                </span>
                {phone.display}
              </span>
            </a>
          ))}

          <a className="vcard__row" href={`mailto:${card.email}`}>
            <span className="vcard__badge" aria-hidden="true">@</span>
            <span className="vcard__value vcard__value--email">
              <span className="u-sr-only">Email: </span>
              {card.email}
            </span>
          </a>

          <p className="vcard__row vcard__row--static">
            <span className="vcard__badge" aria-hidden="true">⌖</span>
            <span className="vcard__value">
              <span className="u-sr-only">Address: </span>
              {card.address.displayLines.join(', ')}
            </span>
          </p>
        </div>

        <div className="vcard__qrblock">
          <span className="vcard__qrframe">
            {/* Served from public/, generated at build time by
                scripts/build-vcard.mjs. The supplied file fetched this from
                api.qrserver.com with the full vCard in the query string, which
                sent a personal mobile, direct line and email to a third party
                on every page load. */}
            <img
              className="vcard__qr"
              src={qrSrc}
              width="324"
              height="324"
              alt={`QR code containing the contact details for ${card.name}. Scan it with a phone camera to save the contact.`}
            />
          </span>
          <p className="vcard__qrcaption">{card.qrCaption}</p>
        </div>

        <p className="vcard__site">{card.websiteDisplay}</p>
      </div>
    </article>
  )
}
