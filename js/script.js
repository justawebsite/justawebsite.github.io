/* ============================================================
   hexo-theme-frutiger-aero — 交互脚本
   ============================================================ */

(function () {
  'use strict';

  /* -------------------------------------------------------
     1. 移动端导航切换
     ------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    // 点击导航链接后自动关闭菜单
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  /* -------------------------------------------------------
     2. 气泡装饰动画
     ------------------------------------------------------- */
  var bubblesContainer = document.getElementById('bubbles');
  if (bubblesContainer) {
    var bubbleCount = 12;
    var colors = [
      'rgba(255, 255, 255, 0.3)',
      'rgba(135, 206, 235, 0.25)',
      'rgba(152, 251, 152, 0.2)',
      'rgba(224, 246, 255, 0.3)'
    ];

    for (var i = 0; i < bubbleCount; i++) {
      var bubble = document.createElement('div');
      bubble.className = 'bubble';

      var size = 10 + Math.random() * 30;
      var left = Math.random() * 100;
      var duration = 15 + Math.random() * 25;
      var delay = Math.random() * 20;
      var color = colors[Math.floor(Math.random() * colors.length)];

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = left + '%';
      bubble.style.animationDuration = duration + 's';
      bubble.style.animationDelay = delay + 's';
      bubble.style.background = 'radial-gradient(circle at 30% 30%, ' +
        color.replace('0.3', '0.5').replace('0.25', '0.4').replace('0.2', '0.35').replace('0.3', '0.5') +
        ', transparent)';

      bubblesContainer.appendChild(bubble);
    }
  }

  /* -------------------------------------------------------
     3. 玻璃面板光泽效果（鼠标跟随高光）
     ------------------------------------------------------- */
  var glassPanels = document.querySelectorAll('.post-card, .sidebar-widget, .aero-panel');

  function handleGlassShine(e) {
    var panel = e.currentTarget;
    var rect = panel.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;

    // 根据鼠标位置计算高光角度
    var rotateX = (y - centerY) / centerY * -8;
    var rotateY = (x - centerX) / centerX * 8;

    panel.style.transform =
      'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-2px)';
  }

  function handleGlassShineLeave(e) {
    var panel = e.currentTarget;
    panel.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
  }

  if (glassPanels.length > 0) {
    glassPanels.forEach(function (panel) {
      panel.addEventListener('mousemove', handleGlassShine);
      panel.addEventListener('mouseleave', handleGlassShineLeave);
    });
  }

  /* -------------------------------------------------------
     4. 平滑锚点滚动
     ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -------------------------------------------------------
     5. 图片懒加载（轻量）
     ------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var lazyImages = document.querySelectorAll('.post-content img[loading="lazy"], img.lazy');
    if (lazyImages.length > 0) {
      var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            var dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
            }
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function (img) {
        imageObserver.observe(img);
      });
    }
  }

  /* -------------------------------------------------------
     6. 代码块美化：添加复制按钮（Vista 风格）
     ------------------------------------------------------- */
  var codeBlocks = document.querySelectorAll('.post-content pre');
  codeBlocks.forEach(function (pre) {
    var wrapper = document.createElement('div');
    wrapper.style.position = 'relative';

    var button = document.createElement('button');
    button.textContent = '📋 Copy';
    button.style.cssText =
      'position:absolute;top:8px;right:8px;padding:3px 10px;font-size:0.75rem;' +
      'background:rgba(255,255,255,0.15);color:#ccc;border:1px solid rgba(255,255,255,0.1);' +
      'border-radius:4px;cursor:pointer;transition:all 0.2s;z-index:2;font-family:inherit;';

    button.addEventListener('mouseenter', function () {
      button.style.background = 'rgba(255,255,255,0.25)';
      button.style.color = '#fff';
    });
    button.addEventListener('mouseleave', function () {
      button.style.background = 'rgba(255,255,255,0.15)';
      button.style.color = '#ccc';
    });

    button.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(function () {
        button.textContent = '✅ Copied!';
        setTimeout(function () {
          button.textContent = '📋 Copy';
        }, 2000);
      }).catch(function () {
        button.textContent = '❌ Failed';
        setTimeout(function () {
          button.textContent = '📋 Copy';
        }, 2000);
      });
    });

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(button);
  });

})();
