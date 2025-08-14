(function(){
  const base = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';
  document.querySelectorAll('.ccard[data-logo]').forEach(card=>{
    const name = card.getAttribute('data-logo').toLowerCase();
    const img = card.querySelector('.ccard__logo img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = base + name + '.svg';
    img.onerror = () => {
      img.onerror = null;
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="%23ccc" width="64" height="64"/><text x="50%" y="52%" font-size="10" fill="%23000" text-anchor="middle" font-family="Arial">LOGO</text></svg>');
    };
  });
})();