(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (en,zh) => `<span class="copy31" data-en="${esc(en)}" data-zh="${esc(zh)}">${esc(en)}</span>`;
  const segments = [
    [0,0,2.88,'如果没有的话，那就按这个方案执行。','If there are no objections, let’s proceed with this plan.'],
    [1,0,5.84,'我这边嗯呃有个小建议，能不能给首批收到的顾客送个小礼品？','I have, um, a small suggestion: could we give a small gift to the first customers who receive it?'],
    [2,2.88,3.74,'哎。','Yes.'],
    [2,5.93,8.87,'这个主意啊嗯不错，能提升好感度。','That’s a good idea, um, it could improve customer goodwill.'],
    [0,7.03,7.47,'嗯','Mm.'],
    [3,8.60,11.20,'礼品库存够吗？别到时候又缺货。','Do we have enough gifts in stock? Let’s not run out again.'],
    [4,8.91,9.86,'嗯','Mm.']
  ];
  const diar = $('#diar-audio');
  function controls(media) {
    const bar=document.createElement('div');bar.className='audio-controls31';
    bar.innerHTML='<button type="button" class="toggle-audio31" aria-label="Play audio">▶</button><input type="range" min="0" max="100" step="0.01" value="0" aria-label="Audio position"><code>0:00 / 0:00</code><button type="button" class="mute-audio31" aria-label="Mute audio">♪</button>';
    media.after(bar);media.controls=false;media.hidden=true;
    const play=bar.querySelector('.toggle-audio31'),seek=bar.querySelector('input'),mute=bar.querySelector('.mute-audio31');
    const time=n=>`${Math.floor((n||0)/60)}:${String(Math.floor((n||0)%60)).padStart(2,'0')}`;
    const sync=()=>{play.textContent=media.paused?'▶':'Ⅱ';play.setAttribute('aria-label',media.paused?'Play audio':'Pause audio');seek.value=media.duration?media.currentTime/media.duration*100:0;seek.style.setProperty('--progress',`${seek.value}%`);bar.querySelector('code').textContent=`${time(media.currentTime)} / ${time(media.duration)}`;};
    play.addEventListener('click',()=>media.paused?safePlay(media):media.pause());
    seek.addEventListener('input',()=>{if(Number.isFinite(media.duration))media.currentTime=+seek.value/100*media.duration;});
    mute.addEventListener('click',()=>{media.muted=!media.muted;mute.setAttribute('aria-pressed',media.muted);mute.setAttribute('aria-label',media.muted?'Unmute audio':'Mute audio');mute.textContent=media.muted?'×':'♪';});
    ['loadedmetadata','timeupdate','play','pause','ended'].forEach(e=>media.addEventListener(e,sync));sync();
  }
  $('#speaker-timeline').innerHTML = Array.from({length:5},(_,sp)=>`<div class="speaker-row31" style="--speaker:${sp}"><b>SPK ${sp}</b><div class="speaker-track31">${segments.map((s,i)=>s[0]===sp?`<button type="button" data-segment="${i}" style="left:${s[1]/11.2*100}%;width:${(s[2]-s[1])/11.2*100}%" title="SPK ${sp}: ${s[1]}–${s[2]} s" aria-label="SPK ${sp}: ${s[1]}–${s[2]} seconds"><span>${s[1].toFixed(2)}–${s[2].toFixed(2)}</span></button>`:'').join('')}<i class="playhead31"></i></div></div>`).join('')+`<div class="timeline-ticks31"><span>0 s</span><span>2 s</span><span>4 s</span><span>6 s</span><span>8 s</span><span>10 s</span></div>`;
  $('#diar-transcript').innerHTML = segments.map((s,i)=>`<button type="button" class="segment31" data-segment="${i}" style="--speaker:${s[0]}"><div><b>SPK ${s[0]}</b><code>${s[1].toFixed(2)}–${s[2].toFixed(2)} s</code></div><p class="native31" lang="zh-CN">${s[3]}</p><small class="native31" lang="en">${s[4]}</small></button>`).join('');
  const safePlay = media => media.play().catch(()=>{});
  controls(diar);
  document.querySelectorAll('[data-segment]').forEach(b=>b.addEventListener('click',()=>{diar.currentTime=segments[+b.dataset.segment][1];safePlay(diar);}));
  function syncDiar() {
    document.querySelectorAll('[data-segment]').forEach(b=>{const s=segments[+b.dataset.segment];b.classList.toggle('active',diar.currentTime>=s[1]&&diar.currentTime<s[2]);});
    document.querySelectorAll('.playhead31').forEach(n=>n.style.left=`${Math.min(100,diar.currentTime/11.2*100)}%`);
  }
  ['timeupdate','seeked','loadedmetadata','ended'].forEach(e=>diar.addEventListener(e,syncDiar));
  const tasks = [
    {id:'scene',label:['Sound caption','声音描述'],file:'media23.wav',prompt:['Describe the acoustic scene and the main sounds.','请描述声学场景和主要声音内容。'],answer:['Continuous chewing is accompanied by repeated crisp crunches. There is faint background noise and a brief sound effect at the end.','持续的咀嚼声伴随多次清脆嘎吱声；背景有轻微环境噪声，末尾出现短暂音效。']},
    {id:'voice',label:['Voice description','人声描述'],file:'media24.mp3',prompt:['Describe the speaker’s voice overall.','请整体描述说话人。'],answer:['A male speaker with a confident, projecting voice, in the style of a radio host or sports commentator.','一位男性说话人，声音自信且富有穿透力，具有典型的广播主持人或体育评论员风格。']},
    {id:'music',label:['Music caption','音乐描述'],file:'media25.wav',prompt:['Write a concise description of this music.','请为这段音乐写一句简洁描述。'],answer:['Classic rock with a nostalgic 1950s feel: smooth vocals, a lively rhythm and warm instrumentation create a joyful, nostalgic holiday mood.','带有20世纪50年代怀旧气息的经典摇滚：流畅人声、活泼节奏与温暖配器，营造欢乐而怀念的节日氛围。']},
    {id:'grounding',label:['Temporal grounding','时间定位'],file:'media26.mp3',prompt:['The machine keeps running, then a timer rings and the machine stops. Locate this complete sequence.','机器持续运转，随后定时器响起，机器随即停止。请确定这一完整序列出现的时间。'],answer:['5.525–8.525 seconds','5.525–8.525 秒'],intervals:[[5.525,8.525]]},
    {id:'events',label:['Sound events','声音事件检测'],file:'media27.mp3',prompt:['Identify every time interval containing a dog bark.','识别“犬吠声”出现的全部时间区间。'],answer:['Nine detected intervals. Select an interval to replay the sound.','共检测到九个区间，点击时间区间即可回听。'],intervals:[[.28,.72],[1.92,2.40],[2.92,3.48],[3.88,4.51],[4.96,5.48],[7.04,8.24],[9.48,10.68],[11.56,11.88],[13.56,14.25]]},
    {id:'qa',label:['Audio QA','音频问答'],file:'media28.wav',prompt:['After the inhalation ends, how many different speeds does the motor run at?','吸气声结束后，电机以多少种不同的速度运转？'],answer:['Two.','两种']},
    {id:'reasoning',label:['Audio reasoning','音频推理'],file:'media29.mp3',prompt:['When does the metallic echo occur relative to the bell?','金属回声相对于铃声何时发生？'],answer:['C · Immediately after the bell ends.','C · 在铃声结束后立即开始。'],options:[['For the same duration as the bell','与铃声持续时间相同'],['It ends before the bell starts','在铃声开始前结束'],['Immediately after the bell ends','在铃声结束后立即开始'],['It overlaps with the bell','与铃声重叠']]}
  ];
  const tabs=$('#understanding-tabs');
  tabs.innerHTML=tasks.map((v,i)=>`<button id="task-${v.id}" type="button" role="tab" aria-controls="understanding-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-task="${i}">${t(...v.label)}</button>`).join('');
  function showTask(index) {
    $('#understanding-audio')?.pause();
    const v=tasks[index];
    tabs.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-selected',i===index);b.tabIndex=i===index?0:-1;});
    const panel=$('#understanding-panel');panel.setAttribute('aria-labelledby',`task-${v.id}`);
    panel.innerHTML=`<div class="understanding-input31"><p class="section-kicker">${t('LISTEN / ORIGINAL AUDIO','试听 / 原始音频')}</p><h3>${t(...v.label)}</h3><div class="sound-art31" aria-hidden="true">${Array.from({length:44},(_,i)=>`<i style="--h:${16+Math.abs(Math.sin(i*.59)*Math.cos(i*.17))*84}%"></i>`).join('')}</div><audio id="understanding-audio" controls preload="metadata" src="assets/launch31/${v.file}"></audio><p class="demo-note31">${t('Recorded example · supplied output, not live inference','录音示例 · 展示素材输出，非在线推理')}</p></div><div class="understanding-output31"><p class="section-kicker">${t('INSTRUCTION','指令')}</p><p class="task-prompt31">${t(...v.prompt)}</p>${v.options?`<div class="choices31">${v.options.map((o,i)=>`<div class="${i===2?'correct':''}"><b>${String.fromCharCode(65+i)}</b>${t(...o)}</div>`).join('')}</div>`:''}<div class="task-answer31"><p class="section-kicker">${t('MODEL OUTPUT','模型输出')}</p><h4>${t(...v.answer)}</h4>${v.intervals?`<div class="interval-list31">${v.intervals.map((range,i)=>`<button type="button" data-interval="${i}"><code>${range[0]}–${range[1]} s</code> ↗</button>`).join('')}</div>`:''}</div></div>`;
    const media=$('#understanding-audio');
    controls(media);
    const soundArt=panel.querySelector('.sound-art31');
    media.addEventListener('play',()=>soundArt.classList.add('playing'));
    media.addEventListener('pause',()=>soundArt.classList.remove('playing'));
    panel.querySelectorAll('[data-interval]').forEach(b=>b.addEventListener('click',()=>{media.currentTime=v.intervals[+b.dataset.interval][0];safePlay(media);}));
    media.addEventListener('timeupdate',()=>{if(!v.intervals || !media.isConnected)return;panel.querySelectorAll('[data-interval]').forEach(b=>{const [a,z]=v.intervals[+b.dataset.interval];b.classList.toggle('active',media.currentTime>=a&&media.currentTime<z);});});
    localize31();
  }
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-task]');if(b)showTask(+b.dataset.task);});
  tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const current=+tabs.querySelector('[aria-selected="true"]').dataset.task;const next=e.key==='Home'?0:e.key==='End'?tasks.length-1:(current+(e.key==='ArrowRight'?1:-1)+tasks.length)%tasks.length;showTask(next);tabs.children[next].focus();});

  const bench=[['Fun-ASR (Cascaded)',8.45,21.98,9.03,34.68,6.17,33.83,5.37,20.42],['MOSS-Transcribe-Diarize (MOSS)',4.20,16.04,3.38,17.23,3.20,14.06,4.79,14.00],['Muse-Voice-Transcribe-1.0 (META)',3.04,19.82,6.16,27.97,3.48,14.60,4.55,15.47],['Gemini-3.5-Transcribe (GOOGLE)',13.99,37,21.84,45.16,12.71,23.05,11.44,25.32],['Qwen-Audio-3.1-ASR-SSE',3.23,15.70,2.23,16.00,1.77,12.31,3.04,13.28],['Qwen-Audio-3.1-ASR-Next',2.73,14.17,2.12,11.95,1.74,12.71,3.18,13.63]];
  const best=Array.from({length:8},(_,i)=>Math.min(...bench.map(r=>r[i+1])));
  $('#diar-benchmark').innerHTML=`<table><thead><tr><th rowspan="2" scope="col">${t('Model / approach','模型 / 方案')}</th>${['AISHELL-4','AliMeeting-test','MLC-SLM','MagicData-RAMC'].map(s=>`<th colspan="2" scope="colgroup">${s}</th>`).join('')}</tr><tr>${Array(4).fill('<th scope="col">DER ↓</th><th scope="col">cpWER ↓</th>').join('')}</tr></thead><tbody>${bench.map(r=>`<tr class="${r[0].startsWith('Qwen-')?'ours31':''}"><th scope="row">${r[0]}</th>${r.slice(1).map((x,i)=>`<td>${x===best[i]?`<strong>${x.toFixed(2)}</strong>`:x.toFixed(2)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const audioBench=[['Qwen-Audio-3.1-ASR',81.6,82.8],['Seed-2.0-Lite-260428',78.4,81.4],['Gemini-3.5-Flash',79.3,80.3],['Gemini-3.1-Pro',80.9,85.2]];
  $('#understanding-benchmark').innerHTML=['MMAU','MMSU'].map((name,k)=>`<div class="bar-chart31"><h4>${name} <small>↑</small></h4>${audioBench.map((r,i)=>`<div class="benchmark-bar31 ${i===0?'qwen31':''}"><span>${r[0]}</span><div><i style="width:${r[k+1]}%"></i></div><b>${r[k+1].toFixed(1)}</b></div>`).join('')}</div>`).join('');
  $('#ability-scores').innerHTML=[['Audio scene','声学场景',76.3],['Non-verbal vocalization','非语言人声',93.2],['Emotion','情感',56.7],['Instrument','乐器',66.9],['Gender','性别',99.7],['Grounding','时间定位',82.2]].map(([en,zh,score])=>`<div><span>${t(en,zh)}</span><b>${score.toFixed(1)}<small>%</small></b></div>`).join('');
  const models=[['Flash-Filetrans',['Asynchronous long-audio ASR','异步长音频识别'],[1,0,0,1,1,0]],['Flash-Streaming',['Low-latency streaming ASR','低延迟流式识别'],[1,0,0,1,1,0]],['Flash-Message',['Voice input','语音输入法'],[1,0,0,1,1,1]],['Flash',['ASR + diarization · non-streaming','识别与分角色 · 非流式'],[1,1,0,1,1,1]],['Next',['Unified audio understanding · non-streaming','统一音频理解 · 非流式'],[1,1,1,1,1,1]]];
  $('#model-matrix').innerHTML=`<table><thead><tr><th>${t('Qwen-Audio-3.1-ASR family','Qwen-Audio-3.1-ASR 模型家族')}</th>${[['ASR','识别'],['Diarization','分角色'],['Understanding','音频理解'],['Context','上下文'],['Hotwords','热词'],['Polishing','润色']].map(a=>`<th>${t(...a)}</th>`).join('')}</tr></thead><tbody>${models.map(([name,desc,flags])=>`<tr><th scope="row"><b>${name}</b><small>${t(...desc)}</small></th>${flags.map(v=>`<td><span class="${v?'yes31':'no31'}" aria-label="${v?'Supported':'Not supported'}">${v?'✓':'—'}</span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
  function localize31(){const zh=document.documentElement.lang==='zh-CN';document.querySelectorAll('.copy31').forEach(n=>{const value=zh?n.dataset.zh:n.dataset.en;if(n.textContent!==value)n.textContent=value;});}
  new MutationObserver(localize31).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  // Only one example may play at a time, including the inherited audio atlas.
  document.addEventListener('play',e=>{if(e.target instanceof HTMLMediaElement)document.querySelectorAll('audio,video').forEach(m=>{if(m!==e.target)m.pause();});},true);
  showTask(0);localize31();
})();
