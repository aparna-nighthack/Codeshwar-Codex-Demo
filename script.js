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
function initCarousel(rootId, opts = {} {
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

// Close any open dialog with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]')?.forEach((d) => {
      if (typeof d.close === 'function') d.close();
    });
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

// Scroll reveal animations
(function revealOnScroll() {
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('show'));
    return;
  }
  const ob = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('show'); ob.unobserve(e.target); }
  }, { threshold: 0.15 });
  items.forEach((el) => ob.observe(el));
})();

// Scroll progress bar
(function progressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  function update() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('load', update);
})();

// Device search filter
(function deviceSearch() {
  const input = document.getElementById('deviceSearch');
  const status = document.getElementById('deviceSearchStatus');
  const cards = Array.from(document.querySelectorAll('.devices .card'));
  if (!input || cards.length === 0) return;
  function normalize(s) { return s.toLowerCase(); }
  function textOf(card) { return (card.querySelector('h3')?.textContent + ' ' + card.querySelector('.specs')?.textContent) || ''; }
  function update() {
    const q = normalize(input.value.trim());
    let visible = 0;
    for (const c of cards) {
      const match = q === '' || normalize(textOf(c)).includes(q);
      c.style.display = match ? '' : 'none';
      if (match) visible++;
    }
    if (status) status.textContent = q ? `${visible} result${visible === 1 ? '' : 's'} for “${input.value}”` : '';
  }
  input.addEventListener('input', update);
})();

// Compare selection and modal
(function compareDevices() {
  const checks = Array.from(document.querySelectorAll('.compare-check'));
  if (checks.length === 0) return;
  const bar = document.getElementById('compareBar');
  const openBtn = document.getElementById('openCompare');
  const clearBtn = document.getElementById('clearCompare');
  const countSpan = document.getElementById('compareCount');
  const modal = document.getElementById('compareModal');
  const closeBtn = modal?.querySelector('.modal-close');
  const table = document.getElementById('comparisonTable');
  const selected = new Set();

  function updateBar() {
    const count = selected.size;
    countSpan.textContent = String(count);
    bar.classList.toggle('hidden', count === 0);
    openBtn.disabled = count < 2;
  }

  function getCardData(card) {
    const name = card.querySelector('h3')?.textContent?.trim() || 'Unknown';
    const specs = Array.from(card.querySelectorAll('.specs li')).map((li) => li.textContent?.trim() || '');
    return { name, specs };
  }

  function renderComparison() {
    if (!table) return;
    table.innerHTML = '';
    const cols = Array.from(selected).map((card) => getCardData(card));
    cols.forEach((col) => {
      const div = document.createElement('div');
      div.className = 'col';
      const h = document.createElement('h4');
      h.textContent = col.name;
      const ul = document.createElement('ul');
      col.specs.forEach((s) => { const li = document.createElement('li'); li.textContent = s; ul.appendChild(li); });
      div.appendChild(h); div.appendChild(ul);
      table.appendChild(div);
    });
  }

  checks.forEach((chk) => {
    chk.addEventListener('change', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      if (chk.checked) {
        if (selected.size >= 2) { chk.checked = false; return; }
        selected.add(card);
      } else {
        selected.delete(card);
      }
      updateBar();
    });
  });

  openBtn?.addEventListener('click', () => {
    renderComparison();
    modal?.showModal();
  });
  clearBtn?.addEventListener('click', () => {
    selected.clear();
    checks.forEach((c) => (c.checked = false));
    updateBar();
  });
  closeBtn?.addEventListener('click', () => modal?.close());
})();
