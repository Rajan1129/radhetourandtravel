import { Phone } from 'lucide-react';
import { telHref } from '../utils/contact.js';
export default function CallButton({ label = 'Call Now', className = 'btn-primary' }) {
  return <a href={telHref} className={`btn ${className}`}><Phone size={18} aria-hidden="true" />{label}</a>;
}
