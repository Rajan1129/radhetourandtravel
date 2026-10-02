// Pure functions (no import.meta) so server can reuse for injection.
import { BUSINESS } from '../data/business.js';

export const localBusinessSchema = (site) => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'TaxiService'],
  '@id': `${site}/#business`,
  name: BUSINESS.legalName,
  alternateName: [BUSINESS.brand, 'Radhe Taxi Una', 'Radhe Tour and Travels Una'],
  url: site,
  telephone: BUSINESS.phoneE164,
  image: `${site}/og-image.jpg`,
  logo: `${site}/logo.png`,
  slogan: BUSINESS.tagline,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Net Banking, Credit Card, Debit Card',
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Radhe Tour & Travel Taxi Service Una, Railway Station Road, Adarsh Nagar, Una, Himachal Pradesh 174303')}`,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.4685,
    longitude: 76.2708,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: 'Una',
    addressRegion: 'Himachal Pradesh',
    postalCode: BUSINESS.address.postalCode,
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS.phoneE164,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'pa'],
  },
  areaServed: [
    { '@type': 'City', name: 'Una' },
    { '@type': 'City', name: 'Amb' },
    { '@type': 'City', name: 'Gagret' },
    { '@type': 'City', name: 'Haroli' },
    { '@type': 'AdministrativeArea', name: 'Himachal Pradesh' },
    { '@type': 'AdministrativeArea', name: 'Punjab' },
    { '@type': 'AdministrativeArea', name: 'Chandigarh' },
    { '@type': 'AdministrativeArea', name: 'Delhi' },
  ],
});

export const webSiteSchema = (site) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  url: site,
  name: BUSINESS.brand,
  alternateName: BUSINESS.legalName,
  publisher: { '@id': `${site}/#business` },
  inLanguage: 'en-IN',
});

export const taxiServiceSchema = (site, page) => ({
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: page.h1,
  url: `${site}/${page.slug}`,
  description: page.description,
  serviceType: 'Taxi Service',
  providerMobility: 'dynamic',
  provider: { '@id': `${site}/#business` },
  areaServed: { '@type': 'AdministrativeArea', name: 'Himachal Pradesh' },
});

export const breadcrumbSchema = (site, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site}${it.path}`,
  })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
