import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
const safeEq = (a = '', b = '') => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
export function login(req, res) {
  const { email, password } = req.body || {};
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return res.status(503).json({ message: 'Admin login not configured.' });
  if (!safeEq(email, process.env.ADMIN_EMAIL) || !safeEq(password, process.env.ADMIN_PASSWORD)) return res.status(401).json({ message: 'Invalid credentials.' });
  res.json({ token: jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' }) });
}
