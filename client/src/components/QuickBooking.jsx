import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { telHref, waLink } from '../utils/contact.js';
import { CONFIG } from '../config.js';
import BookingForm from './BookingForm.jsx';
export default function QuickBooking() {
  return (
    <section id="book" aria-labelledby="book-h" className="scroll-mt-20 bg-mist/60 py-12 md:py-16">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr] items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Instant Cab Booking</span>
            <h2 id="book-h" className="mt-2 text-3xl md:text-4xl font-extrabold text-navy">
              Book a Taxi in Una
            </h2>
            <p className="mt-3 text-slate-dark text-base leading-relaxed">
              Transparent fares, verified local mountain drivers, and clean AC commercial cabs. Share your journey details and get an instant quote.
            </p>

            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <a href={telHref} className="flex items-center gap-3 text-deep hover:text-sky-dark font-bold group">
                <div className="w-10 h-10 rounded-xl bg-sky/10 flex items-center justify-center text-sky-dark group-hover:bg-sky group-hover:text-white transition">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Direct Hotline</p>
                  <p className="text-sm font-bold text-navy">+91 62304 68560</p>
                </div>
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-deep hover:text-sky-dark font-bold group">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">WhatsApp 24/7</p>
                  <p className="text-sm font-bold text-navy">Chat &amp; Instant Booking</p>
                </div>
              </a>
              <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-deep hover:text-sky-dark font-bold group">
                <div className="w-10 h-10 rounded-xl bg-sun/20 flex items-center justify-center text-navy group-hover:bg-sun transition">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Office Location</p>
                  <p className="text-xs font-bold text-navy line-clamp-1">Railway Station Rd, Adarsh Nagar, Una</p>
                </div>
              </a>
            </div>
          </div>

          <div className="border border-slate-200/80 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
