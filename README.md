# Ritik Dubey — Academic Website

A clean, multi-page academic website built for a physics PhD application:
a Home page with a rotating hero background + quote and a short intro,
plus a dedicated page each for About (bio + education timeline), Research,
Projects, Publications and Blog — all sharing the same nav bar, mobile
drawer and footer. There's no separate Contact page; contact links
(email, LinkedIn, GitHub, Scholar, ORCID) live in the site-wide footer
instead, so they're reachable from every page without a click-through.

No build tools, no framework, no dependencies to install — it's plain
HTML/CSS/JS, so it runs by opening `index.html` and deploys anywhere that
can serve static files (GitHub Pages, Netlify, your university server).

---

## 1. Folder structure

```
academic-website/
├── index.html                 ← Home: hero + short intro
├── about.html                 ← About: bio + education timeline
├── research.html              ← Research interests
├── projects.html              ← Projects (with the filter bar)
├── publications.html          ← Publications
├── blog.html                  ← Blog
├── README.md                  ← you are here
├── assets/
│   ├── css/
│   │   ├── variables.css      ← colours, fonts, spacing — edit this first
│   │   ├── base.css           ← reset + base typography (rarely needs edits)
│   │   ├── style.css          ← every section's styling, in page order
│   │   └── responsive.css     ← mobile/tablet breakpoints
│   ├── js/
│   │   ├── data.js            ← EDIT: your quotes + hero image list
│   │   └── main.js            ← site behaviour (rarely needs edits)
│   ├── images/
│   │   ├── hero/               ← background photos for the hero section
│   │   ├── profile/             ← your headshot
│   │   ├── projects/            ← optional images for project/blog cards
│   │   └── icons/                ← favicon
│   └── documents/                ← put your CV.pdf here
```

**Rule of thumb:** content lives in each page's own `.html` file and in
`assets/js/data.js`. Design lives in `assets/css/variables.css`, shared
across every page. You will rarely need to touch `base.css` or `main.js`.

### Every page shares the same nav, drawer and footer

Since there's no build step, the nav bar, mobile drawer and footer are
duplicated at the top/bottom of each `.html` file rather than pulled from
one shared partial. **If you add, rename, or reorder a page, or change a
social link, update it in all six files** — search for the nav's
`<div class="nav__links">` block across the project to find every copy.
The "active" highlight on the current page's nav link is automatic
(handled in `main.js`, based on the current filename) — you don't need to
edit that by hand.

---

## 2. Preview it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Opening `index.html`
directly by double-clicking also mostly works, but a local server avoids
a couple of browser quirks with loading local files.)

---

## 3. Add your own content

### Your name, bio, nav brand
The nav brand ("Ritik Dubey") appears at the top of all six pages —
change it in each file's `<nav class="nav">` block. Your intro bio lives
in `index.html`; your fuller About narrative and education timeline live
in `about.html`. The footer copyright line is likewise repeated at the
bottom of every page.

### Your photo
In `index.html`, replace `assets/images/profile/profile-placeholder.svg`
with a real photo, e.g. `profile.jpg`, then update the `src` on the
`.intro__photo` `<img>` to match. A 4:5 portrait crop (taller than wide)
fits the layout best.

### Hero background photos
1. Add your photo(s) to `assets/images/hero/` (1900px+ wide recommended).
2. Open `assets/js/data.js` and add the filename(s) to the `HERO_IMAGES`
   array. One is picked at random every time `index.html` (Home) loads —
   the hero only exists on that one page.
3. You can delete the three generated placeholder SVGs once you have at
   least one real photo, or just leave them mixed in.

### Quotes
Also in `assets/js/data.js` — the `QUOTES` array. Each entry is
`{ text: "...", author: "..." }`. Add, remove, or rewrite freely; one is
picked at random on every Home page load, independent of the hero image.

### Research interests
Edit `research.html`. There are four `.research-card` blocks — rewrite
the title/text in each, or copy a block to add a fifth.

### Projects
Edit `projects.html`. Each `.project-card` is a self-contained template —
copy one, edit the tag / title / description / link, and set
`data-category` to match one of the filter buttons above it
(`notes`, `internship`, `research`, `course`) so filtering keeps working.
Add a `<img>` inside `.project-card__media` if you want a real image
there instead of the default icon.

### Publications
Edit `publications.html`. It ships with a clean "nothing yet" empty
state. When you have a first paper: delete the `.empty-state` div and
uncomment the `.pub-item` template right below it (instructions are in
the HTML comment) — duplicate that block per publication.

### Blog
Edit `blog.html` — same pattern as Publications. Delete the empty state
once you have a first post, and duplicate the commented-out `.blog-card`
template.

### Contact links (email / LinkedIn / GitHub / Scholar / ORCID)
There's no separate Contact page — these links live directly in the
site-wide footer (`.footer__socials`, near the bottom of every page's
`<footer>` block) so they're one click away from anywhere on the site.
**Also update the same three links (email, LinkedIn, GitHub) in the
mobile drawer footer** (search `mobile-drawer__footer`) so the slide-in
mobile menu stays in sync. Both blocks are repeated on every page, so
update them in all six files.

### CV download button
Drop your CV into `assets/documents/CV.pdf` (exact filename) and the
"Download CV" button on the Home page's Intro section will work
immediately. The "Get in touch" button next to it opens your email
client directly (`mailto:`) — update the address in `index.html` if it
ever changes; keep it matching the footer's email icon.

### Adding a new page
Copy the file closest to what you need, keep its nav/drawer/footer
markup as-is (the links already cover every page), swap out the
`<main>` content and the `<title>`/meta tags, and add a link to it in
the `nav__links` and `mobile-drawer__links` blocks of **all** pages,
this new one included.

---

## 4. Customize the look

Almost every colour and font is a variable in `assets/css/variables.css`.
For example, to change the accent colour from brass/gold to something
else, change this one line and it updates everywhere (buttons, links,
underlines, icons):

```css
--color-accent: #B8925A;   /* try a different hex here */
```

Fonts are loaded from Google Fonts in the `<head>` of every page
(Fraunces for headings/quotes, Inter for body text, IBM Plex Mono for
small labels). If you want different typefaces, swap the `<link>` in
each page's `<head>` and the `--font-*` variables in `variables.css`
together.

---

## 5. Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `yourname.github.io` for a
   root domain, or any name for a project site).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch →
   `main` / `root`** → Save.
4. Your site will be live at `https://your-username.github.io/your-repo/`
   (or `https://yourname.github.io/` if you used the special repo name)
   within a minute or two.

No build step is required — GitHub Pages serves the HTML/CSS/JS as-is.

---

## 6. Notes

- The current page's nav link (desktop and mobile) is highlighted
  automatically — `main.js` compares each link's `href` to the current
  filename, so you don't need to mark anything active by hand.
- Every page except Home has no hero banner, so the nav there loads
  already in its solid "scrolled" state (see `initNavScroll` in
  `main.js`) rather than transparent-over-an-image.
- The animated line-and-star background is generated in the browser
  (`buildTrajectorySVG` in `main.js`), so it's free — no image assets
  needed for that effect. It currently only appears in the Home page's
  hero; call `initTrajectories()` on any other `.your-class__trajectories`
  container if you want to reuse it elsewhere.
- Motion respects `prefers-reduced-motion` — visitors with that OS
  setting enabled get a static, non-animated version automatically.
- The quotes shipped in `data.js` are widely-quoted lines from historical
  physicists (Wheeler, Feynman, Bohr, Einstein, Curie, etc.) — swap in
  your own favourites any time.
