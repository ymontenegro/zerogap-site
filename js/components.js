/**
 * Component Loader for Zerogap Website
 *
 * Estrategia de "progressive enhancement":
 *  - En producción el servidor (server.js) inyecta el header y el footer
 *    directamente en el HTML, de modo que los crawlers (incluidos los de IA,
 *    que no ejecutan JS) ven la navegación y los enlaces internos. En ese caso
 *    aquí sólo inicializamos la interactividad (menú móvil, link activo, scroll).
 *  - Si el header/footer NO están presentes (p. ej. abriendo el HTML como
 *    archivo estático, sin servidor), hacemos fetch de los componentes como
 *    respaldo para no perder la navegación.
 */

document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupFooter();
});

async function setupHeader() {
  // Caso 1: el servidor ya inyectó el header → sólo inicializar.
  if (document.querySelector('.site-header')) {
    initHeader();
    return;
  }

  // Caso 2: existe el placeholder → fetch de respaldo.
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('/components/header.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const headerElement = tempDiv.querySelector('header');
    if (!headerElement) return;

    placeholder.replaceWith(headerElement);
    initHeader();
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

async function setupFooter() {
  // Caso 1: el servidor ya inyectó el footer → nada que hacer.
  if (document.querySelector('.site-footer')) return;

  // Caso 2: existe el placeholder → fetch de respaldo.
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('/components/footer.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const footerElement = tempDiv.querySelector('footer');
    if (!footerElement) return;

    placeholder.replaceWith(footerElement);
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

function initHeader() {
  // 1. Resaltar el enlace activo (soporta rutas con y sin .html)
  const currentPath = window.location.pathname;
  let filename = currentPath.split('/').pop() || 'index.html';
  if (filename === '') filename = 'index.html';
  // Normalizar rutas limpias: /asicam -> asicam.html
  if (filename && !filename.includes('.')) filename = filename + '.html';

  const navLinks = document.querySelectorAll('.main-nav__link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive =
      href === filename ||
      (filename === 'index.html' && (href === './' || href === 'index.html' || href === '/'));
    link.classList.toggle('main-nav__link--active', isActive);
  });

  // 2. Menú móvil
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const body = document.body;

  if (menuToggle && navMenu && menuOverlay) {
    function toggleMenu() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
    }

    function closeMenu() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      body.classList.remove('no-scroll');
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // 3. Efecto de scroll en el header + barra de progreso
  const header = document.querySelector('.site-header');
  const scrollProgress = document.getElementById('scrollProgress');

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    if (header) {
      header.classList.toggle('site-header--scrolled', currentScroll > 50);
    }

    if (scrollProgress) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
      scrollProgress.style.width = scrolled + '%';
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}
