import { routes } from '../data/routes.js';
import RouteCard from './RouteCard.jsx';
export default function RouteSection() {
  return (
    <section id="routes" aria-labelledby="routes-h" className="scroll-mt-20 bg-mist py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Outstation routes</p>
        <h2 id="routes-h" className="mt-2 text-3xl md:text-4xl">Popular Taxi Routes from Una</h2>
        <p className="mt-3 max-w-2xl text-slate-dark">Fares depend on the vehicle, date and waiting time. Open a route and send your details to get a quote before you book.</p>
        <ul className="mt-8 border-t border-slate-300">{routes.map((r, i) => <RouteCard key={r.slug} r={r} i={i} />)}</ul>
      </div>
    </section>
  );
}
