(() => {
  const zh = {
    'Skip to content':'跳转到正文','Menu':'菜单','Audio atlas':'音频地图','Results':'评测结果','Examples':'能力示例','Model experience':'模型体验','Read the report ↗':'阅读技术报告 ↗',
    'Hear more.':'听见更多。','Miss less.':'识别更准。','A large-scale, instruction-controlled ASR model for multilingual speech, 16 Chinese dialectal varieties, long-context transcription, and production-grade entity recognition.':'面向真实生产场景的大规模指令控制语音识别模型，支持多语种、16 种中文方言、长上下文转写及行业级实体识别。','Explore audio':'试听音频','Inspect results ↓':'查看结果 ↓','languages':'种语言','Chinese dialects':'种中文方言','active / total params':'激活 / 总参数量','Model coverage':'模型覆盖范围',
    'Figure 1':'图 1','One instruction-controlled model for multilingual speech, streaming, context, hotwords, entities, and polishing.':'一个指令控制模型，统一支持多语种语音、流式识别、上下文、热词、实体识别与转写润色。','Reported evaluation':'评测结果','One model,':'一个模型，','balanced performance.':'均衡表现。','Macro CER on the internal 16-dialect evaluation suite.':'内部 16 种方言评测集上的宏平均 CER。','Macro error rate on Common Voice 15 across the evaluated languages.':'Common Voice 15 多语种评测的宏平均错误率。','Industry domains where the model reports the highest entity recall.':'实体召回率取得最佳结果的行业领域数量。',
    'Interactive audio atlas':'交互式音频地图','Listen across dialects and languages.':'聆听不同方言与语言。','Choose a location on either map to hear the original sample and read its source-language transcript with an English translation.':'在地图上选择一个地区，即可试听原始音频，并查看原文转写与英文翻译。','30 world languages':'30 种世界语言','16 Chinese dialects':'16 种中文方言','supported languages':'种支持语言','dialectal varieties':'种方言','Select a location':'请选择一个地区','Choose a marker on the map or a name below.':'点击地图标记或下方名称选择音频。','Flexible language prompting':'灵活的语言提示','Combine target languages at runtime.':'运行时自由组合目标语言。','Surprise me':'随机组合','Browse all 30 supported languages':'查看全部 30 种支持语言','Recognition accuracy across the same 16 dialect varieties.':'同一组 16 种方言上的识别准确率。','ASR and AST task-consistency rates.':'ASR 与 AST 任务一致率。','Figure 6 · Recognition accuracy across the same 16 dialect varieties.':'图 6 · 同一组 16 种方言上的识别准确率。','Figure 7 · ASR and AST task-consistency rates.':'图 7 · ASR 与 AST 任务一致率。',
    'Fast & streaming':'快速流式识别','Listen while the transcript appears.':'边听音频，边看文字实时出现。','Play the original 18-second Beijing-to-Hangzhou request and watch the transcript appear continuously in a clean side-by-side streaming interface.':'播放 18 秒的北京至杭州请求原始音频，在清晰的左右对比界面中观察文字连续生成。','Interactive streaming playback':'交互式流式播放','Industry Baseline':'行业竞品','vs':'对比','Beijing → Hangzhou travel request':'北京 → 杭州出行请求','Original audio · transcript follows playback':'原始音频 · 文字随播放进度出现','INDUSTRY BASELINE':'行业竞品',
    'Evaluation evidence':'评测结果','Results, where they support the story.':'用结果验证每项能力。','Each result view answers a specific performance question; the complete reported tables remain available below. Lower CER/WER is better, while higher recall and consistency are better.':'每个结果视图回答一个具体的性能问题，下方保留技术报告中的完整表格。CER/WER 越低越好，召回率与一致率越高越好。','Evaluation note.':'评测说明。','Dialect and industry-domain evaluations use internal test sets. Public benchmark results in Panel A are taken from official sources, while API systems in Panel B use a unified evaluation pipeline.':'方言及行业领域评测采用内部测试集。Panel A 的公开基准结果来自官方来源，Panel B 的 API 系统结果使用统一评测流程获得。','Table 1':'表 1','Table 2':'表 2','Table 3':'表 3','Table 4':'表 4','Public Chinese and English ASR benchmarks':'中英文公开 ASR 基准','Multilingual benchmark results':'多语种基准结果','Hotword recall with and without conditioning':'使用与不使用热词条件时的召回率','Long-audio contextual corrections':'长音频上下文纠错',
    'Dialect CER':'方言 CER','Consistency':'一致性','Industry recall':'行业实体召回','Polishing':'转写润色','Latency':'延迟','Internal dialect suite':'内部方言评测集','Macro CER across 16 dialects':'16 种方言宏平均 CER','Qwen-Audio-3.0-ASR reports the lowest CER on 11 of 16 test sets, compared with macro CERs of 16.77% for Doubao-ASR and 20.40% for Tencent Hy-ASR-3.0-preview.':'Qwen-Audio-3.0-ASR 在 16 个测试集中的 11 个取得最低 CER；其宏平均 CER 为 9.40%，相比之下 Doubao-ASR 为 16.77%，Tencent Hy-ASR-3.0-preview 为 20.40%。','Lower is better':'越低越好','16 varieties':'16 种方言','Internal benchmark':'内部评测','Task consistency':'任务一致性','Consistency decision threshold':'一致性判定阈值','A judge model scores semantic and task consistency from 0 to 10. Outputs scoring at least 6 are counted as consistent.':'评判模型从 0 到 10 对语义与任务一致性打分，得分不低于 6 的输出被计为一致。','Higher is better':'越高越好','Judge-based':'模型评判','Industry entity recognition':'行业实体识别','Domains led in entity recall':'实体召回率领先的领域','Across the internal industry-term evaluation, Qwen-Audio-3.0-ASR reports the highest entity recall in every evaluated domain.':'在内部行业术语评测中，Qwen-Audio-3.0-ASR 在全部评测领域均取得最高实体召回率。','Entity recall':'实体召回率','Native polishing':'原生润色','Readability score':'可读性得分','Native single-pass polishing substantially improves readability while maintaining faithfulness, approaching an external post-rewrite baseline.':'原生单次润色在保持忠实度的同时显著提升可读性，效果接近外部后处理改写基线。','Single pass':'单次生成','Readable output':'更易阅读','Faithfulness':'忠实度','Streaming recognition':'流式识别','Theoretical first-token latency':'理论首字延迟','The streaming model exposes configurable operating points for the latency–accuracy trade-off on internal Chinese and English industrial test sets.':'流式模型可在内部中英文行业测试集上配置不同工作点，以平衡延迟与准确率。','Lower latency':'更低延迟','Streaming':'流式',
    'Samples from the report and launch material':'技术报告与发布材料示例','See what the controls change.':'直观看到不同控制条件带来的变化。','Explore context corrections, entity recall, hotword gains, and native polishing without leaving the page.':'直接体验上下文纠错、实体召回、热词增益与原生转写润色。','Example type':'示例类型','Long context':'长上下文','Hotwords':'热词','Industry entities':'行业实体','Earlier cue':'前文线索','Hierarchical customization':'分级热词定制','P0 for high-confidence terms. P1 for broader candidates.':'P0 用于高置信度词，P1 用于更广泛的候选词。','Across the supplied launch examples, Qwen-Audio-3.0-ASR reaches 99%+ recall on six P0 categories after hotword conditioning.':'在所提供的发布示例中，加入热词条件后，Qwen-Audio-3.0-ASR 在六个 P0 类别上的召回率超过 99%。','Launch examples':'发布示例','Long-tail entities across practical domains.':'覆盖真实行业场景中的长尾实体。','Shown values are entity recall (%) from the supplied promotional material.':'展示数值为所提供宣传材料中的实体召回率（%）。','Native single-pass polishing':'原生单次转写润色','Cleaner transcripts,':'更干净的转写，','without a rewrite stage.':'无需额外改写阶段。','Fillers, repetitions, explicit self-corrections, and formatting noise are handled inside the recognition pass.':'语气词、重复、明确的自我纠正和格式噪声均在识别过程中直接处理。','Polishing off':'关闭润色','Polishing on · Native':'开启原生润色','Readability':'可读性','Qwen3.6-Plus cascade':'Qwen3.6-Plus 级联方案','Filler removal':'去除语气词','Repetition reduction':'减少重复','Self-correction':'自我纠正','Formatting':'格式规范化',
    'Model experience':'模型体验','Choose the deployment profile.':'选择合适的部署形态。','Open the official Model Studio documentation for short-form, file-transcription, or real-time streaming integration.':'打开百炼 Model Studio 官方文档，了解短音频、离线文件转写或实时流式接入方式。','01 / Short-form':'01 / 短音频','02 / File':'02 / 文件转写','03 / Streaming':'03 / 实时流式','Speech recognition for audio up to five minutes.':'最长五分钟音频的语音识别。','Offline transcription for recorded audio files.':'面向录音文件的离线转写。','Real-time speech recognition over WebSocket.':'基于 WebSocket 的实时语音识别。','Open documentation ↗':'打开文档 ↗',
    'Source':'来源','Test set':'测试集','Metric':'指标','Benchmark':'基准','Language':'语言','Category':'类别','Tier':'级别','Earlier context cue':'前文线索','Without long context':'不使用长上下文','With long context':'使用长上下文','Domain':'领域','Macro average':'宏平均','Panel A · Officially reported results':'Panel A · 官方公开结果','Panel B · Unified API evaluation':'Panel B · 统一 API 评测','Recall (%) · without → with hotword conditioning':'召回率（%）· 未使用热词 → 使用热词',
    'Chinese · China':'中文 · 中国','English · United Kingdom':'英语 · 英国','Japanese · Japan':'日语 · 日本','Korean · South Korea':'韩语 · 韩国','Vietnamese · Vietnam':'越南语 · 越南','Thai · Thailand':'泰语 · 泰国','Indonesian · Indonesia':'印尼语 · 印度尼西亚','Malay · Malaysia':'马来语 · 马来西亚','Tagalog · Philippines':'菲律宾语 · 菲律宾','Hindi · India':'印地语 · 印度','Arabic · Saudi Arabia':'阿拉伯语 · 沙特阿拉伯','French · France':'法语 · 法国','German · Germany':'德语 · 德国','Spanish · Spain':'西班牙语 · 西班牙','Portuguese · Portugal':'葡萄牙语 · 葡萄牙','Russian · Russia':'俄语 · 俄罗斯','Italian · Italy':'意大利语 · 意大利','Dutch · Netherlands':'荷兰语 · 荷兰','Swedish · Sweden':'瑞典语 · 瑞典','Danish · Denmark':'丹麦语 · 丹麦','Finnish · Finland':'芬兰语 · 芬兰','Norwegian · Norway':'挪威语 · 挪威','Greek · Greece':'希腊语 · 希腊','Polish · Poland':'波兰语 · 波兰','Czech · Czechia':'捷克语 · 捷克','Hungarian · Hungary':'匈牙利语 · 匈牙利','Romanian · Romania':'罗马尼亚语 · 罗马尼亚','Bulgarian · Bulgaria':'保加利亚语 · 保加利亚','Croatian · Croatia':'克罗地亚语 · 克罗地亚','Slovak · Slovakia':'斯洛伐克语 · 斯洛伐克',
    'Sichuan · Chengdu':'四川 · 成都','Shanxi · Taiyuan':'山西 · 太原','Henan · Luoyang':'河南 · 洛阳','Jinan':'济南','Cantonese · Guangzhou':'粤语 · 广州','Shaanxi · Xi’an':'陕西 · 西安','Qingdao':'青岛','Shanghai':'上海','Nanchang':'南昌','Ningbo':'宁波','Hakka':'客家话','Hangzhou':'杭州','Wenzhou':'温州','Hunan':'湖南','Fujian':'福建','Suzhou':'苏州',
    'Sichuan dialect':'四川话','Shanxi dialect':'山西话','Henan dialect':'河南话','Jinan dialect':'济南话','Cantonese':'粤语','Shaanxi dialect':'陕西话','Qingdao dialect':'青岛话','Shanghainese':'上海话','Nanchang dialect':'南昌话','Ningbo dialect':'宁波话','Hangzhou dialect':'杭州话','Wenzhounese':'温州话','Hunan dialect':'湖南话','Fujian dialect':'福建话','Suzhou dialect':'苏州话'
  };

  const originals = new WeakMap();
  const attrOriginals = new WeakMap();
  let locale = localStorage.getItem('qwen-asr-locale') === 'zh-CN' ? 'zh-CN' : 'en';

  function translated(value) {
    if (locale === 'en') return value;
    if (zh[value]) return zh[value];
    const status = value.match(/^(.*) \/ (ready|playing|complete|audio pending)$/);
    if (status) return `${zh[status[1]] || status[1]} / ${{ready:'可播放',playing:'播放中',complete:'播放完成','audio pending':'音频待补'}[status[2]]}`;
    return value.replace(/^(\d+) · Earlier cue$/, '$1 · 前文线索');
  }

  function translateText(node) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    if (node.parentElement?.closest('.sample-transcript,.sample-translation,code')) return;
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const original = originals.get(node);
    const core = original.trim();
    const replacement = translated(core);
    const nextValue = original.replace(core, replacement);
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }

  function translateElement(element) {
    if (element.nodeType === Node.TEXT_NODE) { translateText(element); return; }
    if (element.nodeType !== Node.ELEMENT_NODE) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode);
    ['aria-label','title','alt'].forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      let values = attrOriginals.get(element);
      if (!values) { values = {}; attrOriginals.set(element, values); }
      if (!(attribute in values)) values[attribute] = element.getAttribute(attribute);
      const nextValue = translated(values[attribute]);
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
    });
    element.querySelectorAll('[aria-label],[title],[alt]').forEach(child => ['aria-label','title','alt'].forEach(attribute => {
      if (!child.hasAttribute(attribute)) return;
      let values = attrOriginals.get(child);
      if (!values) { values = {}; attrOriginals.set(child, values); }
      if (!(attribute in values)) values[attribute] = child.getAttribute(attribute);
      const nextValue = translated(values[attribute]);
      if (child.getAttribute(attribute) !== nextValue) child.setAttribute(attribute, nextValue);
    }));
  }

  function applyLocale() {
    document.documentElement.lang = locale;
    translateElement(document.body);
    const toggle = document.querySelector('#locale-toggle');
    toggle.setAttribute('aria-label', locale === 'en' ? '切换为中文' : 'Switch to English');
    toggle.title = locale === 'en' ? '切换为中文' : 'Switch to English';
    localStorage.setItem('qwen-asr-locale', locale);
  }

  const observer = new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'characterData') translateText(record.target);
      record.addedNodes.forEach(translateElement);
    });
  });
  observer.observe(document.body, {subtree:true, childList:true, characterData:true});
  document.querySelector('#locale-toggle').addEventListener('click', () => { locale = locale === 'en' ? 'zh-CN' : 'en'; applyLocale(); });
  applyLocale();
})();
