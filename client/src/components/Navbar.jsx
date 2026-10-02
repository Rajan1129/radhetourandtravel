import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/images/logo/logo.webp';
import { telHref } from '../utils/contact.js';

const links = [
  ['Home', '/'],
  ['Taxi Services', '/taxi-service-in-una'],
  ['Outstation', '/outstation-taxi-una'],
  ['Airport Transfer', '/airport-taxi-una'],
  ['Popular Routes', '/#routes'],
  ['About Us', '/about'],
  ['Contact', '/contact'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const cls = ({ isActive }) => `text-sm font-semibold py-2 border-b-2 ${isActive ? 'border-sky text-deep' : 'border-transparent text-slate-dark hover:text-deep'}`;
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" aria-label="Radhe Una Taxi Service home" className="shrink-0"><img src={logo} width="86" height="68" alt="Radhe Una Taxi Service logo" className="h-12 w-auto lg:h-[68px]" /></Link>
        <nav aria-label="Main" className="hidden lg:flex items-center gap-6">
          {links.map(([t, to]) => to.includes('#')
            ? <a key={t} href={to} className="text-sm font-semibold text-slate-dark hover:text-deep py-2 border-b-2 border-transparent">{t}</a>
            : <NavLink key={t} to={to} end className={cls}>{t}</NavLink>)}
          <a href="/#book" className="btn btn-primary !py-2.5 !min-h-0">Book a Taxi</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={telHref} className="btn btn-primary !px-4 !py-2.5" aria-label="Call Radhe Una Taxi Service"><Phone size={16} aria-hidden="true" />Call</a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-12 w-12 place-items-center rounded border border-slate-300">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="lg:hidden border-t border-slate-200 bg-white">
          <ul className="wrap py-2">
            {links.map(([t, to]) => (
              <li key={t} className="border-b border-slate-100">
                <Link to={to} onClick={() => setOpen(false)} className="block py-3.5 font-semibold text-slate-dark hover:text-deep">
                  {t}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <a href="/#book" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center">
                Book a Taxi
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
