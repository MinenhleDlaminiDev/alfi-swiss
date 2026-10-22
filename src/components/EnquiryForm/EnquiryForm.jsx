import { useEffect, useRef, useState } from 'react'
import { form as copy } from '../../content/contact.js'
import './EnquiryForm.css'

/* Same-origin endpoint, served by a Netlify function on UAT and by
   api/enquiry.php on Apache in production (ASP-67). The client does not know
   or care which; it posts JSON and reads {ok:true} or {error}.

   This replaced EmailJS, which was called straight from the browser with a
   public key. Resend's key is a server secret, so the send had to move off
   the client — there is no configuration that makes it safe to ship. */
const ENDPOINT = '/api/enquiry'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Confidential enquiry form (ASP-11).
   Validates before sending, reports field errors to assistive technology, and
   distinguishes "sending", "sent" and "failed" states. */
export default function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [fieldErrors, setFieldErrors] = useState({})
  const formRef = useRef(null)
  const statusRef = useRef(null)

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

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    const f = e.target.elements
    const values = {
      name: f.name.value,
      email: f.email.value,
      message: f.message.value,
      /* The honeypot. Empty for every human; a bot that fills every input
         fills this one too. The server answers 200 and sends nothing, so
         whatever submitted it cannot tell that it was caught. */
      company: f.company.value,
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

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      /* A non-2xx is a failure even though fetch resolves — fetch only
         rejects on a network error, so checking res.ok is what separates
         "sent" from "the server refused it". */
      if (!res.ok) throw new Error(`enquiry endpoint returned ${res.status}`)
      setStatus('sent')
    } catch (err) {
      console.error('Enquiry send failed:', err)
      setStatus('error')
    }
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

      {/* Honeypot (ASP-67). Hidden from sighted users by CSS, from assistive
          technology by aria-hidden, and from the keyboard by tabIndex -1, so
          nobody can fill it by accident. autoComplete="off" keeps a browser
          from helpfully populating it. Named "company" because a bot looks
          for plausible names; "honeypot" would be skipped. */}
      <div className="enq__trap" aria-hidden="true">
        <label htmlFor="enq-company">Company</label>
        <input
          id="enq-company" name="company" type="text"
          tabIndex={-1} autoComplete="off" defaultValue=""
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
