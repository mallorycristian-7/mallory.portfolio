# Mallory Cristian — Artist & Illustrator Portfolio

A redesigned, dark editorial-style, responsive portfolio with animated visual details, reveal-on-scroll motion, category folders, large artwork cards, a mobile navigation menu and an artwork lightbox.

## Preview on your phone
1. Download and extract the ZIP.
2. Open the extracted folder in Acode.
3. Open `index.html` and tap Preview (▶).
4. Open `gallery.html` to see the portfolio collections.

## Publish on GitHub Pages
Upload the *contents* of this folder to the root of your GitHub repository (so `index.html`, `gallery.html`, `styles.css`, and `script.js` are directly in the repository root). Then open repository **Settings → Pages → Deploy from a branch → main → /(root)** and save.

## Add your real art
Replace or add files in these folders using the exact filenames below. Do not rename the files unless you also change `script.js`.

- `assets/images/colored/artwork-01.jpg`, `artwork-02.jpg`, `artwork-03.jpg`
- `assets/images/sketches/sketch-01.jpg`, `sketch-02.jpg`, `sketch-03.jpg`
- `assets/timelapses/timelapse-01.mp4`, `timelapse-02.mp4`
- `assets/images/covers/book-cover-01.jpg` (**one book-cover slot only**, because you currently have one cover in progress)

Artwork cards are intentionally large. The website has one book-cover slot, not three. The gallery includes four separate collection folders: Colored Art, Sketches & Line Art, Timelapses, and Book Covers. The gallery has been fixed so images use `object-fit: contain` and retain their original proportions in the preview and lightbox. If an expected file is missing, a clear “Add your artwork” placeholder appears instead of a broken image. If you want to add more work later, increase that collection's `count` in the `config` array near the top of `script.js`, then add the next numbered file.

The abstract artwork on the homepage is decorative CSS artwork, not a replacement for your actual portfolio pieces. Your real work will appear in the gallery once you add the files above.

## Website traffic and link sharing
This is a static portfolio, so it cannot automatically tell you every social post, message or website where someone has copied your link. You can use a privacy-conscious analytics service (for example, Google Analytics or Cloudflare Web Analytics) to see visits, referral sources and popular pages, after setting it up. Referral information can be limited by privacy settings and apps. To identify traffic from specific places, share distinct tagged links (UTM links) in different bios/posts. Analytics shows visits from sources, not a guaranteed complete list of every place your link appears. No analytics tracking is installed in this starter version.

## Customize
- Social profile links and email are in `index.html`.
- Colors, typography, motion and responsive layouts are in `styles.css`.
- Gallery filenames and slot counts are in `script.js`.
- The page respects visitors' reduced-motion accessibility settings.
