# Non-Ordinary Realities

A sourced field guide to non-ordinary reality — spanning anthropology (Castaneda, core shamanism), transpersonal psychology (Grof), neuroscience (Carhart-Harris's entropic brain), evolutionary cognition (Hoffman's interface theory), and philosophy (Kant, Schopenhauer, and the Western esoteric traditions).

Live: https://sauerninja.github.io/Non-Ordinary-Realities/

## Stack
Static HTML/CSS/JS. No build step, no dependencies. GA4 wired with Google Consent Mode v2 (analytics stays off until the visitor accepts the cookie banner).

## Structure
- `index.html` — the full single-page site
- `css/style.css` — design tokens + all styling
- `js/script.js` — consent banner, GA4 loader, nav behavior
- `404.html` — custom not-found page
- `sitemap.xml`, `robots.txt`, `.nojekyll` — deployment/SEO infra
- `assets/` — favicons, OG image

## Setup
1. Replace `G-XXXXXXXXXX` in `js/script.js` with your real GA4 Measurement ID.
2. Enable GitHub Pages on this repo (Settings → Pages → deploy from `main`, root).
3. Update canonical/OG URLs in `index.html` if the repo name or username changes.

## License
MIT — see `LICENSE`.
