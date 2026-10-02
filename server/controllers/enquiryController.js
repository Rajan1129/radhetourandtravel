import Enquiry, { SERVICE_TYPES, STATUSES } from '../models/Enquiry.js';

const str = (v) => (typeof v === 'string' ? v.trim() : '');
function validate(b) {
  const errors = {};
  const d = {
    name: str(b.name), phone: str(b.phone).replace(/[\s-]/g, ''), pickup: str(b.pickup), destination: str(b.destination),
    travelDate: new Date(b.travelDate), passengers: Number(b.passengers), serviceType: str(b.serviceType), message: str(b.message).slice(0, 500),
  };
  if (d.name.length < 2 || d.name.length > 80) errors.name = 'Name is required.';
  if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(d.phone)) errors.phone = 'Enter a valid Indian mobile number.';
  if (d.pickup.length < 2) errors.pickup = 'Pickup is required.';
  if (d.destination.length < 2) errors.destination = 'Destination is required.';
  const yesterday = new Date(Date.now() - 864e5);
  if (isNaN(d.travelDate) || d.travelDate < yesterday) errors.travelDate = 'Enter a valid future date.';
  if (!Number.isInteger(d.passengers) || d.passengers < 1 || d.passengers > 20) errors.passengers = 'Passengers must be 1 to 20.';
  if (!SERVICE_TYPES.includes(d.serviceType)) errors.serviceType = 'Invalid service type.';
  return { d, errors };
}
export async function createEnquiry(req, res, next) {
  try {
    const { d, errors } = validate(req.body || {});
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the highlighted details.', errors });
    const doc = await Enquiry.create(d);
    res.status(201).json({ message: "Your enquiry has been received. We'll contact you shortly.", id: doc._id });
  } catch (e) { next(e); }
}
export async function listEnquiries(req, res, next) {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const q = STATUSES.includes(status) ? { status } : {};
    const lim = Math.min(Number(limit) || 50, 100);
    const [items, total] = await Promise.all([
      Enquiry.find(q).sort({ createdAt: -1 }).skip((Math.max(Number(page), 1) - 1) * lim).limit(lim).lean(),
      Enquiry.countDocuments(q),
    ]);
    res.json({ total, items });
  } catch (e) { next(e); }
}
export async function updateStatus(req, res, next) {
  try {
    if (!STATUSES.includes(req.body?.status)) return res.status(400).json({ message: 'Invalid status.' });
    const doc = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found.' });
    res.json(doc);
  } catch (e) { next(e); }
}
