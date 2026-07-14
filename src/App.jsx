import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const GOLD = '#C9A94E'
const CREAM = '#F4EFE3'
const NAVY = '#0B1C33'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(244,239,227,0.18)',
  borderRadius: 4,
  padding: '14px 16px',
  fontSize: 14,
  color: CREAM,
  fontFamily: 'inherit',
  transition: 'border-color .2s',
}

function Seal() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 132 132"
      style={{ opacity: 0, animation: 'alfiFade 1s ease .1s forwards' }}
    >
      <circle
        cx="66"
        cy="66"
        r="63"
        fill="none"
        stroke={CREAM}
        strokeWidth="1.2"
        strokeDasharray="396"
        strokeDashoffset="396"
        transform="rotate(-90 66 66)"
        style={{ animation: 'alfiDraw 1.3s ease .2s forwards' }}
      />
      <circle cx="66" cy="66" r="55" fill="none" stroke={CREAM} strokeWidth="0.5" opacity="0.5" />
      {/* Gold hand — fades in, then spins continuously around the center like a clock hand */}
      <line
        x1="66"
        y1="66"
        x2="66"
        y2="12"
        stroke={GOLD}
        strokeWidth="1.4"
        style={{
          opacity: 0,
          transformBox: 'view-box',
          transformOrigin: '66px 66px',
          animation: 'alfiFade .6s ease 1.1s forwards, alfiSpin 2s linear 1.1s forwards',
        }}
      />
      <path
        d="M66 40 L84 92 L74 92 L66 66 L58 92 L48 92 Z"
        fill={CREAM}
        style={{ opacity: 0, animation: 'alfiRise .7s ease 1s forwards' }}
      />
      <circle
        cx="66"
        cy="66"
        r="2.4"
        fill={GOLD}
        style={{ opacity: 0, animation: 'alfiFade .5s ease 1.4s forwards' }}
      />
    </svg>
  )
}

export default function App() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init({ publicKey: PUBLIC_KEY })
      } catch (e) {
        /* no-op */
      }
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (sending) return

    const f = e.target.elements
    const params = {
      name: f.name.value,
      email: f.email.value,
      message: f.message.value || '(no message)',
    }

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      setError(true)
      return
    }

    setSending(true)
    setError(false)
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, params)
      .then(() => {
        setSent(true)
        setSending(false)
      })
      .catch(() => {
        setSending(false)
        setError(true)
      })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(120% 90% at 50% 0%, #12294a 0%, #0B1C33 60%)',
      }}
    >
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '64px 24px 48px',
          gap: 38,
        }}
      >
        <Seal />

        {/* WORDMARK */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            opacity: 0,
            animation: 'alfiRise .9s ease .5s forwards',
          }}
        >
          <div
            style={{
              fontSize: 46,
              fontWeight: 600,
              letterSpacing: '0.34em',
              paddingLeft: '0.34em',
              color: CREAM,
              lineHeight: 1,
            }}
          >
            ALFI
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 34, height: 1, background: 'rgba(201,169,78,0.6)' }} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.36em',
                paddingLeft: '0.36em',
                color: GOLD,
              }}
            >
              SWISS&nbsp;PARTNERS
            </span>
            <span style={{ width: 34, height: 1, background: 'rgba(201,169,78,0.6)' }} />
          </div>
        </div>

        {/* MESSAGE */}
        <div
          style={{
            maxWidth: 540,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            opacity: 0,
            animation: 'alfiRise .9s ease .8s forwards',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.32em',
              paddingLeft: '0.32em',
              color: CREAM,
            }}
          >
            COMING&nbsp;SOON
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.7,
              color: 'rgba(244,239,227,0.62)',
              textWrap: 'pretty',
            }}
          >
            For enquiries, contact us below.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div
          style={{
            width: '100%',
            maxWidth: 460,
            opacity: 0,
            animation: 'alfiRise .9s ease 1.05s forwards',
          }}
        >
          {sent ? (
            <div
              style={{
                border: '1px solid rgba(201,169,78,0.4)',
                borderRadius: 4,
                padding: '34px 28px',
                background: 'rgba(201,169,78,0.06)',
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: GOLD,
                  letterSpacing: '0.04em',
                  marginBottom: 8,
                }}
              >
                Thank you
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(244,239,227,0.7)' }}>
                We have received your details and will reach out shortly.
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}
            >
              <input name="name" type="text" required placeholder="Full name" style={inputStyle} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                style={inputStyle}
              />
              <textarea
                name="message"
                rows="3"
                placeholder="How can we help? (optional)"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              {error && (
                <div style={{ fontSize: 13, lineHeight: 1.5, color: '#E08A6A' }}>
                  Something went wrong sending your message. Please try again or email us directly.
                </div>
              )}
              <button
                type="submit"
                disabled={sending}
                style={{
                  marginTop: 4,
                  background: GOLD,
                  border: 'none',
                  borderRadius: 4,
                  padding: '15px 20px',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: NAVY,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'background .2s',
                }}
              >
                {sending ? 'SENDING…' : 'REQUEST A CONSULTATION'}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="site-footer"
        style={{
          borderTop: '1px solid rgba(244,239,227,0.1)',
          padding: '26px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(244,239,227,0.45)',
          textAlign: 'center',
        }}
      >
        <a href="mailto:info@alfiswisspartners.com">info@alfiswisspartners.com</a>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>© {new Date().getFullYear()} ALFI Swiss Partners</span>
      </footer>
    </div>
  )
}
