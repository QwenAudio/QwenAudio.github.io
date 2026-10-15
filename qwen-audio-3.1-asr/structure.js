/* Preserve the live site's information architecture, using the audited preview blocks. */
(()=>{
 const tabs=[...document.querySelectorAll('[data-result-tab]')];
 let selected=0;
 function selectResult(name){
  selected=tabs.findIndex(b=>b.dataset.resultTab===name);
  if(selected<0)return;
  tabs.forEach((button,i)=>{
   const active=i===selected;
   button.setAttribute('aria-selected',active);
   button.tabIndex=active?0:-1;
   document.getElementById(button.getAttribute('aria-controls')).hidden=!active;
  });
  document.querySelectorAll('audio,video').forEach(m=>m.pause());
 }
 tabs.forEach(button=>button.addEventListener('click',()=>selectResult(button.dataset.resultTab)));
 document.querySelectorAll('[data-result-link]').forEach(link=>link.addEventListener('click',()=>selectResult(link.dataset.resultLink)));
 document.getElementById('result-tabs').addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(selected+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  selectResult(tabs[next].dataset.resultTab);tabs[next].focus();
 });
 selectResult('asr');
})();
