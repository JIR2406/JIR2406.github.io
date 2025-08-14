(function(){
  const sections = Portfolio.$$('main section[id]');
  const navLinks = Portfolio.$$('#site-nav a');
  const progress = document.getElementById('scroll-progress');

  function setActive(id) {
    navLinks.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#'+id ? 'true':'false'));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-50% 0px -45% 0px', threshold: 0.01 });

  sections.forEach(sec => observer.observe(sec));

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.value = scrolled;
  }, { passive:true });
})();