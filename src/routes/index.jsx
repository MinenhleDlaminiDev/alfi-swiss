import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Services from '../pages/Services.jsx'
import Philosophy from '../pages/Philosophy.jsx'
import Contact from '../pages/Contact.jsx'
import NotFound from '../pages/NotFound.jsx'

/* Route table (ASP-02).
   Paths here must stay in sync with `nav` in src/content/site.js, and with the
   .htaccess rewrite added in ASP-13 so deep links survive a refresh on Apache. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'philosophy', element: <Philosophy /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
