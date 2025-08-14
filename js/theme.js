(function(){
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const metaTheme = document.getElementById('meta-theme-color');
  const PREF_KEY = 'jg-theme';

  function applyTheme(mode) {
    const dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', dark);
    toggle?.setAttribute('aria-pressed', String(dark));
    metaTheme && (metaTheme.content = dark ? '#12161d' : '#1976d2');
  }

  function getStored() {
    return localStorage.getItem(PREF_KEY) || 'auto';
  }

  function setStored(val) {
    localStorage.setItem(PREF_KEY, val);
  }

  function cycleTheme() {
    const current = getStored();
    const next = current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
    setStored(next);
    applyTheme(next);
    toggle.title = 'Tema: ' + next;
  }

  toggle?.addEventListener('click', cycleTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>applyTheme(getStored()));
  applyTheme(getStored());
})();