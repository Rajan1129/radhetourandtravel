import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createEnquiry, listEnquiries, updateStatus } from '../controllers/enquiryController.js';
import { login } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/auth.js';
const r = Router();
const submitLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, message: { message: 'Too many requests. Please call us instead.' } });
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });
r.post('/enquiries', submitLimit, createEnquiry);
r.get('/enquiries', requireAdmin, listEnquiries);          // protected
r.patch('/enquiries/:id/status', requireAdmin, updateStatus); // protected
r.post('/admin/login', loginLimit, login);
export default r;
