// Leaf & Bean — Interactions

// IntersectionObserver for reveal animations
const revealItems = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealItems.forEach(el => io.observe(el));

// Parallax effect for hero background
const heroMedia = document.querySelector('.hero-media');
const hero = document.querySelector('.hero');
let lastY = 0;
function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  // Subtle parallax only while hero in view
  if (hero && heroMedia) {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = (rect.top / window.innerHeight) * 20; // 0% to ~20%
      heroMedia.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
  }

  // Back to top button visibility
  const toTop = document.querySelector('.to-top');
  if (y > 320) toTop?.classList.add('show'); else toTop?.classList.remove('show');
}
document.addEventListener('scroll', onScroll, { passive: true });

// Back to top
document.querySelector('.to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header background on scroll (enhanced contrast)
const header = document.querySelector('.site-header');
function onScrollHeader() {
  const y = window.scrollY || window.pageYOffset;
  header.style.background = y > 10
    ? 'color-mix(in oklab, var(--cream) 88%, transparent)'
    : 'color-mix(in oklab, var(--cream) 80%, transparent)';
}
document.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

