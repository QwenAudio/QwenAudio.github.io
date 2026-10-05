import { createGeography } from './hero-geography.js';
import { createCapabilityScenes } from './hero-scenes.js';
import { createLogo } from './hero-logo.js';

const $ = s => document.querySelector(s);
const tour = $('#top');
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const chapters = [
 {id:'languages',duration:9,short:['Languages','多语言'],category:'MULTILINGUAL ASR',title:['30 languages.<br>One world.','30 种语言，<br>同一个世界。'],description:['Hear speech across languages. Keep every voice in its original writing system.','让不同语言的声音，以原本的文字被听见。'],scope:['Highlighted countries and cities represent sample locations, not the full distribution of each language.','点亮国家和城市为音频样例代表地点，不代表语言的全部使用范围。'],cta:['Explore language samples','探索多语言音频'],target:'demo',kind:'languages'},
 {id:'dialects',duration:9,short:['Dialects','中文方言'],category:'DIALECT ASR / AST',title:['Local voices.<br>Shared meaning.','乡音各异，<br>同样听懂。'],description:['16 Chinese dialects, with source transcripts and translations. Explore voices across regions.','16 种中文方言，保留乡音表达，也能转写为普通话。'],scope:['Actual provincial boundaries; markers represent the cities of the supplied dialect samples.','真实省级边界；标记对应所提供方言样例的代表城市。'],cta:['Listen to dialects','试听中文方言'],target:'demo',kind:'dialects'},
 {id:'speakers',duration:11.3,short:['Speakers','分角色'],category:'SPEAKER-DIARIZED ASR',title:['Every speaker.<br>Every turn.','谁在说，<br>说了什么。'],description:['Follow a five-person conversation with speaker labels, words and timestamps.','多人交谈、交替与重叠发言，对应到每位说话人的文字和时间戳。'],scope:['Source transcript animation · non-streaming Flash / Next. Audio plays only on request below.','录音转写动画 · 非流式 Flash / Next。进入下方示例后可播放原音频。'],cta:['Explore the conversation','试听分角色识别'],target:'speakers'},
 {id:'understanding',duration:9,short:['Understanding','音频理解'],category:'GENERAL AUDIO UNDERSTANDING',title:['Beyond speech.<br>Into sound.','不止语音，<br>更懂声音。'],description:['Speech, environmental sound and music. Describe, locate and reason about what you hear.','理解人声、环境声与音乐：描述声音、定位事件，回答音频问题。'],scope:['Capability illustration · general audio understanding is available in Next.','功能示意 · 泛音频理解由 Next 提供。'],cta:['Explore audio understanding','探索音频理解'],target:'understanding'},
 {id:'context',duration:8,short:['Context','上下文'],category:'CONTEXT & DOMAIN ENTITIES',title:['Keep context.<br>Get it right.','联系上下文，<br>听准专有词。'],description:['Historical context helps resolve names, brands, organizations and technical terms.','历史内容辅助纠正人名、品牌、组织和专业术语，让前后表达连贯。'],scope:['Illustrative correction from the supplied capability overview.','示例来源：所提供的模型能力总览图。'],cta:['Explore context corrections','查看上下文纠错'],target:'examples',feature:'context'},
 {id:'hotword',duration:8,short:['Hotwords','分层热词'],category:'HIERARCHICAL HOTWORDS',title:['Your terms.<br>In priority.','你的词汇，<br>优先识别。'],description:['P0 for high-confidence terms. P1 for a broader candidate pool.','P0 提供高置信优先词，P1 补充更广的候选集合。'],scope:['Illustrative P0 / P1 conditioning, not a live recognition request.','P0 / P1 条件控制示意，非实时识别请求。'],cta:['Explore hotword control','查看热词效果'],target:'examples',feature:'hotword'},
 {id:'polishing',duration:8,short:['Polishing','原生润色'],category:'NATIVE TRANSCRIPTION POLISHING',title:['Keep meaning.<br>Lose the noise.','去掉冗余，<br>保留本意。'],description:['Remove fillers, repetitions and self-corrections inside the recognition pass.','在识别过程中处理语气词、重复、自我修正与格式，让转写更易读。'],scope:['Capability illustration · Flash-Message / Flash / Next.','功能示意 · Flash-Message / Flash / Next。'],cta:['Watch native polishing','观看原生润色'],target:'examples',feature:'polishing'},
 {id:'streaming',duration:9,short:['Streaming','流式识别'],category:'FAST & STREAMING',title:['Speech flows.<br>Text follows.','话音流动，<br>文字随行。'],description:['Incremental transcripts as speech arrives. Explore the original side-by-side replay below.','语音不断输入，文字逐步呈现。进入下方观看原始流式对比回放。'],scope:['Emission animation is illustrative. The original comparison timing is preserved in the replay below.','首屏出字为功能示意；下方对比回放保留原始出字时序。'],cta:['Watch streaming playback','观看流式对比'],target:'streaming'}
];
let chapterIndex=0, elapsed=0, previous=0, running=true, visible=true, geo=null;
let reduced=reducedQuery.matches, explicitPause=reduced, lastLang='', menuOpen=false;
const semantics=createCapabilityScenes($('#tour-semantic'));
const logo=createLogo($('#tour-logo'));
let logoTime=0;
let captionFrame=0;
function fitCaption(){
 cancelAnimationFrame(captionFrame);
 captionFrame=requestAnimationFrame(()=>{
  const caption=$('.tour-caption');
  delete tour.dataset.captionDensity;
  if(matchMedia('(max-width:900px)').matches){
   tour.style.setProperty('--mobile-caption-height',`${Math.ceil(caption.getBoundingClientRect().height)}px`);
  }else{
   for(const density of ['compact','tight','scroll']){
    if(caption.scrollHeight<=caption.clientHeight+1)break;
    tour.dataset.captionDensity=density;
   }
  }
  logo.resize();
 });
}
const t=pair => pair[document.documentElement.lang.startsWith('zh')?1:0];
const nav=$('#tour-chapters');
nav.innerHTML=chapters.map((c,i)=>`<button type="button" class="tour-chapter${i===0?' is-active':''}" data-chapter-index="${i}" aria-pressed="${i===0}"><small>${String(i+1).padStart(2,'0')}</small><b>${t(c.short)}</b></button>`).join('');

