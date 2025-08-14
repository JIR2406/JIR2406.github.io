(function(){
  const carousels = Portfolio.$$('.carousel');

  carousels.forEach(carousel => {
    const viewport = carousel.querySelector('.carousel__viewport');
    let slides = Array.from(viewport.querySelectorAll('.carousel__slide'));
    const btnPrev = carousel.querySelector('.prev');
    const btnNext = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    let index = 0;
    let isPointerDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function setupDots() {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label','Ir a diapositiva '+(i+1));
        b.setAttribute('role','tab');
        if (i === index) b.setAttribute('aria-selected','true');
        b.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(b);
      });
    }

    function updateDots() {
      Array.from(dotsContainer.children).forEach((d,i)=>{
        d.setAttribute('aria-selected', i === index ? 'true':'false');
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      viewport.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    btnPrev?.addEventListener('click', () => goTo(index - 1));
    btnNext?.addEventListener('click', () => goTo(index + 1));

    // Swipe
    function pointerDown(e) {
      isPointerDown = true;
      startX = e.clientX || e.touches?.[0].clientX;
      viewport.style.transition = 'none';
    }
    function pointerMove(e) {
      if (!isPointerDown) return;
      const x = e.clientX || e.touches?.[0].clientX;
      const delta = x - startX;
      currentTranslate = prevTranslate + delta;
      viewport.style.transform = `translateX(${currentTranslate}px)`;
    }
    function pointerUp(e) {
      if (!isPointerDown) return;
      isPointerDown = false;
      const moved = currentTranslate - prevTranslate;
      const threshold = viewport.clientWidth * 0.15;
      if (moved < -threshold) index++;
      else if (moved > threshold) index--;
      viewport.style.transition = '';
      goTo(index);
      prevTranslate = -index * viewport.clientWidth;
      currentTranslate = prevTranslate;
    }

    viewport.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);
    viewport.addEventListener('touchstart', pointerDown, { passive:true });
    viewport.addEventListener('touchmove', pointerMove, { passive:true });
    viewport.addEventListener('touchend', pointerUp);

    viewport.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') goTo(index+1);
      if (e.key === 'ArrowLeft') goTo(index-1);
    });

    setupDots();
    goTo(0);
  });
})();