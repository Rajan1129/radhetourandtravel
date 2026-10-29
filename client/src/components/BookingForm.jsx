import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { serviceTypes } from '../data/services.js';
import { postEnquiry } from '../utils/api.js';
import { waFromEnquiry } from '../utils/contact.js';

const empty = { name: '', phone: '', pickup: '', destination: '', travelDate: '', passengers: '1', serviceType: serviceTypes[0] };
const today = () => new Date().toISOString().slice(0, 10);

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit mobile number.';
  if (f.pickup.trim().length < 2) e.pickup = 'Enter the pickup location.';
  if (f.destination.trim().length < 2) e.destination = 'Enter the destination.';
  if (!f.travelDate) e.travelDate = 'Choose a travel date.'; else if (f.travelDate < today()) e.travelDate = 'Date cannot be in the past.';
  if (!(Number(f.passengers) >= 1 && Number(f.passengers) <= 20)) e.passengers = 'Enter 1 to 20 passengers.';
  return e;
}
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
const featuredToursAfterSubmit = [
  {
    title: 'Shimla Ridge & Hill Station Tour',
    duration: '2 Days / 1 Night',
    image: '/packages/shimla.jpg',
    tag: 'Ridge & Kufri',
    desc: 'Mall Road, Christ Church, Kufri snow viewpoint',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Shimla Tour Package.',
  },
  {
    title: 'Manali & Solang Valley Holiday',
    duration: '3 Days / 2 Nights',
    image: '/packages/manali.jpg',
    tag: 'Snow Peaks',
    desc: 'Solang Valley adventure, Hadimba temple & Atal Tunnel',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Manali Holiday Package.',
  },
  {
    title: 'Kasol & Manikaran Parvati Valley',
    duration: '2 Days / 1 Night',
    image: '/packages/kasol.jpg',
    tag: 'Riverside',
    desc: 'Parvati river cafes, Gurudwara hot springs',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Kasol Tour Package.',
  },
  {
    title: 'Himachal 2 Dham Yatra (Chintpurni + Jwalaji)',
    duration: '1 Full Day',
    image: '/packages/2_dham.jpg',
    tag: 'Sacred Yatra',
    desc: 'VIP darshan of Maa Chintpurni & Maa Jwalaji',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the 2 Dham Yatra Package.',
  },
];

export default function BookingForm() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const props = (k) => ({ id: k, value: f[k], onChange: set(k), className: 'field', 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  async function submit(e) {
    e.preventDefault();
    const v = validate(f); setErrors(v);
    if (Object.keys(v).length) return;
    setStatus('loading'); setMsg('');
    try { await postEnquiry({ ...f, passengers: Number(f.passengers) }); setStatus('success'); }
    catch (err) { setStatus('error'); setMsg(err.message || 'Something went wrong.'); }
  }

  if (status === 'success') return (
    <div role="status" className="space-y-6">
      <div className="p-5 md:p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm">
            <CheckCircle2 size={26} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-extrabold text-navy">
              Booking Enquiry Received!
            </h3>
            <p className="mt-1.5 text-slate-700 text-sm md:text-base leading-relaxed">
              Thank you, <b className="text-navy">{f.name || 'valued customer'}</b>! We received your journey details from <b>{f.pickup}</b> to <b>{f.destination}</b> on <b>{f.travelDate}</b>. Our team will contact you on <b className="text-navy">{f.phone}</b> shortly with our best quote.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href={waFromEnquiry(f)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !py-2.5 !px-4 text-xs font-bold rounded-xl shadow-sm">
                Confirm on WhatsApp (Faster Reply)
              </a>
              <a href="#packages" className="btn btn-primary !py-2.5 !px-4 text-xs font-bold rounded-xl">
                Explore Packages Below &darr;
              </a>
              <button className="btn btn-outline-dark !py-2.5 !px-4 text-xs font-bold rounded-xl" onClick={() => { setF(empty); setStatus('idle'); }}>
                New Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tour Packages after submission */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-dark bg-sky/10 px-2.5 py-0.5 rounded-full">
              Recommended Himachal Tours
            </span>
            <h4 className="text-lg md:text-xl font-extrabold text-navy mt-1">
              Popular Holiday &amp; Yatra Packages from Una
            </h4>
          </div>
          <a href="/packages" className="text-xs font-bold text-sky-dark hover:text-navy hover:underline shrink-0 flex items-center gap-1">
            <span>View All 11+ Packages</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* 2-column grid so photos are large, clear, and attractive */}
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredToursAfterSubmit.map((tour) => (
            <div
              key={tour.title}
              className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/packages/shimla.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 left-2.5 bg-sun text-navy font-black text-[10px] px-2 py-0.5 rounded-md shadow uppercase tracking-wider">
                    {tour.tag}
                  </span>
                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <span className="text-xs font-bold drop-shadow">{tour.duration}</span>
                  </div>
                </div>
                <div className="p-3.5">
                  <h5 className="font-bold text-navy text-sm line-clamp-1 group-hover:text-sky-dark transition-colors">
                    {tour.title}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{tour.desc}</p>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <a
                  href={`https://wa.me/916230468560?text=${encodeURIComponent(tour.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa w-full !py-2 text-xs font-bold rounded-xl justify-center shadow-sm"
                >
                  Book on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Taxi quote enquiry">
      <Field id="name" label="Your Name" error={errors.name}><input {...props('name')} autoComplete="name" /></Field>
      <Field id="phone" label="Mobile Number" error={errors.phone}><input {...props('phone')} type="tel" inputMode="tel" autoComplete="tel" /></Field>
      <Field id="serviceType" label="Service Type"><select {...props('serviceType')}>{serviceTypes.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <Field id="pickup" label="Pickup Location" error={errors.pickup}><input {...props('pickup')} placeholder="e.g. Una railway station" /></Field>
      <Field id="destination" label="Destination" error={errors.destination}><input {...props('destination')} placeholder="e.g. Chandigarh" /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field id="travelDate" label="Travel Date" error={errors.travelDate}><input {...props('travelDate')} type="date" min={today()} /></Field>
        <Field id="passengers" label="Passengers" error={errors.passengers}><input {...props('passengers')} type="number" min="1" max="20" inputMode="numeric" /></Field>
      </div>
      <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'loading'} className="btn btn-primary sm:min-w-[220px] disabled:opacity-70">
          {status === 'loading' ? <><Loader2 className="animate-spin" size={18} aria-hidden="true" />Sending…</> : 'Get Taxi Quote'}
        </button>
        <a href={waFromEnquiry(f)} onClick={(e) => { const v = validate(f); if (Object.keys(v).length) { e.preventDefault(); setErrors(v); } }} target="_blank" rel="noopener noreferrer" className="btn btn-wa">Book on WhatsApp</a>
        {status === 'error' && <p role="alert" className="text-sm font-semibold text-red-700">{msg} Please call +91 62304 68560 or use WhatsApp.</p>}
      </div>
    </form>
  );
}
