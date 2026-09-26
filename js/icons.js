/* Set de íconos de línea (SVG) usados en todo el sitio.
   Uso en HTML: <i data-icon="leaf"></i>  → se reemplaza por el SVG al cargar. */
const ICONS = {
  logo: '<path d="M12 21v-7"/><path d="M12 14c0-3 2-5.5 5-6.5-.3 3.2-2.2 5.6-5 6.5Z"/><path d="M12 14c0-3-2-5.5-5-6.5.3 3.2 2.2 5.6 5 6.5Z"/><path d="M12 10.5c-1.3-1.6-1.3-4.3 0-6.5 1.3 2.2 1.3 4.9 0 6.5Z"/><path d="M12 17.5c1.2-1.4 3-2.2 5-2.2"/><path d="M12 17.5c-1.2-1.4-3-2.2-5-2.2"/>',
  dumbbell: '<path d="M6.5 6.5v11"/><path d="M17.5 6.5v11"/><path d="M3.5 9v6"/><path d="M20.5 9v6"/><path d="M6.5 12h11"/><rect x="3.5" y="8" width="3" height="8" rx="1"/><rect x="17.5" y="8" width="3" height="8" rx="1"/>',
  leaf: '<path d="M20 4C10 4 4 9 4 16c0 1.5.3 2.8.8 4 7.2 0 15.2-4 15.2-16Z"/><path d="M4.8 20C8 15 12 11 16 8"/><path d="M9.5 14.5 8.8 11"/><path d="M12.5 11.8 12 8.5"/><path d="M9.5 14.5l3.5.3"/><path d="M12.5 11.8l3.2.2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/><path d="M4.5 7.5h15"/><path d="M4.5 16.5h15"/>',
  wheat: '<path d="M12 22V8"/><path d="M12 8c-2-1-2.8-3-2.5-5 2 .6 3 2.6 2.5 5Z"/><path d="M12 8c2-1 2.8-3 2.5-5-2 .6-3 2.6-2.5 5Z"/><path d="M12 13c-2.3-.4-3.7-2.2-3.8-4.5 2.2.3 3.7 2.1 3.8 4.5Z"/><path d="M12 13c2.3-.4 3.7-2.2 3.8-4.5-2.2.3-3.7 2.1-3.8 4.5Z"/><path d="M12 18c-2.3-.4-3.7-2.2-3.8-4.5 2.2.3 3.7 2.1 3.8 4.5Z"/><path d="M12 18c2.3-.4 3.7-2.2 3.8-4.5-2.2.3-3.7 2.1-3.8 4.5Z"/>',
  heart: '<path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.1 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.8 1.2-1.7 2.7-2.8 4.7-2.8 3.2 0 5.3 2.9 4.3 6.2-1.5 4.7-9 9.3-9 9.3Z"/>',
  people: '<circle cx="12" cy="7.5" r="2.6"/><circle cx="5.5" cy="9" r="2.1"/><circle cx="18.5" cy="9" r="2.1"/><path d="M7.5 20v-2.5a4.5 4.5 0 0 1 9 0V20"/><path d="M2 19v-1.5a3.5 3.5 0 0 1 5.2-3"/><path d="M22 19v-1.5a3.5 3.5 0 0 0-5.2-3"/>',
  sprout: '<path d="M12 21V11"/><path d="M12 11c0-3.5 2.5-6 6.5-6.5C18.3 8.4 15.8 11 12 11Z"/><path d="M12 14c0-3-2.3-5.2-6-5.6.2 3.4 2.5 5.6 6 5.6Z"/><path d="M8 21h8"/>',
  eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3.2"/>',
  innovation: '<circle cx="12" cy="12" r="2.4"/><path d="M12 3.5c1.6 1.2 1.6 3.5 0 4.9-1.6-1.4-1.6-3.7 0-4.9Z"/><path d="M12 15.6c1.6 1.4 1.6 3.7 0 4.9-1.6-1.2-1.6-3.5 0-4.9Z"/><path d="M4.6 7.8c2-.2 3.6 1.4 3.3 3.5-2 .2-3.6-1.4-3.3-3.5Z"/><path d="M16.1 12.7c2-.3 3.6 1.3 3.3 3.5-2 .2-3.6-1.4-3.3-3.5Z"/><path d="M4.6 16.2c-.3-2.1 1.3-3.7 3.3-3.5.3 2.1-1.3 3.7-3.3 3.5Z"/><path d="M16.1 11.3c-.3-2.2 1.3-3.8 3.3-3.5.3 2.1-1.3 3.7-3.3 3.5Z"/>',
  transparency: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/><path d="M8.5 13.5l2 2 4.5-5"/>',
  quality: '<path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.1 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.8 1.2-1.7 2.7-2.8 4.7-2.8 3.2 0 5.3 2.9 4.3 6.2-1.5 4.7-9 9.3-9 9.3Z"/><path d="M12 9.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3Z"/>',
  bread: '<path d="M4 15.5C2.5 14 3 10.5 6 9c3-1.6 8.4-2.3 11.8-1.4 3.4.9 4 4.2 2.4 6.3-.8 1-1.9 1.6-3.2 2.1-3 1.1-9.4 1.3-13 -.5Z"/><path d="M8 10.5l1.2 3"/><path d="M11.5 9.6l1.2 3.2"/><path d="M15 9.3l1.1 3.2"/>',
  recycle: '<path d="M7.2 19.5H4.8a1.8 1.8 0 0 1-1.6-2.7l2.4-4.1"/><path d="M11 19.5h8.2a1.8 1.8 0 0 0 1.6-2.7l-1.6-2.8"/><path d="M8.5 17.2 11 19.5l-2.5 2.3"/><path d="M9.2 7.2l1.2-2.1a1.8 1.8 0 0 1 3.1 0l4.1 7.1"/><path d="M4 10.3l1.6-3.4 3.4.9"/><path d="M14.4 12.4l3.1-.2.9-3.3"/>',
  seedling: '<path d="M12 21v-8"/><path d="M12 13C9 13 6.5 10.5 6.5 6.5 10 6.5 12 9 12 13Z"/><path d="M12 11c0-4 2.6-7 7-7 0 4-2.8 7-7 7Z"/><path d="M5 21h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  arrow: '<path d="M4 12h15"/><path d="M13.5 6.5 19 12l-5.5 5.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  chef: '<path d="M7 15.5h10V20H7z"/><path d="M7 15.5c-2.3-.3-4-2.2-4-4.5a4.5 4.5 0 0 1 5.3-4.4 4.5 4.5 0 0 1 7.4 0A4.5 4.5 0 0 1 21 11c0 2.3-1.7 4.2-4 4.5"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  pin: '<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5v-1a5.5 5.5 0 0 1 11 0v1"/><circle cx="17" cy="9" r="2.3"/><path d="M16.5 14a4.5 4.5 0 0 1 5 4.5v1"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H9v3h2.5V21"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  mercado: '<path d="M12 21c-4.5 0-8-3-8-8 0-4.5 3.5-8.5 8-9 4.5.5 8 4.5 8 9 0 5-3.5 8-8 8Z"/><path d="M12 17c-2-2-2.5-5 0-8 2.5 3 2 6 0 8Z"/><path d="M12 17v3"/>',
};

function iconSVG(name, extraClass = '') {
  const body = ICONS[name];
  if (!body) return '';
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function renderIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'icon-wrap ' + (el.className || '');
    wrapper.innerHTML = iconSVG(el.dataset.icon);
    el.replaceWith(wrapper);
  });
}

/* Rama de hojas decorativa (SVG) */
function leafBranchSVG() {
  return `<svg viewBox="0 0 120 160" fill="none" aria-hidden="true">
    <path d="M60 158C58 120 62 70 92 8" stroke="#9fb46f" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M62 120c-22-2-38-16-44-38 22 0 40 14 44 38Z" fill="#b9c98b"/>
    <path d="M66 92c20-6 36-22 38-44-20 6-36 22-38 44Z" fill="#a9bd78"/>
    <path d="M72 62c-18-4-30-18-32-38 18 4 30 18 32 38Z" fill="#c6d49d"/>
    <path d="M83 34c14-8 22-20 22-34-14 6-22 18-22 34Z" fill="#b3c585"/>
    <path d="M58 146c18-8 34-6 48 4-16 8-32 6-48-4Z" fill="#c2d196"/>
  </svg>`;
}
