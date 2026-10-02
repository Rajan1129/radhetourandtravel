import { Link } from 'react-router-dom';
import { getImage } from '../utils/images.js';
import Photo from './Photo.jsx';
export default function TravelSection() {
  return (
    <section aria-labelledby="hima-h" className="relative isolate overflow-hidden bg-deep text-white">
      <Photo name="himachal/himachal" alt="Scenic mountain valley in Himachal Pradesh" className="absolute inset-0 -z-10 h-full w-full" width="1920" height="1000" />
      {getImage('himachal/himachal') && <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />}
      <div className="wrap py-24 md:py-36">
        <p className="eyebrow !text-sun">Himachal Pradesh</p>
        <h2 id="hima-h" className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">Your Journey Into Himachal Starts From Una</h2>
        <p className="mt-5 max-w-xl text-lg text-white/90">From local rides in Una to scenic journeys across Himachal Pradesh, Radhe Una Taxi Service helps you travel comfortably with dependable local drivers and well-maintained cabs.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#book" className="btn btn-primary">Plan Your Trip</a>
          <Link to="/una-to-dharamshala-taxi" className="btn btn-outline">Una to Dharamshala taxi</Link>
        </div>
      </div>
    </section>
  );
}
