/* MK Klavier Art – Homepage Scripts */
'use strict';

// ── Year in footer ────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Header scroll shadow ──────────────────────────────────
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
  scrollTopBtn.hidden = window.scrollY < 400;
}
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile burger ─────────────────────────────────────────
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

// Close nav when a link is clicked (mobile)
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Close nav on outside click
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ── Scroll-to-top ─────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Intersection Observer – fade-up animations ────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const targets = document.querySelectorAll(
    '.service-card, .process__step, .review-card, .usp-bar__item, .areas__column, .about__content, .about__visual, .cta-section__content, .contact-form'
  );

  targets.forEach(el => el.classList.add('fade-up'));

  // Stagger siblings within grid parents
  document.querySelectorAll('.services__grid, .reviews__grid, .process__steps, .usp-bar__list, .areas__grid').forEach(parent => {
    parent.classList.add('stagger');
    Array.from(parent.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ── Smooth scroll for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Contact form – basic validation & feedback ────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name  = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    let valid = true;

    [name, phone].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#E53E3E';
        valid = false;
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });

    if (!valid) {
      name.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Anfrage gesendet – wir melden uns bald!';
    btn.disabled = true;
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    btn.style.color = '#fff';
  });
}
