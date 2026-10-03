// Injects per-route <title>, meta, canonical, JSON-LD, and full semantic pre-rendered HTML into index.html so crawlers see complete content without running JS.
import fs from 'node:fs';
import path from 'node:path';
import { seoPageMap, seoPages, homeMeta } from '../../client/src/data/seoPages.js';
import { commonFaqs, homeFaqIds } from '../../client/src/data/faqs.js';
import { BUSINESS } from '../../client/src/data/business.js';
import { localBusinessSchema, webSiteSchema, taxiServiceSchema, breadcrumbSchema, faqSchema } from '../../client/src/seo/schema.js';

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const STATIC_PAGES = {
  '/packages': {
    title: 'Himachal Tour Packages & Devi Yatra from Una | Radhe Taxi Service',
    description: 'Book tour packages from Una: Shimla, Manali, Kasol, Dharamshala, Chintpurni, Jwalaji, Naina Devi, Baglamukhi, 2 Dham & 4 Dham Devi Darshan. Clean commercial cabs & hill drivers.',
    keywords: 'himachal tour packages from una, devi yatra una, chintpurni jwalaji 2 dham taxi package, shimla manali taxi package una, 4 dham himachal cab',
    h1: 'Tour Packages & Pilgrimage Yatra from Una',
    body: 'Explore Himachal Pradesh with customized holiday and pilgrimage taxi packages from Una. From famous Shaktipeeth Devi darshans (Chintpurni, Jwalaji, Naina Devi, Kangra, Baglamukhi) to scenic hill stations (Shimla, Manali, Kasol, Dharamshala), we provide verified AC cabs and experienced hill drivers.',
  },
  '/about': {
    title: 'About Us | Radhe Tour & Travel Taxi Service Una, Himachal Pradesh',
    description: 'Learn about Radhe Una Taxi Service. Based on Railway Station Road, Adarsh Nagar, Una, HP. 5.0 rated on Google with experienced hill drivers and clean commercial cabs.',
    keywords: 'about Radhe Una Taxi Service, Radhe tour and travels Una, taxi owner Una, best taxi service in Una Himachal',
    h1: 'About Radhe Tour & Travel Taxi Service Una',
    body: 'Your trusted local travel partner in Una, Himachal Pradesh. Driven by safety, cleanliness, punctual pickups, and true mountain hospitality with a well-maintained commercial fleet.',
  },
  '/contact': {
    title: 'Contact Radhe Una Taxi Service | Una, Himachal Pradesh',
    description: 'Call or WhatsApp Radhe Una Taxi Service on +91 62304 68560 or visit us at Railway Station Road, Adarsh Nagar, Una, Himachal Pradesh 174303.',
    keywords: 'contact Radhe taxi Una, Una taxi phone number, Radhe tour and travel Una address',
    h1: 'Contact Radhe Una Taxi Service',
    body: 'Call or WhatsApp us 24/7 for instant taxi bookings, fare enquiries, outstation tours and railway station pickups in Una.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Radhe Una Taxi Service',
    description: 'Privacy Policy for Radhe Una Taxi Service, Una, Himachal Pradesh.',
    keywords: 'privacy policy radhe una taxi',
    h1: 'Privacy Policy',
    body: 'When you submit an enquiry, we collect your name, phone number, and trip details solely to respond to and fulfill your taxi booking. We never sell your personal information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Radhe Una Taxi Service',
    description: 'Terms & Conditions for Radhe Una Taxi Service, Una, Himachal Pradesh.',
    keywords: 'terms and conditions radhe una taxi',
    h1: 'Terms & Conditions',
    body: 'Enquiries submitted on this website are requests for quotation. Bookings are confirmed upon mutual agreement of route, vehicle type, and fare.',
  },
  '/admin': {
    title: 'Admin Portal | Radhe Una Taxi Service',
    description: 'Admin Portal Login for Radhe Una Taxi Service.',
    keywords: '',
    h1: 'Admin Portal',
    body: 'Sign in to access booking enquiries and customer management.',
    noindex: true,
  },
};

