/* =========================================================
   MigaViva — Pantalla de carga: una marraqueta que se abre.
   Se carga en el <head> para cubrir la página antes de que se pinte.
   Se muestra una vez por visita (sessionStorage). Para verla de nuevo: agrega ?intro a la URL.
   ========================================================= */
(function () {
  'use strict';
  var KEY = 'mv-intro-visto';
  var force = /[?&]intro\b/.test(location.search);
  var seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch (e) { /* sin almacenamiento */ }
  if (seen && !force) return;

  var html = document.documentElement;
  html.classList.add('is-loading');
  window.MV_LOADER_ACTIVE = true;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MIN_TIME = reduced ? 700 : 3000; // dejamos que la animación del pan se luzca
  var MAX_TIME = 8000;                 // nunca bloquear la página más que esto
  var start = Date.now();

  function word(text, cls, offset) {
    return text.split('').map(function (ch, i) {
      return '<span class="loader__letter ' + cls + '" style="--i:' + (i + offset) + '">' + ch + '</span>';
    }).join('');
  }

  var BREAD =
    '<svg class="loader__bread" viewBox="0 0 300 230" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="mvCrust" cx="45%" cy="30%" r="80%">' +
          '<stop offset="0" stop-color="#f7cf8c"/><stop offset=".45" stop-color="#e3a254"/>' +
          '<stop offset=".8" stop-color="#c3752f"/><stop offset="1" stop-color="#9c5623"/>' +
        '</radialGradient>' +
        '<radialGradient id="mvCrumb" cx="30%" cy="45%" r="80%">' +
          '<stop offset="0" stop-color="#fbf0d8"/><stop offset="1" stop-color="#ecd3a3"/>' +
        '</radialGradient>' +
        '<clipPath id="mvLeft"><rect x="0" y="0" width="150" height="230"/></clipPath>' +
        '<clipPath id="mvRight"><rect x="150" y="0" width="150" height="230"/></clipPath>' +
        '<path id="mvLoaf" d="M40 158C34 112 66 78 112 74c14-20 62-20 76 0 46 4 78 38 72 84-3 20-30 26-110 26S43 178 40 158Z"/>' +
      '</defs>' +
      '<ellipse class="loader__shadow" cx="150" cy="200" rx="104" ry="11"/>' +
      '<g class="loader__steam">' +
        '<path d="M112 58c-10-12 10-18 0-32"/><path d="M150 50c-10-12 10-18 0-34"/><path d="M188 58c-10-12 10-18 0-32"/>' +
      '</g>' +
      // brote que aparece entre las mitades
      '<g class="loader__sprout">' +
        '<path class="loader__stem" d="M150 182C150 150 149 128 151 104"/>' +
        '<path class="loader__leaf loader__leaf--l" d="M150 118c-8-22-30-32-52-28 8 22 28 32 52 28Z"/>' +
        '<path class="loader__leaf loader__leaf--r" d="M151 106c6-24 26-38 50-36-6 24-26 38-50 36Z"/>' +
      '</g>' +
      '<g class="loader__drop">' +
        // mitad izquierda
        '<g class="loader__half loader__half--l">' +
          '<g clip-path="url(#mvLeft)"><use href="#mvLoaf" fill="url(#mvCrust)"/>' +
            '<path class="loader__cut" d="M78 112c14-18 36-26 62-24"/>' +
            '<path class="loader__cut" d="M62 142c20-12 46-16 76-12"/>' +
            '<ellipse cx="100" cy="98" rx="26" ry="9" fill="#fff" opacity=".22" transform="rotate(-14 100 98)"/>' +
          '</g>' +
          '<g class="loader__face loader__face--l">' +
            '<path d="M150 76C176 96 178 162 150 184Z" fill="url(#mvCrumb)" stroke="#c98a45" stroke-width="3"/>' +
            '<g fill="#e2c28c"><ellipse cx="158" cy="104" rx="3" ry="5"/><ellipse cx="163" cy="128" rx="2.5" ry="4"/><ellipse cx="157" cy="150" rx="3" ry="5"/><ellipse cx="162" cy="168" rx="2" ry="3"/></g>' +
          '</g>' +
        '</g>' +
        // mitad derecha
        '<g class="loader__half loader__half--r">' +
          '<g clip-path="url(#mvRight)"><use href="#mvLoaf" fill="url(#mvCrust)"/>' +
            '<path class="loader__cut" d="M222 112c-14-18-36-26-62-24"/>' +
            '<path class="loader__cut" d="M238 142c-20-12-46-16-76-12"/>' +
          '</g>' +
          '<g class="loader__face loader__face--r">' +
            '<path d="M150 76C124 96 122 162 150 184Z" fill="url(#mvCrumb)" stroke="#c98a45" stroke-width="3"/>' +
            '<g fill="#e2c28c"><ellipse cx="142" cy="110" rx="3" ry="5"/><ellipse cx="137" cy="134" rx="2.5" ry="4"/><ellipse cx="143" cy="158" rx="3" ry="5"/></g>' +
          '</g>' +
        '</g>' +
      '</g>' +
      // migas que saltan al abrir
      '<g class="loader__crumbs">' +
        '<circle r="3.5" cx="150" cy="120" style="--x:-46px;--y:-40px"/>' +
        '<circle r="2.5" cx="150" cy="130" style="--x:40px;--y:-52px"/>' +
        '<circle r="3" cx="150" cy="150" style="--x:-64px;--y:-10px"/>' +
        '<circle r="2" cx="150" cy="110" style="--x:22px;--y:-70px"/>' +
        '<circle r="3" cx="150" cy="160" style="--x:62px;--y:-18px"/>' +
        '<circle r="2" cx="150" cy="140" style="--x:-24px;--y:-66px"/>' +
      '</g>' +
    '</svg>';

  function build() {
    var el = document.createElement('div');
    el.className = 'loader';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML =
      '<div class="loader__curtain loader__curtain--l"></div><div class="loader__curtain loader__curtain--r"></div>' +
      '<div class="loader__content">' + BREAD +
        '<p class="loader__brand" aria-label="MigaViva">' + word('Miga', 'is-miga', 0) + word('Viva', 'is-viva', 4) + '</p>' +
        '<p class="loader__status"><span>Cargando</span><span class="loader__dots"><i>.</i><i>.</i><i>.</i></span>' +
          '<span class="loader__pct">0%</span></p>' +
        '<div class="loader__bar"><span></span></div>' +
      '</div>';
    document.body.insertBefore(el, document.body.firstChild);
    track(el);
  }

  function track(el) {
    var pctEl = el.querySelector('.loader__pct');
    var bar = el.querySelector('.loader__bar span');
    var imgs = Array.prototype.filter.call(document.images, function (img) { return img.loading !== 'lazy'; });
    var total = imgs.length + 1; // +1 por las fuentes
    var loaded = 0;
    var real = 0, shown = 0, finished = false;

    function tick() { loaded++; real = Math.min(1, loaded / total); }
    imgs.forEach(function (img) {
      if (img.complete) tick();
      else { img.addEventListener('load', tick, { once: true }); img.addEventListener('error', tick, { once: true }); }
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(tick); else tick();
    window.addEventListener('load', function () { real = 1; });
    setTimeout(function () { real = 1; }, MAX_TIME);

    // Avance basado en tiempo real (no en cuadros), así no se traba si el navegador ralentiza la pestaña.
    var last = Date.now();
    var timer = setInterval(function () {
      var now = Date.now();
      var dt = now - last; last = now;
      var timeRatio = Math.min(1, (now - start) / MIN_TIME);
      var target = Math.min(real, timeRatio);
      shown += (target - shown) * (1 - Math.exp(-dt / 180));
      if (target >= 1 && shown > 0.97) shown = 1;
      pctEl.textContent = Math.round(shown * 100) + '%';
      bar.style.transform = 'scaleX(' + shown.toFixed(3) + ')';
      if (shown >= 1 && !finished) { finished = true; clearInterval(timer); done(el); }
    }, 40);
  }

  function done(el) {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* sin almacenamiento */ }
    el.querySelector('.loader__status span').textContent = '¡Listo!';
    setTimeout(function () {
      el.classList.add('is-done');
      html.classList.remove('is-loading');
      window.MV_LOADER_ACTIVE = false;
      document.dispatchEvent(new CustomEvent('migaviva:ready'));
      setTimeout(function () { el.remove(); }, reduced ? 300 : 1300);
    }, reduced ? 100 : 450);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
