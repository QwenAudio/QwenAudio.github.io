/* Full-window, source-grounded capability illustrations. The hero owns the clock. */
const svg = (body, cls = '', viewBox = '0 0 100 100') => `<svg class="${cls}" viewBox="${viewBox}" fill="none" aria-hidden="true">${body}</svg>`;
const wave = (count = 45, cls = '') => `<div class="hs-wave ${cls}" aria-hidden="true">${Array.from({ length: count }, (_, i) => `<i style="--bar:${i};--h:${20 + Math.abs(Math.sin(i * .73) * Math.cos(i * .21)) * 80}%"></i>`).join('')}</div>`;
const copy = (zh, en, cls = '') => `<span class="hs-copy ${cls}" data-zh="${zh}" data-en="${en}">${zh}</span>`;
const human = svg('<circle cx="50" cy="26" r="17" fill="url(#hs-person)"/><path d="M15 82c0-22 13-34 35-34s35 12 35 34v6H15z" fill="url(#hs-person)"/><path d="M21 77c4-15 13-23 29-23" stroke="white" stroke-opacity=".66" stroke-width="3" stroke-linecap="round"/><defs><linearGradient id="hs-person" x1="15" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse"><stop stop-color="#f7f1ff"/><stop offset=".42" stop-color="#a688ec"/><stop offset="1" stop-color="#6033cd"/></linearGradient></defs>', 'hs-human');
const speechIcon = svg('<rect x="32" y="16" width="36" height="51" rx="18" fill="currentColor"/><path d="M23 45v8a27 27 0 0 0 54 0v-8M50 80v11M34 92h32" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>');
const environmentIcon = svg('<path d="M19 53 8 42l13-15 18 8 12-5 17 5 14 19-7 17-21 9-25-10z" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="m29 42-7-13 16 7M63 40l4-18 13 26M35 76l-3 14M66 77l2 13" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="53" cy="48" r="3" fill="currentColor"/><path d="m65 56 8 3-7 6M84 37q8 10 0 20M92 30q12 18 0 35" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>');
const musicIcon = svg('<path d="M36 69V29l45-11v44M36 42l45-11" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><ellipse cx="24" cy="76" rx="14" ry="11" transform="rotate(-18 24 76)" fill="currentColor"/><ellipse cx="69" cy="70" rx="14" ry="11" transform="rotate(-18 69 70)" fill="currentColor"/>');
const arrow = svg('<path d="M0 10h94m-9-8 9 8-9 8" stroke="currentColor" stroke-width="2"/>', 'hs-inline-arrow', '0 0 96 20');
const segments = [
  [0,0,2.88,'如果没有的话，那就按这个方案执行。','If there are no objections, let’s proceed with this plan.'],
  [1,0,5.84,'我这边嗯呃有个小建议，能不能给首批收到的顾客送个小礼品？','I have, um, a small suggestion: could we give a small gift to the first customers who receive it?'],
  [2,2.88,3.74,'哎。','Yes.'],
  [2,5.93,8.87,'这个主意啊嗯不错，能提升好感度。','That’s a good idea, um, it could improve customer goodwill.'],
  [0,7.03,7.47,'嗯','Mm.'],
  [3,8.60,11.20,'礼品库存够吗？别到时候又缺货。','Do we have enough gifts in stock? Let’s not run out again.'],
  [4,8.91,9.86,'嗯','Mm.']
];
const streamPhrases = ['最近北京天气还不错。','帮我查一下北京到杭州的航班，','然后预订一个明天晚上从北京出发的航班。','再帮我看一下明天晚上杭州的酒店，','帮我预定一个包含早餐的酒店。'];

