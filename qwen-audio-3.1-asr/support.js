(() => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('figure-dialog');
  document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click', () => dialog?.showModal()));
  document.getElementById('figure-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  const back = document.getElementById('back-top');
  if (back) {
    new IntersectionObserver(([entry]) => { back.hidden = entry.isIntersecting; }).observe(document.getElementById('top'));
    back.addEventListener('click', () => window.scrollTo({top:0,behavior:media.matches?'auto':'smooth'}));
  }
})();
