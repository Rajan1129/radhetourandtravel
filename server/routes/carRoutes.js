import { Router } from 'express';
import { listCars, createCar, updateCar, deleteCar } from '../controllers/carController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', listCars);

// Admin protected
router.post('/', requireAdmin, createCar);
router.put('/:id', requireAdmin, updateCar);
router.delete('/:id', requireAdmin, deleteCar);

export default router;
