/* Y2K Theme — Interactive Elements */
(function() {
  'use strict';

  // --- Clock ---
  function updateClock() {
    const el = document.getElementById('clock-display');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // --- Sparkles (cursor follower) ---
  const sparkleContainer = document.querySelector('.sparkle-container');
  if (sparkleContainer) {
    let lastSparkle = 0;
    document.addEventListener('mousemove', function(e) {
      const now = Date.now();
      if (now - lastSparkle < 80) return;
      lastSparkle = now;

      const sparkle = document.createElement('span');
      const size = Math.random() * 10 + 6;
      const symbols = ['✦', '✧', '⭐', '✨', '·', '♦'];
      sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      sparkle.style.cssText = [
        'position: fixed',
        'left: ' + (e.clientX + (Math.random() - 0.5) * 20) + 'px',
        'top: ' + (e.clientY + (Math.random() - 0.5) * 20) + 'px',
        'font-size: ' + size + 'px',
        'color: hsl(' + (Math.random() * 60 + 300) + ', 100%, 70%)',
        'pointer-events: none',
        'z-index: 9999',
        'opacity: 1',
        'transition: all 0.8s ease-out',
        'font-family: "Comic Sans MS", cursive'
      ].join(';');

      sparkleContainer.appendChild(sparkle);

      requestAnimationFrame(function() {
        sparkle.style.transform = 'translateY(-30px) scale(1.5)';
        sparkle.style.opacity = '0';
      });

      setTimeout(function() { sparkle.remove(); }, 900);
    });
  }

  // --- Show IE Popup on first visit ---
  if (!sessionStorage.getItem('y2k_shown')) {
    setTimeout(function() {
      const popup = document.getElementById('ie-popup');
      if (popup) {
        popup.style.display = 'flex';
        sessionStorage.setItem('y2k_shown', '1');
      }
    }, 1500);
  }

  // --- Visitor counter (fake) ---
  const counter = document.querySelector('.status-item:first-child');
  if (counter) {
    const count = Math.floor(Math.random() * 90000) + 10000;
    counter.textContent = '👥 访客: ' + count;
  }

})();
