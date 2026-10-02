import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon.jsx';
export default function ServiceCard({ s }) {
  return (
    <div className="p-7">
      <Icon name={s.icon} size={26} className="text-sky-dark" />
      <h3 className="mt-3 text-lg">{s.title}</h3>
      <p className="mt-2 text-slate-dark">{s.short}</p>
      <Link to={s.to} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-deep hover:text-sky-dark">Get a quote <ArrowRight size={15} aria-hidden="true" /><span className="sr-only"> for {s.title}</span></Link>
    </div>
  );
}
