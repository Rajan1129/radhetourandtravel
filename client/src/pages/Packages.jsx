import { useState, useEffect } from 'react';
import SEOHead from '../seo/SEOHead.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import PackageCard from '../components/PackageCard.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import QuickBooking from '../components/QuickBooking.jsx';
import { getPackages } from '../utils/api.js';
import { defaultPackages } from '../data/packagesData.js';
import { Sparkles, Compass } from 'lucide-react';

const CATEGORIES = [
  'All Packages',
  'Pilgrimage Yatra',
  'Hill Station Tour',
  'Temple Special',
  'Adventure & Trekking',
];

export default function Packages() {
  // Initialize with complete default packages so they appear immediately without delay
  const [packages, setPackages] = useState(defaultPackages);
  const [selectedCat, setSelectedCat] = useState('All Packages');

  useEffect(() => {
    async function loadApiPackages() {
      try {
        const res = await getPackages();
        if (res && res.items && res.items.length > 0) {
          // Merge API packages with fallback default image if API package lacks image
          const formatted = res.items.map((item) => {
            if (!item.image) {
              const matched = defaultPackages.find((d) => d.slug === item.slug);
              return matched ? { ...item, image: matched.image } : item;
            }
            return item;
          });
          setPackages(formatted);
        }
      } catch (err) {
        // Fallback to defaultPackages already set
      }
    }
    loadApiPackages();
  }, []);

  const filtered = selectedCat === 'All Packages'
    ? packages
    : packages.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const sel = selectedCat.toLowerCase();
        if (sel.includes('pilgrimage') && cat.includes('pilgrimage')) return true;
        if (sel.includes('hill') && cat.includes('hill')) return true;
        if (sel.includes('temple') && cat.includes('temple')) return true;
        if (sel.includes('adventure') && (cat.includes('adventure') || cat.includes('trekking'))) return true;
        return cat.includes(sel);
      });

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/packages' },
  ];

  return (
    <>
      <SEOHead
        title="Tour Packages from Una Himachal Pradesh | Shimla, Manali, 2 Dham & 4 Dham Devi Yatra"
        description="Book customized taxi tour packages from Una: Shimla, Manali, Kasol, Dharamshala, Chintpurni, Jwalaji, Naina Devi, 2 Dham & 4 Dham Devi Darshan. Clean commercial cabs & experienced hill drivers."
        keywords="himachal tour packages from una, devi yatra una, chintpurni jwalaji 2 dham taxi package, shimla manali taxi package una, 4 dham himachal cab"
        path="/packages"
      />

      <div className="bg-navy py-12 text-white border-b border-navy-light">
        <div className="wrap">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <div className="mt-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sun bg-sun/10 px-3 py-1 rounded">
              <Sparkles size={14} /> Customized Travel &amp; Yatra
            </span>
            <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
              Himachal Tour Packages &amp; Pilgrimage Yatra
            </h1>
            <p className="mt-4 text-base text-white/80 leading-relaxed md:text-lg">
              Affordable, reliable private cab packages departing from Una Railway Station or anywhere in Una. Complete temple darshans (Maa Chintpurni, Jwalaji, Naina Devi, Kangra, Baglamukhi) and holiday getaways (Shimla, Manali, Kasol, Dharamshala) with local mountain experts.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-mist/60 py-6 border-b border-slate-200 sticky top-16 lg:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="wrap flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-navy/40 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="wrap py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <Compass size={22} className="text-sky" />
              <span>{selectedCat}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filtered.length} curated {filtered.length === 1 ? 'package' : 'packages'} with transparent fares
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200 rounded-lg">
            <p className="text-lg font-bold text-navy">No packages found in this category</p>
            <p className="text-sm text-slate-500 mt-1">Try selecting "All Packages" or contact us directly for custom itineraries.</p>
            <button
              onClick={() => setSelectedCat('All Packages')}
              className="mt-4 btn btn-primary text-xs"
            >
              View All Packages
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <PackageCard key={pkg._id || pkg.slug} pkg={pkg} />
            ))}
          </div>
        )}

        <div className="mt-16 bg-navy text-white p-8 md:p-10 rounded-2xl shadow-md grid gap-6 md:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sun">Custom Travel Plans</span>
            <h3 className="mt-1 text-2xl md:text-3xl font-bold">
              Looking for a Custom Route or Family Yatra?
            </h3>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              We design personalized itineraries covering 2 Dham, 3 Dham, 5 Devi Darshan, Kinnaur, Spiti Valley, or multi-day family vacations across Himachal, Punjab, and Chandigarh.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href="https://wa.me/916230468560?text=Hello%20Radhe%20Una%20Taxi%20Service%2C%20I%20need%20a%20customized%20tour%20package%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary justify-center !py-3 text-sm"
            >
              Request Custom Quote
            </a>
          </div>
        </div>
      </main>

      <QuickBooking />
      <ContactCTA heading="Have Questions About Our Tour Packages?" />
    </>
  );
}
