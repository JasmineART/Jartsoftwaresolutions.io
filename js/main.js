/* ============================================================
   JART Software Solutions — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ════════════════════════════════════════════════════════
     1. COPYRIGHT YEAR
  ════════════════════════════════════════════════════════ */
  const yearEl = $('#copyrightYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ════════════════════════════════════════════════════════
     2. STICKY HEADER
  ════════════════════════════════════════════════════════ */
  const header = $('#header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ════════════════════════════════════════════════════════
     3. MOBILE NAVIGATION
  ════════════════════════════════════════════════════════ */
  const navToggle = $('#navToggle');
  const navLinks  = $('#navLinks');

  if (navToggle && navLinks) {
    let isOpen = false;

    const openNav = () => {
      isOpen = true;
      navLinks.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      isOpen = false;
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
      isOpen ? closeNav() : openNav();
    });

    // Close on nav link click
    $$('.nav__link', navLinks).forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeNav();
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen && !header.contains(e.target)) closeNav();
    });
  }

  /* ════════════════════════════════════════════════════════
     4. SMOOTH SCROLL (for browsers that don't support CSS scroll-behavior on anchors)
  ════════════════════════════════════════════════════════ */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
      // Update URL without triggering scroll
      history.pushState(null, '', '#' + id);
    });
  });

  /* ════════════════════════════════════════════════════════
     5. SCROLL-REVEAL (Intersection Observer)
  ════════════════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger cards within a grid
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Stagger cards in grids
    const staggerContainers = [
      '.services__grid',
      '.why-us__grid',
      '.about__cards',
      '.process__steps',
      '.faq__list',
    ];
    staggerContainers.forEach(selector => {
      $$(selector + ' .reveal').forEach((el, i) => {
        el.dataset.delay = i * 80;
      });
    });

    $$('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    // Fallback — show everything immediately
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ════════════════════════════════════════════════════════
     6. ACTIVE NAV HIGHLIGHT on scroll
  ════════════════════════════════════════════════════════ */
  const sections = $$('section[id]');
  const navAnchors = $$('.nav__link[href^="#"]');

  if (sections.length && navAnchors.length) {
    const activateNav = () => {
      const scrollY = window.scrollY + (header ? header.offsetHeight : 80) + 60;
      let current = '';
      sections.forEach(sec => {
        if (sec.offsetTop <= scrollY) current = sec.id;
      });
      navAnchors.forEach(a => {
        a.classList.toggle('nav__link--active', a.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', activateNav, { passive: true });
    activateNav();
  }

  /* ════════════════════════════════════════════════════════
     7. CONTACT FORM — Validation + AJAX Submit
  ════════════════════════════════════════════════════════ */
  const form       = $('#contactForm');
  const submitBtn  = $('#submitBtn');
  const successBox = $('#formSuccess');

  if (!form) return;

  /* ── Field validators ── */
  const validators = {
    firstName: v => v.trim().length >= 2  ? '' : 'Please enter your first name.',
    lastName:  v => v.trim().length >= 2  ? '' : 'Please enter your last name.',
    email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    service:   v => v !== ''              ? '' : 'Please select a service.',
    message:   v => v.trim().length >= 20 ? '' : 'Please provide at least 20 characters about your project.',
  };

  const fieldMap = {
    firstName: $('#firstName', form),
    lastName:  $('#lastName',  form),
    email:     $('#email',     form),
    service:   $('#service',   form),
    message:   $('#message',   form),
  };

  const getError = el => el?.closest('.form__group')?.querySelector('.form__error');

  const showError = (el, msg) => {
    if (!el) return;
    el.classList.toggle('is-error', !!msg);
    const err = getError(el);
    if (err) err.textContent = msg;
  };

  const validateField = (name, el) => {
    if (!el || !validators[name]) return true;
    const msg = validators[name](el.value);
    showError(el, msg);
    return msg === '';
  };

  // Live validation on blur
  Object.entries(fieldMap).forEach(([name, el]) => {
    if (!el) return;
    el.addEventListener('blur', () => validateField(name, el));
    el.addEventListener('input', () => {
      if (el.classList.contains('is-error')) validateField(name, el);
    });
  });

  /* ── Submit handler ── */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    Object.entries(fieldMap).forEach(([name, el]) => {
      if (!validateField(name, el)) valid = false;
    });
    if (!valid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.form__input.is-error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok || response.status === 200) {
        // Show success
        form.reset();
        // Hide form fields, show success message
        $$(
          '.form__row, .form__group, .btn--full, .form__disclaimer',
          form
        ).forEach(el => (el.style.display = 'none'));
        if (successBox) {
          successBox.hidden = false;
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        throw new Error('Server responded with ' + response.status);
      }
    } catch (err) {
      // Graceful fallback — submit the form normally (FormSubmit handles redirect)
      console.warn('AJAX submit failed, falling back to standard submit.', err);
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
  });

  /* ════ 8. FAQ ACCORDION ════ */
  $$('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      const isOpen = item.classList.contains('is-open');
      $$('.faq__item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        const a = document.getElementById(openItem.querySelector('.faq__question').getAttribute('aria-controls'));
        if (a) a.hidden = true;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });

})();
