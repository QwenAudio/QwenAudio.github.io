// Preserve shared links to sections of the original FunAudioLLM homepage.
const legacyHash = /^(App-|CosyVoice-|SenseVoice-)|^(Demos|(?:audioSlider|generatedAudio|sliderValue)[1-5])$/;
function forwardLegacySection() {
  let fragment = '';
  try { fragment = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (legacyHash.test(fragment)) {
    window.location.replace('/sensevoice-cosyvoice/' + window.location.search + window.location.hash);
  }
}
window.addEventListener('hashchange', forwardLegacySection);
forwardLegacySection();
const languageButton = document.getElementById('language');
const translated = [...document.querySelectorAll('[data-zh]')];
for (const element of translated) element.dataset.en = element.textContent;
let language = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
try {
  const saved = localStorage.getItem('qwen-audio-language');
  if (saved === 'zh' || saved === 'en') language = saved;
} catch { /* Storage is optional. */ }
function renderLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  for (const element of translated) element.textContent = element.dataset[language];
  languageButton.textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
}
languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  try { localStorage.setItem('qwen-audio-language', language); } catch { /* Storage is optional. */ }
  renderLanguage();
});
renderLanguage();
