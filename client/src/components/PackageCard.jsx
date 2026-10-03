import { Clock, MapPin, Check, Phone, MessageCircle } from 'lucide-react';
import { telHref, waLink } from '../utils/contact.js';

export default function PackageCard({ pkg }) {
  const waMessage = `Hello Radhe Una Taxi Service, I am interested in booking the "${pkg.title}" (${pkg.duration}). Please share fare and cab availability.`;
  const defaultImg = pkg.category.includes('Pilgrimage') || pkg.category.includes('Temple')
    ? '/assets/pilgrimage.jpg'
    : '/assets/himachal.jpg';

  const imgSrc = pkg.image || defaultImg;

  return (
    <div className="border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={imgSrc}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <span className="absolute top-3 left-3 bg-navy/95 text-sun text-xs font-extrabold px-3 py-1 rounded shadow">
            {pkg.category}
          </span>
          {pkg.startingPrice && (
            <span className="absolute bottom-3 right-3 bg-white/95 text-navy font-black text-sm px-3 py-1 rounded shadow">
              {pkg.startingPrice}
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Clock size={14} className="text-sky shrink-0" />
            <span>{pkg.duration}</span>
            <span>•</span>
            <MapPin size={14} className="text-sky shrink-0" />
            <span className="truncate">{pkg.pickupLocation || 'Una Station / Town'}</span>
          </div>

          <h3 className="text-xl font-bold text-navy group-hover:text-sky-dark transition-colors line-clamp-2">
            {pkg.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {pkg.description}
          </p>

          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tour Highlights:</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {pkg.highlights.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-2">
        <a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-dark flex-1 justify-center !py-2.5 text-xs !bg-[#128C4A] !text-white !border-[#128C4A] hover:!bg-[#0e703b]"
        >
          <MessageCircle size={15} /> Book on WhatsApp
        </a>
        <a
          href={telHref}
          className="btn btn-outline-dark justify-center !py-2.5 text-xs px-3 hover:bg-navy hover:text-white"
          title="Call Now"
        >
          <Phone size={15} />
        </a>
      </div>
    </div>
  );
}
