import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import ServiceCard from './ServiceCard.jsx';

export default function ServiceSection() {
  const [local, out, air, rail, one, hima] = services;
  return (
    <section id="services" aria-labelledby="svc-h" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">What we do</p>
        <h2 id="svc-h" className="mt-2 max-w-2xl text-3xl font-extrabold text-navy md:text-4xl">
          Taxi Services for Every Journey
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Feature panel with real Dzire taxi photo */}
          <Reveal className="relative overflow-hidden bg-deep p-8 text-white lg:col-span-2 lg:p-10">
            <Photo
              name="fleet/sedan_dzire"
              alt="Local taxi service in Una - Maruti Dzire"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            />
            <div className="relative max-w-md">
              <Icon name={local.icon} size={32} className="text-sun" />
              <h3 className="mt-4 text-2xl font-bold md:text-3xl">{local.title}</h3>
              <p className="mt-3 text-white/90 leading-relaxed">{local.short}</p>
              <Link to={local.to} className="btn btn-primary mt-6">Book a taxi in Una</Link>
            </div>
          </Reveal>

          {/* Outstation panel with real Innova photo */}
          <Reveal className="relative flex flex-col justify-between overflow-hidden border border-slate-200 border-l-4 border-l-sky bg-white p-8">
            <Photo
              name="fleet/innova_suv"
              alt="Outstation taxi from Una - Toyota Innova"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
            />
            <div>
              <Icon name={out.icon} size={28} className="text-sky-dark" />
              <h3 className="mt-3 text-xl font-bold text-navy">{out.title}</h3>
              <p className="mt-2 text-slate-dark">{out.short}</p>
            </div>
            <Link to={out.to} className="mt-6 inline-flex items-center gap-2 font-bold text-deep hover:text-sky-dark">
              Outstation taxi from Una <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Minimal ruled columns with real photos */}
        <div className="mt-5 grid divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <Reveal><ServiceCard s={air} photo="services/outstation" /></Reveal>
          <Reveal><ServiceCard s={rail} photo="fleet/sedan_dzire" /></Reveal>
          <Reveal><ServiceCard s={one} photo="fleet/innova_suv" /></Reveal>
        </div>

        {/* Wide banner with real scenic mountain highway photo */}
        <Reveal className="relative mt-5 flex flex-col gap-4 overflow-hidden bg-navy p-8 text-white md:flex-row md:items-center md:justify-between">
          <Photo
            name="himachal/himachal"
            alt="Himachal hill tour taxi"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
          />
          <div className="flex gap-4">
            <Icon name={hima.icon} size={32} className="mt-1 shrink-0 text-sun" />
            <div>
              <h3 className="text-xl font-bold">{hima.title}</h3>
              <p className="mt-1 max-w-xl text-white/90">{hima.short}</p>
            </div>
          </div>
          <Link to={hima.to} className="btn btn-primary shrink-0 self-start md:self-auto">Plan a hill trip</Link>
        </Reveal>
      </div>
    </section>
  );
}

