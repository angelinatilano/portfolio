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

  // Portrait tilt-on-hover
  const portraitWrap = document.querySelector('[data-tilt-wrap]');
  const portrait = document.querySelector('[data-tilt]');
  if (portraitWrap && portrait) {
    portraitWrap.addEventListener('mousemove', (e) => {
      const rect = portraitWrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = `translate(${px * 8}px, ${py * 8}px)`;
    });
    portraitWrap.addEventListener('mouseleave', () => {
      portrait.style.transform = 'translate(0px, 0px)';
    });
  }
});

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
