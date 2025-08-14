(async function(){
  const base = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';
  const cards = document.querySelectorAll('.ccard[data-logo]');
  for (const card of cards) {
    const key = 'logo:' + card.dataset.logo;
    let svg = localStorage.getItem(key);
    if (!svg) {
      try {
        const res = await fetch(base + card.dataset.logo + '.svg');
        if (!res.ok) throw 0;
        svg = await res.text();
        localStorage.setItem(key, svg);
      } catch {
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#ccc"/></svg>';
      }
    }
    const box = card.querySelector('.ccard__logo');
    box.innerHTML = svg;
    box.querySelector('svg')?.setAttribute('aria-label', card.dataset.logo);
  }
})();