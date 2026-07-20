/* Frutiger Aero theme — Y2K visitor counter & small touches */
(function () {
  'use strict';

  // ---- fake millennium visitor counter --------------------
  function pad(n, w) { return String(n).padStart(w, '0'); }
  document.querySelectorAll('.y2k-counter').forEach(function (el) {
    var start = parseInt(el.dataset.start || '0', 10);
    var visits = 1;
    try {
      visits = (parseInt(localStorage.getItem('aero-visits') || '0', 10) || 0) + 1;
      localStorage.setItem('aero-visits', String(visits));
    } catch (e) { /* private mode — counter just shows the base value */ }
    el.textContent = pad(start + visits, 6);
  });

  // ---- retro document title sparkle ------------------------
  // (blink on unfocus, like an IM client from 2004)
  var originalTitle = document.title;
  var blinkTimer = null;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      var on = false;
      blinkTimer = setInterval(function () {
        document.title = on ? originalTitle : '★ ' + originalTitle + ' ★';
        on = !on;
      }, 1200);
    } else {
      clearInterval(blinkTimer);
      document.title = originalTitle;
    }
  });
})();
