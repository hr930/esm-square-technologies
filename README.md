# ESM SQUARE TECHNOLOGIES PVT LTD - Realtime Website

This project is a realtime website for ESM SQUARE TECHNOLOGIES PVT LTD built with:
- Express + Socket.IO backend
- HTML/CSS/JS frontend
- Realtime stats + event stream

## Local run

1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

## Deploy to GitHub Pages (recommended so Google can index)

1. Create GitHub repo (e.g., `esm-square-technologies-website`).
2. Git setup:
   - `git init`
   - `git add .`
   - `git commit -m "Initial realtime site"
   - `git branch -M main`
   - `git remote add origin https://github.com/<your-user>/<your-repo>.git`
   - `git push -u origin main`
3. Install gh-pages (already in package): `npm install`
4. Run: `npm run deploy`
5. Your site will be published at: `https://<your-user>.github.io/<your-repo>/`

## Add Google Search Console (SEO)

1. Go to https://search.google.com/search-console.
2. Add property: your site URL above.
3. Verify domain using `html` or `DNS` for non-GitHub.
4. Add `sitemap.xml` (create file, see below) and submit.
5. Request indexing in URL Inspector.

## Optional: Netlify

1. `npm install -g netlify-cli`
2. `netlify login`
3. `netlify deploy --dir . --prod`

## Sitemap and robots

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://<your-domain></loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Create `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://<your-domain>/sitemap.xml
```
