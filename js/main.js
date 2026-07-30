// Scroll-reveal for elements marked with .reveal
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));

    // Safety fallback in case IntersectionObserver never fires (short page, layout timing)
    setTimeout(() => revealEls.forEach((el) => el.classList.add('is-visible')), 1800);
  }

  initPortraitParallax();
  initNavToggle();
  initScrollChrome();
});

// Scroll progress bar + condensed nav state, driven from one rAF-throttled listener
function initScrollChrome() {
  const nav = document.querySelector('.nav');
  const bar = document.querySelector('[data-scroll-progress]');
  if (!nav && !bar) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;

    if (nav) nav.classList.toggle('is-scrolled', y > 12);

    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

// Portrait scroll parallax — image drifts vertically as the About section scrolls through view
function initPortraitParallax() {
  const portraitWrap = document.querySelector('[data-tilt-wrap]');
  const portrait = document.querySelector('[data-tilt]');
  if (!portraitWrap || !portrait) return;

  const maxShift = 26;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = portraitWrap.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const progress = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / (window.innerHeight / 2)));
    portrait.style.transform = `translateY(${progress * maxShift}px)`;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

// Mobile nav hamburger toggle
function initNavToggle() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    toggle.classList.toggle('is-open', open);
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

// Generic list <-> detail toggler used on Thinking and Work pages.
// Expects: [data-open-detail="ID"] triggers, [data-grid-view], [data-detail="ID"], [data-close-detail]
function initDetailToggle() {
  const gridView = document.querySelector('[data-grid-view]');
  const details = document.querySelectorAll('[data-detail]');
  const openers = document.querySelectorAll('[data-open-detail]');
  const closers = document.querySelectorAll('[data-close-detail]');

  const openDetail = (id) => {
    if (gridView) gridView.classList.add('is-hidden');
    details.forEach((d) => d.classList.toggle('is-open', d.dataset.detail === id));
    window.scrollTo(0, 0);
  };

  const closeDetail = () => {
    details.forEach((d) => d.classList.remove('is-open'));
    if (gridView) gridView.classList.remove('is-hidden');
    window.scrollTo(0, 0);
  };

  openers.forEach((el) => {
    el.addEventListener('click', () => openDetail(el.dataset.openDetail));
  });
  closers.forEach((el) => {
    el.addEventListener('click', closeDetail);
  });
}

// Comment form (client-side only, matches original in-memory behavior)
function initCommentForms() {
  document.querySelectorAll('[data-comment-form]').forEach((form) => {
    const textarea = form.querySelector('textarea');
    const submitBtn = form.querySelector('[data-submit-comment]');
    const list = form.querySelector('[data-comment-list]');

    submitBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) return;
      const item = document.createElement('div');
      item.className = 'comment-item';
      const p = document.createElement('p');
      p.textContent = text;
      const span = document.createElement('span');
      span.textContent = 'just now';
      item.appendChild(p);
      item.appendChild(span);
      list.prepend(item);
      textarea.value = '';
    });
  });
}
