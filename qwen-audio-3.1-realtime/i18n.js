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
    'Follow the language, keep the plan': '语种无缝切换，规划连贯如一',
    'One trip-planning conversation moves between Chinese, Japanese, and Korean. The assistant answers in whatever language the user speaks, while carrying the same itinerary, allergy constraint, and travel context across the switch.': '在行程规划对话中，用户于中文、日语与韩语间自由切换。助手不仅能以对应语言对答如流，更在语种转换间，将行程安排、过敏禁忌等上下文信息完整保留。',
    'Single channel · user and assistant in one recording': '单声道 · 用户与助手同轨录音',
    'full session': '完整对话',
    'Context retained': '上下文保留',
    'Turn audio is cut from the single-channel recording at silence-detected boundaries (about ±0.2s); turn order follows the recording. Turns 11–14 are transcribed from the audio for this preview.': '对话回合基于约 ±0.2 秒的静音间歇，从单声道录音中切分而来，并严格遵循原录音顺序。为方便预览，第 11–14 回合内容已由该段音频转写。',
    'Know when to wait, enter, and answer': '精准把握等待、介入与回应时机',
    'Two full-duplex recordings. In the multi-party scene several people talk to each other, and the assistant holds back until it is actually addressed. In the second, the user sets the pace in words — asking the assistant to wait, then to continue — and the assistant follows that instruction rather than the silence.': '以下展示两段全双工录音。在多人对话场景中，人们自由交谈，助手始终保持静默，直至被明确提及才介入对话。在第二段录音中，用户通过口头指令掌控节奏——要求助手等待或继续，而助手严格遵循该语义指令，而非单纯依赖静音间歇来判断响应时机。',
    'Multi-party conversation': '多人对话',
    'Several speakers talk among themselves; the assistant stays silent until the request is directed at it.': '多人自由交谈时，助手保持静默，直至接收到明确指向它的指令。',
    'Semantic Control': '语义控制',
    'The user asks the assistant to hold; the assistant waits through the pauses and resumes when released.': '用户要求助手等待；助手在对话停顿期间全程保持静默，直至收到继续的指令才恢复应答。',
    'People talk among themselves; assistant stays out': '多人交谈，助手保持静默',
    'First assistant turn, entering only when addressed': '首次回应，被唤醒后介入',
    'A speaker comes in while the assistant is talking': '助手发言期间用户插话',
    'Assistant answers after the overlap resolves': '插话结束后助手继续回应',
    'Conversation returns to the human speakers': '对话交还用户',
    'Assistant begins its reply': '助手开始回应',
    'User speaks over it and redirects': '用户插话并更改指令',
    'Assistant acknowledges the new instruction': '助手确认新指令',
    'Assistant holds while the user keeps talking': '用户继续发言，助手保持等待',
    'Released, the assistant delivers the full answer': '收到继续指令，助手完整作答',
    'Semantic control · setup': '语义控制 · 设定等待',
    'Semantic control · turn release': '语义控制 · 解除等待',
    'Speech-activity times are measured from the two channels of each recording: the left channel carries the user side, the right channel the assistant. Labels describe the interaction; they are not a transcript. The waveform strip is drawn from the decoded audio samples (peak per pixel column); a precomputed envelope stands in until decoding finishes.': '语音活动时间基于每段录音的双声道测量得出：左声道为用户，右声道为助手。标签仅用于描述交互行为，并非语音转写。波形图由解码后的音频采样绘制而成（每列像素对应一个采样峰值）；在解码完成前，将由预计算的音频包络替代显示。',
    'Ask, execute, and fill in the gaps': '主动澄清与精准执行',
    'A spoken request becomes a tool call. The assistant resolves what the user actually said into arguments, asks for the missing detail instead of guessing, and reports back what the execution returned.': '语音指令可直接转化为工具调用。助手能将用户的自然表达精准解析为执行参数；遇信息缺失时，会主动发问而非盲目猜测，并如实反馈最终的执行结果。',
    'Ground the request': '精准解析',
    'Turn the spoken intent into a concrete tool call with checked arguments.': '将语音意图转化为具体的工具调用，并严格校验执行参数。',
    'Ask, do not assume': '主动发问',
    'Request the missing parameter rather than filling it with a guess.': '遇参数缺失时主动向用户确认，避免盲目猜测。',
    'Report the result': '如实反馈',
    'Describe what execution actually returned, not what was promised.': '准确播报工具的实际执行结果，而非仅复述预期目标。',
    'Screen recording of a live session (40 s). Behavior depends on the tools configured in that session.': '真实会话录屏（40 秒）。模型具体表现取决于当前会话的工具配置。',
    'A character to keep, a moment to meet': '演绎专属角色，捕捉共情瞬间',
    'Two sides of spoken expression: sustaining a literary character across a conversation, and responding to how something was said rather than only what was said.': '语音表现力体现在两个维度：不仅能在长对话中始终维持文学角色设定，更能敏锐捕捉用户的语气与情绪，而非仅对字面内容作出回应。',
    'Persona · Jia Baoyu': '角色设定 · 贾宝玉',
    "Role-play as Jia Baoyu from Dream of the Red Chamber, holding the character's voice, manner, and register through the exchange.": '扮演《红楼梦》中的贾宝玉，在整段对话中始终维持该角色的独特声线、语气与遣词风格。',
    'Character consistency': '角色一致性',
    'Empathy · everyday conversation': '情感共鸣 · 日常对话',
    'An emotionally loaded moment, where the acoustic cues — not just the words — shape what the assistant says next.': '面对情绪饱满的瞬间，助手不仅解析字面内容，更会捕捉声音中的声学线索，以此决定下一步的回应方式。',
    'Acoustic emotional cues': '声学情绪线索',
    'Evaluated behavior for persona and empathy is reported in the benchmarks section (CharacterEval, RMTBench, PersonaCross, EchoMind).': '关于角色设定与共情能力的评测表现，请参阅基准测试板块（CharacterEval、RMTBench、PersonaCross、EchoMind）。',
    'Talking to other': '与他人交谈',
    'Background speech': '背景人声',
    'Addressed speech': '对助手发言',
    'Backchannel': '附和性回应',
    'User interruption': '用户打断',
    'Semantic control': '语义控制',
    'Resume after hold': '打断后恢复',
    'Assistant turn': '助手回复',
    'Users': '用户',
    'Assistant': '助手',
    'User': '用户',
    'Customer service': '客服',
    'Full-session recording · customer service scenario.': '完整对话录音 · 客服场景',
    'Office': '办公生产力',
    'Full-session recording · office productivity scenario.': '完整对话录音 · 办公生产力场景',
    'Smart cockpit': '智能座舱',
    'Full-session recording · in-car smart cockpit scenario.': '完整对话录音 · 车载智能座舱场景',
    'Table view': '表格视图',
    'Chart view': '图表视图',
    'Interaction Framework': '交互框架',
    'Model Framework': '模型框架',
    'Post-Training Pipeline': '后训练流水线',
    'Self-Evolving Environment Pipeline': '自进化环境流水线',
    'Persistent Voice Harness Architecture': '持久化语音 Harness 架构',
    'Asynchronous Tasks Across Conversation Turns': '跨对话轮次的异步任务',
  };
  window.TS = en => (window.LANG === 'zh' && ZH_DICT[en] !== undefined ? ZH_DICT[en] : en);

  const ZH = {
    '#navigation a:nth-child(1)': '基准评测',
    '#navigation a:nth-child(2)': '交互演示',
    '#navigation a:nth-child(3)': '语音智能体',
    '#navigation a:nth-child(4)': '技术报告',
    '#navigation a:nth-child(5)': '模型中心',
    '.nav-cta': '技术概览 <span aria-hidden="true">↗</span>',
    '.release-label': '<span class="mini-wave" aria-hidden="true">ıııı</span> QWEN-AUDIO-3.1-REALTIME 全新发布',
    '#hero-title': '不止于对话<br><span>更付诸行动</span>',
    '.hero-description': '兼备认知与执行能力。<br>将语言智能、现实交互与自然<br class="desktop-break">流畅的对话体验融为一体。',
    '.hero-actions a.primary': '体验交互演示 <span aria-hidden="true">↗</span>',
    '.hero-actions a.secondary': '查看评测结果 <span aria-hidden="true">↓</span>',
    '.hero-signature': 'Qwen-Audio-3.1-Realtime <span>Alibaba Token Foundry 出品</span>',
    '.overview-note': '模型能力与系统架构概览。长期任务与记忆机制通过运行时扩展实现，适配 3.1 版本的全双工性能评测数据暂未发布。',
    '.highlights > div:nth-child(1) .stat-label': '多轮指令',
    '.highlights > div:nth-child(1) small': '较 3.0 版本提升 5.09 个百分点',
    '.highlights > div:nth-child(2) .stat-label': '口语交互',
    '.highlights > div:nth-child(2) small': '较 3.0 版本提升 3.59 个百分点',
    '.highlights > div:nth-child(3) .stat-label': '多语言能力',
    '.highlights > div:nth-child(3) small': '较 3.0 版本提升 6.40 个百分点',
    '.highlights > div:nth-child(4) .stat-label': '共情能力',
    '.highlights > div:nth-child(4) small': '较 3.0 版本提升 0.33 分',
    '#benchmarks .eyebrow': '实力，由数据印证',
    '#benchmarks h2': '强大基座<br>进阶智能体',
    '#benchmarks .section-heading > p': '以下数据摘自技术报告。精确数值、指标定义与对比范围等<br class="desktop-break">详细信息，请参阅完整报告。',
    '#tab-intelligence': '通用智能',
    '#tab-multilingual': '多语言',
    '#tab-action': '执行能力',
    '#tab-empathy': '角色与共情',
    '#tab-reliability': '可靠性',
    '#tab-context': '长上下文',
    '.evidence-note p': '除非另有说明，GPT-Realtime-2 均在 low effort 模式下运行。评测结果基于技术报告所述配置，并非严格受控的消融实验或统计显著性检验；缺失值不计为 0。S2T 结果仅衡量语音转文本的准确率，不评估语音合成质量。',
    '#demos .eyebrow': '真实世界体验',
    '#demos h2': '真实世界交互体验',
    '#demo-tab-duplex': '全双工交互<span>多方 · 语义控制</span>',
    '#demo-tab-persona': '角色与共情<span>人设 · 情感回应</span>',
    '#demo-tab-action': '工具调用<span>执行与跟进</span>',
    '#demo-tab-multilingual': '多语言对话<span>中 · 日 · 韩</span>',
    '#agent .eyebrow': '超越模型 · 系统级扩展',
    '#agent h2': '您继续说<br><span>任务后台办</span>',
    '.agent-intro > p': '语音智能体基于持久化运行机制，在保持实时对答的同时，可于后台同步处理耗时任务。任务状态全程透明，记忆边界清晰，并能精准把握结果交付时机。',
    '.agent-feature-grid article:nth-child(1) h3': '前台响应与后台委托',
    '.agent-feature-grid article:nth-child(1) p': '简单指令前台即时响应，复杂任务则通过明确契约交由后台处理。',
    '.agent-feature-grid article:nth-child(2) h3': '任务状态透明可控',
    '.agent-feature-grid article:nth-child(2) p': '从接收、执行到最终交付，任务全生命周期皆可追溯，确保后续指令精准关联至对应任务。',
    '.agent-feature-grid article:nth-child(3) h3': '清晰的记忆边界',
    '.agent-feature-grid article:nth-child(3) p': '将用户偏好、长期记忆与参考知识与当前任务状态深度解耦，确保模型始终优先响应当下指令。',
    '.agent-demos-title': '场景演示',
    '#agent-tab-cockpit': '智能座舱<span>完整会话 · 车载</span>',
    '#agent-tab-service': '客服<span>完整会话 · 呼叫中心</span>',
    '#agent-tab-office': '办公<span>完整会话 · 生产力</span>',
    '#report h2': '构建更可靠的<br>智能体语音交互',
    '.report-abstract': 'Qwen-Audio-3.1-Realtime 将实时交互解构为 Think、Act 与 Speak & Coordinate 三大维度：精准理解动态请求、执行可验证操作，并智能决策发声时机。我们的评测体系亦与此三层架构深度契合。在本次报告的评测配置下，相较于 3.0 版本，新模型在 Audio MultiChallenge 上的得分提升 5.09 个百分点，在涵盖 14 种语言的 Big Bench Audio 扩展集上提升 6.4 个百分点，在 τ²-Bench Audio 上提升 3.6 个百分点；此外，在多轮攻击测试中，中文场景的攻击成功率大幅降低 54.50 个百分点，英文场景降低 40.00 个百分点。',
    '#report .button': '探索语音智能体 <span aria-hidden="true">↑</span>',
    '.report-credit': 'Alibaba Token Foundry · 阿里巴巴集团',
    '.footer > span': 'Qwen-Audio-3.1-Realtime · 技术报告预览',
    '.footer > a:last-child': '回到顶部 ↑',
    '#tech .eyebrow': '技术内幕',
    '#tech h2': '技术总览',
    '#tech-tab-interaction': '交互框架',
    '#tech-tab-model': '模型框架',
    '#tech-tab-posttrain': '后训练',
    '#tech-tab-selfevolve': '自进化环境',
    '#tech-tab-harness': '语音智能体Harness',
    '#tech-tab-asyncturns': '跨轮次异步框架',
  };

  const OVERVIEW_EN = 'assets/overview.svg?v=25';
  const OVERVIEW_ZH = 'assets/overview-zh.svg?v=12';
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
    document.querySelectorAll('.eyebrow').forEach(el => { el.style.display = window.LANG === 'zh' ? 'none' : ''; });
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
      button.textContent = window.LANG === 'zh' ? 'EN' : '中文';
      button.setAttribute('aria-pressed', String(window.LANG === 'zh'));
    }
  };

  applyStatic();
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = window.LANG === 'zh' ? 'EN' : '中文';
    toggle.setAttribute('aria-pressed', String(window.LANG === 'zh'));
    toggle.addEventListener('click', () => window.setLang(window.LANG === 'zh' ? 'en' : 'zh'));
  }
})();