function renderSemanticHtml(p, meta, pg, site) {
  const phone = BUSINESS.phoneDisplay;
  const tel = `tel:${BUSINESS.phoneE164}`;
  const fullAddress = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

  const header = `
    <header style="padding:1rem;border-bottom:1px solid #e2e8f0;background:#082B49;color:#fff;">
      <div style="max-width:1140px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <a href="/" style="color:#fff;text-decoration:none;font-size:1.25rem;font-weight:bold;">${esc(BUSINESS.brand)}</a>
        <nav aria-label="Quick Links" style="display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="/" style="color:#fff;text-decoration:none;">Home</a>
          <a href="/packages" style="color:#fff;text-decoration:none;">Packages</a>
          <a href="/taxi-service-in-una" style="color:#fff;text-decoration:none;">Local Taxi</a>
          <a href="/airport-taxi-una" style="color:#fff;text-decoration:none;">Airport Taxi</a>
          <a href="/railway-station-taxi-una" style="color:#fff;text-decoration:none;">Railway Station</a>
          <a href="/about" style="color:#fff;text-decoration:none;">About Us</a>
          <a href="/contact" style="color:#fff;text-decoration:none;">Contact</a>
          <a href="${tel}" style="color:#F9B824;font-weight:bold;text-decoration:none;">Call: ${esc(phone)}</a>
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer style="margin-top:3rem;padding:2rem 1rem;background:#082B49;color:#e2e8f0;">
      <div style="max-width:1140px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:2rem;">
        <div>
          <h3 style="color:#fff;font-size:1.1rem;margin-bottom:0.75rem;">${esc(BUSINESS.legalName)}</h3>
          <p>Reliable 24/7 taxi service in Una, Himachal Pradesh. Local rides, outstation trips, airport transfers & pilgrimage tours.</p>
        </div>
        <div>
          <h3 style="color:#fff;font-size:1.1rem;margin-bottom:0.75rem;">Popular Routes</h3>
          <ul style="list-style:none;padding:0;line-height:1.8;">
            <li><a href="/una-to-chandigarh-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Chandigarh Taxi</a></li>
            <li><a href="/una-to-dharamshala-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Dharamshala Taxi</a></li>
            <li><a href="/una-to-chintpurni-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Chintpurni Taxi</a></li>
            <li><a href="/una-to-jwalaji-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Jwalaji Taxi</a></li>
            <li><a href="/una-to-shimla-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Shimla Taxi</a></li>
            <li><a href="/una-to-manali-taxi" style="color:#cbd5e1;text-decoration:none;">Una to Manali Taxi</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color:#fff;font-size:1.1rem;margin-bottom:0.75rem;">Local Service Areas</h3>
          <ul style="list-style:none;padding:0;line-height:1.8;">
            <li><a href="/taxi-service-in-una" style="color:#cbd5e1;text-decoration:none;">Taxi Service in Una</a></li>
            <li><a href="/taxi-service-amb-andaura" style="color:#cbd5e1;text-decoration:none;">Taxi Service Amb Andaura</a></li>
            <li><a href="/taxi-service-in-gagret" style="color:#cbd5e1;text-decoration:none;">Taxi Service in Gagret</a></li>
            <li><a href="/taxi-service-in-haroli" style="color:#cbd5e1;text-decoration:none;">Taxi Service in Haroli</a></li>
            <li><a href="/taxi-service-mehatpur" style="color:#cbd5e1;text-decoration:none;">Taxi Service Mehatpur</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color:#fff;font-size:1.1rem;margin-bottom:0.75rem;">Contact &amp; Location</h3>
          <p><strong>Phone:</strong> <a href="${tel}" style="color:#F9B824;text-decoration:none;">${esc(phone)}</a></p>
          <address style="font-style:normal;margin-top:0.5rem;line-height:1.5;">${esc(fullAddress)}</address>
          <p style="margin-top:0.5rem;font-size:0.875rem;">Open 24 Hours · 7 Days a Week</p>
        </div>
      </div>
      <div style="max-width:1140px;margin:2rem auto 0;padding-top:1rem;border-top:1px solid #1e3a5f;text-align:center;font-size:0.875rem;">
        &copy; ${new Date().getFullYear()} ${esc(BUSINESS.legalName)}. All rights reserved. | <a href="/privacy-policy" style="color:#cbd5e1;">Privacy Policy</a> | <a href="/terms-and-conditions" style="color:#cbd5e1;">Terms</a>
      </div>
    </footer>`;

  let mainContent = '';

  if (p === '/') {
    const faqs = homeFaqIds.map((i) => commonFaqs[i]);
    mainContent = `
      <section style="padding:3rem 1rem;background:#0d3b66;color:#fff;">
        <div style="max-width:1140px;margin:0 auto;">
          <p style="color:#F9B824;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Taxi Service in Una, Himachal Pradesh</p>
          <h1 style="font-size:2.5rem;margin:0.5rem 0 1rem;">Reliable Taxi Service in Una, Himachal Pradesh</h1>
          <p style="font-size:1.2rem;max-width:700px;line-height:1.6;">Comfortable cabs, experienced drivers and dependable travel for local rides, outstation journeys, airport transfers and Himachal trips. Book 24/7 on call or WhatsApp.</p>
          <div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;">
            <a href="${tel}" style="display:inline-block;padding:0.75rem 1.5rem;background:#F9B824;color:#082B49;font-weight:bold;text-decoration:none;border-radius:4px;">Call Now: ${esc(phone)}</a>
            <a href="https://wa.me/${BUSINESS.waNumber}" style="display:inline-block;padding:0.75rem 1.5rem;background:#25D366;color:#fff;font-weight:bold;text-decoration:none;border-radius:4px;">WhatsApp Booking</a>
          </div>
        </div>
      </section>

      <section style="padding:3rem 1rem;max-width:1140px;margin:0 auto;">
        <h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Our Taxi Services in Una</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;">
          <div style="border:1px solid #e2e8f0;padding:1.5rem;border-radius:6px;">
            <h3 style="font-size:1.25rem;"><a href="/taxi-service-in-una" style="color:#082B49;text-decoration:none;">Local City Taxi</a></h3>
            <p style="color:#475569;margin-top:0.5rem;">Quick pickups for hospital visits, markets, Una railway station, and day trips in Una and nearby villages.</p>
          </div>
          <div style="border:1px solid #e2e8f0;padding:1.5rem;border-radius:6px;">
            <h3 style="font-size:1.25rem;"><a href="/outstation-taxi-una" style="color:#082B49;text-decoration:none;">Outstation Cabs</a></h3>
            <p style="color:#475569;margin-top:0.5rem;">One-way drops and round trips to Chandigarh, Dharamshala, Shimla, Manali, Delhi, Ludhiana, and Amritsar.</p>
          </div>
          <div style="border:1px solid #e2e8f0;padding:1.5rem;border-radius:6px;">
            <h3 style="font-size:1.25rem;"><a href="/airport-taxi-una" style="color:#082B49;text-decoration:none;">Airport Transfers</a></h3>
            <p style="color:#475569;margin-top:0.5rem;">Punctual pickups and drops for Chandigarh, Amritsar, Kangra (Gaggal), and Delhi International Airports.</p>
          </div>
          <div style="border:1px solid #e2e8f0;padding:1.5rem;border-radius:6px;">
            <h3 style="font-size:1.25rem;"><a href="/railway-station-taxi-una" style="color:#082B49;text-decoration:none;">Railway Station Taxi</a></h3>
            <p style="color:#475569;margin-top:0.5rem;">Office located right on Railway Station Road, Adarsh Nagar. Cab ready upon train arrival.</p>
          </div>
        </div>
      </section>

      <section style="padding:3rem 1rem;background:#f8fafc;">
        <div style="max-width:1140px;margin:0 auto;">
          <h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Popular Taxi Routes from Una</h2>
          <ul style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:1rem;list-style:none;padding:0;">
            ${seoPages.filter((s) => s.type === 'route').map((r) => `
              <li style="background:#fff;border:1px solid #e2e8f0;padding:1rem;border-radius:4px;">
                <a href="/${r.slug}" style="font-weight:bold;color:#082B49;text-decoration:none;">${esc(r.h1)}</a>
              </li>`).join('')}
          </ul>
        </div>
      </section>

      <section style="padding:3rem 1rem;max-width:1140px;margin:0 auto;">
        <h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Frequently Asked Questions</h2>
        ${faqs.map((f) => `
          <div style="margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
            <h3 style="font-size:1.15rem;color:#082B49;">${esc(f.q)}</h3>
            <p style="color:#475569;margin-top:0.4rem;line-height:1.6;">${esc(f.a)}</p>
          </div>`).join('')}
      </section>`;
  } else if (pg) {
    const crumbs = [
      { name: 'Home', path: '/' },
      ...(pg.type === 'route' ? [{ name: 'Outstation Taxi', path: '/outstation-taxi-una' }] : []),
      { name: pg.breadcrumb, path: p },
    ];
    const relatedPages = (pg.related || []).map((s) => seoPageMap[s]).filter(Boolean);

    mainContent = `
      <section style="padding:2.5rem 1rem;background:#0d3b66;color:#fff;">
        <div style="max-width:1140px;margin:0 auto;">
          <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1rem;color:#cbd5e1;">
            ${crumbs.map((c, i) => `${i > 0 ? ' &gt; ' : ''}<a href="${c.path}" style="color:#cbd5e1;text-decoration:underline;">${esc(c.name)}</a>`).join('')}
          </nav>
          <h1 style="font-size:2.25rem;margin-bottom:0.75rem;">${esc(pg.h1)}</h1>
          <p style="font-size:1.15rem;max-width:800px;line-height:1.6;color:#f1f5f9;">${esc(pg.intro)}</p>
          <div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;">
            <a href="${tel}" style="display:inline-block;padding:0.75rem 1.5rem;background:#F9B824;color:#082B49;font-weight:bold;text-decoration:none;border-radius:4px;">Call for Fare: ${esc(phone)}</a>
            <a href="https://wa.me/${BUSINESS.waNumber}?text=${encodeURIComponent(`Hello Radhe Una Taxi Service, I would like a quote for ${pg.h1}`)}" style="display:inline-block;padding:0.75rem 1.5rem;background:#25D366;color:#fff;font-weight:bold;text-decoration:none;border-radius:4px;">WhatsApp Booking</a>
          </div>
        </div>
      </section>

      <div style="max-width:1140px;margin:2.5rem auto;padding:0 1rem;display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:2.5rem;">
        <article style="grid-column:span 2;">
          ${(pg.sections || []).map((s) => `
            <section style="margin-bottom:2rem;">
              <h2 style="font-size:1.5rem;color:#082B49;margin-bottom:0.75rem;">${esc(s.h)}</h2>
              ${s.p.map((para) => `<p style="color:#334155;line-height:1.7;margin-bottom:0.75rem;font-size:1.05rem;">${esc(para)}</p>`).join('')}
            </section>`).join('')}

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.5rem;color:#082B49;margin-bottom:0.75rem;">Why Choose Radhe Una Taxi Service</h2>
            <p style="color:#334155;line-height:1.7;font-size:1.05rem;">We are a trusted, locally-owned taxi provider based right on Railway Station Road, Adarsh Nagar, Una. Our fleet includes clean, well-serviced hatchbacks, sedans, and SUVs driven by experienced drivers who know the highways and mountain terrain. Fares are confirmed transparently prior to confirmation with zero hidden costs.</p>
          </section>

          ${pg.faqs && pg.faqs.length ? `
            <section style="margin-top:2.5rem;border-top:1px solid #e2e8f0;padding-top:2rem;">
              <h2 style="font-size:1.5rem;color:#082B49;margin-bottom:1.5rem;">Frequently Asked Questions</h2>
              ${pg.faqs.map((f) => `
                <div style="margin-bottom:1.25rem;">
                  <h3 style="font-size:1.15rem;color:#082B49;">${esc(f.q)}</h3>
                  <p style="color:#475569;margin-top:0.35rem;line-height:1.6;">${esc(f.a)}</p>
                </div>`).join('')}
            </section>` : ''}
        </article>

        <aside style="background:#f8fafc;padding:1.5rem;border:1px solid #e2e8f0;border-radius:6px;height:fit-content;">
          <h2 style="font-size:1.25rem;color:#082B49;margin-bottom:1rem;">Key Highlights</h2>
          <ul style="padding-left:1.25rem;color:#334155;line-height:1.8;">
            ${(pg.points || []).map((pt) => `<li>${esc(pt)}</li>`).join('')}
          </ul>
          <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #e2e8f0;">
            <p style="font-size:0.9rem;color:#64748b;">Fares confirmed before departure. Transparent charges without hidden fees.</p>
            <a href="${tel}" style="display:block;text-align:center;margin-top:1rem;padding:0.75rem;background:#082B49;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Call ${esc(phone)}</a>
          </div>
        </aside>
      </div>

      ${relatedPages.length ? `
        <section style="background:#f8fafc;padding:2.5rem 1rem;border-top:1px solid #e2e8f0;">
          <div style="max-width:1140px;margin:0 auto;">
            <h2 style="font-size:1.5rem;color:#082B49;margin-bottom:1rem;">Related Taxi Services &amp; Routes</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
              ${relatedPages.map((r) => `
                <a href="/${r.slug}" style="display:block;background:#fff;border:1px solid #cbd5e1;padding:1rem;border-radius:4px;text-decoration:none;font-weight:bold;color:#082B49;">
                  ${esc(r.type === 'route' ? `${r.h1} Service` : r.h1)}
                </a>`).join('')}
            </div>
          </div>
        </section>` : ''}`;
  } else if (STATIC_PAGES[p]) {
    const sp = STATIC_PAGES[p];
    mainContent = `
      <section style="padding:3rem 1rem;max-width:800px;margin:0 auto;">
        <h1 style="font-size:2.25rem;color:#082B49;margin-bottom:1rem;">${esc(sp.h1)}</h1>
        <p style="font-size:1.15rem;line-height:1.7;color:#334155;">${esc(sp.body)}</p>
        <div style="margin-top:2rem;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
          <h2 style="font-size:1.25rem;margin-bottom:0.5rem;color:#082B49;">Direct Contact</h2>
          <p><strong>Phone / WhatsApp:</strong> <a href="${tel}" style="color:#082B49;font-weight:bold;">${esc(phone)}</a></p>
          <p style="margin-top:0.5rem;"><strong>Office Address:</strong> ${esc(fullAddress)}</p>
        </div>
      </section>`;
  } else {
    mainContent = `
      <section style="padding:4rem 1rem;text-align:center;max-width:600px;margin:0 auto;">
        <p style="color:#F9B824;font-weight:bold;">Error 404</p>
        <h1 style="font-size:2.5rem;color:#082B49;margin:0.5rem 0 1rem;">Page Not Found</h1>
        <p style="color:#64748b;margin-bottom:2rem;">The taxi service or page you requested could not be found.</p>
        <a href="/" style="display:inline-block;padding:0.75rem 1.5rem;background:#082B49;color:#fff;text-decoration:none;font-weight:bold;border-radius:4px;">Back to Home</a>
      </section>`;
  }

  return `<div id="root">${header}<main id="main-content">${mainContent}</main>${footer}</div>`;
}

