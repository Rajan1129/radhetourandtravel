import { MessageCircle } from 'lucide-react';
import { waLink } from '../utils/contact.js';
export default function WhatsAppButton({ text, label = 'WhatsApp', className = '' }) {
  return <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className={`btn btn-wa ${className}`}><MessageCircle size={18} aria-hidden="true" />{label}</a>;
}
