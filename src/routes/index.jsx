import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Services from '../pages/Services.jsx'
import OurApproach from '../pages/OurApproach.jsx'
import WhoWeServe from '../pages/WhoWeServe.jsx'
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
      /* One route for all seven service pillars (ASP-70), rendering the
         INDEX rather than a page of its own since ASP-82.

         The pillars are a dialog over the Services index now. Keeping the
         route means every published /services/<slug> still resolves, still
         carries its own title and description for search, and still works as
         a shared link — it opens the index with that pillar's dialog already
         open. Services.jsx looks the slug up and renders NotFound if there is
         no match, so a mistyped or guessed URL is still a 404 rather than a
         redirect or a blank page.

         Do not point this at a component of its own again without checking
         what it does to those URLs. */
      { path: 'services/:slug', element: <Services /> },
      { path: 'who-we-serve', element: <WhoWeServe /> },
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
