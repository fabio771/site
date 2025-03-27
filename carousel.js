document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const container = document.querySelector('.carousel-track-container');
  let currentSlide = 0;

  // Clonar os primeiros e últimos slides para criar o efeito de loop infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // Atualizar a lista de slides após a clonagem
  const updatedSlides = Array.from(track.children);

  // Função que atualiza o carrossel: centraliza o slide ativo e atualiza as opacidades
  function updateCarousel() {
    const containerWidth = container.getBoundingClientRect().width;
    const slideWidth = updatedSlides[0].getBoundingClientRect().width;
    const effectiveSlideWidth = slideWidth + 10; // 50px de margem total
    const offset = currentSlide * effectiveSlideWidth - (containerWidth - slideWidth * 4) / 4;
    track.style.transform = 'translateX(-' + offset + 'px)';

    updatedSlides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide || index === currentSlide + 1);
    });
  }

  // Função para ir para o próximo slide (loop infinito)
  nextButton.addEventListener('click', function() {
    currentSlide++;
    if (currentSlide >= updatedSlides.length - 1) {
      currentSlide = 1;
      track.style.transition = 'none';
      updateCarousel();
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        currentSlide++;
        updateCarousel();
      }, 50);
    } else {
      updateCarousel();
    }
  });

  // Função para ir para o slide anterior (loop infinito)
  prevButton.addEventListener('click', function() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = updatedSlides.length - 2;
      track.style.transition = 'none';
      updateCarousel();
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        currentSlide--;
        updateCarousel();
      }, 50);
    } else {
      updateCarousel();
    }
  });

  // Recalcula o posicionamento ao redimensionar a janela
  window.addEventListener('resize', updateCarousel);

  // Inicializa o carrossel
  updateCarousel();
});