// Blog index: free-text search and topic filters. A post is shown when it
// matches the search AND at least one selected topic (or no topic is
// selected). The state is mirrored in the URL (?q=…&topic=…) so filtered
// views can be shared and survive a reload.
(function () {
  'use strict';

  var searchBox = document.getElementById('search-box');
  var posts = Array.prototype.slice.call(document.querySelectorAll('[data-post]'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-tag]'));
  var allChip = document.querySelector('.chip[data-tag="all"]');
  var clearButton = document.querySelector('[data-clear]');
  var info = document.getElementById('filter-info');
  var empty = document.querySelector('[data-posts-empty]');
  if (!searchBox || !posts.length) return;

  var active = new Set();
  var labels = {};
  chips.forEach(function (chip) { labels[chip.getAttribute('data-tag')] = chip.textContent.trim(); });

  function normalise(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  var texts = posts.map(function (post) { return normalise(post.textContent); });

  function render(updateUrl) {
    var query = normalise(searchBox.value.trim());
    var visible = 0;
    posts.forEach(function (post, i) {
      var tags = post.getAttribute('data-tags').split(',');
      var tagMatch = active.size === 0 || tags.some(function (t) { return active.has(t); });
      var textMatch = !query || texts[i].indexOf(query) !== -1;
      post.hidden = !(tagMatch && textMatch);
      if (!post.hidden) visible++;
    });

    chips.forEach(function (chip) {
      var tag = chip.getAttribute('data-tag');
      var pressed = tag === 'all' ? active.size === 0 : active.has(tag);
      chip.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });

    var filtered = active.size > 0 || query;
    clearButton.hidden = !filtered;
    empty.hidden = visible !== 0;

    if (!filtered) {
      info.textContent = 'Showing all ' + posts.length + ' posts';
    } else {
      var parts = [];
      if (active.size) parts.push('tagged ' + Array.from(active).map(function (t) { return labels[t] || t; }).join(', '));
      if (query) parts.push('matching “' + searchBox.value.trim() + '”');
      info.textContent = 'Showing ' + visible + ' of ' + posts.length + ' posts ' + parts.join(' and ');
    }

    if (updateUrl && window.history && history.replaceState) {
      var params = new URLSearchParams(location.search);
      if (query) params.set('q', searchBox.value.trim()); else params.delete('q');
      if (active.size) params.set('topic', Array.from(active).join(',')); else params.delete('topic');
      var search = params.toString();
      history.replaceState(null, '', location.pathname + (search ? '?' + search : '') + location.hash);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var tag = chip.getAttribute('data-tag');
      if (tag === 'all') active.clear();
      else if (active.has(tag)) active.delete(tag);
      else active.add(tag);
      render(true);
    });
  });

  var debounce;
  searchBox.addEventListener('input', function () {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(function () { render(true); }, 120);
  });

  clearButton.addEventListener('click', function () {
    active.clear();
    searchBox.value = '';
    render(true);
    (allChip || searchBox).focus();
  });

  // Restore state from the URL.
  var params = new URLSearchParams(location.search);
  if (params.get('q')) searchBox.value = params.get('q');
  (params.get('topic') || '').split(',').forEach(function (t) { if (t && labels[t]) active.add(t); });
  render(false);
})();
