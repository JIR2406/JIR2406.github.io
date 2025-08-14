(function(){
  const wrappers = Portfolio.$$('.iframe-wrapper');
  const opts = { rootMargin: '200px 0px', threshold: 0.01 };

  function loadIframe(wrapper) {
    if (wrapper.dataset.loaded) return;
    const src = wrapper.dataset.iframe;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Video';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    wrapper.dataset.loaded = 'true';
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadIframe(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  wrappers.forEach(w => {
    const btn = w.querySelector('.iframe-load-btn');
    btn?.addEventListener('click', () => loadIframe(w));
    observer.observe(w);
  });
})();