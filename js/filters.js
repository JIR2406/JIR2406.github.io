(function(){
  const filterButtons = Portfolio.$$('.filter-btn');
  const cards = Portfolio.$$('#project-list .project-card');
  const searchInput = document.getElementById('project-search');
  const countEl = document.getElementById('project-count');
  const noResults = document.getElementById('no-results');

  let currentFilter = 'all';
  let searchTerm = '';

  function updateVisibility() {
    let visible = 0;
    const normalizedSearch = Portfolio.normalize(searchTerm);
    cards.forEach(card => {
      const tags = card.dataset.tags;
      const text = Portfolio.normalize(card.innerText);
      const matchFilter = currentFilter === 'all' || tags.includes(currentFilter);
      const matchSearch = !normalizedSearch || text.includes(normalizedSearch);
      const show = matchFilter && matchSearch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    countEl.textContent = visible;
    noResults.hidden = visible > 0;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      updateVisibility();
    });
  });

  searchInput?.addEventListener('input', Portfolio.debounce(e => {
    searchTerm = e.target.value;
    updateVisibility();
  }, 120));

  updateVisibility();
})();