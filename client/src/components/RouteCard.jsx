import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function RouteCard({ r, i }) {
  return (
    <li className="group grid items-center gap-2 border-b border-slate-200 py-5 md:grid-cols-[3rem_1.2fr_2fr_auto] md:gap-6">
      <span className="hidden text-sm font-bold text-sky-dark md:block">{String(i + 1).padStart(2, '0')}</span>
      <h3 className="text-xl"><Link to={`/${r.slug}`} className="hover:text-sky-dark">{r.name} Taxi</Link></h3>
      <p className="text-slate-dark">{r.desc}</p>
      <Link to={`/${r.slug}`} className="btn btn-outline-dark !py-2.5 !min-h-0 justify-self-start">Get Fare <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> for {r.name}</span></Link>
    </li>
  );
}
