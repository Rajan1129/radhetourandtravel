import { Star } from 'lucide-react';
export default function TrustBar() {
  return (
    <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/25 pt-6 text-sm md:grid-cols-4">
      <li><span className="flex gap-0.5 text-sun" aria-hidden="true">{[0,1,2,3,4].map((i) => <Star key={i} size={15} fill="currentColor" />)}</span><b className="mt-1 block">5.0 Google Rating</b></li>
      <li><b className="block text-xl">16+</b>Google Reviews</li>
      <li><b className="block text-xl">Clean &amp; Comfortable</b>Cabs</li>
      <li><b className="block text-xl">Experienced</b>Drivers</li>
    </ul>
  );
}
