import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { telHref, waLink } from '../utils/contact.js';
import { CONFIG } from '../config.js';
import BookingForm from './BookingForm.jsx';
export default function QuickBooking() {
  return (
    <section id="book" aria-labelledby="book-h" className="scroll-mt-20 bg-mist">
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <p className="eyebrow">Quick booking</p>
            <h2 id="book-h" className="mt-2 text-3xl">Book a taxi in Una</h2>
            <p className="mt-3 text-slate-dark">Send your trip details and we'll confirm availability and the fare. Prefer to talk? Reach us directly.</p>
            <div className="mt-5 flex flex-col gap-2 text-sm font-bold">
              <a href={telHref} className="flex items-center gap-2 text-deep hover:text-sky-dark"><Phone size={17} aria-hidden="true" />+91 62304 68560</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-deep hover:text-sky-dark"><MessageCircle size={17} aria-hidden="true" />WhatsApp us</a>
              <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-deep hover:text-sky-dark"><MapPin size={17} aria-hidden="true" />Get directions</a>
            </div>
          </div>
          <div className="border border-slate-200 bg-white p-5 md:p-7 shadow-sm"><BookingForm /></div>
        </div>
      </div>
    </section>
  );
}
