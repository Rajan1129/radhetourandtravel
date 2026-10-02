import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import { seoPages } from './data/seoPages.js';

const SeoPage = lazy(() => import('./pages/SeoPage.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" role="status" aria-label="Loading" />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          {seoPages.map((p) => <Route key={p.slug} path={p.slug} element={<SeoPage slug={p.slug} />} />)}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="terms-and-conditions" element={<Legal kind="terms" />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
