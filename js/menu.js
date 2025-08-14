(function(){
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && e.target !== menuToggle && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
})();