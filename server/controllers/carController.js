import { Car } from '../models/Car.js';

export async function listCars(req, res) {
  try {
    const cars = await Car.find().sort({ order: 1, createdAt: 1 });
    res.json({ items: cars });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fleet: ' + err.message });
  }
}

export async function createCar(req, res) {
  try {
    const data = { ...req.body };
    if (!data.name) return res.status(400).json({ message: 'Car name is required.' });

    if (typeof data.features === 'string') {
      data.features = data.features.split('\n').map((s) => s.trim()).filter(Boolean);
    }

    const created = await Car.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: 'Could not create car: ' + err.message });
  }
}

export async function updateCar(req, res) {
  try {
    const data = { ...req.body };
    if (typeof data.features === 'string') {
      data.features = data.features.split('\n').map((s) => s.trim()).filter(Boolean);
    }

    const updated = await Car.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Car not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Could not update car: ' + err.message });
  }
}

export async function deleteCar(req, res) {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete car: ' + err.message });
  }
}
