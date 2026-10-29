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
    price: '₹4,999',
    duration: '2 Days / 1 Night',
    image: '/packages/shimla.jpg',
    tag: 'Ridge & Kufri',
    desc: 'Mall Road, Christ Church, Kufri snow viewpoint',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Shimla Tour Package.',
  },
  {
    title: 'Manali & Solang Valley Holiday',
    price: '₹7,999',
    duration: '3 Days / 2 Nights',
    image: '/packages/manali.jpg',
    tag: 'Snow Peaks',
    desc: 'Solang Valley adventure, Hadimba temple & Atal Tunnel',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Manali Holiday Package.',
  },
  {
    title: 'Kasol & Manikaran Parvati Valley',
    price: '₹5,999',
    duration: '2 Days / 1 Night',
    image: '/packages/kasol.jpg',
    tag: 'Riverside',
    desc: 'Parvati river cafes, Gurudwara hot springs',
    waText: 'Hello Radhe Una Taxi, I submitted an enquiry and also want to book the Kasol Tour Package.',
  },
  {
    title: 'Himachal 2 Dham Yatra (Chintpurni + Jwalaji)',
    price: '₹3,299',
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
    <div role="status" className="border border-sky/30 bg-slate-50 p-5 md:p-7 rounded-lg">
      <div className="flex items-start gap-3.5">
        <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={28} aria-hidden="true" />
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-navy">Your enquiry has been received!</h3>
          <p className="mt-1 text-slate-600 text-sm">
            We will contact you shortly on <b>{f.phone}</b> with availability and the best fare.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <a href={waFromEnquiry(f)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !py-2 text-xs">
              Continue on WhatsApp (Faster Reply)
            </a>
            <a href="#packages" className="btn btn-primary !py-2 text-xs">
              View Packages Below &darr;
            </a>
            <button className="btn btn-outline-dark !py-2 text-xs" onClick={() => { setF(empty); setStatus('idle'); }}>
              New enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Tour Packages Cards Showcase */}
      <div className="mt-6 pt-5 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-navy font-bold text-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-dark bg-sky/10 px-2.5 py-0.5 rounded">
              Popular Himachal Tours
            </span>
            <span className="hidden sm:inline text-xs text-slate-500">• Top packages from Una</span>
          </div>
          <a href="/packages" className="text-xs font-bold text-sky-dark hover:underline">
            View All 11+ Packages &rarr;
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredToursAfterSubmit.map((tour) => (
            <div key={tour.title} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/packages/shimla.jpg';
                    }}
                  />
                  <span className="absolute bottom-1.5 right-1.5 bg-navy/90 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                    {tour.price}
                  </span>
                  <span className="absolute top-1.5 left-1.5 bg-sun text-navy font-black text-[9px] px-1.5 py-0.5 rounded shadow uppercase">
                    {tour.tag}
                  </span>
                </div>
                <div className="p-2.5">
                  <h4 className="font-bold text-navy text-xs line-clamp-1">{tour.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{tour.duration}</p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{tour.desc}</p>
                </div>
              </div>
              <div className="p-2.5 pt-0">
                <a
                  href={`https://wa.me/916230468560?text=${encodeURIComponent(tour.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-1.5 rounded bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition"
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
