// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Generic carousel initializer with dots
function initCarousel(rootId, opts = {}) {
  const root = document.getElementById(rootId);
  if (!root) return;
  const prevBtn = root.querySelector('.prev');
  const nextBtn = root.querySelector('.next');
  const slides = Array.from(root.querySelectorAll('.slide'));
  let index = slides.findIndex((s) => s.classList.contains('active'));
  if (index < 0) index = 0;

  function setActive(i) {
    slides.forEach((s, idx) => {
      const active = idx === i;
      s.classList.toggle('active', active);
      s.setAttribute('aria-hidden', String(!active));
    });
    dots?.forEach((d, di) => d.classList.toggle('active', di === i));
  }

  function next() { index = (index + 1) % slides.length; setActive(index); }
  function prev() { index = (index - 1 + slides.length) % slides.length; setActive(index); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Dots
  let dots = [];
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'dots';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot';
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => { index = i; setActive(index); });
    dotsWrap.appendChild(b);
    dots.push(b);
  });
  root.appendChild(dotsWrap);

  if (opts.autoplay) {
    const interval = opts.interval || 5000;
    let timer = setInterval(next, interval);
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => (timer = setInterval(next, interval)));
  }

  // Keyboard navigation
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  setActive(index);
}

// Initialize carousels
initCarousel('camera-carousel', { autoplay: true, interval: 4500 });
initCarousel('charging-carousel', { autoplay: true, interval: 4500 });
initCarousel('testimonials-carousel', { autoplay: true, interval: 5000 });

// Limited-time offer countdown (72 hours from first visit)
(function initCountdown() {
  const targetKey = 'vivo_offer_end';
  const existing = localStorage.getItem(targetKey);
  const now = Date.now();
  const seventyTwoHours = 72 * 60 * 60 * 1000;
  const end = existing ? parseInt(existing, 10) : now + seventyTwoHours;
  if (!existing) localStorage.setItem(targetKey, String(end));

  const d = document.getElementById('days');
  const h = document.getElementById('hours');
  const m = document.getElementById('minutes');
  const s = document.getElementById('seconds');
  if (!d || !h || !m || !s) return;

  function update() {
    const diff = Math.max(0, end - Date.now());
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    d.textContent = String(days).padStart(2, '0');
    h.textContent = String(hours).padStart(2, '0');
    m.textContent = String(minutes).padStart(2, '0');
    s.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

// Contact form (client-side only)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(contactForm);
  const name = (fd.get('name') || '').toString().trim();
  const email = (fd.get('email') || '').toString().trim();
  const message = (fd.get('message') || '').toString().trim();
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.style.color = '#ffd1d1';
    return;
  }
  formStatus.textContent = 'Thanks! We will get back to you shortly.';
  formStatus.style.color = '#b9ffcc';
  contactForm.reset();
});

// Newsletter
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(newsletterForm);
  const email = (fd.get('newsletter') || '').toString().trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterStatus.textContent = 'Enter a valid email to subscribe.';
    newsletterStatus.style.color = '#ffd1d1';
    return;
  }
  newsletterStatus.textContent = 'Subscribed! Check your inbox for confirmation.';
  newsletterStatus.style.color = '#b9ffcc';
  newsletterForm.reset();
});

// Year in footer
document.getElementById('year').textContent = String(new Date().getFullYear());

// Demo modal
const modal = document.getElementById('demoModal');
const openBtn = document.getElementById('watchDemoBtn');
const closeBtn = modal?.querySelector('.modal-close');
let lastFocusedEl = null;

openBtn?.addEventListener('click', () => {
  lastFocusedEl = document.activeElement;
  modal?.showModal();
  modal?.focus();
});
closeBtn?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (e) => {
  const dialog = e.currentTarget;
  const rect = dialog.getBoundingClientRect();
  const inDialog = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
  if (!inDialog) modal?.close();
});
modal?.addEventListener('close', () => {
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
});

// Close modal with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.open) {
    modal.close();
  }
});

// Theme toggle
(function initTheme() {
  const key = 'theme';
  const btn = document.getElementById('themeToggle');
  const stored = localStorage.getItem(key);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startDark = stored ? stored === 'dark' : prefersDark;
  if (startDark) document.body.classList.add('dark');

  function updateLabel() {
    const dark = document.body.classList.contains('dark');
    if (btn) {
      btn.textContent = dark ? 'Light' : 'Dark';
      btn.setAttribute('aria-pressed', String(dark));
    }
  }

  btn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    localStorage.setItem(key, dark ? 'dark' : 'light');
    updateLabel();
  });

  updateLabel();
})();

// Scrollspy for nav
(function scrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    const offset = 120; // header + margin
    let current = sections[0];
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + scrollPos - offset;
      if (scrollPos >= top) current = sec;
    }
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${current.id}`));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
})();

// Back to top
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const toggle = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  window.addEventListener('load', toggle);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
