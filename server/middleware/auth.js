import jwt from 'jsonwebtoken';
export function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  try { const p = jwt.verify(token, process.env.JWT_SECRET); if (p.role !== 'admin') throw new Error(); next(); }
  catch { res.status(401).json({ message: 'Authentication required.' }); }
}
