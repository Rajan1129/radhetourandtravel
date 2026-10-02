import { CONFIG } from '../config.js';
export default function MapSection() {
  return (
    <section aria-labelledby="map-h" className="py-12 md:py-16">
      <div className="wrap">
        <h2 id="map-h" className="text-2xl md:text-3xl">Find Us in Una</h2>
        {CONFIG.mapsEmbedUrl
          ? <iframe title="Radhe Una Taxi Service location on Google Maps" src={CONFIG.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-6 h-[360px] w-full border border-slate-200" />
          : <div className="mt-6 grid h-[240px] place-items-center border border-slate-200 bg-mist p-6 text-center"><div><p className="font-semibold">Railway Station Road, Adarsh Nagar, Una</p><a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">Open in Google Maps</a></div></div>}
      </div>
    </section>
  );
}
