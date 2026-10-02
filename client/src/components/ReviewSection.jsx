import { Star } from 'lucide-react';
import { reviews } from '../data/reviews.js';
import { CONFIG } from '../config.js';
export default function ReviewSection() {
  return (
    <section aria-labelledby="rev-h" className="bg-mist py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">Customer reviews</p>
          <h2 id="rev-h" className="mt-2 text-3xl md:text-4xl">Trusted by Our Customers</h2>
          <p className="mt-6 text-6xl font-extrabold text-deep">5.0</p>
          <p className="flex gap-0.5 text-sun" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <Star key={i} fill="currentColor" size={20} aria-hidden="true" />)}</p>
          <p className="mt-1 font-semibold">Based on 16 Google Reviews</p>
          {CONFIG.reviewUrl
            ? <a href={CONFIG.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6">View on Google</a>
            : <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6">View on Google</a>}
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <li key={r} className="border-l-4 border-sky bg-white p-6">
              <blockquote className="text-lg font-semibold">“{r}”</blockquote>
              <p className="mt-3 text-sm text-slate-dark">Google customer review</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
