import { CONFIG } from '../config.js';
export async function postEnquiry(payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Could not send your enquiry.');
  return data;
}
