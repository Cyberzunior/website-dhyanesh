/* Aerospace / Mission Control theme enhancements.
   Runs only when <html data-theme="aerospace">. */
(function () {
  var root = document.documentElement;
  if (root.getAttribute('data-theme') !== 'aerospace') return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var app = document.getElementById('app');

  var ROCKET_SVG =
    '<svg viewBox="0 0 64 32" data-rocket="1" aria-hidden="true">' +
    '<path class="rk-flame" d="M10 16 L0 12 L3 16 L0 20 Z" />' +
    '<path class="rk-body" d="M12 16 C12 9 22 5 34 5 L44 5 C53 5 59 10 59 16 C59 22 53 27 44 27 L34 27 C22 27 12 23 12 16 Z" />' +
    '<path class="rk-fin" d="M18 25 L8 31 L20 27 Z" />' +
    '<path class="rk-fin" d="M18 7 L8 1 L20 5 Z" />' +
    '<circle class="rk-window" cx="44" cy="16" r="4" />' +
    '</svg>';

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
  var launchBoost = 0;

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
      var color = s.cyan
        ? 'rgba(76, 201, 240, ' + alpha.toFixed(3) + ')'
        : 'rgba(230, 237, 247, ' + alpha.toFixed(3) + ')';
      if (launchBoost > 0.04) {
        var streak = 2 + launchBoost * 26;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + streak);
        ctx.strokeStyle = color;
        ctx.lineWidth = s.r * 0.9;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
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

  /* ---------- Rocket shuttle ---------- */
  function replaceShuttles() {
    var svgs = document.querySelectorAll('.shuttle svg, .marquee-shuttle svg, .timeline-shuttle svg');
    for (var i = 0; i < svgs.length; i++) {
      if (svgs[i].getAttribute('data-rocket')) continue;
      svgs[i].outerHTML = ROCKET_SVG;
    }
  }

  /* ---------- Mission scene (replaces the badminton court) ---------- */
  function buildMissionScene() {
    var stage = document.querySelector('.court-stage');
    if (!stage || stage.querySelector('.mission-scene')) return;
    var scene = document.createElement('div');
    scene.className = 'mission-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML =
      '<div class="scene-glow"></div>' +
      '<div class="scene-planet planet-a"></div>' +
      '<div class="scene-planet planet-b"></div>' +
      '<div class="scene-orbit"><span class="scene-sat"></span></div>';
    stage.prepend(scene);
    var plane = stage.querySelector('.court-plane');
    if (plane && !plane.querySelector('.scene-radar')) {
      plane.insertAdjacentHTML('afterbegin',
        '<div class="scene-radar"></div>' +
        '<div class="scene-hud">Mission control</div>');
    }
    buildLaunchLayer(stage);
  }

  /* ---------- Launch layer (scroll-driven lift-off) ---------- */
  function buildLaunchLayer(stage) {
    if (!stage || stage.querySelector('.launch-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'launch-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML =
      '<div class="launch-smoke"></div>' +
      '<div class="launch-trail"></div>' +
      '<div class="scene-rocket">' +
        '<div class="scene-rocket-body">' +
          '<svg viewBox="0 0 64 64" aria-hidden="true">' +
            '<path class="rk-flame-big" d="M26 52 L32 64 L38 52 Z" />' +
            '<path class="rk-body-big" d="M32 2 C40 10 44 22 44 34 L44 48 L20 48 L20 34 C20 22 24 10 32 2 Z" />' +
            '<path class="rk-fin-big" d="M20 40 L9 56 L21 50 Z" />' +
            '<path class="rk-fin-big" d="M44 40 L55 56 L43 50 Z" />' +
            '<circle class="rk-window-big" cx="32" cy="28" r="6" />' +
          '</svg>' +
        '</div>' +
      '</div>' +
      '<div class="launch-hud">' +
        '<span class="launch-count">T-MINUS 10</span>' +
        '<span class="launch-alt">ALT 000</span>' +
        '<span class="launch-meter"><i></i></span>' +
      '</div>';
    stage.appendChild(layer);
  }

  /* ---------- Home launch cue and scroll sequence ---------- */
  function buildHomeCue() {
    var intro = document.querySelector('.home-hero .home-intro');
    if (!intro || intro.querySelector('.launch-cue')) return;
    var cue = document.createElement('p');
    cue.className = 'launch-cue';
    cue.setAttribute('aria-hidden', 'true');
    cue.innerHTML = '<span class="launch-cue-line"></span> Scroll to launch';
    var hint = intro.querySelector('.hint');
    if (hint && hint.parentNode === intro) hint.insertAdjacentElement('afterend', cue);
    else intro.appendChild(cue);
  }

  var launchRaf = 0;
  function updateLaunch() {
    launchRaf = 0;
    var hero = document.querySelector('.home-hero');
    var stage = hero ? hero.querySelector('.court-stage') : null;
    if (!hero || !stage) { launchBoost = 0; return; }
    if (reduceMotion.matches) {
      hero.style.setProperty('--launch', '0');
      launchBoost = 0;
      return;
    }
    var rect = hero.getBoundingClientRect();
    var start = rect.top + window.pageYOffset;
    var travelled = window.pageYOffset - start;
    var progress = travelled / Math.max(1, hero.offsetHeight * 0.82);
    progress = Math.max(0, Math.min(1, progress));
    hero.style.setProperty('--launch', progress.toFixed(3));
    var visibility = Math.max(0, Math.min(1, rect.bottom / Math.max(1, hero.offsetHeight * 0.5)));
    launchBoost = progress * visibility;
    var count = stage.querySelector('.launch-count');
    if (count) {
      count.textContent = progress >= 0.97
        ? 'LIFTOFF'
        : 'T-MINUS ' + Math.max(0, Math.ceil((1 - progress) * 10));
    }
    var alt = stage.querySelector('.launch-alt');
    if (alt) {
      alt.textContent = 'ALT ' + String(Math.round(progress * 420)).padStart(3, '0');
    }
  }

  function queueLaunch() {
    if (!launchRaf) launchRaf = requestAnimationFrame(updateLaunch);
  }

  window.addEventListener('scroll', queueLaunch, { passive: true });
  window.addEventListener('resize', queueLaunch, { passive: true });

  /* ---------- About crew-profile HUD ---------- */
  function buildAboutExtras() {
    var portrait = document.querySelector('.about .portrait');
    if (!portrait || portrait.querySelector('.portrait-hud')) return;
    portrait.classList.add('hud-portrait');
    portrait.insertAdjacentHTML('beforeend',
      '<div class="portrait-orbit" aria-hidden="true"></div>' +
      '<div class="portrait-scan" aria-hidden="true"></div>' +
      '<div class="portrait-hud" aria-hidden="true">' +
        '<span><b>CREW PROFILE</b> // 001</span>' +
        '<span>TORONTO &middot; GRADE 11</span>' +
      '</div>');
  }

  /* ---------- Theme copy ---------- */
  function applyThemeCopy() {
    var hint = document.querySelector('.home-hero .hint');
    if (hint && !hint.getAttribute('data-theme-copy')) {
      hint.setAttribute('data-theme-copy', '1');
      hint.textContent = 'Every node is a mission. Pick one and the rocket will fly you there.';
    }
    var h1 = document.querySelector('.page-head h1');
    if (h1 && h1.textContent.trim() === 'Out.' && !h1.getAttribute('data-theme-copy')) {
      h1.setAttribute('data-theme-copy', '1');
      h1.textContent = 'SIGNAL LOST.';
      var head = h1.closest('.page-head') || h1.parentElement;
      head.classList.add('error-page');
      var lead = head.querySelector('.lead');
      if (lead) lead.textContent = 'That trajectory left the launch corridor. This page does not exist.';
      var btn = head.querySelector('.button');
      if (btn) btn.textContent = 'Back to mission control';
    }
  }

  /* ---------- Mission status ticker ---------- */
  var tickerStarted = false;
  function startTicker() {
    if (tickerStarted) return;
    var footer = document.querySelector('.site-footer');
    if (!footer) return;
    tickerStarted = true;
    var el = document.createElement('div');
    el.className = 'mission-ticker';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<span>SYSTEMS <b class="ticker-success">NOMINAL</b></span>' +
      '<span class="ticker-sep">&middot;</span>' +
      '<span>ALT <b data-ticker="alt">000</b></span>' +
      '<span class="ticker-sep">&middot;</span>' +
      '<span>VEL <b data-ticker="vel">000</b></span>' +
      '<span class="ticker-sep">&middot;</span>' +
      '<span>T-MINUS <b data-ticker="tminus">000</b></span>';
    footer.insertBefore(el, footer.firstChild);
    var alt = el.querySelector('[data-ticker="alt"]');
    var vel = el.querySelector('[data-ticker="vel"]');
    var tm = el.querySelector('[data-ticker="tminus"]');
    function render(a, v, t) {
      alt.textContent = String(a).padStart(3, '0');
      vel.textContent = String(v).padStart(3, '0');
      tm.textContent = String(t).padStart(3, '0');
    }
    if (reduceMotion.matches) { render(400, (7).toFixed(1), 10); return; }
    var a = 400, v = 7, t = 10, dir = 1;
    render(a, v.toFixed(1), t);
    setInterval(function () {
      if (document.hidden) return;
      t -= 1;
      if (t < 0) t = 10;
      a += dir;
      if (a > 420) dir = -1;
      if (a < 380) dir = 1;
      v = Math.max(0, Math.min(9, v + (Math.random() - 0.5) * 0.4));
      render(a, v.toFixed(1), t);
    }, 1000);
  }

  addOrbits();
  maybeBoot();
  replaceShuttles();
  buildMissionScene();
  buildLaunchLayer(document.querySelector('.court-stage'));
  buildHomeCue();
  buildAboutExtras();
  applyThemeCopy();
  startTicker();
  queueLaunch();
  if (app) {
    var observer = new MutationObserver(function () {
      addOrbits();
      maybeBoot();
      replaceShuttles();
      buildMissionScene();
      buildLaunchLayer(document.querySelector('.court-stage'));
      buildHomeCue();
      buildAboutExtras();
      applyThemeCopy();
      queueLaunch();
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
