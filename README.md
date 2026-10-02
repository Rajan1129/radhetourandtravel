# Radhe Una Taxi Service – MERN website

React + Vite + Tailwind (client) · Express + MongoDB (server)

## Run locally
```bash
# 1. API
cd server && cp .env.example .env   # set MONGO_URI, JWT_SECRET, ADMIN_EMAIL/PASSWORD
npm install && npm run dev          # http://localhost:5000

# 2. Website
cd client && cp .env.example .env
npm install && npm run dev          # http://localhost:5173 (proxies /api to :5000)
```

## Production (one server, SEO-ready)
```bash
cd client && npm run build          # also writes sitemap.xml + robots.txt from data/seoPages.js
cd ../server && npm start           # serves client/dist and injects per-page <title>, meta, canonical, JSON-LD
```
Set `SITE_URL` (server) and `VITE_SITE_URL` (client) to the real domain **before building**.

## Before launch checklist
1. Replace `https://your-domain.com` (env files) with the real domain.
2. Add real photos to `client/src/assets/images/` (see README there). Until then a drawn mountain scene is used.
3. Set `VITE_GOOGLE_REVIEW_URL`, `VITE_GOOGLE_MAPS_URL`, `VITE_GOOGLE_MAPS_EMBED_URL` (Google Maps > Share > Embed a map).
4. Have the Privacy/Terms text reviewed by the owner.
5. Submit `/sitemap.xml` in Google Search Console.

## API
| Method | Path | Auth |
|---|---|---|
| POST | /api/enquiries | public, rate-limited, validated |
| GET | /api/enquiries?status=new | Bearer JWT |
| PATCH | /api/enquiries/:id/status | Bearer JWT |
| POST | /api/admin/login | returns JWT |

## Adding an SEO page
Add an object to `client/src/data/seoPages.js`. Route, sitemap, breadcrumbs, FAQ schema and server meta injection all pick it up automatically.
