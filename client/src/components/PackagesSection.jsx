import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, MapPin, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import PackageCard from './PackageCard.jsx';
import { getPackages } from '../utils/api.js';
import { defaultPackages } from '../data/packagesData.js';
import { telHref, waLink } from '../utils/contact.js';

export default function PackagesSection() {
  const [packages, setPackages] = useState(defaultPackages);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await getPackages();
        if (res && res.items && res.items.length > 0) {
          const formatted = res.items.map((item) => {
            if (!item.image) {
              const matched = defaultPackages.find((d) => d.slug === item.slug);
              return matched ? { ...item, image: matched.image } : item;
            }
            return item;
          });
          setPackages(formatted);
        }
      } catch (e) {
        // Fallback to defaultPackages already set
      }
    }
    loadPackages();
  }, []);

  // Filter packages based on active tab
  const displayedPackages = packages.filter((pkg) => {
    if (activeTab === 'all') return true;
    const cat = (pkg.category || '').toLowerCase();
    if (activeTab === 'hills') {
      return cat.includes('hill') || cat.includes('adventure') || cat.includes('trekking');
    }
    if (activeTab === 'yatra') {
      return cat.includes('pilgrimage') || cat.includes('temple');
    }
    return true;
  }).slice(0, 6);

  return (
    <section id="packages" aria-labelledby="packages-h" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
      <div className="wrap">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky/10 text-sky-dark text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-sky" />
              <span>Himachal Tour &amp; Yatra Packages</span>
            </div>
            <h2 id="packages-h" className="text-3xl font-extrabold text-navy md:text-4xl">
              Popular Holiday &amp; Devi Yatra Packages from Una
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl text-base leading-relaxed">
              Experience the Queen of Hills <b>Shimla (Ridge &amp; Mall Road)</b>, the snowy heights of <b>Manali &amp; Solang Valley</b>, serene <b>Kasol</b>, and sacred <b>Himachal 2 Dham &amp; 4 Dham Shaktipeeth yatras</b> with private sanitized cabs and experienced mountain drivers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/packages" className="btn btn-primary inline-flex items-center gap-2 !py-2.5">
              <span>View All 11+ Packages</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-navy/40 hover:bg-slate-50'
            }`}
          >
            All Featured Packages
          </button>
          <button
            onClick={() => setActiveTab('hills')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'hills'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-navy/40 hover:bg-slate-50'
            }`}
          >
            Hill Stations (Shimla, Manali, Kasol, Dharamshala)
          </button>
          <button
            onClick={() => setActiveTab('yatra')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'yatra'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-navy/40 hover:bg-slate-50'
            }`}
          >
            Sacred Pilgrimages (Chintpurni, Jwalaji, 2 &amp; 4 Dham)
          </button>
        </div>

        {/* Packages Cards Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPackages.map((pkg) => (
            <PackageCard key={pkg._id || pkg.slug} pkg={pkg} />
          ))}
        </div>

        {/* Bottom Highlights & Custom Plan Banner */}
        <div className="mt-14 bg-navy text-white rounded-2xl p-6 md:p-10 shadow-lg border border-navy-light flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sun flex items-center gap-1.5 mb-1">
              <ShieldCheck size={16} className="text-sun" /> 100% Customized Travel Assistance
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Planning a Custom Family Holiday or Multi-Devi Yatra?
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              We arrange customized itineraries starting directly from Una Railway Station, Nangal, or your doorstep. Choose your preferred Sedan, Innova Crysta, or Tempo Traveller with verified local drivers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={waLink('Hello Radhe Una Taxi Service, I want to plan a custom tour package from Una. Please share details and taxi rates.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center justify-center gap-2 !bg-[#128C4A] hover:!bg-[#0e703b] !text-white border-none !py-3 text-xs font-bold"
            >
              <MessageCircle size={16} /> WhatsApp Custom Quote
            </a>
            <a
              href={telHref}
              className="btn btn-outline inline-flex items-center justify-center gap-2 !py-3 text-xs font-bold !border-white/30 text-white hover:!bg-white hover:!text-navy"
            >
              <Phone size={16} /> Call +91 62304 68560
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
