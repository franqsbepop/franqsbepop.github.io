// Site-wide behaviour for the generated pages. Progressive enhancement only:
// every page is complete and usable without JavaScript.
(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Legacy links: sections that used to live on the homepage now live on the
  // Academic page. Old links such as index.html#notes keep working.
  // -------------------------------------------------------------------------
  var LEGACY_HOME_ANCHORS = {
    research: 'academic.html#research',
    teaching: 'academic.html#teaching',
    notes: 'academic.html#notes',
    talks: 'academic.html#talks',
    archive: '#publications',
  };
  function followLegacyAnchor() {
    var hash = decodeURIComponent(location.hash.slice(1));
    if (!hash || !LEGACY_HOME_ANCHORS[hash] || document.getElementById(hash)) return;
    var target = LEGACY_HOME_ANCHORS[hash];
    location.replace(target);
  }
  if (document.body.classList.contains('page-home')) {
    followLegacyAnchor();
    window.addEventListener('hashchange', followLegacyAnchor);
  }

  // -------------------------------------------------------------------------
  // Polite live region for short announcements ("Copied").
  // -------------------------------------------------------------------------
  var live = document.createElement('div');
  live.className = 'visually-hidden';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  function announce(message) {
    live.textContent = '';
    window.setTimeout(function () { live.textContent = message; }, 50);
  }

  // -------------------------------------------------------------------------
  // Copy buttons (email addresses, BibTeX)
  // -------------------------------------------------------------------------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(area);
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy-target]');
    if (!button) return;
    var source = document.getElementById(button.getAttribute('data-copy-target'));
    if (!source) return;
    var text = source.textContent.trim();
    copyText(text).then(function () {
      var label = button.querySelector('[data-copy-label]');
      var original = label ? label.textContent : '';
      button.classList.add('is-copied');
      if (label && !label.classList.contains('visually-hidden')) label.textContent = 'Copied';
      announce('Copied to clipboard');
      window.setTimeout(function () {
        button.classList.remove('is-copied');
        if (label) label.textContent = original;
      }, 2000);
    }, function () {
      announce('Copying failed. Please select the text and copy it manually.');
    });
  });

  // -------------------------------------------------------------------------
  // Profile carousel — follows the WAI-ARIA carousel pattern:
  // auto-rotation pauses on hover, on keyboard focus, when the tab is hidden
  // or the carousel is off-screen, and never starts with reduced motion.
  // -------------------------------------------------------------------------
  function initCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    var picks = Array.prototype.slice.call(root.querySelectorAll('[data-goto]'));
    var toggle = root.querySelector('[data-toggle]');
    var viewport = root.querySelector('[data-viewport]');
    if (slides.length < 2) return;

    var interval = parseInt(root.getAttribute('data-interval'), 10) || 8000;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var index = 0;
    var timer = null;
    var state = { userPaused: false, hover: false, focus: false, hidden: document.hidden, offscreen: false };

    function autoplayAllowed() { return !reducedMotion.matches; }
    function running() {
      return autoplayAllowed() && !state.userPaused && !state.hover && !state.focus && !state.hidden && !state.offscreen;
    }

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle('is-active', active);
        if (active) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
      picks.forEach(function (button, i) {
        button.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function advance() {
      var next = (index + 1) % slides.length;
      var img = slides[next].querySelector('img');
      // Never fade to an image that has not arrived yet.
      if (img && !img.complete) {
        img.addEventListener('load', function () { if (running()) show(next); schedule(); }, { once: true });
        return;
      }
      show(next);
      schedule();
    }

    function schedule() {
      window.clearTimeout(timer);
      timer = null;
      if (running()) timer = window.setTimeout(advance, interval);
      sync();
    }

    function sync() {
      var stopped = !autoplayAllowed() || state.userPaused;
      if (toggle) {
        toggle.hidden = !autoplayAllowed();
        toggle.setAttribute('aria-label', stopped ? 'Play the slideshow' : 'Pause the slideshow');
      }
      if (stopped) root.setAttribute('data-paused', '');
      else root.removeAttribute('data-paused');
      // Announce slide changes only when the user is driving them.
      viewport.setAttribute('aria-live', running() ? 'off' : 'polite');
    }

    picks.forEach(function (button) {
      button.addEventListener('click', function () {
        show(parseInt(button.getAttribute('data-goto'), 10));
        schedule();
      });
    });

    if (toggle) {
      toggle.addEventListener('click', function () {
        state.userPaused = !state.userPaused;
        schedule();
      });
    }

    root.addEventListener('mouseenter', function () { state.hover = true; schedule(); });
    root.addEventListener('mouseleave', function () { state.hover = false; schedule(); });
    root.addEventListener('focusin', function () { state.focus = true; schedule(); });
    root.addEventListener('focusout', function (event) {
      if (!root.contains(event.relatedTarget)) { state.focus = false; schedule(); }
    });
    document.addEventListener('visibilitychange', function () { state.hidden = document.hidden; schedule(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        state.offscreen = !entries[0].isIntersecting;
        schedule();
      }, { threshold: 0.25 }).observe(root);
    }
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', schedule);

    // Keyboard: arrow keys move between slides when a picker has focus.
    root.addEventListener('keydown', function (event) {
      if (!event.target.matches('[data-goto]')) return;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
      picks[index].focus();
      schedule();
    });

    schedule();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), initCarousel);
})();
