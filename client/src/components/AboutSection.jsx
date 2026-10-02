import { Link } from 'react-router-dom';
import Photo from './Photo.jsx';
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-h" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <Photo name="about/about" alt="Radhe Una Taxi Service cab in Una, Himachal Pradesh" tone="light" className="aspect-[4/3] w-full" width="1200" height="900" />
        <div>
          <p className="eyebrow">About us</p>
          <h2 id="about-h" className="mt-2 text-3xl md:text-4xl">Local Drivers. Reliable Journeys.</h2>
          <p className="mt-5 text-lg text-slate-dark">Radhe Una Taxi Service provides dependable taxi transportation from Una, Himachal Pradesh for local travel, outstation journeys, airport transfers, railway station pickups and trips across Himachal Pradesh.</p>
          <p className="mt-4 text-slate-dark">Our office is on Railway Station Road, Adarsh Nagar, so we are easy to find and easy to reach. Read more about our <Link className="font-semibold text-sky-dark underline" to="/taxi-service-in-una">taxi service in Una</Link> or see our <Link className="font-semibold text-sky-dark underline" to="/outstation-taxi-una">outstation taxi from Una</Link>.</p>
        </div>
      </div>
    </section>
  );
}
