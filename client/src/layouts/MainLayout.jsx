import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MobileBottomBar from '../components/MobileBottomBar.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If legacy hash links are clicked (#about or #contact), forward to dedicated pages
    if (hash === '#about') {
      navigate('/about', { replace: true });
      return;
    }
    if (hash === '#contact') {
      navigate('/contact', { replace: true });
      return;
    }

    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 12) {
          attempts++;
          setTimeout(scrollToElement, 50);
        }
      };
      setTimeout(scrollToElement, 20);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, navigate]);

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
