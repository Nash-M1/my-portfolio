/* =============================================================================
   Portfolio Scripts
   main.js — Enhanced with additional features
============================================================================= */

(function () {

  /* ── THEME TOGGLE ─────────────────────────────────────────────────────── */

  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');

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
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
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


  /* ── SCROLL PROGRESS BAR ──────────────────────────────────────────────── */

  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: var(--accent, #e8d5b0);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });


  /* ── BACK TO TOP BUTTON ───────────────────────────────────────────────── */

  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border, rgba(255,255,255,0.12));
    background: var(--bg, #0f0e0d);
    color: var(--text, #f5f0e8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 999;
    pointer-events: none;
  `;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(10px)';
      backToTop.style.pointerEvents = 'none';
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', function () {
    backToTop.style.background = 'var(--accent, #e8d5b0)';
    backToTop.style.color = 'var(--bg, #0f0e0d)';
    backToTop.style.borderColor = 'var(--accent, #e8d5b0)';
  });
  backToTop.addEventListener('mouseleave', function () {
    backToTop.style.background = 'var(--bg, #0f0e0d)';
    backToTop.style.color = 'var(--text, #f5f0e8)';
    backToTop.style.borderColor = 'var(--border, rgba(255,255,255,0.12))';
  });


  /* ── CUSTOM CURSOR ────────────────────────────────────────────────────── */

  // Only on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor     = document.createElement('div');
    const cursorDot  = document.createElement('div');

    cursor.id = 'custom-cursor';
    cursorDot.id = 'custom-cursor-dot';

    cursor.style.cssText = `
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1px solid var(--accent, #e8d5b0);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease;
      opacity: 0;
      mix-blend-mode: difference;
    `;

    cursorDot.style.cssText = `
      position: fixed;
      width: 5px;
      height: 5px;
      background: var(--accent, #e8d5b0);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.05s ease;
      opacity: 0;
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    // Smooth lag for outer ring
    function animateCursor() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow cursor on hoverable elements
    const hoverTargets = 'a, button, [role="button"], .project-card, .toggle, input, textarea';
    document.querySelectorAll(hoverTargets).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.width  = '54px';
        cursor.style.height = '54px';
        cursor.style.borderColor = 'var(--accent, #e8d5b0)';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.width  = '36px';
        cursor.style.height = '36px';
      });
    });

    document.addEventListener('mouseleave', function () {
      cursor.style.opacity    = '0';
      cursorDot.style.opacity = '0';
    });
  }


  /* ── SCROLL REVEAL ANIMATIONS ─────────────────────────────────────────── */

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
  `;
  document.head.appendChild(style);

  // Elements to animate
  const revealSelectors = [
    '.project-card',
    '.about-bio p',
    '.about-stats > div',
    '.skills-col',
    '.resume-item',
    '.resume-col h4',
    '.resume-download',
    '.contact-bio',
    '.info-label',
    '.info-value',
    '.contact-social',
    '.form-group',
    '.section-label',
    '.section-title',
    '.footer-brand',
    '.footer-col'
  ];

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      // Never touch elements inside nav or footer nav
      if (el.closest('nav') || el.closest('.nav-links')) return;
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    });
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── TYPING ANIMATION (Hero Name) ─────────────────────────────────────── */

  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const originalHTML = heroName.innerHTML;
    // Extract plain text lines (preserving <br> and <span>)
    const fullText = heroName.innerText; // "KENNETH\nNASH\nMALLARI."
    const lines    = fullText.split('\n');

    heroName.innerHTML = '';
    heroName.style.minHeight = '1em'; // prevent layout jump

    let lineIdx = 0;
    let charIdx = 0;

    function typeLine() {
      if (lineIdx >= lines.length) {
        // Re-inject the dot span at the end
        heroName.innerHTML = heroName.innerHTML.replace(/\.$/, '<span class="dot">.</span>');
        return;
      }

      const line    = lines[lineIdx];
      const isLast  = lineIdx === lines.length - 1;
      const display = isLast ? line.replace('.', '') : line;

      if (charIdx < display.length) {
        if (charIdx === 0 && lineIdx > 0) heroName.innerHTML += '<br>';
        heroName.innerHTML += display[charIdx];
        charIdx++;
        setTimeout(typeLine, 65);
      } else {
        if (isLast) {
          heroName.innerHTML += '<span class="dot">.</span>';
        }
        lineIdx++;
        charIdx = 0;
        setTimeout(typeLine, isLast ? 0 : 120);
      }
    }

    // Small delay before starting
    setTimeout(typeLine, 400);
  }


  /* ── GITHUB API — Live Repo Stats ─────────────────────────────────────── */

  // Fetch public repo count from GitHub and update stat on about page
  const statNums = document.querySelectorAll('.stat-num');
  // Find the "Projects" stat card
  statNums.forEach(function (el) {
    const label = el.nextElementSibling;
    if (label && label.textContent.trim() === 'Projects') {
      // Show loading state
      const originalVal = el.textContent;
      el.textContent = '...';

      fetch('https://api.github.com/users/Nash-M1')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && typeof data.public_repos === 'number') {
            // Animate count up
            const target  = data.public_repos;
            let current   = 0;
            const step    = Math.ceil(target / 20);
            const counter = setInterval(function () {
              current = Math.min(current + step, target);
              el.textContent = current + '+';
              if (current >= target) clearInterval(counter);
            }, 50);
          } else {
            el.textContent = originalVal;
          }
        })
        .catch(function () {
          el.textContent = originalVal; // fallback to original
        });
    }
  });


  /* ── NAV SCROLL SHRINK ────────────────────────────────────────────────── */

  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.webkitBackdropFilter = 'blur(16px)';
      } else {
        nav.style.backdropFilter = '';
        nav.style.webkitBackdropFilter = '';
      }
    });
  }


  /* ── PROJECT CARD HOVER TILT (micro-interaction) ──────────────────────── */

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) *  4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

})();