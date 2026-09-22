'use strict';
const modelNames = ['GPT-Realtime-2', 'SeedDuplex 1.2.6.1', 'Qwen-Audio-3.0-Realtime', 'Qwen-Audio-3.1-Realtime', 'Gemini-3.7-Flash', 'Qwen3.5-397B-A17B'];
const modelBadges = [
  {image: 'assets/openai-logo.svg'},
  {image: 'assets/seed-logo.png'},
  {image: 'assets/qwen-logo.png'},
  {image: 'assets/qwen-logo.png'},
  {image: 'assets/gemini-logo.png?v=1'},
  {image: 'assets/qwen-logo.png'}
];
const badgeMarkup = index => `<span class="col-badge" aria-hidden="true"><img src="${modelBadges[index].image}" alt=""></span>`;
const PLOT_HEIGHT = 150;
// Each panel gets its own round axis top, like the report figures: the smallest
// ladder rung that covers the panel peak, so 52.21 reads against 60, not 100.
const AXIS_TOPS = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 80, 100];
const axisTop = m => {
  const peak = Math.max(...m.values.filter(value => value !== null));
  return AXIS_TOPS.find(top => top >= peak) ?? Math.ceil(peak / 100) * 100;
};
const metric = (name, unit, max, values, lower = false) => ({name, unit, max, values, lower});
// Values transcribed from the accompanying technical report, results_tables.tex.
const benchmarks = {
  intelligence: {
    metrics: [metric('Audio MultiChallenge', '%', 100, [50.33, 41.91, 47.12, 52.21, null, null]), metric('Big Bench Audio', '%', 100, [93.30, 80.50, 98.80, 98.50, null, null]), metric('VoiceBench', 'score', 100, [83.37, 87.43, 92.54, 92.73, null, null]), metric('OpenAudioBench', 'score', 100, [87.31, 85.38, 88.92, 88.82, null, null]), metric('MultiChallenge', 'score', 100, [44.32, 49.82, 52.38, 53.85, null, null])],
    note: 'OAB and VoiceBench overall scores average the scored subitems and may not represent complete official benchmark totals. The report labels MultiChallenge in benchmark-score units.',
    noteZh: 'OAB 与 VoiceBench 总分由各子项得分平均计算，不代表官方完整总分；报告中的 MultiChallenge 以 benchmark 为计分单位。'
  },
  action: {
    metrics: [metric('τ²-Bench Audio', '%', 100, [42.43, 40.27, 78.60, 82.19, null, null]), metric('τ²-Bench Text', '%', 100, [66.27, null, 85.73, 85.57, null, null]), metric('SpeechFCEval', '%', 100, [70.74, 54.73, 83.28, 86.00, null, null]), metric('WebSearch1K · mean query count', 'queries', 5, [3.19, 1.19, 4.37, 1.05, null, null], true), metric('WebSearch1K · trigger F1', '%', 100, [60.00, 18.94, 60.87, 58.61, null, null])],
    note: 'WebSearch1K is an in-house, date-aware S2T evaluation. Mean query count falls 76.0% versus 3.0, while F1 decreases 2.26 percentage points. Fewer queries alone do not establish better answer quality, measured latency, or cost.',
    noteZh: 'WebSearch1K 为自研的时效性 S2T 评测基准。相较于 3.0 版本，平均查询次数下降 76.0%，F1 分数下降 2.26 个百分点；查询次数的减少，不直接等同于回答质量、实测延迟或成本的提升。'
  },
  empathy: {
    metrics: [metric('EchoMind', '/5', 5, [3.20, 3.70, 3.70, 4.03, null, null]), metric('PersonaCross', '/5', 5, [3.69, 3.57, 3.46, 3.73, null, null]), metric('CharacterEval', '/5', 5, [3.96, null, 3.86, 3.93, null, null]), metric('RMTBench', '/5', 5, [3.41, null, 3.31, 3.49, null, null]), metric('20+ Turns · persona / plot', '/5', 5, [3.23, 3.75, 3.29, 3.46, null, null]), metric('Chinese real-speech empathy', '/5', 5, [3.54, 4.58, 4.37, 4.74, null, null])],
    note: 'All scores are on a 1–5 scale. CharacterEval and RMTBench use public subsets rescored with a spoken role-play rubric. PersonaCross, 20+ Turns, and Chinese real-speech empathy are in-house. Empathy is measured with speech input and text output, not generated prosody.',
    noteZh: '所有评测均为 1–5 分制。CharacterEval 与 RMTBench 使用公开数据集的子集，并依据口语角色扮演的 rubric 重新评分；PersonaCross、20+ 轮对话及中文真实语音共情为自研评测。共情能力评测采用语音输入、文本输出模式，不涉及语音韵律的生成。'
  },
  reliability: {
    metrics: [metric('HalluQA · no-hallucination pass', '%', 100, [63.33, 63.33, 68.44, 71.33, null, null]), metric('TruthfulQA · no-hallucination pass', '%', 100, [83.92, 62.41, 78.73, 82.28, null, null]), metric('Do-Not-Answer · safety pass', '%', 100, [88.60, 77.96, 91.80, 94.99, null, null]), metric('Multi-turn attack success · Chinese', '%', 100, [42.00, 91.50, 80.50, 26.00, null, null], true), metric('Multi-turn attack success · English', '%', 100, [30.00, 89.50, 63.50, 23.50, null, null], true), metric('Capability-boundary accuracy', '%', 100, [94.18, 94.35, 94.51, 96.77, null, null])],
    note: 'Multi-turn attacks and capability boundaries use in-house evaluations. Attack success is lower-is-better. These automatic rates do not measure benign-request rejection, human red-team outcomes, or runtime-enforced authorization guarantees.',
    noteZh: '多轮攻击与能力边界为自研评测，攻击成功率越低越好。该自动化测试比率，不衡量模型对无害请求的拒绝情况、人工红队测试结果或运行时的安全策略。'
  },
  multilingual: {
    metrics: [metric('FLEURS · 14-variety macro WER', '% WER', 15, [null, null, 9.01, 3.98, 4.58, null], true), metric('LibriSpeech · test-clean WER', '% WER', 5, [null, null, 1.21, 1.19, 3.68, null], true), metric('Common Voice · zh WER', '% WER', 15, [null, null, 2.11, 2.77, 12.66, null], true), metric('Common Voice · en WER', '% WER', 15, [null, null, 2.57, 3.82, 11.06, null], true), metric('Multilingual QA · 14-language overall', '%', 100, [null, null, 81.69, 88.09, 92.99, null]), metric('BLEU · 14-pair overall', 'score', 60, [null, null, null, 36.02, 42.11, null])],
    note: 'ASR and MultiASR values are word error rates (lower is better); QA and BLEU are higher is better. FunAU results for Qwen-Audio-3.0/3.1-Realtime and Gemini-3.7-Flash are synced from the internal benchboard; GPT-Realtime-2 and SeedDuplex were not evaluated on these sets. The evaluated language set is not a claim about the full supported-language inventory.',
    noteZh: 'ASR 与 MultiASR 的数值为词错误率（越低越好），QA 与 BLEU 分数则越高越好。Qwen-Audio-3.0/3.1-Realtime 与 Gemini-3.7-Flash 的 FunAU 结果取自内部 benchboard，GPT-Realtime-2 与 SeedDuplex 未在这些数据集上评测。评测中使用的语言不代表模型支持的全部语种。'
  },
  context: {
    metrics: [metric('LongBench v2', '%', 100, [null, null, 43.14, 49.90, null, 58.80]), metric('MiniLongBench', '%', 100, [null, null, 55.70, 60.10, null, 58.20]), metric('Long-AMC', '%', 100, [null, null, 44.44, 52.48, null, 49.50])],
    note: 'Long-AMC is the long-context split of Audio MultiChallenge. All three metrics improve under the reported evaluation settings.',
    noteZh: 'Long-AMC 是 Audio MultiChallenge 评测中针对长上下文场景的子集。在报告所述的评测条件下，三项指标均有提升。'
  }
};
const charts = document.querySelector('#benchmark-charts');
const table = document.querySelector('#benchmark-table');
const tooltip = document.querySelector('#chart-tooltip');
const format = (value, unit) => `${value.toFixed(2)}${unit === '%' ? '%' : unit === '/5' ? '/5' : unit === '% WER' ? '%' : ''}`;
let activeCategory = 'intelligence';
function renderBenchmarks(category) {
  activeCategory = category;
  const data = benchmarks[category];
  charts.innerHTML = data.metrics.map(m => {
    const top = axisTop(m);
    return `<article class="chart-card"><h3>${m.name}</h3><p class="chart-subtitle">${m.lower ? T('↓ Lower is better', '↓ 越低越好') : T('↑ Higher is better', '↑ 越高越好')} · ${m.unit === '/5' ? T('1–5 score', '1–5 分') : m.unit}</p><div class="col-plot"><div class="col-axis" aria-hidden="true"><span>${top}</span><span>${top / 2}</span><span>0</span></div><div class="col-set">${m.values.map((value, index) => {
    if (value === null) return '';
    const pct = value / top * 100;
    const badge = badgeMarkup(index);
    const badgeInside = pct / 100 * PLOT_HEIGHT >= 52;
    return `<div class="col col-m${index}${index === 3 ? ' current' : ''}" tabindex="0" data-tip="${modelNames[index]} · ${m.name}: ${format(value, m.unit)}"><div class="col-stack"><b class="col-value">${format(value, m.unit)}</b>${badgeInside ? '' : badge}<div class="col-body" style="height:${pct}%">${badgeInside ? badge : ''}</div></div></div>`;
  }).join('')}</div></div></article>`;
  }).join('');
  table.innerHTML = `<table><caption>${T(`Exact values · ${category} · — indicates an unavailable result`, `精确数值 · ${category} · — 表示缺失结果`)}</caption><thead><tr><th scope="col">Model</th>${data.metrics.map(m => `<th scope="col">${m.name}<br>${m.unit} ${m.lower ? '↓' : '↑'}</th>`).join('')}</tr></thead><tbody>${modelNames.map((name, index) => `<tr class="${index === 3 ? 'current' : ''}"><th scope="row">${name}</th>${data.metrics.map(m => `<td>${m.values[index] === null ? '—' : m.values[index].toFixed(2)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  document.querySelector('#benchmark-note').textContent = T(data.note, data.noteZh);
  document.querySelector('#benchmark-panel').setAttribute('aria-labelledby', `tab-${category}`);
  document.querySelectorAll('[data-tab]').forEach(button => {
    const selected = button.dataset.tab === category;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  tooltip.hidden = true;
}
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => renderBenchmarks(button.dataset.tab)));
document.querySelector('.table-toggle').addEventListener('click', event => {
  const showTable = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(showTable));
  event.currentTarget.textContent = showTable ? T('Chart view', '图表视图') : T('Table view', '表格视图');
  charts.hidden = showTable;
  table.hidden = !showTable;
  tooltip.hidden = true;
});
function showTooltip(row, x, y) {
  tooltip.textContent = row.dataset.tip;
  tooltip.hidden = false;
  tooltip.style.left = `${Math.max(8, Math.min(x + 12, window.innerWidth - tooltip.offsetWidth - 10))}px`;
  tooltip.style.top = `${Math.max(8, Math.min(y + 15, window.innerHeight - tooltip.offsetHeight - 10))}px`;
}
charts.addEventListener('pointermove', event => {
  const row = event.target.closest('[data-tip]');
  if (row) showTooltip(row, event.clientX, event.clientY);
  else tooltip.hidden = true;
});
charts.addEventListener('pointerleave', () => { tooltip.hidden = true; });
charts.addEventListener('focusin', event => {
  const row = event.target.closest('[data-tip]');
  if (row) { const rect = row.getBoundingClientRect(); showTooltip(row, rect.left, rect.bottom); }
});
charts.addEventListener('focusout', () => { tooltip.hidden = true; });
window.addEventListener('scroll', () => { tooltip.hidden = true; }, {passive: true});
document.addEventListener('keydown', event => { if (event.key === 'Escape') tooltip.hidden = true; });
document.querySelectorAll('[role="tablist"]').forEach(list => list.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus(); tabs[next].click();
}));
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open');
}));
function renderLegend() {
  const currentFirst = [3, 0, 1, 2, 4, 5];
  document.querySelector('.chart-legend').innerHTML =
    currentFirst.map(index => `<span><i class="legend-m${index}"></i>${modelNames[index]}</span>`).join('');
}
renderLegend();
renderBenchmarks(activeCategory);
window.__rerenderers.push(() => {
  renderBenchmarks(activeCategory);
  const toggleButton = document.querySelector('.table-toggle');
  if (toggleButton) toggleButton.textContent = toggleButton.getAttribute('aria-pressed') === 'true' ? T('Chart view', '图表视图') : T('Table view', '表格视图');
});
