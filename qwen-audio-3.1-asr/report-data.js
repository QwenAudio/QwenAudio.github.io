/* Source: supplied Qwen-Audio-3.1-ASR Technical Report (13), 2026-10-15.
   Tables 2–8 and Figures 10–16 were checked against the supplied PDF.
   Previous-generation columns are not displayed on this 3.1 project page. */
const reportMultilingualData = {"models":["Doubao-ASR","Tencent Cloud ASR","Gemini-3.1-Pro","GPT-4o Transcribe","Azure MAI-Transcribe-2","MuseVoice Transcribe-1.0","Qwen-Audio-3.1-ASR"],"benchmarks":[{"name":"GigaSpeechBench","qwenWins":7,"languages":7,"rows":[["Indonesian",27.73,32.55,24.47,39.52,29.18,22.9,16.69],["Japanese",29.47,34.56,39.12,45.46,34.17,32.05,18.47],["Thai",17.65,31.4,17.37,53.55,22.42,15.27,7.75],["Filipino",25.36,33.38,37.41,37.73,32.95,25.48,21.69],["Vietnamese",9.53,9.61,15.55,32.89,12.77,10.76,8.04],["Korean",14.52,15,19.7,32.52,15.96,16.52,7.98],["Malay",35.05,41.06,40.19,51.59,38.18,38.81,25.04],["Macro average",22.76,28.22,27.69,41.89,26.52,23.11,15.09]]},{"name":"Common Voice 15","qwenWins":7,"languages":8,"rows":[["Indonesian",4.25,7.79,12.92,8.74,4.33,5.98,3.32],["Japanese",6.44,12.02,11.52,11.22,7.21,12.24,1.4],["Thai",2.32,4.17,12.33,6.64,1.9,2.94,1.43],["Vietnamese",6.31,5.67,10.64,15.5,5.93,7.77,8.44],["Korean",3.89,8.16,4.86,5.8,2.89,7.49,0.73],["Spanish",5.42,4.95,3.97,4.18,3.64,5.09,3.23],["Portuguese",8.06,6.24,8.65,8.78,4.89,6.49,4.47],["French",8.89,22.06,10.51,9.26,7.38,10.72,6.87],["Macro average",5.7,8.88,9.43,8.77,4.77,7.34,3.74]]},{"name":"FLEURS","qwenWins":5,"languages":9,"rows":[["Indonesian",5.24,12.77,3.72,3.73,2.62,8.16,2.01],["Japanese",3.16,15.39,3.95,2.98,1.85,6.55,0.36],["Thai",6.18,11.38,6.05,4.99,3.85,8.27,5.37],["Filipino",10.34,18.05,8.33,7.42,5.98,9.95,10.8],["Vietnamese",6.32,15.19,4.7,3.23,2.42,3.97,4.46],["Korean",4.86,8.93,4.24,4.06,3.92,6.87,2.38],["Malay",8.14,17.13,4.22,4.21,4.08,9.54,5.12],["Spanish",5.31,8.09,2.62,2.13,2.04,5.61,1.95],["Portuguese",7.19,13.71,3.46,2.8,2.53,7.12,2.21],["Macro average",6.3,13.4,4.59,3.95,3.25,7.34,3.85]]}],"metricsByLanguage":{"Indonesian":"WER","Japanese":"CER","Thai":"CER","Filipino":"WER","Vietnamese":"WER","Korean":"CER","Malay":"WER","Spanish":"WER","Portuguese":"WER","French":"WER"}};
const reportContextExamples = [
  ['<code>xsltproc style.xsl input.xml</code> occurred earlier','<code>xsl</code> data.xml &gt; out.html','<code>style.xsl</code> data.xml &gt; out.html'],
  ['Earlier explanation: “这叫法条竞合”','划掉即可','法条竞合'],
  ['The term <code>unigram</code> occurred twice earlier','我们称之为 <code>unique</code>','我们称之为 <code>unigram</code>'],
  ['<code>TCC</code> was repeatedly established as the metric name','our <code>GGC</code> will be…','our <code>TCC</code> will be…'],
  ['The name “洛军是阿占的儿子” occurred earlier','洛君是阿占的儿子','洛军是阿占的儿子'],
  ['The technical term <code>softmax</code> occurred earlier','<code>softmap</code> 形式','<code>softmax</code> 形式'],
  ['The mode name <code>debug</code> occurred earlier','只能第八个模式','只能 <code>debug</code> 模式'],
  ['The name “张贵生” occurred earlier','张桂生','张贵生']
];
const reportHotwordData = [["Person names","P0",32.27,82.64,37.33,95.26,62.12,99.43],["Subject terms","P0",75.14,93.06,71.84,92.53,69.36,99.42],["Subject terms","P1",84.36,93.04,86.02,96.73,88.46,95.31],["Trending buzzwords","P0",48.24,91.95,43.26,82.53,63.08,99.46],["Trending buzzwords","P1",51.24,89.48,53.92,87,74,88.34],["AI entities","P0",44.21,65.24,79.88,90.55,88.22,99.39],["Brand names","P0",44.18,57.88,80.14,95.55,83.83,97.95],["Product entities","P0",67.59,78.7,73.64,89.92,72.87,99.07]];

const reportSpeakerData = {
  table:7,
  datasets:['AISHELL-4','AliMeeting-test','MLC-SLM','MagicData-RAMC'],
  metrics:['DER','WER','cpWER'],
  rows:[
    ['MOSS-Transcribe-Diarize (MOSI)',4.20,14.33,15.23,3.38,19.47,17.23,3.20,11.71,14.06,4.79,10.88,14.00],
    ['Muse-Voice-Transcribe-1.0 (Meta)',3.04,17.78,19.04,6.16,26.93,27.97,3.48,12.64,14.60,4.55,12.55,15.47],
    ['Gemini-3.5-Transcribe (Google)',13.99,24.38,36.39,21.84,33.18,45.16,12.71,14.47,23.05,11.44,15.29,25.32],
    ['Mai-Transcribe-2 (Microsoft)',5.96,14.92,22.25,8.52,23.83,27.65,7.01,12.26,15.63,5.42,11.99,14.98],
    ['Fun-ASR-API (Cascaded)',8.45,17.08,21.22,9.03,25.37,34.68,6.17,29.26,33.83,5.37,11.52,20.42],
    ['VibeVoice-ASR* (Microsoft)',null,null,24.99,null,null,29.33,null,null,14.81,null,null,null],
    ['SoulX-Transcriber* (Soul)',null,14.49,17.82,null,16.22,16.99,null,null,null,null,null,null],
    ['Qwen-Audio-3.1-ASR',3.26,13.02,15.02,2.11,17.23,15.78,1.80,9.89,12.35,3.08,10.21,13.32],
    ['Qwen-Audio-3.1-ASR-Next',2.70,12.03,13.51,2.15,13.89,12.04,1.78,10.32,12.60,3.18,10.50,13.58]
  ]
};
