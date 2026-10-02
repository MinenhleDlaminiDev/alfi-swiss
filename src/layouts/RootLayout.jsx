import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

/* Shared shell for every route (ASP-02, shell filled in by ASP-04 / ASP-05). */
export default function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
