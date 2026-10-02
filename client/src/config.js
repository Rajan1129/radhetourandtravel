import { BUSINESS } from './data/business.js';
const e = import.meta.env;
export const CONFIG = {
  apiUrl: e.VITE_API_URL ?? '',
  siteUrl: (e.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, ''),
  waNumber: e.VITE_WHATSAPP_NUMBER || BUSINESS.waNumber,
  mapsUrl: e.VITE_GOOGLE_MAPS_URL || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Radhe Tour & Travel Taxi Service Una, Railway Station Road, Adarsh Nagar, Una, Himachal Pradesh 174303')}`,
  mapsEmbedUrl: e.VITE_GOOGLE_MAPS_EMBED_URL || '',
  reviewUrl: e.VITE_GOOGLE_REVIEW_URL || '',
};