export function seoInject(distDir) {
  const site = (process.env.SITE_URL || 'https://your-domain.com').replace(/\/$/, '');
  const file = path.join(distDir, 'index.html');

  return (req, res) => {
    if (!fs.existsSync(file)) return res.status(404).send('Client build not found. Run `npm run build` in /client.');
    const p = req.path.replace(/\/+$/, '') || '/';
    let meta, schemas = [], status = 200, pg = null;

    if (p === '/') {
      meta = homeMeta;
      schemas = [
        localBusinessSchema(site),
        webSiteSchema(site),
        faqSchema(homeFaqIds.map((i) => commonFaqs[i])),
      ];
    } else if (seoPageMap[p.slice(1)]) {
      pg = seoPageMap[p.slice(1)];
      meta = pg;
      const crumbs = [
        { name: 'Home', path: '/' },
        ...(pg.type === 'route' ? [{ name: 'Outstation Taxi', path: '/outstation-taxi-una' }] : []),
        { name: pg.breadcrumb, path: p },
      ];
      schemas = [
        localBusinessSchema(site),
        taxiServiceSchema(site, pg),
        breadcrumbSchema(site, crumbs),
        faqSchema(pg.faqs || []),
      ];
    } else if (STATIC_PAGES[p]) {
      meta = STATIC_PAGES[p];
      schemas = [
        localBusinessSchema(site),
        breadcrumbSchema(site, [{ name: 'Home', path: '/' }, { name: meta.h1, path: p }]),
      ];
    } else {
      status = 404;
      meta = {
        title: 'Page not found | Radhe Una Taxi Service',
        description: 'Page not found. Book reliable taxi service in Una, Himachal Pradesh.',
      };
    }

    const url = `${site}${p === '/' ? '/' : p}`;
    const img = `${site}/og-image.jpg`;

    const tags = [
      `<title>${esc(meta.title)}</title>`,
      `<meta data-rh="true" name="description" content="${esc(meta.description)}">`,
      meta.keywords ? `<meta data-rh="true" name="keywords" content="${esc(meta.keywords)}">` : '',
      status === 404 || meta.noindex
        ? '<meta data-rh="true" name="robots" content="noindex, nofollow">'
        : '<meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
      `<link data-rh="true" rel="canonical" href="${url}">`,
      '<meta data-rh="true" property="og:type" content="website">',
      '<meta data-rh="true" property="og:locale" content="en_IN">',
      '<meta data-rh="true" property="og:site_name" content="Radhe Una Taxi Service">',
      `<meta data-rh="true" property="og:title" content="${esc(meta.title)}">`,
      `<meta data-rh="true" property="og:description" content="${esc(meta.description)}">`,
      `<meta data-rh="true" property="og:image" content="${img}">`,
      '<meta data-rh="true" property="og:image:width" content="1200">',
      '<meta data-rh="true" property="og:image:height" content="630">',
      '<meta data-rh="true" property="og:image:alt" content="Radhe Una Taxi Service - Una, Himachal Pradesh">',
      `<meta data-rh="true" property="og:url" content="${url}">`,
      '<meta data-rh="true" name="twitter:card" content="summary_large_image">',
      `<meta data-rh="true" name="twitter:title" content="${esc(meta.title)}">`,
      `<meta data-rh="true" name="twitter:description" content="${esc(meta.description)}">`,
      `<meta data-rh="true" name="twitter:image" content="${img}">`,
      '<meta data-rh="true" name="geo.region" content="IN-HP">',
      '<meta data-rh="true" name="geo.placename" content="Una, Himachal Pradesh">',
      '<meta data-rh="true" name="geo.position" content="31.4685;76.2708">',
      '<meta data-rh="true" name="ICBM" content="31.4685, 76.2708">',
      ...schemas.map((s) => `<script data-rh="true" type="application/ld+json">${JSON.stringify(s)}</script>`),
    ].filter(Boolean).join('\n    ');

    const semanticHtml = renderSemanticHtml(p, meta, pg, site);

    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<title>.*?<\/title>/s, '');
    html = html.replace('<!--SEO-->', tags);
    html = html.replace('<div id="root"></div>', semanticHtml);

    res.status(status).type('html').send(html);
  };
}

