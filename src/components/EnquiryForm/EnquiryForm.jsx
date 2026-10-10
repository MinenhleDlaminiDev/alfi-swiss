import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { form as copy } from '../../content/contact.js'
import './EnquiryForm.css'

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Confidential enquiry form (ASP-11).
   Validates before sending, reports field errors to assistive technology, and
   distinguishes "sending", "sent" and "failed" states. */
export default function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [fieldErrors, setFieldErrors] = useState({})
  const formRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    if (!PUBLIC_KEY) return
    try {
      emailjs.init({ publicKey: PUBLIC_KEY })
    } catch {
      /* init is best-effort; send() surfaces any real failure */
    }
  }, [])

  // Move focus to the status message so it is announced, not just rendered
  useEffect(() => {
    if (status === 'sent' || status === 'error') statusRef.current?.focus()
  }, [status])

  function validate(values) {
    const errors = {}
    if (!values.name.trim()) errors.name = copy.validation.name
    if (!EMAIL_RE.test(values.email.trim())) errors.email = copy.validation.email
    return errors
  }

  function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    const f = e.target.elements
    const values = {
      name: f.name.value,
      email: f.email.value,
      message: f.message.value,
    }

    const errors = validate(values)
    setFieldErrors(errors)
    const firstInvalid = Object.keys(errors)[0]
    if (firstInvalid) {
      // Focus by field name, not by [aria-invalid]: that attribute is not on
      // the DOM yet, because React has not flushed this setState.
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      console.error('EmailJS environment variables are missing.')
      setStatus('error')
      return
    }

    setStatus('sending')
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        name: values.name,
        email: values.email,
        message: values.message || '(no message)',
      })
      .then(() => setStatus('sent'))
      .catch((err) => {
        console.error('EmailJS send failed:', err)
        setStatus('error')
      })
  }

  if (status === 'sent') {
    return (
      <div className="enq__success" tabIndex={-1} ref={statusRef} role="status">
        <p className="enq__successtitle">{copy.success.title}</p>
        <p className="enq__successbody">{copy.success.body}</p>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    /* u-stagger (ASP-43): the fields and the submit button arrive in sequence
       with the rest of the contact section. Inert outside a `.u-reveal`
       ancestor, so the form is unaffected if it is ever used elsewhere. */
    <form className="enq u-stagger" onSubmit={onSubmit} ref={formRef} noValidate>
      <div className="enq__field">
        <label className="enq__label" htmlFor="enq-name">{copy.fields.name.label}</label>
        <input
          id="enq-name" name="name" type="text" autoComplete="name"
          placeholder={copy.fields.name.placeholder}
          aria-invalid={fieldErrors.name ? 'true' : undefined}
          aria-describedby={fieldErrors.name ? 'enq-name-err' : undefined}
        />
        {fieldErrors.name && <p className="enq__err" id="enq-name-err">{fieldErrors.name}</p>}
      </div>

      <div className="enq__field">
        <label className="enq__label" htmlFor="enq-email">{copy.fields.email.label}</label>
        <input
          id="enq-email" name="email" type="email" autoComplete="email"
          placeholder={copy.fields.email.placeholder}
          aria-invalid={fieldErrors.email ? 'true' : undefined}
          aria-describedby={fieldErrors.email ? 'enq-email-err' : undefined}
        />
        {fieldErrors.email && <p className="enq__err" id="enq-email-err">{fieldErrors.email}</p>}
      </div>

      <div className="enq__field">
        <label className="enq__label" htmlFor="enq-message">{copy.fields.message.label}</label>
        <textarea
          id="enq-message" name="message" rows="4"
          placeholder={copy.fields.message.placeholder}
        />
      </div>

      {status === 'error' && (
        <p className="enq__formerr" tabIndex={-1} ref={statusRef} role="alert">
          {copy.error}
        </p>
      )}

      <button type="submit" className="ui-btn ui-btn--gold enq__submit" disabled={sending}>
        {sending ? copy.submitting : copy.submit}
      </button>
    </form>
  )
}
