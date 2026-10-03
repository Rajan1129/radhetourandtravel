import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Sedan (Dzire / Etios)"
    category: { type: String, default: 'Sedan' }, // Sedan, SUV, Tempo Traveller, Hatchback
    tag: { type: String, default: 'Budget & Business' }, // e.g. "Family & Hill Tours"
    passengers: { type: String, default: 'Up to 4 Passengers' },
    luggage: { type: String, default: '2 Large + 2 Small Bags' },
    ideal: { type: String, default: 'Local rides, railway transfers, outstation' },
    features: [{ type: String }],
    startingPrice: { type: String, default: '₹11/km' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Car = mongoose.model('Car', carSchema);
