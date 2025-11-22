/**
 * Component Loader for Zerogap Website
 * Loads header and footer dynamically and handles their functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});

async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) {
    console.error('Header placeholder not found');
    return;
  }

  try {
    console.log('Fetching header...');
    const response = await fetch('/components/header.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Get the header element
    const headerElement = tempDiv.querySelector('header');

    if (!headerElement) {
      console.error('Header element not found in response');
      return;
    }

    // Replace placeholder with header
    placeholder.replaceWith(headerElement);
    console.log('Header loaded successfully');

    // Initialize header functionality
    initHeader();
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) {
    console.error('Footer placeholder not found');
    return;
  }

  try {
    console.log('Fetching footer...');
    const response = await fetch('/components/footer.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Get the footer element
    const footerElement = tempDiv.querySelector('footer');

    if (!footerElement) {
      console.error('Footer element not found in response');
      return;
    }

    // Replace placeholder with footer
    placeholder.replaceWith(footerElement);
    console.log('Footer loaded successfully');
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

function initHeader() {
  // 1. Highlight active link
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.main-nav__link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === 'index.html' && href === './')) {
      link.classList.add('main-nav__link--active');
    } else {
      link.classList.remove('main-nav__link--active');
    }
  });

  // 2. Mobile Menu Toggle
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

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 3. Scroll Effect
  const header = document.querySelector('.site-header');
  const scrollProgress = document.getElementById('scrollProgress');

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Header glassmorphism effect
    if (currentScroll > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }

    // Scroll progress indicator
    if (scrollProgress) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (currentScroll / scrollHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  }

  window.addEventListener('scroll', handleScroll);
  // Trigger once on load to set initial state
  handleScroll();
}
