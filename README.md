# investe.com.au

A static, dependency-free site: plain HTML and CSS, no JavaScript, no trackers, no cookies, and fonts self-hosted.

| File | Purpose |
|---|---|
| `index.html` | The page |
| `styles.css` | All styling. **The brand colours are the `:root` tokens at the top of the file.** |
| `404.html` | Not-found page |
| `assets/` | Wordmark SVGs, link-preview image (`og-image.png`), app icon, fonts (SIL OFL) |
| `favicon.*`, `apple-touch-icon.png`, `site.webmanifest` | Browser and phone icons |
| `CNAME`, `.nojekyll` | GitHub Pages custom domain |
| `_headers` | Security headers (Cloudflare Pages / Netlify; GitHub Pages ignores it, and the CSP `<meta>` covers the essentials there) |

## Preview locally

```bash
python3 -m http.server 4173 --directory .
```
Then open http://localhost:4173

## When the final logo arrives (from Claude Design)

1. Replace the colour values in the two `:root` blocks of `styles.css`: one for light mode, one for dark.
2. Replace `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `assets/icon-512.png` and `assets/og-image.png` with the new files. Keep the same names.
3. Optional: the header wordmark is currently live text (`inv<span>este</span>`). To use the final logo artwork instead, replace that `<a class="wordmark">` contents in `index.html` and `404.html` with
   `<img src="/assets/investe-wordmark.svg" alt="investe" width="150" height="38">`, and save the new SVG over `assets/investe-wordmark.svg`.
4. Update the copyright year in the footer each January.
