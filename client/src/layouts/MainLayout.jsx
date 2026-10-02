import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MobileBottomBar from '../components/MobileBottomBar.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { const el = document.getElementById(hash.slice(1)); if (el) return el.scrollIntoView(); }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
export default function MainLayout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <ScrollManager />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
