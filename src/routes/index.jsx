import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Services from '../pages/Services.jsx'
import ServicePillar from '../pages/ServicePillar.jsx'
import OurApproach from '../pages/OurApproach.jsx'
import Contact from '../pages/Contact.jsx'
import Partners from '../pages/Partners.jsx'
import NotFound from '../pages/NotFound.jsx'
import RouteError from '../pages/RouteError.jsx'

/* Route table (ASP-02).
   Paths here must stay in sync with `nav` in src/content/site.js, and with the
   .htaccess rewrite added in ASP-13 so deep links survive a refresh on Apache.
   That rewrite is a catch-all, so renaming a route needs no server change.

   `errorElement` is RouteError, which reports a real render/loader failure as
   an error rather than mislabelling it a 404. Unknown paths are handled by the
   `path: '*'` child below, which renders NotFound inside the layout. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      /* One route for all four service pillars (ASP-70). The component looks
         the slug up in content/services.js and renders NotFound if there is
         no match, so a mistyped or guessed URL — including the three pillars
         still awaiting the partners' approval — is a 404 rather than a
         redirect or a blank page. */
      { path: 'services/:slug', element: <ServicePillar /> },
      { path: 'our-approach', element: <OurApproach /> },
      { path: 'partners', element: <Partners /> },
      { path: 'contact', element: <Contact /> },

      /* ASP-69 renamed two routes. Both old paths have been live on the UAT
         site for weeks and are in the client's hands, so they redirect rather
         than falling through to NotFound.

         `replace` matters: without it the old URL stays in history, and the
         back button lands on it, which redirects forward again — the user is
         trapped. These are not permanent server redirects; if the old paths
         ever need to stop resolving, they come out here. */
      { path: 'philosophy', element: <Navigate to="/our-approach" replace /> },
      { path: 'team', element: <Navigate to="/partners" replace /> },

      { path: '*', element: <NotFound /> },
    ],
  },
])
