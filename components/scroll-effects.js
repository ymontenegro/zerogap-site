// Header scroll effect y barra de progreso
const header = document.querySelector('header');
const scrollProgress = document.getElementById('scrollProgress');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (header) {
    // Header glassmorphism effect
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  if (scrollProgress) {
    // Scroll progress indicator
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
    scrollProgress.style.width = scrolled + '%';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id !== 'hero') {
      observer.observe(section);
    }
  });
});
