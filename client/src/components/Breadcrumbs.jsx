import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/80">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {i === items.length - 1 ? <span aria-current="page" className="font-semibold text-white">{it.name}</span> : <Link to={it.path} className="hover:text-white underline-offset-2 hover:underline">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
