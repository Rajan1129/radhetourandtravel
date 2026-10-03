import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      default: 'Pilgrimage Yatra',
    },
    duration: { type: String, required: true, trim: true }, // e.g. "2 Days / 1 Night", "Same Day"
    startingPrice: { type: String, required: true, trim: true }, // e.g. "₹3,499"
    pickupLocation: { type: String, default: 'Una Railway Station / Anywhere in Una & HP' },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    itinerary: [{ type: String }],
    inclusions: [{ type: String }],
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', packageSchema);
