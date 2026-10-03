import { Package } from '../models/Package.js';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function listPackages(req, res) {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    const packages = await Package.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ items: packages });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch packages: ' + err.message });
  }
}

export async function getPackageBySlug(req, res) {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug.toLowerCase() });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving package: ' + err.message });
  }
}

export async function createPackage(req, res) {
  try {
    const data = { ...req.body };
    if (!data.title) return res.status(400).json({ message: 'Title is required.' });
    if (!data.slug) data.slug = slugify(data.title);
    else data.slug = slugify(data.slug);

    const exists = await Package.findOne({ slug: data.slug });
    if (exists) {
      data.slug = `${data.slug}-${Date.now().toString(36).slice(-4)}`;
    }

    if (typeof data.highlights === 'string') {
      data.highlights = data.highlights.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    if (typeof data.itinerary === 'string') {
      data.itinerary = data.itinerary.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    if (typeof data.inclusions === 'string') {
      data.inclusions = data.inclusions.split('\n').map((s) => s.trim()).filter(Boolean);
    }

    const created = await Package.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: 'Could not create package: ' + err.message });
  }
}

export async function updatePackage(req, res) {
  try {
    const data = { ...req.body };
    if (data.title && !data.slug) data.slug = slugify(data.title);
    else if (data.slug) data.slug = slugify(data.slug);

    if (typeof data.highlights === 'string') {
      data.highlights = data.highlights.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    if (typeof data.itinerary === 'string') {
      data.itinerary = data.itinerary.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    if (typeof data.inclusions === 'string') {
      data.inclusions = data.inclusions.split('\n').map((s) => s.trim()).filter(Boolean);
    }

    const updated = await Package.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Package not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Could not update package: ' + err.message });
  }
}

export async function deletePackage(req, res) {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete package: ' + err.message });
  }
}
