/* =============================================================================
   Portfolio Scripts
   main.js
============================================================================= */

(function () {

  /* ── THEME TOGGLE ─────────────────────────────────────────────────────── */

  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // Default to dark; respect saved preference
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  if (toggle) {
    toggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }


  /* ── HAMBURGER MENU ───────────────────────────────────────────────────── */

  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {

    // Toggle open/close
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }


  /* ── ACTIVE NAV LINK ──────────────────────────────────────────────────── */

  const allNavLinks = document.querySelectorAll('.nav-links a');
  const current     = location.pathname.split('/').pop() || 'index.html';

  allNavLinks.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

})();