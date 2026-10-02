import { MapPin } from 'lucide-react';
import { addressLines, BUSINESS } from '../data/business.js';
import { CONFIG } from '../config.js';
import CallButton from './CallButton.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
export default function ContactCTA({ heading = 'Need a Taxi From Una?' }) {
  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 bg-deep py-16 text-white md:py-20">
      <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 id="contact-h" className="text-3xl md:text-4xl">{heading}</h2>
          <p className="mt-3 max-w-xl text-lg text-white/85">Call us for local rides, outstation travel, airport transfers and Himachal trips.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <WhatsAppButton />
            <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MapPin size={18} aria-hidden="true" />Get Directions</a>
          </div>
        </div>
        <address className="not-italic border-l-2 border-sky pl-6 text-white/90">
          <a href={`tel:${BUSINESS.phoneE164}`} className="text-2xl font-extrabold text-white">{BUSINESS.phoneDisplay}</a>
          <p className="mt-3">{addressLines.map((l) => <span key={l} className="block">{l}</span>)}</p>
        </address>
      </div>
    </section>
  );
}
