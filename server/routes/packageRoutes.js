import { Router } from 'express';
import {
  listPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', listPackages);
router.get('/:slug', getPackageBySlug);

// Admin protected
router.post('/', requireAdmin, createPackage);
router.put('/:id', requireAdmin, updatePackage);
router.delete('/:id', requireAdmin, deletePackage);

export default router;
