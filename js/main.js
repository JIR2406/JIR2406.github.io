(function(){
  // Año dinámico
  document.getElementById('year').textContent = new Date().getFullYear();

  // Marcar imágenes shimmer al cargar
  Portfolio.$$('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
      img.parentElement?.classList.remove('shimmer');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        img.parentElement?.classList.remove('shimmer');
      });
    }
  });
})();