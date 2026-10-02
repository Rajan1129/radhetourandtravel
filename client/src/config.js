import { BUSINESS } from './data/business.js';
const e = import.meta.env;
export const CONFIG = {
  apiUrl: e.VITE_API_URL ?? '',
  siteUrl: (e.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, ''),
  waNumber: e.VITE_WHATSAPP_NUMBER || BUSINESS.waNumber,
  mapsUrl: e.VITE_GOOGLE_MAPS_URL || BUSINESS.mapsUrl,
  mapsEmbedUrl: e.VITE_GOOGLE_MAPS_EMBED_URL || `https://maps.google.com/maps?q=${encodeURIComponent('Radhe Una Taxi service, R. H. Hospital, Railway Station Road, Adarsh Nagar, Una, Himachal Pradesh 174303')}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  reviewUrl: e.VITE_GOOGLE_REVIEW_URL || BUSINESS.mapsUrl,
};
