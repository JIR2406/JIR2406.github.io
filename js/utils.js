window.Portfolio = window.Portfolio || {};

Portfolio.$ = (sel, ctx=document) => ctx.querySelector(sel);
Portfolio.$$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

Portfolio.debounce = (fn, wait=160) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), wait);
  };
};

Portfolio.normalize = str =>
  str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9 ]/g,' ')
    .replace(/\s+/g,' ')
    .trim();