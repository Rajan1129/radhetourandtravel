import fs from 'node:fs';
import { seoPages } from '../src/data/seoPages.js';

const site = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://your-domain.com').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { path: '/', priority: '1.0', changefreq: 'daily', title: 'Radhe Una Taxi Service - Taxi Service in Una Himachal Pradesh' },
  ...seoPages.map((p) => ({
    path: '/' + p.slug,
    priority: p.type === 'service' ? '0.9' : '0.8',
    changefreq: 'weekly',
    title: p.title,
  })),
  { path: '/about', priority: '0.8', changefreq: 'monthly', title: 'About Radhe Una Taxi Service' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', title: 'Contact Radhe Una Taxi Service' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly', title: 'Privacy Policy' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly', title: 'Terms & Conditions' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${site}${u.path === '/' ? '/' : u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <image:image>
      <image:loc>${site}/og-image.jpg</image:loc>
      <image:title>${u.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}</image:title>
      <image:caption>Radhe Una Taxi Service Una Himachal Pradesh</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('public/sitemap.xml', xml);

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /api/

# Sitemaps
Sitemap: ${site}/sitemap.xml
`;

fs.writeFileSync('public/robots.txt', robots);
console.log(`sitemap.xml (${urls.length} URLs + images) + robots.txt generated successfully for ${site}`);

