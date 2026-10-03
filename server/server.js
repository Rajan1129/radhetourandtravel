import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { connectDB } from './config/db.js';
import { seedDefaultsIfEmpty } from './config/seedData.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import carRoutes from './routes/carRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFoundApi, errorHandler } from './middleware/errorHandler.js';
import { seoInject } from './middleware/seoInject.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '../client/dist');
const uploadsDir = path.join(__dirname, 'uploads');
const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '20kb' }));

// Static uploads for dynamic images
app.use('/uploads', express.static(uploadsDir, { maxAge: '7d' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', enquiryRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/cars', carRoutes);
app.use('/api', uploadRoutes);
app.use('/api', notFoundApi);

// Production: serve the built React app with per-route SEO tags
app.use('/assets', express.static(path.join(dist, 'assets'), { maxAge: '1y', immutable: true }));
app.use(express.static(dist, { index: false, maxAge: '1d' }));
app.get('*', seoInject(dist));
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB()
  .then(async () => {
    await seedDefaultsIfEmpty();
    app.listen(port, () => console.log(`Server on :${port}`));
  })
  .catch((e) => { console.error('Startup failed:', e.message); process.exit(1); });
