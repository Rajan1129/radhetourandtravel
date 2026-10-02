import { UserCheck, SprayCan, Clock, BadgeIndianRupee, MapPinned, MousePointerClick } from 'lucide-react';
import Reveal from './Reveal.jsx';
const items = [
  [UserCheck, 'Experienced Drivers', 'Drivers who are comfortable on city, highway and hill roads.'],
  [SprayCan, 'Clean & Comfortable Cabs', 'Customers regularly mention neat, clean cabs in their reviews.'],
  [Clock, 'On-Time Pickup', 'Tell us your train or flight time and we plan around it.'],
  [BadgeIndianRupee, 'Transparent Pricing', 'Your fare is explained and confirmed before you book.'],
  [MapPinned, 'Local Route Knowledge', 'Based in Una, we know the roads towards Himachal and Punjab.'],
  [MousePointerClick, 'Easy Booking', 'Call, WhatsApp or send the form. No app or sign-up needed.'],
];
export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-h" className="py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div><p className="eyebrow">Why Radhe Una Taxi</p><h2 id="why-h" className="mt-2 text-3xl md:text-4xl">Travel With Confidence</h2></div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {items.map(([I, t, d]) => (
            <Reveal as="li" key={t} className="flex gap-4"><I className="mt-1 shrink-0 text-sky-dark" size={28} aria-hidden="true" /><div><h3 className="text-lg">{t}</h3><p className="mt-1 text-slate-dark">{d}</p></div></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
