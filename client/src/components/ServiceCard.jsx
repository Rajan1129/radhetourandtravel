import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';

export default function ServiceCard({ s, photo }) {
  return (
    <div className="p-7 flex flex-col justify-between h-full">
      <div>
        {photo && (
          <div className="mb-4 overflow-hidden rounded border border-slate-200">
            <Photo name={photo} alt={s.title} className="h-44 w-full object-cover" width="400" height="250" />
          </div>
        )}
        <Icon name={s.icon} size={26} className="text-sky-dark" />
        <h3 className="mt-3 text-lg font-bold text-navy">{s.title}</h3>
        <p className="mt-2 text-slate-dark text-sm">{s.short}</p>
      </div>
      <Link to={s.to} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-deep hover:text-sky-dark">
        Get a quote <ArrowRight size={15} aria-hidden="true" /><span className="sr-only"> for {s.title}</span>
      </Link>
    </div>
  );
}