function markup() {
  return `
  <section class="hs-scene hs-speakers" data-hs="speakers" aria-label="Speaker diarization illustration">
    <div class="hs-people">${Array.from({length:5},(_,i)=>`<div class="hs-person" data-speaker="${i}" style="--person:${i}"><div class="hs-person-halo"></div><div class="hs-person-object">${human.replaceAll('hs-person)', `hs-person-${i})`).replace('id="hs-person"', `id="hs-person-${i}"`)}</div><b>SPK ${i}</b><div class="hs-person-signal">${wave(9)}</div></div>`).join('')}</div>
    <div class="hs-conversation-lines" aria-hidden="true">${svg('<path d="M100 0 500 70M300 0 500 70M500 0v70M700 0 500 70M900 0 500 70" stroke="#ab8ae9" stroke-width="1.4"/><circle cx="500" cy="70" r="5" fill="#7848df"/>','','0 0 1000 80')}</div>
    <div class="hs-transcript-output"><div class="hs-output-heading"><b>${copy('谁，在何时，说了什么','Who said what, and when')}</b><span class="hs-overlap">${copy('重叠说话','Overlapping speech')}</span></div><div class="hs-transcript-lines"></div></div>
    <div class="hs-timeline"><div class="hs-timeline-label"><span>${copy('说话人时间轨','Speaker timeline')}</span><code class="hs-speaker-time">0.00 s</code></div><div class="hs-tracks">${Array.from({length:5},(_,i)=>`<div class="hs-track"><b>${i}</b><div>${segments.filter(s=>s[0]===i).map(s=>`<i style="left:${s[1]/11.2*100}%;width:${(s[2]-s[1])/11.2*100}%"></i>`).join('')}</div></div>`).join('')}<span class="hs-playhead"></span></div></div>
    <p class="hs-footnote">${copy('Flash / Next · 已提供的五人会议录音示例，当前为静音动画','Flash / Next · Supplied five-speaker recording · Silent visual replay')}</p>
  </section>
  <section class="hs-scene hs-understanding" data-hs="understanding" aria-label="General audio understanding illustration">
    <div class="hs-sources">${[[speechIcon,'语音','Speech'],[environmentIcon,'环境声','Environment'],[musicIcon,'音乐','Music']].map(([icon,zh,en],i)=>`<div class="hs-source" data-source="${i}"><div class="hs-source-orb">${icon}<i></i></div><b>${copy(zh,en)}</b>${wave(17)}</div>`).join('')}</div>
    <div class="hs-sound-routing" aria-hidden="true">${svg('<path d="M110 0v14q0 22 30 22h320q40 0 40 28M500 0v64M890 0v14q0 22-30 22H540q-40 0-40 28" stroke="#ac89e5" stroke-width="2"/><circle cx="500" cy="64" r="7" fill="#7141da"/>','','0 0 1000 76')}<span>Qwen-Audio-3.1-ASR · Next</span></div>
    <div class="hs-understanding-results"><div class="hs-caption"><p class="hs-mini-label">${copy('声音描述','AUDIO CAPTION')}</p><strong>${copy('轻柔的音乐中，传来犬吠声。','A dog barks over soft music.')}</strong></div><div class="hs-audio-qa"><p class="hs-mini-label">${copy('音频问答','AUDIO QA')}</p><p>${copy('背景中能听到什么？','What is heard in the background?')}</p><strong>${copy('轻柔的音乐。','Soft music.')}</strong></div></div>
    <div class="hs-grounding"><div class="hs-grounding-top"><span>${copy('声音事件定位','SOUND EVENT LOCALIZATION')}</span><b>${copy('犬吠声','Dog bark')}</b></div>${wave(55)}<div class="hs-event-window hs-event-a"></div><div class="hs-event-window hs-event-b"></div><div class="hs-scan-line"></div><div class="hs-grounding-scale"><span>0 s</span><span>2 s</span><span>4 s</span><span>6 s</span></div></div>
    <p class="hs-footnote">${copy('Next 专属 · 功能示意；下方可试听真实样例','Next only · Capability illustration; recorded examples below')}</p>
  </section>
  <section class="hs-scene hs-context" data-hs="context" aria-label="Context and domain entities illustration">
    <div class="hs-history"><div class="hs-history-badge">${svg('<path d="M28 34h45M28 49h45M28 64h25M17 16h66v66H17z" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>')}</div><div><p class="hs-mini-label">${copy('历史上下文','HISTORICAL CONTEXT')}</p><p>The ASR demo compares <b>Qwen</b> and <b>Paraformer</b> on <b>DingTalk</b>.</p></div></div>
    <div class="hs-entity-orbit" aria-hidden="true"><span>Qwen</span><span>Paraformer</span><span>DingTalk</span></div>
    <div class="hs-context-before"><span class="hs-mini-label">${copy('未使用上下文','WITHOUT CONTEXT')}</span><p>Compare <del>Quinn</del> and Paraformer on <del>TikTok</del>.</p></div>
    <div class="hs-correction-bridge">${arrow}<span>${copy('上下文消歧','CONTEXT RESOLVES ENTITIES')}</span>${arrow}</div>
    <div class="hs-context-after"><span class="hs-mini-label">${copy('使用上下文','WITH CONTEXT')}</span><p>Compare <strong>Qwen</strong> and <strong>Paraformer</strong> on <strong>DingTalk</strong>.</p></div>
    <p class="hs-footnote">${copy('人物 · 品牌 · 组织 · 专业术语 · 长尾实体｜报告功能示例','People · Brands · Organizations · Technical terms · Long-tail entities · Report example')}</p>
  </section>
  <section class="hs-scene hs-hotword" data-hs="hotword" aria-label="Hierarchical hotword illustration">
    <div class="hs-priorities"><div class="hs-priority hs-p0"><div class="hs-priority-heading"><b>P0</b><span>${copy('高置信、高优先级','High confidence · High priority')}</span></div><div class="hs-word-band"><strong>Qwen</strong><strong>DingTalk</strong><strong>Paraformer</strong></div></div><div class="hs-priority hs-p1"><div class="hs-priority-heading"><b>P1</b><span>${copy('更广的候选词池','Broader candidate pool')}</span></div><div class="hs-word-band"><span>Quinn</span><span>TikTok</span><span>Performer</span><span>…</span></div></div></div>
    <div class="hs-hotword-routing" aria-hidden="true">${svg('<path d="M250 0v25q0 20 25 20h200q25 0 25 25M750 0v25q0 20-25 20H525q-25 0-25 25" stroke="#a681e4" stroke-width="2"/><path d="m490 60 10 12 10-12" stroke="#7648d6" stroke-width="3"/>','','0 0 1000 80')}<span>${copy('层级化热词提示','HIERARCHICAL CONDITIONING')}</span></div>
    <div class="hs-hotword-output"><p class="hs-mini-label">${copy('识别结果','CONDITIONED TRANSCRIPT')}</p><p>The demo compares<br><strong>Qwen</strong> and <strong>Paraformer</strong><br>on <strong>DingTalk</strong>.</p></div>
    <p class="hs-footnote">${copy('通过指令定制，保留统一的识别流程｜报告功能示例','Instruction-controlled customization in one recognition workflow · Report example')}</p>
  </section>
  <section class="hs-scene hs-polishing" data-hs="polishing" aria-label="Native transcript polishing illustration">
    <div class="hs-raw"><p class="hs-mini-label">${copy('原始转写','RAW TRANSCRIPT')}</p><p><span class="hs-remove" data-clean="0">um,</span> we need to <span class="hs-remove" data-clean="1">send</span> send the report on <span class="hs-remove" data-clean="2">Thursday, sorry,</span> Wednesday.</p></div>
    <div class="hs-polish-pass"><span></span><b>${copy('一次识别，原生润色','ONE PASS · NATIVE POLISHING')}</b><span></span></div>
    <div class="hs-polished"><p class="hs-mini-label">${copy('润色后转写','POLISHED TRANSCRIPT')}</p><p>We need to send the report on <strong>Wednesday.</strong></p></div>
    <div class="hs-polish-tags"><span>${copy('语气词移除','Filler removal')}</span><span>${copy('重复消除','Repetition')}</span><span>${copy('自我修正','Self-correction')}</span><span>${copy('格式规范','Formatting')}</span></div>
    <p class="hs-footnote">${copy('Flash-Message / Flash / Next · 报告功能示例','Flash-Message / Flash / Next · Report capability example')}</p>
  </section>
  <section class="hs-scene hs-streaming" data-hs="streaming" aria-label="Streaming transcription illustration">
    <div class="hs-live-audio"><div class="hs-live-dot"></div><span>${copy('北京 → 杭州 · 出行请求','BEIJING → HANGZHOU · TRAVEL REQUEST')}</span><b>${copy('流式输入','STREAMING INPUT')}</b></div>
    <div class="hs-stream-wave">${wave(75)}<div class="hs-stream-cursor"></div></div>
    <div class="hs-stream-route"><span>${copy('音频片段','AUDIO CHUNKS')}</span>${arrow}<img src="logo.svg" alt=""><span>Qwen-Audio-3.1-ASR</span>${arrow}<span>${copy('连续输出','INCREMENTAL TEXT')}</span></div>
    <div class="hs-stream-text" lang="zh-CN"><span></span><i aria-hidden="true"></i></div>
    <div class="hs-stream-progress"><span></span></div>
    <p class="hs-footnote">${copy('出字过程为动画示意 · 点击进入原始录制的音画同步对比','Illustrative text animation · Open the original synchronized comparison below')}</p>
  </section>`;
}

