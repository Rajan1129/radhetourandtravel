import { CONFIG } from '../config.js';

export async function postEnquiry(payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Could not send your enquiry.');
  return data;
}

export async function adminLogin(email, password) {
  const res = await fetch(`${CONFIG.apiUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Invalid username or password.');
  return data;
}

export async function getEnquiries(token, status = '') {
  const url = `${CONFIG.apiUrl}/api/enquiries${status ? `?status=${encodeURIComponent(status)}` : ''}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to fetch enquiries.');
  return data;
}

export async function updateEnquiryStatus(token, id, status) {
  const res = await fetch(`${CONFIG.apiUrl}/api/enquiries/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to update status.');
  return data;
}

