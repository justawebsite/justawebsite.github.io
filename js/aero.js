/* Frutiger Aero theme — small touches */
(function () {
  'use strict';

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