export function createCapabilityScenes(mount) {
  mount.classList.add('hs-root');
  mount.innerHTML = markup();
  const scenes = [...mount.querySelectorAll('[data-hs]')];
  const localeNodes = [...mount.querySelectorAll('.hs-copy')];
  const bars = new Map(scenes.map(scene => [scene.dataset.hs, [...scene.querySelectorAll('.hs-wave i')]]));
  const people = [...mount.querySelectorAll('.hs-person')];
  const sources = [...mount.querySelectorAll('.hs-source')];
  const transcript = mount.querySelector('.hs-transcript-lines');
  let lastMode = '', lastLang = '', lastSpeakerKey = '', lastFrame = -1, lastText = '';
  function localize() {
    const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
    if (lang === lastLang) return;
    lastLang = lang;
    localeNodes.forEach(node => node.textContent = node.dataset[lang]);
    lastSpeakerKey = '';
  }
  function render(mode, seconds, { reduced = false } = {}) {
    localize();
    if (mode !== lastMode) {
      scenes.forEach(scene => { const active = scene.dataset.hs === mode; scene.hidden = !active; scene.setAttribute('aria-hidden', String(!active)); });
      lastMode = mode; lastSpeakerKey = ''; lastFrame = -1;
    }
    // Deformations stay on the shared clock, so parent pause actually freezes them.
    const t = reduced ? 5.5 : Math.max(0, seconds);
    mount.style.setProperty('--hs-float', `${Math.sin(t * .8) * 4}px`);
    mount.style.setProperty('--hs-drift', `${Math.cos(t * .47) * 2}deg`);
    const frame = Math.floor(t * 20);
    if (frame !== lastFrame) {
      (bars.get(mode) || []).forEach((bar, i) => {
        const height = 13 + 80 * Math.abs(Math.sin(i * .61 + t * 2.8) * Math.cos(i * .15 - t * .9));
        bar.style.height = `${reduced ? 20 + Math.abs(Math.sin(i * .73) * Math.cos(i * .21)) * 74 : height}%`;
      });
      lastFrame = frame;
    }
    if (mode === 'speakers') {
      const moment = reduced ? 7.15 : t % 11.2;
      const active = segments.filter(s => moment >= s[1] && moment < s[2]);
      const current = active.length ? active : [segments.filter(s => s[1] <= moment).at(-1) || segments[0]];
      people.forEach((person, i) => { person.classList.toggle('is-speaking', active.some(s => s[0] === i)); person.style.setProperty('--hs-person-bounce', `${active.some(s=>s[0]===i)?Math.sin(t*4+i)*-3:0}px`); });
      const key = current.map(s=>segments.indexOf(s)).join(',') + lastLang;
      if (key !== lastSpeakerKey) {
        transcript.innerHTML = current.slice(0,2).map(s=>`<div class="hs-transcript-line"><b>SPK ${s[0]}</b><div><p>${s[lastLang==='zh'?3:4]}</p><code>${s[1].toFixed(2)}–${s[2].toFixed(2)} s</code></div></div>`).join('');
        lastSpeakerKey = key;
      }
      mount.querySelector('.hs-overlap').classList.toggle('is-visible', active.length > 1);
      mount.querySelector('.hs-speaker-time').textContent = `${moment.toFixed(2)} s`;
      mount.querySelector('.hs-playhead').style.left = `${moment/11.2*100}%`;
    } else if (mode === 'understanding') {
      sources.forEach((source, i) => source.classList.toggle('is-sounding', reduced || Math.floor(t / 1.8) % 3 === i));
      mount.querySelector('.hs-scan-line').style.left = `${(t % 6) / 6 * 100}%`;
      mount.querySelector('.hs-understanding-results').style.setProperty('--hs-output', String(reduced ? 1 : Math.min(1, .45+t*.18)));
    } else if (mode === 'context') {
      mount.querySelector('.hs-context').classList.toggle('is-resolved', reduced || t > 2.5);
    } else if (mode === 'hotword') {
      mount.querySelector('.hs-hotword').classList.toggle('is-conditioned', reduced || t > 2);
    } else if (mode === 'polishing') {
      mount.querySelectorAll('[data-clean]').forEach((node,i)=>node.classList.toggle('is-removed', reduced || t > 1+i*.8));
      mount.querySelector('.hs-polishing').classList.toggle('is-polished', reduced || t > 3.5);
    } else if (mode === 'streaming') {
      const amount = reduced ? 1 : Math.min(1, t / 7.4);
      const full = streamPhrases.join('');
      const shown = full.slice(0, Math.floor(full.length * amount));
      if (shown !== lastText) { mount.querySelector('.hs-stream-text > span').textContent = shown; lastText = shown; }
      mount.querySelector('.hs-stream-progress > span').style.width = `${amount * 100}%`;
      mount.querySelector('.hs-stream-cursor').style.left = `${amount * 100}%`;
      mount.querySelector('.hs-stream-text > i').style.opacity = reduced ? '1' : String(.3+.7*Math.abs(Math.sin(t*3)));
    }
  }
  function resize() {
    const width = mount.clientWidth, height = mount.clientHeight;
    if (!width || !height) return;
    // The stacked tour can be wide while leaving only a shallow graphic region.
    mount.classList.toggle('hs-compact', width < 640 || height < 440);
    mount.classList.toggle('hs-short', height < 360);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(mount); resize(); render('speakers', 0);
  return { render, resize, dispose() { observer.disconnect(); mount.innerHTML=''; mount.classList.remove('hs-root','hs-compact','hs-short'); } };
}
