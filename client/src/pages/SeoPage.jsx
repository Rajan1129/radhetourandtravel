import { Link, Navigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEOHead from '../seo/SEOHead.jsx';
import { CONFIG } from '../config.js';
import { seoPageMap } from '../data/seoPages.js';
import { localBusinessSchema, taxiServiceSchema, breadcrumbSchema, faqSchema } from '../seo/schema.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import CallButton from '../components/CallButton.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import QuickBooking from '../components/QuickBooking.jsx';
import FAQSection from '../components/FAQSection.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import MountainScene from '../components/MountainScene.jsx';
import Photo from '../components/Photo.jsx';
import FleetSection from '../components/FleetSection.jsx';

export default function SeoPage({ slug: fixed }) {
  const { slug: param } = useParams();
  const slug = fixed || param;
  const page = seoPageMap[slug];
  if (!page) return <Navigate to="/not-found" replace />;
  const crumbs = [{ name: 'Home', path: '/' }, ...(page.type === 'route' ? [{ name: 'Outstation Taxi', path: '/outstation-taxi-una' }] : []), { name: page.breadcrumb, path: `/${slug}` }];
  const related = page.related.map((s) => seoPageMap[s]).filter(Boolean);
  const wa = `Hello Radhe Una Taxi Service, I would like a quote for: ${page.h1}.`;
  return (
    <>
      <SEOHead title={page.title} description={page.description} keywords={page.keywords} path={`/${slug}`}
        schemas={[localBusinessSchema(CONFIG.siteUrl), taxiServiceSchema(CONFIG.siteUrl, page), breadcrumbSchema(CONFIG.siteUrl, crumbs), faqSchema(page.faqs)]} />
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Photo name={`routes/${slug.replace('una-to-', '').replace('-taxi', '')}`} fallback="hero/hero" alt={page.h1} className="absolute inset-0 -z-10 h-full w-full" width="1920" height="800" />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="wrap py-12 md:py-20">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{page.intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><CallButton /><WhatsAppButton text={wa} /></div>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[2fr_1fr] lg:py-20">
        <div className="space-y-10">
          {page.sections.map((s) => (
            <section key={s.h}><h2 className="text-2xl md:text-3xl">{s.h}</h2>{s.p.map((t) => <p key={t} className="mt-3 text-lg text-slate-dark">{t}</p>)}</section>
          ))}
          <section>
            <h2 className="text-2xl md:text-3xl">Why travel with Radhe Una Taxi Service</h2>
            <p className="mt-3 text-lg text-slate-dark">We are a local team based in Una, with clean cabs and drivers who know the roads. Customers describe our service as neat, clean and very good in their Google reviews. You get a clear fare before you confirm, and you can reach us by call or WhatsApp at any point in your booking.</p>
          </section>
        </div>
        <aside className="h-fit border border-slate-200 bg-mist p-6 lg:sticky lg:top-24" aria-label="Highlights">
          <h2 className="text-lg">{page.type === 'route' ? 'This route' : 'What you get'}</h2>
          <ul className="mt-4 space-y-3">{page.points.map((p) => <li key={p} className="flex gap-2.5"><Check className="mt-0.5 shrink-0 text-sky-dark" size={18} aria-hidden="true" />{p}</li>)}</ul>
          <p className="mt-5 text-sm text-slate-dark">Fares are confirmed on enquiry; we do not show fixed online prices.</p>
        </aside>
      </div>

      <FleetSection />

      <QuickBooking />
      <FAQSection faqs={page.faqs} />

      <section aria-labelledby="rel-h" className="border-t border-slate-200 py-12">
        <div className="wrap">
          <h2 id="rel-h" className="text-2xl">Related taxi services</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <li key={r.slug}><Link to={`/${r.slug}`} className="block border border-slate-200 p-4 font-bold hover:border-sky hover:text-sky-dark">{r.type === 'route' ? `${r.h1} service` : r.h1}</Link></li>)}
            <li><Link to="/" className="block border border-slate-200 p-4 font-bold hover:border-sky hover:text-sky-dark">Book a taxi in Una</Link></li>
          </ul>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
