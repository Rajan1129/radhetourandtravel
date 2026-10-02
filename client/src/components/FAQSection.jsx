import { ChevronDown } from 'lucide-react';
export default function FAQSection({ faqs, heading = 'Frequently Asked Questions' }) {
  return (
    <section aria-labelledby="faq-h" className="py-16 md:py-20">
      <div className="wrap max-w-3xl">
        <h2 id="faq-h" className="text-3xl">{heading}</h2>
        <div className="mt-6 border-t border-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-slate-200 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><h3 className="text-base font-bold">{f.q}</h3><ChevronDown className="shrink-0 transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary>
              <p className="mt-3 text-slate-dark">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
