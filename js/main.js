/* =========================================================
   EntoPan — Lógica del sitio
   ========================================================= */
(function () {
  'use strict';

  const NAV = [
    { key: 'inicio', label: 'Inicio', href: 'index.html' },
    { key: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
    { key: 'producto', label: 'Producto', href: 'producto.html' },
    { key: 'beneficios', label: 'Beneficios', href: 'beneficios.html' },
    { key: 'recetas', label: 'Recetas', href: 'recetas.html' },
    { key: 'sustentabilidad', label: 'Sustentabilidad', href: 'sustentabilidad.html' },
    { key: 'donde', label: 'Dónde comprar', href: 'sustentabilidad.html#donde-comprar' },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const page = document.body.dataset.page;
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- Header y footer compartidos ---------- */
  function logoHTML(tag = 'a') {
    return `<${tag} class="logo" ${tag === 'a' ? 'href="index.html" aria-label="EntoPan, ir al inicio"' : ''}>
      <i data-icon="logo"></i><span class="logo__text">EntoPan<sup>®</sup></span></${tag}>`;
  }

  function buildHeader() {
    const slot = $('[data-include="header"]');
    if (!slot) return;
    const links = NAV.map((n) => {
      const active = n.key === page ? ' is-active' : '';
      return `<a class="nav__link${active}" href="${n.href}"${active ? ' aria-current="page"' : ''}>${n.label}</a>`;
    }).join('');
    slot.outerHTML = `
      <header class="site-header" id="top">
        <div class="container">
          ${logoHTML()}
          <nav class="nav" id="nav" aria-label="Principal">${links}</nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" data-search-open aria-label="Buscar"><i data-icon="search"></i></button>
            <a class="btn btn--sm" href="sustentabilidad.html#donde-comprar">Compra aquí</a>
            <button class="icon-btn menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav"><i data-icon="menu"></i></button>
          </div>
        </div>
      </header>`;
  }

  function buildFooter() {
    const slot = $('[data-include="footer"]');
    if (!slot) return;
    const year = new Date().getFullYear();
    slot.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              ${logoHTML('div')}
              <p>Un pan funcional con proteína de insecto: nutrición real, sabor increíble y un impacto positivo en el planeta.</p>
              <div class="socials">
                <a href="#" aria-label="Instagram"><i data-icon="instagram"></i></a>
                <a href="#" aria-label="Facebook"><i data-icon="facebook"></i></a>
                <a href="sustentabilidad.html#contacto" aria-label="Escríbenos"><i data-icon="mail"></i></a>
              </div>
            </div>
            <div>
              <h4>EntoPan</h4>
              <ul>
                <li><a href="nosotros.html">Nosotros</a></li>
                <li><a href="producto.html">Producto</a></li>
                <li><a href="beneficios.html">Beneficios</a></li>
              </ul>
            </div>
            <div>
              <h4>Descubre</h4>
              <ul>
                <li><a href="recetas.html">Recetas</a></li>
                <li><a href="sustentabilidad.html">Sustentabilidad</a></li>
                <li><a href="producto.html#nutricion">Información nutricional</a></li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li><a href="sustentabilidad.html#donde-comprar">Dónde comprar</a></li>
                <li><a href="sustentabilidad.html#contacto">Escríbenos</a></li>
                <li>Santiago, Chile</li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${year} EntoPan. Todos los derechos reservados.</span>
            <span>Pequeños ingredientes, grandes cambios.</span>
          </div>
        </div>
      </footer>
      <button class="to-top" type="button" aria-label="Volver arriba"><i data-icon="arrow"></i></button>`;
  }

  function fillLeaves() {
    $$('[data-leaves]').forEach((el) => { el.innerHTML = leafBranchSVG(); el.setAttribute('aria-hidden', 'true'); });
  }

  /* ---------- Header: scroll, menú móvil ---------- */
  function initHeader() {
    const header = $('.site-header');
    const toTop = $('.to-top');
    const onScroll = () => {
      const y = window.scrollY;
      header && header.classList.toggle('is-scrolled', y > 20);
      toTop && toTop.classList.toggle('is-visible', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const toggle = $('.menu-toggle');
    const nav = $('#nav');
    if (toggle && nav) {
      const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.innerHTML = iconSVG(open ? 'close' : 'menu');
      };
      toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
      nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }
  }

  /* ---------- Transición entre páginas ---------- */
  function initPageTransitions() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
      const url = new URL(href, location.href);
      const samePage = url.pathname === location.pathname;
      if (samePage) {
        if (url.hash) { e.preventDefault(); goToHash(url.hash, true); }
        return;
      }
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 320);
    });
    // Al volver con el botón "atrás" desde la caché del navegador
    window.addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('is-leaving'); });
  }

  /* ---------- Animaciones de aparición al hacer scroll ---------- */
  function initReveal() {
    const els = $$('.reveal, .check, .write-on');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));

    // Retraso escalonado automático para grupos
    $$('[data-stagger]').forEach((group) => {
      const step = parseFloat(group.dataset.stagger) || 0.1;
      Array.from(group.children).forEach((child, i) => {
        child.classList.add('reveal');
        child.style.setProperty('--d', (i * step).toFixed(2) + 's');
        io.observe(child);
      });
    });
  }

  /* ---------- Parallax suave ---------- */
  function initParallax() {
    const els = $$('[data-parallax]');
    if (!els.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Modal genérico ---------- */
  let lastFocus = null;
  function openModal(html, { label = 'Ventana', onClose } = {}) {
    closeModal(true);
    lastFocus = document.activeElement;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'modal';
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${label}">
        <button class="icon-btn modal__close" type="button" aria-label="Cerrar">${iconSVG('close')}</button>
        ${html}
      </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    renderIcons(overlay);
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    overlay._onClose = onClose;
    overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.closest('.modal__close')) closeModal(); });
    $('.modal__close', overlay).focus({ preventScroll: true });
    return overlay;
  }
  function closeModal(immediate = false) {
    const overlay = $('#modal');
    if (!overlay) return;
    overlay.id = '';
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (overlay._onClose) overlay._onClose();
    setTimeout(() => overlay.remove(), immediate ? 0 : 400);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeSearch(); } });

  /* ---------- Toast ---------- */
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = iconSVG('check') + `<span>${msg}</span>`;
    requestAnimationFrame(() => t.classList.add('is-visible'));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('is-visible'), 3800);
  }

  /* ---------- Buscador ---------- */
  let searchEl = null;
  function openSearch() {
    if (!searchEl) {
      searchEl = document.createElement('div');
      searchEl.className = 'overlay search';
      searchEl.innerHTML = `<div class="search__box" role="dialog" aria-modal="true" aria-label="Buscar en el sitio">
          <label class="search__field">${iconSVG('search')}<span class="sr-only">Buscar</span>
            <input type="search" placeholder="Busca recetas, beneficios, ingredientes…" autocomplete="off">
            <button class="icon-btn" type="button" data-search-close aria-label="Cerrar">${iconSVG('close')}</button>
          </label>
          <ul class="search__results"></ul>
        </div>`;
      document.body.appendChild(searchEl);
      const input = $('input', searchEl);
      const list = $('.search__results', searchEl);
      let focusIdx = -1;
      const render = () => {
        const q = normalize(input.value.trim());
        const results = q ? SEARCH_INDEX.filter((r) => normalize(r.title + ' ' + r.text).includes(q)) : SEARCH_INDEX.slice(0, 7);
        focusIdx = -1;
        list.innerHTML = results.length
          ? results.slice(0, 10).map((r) => `<li><a href="${r.url}"><strong>${r.title}</strong><small>${r.text.slice(0, 80)}…</small></a></li>`).join('')
          : `<li class="search__empty">No encontramos resultados para “${input.value}”.</li>`;
      };
      input.addEventListener('input', render);
      input.addEventListener('keydown', (e) => {
        const links = $$('a', list);
        if (!links.length) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusIdx = (focusIdx + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
          links.forEach((l, i) => l.classList.toggle('is-focused', i === focusIdx));
          links[focusIdx].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          (links[focusIdx] || links[0]).click();
        }
      });
      searchEl.addEventListener('click', (e) => {
        if (e.target === searchEl || e.target.closest('[data-search-close]')) closeSearch();
        if (e.target.closest('a')) closeSearch();
      });
      render();
    }
    searchEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('input', searchEl).focus(), 50);
  }
  function closeSearch() {
    if (!searchEl || !searchEl.classList.contains('is-open')) return;
    searchEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-search-open]')) openSearch(); });
  document.addEventListener('keydown', (e) => {
    const typing = /input|textarea/i.test(document.activeElement.tagName);
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Navegación a anclas (#) ---------- */
  function goToHash(hash, smooth) {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    if (HASH_ACTIONS[id]) { HASH_ACTIONS[id](); return; }
    const recipe = RECIPES.find((r) => r.id === id);
    if (recipe && page === 'recetas') {
      const card = document.getElementById(id);
      card && card.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
      setTimeout(() => openRecipe(recipe), smooth ? 500 : 300);
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash');
    }
  }
  const HASH_ACTIONS = {};

  /* =========================================================
     Contenidos de modales
     ========================================================= */
  function openRecipe(r) {
    history.replaceState(null, '', '#' + r.id);
    openModal(`
      <div class="modal__hero"><img src="${r.img}" alt="${r.title}"></div>
      <div class="modal__body">
        <h2>${r.title}</h2>
        <div class="modal__meta">
          <span>${iconSVG('clock')} ${r.time} min</span>
          <span>${iconSVG('chef')} ${r.level}</span>
          <span>${iconSVG('users')} ${r.portions} ${r.portions === 1 ? 'porción' : 'porciones'}</span>
        </div>
        <div class="modal__cols">
          <div><h3>Ingredientes</h3><ul>${r.ingredients.map((i) => `<li>${i}</li>`).join('')}</ul></div>
          <div><h3>Preparación</h3><ol>${r.steps.map((s) => `<li>${s}</li>`).join('')}</ol></div>
        </div>
      </div>`, { label: r.title, onClose: () => history.replaceState(null, '', location.pathname) });
  }

  function openNutrition() {
    openModal(`
      <div class="modal__body">
        <h2>Información nutricional</h2>
        <p>Porción: ${NUTRITION.portion}. Valores referenciales.</p>
        <table class="nutri-table">
          <thead><tr><th>Nutriente</th><th>Por porción</th><th>Por 100 g</th></tr></thead>
          <tbody>${NUTRITION.rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
        </table>
      </div>`, { label: 'Información nutricional' });
  }

  function openIngredients() {
    openModal(`
      <div class="modal__hero"><img src="assets/img/ingredientes.jpg" alt="Ingredientes de EntoPan"></div>
      <div class="modal__body">
        <h2>Nuestros ingredientes</h2>
        <p>Seleccionados para darte más nutrición en cada rebanada.</p>
        <ul class="ing-list">${INGREDIENTS.map((i) => `<li><span class="check is-visible">${iconSVG('check')}</span><div><strong>${i.name}</strong><br>${i.desc}</div></li>`).join('')}</ul>
      </div>`, { label: 'Nuestros ingredientes' });
  }

  function openStory() {
    openModal(`
      <div class="modal__hero"><img src="assets/img/nosotros-banner.jpg" alt="Manos sosteniendo un brote"></div>
      <div class="modal__body">
        <h2>Nuestra historia</h2>
        <p>Pequeños ingredientes, grandes cambios.</p>
        <ul class="timeline">
          <li><strong>La pregunta</strong>¿Cómo alimentar mejor a más personas usando menos recursos del planeta?</li>
          <li><strong>La investigación</strong>Descubrimos en la harina de insecto una proteína completa, nutritiva y con una huella ambiental mucho menor.</li>
          <li><strong>El pan</strong>Elegimos el alimento más cotidiano de nuestra mesa para que el cambio fuera simple, rico y accesible.</li>
          <li><strong>Hoy</strong>EntoPan llega a puntos de venta seleccionados y sigue creciendo junto a una comunidad que quiere comer mejor.</li>
        </ul>
      </div>`, { label: 'Nuestra historia' });
  }

  function openStores() {
    openModal(`
      <div class="modal__body">
        <h2>Puntos de venta</h2>
        <p>Encuentra EntoPan en estas cadenas y tiendas.</p>
        <ul class="store-list">${STORES.map((s) => `<li><a href="${s.url}" ${s.url !== '#' ? 'target="_blank" rel="noopener"' : ''}>${iconSVG('pin')}<span><strong>${s.name}</strong><small>${s.note}</small></span></a></li>`).join('')}</ul>
        <iframe class="map-frame" title="Mapa de puntos de venta" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=supermercado%20Jumbo%20Lider%20Tottus%20Santiago%20Chile&output=embed"></iframe>
      </div>`, { label: 'Puntos de venta' });
  }

  /* =========================================================
     Páginas
     ========================================================= */
  function initRecipes() {
    const grid = $('#recipes-grid');
    if (!grid) return;
    const filters = $('#recipe-filters');
    const empty = $('.recipes__empty');

    filters.innerHTML = RECIPE_FILTERS.map((f, i) =>
      `<button class="chip${i === 0 ? ' is-active' : ''}" type="button" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`).join('');

    grid.innerHTML = RECIPES.map((r, i) => `
      <button class="recipe reveal" id="${r.id}" type="button" style="--d:${(i % 3) * 0.1}s" data-cats="${r.categories.join(' ')}" aria-label="Ver receta: ${r.title}">
        <div class="recipe__img"><img src="${r.img}" alt="${r.title}" loading="lazy"></div>
        <div class="recipe__body">
          <h3>${r.title}</h3>
          <div class="recipe__meta"><span>${iconSVG('clock')} ${r.time} min</span><span>${iconSVG('chef')} ${r.level}</span></div>
          <span class="recipe__arrow">${iconSVG('arrow')}</span>
        </div>
      </button>`).join('');

    const apply = (key) => {
      const cards = $$('.recipe', grid);
      $$('.chip', filters).forEach((c) => { const on = c.dataset.filter === key; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on); });
      cards.forEach((c) => c.classList.add('is-filtering'));
      setTimeout(() => {
        let shown = 0;
        cards.forEach((c) => {
          const match = key === 'todas' || c.dataset.cats.split(' ').includes(key);
          c.classList.toggle('is-hidden', !match);
          c.classList.add('is-visible');
          if (match) shown++;
        });
        empty.style.display = shown ? 'none' : 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cards.filter((c) => !c.classList.contains('is-hidden')).forEach((c, i) => {
            c.style.transitionDelay = i * 60 + 'ms';
            c.classList.remove('is-filtering');
            setTimeout(() => { c.style.transitionDelay = ''; }, 600 + i * 60);
          });
        }));
      }, 260);
    };
    filters.addEventListener('click', (e) => { const chip = e.target.closest('.chip'); if (chip) apply(chip.dataset.filter); });
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.recipe');
      if (card) openRecipe(RECIPES.find((r) => r.id === card.id));
    });
    $('#all-recipes').addEventListener('click', () => {
      apply('todas');
      filters.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast(`Mostrando las ${RECIPES.length} recetas`);
    });
  }

  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const rules = {
      nombre: (v) => v.trim().length >= 2 || 'Ingresa tu nombre.',
      correo: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Ingresa un correo válido.',
      mensaje: (v) => v.trim().length >= 10 || 'Cuéntanos un poco más (mínimo 10 caracteres).',
    };
    const check = (field) => {
      const res = rules[field.name](field.value);
      const wrap = field.closest('.field');
      wrap.classList.toggle('has-error', res !== true);
      $('.field__error', wrap).textContent = res === true ? '' : res;
      return res === true;
    };
    $$('input, textarea', form).forEach((f) => {
      f.addEventListener('blur', () => f.value && check(f));
      f.addEventListener('input', () => f.closest('.field').classList.contains('has-error') && check(f));
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = $$('input, textarea', form);
      const ok = fields.map(check).every(Boolean);
      if (!ok) { fields.find((f) => f.closest('.field').classList.contains('has-error')).focus(); return; }
      const btn = $('button[type="submit"]', form);
      btn.classList.add('is-loading');
      btn.lastChild.textContent = 'Enviando…';
      // Simulación de envío. Para recibir los mensajes, conecta aquí tu backend o un servicio como Formspree.
      const data = Object.fromEntries(new FormData(form));
      setTimeout(() => {
        try {
          const saved = JSON.parse(localStorage.getItem('entopan-mensajes') || '[]');
          saved.push({ ...data, fecha: new Date().toISOString() });
          localStorage.setItem('entopan-mensajes', JSON.stringify(saved));
        } catch (_) { /* almacenamiento no disponible */ }
        btn.classList.remove('is-loading');
        btn.lastChild.textContent = 'Enviar';
        form.reset();
        toast(`¡Gracias, ${data.nombre.split(' ')[0]}! Te responderemos pronto.`);
      }, 1200);
    });
  }

  function initButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      e.preventDefault();
      ({ nutrition: openNutrition, ingredients: openIngredients, story: openStory, stores: openStores })[btn.dataset.action]?.();
    });
    HASH_ACTIONS.nutricion = () => { $('#producto-info')?.scrollIntoView(); openNutrition(); };
  }

  /* ---------- Arranque ---------- */
  buildHeader();
  buildFooter();
  fillLeaves();
  renderIcons();
  initHeader();
  initPageTransitions();
  initButtons();
  initRecipes();
  initContactForm();
  initReveal();
  initParallax();
  $('main')?.classList.add('page-enter');
  if (location.hash) window.addEventListener('load', () => goToHash(location.hash, false));
})();
