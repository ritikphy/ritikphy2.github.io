/* ============================================================
   MAIN.JS
   ------------------------------------------------------------
   Site "engine" - you shouldn't need to edit this file for
   normal content updates (use data.js and index.html for that).
   Runs once the DOM is ready.
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileDrawer();
  initActiveNavLink();
  initScrollReveal();
  initHero();
  initTrajectories();
  initProjectFilters();
  initBackToTop();
  initFooterYear();
  initExpandableCards(); 
});


/* ---------- Nav background swap on scroll ---------- */
/* Only the Home page has a hero to scroll past. Every other page has
   no hero banner, so the nav should just be solid from the start there
   (otherwise light nav text would sit unreadable on the light page bg). */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const hero = document.querySelector('.hero');
  if (!hero) {
    nav.classList.add('nav--scrolled');
    return;
  }

  const toggle = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    // switch once the hero has scrolled (mostly) out of view, not at a
    // fixed fraction of the screen — so it tracks the hero's real height
    nav.classList.toggle('nav--scrolled', heroBottom < 80);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  window.addEventListener('resize', toggle, { passive: true });
}

/* ---------- Tap-to-expand research/project cards on touch devices ---------- */
function initExpandableCards() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (!isTouch) return; // desktop already gets this via CSS :hover, nothing to do

  const cards = document.querySelectorAll('.research-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const alreadyOpen = card.classList.contains('is-expanded');
      cards.forEach(c => c.classList.remove('is-expanded'));
      if (!alreadyOpen) card.classList.add('is-expanded');
    });
  });
}

/* ---------- Mobile drawer open / close ---------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav__toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  if (!toggleBtn || !drawer || !overlay) return;

  const open = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-locked');
  };

  const close = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-locked');
  };

  toggleBtn.addEventListener('click', () => {
    drawer.classList.contains('is-open') ? close() : open();
  });

  overlay.addEventListener('click', close);
  document.getElementById('drawerClose')?.addEventListener('click', close);

  // close after tapping a link so the drawer doesn't sit open over the new section
  drawer.querySelectorAll('.mobile-drawer__link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Esc key closes it too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}


/* ---------- Highlight the current page in the nav ---------- */
/* Each section now lives on its own page (e.g. research.html), so
   "active" just means "this link points to the page we're on" —
   no more scroll-tracking needed. */
function initActiveNavLink() {
  const deskLinks = document.querySelectorAll('.nav__link');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link');
  if (!deskLinks.length && !drawerLinks.length) return;

  // "" or "/" (root deploys, e.g. GitHub Pages user site) counts as index.html
  const current = location.pathname.split('/').pop() || 'index.html';

  [...deskLinks, ...drawerLinks].forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === current);
  });
}


/* ---------- Fade-up reveal as sections scroll into view ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // animate in once, not every scroll pass
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}


/* ---------- Hero: random background image + random quote ---------- */
function initHero() {
  const data = window.SITE_DATA;
  if (!data) return;

  const imgEl = document.getElementById('heroImage');
  const quoteEl = document.getElementById('heroQuoteText');
  const authorEl = document.getElementById('heroQuoteAuthor');

  if (imgEl && data.HERO_IMAGES?.length) {
    const pick = data.HERO_IMAGES[Math.floor(Math.random() * data.HERO_IMAGES.length)];
    imgEl.src = pick;
  }

  if (quoteEl && authorEl && data.QUOTES?.length) {
    const q = data.QUOTES[Math.floor(Math.random() * data.QUOTES.length)];
    quoteEl.textContent = q.text;
    authorEl.textContent = q.author;
  }
}


/* ---------- Ambient particle-trajectory SVG (hero) ---------- */
/* Generates soft curved "worldlines" reminiscent of tracks in a bubble
   chamber / light-cone diagram. Purely decorative, so it fails silently. */
function initTrajectories() {
  document.querySelectorAll('.hero__trajectories').forEach(container => {
    if (container.dataset.built === 'true') return;
    buildTrajectorySVG(container);
    container.dataset.built = 'true';
  });
}

function buildTrajectorySVG(container) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const W = 1600, H = 900;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  const lineCount = 11;
  for (let i = 0; i < lineCount; i++) {
    const y0 = Math.random() * H;
    const y1 = Math.random() * H;
    const x1 = W * (0.25 + Math.random() * 0.5);
    const y2 = Math.random() * H;

    const path = document.createElementNS(svgNS, 'path');
    const d = `M ${-50} ${y0} C ${x1 * 0.5} ${y1}, ${x1} ${y2}, ${W + 50} ${Math.random() * H}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', i % 4 === 0 ? '#B8925A' : '#EDEBFB');
    path.setAttribute('stroke-width', i % 4 === 0 ? '1.1' : '0.6');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', (0.15 + Math.random() * 0.35).toFixed(2));

    // slow "drawing in" animation on first paint
    const length = 2600;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.animation = `drawLine 2.6s ${(i * 0.12).toFixed(2)}s cubic-bezier(0.16,1,0.3,1) forwards`;

    svg.appendChild(path);
  }

  // a couple of small drifting "particles" along two of the lines
  for (let i = 0; i < 3; i++) {
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', '2.4');
    dot.setAttribute('fill', '#B8925A');
    dot.setAttribute('opacity', '0.8');
    const anim = document.createElementNS(svgNS, 'animateMotion');
    anim.setAttribute('dur', `${14 + i * 6}s`);
    anim.setAttribute('repeatCount', 'indefinite');
    anim.setAttribute('path', `M ${-50} ${Math.random() * H} C ${W * 0.4} ${Math.random() * H}, ${W * 0.7} ${Math.random() * H}, ${W + 50} ${Math.random() * H}`);
    dot.appendChild(anim);
    svg.appendChild(dot);
  }

  // inject the keyframe once
  if (!document.getElementById('trajectory-keyframes')) {
    const style = document.createElement('style');
    style.id = 'trajectory-keyframes';
    style.textContent = `@keyframes drawLine { to { stroke-dashoffset: 0; } }`;
    document.head.appendChild(style);
  }

  container.innerHTML = '';
  container.appendChild(svg);
}


/* ---------- Projects: simple tag filtering ---------- */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}


/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ---------- Footer year, kept current automatically ---------- */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}
