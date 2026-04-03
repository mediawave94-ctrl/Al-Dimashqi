document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('header');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');

  // Mobile menu toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Theme Toggle Logic
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // RTL/LTR Mode Logic
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  
  if (langToggle) {
    langToggle.innerText = currentDir === 'rtl' ? 'EN' : 'AR';
    langToggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      if (dir === 'rtl') {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
        langToggle.innerText = 'AR';
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
        langToggle.innerText = 'EN';
      }
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Unobserve to animate only once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
});
