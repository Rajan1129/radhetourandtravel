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

// Packages API
export async function getPackages(category = '') {
  const url = `${CONFIG.apiUrl}/api/packages${category ? `?category=${encodeURIComponent(category)}` : ''}`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to fetch packages.');
  return data;
}

export async function createPackage(token, payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to create package.');
  return data;
}

export async function updatePackage(token, id, payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/packages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to update package.');
  return data;
}

export async function deletePackage(token, id) {
  const res = await fetch(`${CONFIG.apiUrl}/api/packages/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to delete package.');
  return data;
}

// Cars / Fleet API
export async function getCars() {
  const res = await fetch(`${CONFIG.apiUrl}/api/cars`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to fetch fleet.');
  return data;
}

export async function createCar(token, payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to create car.');
  return data;
}

export async function updateCar(token, id, payload) {
  const res = await fetch(`${CONFIG.apiUrl}/api/cars/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to update car.');
  return data;
}

export async function deleteCar(token, id) {
  const res = await fetch(`${CONFIG.apiUrl}/api/cars/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to delete car.');
  return data;
}

// File Upload (Drag and Drop / File Input)
export async function uploadImage(token, file, folder = 'packages') {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${CONFIG.apiUrl}/api/upload?folder=${encodeURIComponent(folder)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to upload image.');
  return data;
}
