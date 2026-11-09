// Long inline formulas cannot line-break, so on narrow screens they push the
// page sideways. After MathJax has typeset the page, mark only the formulas
// that are wider than their line so they scroll within the text column
// instead (see `.mjx-scroll` in css/style.css). Short formulas are untouched,
// keeping their normal baseline alignment.
(function () {
  'use strict';

  function fit() {
    var containers = document.querySelectorAll('mjx-container');
    for (var i = 0; i < containers.length; i++) {
      var c = containers[i];
      c.classList.remove('mjx-scroll');
      var parent = c.parentElement;
      if (!parent) continue;
      var styles = getComputedStyle(parent);
      var available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      if (c.getBoundingClientRect().width > available + 1) c.classList.add('mjx-scroll');
    }
  }

  function start() {
    var ready = window.MathJax && MathJax.startup && MathJax.startup.promise;
    (ready || Promise.resolve()).then(function () {
      fit();
      var timer;
      window.addEventListener('resize', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(fit, 150);
      });
    });
  }

  // MathJax is loaded asynchronously; the load event waits for it.
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
