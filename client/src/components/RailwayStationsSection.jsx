import { Link } from 'react-router-dom';
import { Train, Clock, MapPin, ShieldCheck, Phone, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { telHref, waLink } from '../utils/contact.js';

export default function RailwayStationsSection() {
  const stations = [
    {
      id: 'amb-andaura',
      code: 'AADR',
      name: 'Amb Andaura Railway Station',
      subtitle: 'Terminal for Vande Bharat Express • Gateway to Chintpurni & Kangra',
      image: '/stations/amb-andaura-railway-station.jpg',
      badge: 'Vande Bharat Terminal (AADR)',
      tagColor: 'bg-sun text-navy',
      pageLink: '/taxi-service-amb-andaura',
      linkText: 'Amb Andaura Taxi Guide',
      trains: 'Vande Bharat Express (22447/22448), Jan Shatabdi Express, Himachal Express, Daulatpur Chowk Sabarmati Express',
      locationInfo: 'Located in Amb, Una district. Prime railhead for Chintpurni Dham (20 km / 25 min), Jwalaji (45 km), and Kangra Valley.',
      highlights: [
        'Dedicated meet & greet at the station parking / main portico exit',
        'Direct temple yatra taxis: Mata Chintpurni, Jwalaji, Baglamukhi & Kangra Devi',
        'Live train tracking — your driver waits even if the train arrives delayed',
        'Spacious boots for family luggage + roof carriers on Innova and Tempo Travellers',
      ],
      popularDrops: ['Mata Chintpurni (20 km)', 'Jwalaji Ji (45 km)', 'Dharamshala (95 km)', 'Gagret Industrial Area (15 km)'],
      waMessage: 'Hello Radhe Una Taxi Service, I am arriving at Amb Andaura Railway Station and need a taxi.',
    },
    {
      id: 'una-himachal',
      code: 'UHL',
      name: 'Una Himachal Railway Station',
      subtitle: 'Main Railhead of Una • Office Just 2 Mins on Station Road',
      image: '/stations/una-railway-station.jpg',
      badge: 'Main Railhead (UHL) • 2 Mins from Office',
      tagColor: 'bg-sky text-white',
      pageLink: '/railway-station-taxi-una',
      linkText: 'Una Station Taxi Guide',
      trains: 'New Delhi Vande Bharat (22447/22448), Jan Shatabdi (12057/12058), Himachal Express (14553/14554), Nanded Express',
      locationInfo: 'Situated in Una city on Railway Station Road, Adarsh Nagar. Our physical taxi booking office is right outside on Station Road.',
      highlights: [
        'Zero waiting time — cabs dispatched in under 2 minutes from Railway Station Road',
        'Early morning 4:00 AM & late-night train pickups guaranteed on advance call',
        'Seamless transfers to Chandigarh Airport, PGIMER, Mohali, Nangal & Hoshiarpur',
        'Clean commercial AC vehicles with polite, verified local mountain drivers',
      ],
      popularDrops: ['Chandigarh Airport (125 km)', 'Mata Chintpurni (55 km)', 'Nangal Dam (18 km)', 'Dharamshala (118 km)'],
      waMessage: 'Hello Radhe Una Taxi Service, I am arriving at Una Himachal Railway Station and need a taxi.',
    },
  ];

  return (
    <section id="railway-stations" aria-labelledby="railway-stations-h" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20">
      <div className="wrap">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep text-sun text-xs font-bold uppercase tracking-wider mb-3">
              <Train size={15} className="text-sun" />
              <span>Vande Bharat &amp; Express Train Taxi Service</span>
            </div>
            <h2 id="railway-stations-h" className="text-3xl font-extrabold text-navy md:text-4xl tracking-tight">
              Una Himachal &amp; Amb Andaura Railway Station Cabs
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl text-base leading-relaxed">
              Arriving in Una district by train? Radhe Una Taxi Service provides guaranteed platform pickups, luggage assistance, and direct onward cabs to Mata Chintpurni Devi, Kangra Valley, Dharamshala, and Chandigarh.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy text-white text-sm font-bold shadow hover:bg-deep transition-all active:scale-[0.98]"
            >
              <Phone size={16} className="text-sun" />
              <span>+91 62304 68560</span>
            </a>
          </div>
        </div>

        {/* 2 Main Featured Station Cards */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {stations.map((st) => (
            <div
              key={st.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Station Photo Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={st.image}
                    alt={`${st.name} actual photo - Radhe Una Taxi`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow backdrop-blur-md ${st.tagColor}`}>
                      {st.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 text-navy text-[11px] font-black uppercase tracking-wider shadow">
                      Station: {st.code}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-sun font-bold mb-1">
                      <MapPin size={14} />
                      <span>Una District, Himachal Pradesh</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold drop-shadow leading-snug">
                      {st.name}
                    </h3>
                  </div>
                </div>

                {/* Station Info Body */}
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {st.subtitle}
                  </p>

                  <div className="p-3.5 bg-mist/60 border border-sky/20 rounded-xl mb-5">
                    <p className="text-xs text-deep font-medium leading-relaxed">
                      <strong className="text-navy font-bold">Key Train Connectivity:</strong> {st.trains}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                    {st.locationInfo}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 mb-6">
                    {st.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Popular Drops Pills */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Frequent Station Drops:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {st.popularDrops.map((drop, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                        >
                          {drop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-6 sm:p-7 pt-0 bg-white">
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href={waLink(st.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Pickup</span>
                  </a>
                  <a
                    href={telHref}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-deep text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <Phone size={16} className="text-sun" />
                    <span>Call to Book</span>
                  </a>
                </div>

                <div className="mt-3 text-center">
                  <Link
                    to={st.pageLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-dark hover:text-navy transition-colors py-1"
                  >
                    <span>Read full {st.linkText}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Bar */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky/10 text-sky-dark flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Live Train Monitoring</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We track train timings so your cab is stationed right outside when your coach arrives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sun/15 text-deep flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Station Road Office</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Located right on Railway Station Road, Adarsh Nagar, Una for instant dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Verified Hill Drivers</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Experienced commercial chauffeurs skilled on mountain twists and ghats.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Train size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Vande Bharat Specialist</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Dedicated seamless pickups for both morning and evening Vande Bharat arrivals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