function localize(){
 const c=chapters[chapterIndex];
 $('#tour-number').textContent=`${String(chapterIndex+1).padStart(2,'0')} / 08`;
 $('#tour-category').textContent=c.category;
 $('#tour-title').innerHTML=t(c.title).replaceAll('<br>','<br> ');
 $('#tour-description').textContent=t(c.description);
 $('#tour-scope').textContent=t(c.scope);
 $('#tour-enter-label').textContent=t(c.cta);
 $('#tour-enter').href=`#${c.target}`;
 $('#tour-semantic').setAttribute('aria-label',t(c.cta));
 nav.querySelectorAll('button').forEach((b,i)=>{b.querySelector('b').textContent=t(chapters[i].short);b.setAttribute('aria-label',t(chapters[i].short));});
 updatePauseLabel();
 fitCaption();
}
function updatePauseLabel(){
 $('#tour-pause-label').textContent=t(explicitPause?['Play','播放']:['Pause','暂停']);
 $('#tour-pause-symbol').textContent=explicitPause?'▶':'Ⅱ';
 $('#tour-pause').setAttribute('aria-pressed',String(explicitPause));
 $('#tour-status').textContent=t(explicitPause?['Paused · choose any scene','已暂停 · 可选择任意场景']:['Auto tour · click to explore','自动循环 · 点击进入']);
 tour.classList.toggle('tour-is-paused',explicitPause);
}
function setChapter(index){
 const menu=$('#tour-geography .geo-language-menu');if(menu)menu.open=false;menuOpen=false;
 chapterIndex=(index+chapters.length)%chapters.length;
 elapsed=explicitPause?(chapterIndex<2?2.5:chapters[chapterIndex].duration*.72):0;
 const c=chapters[chapterIndex];tour.dataset.chapter=c.id;
 const geographic=chapterIndex<2;
 $('#tour-geography').hidden=!geographic;$('#tour-semantic').hidden=geographic;
 nav.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('is-active',i===chapterIndex);b.setAttribute('aria-pressed',String(i===chapterIndex));});
 localize();renderScene();
}
function renderScene(){
 logo.render(logoTime,{reduced});
 const c=chapters[chapterIndex];
 const entry=reduced?1:Math.min(1,elapsed/.8);tour.style.setProperty('--entry',String(1-Math.pow(1-entry,3)));
 tour.style.setProperty('--chapter-progress',String(Math.max(.015,elapsed/c.duration)));
 if(chapterIndex<2)geo?.render(c.id,elapsed,{reduced});
 else semantics.render(c.id,elapsed,{reduced});
}
function enter(c,selection=null){
 const menu=$('#tour-geography .geo-language-menu');if(menu)menu.open=false;menuOpen=false;
 if(c.kind){
  $(`[data-audio-tab="${c.kind}"]`)?.click();
  if(selection){
   const buttons=[...document.querySelectorAll('#sample-chooser .showcase-chip')];
   const button=c.kind==='dialects'?buttons[selection.index]:buttons.find(b=>b.querySelector('b')?.textContent.trim().toLowerCase()===selection.code);
   button?.click();
  }
 }
 if(c.feature)$(`[data-example-tab="${c.feature}"]`)?.click();
 const target=selection?'listen':c.target;
 const element=document.getElementById(target);if(!element)return;
 history.replaceState(null,'',`#${target}`);
 // Preserve native scrolling; do not trap the wheel or manufacture a second scroll container.
 window.scrollTo({top:element.getBoundingClientRect().top+window.scrollY-30,behavior:reduced?'auto':'smooth'});
}
$('#tour-enter').addEventListener('click',e=>{e.preventDefault();enter(chapters[chapterIndex]);});
$('#tour-semantic').setAttribute('role','link');$('#tour-semantic').setAttribute('tabindex','0');
$('#tour-semantic').addEventListener('click',()=>enter(chapters[chapterIndex]));
$('#tour-semantic').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enter(chapters[chapterIndex]);}});
nav.addEventListener('click',e=>{const b=e.target.closest('[data-chapter-index]');if(b)setChapter(+b.dataset.chapterIndex);});
nav.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();setChapter(e.key==='Home'?0:e.key==='End'?7:chapterIndex+(e.key==='ArrowRight'?1:-1));nav.children[chapterIndex].focus();});
$('#tour-pause').addEventListener('click',()=>{explicitPause=!explicitPause;updatePauseLabel();});
$('#tour-replay').addEventListener('click',()=>{logoTime=0;explicitPause=reduced;setChapter(0);updatePauseLabel();});
tour.addEventListener('geography-menu-toggle',e=>{menuOpen=Boolean(e.detail.open);});
new MutationObserver(()=>{lastLang=document.documentElement.lang;localize();renderScene();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
new IntersectionObserver(([entry])=>{
 visible=entry.isIntersecting&&entry.intersectionRatio>.1;
 tour.dataset.running=String(visible&&!explicitPause);
},{threshold:[0,.1,.3,.8]}).observe(tour);
reducedQuery.addEventListener('change',e=>{reduced=e.matches;explicitPause=reduced;updatePauseLabel();renderScene();});
document.addEventListener('visibilitychange',()=>{running=!document.hidden;previous=0;});
function tick(now){
 const delta=previous?Math.min((now-previous)/1000,.05):0;previous=now;
 if(visible&&running){
  if(!explicitPause)logoTime+=delta;
  if(!explicitPause&&!menuOpen){elapsed+=delta;if(elapsed>=chapters[chapterIndex].duration){if(window.__recording===true&&chapterIndex===7){explicitPause=true;updatePauseLabel();}else setChapter(chapterIndex+1);}}
  if(!explicitPause||tour.dataset.lastFrame!==String(chapterIndex)){renderScene();tour.dataset.lastFrame=String(chapterIndex);}
 }
 tour.dataset.running=String(visible&&running&&!explicitPause);
 window.__ready=true;requestAnimationFrame(tick);
}
setChapter(0);requestAnimationFrame(tick);
createGeography($('#tour-geography'),selection=>enter(chapters[selection.kind==='languages'?0:1],selection)).then(g=>{geo=g;geo.resize();renderScene();}).catch(error=>{
 console.warn('Geographic tour unavailable:',error);$('#tour-geography').innerHTML='<a class="tour-enter" href="#demo">Explore the audio atlas ↗</a>';
});
new ResizeObserver(()=>{fitCaption();geo?.resize();semantics.resize();logo.resize();renderScene();}).observe(tour);
document.fonts.ready.then(fitCaption);
window.addEventListener('pagehide',e=>{if(!e.persisted){geo?.dispose();semantics.dispose();logo.dispose();}});
window.addEventListener('pageshow',()=>{running=!document.hidden;previous=0;});
