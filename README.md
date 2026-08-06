# Non-Ordinary Realities

A sourced field guide to non-ordinary reality — spanning anthropology (Castaneda, core shamanism), transpersonal psychology (Grof), neuroscience (Carhart-Harris's entropic brain), evolutionary cognition (Hoffman's interface theory), Norse cosmology (Yggdrasil), and philosophy (Kant, Schopenhauer, and the Western esoteric traditions).

## Stack

Static HTML/CSS/JS. No build step, no dependencies, no framework. A single-page site with alternating "ink" (dark) and "vellum" (nebula) sections, an animated canvas starfield, and a Google tag wired with Consent Mode v2 — analytics only fires after the visitor accepts the cookie banner.

## Structure

- `index.html` — the full single-page site, plus the Google tag and JSON-LD schema in `<head>`
- `css/style.css` — design tokens and all styling
- `js/script.js` — consent banner logic, nav reveal, and the starfield canvas
- `404.html` — custom not-found page
- `sitemap.xml`, `robots.txt`, `.nojekyll` — deployment/SEO infrastructure
- `assets/` — favicons, OG image, and the Yggdrasil artwork (WebP + JPEG)

## Local development

No build step required — open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```
python3 -m http.server 8000
```

## Deployment (GitHub Pages)

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait 1–3 minutes for the first deploy. The site will be live at `https://<username>.github.io/<repo-name>/`.
4. Update the canonical URL, Open Graph URLs, and the JSON-LD `url`/`mainEntityOfPage` fields in `index.html` to match your actual deployed URL if it differs from the placeholder already in the file.
5. Submit `sitemap.xml` to Google Search Console for faster indexing.

## License

MIT — see `LICENSE`.
