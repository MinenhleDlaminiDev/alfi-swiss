import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { nav, firm } from '../content/site.js'
import './RootLayout.css'

/* Shared shell for every route (ASP-02).
   The header and footer markup here is intentionally minimal — ASP-04 and ASP-05
   replace them with the full sticky header, mobile menu and footer. */
export default function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="shell-header">
        <div className="wrap shell-header__inner">
          <NavLink to="/" className="shell-brand">
            <span className="shell-brand__name">{firm.name}</span>
            <span className="shell-brand__sub">{firm.suffix}</span>
          </NavLink>

          <nav className="shell-nav" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  'shell-nav__link' + (isActive ? ' is-active' : '')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="shell-footer">
        <div className="wrap">
          <p>&copy; {new Date().getFullYear()} {firm.fullName}</p>
        </div>
      </footer>

      {/* Resets scroll to the top on navigation, preserves it on back/forward */}
      <ScrollRestoration />
    </>
  )
}
