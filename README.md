# investe.com.au

A single landing page with no dependencies: HTML, CSS and one small script (`main.js`). No trackers, no cookies, and fonts are self-hosted.

Interactions:
- the header wordmark settles into the i_ mark on scroll
- the hero's italic word reveals letter by letter, and the contour artwork drifts and follows the pointer
- the lot plan draws itself in
- the seal ring rotates
- the statement fills in word by word as you scroll, with a highlight lamp under the pointer
- cards glow under the pointer
- the marquee scrolls slowly

All of these are skipped when reduced motion is set. The contour artwork is generated, not a photo.

| File | Purpose |
|---|---|
| `index.html` | The page (logo and hero artwork are inline SVG) |
| `main.js` | Interactions |
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

## Brand

Logo, palette and fonts come from the Claude Design kit, kept in `../Brand/Final - Claude Design/`.
Colours live in the two `:root` blocks at the top of `styles.css`: the kit's light palette, plus a dark-mode palette derived from it.
Update the copyright year in the footer each January.

## Publishing

The site is hosted on **GitHub Pages** from the `investe-au` GitHub account, repo
[investe-au/investe.com.au](https://github.com/investe-au/investe.com.au). It's kept separate from any work account.

- DNS (in Squarespace): `ALIAS @ → investe-au.github.io`, `CNAME www → investe-au.github.io`,
  plus the `_github-pages-challenge-investe-au` TXT record that verifies the domain.
- This folder is the git repo. Its local git config pins the commit identity to
  investe-au's no-reply address and uses a separate GitHub CLI login stored in `~/.config/gh-investe`.

To publish a change:

```bash
cd "/Users/nickestephen/BIRE Dropbox/Nick Estephen/1 - Personal/2 - Investe/Website"
git add -A && git commit -m "Update site" && git push
```

GitHub rebuilds the site within about a minute.
