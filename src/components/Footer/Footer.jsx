import { Link } from 'react-router-dom'
import { nav, firm, contact, regulatory } from '../../content/site.js'
import Seal from '../Seal.jsx'
import './Footer.css'

/* Site footer (ASP-05). The regulatory notice is a placeholder pending
   legal sign-off — see src/content/site.js. */
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div className="ftr__brandcol">
            <Link to="/" className="ftr__brand" aria-label={firm.fullName}>
              <Seal size={30} />
              <span className="ftr__brandtext">
                <span className="ftr__name">{firm.name}</span>
                <span className="ftr__sub">{firm.suffix}</span>
              </span>
            </Link>
            <p className="ftr__blurb">{firm.blurb}</p>
          </div>

          <nav className="ftr__col" aria-label="Footer">
            <h2 className="ftr__coltitle">Navigate</h2>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="ftr__link">{item.label}</Link>
            ))}
          </nav>

          <div className="ftr__col">
            <h2 className="ftr__coltitle">Contact</h2>
            <a className="ftr__link" href={`mailto:${contact.email}`}>{contact.email}</a>
            <address className="ftr__address">
              {contact.addressLines.map((line) => <span key={line}>{line}</span>)}
            </address>
          </div>
        </div>

        <div className="ftr__legal">
          <p className="ftr__notice">{regulatory}</p>
          <p className="ftr__copy">&copy; {new Date().getFullYear()} {firm.fullName}</p>
        </div>
      </div>
    </footer>
  )
}
