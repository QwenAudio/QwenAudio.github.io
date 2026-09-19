// Render responsive, accessible legends over the archived plots' legend band.
// Plot geometry, points, values and the historical source assets are unchanged.
(() => {
  const plots = {
    'dialect-cer-hd.png': ['Doubao-ASR', 'Tencent Hy-ASR-3.0-preview'],
    'dialect-consistency.png': ['Doubao-ASR', 'Tencent Hy-ASR-3.0-preview'],
    'industry-radar.png': ['Doubao-ASR', 'Tencent Hy-ASR-3.0-preview'],
    'entity-recall.png': ['Doubao-ASR', 'Fun-ASR-Flash']
  };
  function update() {
    document.querySelectorAll('img').forEach(img => {
      const name = img.getAttribute('src')?.split('/').pop();
      const labels = plots[name];
      let wrapper = img.parentElement;
      if (!labels) {
        if (wrapper.classList.contains('chart-brand31')) {
          wrapper.replaceWith(img);
        }
        return;
      }
      if (!wrapper.classList.contains('chart-brand31')) {
        wrapper = document.createElement('div');
        wrapper.className = 'chart-brand31';
        img.replaceWith(wrapper);
        wrapper.append(img);
      }
      if (wrapper.dataset.plot === name) return;
      wrapper.dataset.plot = name;
      wrapper.querySelector('.chart-legend31')?.remove();
      const legend = document.createElement('div');
      legend.className = 'chart-legend31';
      [...labels, 'Qwen-Audio-3.1-ASR'].forEach((label, i) => {
        const item = document.createElement('span');
        item.style.setProperty('--key-color', ['#a996df', '#9ba0b6', '#7047df'][i]);
        item.textContent = label;
        legend.append(item);
      });
      wrapper.append(legend);
    });
  }
  update();
  new MutationObserver(update).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['src']});
})();
