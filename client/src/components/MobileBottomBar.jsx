import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { telHref, waLink } from '../utils/contact.js';
export default function MobileBottomBar() {
  const b = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white';
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-white/20 bg-deep lg:hidden pb-[env(safe-area-inset-bottom)]" role="navigation" aria-label="Quick contact">
      <a href={telHref} className={`${b} bg-sky`}><Phone size={20} aria-hidden="true" />Call</a>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${b} bg-[#128C4A]`}><MessageCircle size={20} aria-hidden="true" />WhatsApp</a>
      <a href="/#book" className={b}><CalendarCheck size={20} aria-hidden="true" />Book Taxi</a>
    </div>
  );
}
