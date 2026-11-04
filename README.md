# JF Network Solutions LLC — Landing page

Static bilingual (ES/EN) site, served by GitHub Pages at `jfnetworksolutions.com` (see `CNAME`).

- `index.html` — page markup (Spanish by default)
- `assets/js/i18n.js` — all Spanish/English text
- `assets/js/main.js` — animations, language switch, contact form. **Set `CONFIG.email` at the top to enable email.**
- `assets/css/styles.css` — design tokens (brand colors) at the top
- `assets/img/logo-mark.svg` — vector JF mark; `favicon.svg`; `logo-original.jpeg` is the source logo

Language can be forced with `?lang=en` or `?lang=es`.

## Photos

`assets/img/photos/` contains stock photos from [Unsplash](https://unsplash.com) (Unsplash License — free for commercial use, no attribution required). Replace them with real JF project photos whenever available, keeping the same file names.

## Delivery page and print kit

- `/entrega/` — client handoff page (not indexed): deliverables, email account, Google Business verification guide, downloads, brand kit, DNS and checklist.
- `marketing/` — sources for the 3 flyers and the business card. Regenerate with:
  `python3 marketing/build.py && node marketing/render.js` (outputs to `entrega/descargas/`).
