// src/utils/scrollAnimation.js
export const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements with animation classes
  document.querySelectorAll('.about-card, .highlight-facts, .quote-section').forEach(el => {
    observer.observe(el);
  });
};

// Panggil di useEffect komponen AboutJombang jika menggunakan scroll animation