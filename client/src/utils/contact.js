import { CONFIG } from '../config.js';
import { BUSINESS } from '../data/business.js';
export const telHref = `tel:${BUSINESS.phoneE164}`;
export const waLink = (text = 'Hello Radhe Una Taxi Service, I would like to book a taxi.') =>
  `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(text)}`;
export const waFromEnquiry = (f) =>
  waLink(['Hello Radhe Una Taxi Service, I would like to book a taxi.', '', `Name: ${f.name}`, `Pickup: ${f.pickup}`, `Destination: ${f.destination}`, `Date: ${f.travelDate}`, `Passengers: ${f.passengers}`, `Service: ${f.serviceType}`].join('\n'));
