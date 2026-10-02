import { Link } from 'react-router-dom';
import { ShieldCheck, Award, MapPin, Phone, MessageCircle, Star, Clock, Car, Check } from 'lucide-react';
import SEOHead from '../seo/SEOHead.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Photo from '../components/Photo.jsx';
import CallButton from '../components/CallButton.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import MapSection from '../components/MapSection.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import { BUSINESS } from '../data/business.js';

export default function About() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      <SEOHead
        title="About Us | Radhe Tour & Travel Taxi Service Una, Himachal Pradesh"
        description="Learn about Radhe Una Taxi Service. Based at Railway Station Road, Una, HP. 5.0 rated on Google with experienced hill drivers and clean commercial cabs."
        keywords="about Radhe Una Taxi Service, Radhe tour and travels Una, taxi owner Una, best taxi service in Una Himachal"
        path="/about"
      />

      {/* Header Banner */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Photo
          name="about/about"
          alt="Radhe Una Taxi Service driver and cab in Una"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width="1920"
          height="800"
        />
        <div className="absolute inset-0 -z-10 bg-navy/80" />
        <div className="wrap py-14 md:py-24">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            About Radhe Tour &amp; Travel Taxi Service Una
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 leading-relaxed">
            Your trusted local travel partner in Una, Himachal Pradesh. Driven by safety, cleanliness, punctual pickups, and true mountain hospitality.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <WhatsAppButton text="Hello Radhe Una Taxi Service, I would like to know more about your services." />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Our Story &amp; Values</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Local Drivers. Reliable Journeys. True Himachali Hospitality.
            </h2>
            <div className="mt-6 space-y-4 text-slate-dark text-lg leading-relaxed">
              <p>
                <b>Radhe Tour &amp; Travel Taxi Service Una</b> was established with a singular focus: to offer residents and visitors in Una district a dependable, transparent, and comfortable taxi service they can rely on 24 hours a day, 7 days a week.
              </p>
              <p>
                Our office is conveniently located at <b>R. H. Hospital, Railway Station Road, Adarsh Nagar, Una</b>, placing us just minutes away from the Una Himachal Railway Station platform and major city hubs.
              </p>
              <p>
                Whether you are boarding the early morning Vande Bharat Express, visiting sacred shrines like Mata Chintpurni and Jwalaji, travelling to Chandigarh for medical appointments, or taking a family holiday to Manali and Dharamshala, our drivers prioritize your safety and comfort at every turn.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
              <div>
                <div className="flex items-center gap-2 text-sun">
                  <Star fill="currentColor" size={22} />
                  <span className="text-2xl font-black text-navy">5.0 / 5.0</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-dark">Google Verified Rating</p>
              </div>
              <div>
                <span className="text-2xl font-black text-navy">16+</span>
                <p className="mt-1 text-sm font-semibold text-slate-dark">5-Star Customer Reviews</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden border border-slate-200 bg-mist p-6 shadow-sm">
              <Photo
                name="about/about"
                alt="Radhe Una Taxi Service in Una Himachal"
                className="aspect-[4/3] w-full rounded object-cover shadow"
                width="800"
                height="600"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-dark">
                <span>Verified Commercial Cab</span>
                <span className="font-semibold text-deep">Una, Himachal Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="bg-mist py-16 md:py-24 border-y border-slate-200">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Our Well-Maintained Cabs</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Meet Our Taxi Fleet
            </h2>
            <p className="mt-3 text-slate-dark">
              Every vehicle in our fleet is commercially registered, regularly sanitized, and equipped with air-conditioning and spacious boot room for luggage.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Sedan */}
            <div className="border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <Photo
                name="fleet/sedan_dzire"
                alt="Maruti Dzire taxi cab Una"
                className="h-56 w-full object-cover"
                width="600"
                height="450"
              />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-dark">Local &amp; Outstation</span>
                <h3 className="mt-1 text-xl font-bold text-navy">Maruti Dzire / Etios</h3>
                <p className="mt-2 text-sm text-slate-dark">
                  Comfortable AC sedan ideal for couples, small families, station pickups, and business trips to Chandigarh.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-dark border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Up to 4 Passengers</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 2 Large Bags Boot Space</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Air Conditioned &amp; Clean Interior</li>
                </ul>
                <a href="#book" className="btn btn-outline-dark w-full mt-6 justify-center !py-2">Book Sedan</a>
              </div>
            </div>

            {/* SUV */}
            <div className="border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <Photo
                name="fleet/innova_suv"
                alt="Toyota Innova SUV taxi cab Una"
                className="h-56 w-full object-cover"
                width="600"
                height="450"
              />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-dark">Family &amp; Hill Tours</span>
                <h3 className="mt-1 text-xl font-bold text-navy">Toyota Innova Crysta</h3>
                <p className="mt-2 text-sm text-slate-dark">
                  Spacious luxury SUV built for mountain climbs, Dharamshala, Shimla, Manali tours, and heavy luggage.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-dark border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 6 to 7 Passengers</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Roof Carrier + Large Boot</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Powerful AC &amp; Hill Suspension</li>
                </ul>
                <a href="#book" className="btn btn-outline-dark w-full mt-6 justify-center !py-2">Book SUV</a>
              </div>
            </div>

            {/* Tempo Traveller */}
            <div className="border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <Photo
                name="fleet/tempo_traveller"
                alt="Tempo Traveller group van Una"
                className="h-56 w-full object-cover"
                width="600"
                height="450"
              />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-dark">Group &amp; Pilgrimage</span>
                <h3 className="mt-1 text-xl font-bold text-navy">Force Tempo Traveller</h3>
                <p className="mt-2 text-sm text-slate-dark">
                  Ideal for extended families, wedding parties, and pilgrimage circuits to Chintpurni, Jwalaji, and Baglamukhi.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-dark border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 12 to 17 Passengers</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> High-Capacity Luggage Carrier</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Pushback Reclining Seats</li>
                </ul>
                <a href="#book" className="btn btn-outline-dark w-full mt-6 justify-center !py-2">Book Traveller</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us 4-column */}
      <section className="py-16 md:py-24 bg-white">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Our Service Guarantee</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Why Travellers Prefer Radhe Una Taxi
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-slate-200 p-6">
              <Clock className="text-sky-dark" size={32} />
              <h3 className="mt-4 text-lg font-bold text-navy">24/7 Available</h3>
              <p className="mt-2 text-sm text-slate-dark">
                Late night train arrivals or early morning flights, our cabs are ready when you need them.
              </p>
            </div>

            <div className="border border-slate-200 p-6">
              <ShieldCheck className="text-sky-dark" size={32} />
              <h3 className="mt-4 text-lg font-bold text-navy">Expert Mountain Drivers</h3>
              <p className="mt-2 text-sm text-slate-dark">
                Drivers seasoned on Himachal curves, highway stretches, and fog weather safety.
              </p>
            </div>

            <div className="border border-slate-200 p-6">
              <Award className="text-sky-dark" size={32} />
              <h3 className="mt-4 text-lg font-bold text-navy">Transparent Pricing</h3>
              <p className="mt-2 text-sm text-slate-dark">
                Clear quotes agreed in advance. No hidden driver charges, sudden surges, or surprises.
              </p>
            </div>

            <div className="border border-slate-200 p-6">
              <MapPin className="text-sky-dark" size={32} />
              <h3 className="mt-4 text-lg font-bold text-navy">Station &amp; Doorstep Pickup</h3>
              <p className="mt-2 text-sm text-slate-dark">
                Direct platform exit pickup at Una station, or prompt pickup at your home address.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactCTA heading="Ready to Book Your Ride in Una?" />
    </>
  );
}
