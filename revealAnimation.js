document.addEventListener('DOMContentLoaded', function() {
  // Seleciona apenas os elementos com classe "reveal" que estão dentro de uma section
  const reveals = document.querySelectorAll('section .reveal');
  
  // Atribui um índice a cada elemento para calcular o delay
  reveals.forEach((el, index) => {
    el.dataset.index = index;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const delay = entry.target.dataset.index * 150;
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
});