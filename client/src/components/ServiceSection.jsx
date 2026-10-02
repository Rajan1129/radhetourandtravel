import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import MountainScene from './MountainScene.jsx';
import ServiceCard from './ServiceCard.jsx';

export default function ServiceSection() {
  const [local, out, air, rail, one, hima] = services;
  return (
    <section id="services" aria-labelledby="svc-h" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">What we do</p>
        <h2 id="svc-h" className="mt-2 max-w-2xl text-3xl md:text-4xl">Taxi Services for Every Journey</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Feature panel */}
          <Reveal className="relative overflow-hidden bg-deep p-8 text-white lg:col-span-2 lg:p-10">
            <MountainScene className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40" />
            <div className="relative max-w-md">
              <Icon name={local.icon} size={32} className="text-sun" />
              <h3 className="mt-4 text-2xl md:text-3xl">{local.title}</h3>
              <p className="mt-3 text-white/85">{local.short}</p>
              <Link to={local.to} className="btn btn-primary mt-6">Book a taxi in Una</Link>
            </div>
          </Reveal>
          {/* Horizontal */}
          <Reveal className="flex flex-col justify-between border border-slate-200 border-l-4 border-l-sky p-8">
            <div><Icon name={out.icon} size={28} className="text-sky-dark" /><h3 className="mt-3 text-xl">{out.title}</h3><p className="mt-2 text-slate-dark">{out.short}</p></div>
            <Link to={out.to} className="mt-6 inline-flex items-center gap-2 font-bold text-deep hover:text-sky-dark">Outstation taxi from Una <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
        {/* Minimal ruled columns */}
        <div className="mt-5 grid divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[air, rail, one].map((s) => <Reveal key={s.id}><ServiceCard s={s} /></Reveal>)}
        </div>
        {/* Wide banner */}
        <Reveal className="mt-5 flex flex-col gap-4 bg-mist p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4"><Icon name={hima.icon} size={32} className="mt-1 shrink-0 text-sky-dark" /><div><h3 className="text-xl">{hima.title}</h3><p className="mt-1 max-w-xl text-slate-dark">{hima.short}</p></div></div>
          <Link to={hima.to} className="btn btn-dark shrink-0">Plan a hill trip</Link>
        </Reveal>
      </div>
    </section>
  );
}
