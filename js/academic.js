// Academic page: highlights the current section in the sticky in-page
// navigation, and filters the notes library.
(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // In-page navigation
  // -------------------------------------------------------------------------
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-subnav-link]'));
  var list = document.querySelector('.subnav__list');
  var sections = links
    .map(function (link) { return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function offset() {
    var styles = getComputedStyle(document.documentElement);
    return parseFloat(styles.scrollPaddingTop) || 120;
  }

  var current = -1;
  function update() {
    var line = offset() + 8;
    var active = -1;
    sections.forEach(function (section, i) {
      if (section.getBoundingClientRect().top <= line) active = i;
    });
    // At the very bottom of the page, the last section is the current one.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sections.length - 1;
    if (active === current) return;
    current = active;
    links.forEach(function (link, i) {
      if (i === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    // Keep the active item visible in the horizontally scrolling bar.
    if (active >= 0 && list && list.scrollWidth > list.clientWidth) {
      var link = links[active];
      var left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
      list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // -------------------------------------------------------------------------
  // Notes library search
  // -------------------------------------------------------------------------
  var library = document.querySelector('[data-notes]');
  if (!library) return;
  var input = library.querySelector('[data-notes-search]');
  var status = library.querySelector('[data-notes-status]');
  var empty = library.querySelector('[data-notes-empty]');
  var notes = Array.prototype.slice.call(library.querySelectorAll('[data-note]'));
  var subjects = Array.prototype.slice.call(library.querySelectorAll('[data-subject]'));
  var shelves = Array.prototype.slice.call(library.querySelectorAll('[data-shelf]'));

  function normalise(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function filter() {
    var terms = normalise(input.value).split(/\s+/).filter(Boolean);
    var shown = 0;
    notes.forEach(function (note) {
      var haystack = normalise(note.getAttribute('data-search'));
      var match = terms.every(function (term) { return haystack.indexOf(term) !== -1; });
      note.hidden = !match;
      if (match) shown++;
    });
    subjects.forEach(function (subject) {
      subject.hidden = !subject.querySelector('[data-note]:not([hidden])');
    });
    shelves.forEach(function (shelf) {
      shelf.hidden = !shelf.querySelector('[data-subject]:not([hidden])');
    });
    empty.hidden = shown !== 0;
    status.textContent = terms.length ? shown + ' of ' + notes.length + ' notes match.' : '';
  }

  input.addEventListener('input', filter);
})();
