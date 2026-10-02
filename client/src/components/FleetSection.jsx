import { Check, Phone, ArrowUpRight } from 'lucide-react';
import Photo from './Photo.jsx';
import { telHref } from '../utils/contact.js';

const cabs = [
  {
    name: 'Sedan (Dzire / Etios)',
    tag: 'Budget & Business',
    photo: 'fleet/sedan_dzire',
    passengers: 'Up to 4 Passengers',
    luggage: '2 Large + 2 Small Bags',
    ideal: 'Local city rides, station transfers, Chandigarh hospital & airport drops',
    features: ['Fully Air-Conditioned', 'Comfortable Legroom', 'Clean & Sanitized Daily', 'Music System & Mobile Charger'],
  },
  {
    name: 'SUV (Toyota Innova Crysta)',
    tag: 'Family & Hill Tours',
    photo: 'fleet/innova_suv',
    passengers: '6 to 7 Passengers',
    luggage: 'Roof Carrier + Spacious Boot',
    ideal: 'Dharamshala, Shimla, Manali tours, family trips, heavy luggage',
    features: ['Powerful Dual AC', 'Smooth Hill Suspension', 'Ample Luggage Carrier', 'Reclining Captain Seats'],
  },
  {
    name: 'Tempo Traveller',
    tag: 'Group & Pilgrimage',
    photo: 'fleet/tempo_traveller',
    passengers: '12 to 17 Passengers',
    luggage: 'High-Capacity Roof Carrier',
    ideal: 'Chintpurni, Jwalaji Devi yatra, weddings, school/college groups',
    features: ['Push-back Reclining Seats', 'High Roof Airy Cabin', 'Ample Legroom', 'Experienced Hill Driver'],
  },
];

export default function FleetSection() {
  return (
    <section id="fleet" aria-labelledby="fleet-h" className="py-16 md:py-24 bg-mist scroll-mt-20">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow">Our Vehicles</p>
            <h2 id="fleet-h" className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Clean, Modern Taxis in Una
            </h2>
            <p className="mt-3 text-slate-dark max-w-2xl">
              Choose from our verified fleet of well-maintained commercial cabs. Every car is clean, fully insured, air-conditioned, and driven by an experienced local driver.
            </p>
          </div>
          <a href="#book" className="btn btn-primary shrink-0 self-start md:self-auto">
            Book Your Preferred Cab
          </a>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cabs.map((c) => (
            <div
              key={c.name}
              className="border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <Photo
                    name={c.photo}
                    alt={c.name}
                    className="h-60 w-full object-cover"
                    width="600"
                    height="450"
                  />
                  <span className="absolute top-3 right-3 bg-navy/90 text-sun text-xs font-extrabold px-2.5 py-1 rounded">
                    {c.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy">{c.name}</h3>
                  <p className="mt-2 text-xs font-semibold text-sky-dark">
                    {c.passengers} · {c.luggage}
                  </p>
                  <p className="mt-2 text-sm text-slate-dark leading-relaxed">
                    <b>Best for:</b> {c.ideal}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-dark mb-2">Key Features:</p>
                    <ul className="space-y-1.5 text-xs text-slate-dark">
                      {c.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <a href="#book" className="btn btn-outline-dark flex-1 justify-center !py-2 text-xs">
                  Get Quote <ArrowUpRight size={14} />
                </a>
                <a href={telHref} className="btn btn-primary !py-2 !px-3 text-xs" title="Call directly">
                  <Phone size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
