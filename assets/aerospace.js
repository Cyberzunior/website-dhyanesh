/* Aerospace / Mission Control theme enhancements.
   Runs only when <html data-theme="aerospace">. */
(function () {
  var root = document.documentElement;
  if (root.getAttribute('data-theme') !== 'aerospace') return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var app = document.getElementById('app');

  /* ---------- Starfield ---------- */
  var canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  var ctx = canvas.getContext('2d');
  var stars = [];
  var raf = 0;
  var w = 0;
  var h = 0;

  function makeStars() {
    var count = window.innerWidth <= 720 ? 60 : 120;
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        base: Math.random() * 0.45 + 0.2,
        amp: Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0018 + 0.0006,
        drift: (Math.random() - 0.5) * 0.006,
        cyan: Math.random() < 0.35
      });
    }
  }

  function paint(t) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = s.base + Math.sin(t * s.speed + s.phase) * s.amp;
      if (alpha < 0.05) alpha = 0.05;
      if (alpha > 0.9) alpha = 0.9;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.cyan
        ? 'rgba(76, 201, 240, ' + alpha.toFixed(3) + ')'
        : 'rgba(230, 237, 247, ' + alpha.toFixed(3) + ')';
      ctx.fill();
    }
  }

  function drawStatic() {
    paint(0);
  }

  function loop(t) {
    if (document.hidden) { raf = 0; return; }
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.drift;
      if (s.x < -2) s.x = w + 2;
      if (s.x > w + 2) s.x = -2;
    }
    paint(t);
    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (raf || reduceMotion.matches) return;
    raf = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStars();
    if (reduceMotion.matches) drawStatic();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopLoop();
    else startLoop();
  });

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) { stopLoop(); drawStatic(); }
      else startLoop();
    });
  }

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }, { passive: true });

  resize();
  startLoop();

  /* ---------- Orbit rings in the hero ---------- */
  function addOrbits() {
    var hero = document.querySelector('.home-hero');
    if (!hero || hero.querySelector('.orbit-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'orbit-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML =
      '<div class="orbit-ring r1"><span class="orbit-dot"></span></div>' +
      '<div class="orbit-ring r2"></div>';
    hero.prepend(layer);
  }

  /* ---------- Hero boot-sequence typing ---------- */
  var bootDone = false;
  function maybeBoot() {
    if (bootDone) return;
    var name = document.querySelector('.home-hero .name');
    if (!name) return;
    bootDone = true;
    if (reduceMotion.matches) return;
    var text = name.textContent.trim();
    if (!text) return;
    var hero = name.closest('.home-hero') || document;
    var lead = hero.querySelector('.lead');
    var leadText = lead ? lead.textContent.trim() : '';
    name.setAttribute('aria-label', text);
    name.innerHTML =
      '<span class="boot-name"></span><span class="boot-cursor" aria-hidden="true"></span>';
    var target = name.querySelector('.boot-name');
    var cursor = name.querySelector('.boot-cursor');
    var i = 0;
    var timer = setInterval(function () {
      i++;
      target.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(function () { if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor); }, 700);
        if (lead && leadText) {
          lead.setAttribute('aria-label', leadText);
          lead.innerHTML = '<span class="boot-sub"></span>';
          var sub = lead.querySelector('.boot-sub');
          var j = 0;
          var subTimer = setInterval(function () {
            j++;
            sub.textContent = leadText.slice(0, j);
            if (j >= leadText.length) clearInterval(subTimer);
          }, 22);
        }
      }
    }, 55);
  }

  addOrbits();
  maybeBoot();
  if (app) {
    var observer = new MutationObserver(function () {
      addOrbits();
      maybeBoot();
    });
    observer.observe(app, { childList: true, subtree: true });
  }

  /* ---------- Trajectory scroll line ---------- */
  var trajectory = document.createElement('div');
  trajectory.className = 'trajectory';
  trajectory.setAttribute('aria-hidden', 'true');
  trajectory.innerHTML = '<div class="trajectory-fill"></div><div class="trajectory-tip"></div>';
  document.body.appendChild(trajectory);
  var fill = trajectory.querySelector('.trajectory-fill');
  var tip = trajectory.querySelector('.trajectory-tip');
  var ticking = false;

  function updateTrajectory() {
    ticking = false;
    var el = document.documentElement;
    var max = el.scrollHeight - el.clientHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    fill.style.transform = 'scaleY(' + progress + ')';
    tip.style.top = (progress * 100) + '%';
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateTrajectory); }
  }, { passive: true });
  window.addEventListener('resize', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateTrajectory); }
  }, { passive: true });
  updateTrajectory();
})();
