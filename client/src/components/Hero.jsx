import { Phone } from 'lucide-react';
import { getImage } from '../utils/images.js';
import TrustBar from './TrustBar.jsx';
import Photo from './Photo.jsx';
import { telHref } from '../utils/contact.js';
import { BUSINESS } from '../data/business.js';
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Photo name="hero/hero" eager alt="Taxi travelling on a mountain road in Himachal Pradesh" className="absolute inset-0 -z-10 h-full w-full" width="1920" height="1080" />
      {getImage('hero/hero') && <div className="absolute inset-0 -z-10 bg-navy/55" />}
      <div className="wrap py-16 md:py-24 lg:py-32">
        <p className="eyebrow !text-sun">Taxi Service in Una</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] md:text-6xl">Reliable Taxi Service in Una, Himachal Pradesh</h1>
        <p className="mt-5 max-w-xl text-lg text-white/90">Comfortable cabs, experienced drivers and dependable travel for local rides, outstation journeys, airport transfers and Himachal trips.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#book" className="btn btn-primary">Book Your Taxi</a>
          <a href={telHref} className="btn btn-outline"><Phone size={18} aria-hidden="true" />Call Now · {BUSINESS.phoneDisplay}</a>
        </div>
        <TrustBar />
      </div>
    </section>
  );
}
