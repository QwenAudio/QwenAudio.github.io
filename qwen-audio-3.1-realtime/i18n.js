'use strict';
/* Lightweight EN/zh switch: static copy is swapped by selector, JS-rendered
   copy goes through T(en, zh), and registered renderers re-run on toggle. */
(function () {
  let lang = 'en';
  try { lang = window.localStorage.getItem('qa31-lang') || 'en'; } catch (e) { /* private mode */ }
  if (lang !== 'zh') lang = 'en';
  window.LANG = lang;
  window.T = (en, zh) => (window.LANG === 'zh' && zh !== undefined ? zh : en);
  window.__rerenderers = [];

  /* EN -> zh dictionary for copy generated at render time (demos, bench UI). */
  const ZH_DICT = {
    'Follow the language, keep the plan': '语种自由切换，规划不中断',
    'One trip-planning conversation moves between Chinese, Japanese, and Korean. The assistant answers in whatever language the user speaks, while carrying the same itinerary, allergy constraint, and travel context across the switch.': '在行程规划对话中，用户于中文、日语、韩语间自由切换。助手能以对应语言流畅回应，并完整保留行程安排、过敏禁忌等上下文信息。',
    'Single channel · user and assistant in one recording': '单声道 · 用户与助手共用音轨',
    'full session': '完整对话',
    'Context retained': '保持上下文',
    'Turn audio is cut from the single-channel recording at silence-detected boundaries (about ±0.2s); turn order follows the recording. Turns 11–14 are transcribed from the audio for this preview.': '每个对话回合均基于约 ±0.2 秒的静音间歇从单声道录音中分割，并保持原录音顺序。预览中的第 11–14 回合内容即由该段音频转写而成。',
    'Know when to wait, enter, and answer': '精准判断等待与介入时机',
    'Two full-duplex recordings. In the multi-party scene several people talk to each other, and the assistant holds back until it is actually addressed. In the second, the user sets the pace in words — asking the assistant to wait, then to continue — and the assistant follows that instruction rather than the silence.': '以下为两段全双工录音。在多方对话场景中，人们自由交谈，助手保持静默，直至被明确唤醒才介入对话；在第二段录音中，用户通过口头指令控制节奏——先让助手等待，随后再指示其继续。这表明助手是基于语义而非单纯的静音间歇作出响应。',
    'Multi-party conversation': '多人对话',
    'Several speakers talk among themselves; the assistant stays silent until the request is directed at it.': '多人自由交谈，助手在被唤醒前保持静默。',
    'Semantic Control': '语义控制',
    'The user asks the assistant to hold; the assistant waits through the pauses and resumes when released.': '用户要求助手等待，助手在对话停顿期间保持静默，直至收到继续指令。',
    'People talk among themselves; assistant stays out': '多人交谈，助手未介入',
    'First assistant turn, entering only when addressed': '助手被唤醒，首次加入对话',
    'A speaker comes in while the assistant is talking': '用户在助手发言时插话',
    'Assistant answers after the overlap resolves': '插话结束后，助手继续回应',
    'Conversation returns to the human speakers': '发言权交还用户',
    'Assistant begins its reply': '助手开始应答',
    'User speaks over it and redirects': '用户插话并更改指令',
    'Assistant acknowledges the new instruction': '助手确认新指令',
    'Assistant holds while the user keeps talking': '用户继续发言，助手保持等待',
    'Released, the assistant delivers the full answer': '收到指令后，助手给出完整回答',
    'Semantic control · setup': '语义控制 · 发出指令',
    'Semantic control · turn release': '语义控制 · 解除等待',
    'Speech-activity times are measured from the two channels of each recording: the left channel carries the user side, the right channel the assistant. Labels describe the interaction; they are not a transcript. The waveform strip is drawn from the decoded audio samples (peak per pixel column); a precomputed envelope stands in until decoding finishes.': '语音活动时间基于双声道检测：左声道为用户，右声道为助手。标签仅描述交互行为，并非语音转写。波形图基于解码后的音频采样绘制（每列像素对应一个采样峰值）；解码完成前，将优先显示预计算的音频包络。',
    'Ask, execute, and fill in the gaps': '主动澄清，准确执行',
    'A spoken request becomes a tool call. The assistant resolves what the user actually said into arguments, asks for the missing detail instead of guessing, and reports back what the execution returned.': '将口头指令转化为工具调用。助手能将用户的口语表达解析为具体参数；当缺少必要信息时，会主动询问而非盲目猜测；最终如实反馈工具执行结果。',
    'Ground the request': '解析指令',
    'Turn the spoken intent into a concrete tool call with checked arguments.': '将用户的口语意图，转化为参数明确且经核实的工具调用。',
    'Ask, do not assume': '主动询问，而非猜测',
    'Request the missing parameter rather than filling it with a guess.': '遇到信息不足时主动询问，避免盲目猜测。',
    'Report the result': '结果反馈',
    'Describe what execution actually returned, not what was promised.': '如实反馈实际操作结果，而非预设目标。',
    'Screen recording of a live session (40 s). Behavior depends on the tools configured in that session.': '真实会话录屏（40 秒），模型行为视会话配置的工具而定。',
    'A character to keep, a moment to meet': '演绎专属角色，捕捉共情瞬间',
    'Two sides of spoken expression: sustaining a literary character across a conversation, and responding to how something was said rather than only what was said.': '语音表现力体现在两个维度：不仅能在对话中始终维持角色设定，更能敏锐捕捉用户的表达方式（“怎么说”）而非仅停留在字面内容（“说了什么”），并据此作出回应。',
    'Persona · Jia Baoyu': '角色 · 贾宝玉',
    "Role-play as Jia Baoyu from Dream of the Red Chamber, holding the character's voice, manner, and register through the exchange.": '扮演《红楼梦》中的贾宝玉，在整段对话中始终维持其独特的声线、语气与语言风格。',
    'Character consistency': '角色一致性',
    'Empathy · everyday conversation': '共情 · 日常对话',
    'An emotionally loaded moment, where the acoustic cues — not just the words — shape what the assistant says next.': '面对情绪强烈的瞬间，模型不仅解析字面内容，更会捕捉声音中的情绪线索，以此决定回应方式。',
    'Acoustic emotional cues': '声学情绪线索',
    'Evaluated behavior for persona and empathy is reported in the benchmarks section (CharacterEval, RMTBench, PersonaCross, EchoMind).': '角色扮演与共情能力的评测详情，请参阅基准测试部分（CharacterEval、RMTBench、PersonaCross、EchoMind）。',
    'Talking to other': '应对多人交谈',
    'Background speech': '背景人声',
    'Addressed speech': '与助手交谈',
    'Backchannel': '附和与插话',
    'User interruption': '用户打断',
    'Semantic control': '语义控制',
    'Resume after hold': '打断后恢复',
    'Assistant turn': '助手',
    'Users': '用户',
    'Assistant': '助手',
    'User': '用户',
    'Customer service': '客服',
    'Full-session recording · customer service scenario.': '完整对话录音 · 客服场景',
    'Office': '办公与生产力',
    'Full-session recording · office productivity scenario.': '完整对话录音 · 办公生产力场景',
    'Smart cockpit': '智能座舱',
    'Full-session recording · in-car smart cockpit scenario.': '完整对话录音 · 智能座舱场景',
    'Table view': '表格',
    'Chart view': '图表'
  };
  window.TS = en => (window.LANG === 'zh' && ZH_DICT[en] !== undefined ? ZH_DICT[en] : en);

  const ZH = {
    '#navigation a:nth-child(1)': '基准评测',
    '#navigation a:nth-child(2)': '演示',
    '#navigation a:nth-child(3)': '语音智能体',
    '#navigation a:nth-child(4)': '技术报告',
    '#navigation a:nth-child(5)': '模型中心',
    '.nav-cta': '技术概览 <span aria-hidden="true">↗</span>',
    '.release-label': '<span class="mini-wave" aria-hidden="true">ıııı</span> QWEN-AUDIO-3.1-REALTIME 全新发布',
    '#hero-title': '超越对话<br><span>付诸行动</span>',
    '.hero-description': '会思考，能行动。<br>将语言智能、真实世界交互与自然<br class="desktop-break">流畅的对话融为一体。',
    '.hero-actions a.primary': '探索演示 <span aria-hidden="true">↗</span>',
    '.hero-actions a.secondary': '查看结果 <span aria-hidden="true">↓</span>',
    '.hero-signature': 'Qwen-Audio-3.1-Realtime <span>出品 · Alibaba Token Foundry</span>',
    '.overview-note': '模型能力与系统设计概览。长期任务与记忆功能由运行时扩展实现，适配 3.1 版本的全双工性能评测数据暂未公布。',
    '.highlights > div:nth-child(1) .stat-label': '多轮指令',
    '.highlights > div:nth-child(1) small': '较 3.0 版本提升 5.09 个百分点',
    '.highlights > div:nth-child(2) .stat-label': '口语任务',
    '.highlights > div:nth-child(2) small': '较 3.0 版本提升 3.59 个百分点',
    '.highlights > div:nth-child(3) .stat-label': '多语言',
    '.highlights > div:nth-child(3) small': '较 3.0 版本提升 6.40 个百分点',
    '.highlights > div:nth-child(4) .stat-label': '共情',
    '.highlights > div:nth-child(4) small': '较 3.0 版本提升 0.33 分',
    '#benchmarks .eyebrow': '胜于言辞，用数据说话。',
    '#benchmarks h2': '更强基座<br>更强智能体',
    '#benchmarks .section-heading > p': '技术报告精选数据：精确数值、指标定义与对比范围等<br class="desktop-break">详细信息均可查阅。',
    '#tab-intelligence': '智能',
    '#tab-multilingual': '多语言',
    '#tab-action': '行动',
    '#tab-empathy': '人设与共情',
    '#tab-reliability': '可靠性',
    '#tab-context': '长上下文',
    '.evidence-note p': '除非另有说明，GPT-Realtime-2 均在 low effort 模式下运行。评测结果基于技术报告所述配置，并非严格受控的消融实验或统计显著性检验；缺失值不计为 0。S2T 结果仅衡量语音转文本的准确性，不评估语音合成质量。',
    '#demos .eyebrow': '真实对话演示',
    '#demos h2': '四段对话<br>一次持续交互',
    '#demos .section-heading > p': '演示录音涵盖多方全双工交互、<br class="desktop-break">角色扮演与情感表达、工具调用与执行，以及流畅的多语言多轮切换。',
    '#demo-tab-duplex': '全双工交互<span>多方 · 语义控制</span>',
    '#demo-tab-persona': '角色扮演与共情<span>角色 · 情感回应</span>',
    '#demo-tab-action': '工具调用<span>执行与跟进</span>',
    '#demo-tab-multilingual': '多语言对话<span>中 · 日 · 韩</span>',
    '#agent .eyebrow': '模型之外 · 系统级扩展',
    '#agent h2': '您继续说<br><span>事我接着办</span>',
    '.agent-intro > p': '语音智能体采用持久化运行机制，确保对话实时响应，并在后台同步处理长耗时任务。任务状态清晰可见，记忆边界明确，且能在恰当时机交付结果。',
    '.agent-feature-grid article:nth-child(1) h3': '前台执行或后台委托',
    '.agent-feature-grid article:nth-child(1) p': '简单任务在前台即时完成，复杂任务则通过明确的任务契约，交由后台执行。',
    '.agent-feature-grid article:nth-child(2) h3': '清晰的任务状态',
    '.agent-feature-grid article:nth-child(2) p': '从接收、执行、完成到交付，任务全生命周期清晰可溯，后续指令亦能准确关联至原始任务。',
    '.agent-feature-grid article:nth-child(3) h3': '有界的记忆',
    '.agent-feature-grid article:nth-child(3) p': '我们将用户偏好、长期记忆与参考知识同当前任务状态解耦，确保模型优先响应当前指令。',
    '.agent-demos-title': '场景演示',
    '#agent-tab-cockpit': '智能座舱<span>完整会话 · 车载</span>',
    '#agent-tab-service': '客服<span>完整会话 · 呼叫中心</span>',
    '#agent-tab-office': '办公<span>完整会话 · 生产力</span>',
    '#report h2': '迈向可靠的<br>智能体语音交互',
    '#report .report-content > p': '我们追求的不仅是更快的响应速度，<br class="desktop-break">更是要在持续的口语交流中，成为能力更强的伙伴。',
    '.report-abstract': 'Qwen-Audio-3.1-Realtime 将实时交互划分为 Think、Act 与 Speak & Coordinate 三个阶段：理解动态请求、执行可验证动作，并决策是否及何时发言。我们的评测体系亦与这三个层次一一对应。在本次报告的评测配置下，相较于 3.0 版本，新模型在 Audio MultiChallenge 上得分提升 5.09 个百分点，在 14 种语言的 Big Bench Audio 扩展集上提升 6.4 个百分点，在 τ²-Bench Audio 上提升 3.6 个百分点；同时，在多轮攻击测试中，中文场景的攻击成功率降低 54.50 个百分点，英文场景降低 40.00 个百分点。',
    '#report .button': '探索语音智能体 <span aria-hidden="true">↑</span>',
    '.report-credit': 'Alibaba Token Foundry · 阿里巴巴集团',
    '.footer > span': 'Qwen-Audio-3.1-Realtime · 技术报告预览',
    '.footer > a:last-child': '回到顶部 ↑'
  };

  const OVERVIEW_EN = 'assets/overview.svg?v=25';
  const OVERVIEW_ZH = 'assets/overview-zh.svg?v=1';
  function applyOverview() {
    const figure = document.querySelector('#overview');
    if (!figure) return;
    const src = window.LANG === 'zh' ? OVERVIEW_ZH : OVERVIEW_EN;
    const image = figure.querySelector('img');
    const link = figure.querySelector('a');
    if (image) image.src = src;
    if (link) link.href = src;
  }

  function applyStatic() {
    applyOverview();
    Object.keys(ZH).forEach(selector => {
      const el = document.querySelector(selector);
      if (!el) return;
      if (el.dataset.origHtml === undefined) el.dataset.origHtml = el.innerHTML;
      el.innerHTML = window.LANG === 'zh' ? ZH[selector] : el.dataset.origHtml;
    });
    document.documentElement.lang = window.LANG === 'zh' ? 'zh-CN' : 'en';
  }
  window.applyStaticI18n = applyStatic;

  window.setLang = function (next) {
    window.LANG = next === 'zh' ? 'zh' : 'en';
    try { window.localStorage.setItem('qa31-lang', window.LANG); } catch (e) { /* ignore */ }
    applyStatic();
    window.__rerenderers.forEach(fn => fn());
    const button = document.getElementById('lang-toggle');
    if (button) {
      button.textContent = window.LANG === 'zh' ? 'EN' : '我们的模型 · 您的数据';
      button.setAttribute('aria-pressed', String(window.LANG === 'zh'));
    }
  };

  applyStatic();
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = window.LANG === 'zh' ? 'EN' : '重塑语音 AI';
    toggle.setAttribute('aria-pressed', String(window.LANG === 'zh'));
    toggle.addEventListener('click', () => window.setLang(window.LANG === 'zh' ? 'en' : 'zh'));
  }
})();
