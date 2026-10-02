import mongoose from 'mongoose';
export const SERVICE_TYPES = ['Local Taxi', 'Outstation Taxi', 'Airport Transfer', 'Railway Station Taxi', 'One Way Taxi', 'Himachal Trip'];
export const STATUSES = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  pickup: { type: String, required: true, trim: true, maxlength: 160 },
  destination: { type: String, required: true, trim: true, maxlength: 160 },
  travelDate: { type: Date, required: true },
  passengers: { type: Number, required: true, min: 1, max: 20 },
  serviceType: { type: String, enum: SERVICE_TYPES, required: true },
  message: { type: String, trim: true, maxlength: 500, default: '' },
  status: { type: String, enum: STATUSES, default: 'new', index: true },
}, { timestamps: { createdAt: true, updatedAt: true } });
export default mongoose.model('Enquiry', enquirySchema);
