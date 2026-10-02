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
    <div role="status" className="border border-sky/40 bg-mist p-6 md:p-8">
      <CheckCircle2 className="text-sky-dark" size={32} aria-hidden="true" />
      <h3 className="mt-3 text-2xl">Your enquiry has been received.</h3>
      <p className="mt-1 text-slate-dark">We'll contact you shortly on {f.phone}. For a faster reply, send the same details on WhatsApp.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={waFromEnquiry(f)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">Continue on WhatsApp</a>
        <button className="btn btn-outline-dark" onClick={() => { setF(empty); setStatus('idle'); }}>New enquiry</button>
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
