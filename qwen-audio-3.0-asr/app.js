const dialectSamples = [
  { short: '川', location: 'Sichuan · Chengdu', name: 'Sichuan dialect', sourceText: '第一次去人民公园喝茶，才懂成都人的慢生活。', translation: 'A visit to People’s Park for tea reveals the unhurried rhythm of life in Chengdu.', file: 'sichuan-chengdu.m4a' },
  { short: '晋', location: 'Shanxi · Taiyuan', name: 'Shanxi dialect', sourceText: '运城盐湖，白茫茫一片真壮观。', translation: 'Yuncheng Salt Lake stretches out in a spectacular expanse of white.', file: 'shanxi-taiyuan.m4a' },
  { short: '豫', location: 'Henan · Luoyang', name: 'Henan dialect', sourceText: '国乒拿5块金牌，真是咱的骄傲。', translation: 'Winning five table-tennis gold medals is truly something to be proud of.', file: 'henan-luoyang.m4a' },
  { short: '济', location: 'Jinan', name: 'Jinan dialect', sourceText: '济南人常说“宁可磨叽也别急”，急出来的活儿准不沾，慢工出细活嘛。', translation: 'In Jinan, people value taking the time to do careful, dependable work.', file: 'shandong-jinan.m4a' },
  { short: '粤', location: 'Cantonese · Guangzhou', name: 'Cantonese', sourceText: '阿妈煮嘅叉烧饭我食咗两碗。', translation: 'My mother’s char siu rice was so good that I ate two bowls.', file: 'cantonese-guangzhou.m4a' },
  { short: '陕', location: 'Shaanxi · Xi’an', name: 'Shaanxi dialect', sourceText: '剩余里程125公里，预计2小时。', translation: 'There are 125 kilometres remaining, with an estimated travel time of two hours.', file: 'shaanxi-xian.m4a' },
  { short: '青', location: 'Qingdao', name: 'Qingdao dialect', sourceText: '即墨鳌山卫那边海岸线很长，适合骑车子，空气也好。', translation: 'The coastline around Aoshanwei in Jimo is long, making it great for cycling, and the air is fresh.', file: 'qingdao-verified.m4a' },
  { short: '沪', location: 'Shanghai', name: 'Shanghainese', sourceText: '去外滩的时候，路上要绕开高峰。', translation: 'When heading to the Bund, avoid the rush-hour traffic.', file: 'shanghai-verified.m4a' },
  { short: '赣', location: 'Nanchang', name: 'Nanchang dialect', sourceText: '向塘铁路编组站是全国最大的编组站之一。', translation: 'Xiangtang Railway Marshalling Yard is one of the largest marshalling yards in China.', file: 'nanchang-verified.m4a' },
  { short: '甬', location: 'Ningbo', name: 'Ningbo dialect', sourceText: '臭冬瓜是宁波特色，腌半个月就好吃，闻臭吃香。', translation: 'Fermented winter melon is a Ningbo specialty. After half a month of pickling, it smells pungent but tastes delicious.', file: 'ningbo-verified.m4a' },
  { short: '客', location: 'Hakka', name: 'Hakka', sourceText: '客家娘酒焖猪脚，补身又好吃。', translation: 'Pork trotters braised in Hakka rice wine are both nourishing and delicious.', file: 'hakka-verified.m4a' },
  { short: '杭', location: 'Hangzhou', name: 'Hangzhou dialect', sourceText: '菜场里蔬菜花样非常多。', translation: 'The market has a tremendous variety of vegetables.', file: 'hangzhou-verified.m4a' },
  { short: '温', location: 'Wenzhou', name: 'Wenzhounese', sourceText: '买沙发还是皮做的还是布做的哪个质量好？', translation: 'When buying a sofa, which has better quality: leather or fabric?', file: 'wenzhou-verified.m4a' },
  { short: '湘', location: 'Hunan', name: 'Hunan dialect', sourceText: '湘江中路沿江风光带，晚上散步吹江风，惬意得很。', translation: 'A nighttime walk along the Xiangjiang Middle Road riverside, with the river breeze, is wonderfully relaxing.', file: 'hunan-verified.m4a' },
  { short: '闽', location: 'Fujian', name: 'Fujian dialect', sourceText: '吃蚵仔煎，蘸一勺甜辣酱。', translation: 'Eat an oyster omelet with a spoonful of sweet chili sauce.', file: 'fujian-verified.m4a' },
  { short: '苏', location: 'Suzhou', name: 'Suzhou dialect', sourceText: '小时候印象最深的，就是在山塘街看灯会。', translation: 'My strongest childhood memory is watching the lantern festival on Shantang Street.', file: 'suzhou-verified.m4a' }
];

const multilingualSamples = [
  { code:'zh', short: 'ZH', location: 'Chinese · China', name: '中文', file: 'languages/zh.wav', transcript: '特朗普与土耳其总统雷杰普·塔伊普·埃尔多安（Recep Tayyip Erdoğan）通话后发表了声明。', translation: 'Trump issued a statement after speaking with Turkish President Recep Tayyip Erdoğan.' },
  { code:'en', short: 'EN', location: 'English · United Kingdom', name: 'English', file: 'languages/en.wav', transcript: 'Unfortunately, studying traffic flow is difficult because driver behavior cannot be predicted with one-hundred percent certainty.', translation: 'Unfortunately, studying traffic flow is difficult because driver behavior cannot be predicted with complete certainty.' },
  { code:'ja', short: 'JA', location: 'Japanese · Japan', name: '日本語', file: 'multilingual/japanese.m4a', transcript: '就活のエントリーシート、学生時代に力を入れたこと、ボランティア活動について自分の熱意が伝わるように書きたいです。', translation: 'I want my job application to describe my volunteer work in a way that conveys my enthusiasm.' },
  { code:'ko', short: 'KO', location: 'Korean · South Korea', name: '한국어', file: 'multilingual/korean.m4a', transcript: '공개매수는 경영권 확보를 위해 주식을 장외에서 정해진 가격으로 사는 건데 공개매수가 발표되면 해당 주식의 주가는 보통 상승합니다.', translation: 'A tender offer buys shares off-exchange at a fixed price to secure management control.' },
  { code:'id', short: 'ID', location: 'Indonesian · Indonesia', name: 'Bahasa Indonesia', file: 'multilingual/indonesian.m4a', transcript: 'Buat laporan inspeksi aksesibilitas gedung pemerintahan sederhana dengan temuan dan rekomendasi perbaikan.', translation: 'Create a concise accessibility inspection report for a government building, including findings and recommendations.' },
  { code:'th', short: 'TH', location: 'Thai · Thailand', name: 'ภาษาไทย', file: 'multilingual/thai.m4a', transcript: 'มนุษย์เราทุกคนนะคะมีความผิดพลาดแต่หยิบความผิดพลาดนั้นขึ้นมาพัฒนาตัวเองเป็นคนใหม่ที่ดีขึ้นในทุกวัน', translation: 'Everyone makes mistakes, but we can learn from them and become better each day.' },
  { code:'es', short: 'ES', location: 'Spanish · Spain', name: 'Español', file: 'multilingual/spanish.m4a', transcript: '¿Me das una descripción de producto para una tienda online de ropa sostenible en Argentina? Es un vestido de algodón orgánico, corte recto, color tierra.', translation: 'Write a product description for an organic-cotton dress sold by a sustainable fashion store in Argentina.' },
  { code:'pt', short: 'PT', location: 'Portuguese · Portugal', name: 'Português', file: 'multilingual/portuguese.m4a', transcript: 'Crie um contrato de prestação de serviços de design com prazo, escopo e cláusula de propriedade intelectual, contendo dez cláusulas principais.', translation: 'Draft a design-services agreement with ten main clauses covering timeline, scope, and intellectual property.' },
  { code:'tl', short: 'TL', location: 'Tagalog · Philippines', name: 'Filipino', file: 'multilingual/filipino.m4a', transcript: 'Pakisulat ang isang announcement para sa barangay bulletin board tungkol sa libreng bakuna laban sa rabies sa Sabado.', translation: 'Write a community bulletin announcing free rabies vaccinations on Saturday.' },
  { code:'ms', short: 'MS', location: 'Malay · Malaysia', name: 'Bahasa Melayu', file: 'multilingual/malay.m4a', transcript: 'Apakah perasaan anda apabila pertama kali mengetahui anda akan mewakili sekolah ataupun negeri ke peringkat kebangsaan?', translation: 'How did you feel when you first learned that you would represent your school or state nationally?' },
  { code:'vi', short: 'VI', location: 'Vietnamese · Vietnam', name: 'Tiếng Việt', file: 'multilingual/vietnamese.m4a', transcript: 'Vậy thì qua những cái kinh nghiệm, qua những cái bài học, qua những cái mà anh đúc kết được thì anh nghĩ đâu là yếu tố quan trọng nhất?', translation: 'From your experience and lessons learned, what do you consider the single most important factor?' },
  { code:'hi', short:'HI', location:'Hindi · India', name:'हिन्दी', file:'languages/hi.wav', transcript:'स्कीइंग मार्ग को एक हाईकिंग (लंबी पैदल यात्रा) मार्ग जैसा ही सोचें।', translation:'Think of a skiing trail in much the same way as a hiking trail.' },
  { code:'ar', short:'AR', location:'Arabic · Saudi Arabia', name:'العربية', file:'languages/ar.wav', transcript:'ومن بين أكثر الطرق شيوعاً التي تستخدم لتوضيح أهمية التنشئة الاجتماعية، الاعتماد على الحالات القليلة المؤسفة للأطفال الذين عانوا، من خلال الإهمال أو سوء الحظ أو الإيذاء المتعمد، غير مرتبطين اجتماعياً من جانب البالغين أثناء نشأتهم.', translation:'A common way to illustrate the importance of socialization is to examine rare, unfortunate cases of children who grew up socially disconnected from adults through neglect, misfortune, or deliberate abuse.' },
  { code:'fr', short:'FR', location:'French · France', name:'Français', file:'languages/fr.wav', transcript:'Les voyageurs à destination de pays où les taxes sont élevées peuvent parfois faire des économies considérables, en particulier sur des produits comme les boissons alcoolisées ou le tabac.', translation:'Travelers heading to high-tax countries can sometimes save considerable sums, especially on products such as alcohol or tobacco.' },
  { code:'de', short:'DE', location:'German · Germany', name:'Deutsch', file:'languages/de.wav', transcript:'Löwenrudel agieren ähnlich wie Wolfs- oder Hunderudel, Tiere, die den Löwen (aber nicht anderen Großkatzen) im Verhalten überraschend ähneln und ebenso tödlich gegenüber ihrer Beute sind.', translation:'Lion prides behave much like wolf or dog packs, animals that are surprisingly similar to lions in behavior and equally deadly to their prey.' },
  { code:'ru', short:'RU', location:'Russian · Russia', name:'Русский', file:'languages/ru.wav', transcript:'В древнем Китае использовали уникальный способ обозначения периодов времени; каждый этап Китая или каждая семья, находившаяся у власти, были особой династией.', translation:'Ancient China used a unique way to mark periods of time: each era, or each ruling family, formed a distinct dynasty.' },
  { code:'it', short:'IT', location:'Italian · Italy', name:'Italiano', file:'languages/it.wav', transcript:"Il blog è uno strumento che si prefigge di incoraggiare la collaborazione e sviluppare l'apprendimento degli studenti ben oltre la giornata scolastica normale.", translation:'A blog is a tool intended to encourage collaboration and extend student learning well beyond the normal school day.' },
  { code:'nl', short:'NL', location:'Dutch · Netherlands', name:'Nederlands', file:'languages/nl.wav', transcript:'Volgens Angel (2006) kunnen organisaties beter presteren met een aanpak op basis van het continuümmodel.', translation:'According to Angel (2006), organizations can perform better with an approach based on the continuum model.' },
  { code:'sv', short:'SV', location:'Swedish · Sweden', name:'Svenska', file:'languages/sv.wav', transcript:'Månens yta utgörs av stenar och stoft. Månens yttre lager kallas skorpan.', translation:'The Moon’s surface consists of rocks and dust. Its outer layer is called the crust.' },
  { code:'da', short:'DA', location:'Danish · Denmark', name:'Dansk', file:'languages/da.wav', transcript:'Som i alle sydafrikanske nationalparker er der daglige bevarelses- og adgangsgebyrer til parken.', translation:'As in all South African national parks, daily conservation and entrance fees apply.' },
  { code:'fi', short:'FI', location:'Finnish · Finland', name:'Suomi', file:'languages/fi.wav', transcript:'Suurin osa valtiossa työskentelevistä puhuu italiaa myös arkikielenään, mutta uskonnollisissa toimituksissa käytetään usein latinaa.', translation:'Most people working in the state also speak Italian in daily life, while Latin is often used in religious ceremonies.' },
  { code:'no', short:'NO', location:'Norwegian · Norway', name:'Norsk', file:'languages/no.wav', transcript:'En løveflokk oppfører seg mye på samme måte som en ulve- eller hundeflokk, dyr som har overraskende mye til felles med oppførselen til løver (men ikke med andre store kattedyr). De er også livsfarlige for sine byttedyr.', translation:'A lion pride behaves much like a wolf or dog pack; these animals are surprisingly similar to lions in behavior and are also deadly to their prey.' },
  { code:'el', short:'EL', location:'Greek · Greece', name:'Ελληνικά', file:'languages/el.wav', transcript:'Αν διασχίζετε τη βόρεια Βαλτική θάλασσα τον χειμώνα, ελέγξτε τη θέση της καμπίνας σας, καθώς όταν το σκάφος περνά μέσα από πάγο δημιουργούνται τρομεροί θόρυβοι για εκείνους που επηρεάζονται περισσότερο.', translation:'If you cross the northern Baltic Sea in winter, check your cabin location: a ship moving through ice creates terrible noise for those most affected.' },
  { code:'pl', short:'PL', location:'Polish · Poland', name:'Polski', file:'languages/pl.wav', transcript:'Podróżni zwiedzający państwa obłożone szczególnie wysokimi podatkami mogą czasem zaoszczędzić sporo pieniędzy, szczególnie na takich towarach jak alkohol i tytoń.', translation:'Travelers visiting countries with especially high taxes can sometimes save substantial amounts, particularly on alcohol and tobacco.' },
  { code:'cs', short:'CS', location:'Czech · Czechia', name:'Čeština', file:'languages/cs.wav', transcript:'Schengenský prostor nicméně v tomto ohledu funguje podobně jako jedna země.', translation:'In this respect, however, the Schengen Area functions much like a single country.' },
  { code:'hu', short:'HU', location:'Hungarian · Hungary', name:'Magyar', file:'languages/hu.wav', transcript:'Hongkong nevét a Hongkong-szigetről kapta, és ez a hely sok turista számára a figyelem középpontjában áll.', translation:'Hong Kong takes its name from Hong Kong Island, a place that attracts the attention of many tourists.' },
  { code:'ro', short:'RO', location:'Romanian · Romania', name:'Română', file:'languages/ro.wav', transcript:'Înainte de sosirea trupelor, Haiti nu mai avusese din anii 1800 probleme legate de boală.', translation:'Before the troops arrived, Haiti had not experienced disease-related problems since the 1800s.' },
  { code:'bg', short:'BG', location:'Bulgarian · Bulgaria', name:'Български', file:'languages/bg.wav', transcript:'В метрото редовните съобщения се правят само на каталонски, но автоматизираната система обявява непланирани прекъсвания на широк кръг езици, включващи испански, английски, френски, арабски и японски.', translation:'Regular metro announcements are made only in Catalan, but the automated system announces unplanned disruptions in languages including Spanish, English, French, Arabic, and Japanese.' },
  { code:'hr', short:'HR', location:'Croatian · Croatia', name:'Hrvatski', file:'languages/hr.wav', transcript:'Tijekom noći izrađeno je između 150 i 200 kopija koje su sada poznate pod nazivom „Dunlap broadsides“.', translation:'Between 150 and 200 copies were produced during the night; they are now known as the Dunlap broadsides.' },
  { code:'sk', short:'SK', location:'Slovak · Slovakia', name:'Slovenčina', file:'languages/sk.wav', transcript:'Madagaskar je zďaleka tým najväčším a je sám o sebe kontinentom, keď ide o divokú prírodu.', translation:'Madagascar is by far the largest and, when it comes to wildlife, is a continent in its own right.' }
];

const supportedLanguages = [
  ['zh','Chinese','中文'],['en','English','英文'],['ja','Japanese','日语'],['ko','Korean','韩语'],['vi','Vietnamese','越南语'],['th','Thai','泰语'],['id','Indonesian','印尼语'],['ms','Malay','马来语'],['tl','Tagalog','菲律宾语'],['hi','Hindi','印地语'],['ar','Arabic','阿拉伯语'],['fr','French','法语'],['de','German','德语'],['es','Spanish','西班牙语'],['pt','Portuguese','葡萄牙语'],['ru','Russian','俄语'],['it','Italian','意大利语'],['nl','Dutch','荷兰语'],['sv','Swedish','瑞典语'],['da','Danish','丹麦语'],['fi','Finnish','芬兰语'],['no','Norwegian','挪威语'],['el','Greek','希腊语'],['pl','Polish','波兰语'],['cs','Czech','捷克语'],['hu','Hungarian','匈牙利语'],['ro','Romanian','罗马尼亚语'],['bg','Bulgarian','保加利亚语'],['hr','Croatian','克罗地亚语'],['sk','Slovak','斯洛伐克语']
];

const contextExamples = [
  ['<code>xsltproc style.xsl input.xml</code> occurred earlier','<code>xsl</code> data.xml &gt; out.html','<code>style.xsl</code> data.xml &gt; out.html'],
  ['Earlier explanation: “这叫法条竞合”','划掉即可','法条竞合'],
  ['The term <code>unigram</code> occurred twice earlier','我们称之为 <code>unique</code>','我们称之为 <code>unigram</code>'],
  ['<code>TCC</code> was repeatedly established as the metric name','our <code>GGC</code> will be…','our <code>TCC</code> will be…'],
  ['The name “洛军是阿占的儿子” occurred earlier','洛君是阿占的儿子','洛军是阿占的儿子'],
  ['The technical term <code>softmax</code> occurred earlier','<code>softmap</code> 形式','<code>softmax</code> 形式'],
  ['The mode name <code>debug</code> occurred earlier','只能第八个模式','只能 <code>debug</code> 模式'],
  ['The name “张贵生” occurred earlier','张桂生','张贵生']
];

const resultViews = {
  dialect: { label:'Dialect CER', image:'assets/figures/dialect-cer-hd.png', alt:'CER comparison across 16 Chinese dialects', kicker:'Internal dialect suite', number:'9.40%', title:'Macro CER across 16 dialects', description:'Qwen-Audio-3.0-ASR reports the lowest CER on 11 of 16 test sets, compared with macro CERs of 16.77% for Doubao-ASR and 20.40% for Tencent Hy-ASR-3.0-preview.', tags:['Lower is better','16 varieties','Internal benchmark'] },
  consistency: { label:'Consistency', image:'assets/figures/dialect-consistency.png', alt:'Dialect task-consistency comparison', kicker:'Task consistency', number:'≥ 6', title:'Consistency decision threshold', description:'A judge model scores semantic and task consistency from 0 to 10. Outputs scoring at least 6 are counted as consistent.', tags:['Higher is better','ASR + AST','Judge-based'] },
  industry: { label:'Industry recall', image:'assets/figures/industry-radar.png', alt:'Industry entity recall radar across 15 domains', kicker:'Industry entity recognition', number:'11/15', title:'Outright-leading domains', description:'Across the internal industry-term evaluation, Qwen-Audio-3.0-ASR reports the outright highest entity recall in 11 of 15 domains and ties for the highest recall in one additional domain.', tags:['Higher is better','Entity recall','Internal benchmark'] },
  polishing: { label:'Polishing', image:'assets/figures/polishing-scores.png', alt:'Readability and faithfulness of native polishing', kicker:'Native polishing', number:'3.44', title:'Readability score', description:'Native single-pass polishing improves readability from 2.53 to 3.44 while maintaining a faithfulness score of 3.44, approaching an external post-rewrite baseline.', tags:['Single pass','Readable output','Faithfulness'] },
  latency: { label:'Latency', image:'assets/figures/latency-accuracy.png', alt:'Latency accuracy trade-off', kicker:'Streaming recognition', number:'200 ms', title:'Theoretical first-token latency', description:'The streaming model exposes configurable operating points for the latency–accuracy trade-off on internal Chinese and English industrial test sets.', tags:['Lower latency','CER / WER','Streaming'] }
};

const paperFigures = [
  ['01','figure-1-overview-hd.png','System overview and production-oriented capabilities'],
  ['02','architecture.png','Instruction-controlled decoding workflow'],
  ['03','figure-3-encoder-pretraining.png','Audio encoder pretraining pipeline'],
  ['04','figure-4-funverl.png','FunVerl-ASR fully asynchronous RL framework'],
  ['05','figure-5-message-asr.png','Message ASR workflow'],
  ['06','dialect-cer-hd.png','CER across 16 Chinese dialects'],
  ['07','dialect-consistency.png','Dialect-consistency rates'],
  ['08','industry-radar.png','Industry-domain entity recall'],
  ['09','polishing-scores.png','Readability and faithfulness of native polishing'],
  ['10','polishing-examples.png','Chinese and English polishing examples'],
  ['11','latency-accuracy.png','Latency–accuracy trade-off']
];

const hotwordRows = [
  ['Person','P0','32.27 → 82.64','37.33 → 95.26','60.63 → 99.53'],['Subject','P0','75.14 → 93.06','71.84 → 92.53','66.09 → 100.00'],['Subject','P1','84.36 → 93.04','86.02 → 96.73','86.25 → 94.59'],['Trending','P0','48.24 → 91.95','43.26 → 82.53','62.81 → 99.55'],['Trending','P1','51.24 → 89.48','53.92 → 87.00','73.42 → 92.16'],['AI entities','P0','44.21 → 65.24','79.88 → 90.55','83.84 → 99.70'],['Alibaba brand','P0','44.18 → 57.88','80.14 → 95.55','83.90 → 99.32'],['DingTalk entities','P0','67.59 → 78.70','73.64 → 89.92','75.19 → 99.07']
];

const industryRows = [
  ['Stock',81.09,77.74,88.54],['Medical',90.99,89.56,95.36],['IT / programming',60.50,79.72,91.87],['Public figures',87.52,84.64,88.51],['Organizations',75.54,80.10,81.61],['Animal husbandry',83.12,84.08,91.19],['Industry',88.30,89.07,93.24],['Culture',83.43,85.97,89.40],['AI',63.58,66.23,76.82]
];

const audio = document.querySelector('#sample-audio');
const playButton = document.querySelector('#play-button');
const chooser = document.querySelector('#sample-chooser');
const consoleElement = document.querySelector('.audio-console');
let activeSample = dialectSamples[0];
let activeSampleButton = null;
let activeAudioKind = 'dialects';

for (let index = 0; index < 40; index += 1) {
  const bar = document.createElement('i');
  bar.style.setProperty('--height', `${22 + Math.abs(Math.sin(index * .73)) * 70}%`);
  bar.style.setProperty('--delay', `${-index * .047}s`);
  document.querySelector('#waveform').appendChild(bar);
}

function loadSample(sample, autoplay = false, sourceButton = null) {
  audio.pause();
  activeSample = sample;
  activeSampleButton = sourceButton;
  document.querySelector('#sample-location').textContent = sample.location;
  document.querySelector('#sample-name').textContent = sample.name;
  document.querySelector('#sample-transcript').textContent = sample.sourceText || sample.transcript;
  document.querySelector('#sample-translation').textContent = sample.translation || '';
  document.querySelector('#console-status').textContent = `${sample.location} / ${sample.file ? 'ready' : 'audio pending'}`;
  document.querySelector('#sample-progress').style.width = '0%';
  playButton.textContent = '▶';
  consoleElement.classList.remove('playing');
  document.querySelectorAll('.showcase-chip').forEach(button => button.classList.remove('is-playing'));
  document.querySelectorAll('.showcase-chip').forEach(button => button.setAttribute('aria-pressed', button === sourceButton ? 'true' : 'false'));
  document.querySelectorAll('.map-marker').forEach(button => button.setAttribute('aria-pressed', button.dataset.sampleKey === (sample.code || sample.location) ? 'true' : 'false'));
  playButton.disabled = !sample.file;
  if (!sample.file) { audio.removeAttribute('src'); audio.load(); return; }
  audio.src = `assets/audio/${sample.file}`;
  if (autoplay) playCurrent();
}

async function playCurrent() {
  try {
    await audio.play();
    playButton.textContent = 'Ⅱ';
    document.querySelector('#console-status').textContent = `${activeSample.location} / playing`;
    consoleElement.classList.add('playing');
    if (activeSampleButton) activeSampleButton.classList.add('is-playing');
  } catch (_) {
    document.querySelector('#console-status').textContent = 'Audio unavailable';
  }
}

function renderSampleChooser(kind) {
  activeAudioKind = kind;
  const items = kind === 'dialects' ? dialectSamples : multilingualSamples;
  chooser.innerHTML = '';
  items.forEach((sample, index) => {
    const button = document.createElement('button');
    button.className = 'showcase-chip';
    button.type = 'button';
    button.classList.toggle('is-pending', !sample.file);
    button.innerHTML = `<b>${sample.short}</b><span>${sample.name}</span>`;
    button.setAttribute('aria-label', sample.file ? `Select ${sample.location}` : `${sample.location}, audio not supplied`);
    button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    button.addEventListener('click', () => loadSample(sample, false, button));
    chooser.appendChild(button);
  });
  const firstPlayable = items.find(sample => sample.file);
  const firstButton = chooser.querySelector('.showcase-chip:not(:disabled)');
  loadSample(firstPlayable, false, firstButton);
}
renderSampleChooser('languages');

playButton.addEventListener('click', () => audio.paused ? playCurrent() : audio.pause());
audio.addEventListener('pause', () => { playButton.textContent = '▶'; consoleElement.classList.remove('playing'); if (activeSampleButton) activeSampleButton.classList.remove('is-playing'); });
audio.addEventListener('timeupdate', () => { document.querySelector('#sample-progress').style.width = `${audio.duration ? audio.currentTime / audio.duration * 100 : 0}%`; });
audio.addEventListener('ended', () => { document.querySelector('#console-status').textContent = `${activeSample.location} / complete`; });

const streamAudio = document.querySelector('#stream-audio');
const streamPlay = document.querySelector('#stream-play');
const baselineLiveText = document.querySelector('#baseline-live-text');
const qwenLiveText = document.querySelector('#qwen-live-text');
const streamTranscript = '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我预定一个包含早餐的酒店。';
const baselineCues = [
  [0.0, ''], [1.0, '最'], [1.5, '最近北京'], [2.0, '最近北京天气'],
  [2.5, '最近北京天气还不错'], [3.5, '最近北京天气还不错，'],
  [4.5, '最近北京天气还不错，帮我查一下'], [5.0, '最近北京天气还不错，帮我查一下北京'],
  [5.5, '最近北京天气还不错，帮我查一下北京到杭州的'], [6.0, '最近北京天气还不错，帮我查一下北京到杭州的航班'],
  [6.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后'], [7.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个'],
  [7.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上'], [8.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京'],
  [9.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班'], [11.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。'],
  [12.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下'], [13.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店'],
  [14.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我'], [15.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我预定一个'],
  [16.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我预定一个包含'], [17.0, streamTranscript]
];
const qwenCues = [
  [0.0, ''], [1.0, '最近'], [1.5, '最近北京'], [2.0, '最近北京天气还不'], [2.5, '最近北京天气还不错'], [3.0, '最近北京天气还不错。'],
  [4.5, '最近北京天气还不错，帮我查一下'], [5.0, '最近北京天气还不错，帮我查一下北京'], [5.5, '最近北京天气还不错，帮我查一下北京到杭州的航班'],
  [6.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后'], [7.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天'], [7.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上'],
  [8.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京'], [9.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发'], [10.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。'],
  [11.5, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下'], [12.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上'], [13.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店'],
  [14.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我预定一个'], [15.0, '最近北京天气还不错，帮我查一下北京到杭州的航班，然后预定一个明天晚上从北京出发的航班。再帮我看一下明天晚上杭州的酒店，帮我预定一个包含'], [16.0, streamTranscript]
];

function textAtCue(cues, time) {
  let text = '';
  for (const [cueTime, cueText] of cues) {
    if (time < cueTime) break;
    text = cueText;
  }
  return text;
}

function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

function updateStreamingTranscript() {
  if (!streamAudio.duration) {
    baselineLiveText.textContent = '';
    qwenLiveText.textContent = '';
    document.querySelector('#stream-track-progress').style.width = '0%';
    return;
  }
  const progress = streamAudio.currentTime / streamAudio.duration;
  qwenLiveText.textContent = textAtCue(qwenCues, streamAudio.currentTime);
  baselineLiveText.textContent = textAtCue(baselineCues, streamAudio.currentTime);
  document.querySelector('#stream-track-progress').style.width = `${progress * 100}%`;
  document.querySelector('#stream-current').textContent = formatAudioTime(streamAudio.currentTime);
}

streamAudio.addEventListener('loadedmetadata', () => { document.querySelector('#stream-duration').textContent = formatAudioTime(streamAudio.duration); updateStreamingTranscript(); });
streamAudio.addEventListener('timeupdate', updateStreamingTranscript);
streamAudio.addEventListener('play', () => { streamPlay.textContent = 'Ⅱ'; document.querySelector('.streaming-player').classList.add('is-playing'); });
streamAudio.addEventListener('pause', () => { streamPlay.textContent = '▶'; document.querySelector('.streaming-player').classList.remove('is-playing'); });
streamAudio.addEventListener('ended', () => { baselineLiveText.textContent = streamTranscript; qwenLiveText.textContent = streamTranscript; });
streamPlay.addEventListener('click', async () => {
  if (!streamAudio.paused) { streamAudio.pause(); return; }
  try { await streamAudio.play(); } catch (_) { streamPlay.setAttribute('aria-label', 'Audio unavailable'); }
});
updateStreamingTranscript();

document.querySelectorAll('[data-audio-tab]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-audio-tab]').forEach(item => item.setAttribute('aria-selected', item === button ? 'true' : 'false'));
  renderSampleChooser(button.dataset.audioTab);
  const languages = button.dataset.audioTab === 'languages';
  document.querySelector('#world-map-view').hidden = !languages;
  document.querySelector('#china-map-view').hidden = languages;
  document.querySelector('#language-composer').hidden = !languages;
}));

document.querySelector('#language-grid').innerHTML = supportedLanguages.map(([code,en,zh]) => `<div><b>${code}</b><span>${en}</span><small>${zh}</small></div>`).join('');

const multilingualByCode = Object.fromEntries(multilingualSamples.map(sample => [sample.code, sample]));
const languageMapNames = {zh:'China',en:'United Kingdom',ja:'Japan',ko:'South Korea',vi:'Vietnam',th:'Thailand',id:'Indonesia',ms:'Malaysia',tl:'Philippines',hi:'India',ar:'Saudi Arabia',fr:'France',de:'Germany',es:'Spain',pt:'Portugal',ru:'Russia',it:'Italy',nl:'Netherlands',sv:'Sweden',da:'Denmark',fi:'Finland',no:'Norway',el:'Greece',pl:'Poland',cs:'Czechia',hu:'Hungary',ro:'Romania',bg:'Bulgaria',hr:'Croatia',sk:'Slovakia'};
const languageSamples = Object.fromEntries(supportedLanguages.map(([code, english]) => [code, multilingualByCode[code] || {code, short:code.toUpperCase(), location:`${english} · ${languageMapNames[code]}`, name:english, transcript:'Source-language sample pending import from the supplied corpus.', translation:'English translation will appear here when the source sample is imported.', file:null}]));

const languageGeo = {
  zh:{iso:'CHN',coords:[116.4074,39.9042]}, en:{iso:'GBR',coords:[-0.1276,51.5072]}, ja:{iso:'JPN',coords:[139.6917,35.6895]}, ko:{iso:'KOR',coords:[126.9780,37.5665]},
  vi:{iso:'VNM',coords:[105.8342,21.0278]}, th:{iso:'THA',coords:[100.5018,13.7563]}, id:{iso:'IDN',coords:[106.8456,-6.2088]}, ms:{iso:'MYS',coords:[101.6869,3.1390]},
  tl:{iso:'PHL',coords:[120.9842,14.5995]}, hi:{iso:'IND',coords:[77.2090,28.6139]}, ar:{iso:'SAU',coords:[46.6753,24.7136]}, fr:{iso:'FRA',coords:[2.3522,48.8566]},
  de:{iso:'DEU',coords:[13.4050,52.5200]}, es:{iso:'ESP',coords:[-3.7038,40.4168]}, pt:{iso:'PRT',coords:[-9.1393,38.7223]}, ru:{iso:'RUS',coords:[37.6173,55.7558]},
  it:{iso:'ITA',coords:[12.4964,41.9028]}, nl:{iso:'NLD',coords:[4.9041,52.3676]}, sv:{iso:'SWE',coords:[18.0686,59.3293]}, da:{iso:'DNK',coords:[12.5683,55.6761]},
  fi:{iso:'FIN',coords:[24.9384,60.1699]}, no:{iso:'NOR',coords:[10.7522,59.9139]}, el:{iso:'GRC',coords:[23.7275,37.9838]}, pl:{iso:'POL',coords:[21.0122,52.2297]},
  cs:{iso:'CZE',coords:[14.4378,50.0755]}, hu:{iso:'HUN',coords:[19.0402,47.4979]}, ro:{iso:'ROU',coords:[26.1025,44.4268]}, bg:{iso:'BGR',coords:[23.3219,42.6977]},
  hr:{iso:'HRV',coords:[15.9819,45.8150]}, sk:{iso:'SVK',coords:[17.1077,48.1486]}
};

const dialectGeo = [
  [104.0668,30.5728], [112.5489,37.8706], [112.4540,34.6197], [117.1201,36.6512],
  [113.2644,23.1291], [108.9398,34.3416], [120.3826,36.0671], [121.4737,31.2304],
  [115.8579,28.6820], [121.5440,29.8683], [116.1226,24.2886], [120.1551,30.2741],
  [120.6994,27.9939], [112.9388,28.2282], [119.2965,26.0745], [120.5853,31.2989]
];

function bindGeoActivation(selection, callback) {
  selection.on('click', callback).on('keydown', function(event, datum) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); callback.call(this, event, datum); }
  });
}

function renderGeographicMaps() {
  const worldProjection = d3.geoNaturalEarth1().fitExtent([[34,32],[966,528]], window.WORLD_COUNTRIES);
  const worldPath = d3.geoPath(worldProjection);
  const isoToCode = Object.fromEntries(Object.entries(languageGeo).map(([code, item]) => [item.iso, code]));
  const countries = d3.select('#world-country-layer').selectAll('path').data(window.WORLD_COUNTRIES.features).join('path')
    .attr('d', worldPath)
    .attr('class', feature => isoToCode[feature.properties.ADM0_A3] ? 'geo-region is-supported' : 'geo-region')
    .attr('data-code', feature => isoToCode[feature.properties.ADM0_A3] || null)
    .attr('aria-label', feature => feature.properties.NAME_EN || feature.properties.NAME)
    .attr('tabindex', feature => isoToCode[feature.properties.ADM0_A3] ? 0 : null);
  bindGeoActivation(countries.filter(feature => Boolean(isoToCode[feature.properties.ADM0_A3])), function(event, feature) {
    const code = isoToCode[feature.properties.ADM0_A3];
    loadSample(languageSamples[code], true, null);
    d3.selectAll('#language-map-points .geo-marker').classed('is-active', marker => marker.code === code);
  });

  const languageMarkers = d3.select('#language-map-points').selectAll('g').data(supportedLanguages.map(([code, english]) => ({code, english, ...languageGeo[code]}))).join('g')
    .attr('class','geo-marker')
    .attr('transform', marker => `translate(${worldProjection(marker.coords).join(',')})`)
    .attr('tabindex',0)
    .attr('role','button')
    .attr('aria-label', marker => `${marker.english} audio sample`);
  languageMarkers.append('circle').attr('r',6);
  languageMarkers.append('text').attr('y',-12).text(marker => marker.code.toUpperCase());
  bindGeoActivation(languageMarkers, function(event, marker) {
    loadSample(languageSamples[marker.code], true, null);
    languageMarkers.classed('is-active', item => item.code === marker.code);
  });

  // DataV follows RFC 7946 ring winding; d3-geo uses the inverse spherical
  // winding convention. Reverse every ring once so provinces render as their
  // actual polygons instead of the complement of each polygon.
  window.CHINA_PROVINCES.features.forEach(feature => {
    const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
    polygons.forEach(polygon => polygon.forEach(ring => ring.reverse()));
  });
  const chinaProjection = d3.geoMercator().fitExtent([[62,34],[938,526]], window.CHINA_PROVINCES);
  const chinaPath = d3.geoPath(chinaProjection);
  const provinceSample = {'四川省':0,'山西省':1,'河南省':2,'山东省':3,'广东省':4,'陕西省':5,'上海市':7,'江西省':8,'浙江省':9,'湖南省':13,'福建省':14,'江苏省':15};
  const provinces = d3.select('#china-province-layer').selectAll('path').data(window.CHINA_PROVINCES.features).join('path')
    .attr('d', chinaPath)
    .attr('class', feature => provinceSample[feature.properties.name] !== undefined ? 'geo-region china-province is-supported' : 'geo-region china-province')
    .attr('tabindex', feature => provinceSample[feature.properties.name] !== undefined ? 0 : null)
    .attr('aria-label', feature => feature.properties.name);
  bindGeoActivation(provinces.filter(feature => provinceSample[feature.properties.name] !== undefined), function(event, feature) {
    loadSample(dialectSamples[provinceSample[feature.properties.name]], true, null);
  });

  const dialectMarkers = d3.select('#dialect-map-points').selectAll('g').data(dialectSamples.map((sample,index) => ({sample,index,coords:dialectGeo[index]}))).join('g')
    .attr('class','geo-marker dialect-geo-marker')
    .attr('transform', marker => `translate(${chinaProjection(marker.coords).join(',')})`)
    .attr('tabindex',0)
    .attr('role','button')
    .attr('aria-label', marker => `${marker.sample.name} audio sample`);
  dialectMarkers.append('circle').attr('r',7);
  dialectMarkers.append('text').attr('y',-13).text(marker => marker.sample.short);
  bindGeoActivation(dialectMarkers, function(event, marker) {
    loadSample(marker.sample, true, null);
    dialectMarkers.classed('is-active', item => item.index === marker.index);
  });
}

renderGeographicMaps();
loadSample(multilingualSamples[0], false, chooser.querySelector('.showcase-chip'));

document.querySelectorAll('.atlas-map-view').forEach(view => {
  const canvas = view.querySelector('.map-canvas');
  const state = { scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0 };
  const render = () => { canvas.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`; };
  const zoom = delta => {
    state.scale = Math.min(3, Math.max(1, state.scale + delta));
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    render();
  };
  view.querySelectorAll('[data-map-action]').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    if (button.dataset.mapAction === 'zoom-in') zoom(.25);
    if (button.dataset.mapAction === 'zoom-out') zoom(-.25);
    if (button.dataset.mapAction === 'reset') { state.scale = 1; state.x = 0; state.y = 0; render(); }
  }));
  view.addEventListener('wheel', event => { event.preventDefault(); zoom(event.deltaY < 0 ? .15 : -.15); }, { passive: false });
  view.addEventListener('pointerdown', event => {
    if (event.target.closest('button,.geo-marker,.geo-region.is-supported') || state.scale === 1) return;
    state.dragging = true; state.startX = event.clientX - state.x; state.startY = event.clientY - state.y;
    view.setPointerCapture(event.pointerId); view.classList.add('is-dragging');
  });
  view.addEventListener('pointermove', event => {
    if (!state.dragging) return;
    state.x = event.clientX - state.startX; state.y = event.clientY - state.startY; render();
  });
  const stopDrag = event => { if (!state.dragging) return; state.dragging = false; view.releasePointerCapture?.(event.pointerId); view.classList.remove('is-dragging'); };
  view.addEventListener('pointerup', stopDrag); view.addEventListener('pointercancel', stopDrag);
});

const languageFlags = { zh:'🇨🇳', en:'🇬🇧', ja:'🇯🇵', ko:'🇰🇷', vi:'🇻🇳', th:'🇹🇭', id:'🇮🇩', ms:'🇲🇾', tl:'🇵🇭', hi:'🇮🇳', ar:'🇸🇦', fr:'🇫🇷', de:'🇩🇪', es:'🇪🇸', pt:'🇵🇹', ru:'🇷🇺', it:'🇮🇹', nl:'🇳🇱', sv:'🇸🇪', da:'🇩🇰', fi:'🇫🇮', no:'🇳🇴', el:'🇬🇷', pl:'🇵🇱', cs:'🇨🇿', hu:'🇭🇺', ro:'🇷🇴', bg:'🇧🇬', hr:'🇭🇷', sk:'🇸🇰' };
const languageIndex = Object.fromEntries(supportedLanguages.map(language => [language[0], language]));
let selectedLanguageCodes = ['zh', 'ja', 'en'];

function renderLanguageCombination(codes) {
  selectedLanguageCodes = codes;
  document.querySelector('#selected-languages').innerHTML = codes.map(code => {
    const [, english, chinese] = languageIndex[code];
    return `<button type="button" data-selected-language="${code}" title="Remove ${english}"><span>${languageFlags[code]}</span><b>${english}</b><small>${chinese}</small><i>×</i></button>`;
  }).join('');
  document.querySelector('#combination-code').textContent = `language_hints = [${codes.map(code => `"${code}"`).join(', ')}]`;
  document.querySelectorAll('[data-selected-language]').forEach(button => button.addEventListener('click', () => {
    if (selectedLanguageCodes.length === 1) return;
    renderLanguageCombination(selectedLanguageCodes.filter(code => code !== button.dataset.selectedLanguage));
  }));
}

document.querySelectorAll('[data-combo]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.combo === 'random') {
    const shuffled = supportedLanguages.map(language => language[0]).sort(() => Math.random() - .5);
    renderLanguageCombination(shuffled.slice(0, 2 + Math.floor(Math.random() * 3)));
  } else {
    renderLanguageCombination(button.dataset.combo.split(','));
  }
}));
renderLanguageCombination(selectedLanguageCodes);

const resultTabs = document.querySelector('#result-tabs');
Object.entries(resultViews).forEach(([key, view], index) => {
  const button = document.createElement('button'); button.type='button'; button.role='tab'; button.dataset.result=key; button.textContent=view.label; button.setAttribute('aria-selected', index===0?'true':'false'); resultTabs.appendChild(button);
  button.addEventListener('click', () => showResult(key, button));
});
function showResult(key, button = resultTabs.children[0]) {
  const view = resultViews[key]; resultTabs.querySelectorAll('button').forEach(item => item.setAttribute('aria-selected', item===button?'true':'false'));
  const image = document.querySelector('#result-image'); image.src=view.image; image.alt=view.alt;
  document.querySelector('#result-kicker').textContent=view.kicker; document.querySelector('#result-number').textContent=view.number; document.querySelector('#result-title').textContent=view.title; document.querySelector('#result-description').textContent=view.description;
  document.querySelector('#result-tags').innerHTML=view.tags.map(tag=>`<span>${tag}</span>`).join('');
}
showResult('dialect');

function makeTable(headers, rows, caption='') {
  return `<table>${caption?`<caption>${caption}</caption>`:''}<thead><tr>${headers.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

const benchRows = [
  ['Panel A','AISHELL-1','CER','4.72','0.71','0.63','0.54','0.63','1.03'],['Panel A','AISHELL-2','CER','4.68','2.86','2.10','2.58','2.78','2.02'],['Panel A','FLEURS-zh','CER','5.18','3.11','2.68','4.81','3.99','2.08'],['Panel A','FLEURS-en','WER','6.23','6.99','3.03','10.79','5.02','4.17'],['Panel A','LibriSpeech-clean','WER','1.86','1.32','1.17','1.84','1.57','1.19'],['Panel A','LibriSpeech-other','WER','3.43','2.63','2.42','4.52','4.01','2.24'],['Panel A','WeNetSpeech-meeting','CER','18.39','6.24','4.75','4.95','6.69','3.11'],['Panel A','WeNetSpeech-net','CER','11.89','6.45','4.67','4.94','6.09','4.31']
];
document.querySelector('#benchmark-table').innerHTML = makeTable(['Source','Test set','Metric','Whisper-large-v3','Kimi-Audio','Step-Audio 2','FireRed-ASR','LongCat-Flash-Omni','Qwen-Audio-3.0-ASR'], benchRows, 'Panel A · Officially reported results') + makeTable(['Source','Test set','Metric','GPT-4o Transcribe','Azure','Doubao-ASR','Fun-ASR-Flash','Tencent Hy-ASR-3.0-preview','Qwen-Audio-3.0-ASR'], [
  ['Panel B','AISHELL-1','CER','3.34','1.60','1.54','0.76','0.78','1.03'],['Panel B','AISHELL-2','CER','4.47','3.24','2.66','1.93','2.15','2.02'],['Panel B','FLEURS-zh','CER','6.14','5.51','8.18','5.52','2.38','2.08'],['Panel B','FLEURS-en','WER','5.79','5.47','6.50','4.95','5.45','4.17'],['Panel B','LibriSpeech-clean','WER','1.58','1.90','3.36','1.35','1.60','1.19'],['Panel B','LibriSpeech-other','WER','3.87','3.54','4.46','2.51','2.68','2.24'],['Panel B','WeNetSpeech-meeting','CER','26.83','6.86','5.84','3.89','5.60','3.11'],['Panel B','WeNetSpeech-net','CER','12.27','4.58','4.81','3.83','4.16','4.31']
], 'Panel B · Unified API evaluation');

const multilingualRows = [
  ['GigaSpeechBench','Indonesian','WER','27.73','32.55','24.47','39.52','25.02','23.68'],['GigaSpeechBench','Japanese','CER','29.47','34.56','39.12','45.46','29.94','28.48'],['GigaSpeechBench','Thai','CER','17.65','31.40','17.37','53.55','17.08','16.22'],['GigaSpeechBench','Filipino','WER','25.36','33.38','37.41','37.73','N/A','29.45'],['GigaSpeechBench','Vietnamese','WER','9.53','9.61','15.55','32.89','13.25','11.54'],['GigaSpeechBench','Korean','CER','14.52','15.00','19.70','32.52','16.39','13.50'],['GigaSpeechBench','Malay','WER','35.05','41.06','40.19','51.59','N/A','34.65'],['GigaSpeechBench','Macro average','—','22.76','28.22','27.69','41.89','—','22.50'],
  ['Common Voice 15','Indonesian','WER','4.25','7.79','12.92','8.74','4.78','3.66'],['Common Voice 15','Japanese','CER','6.44','12.02','11.52','11.22','6.81','5.64'],['Common Voice 15','Thai','CER','2.32','4.17','12.33','6.64','2.39','1.56'],['Common Voice 15','Vietnamese','WER','6.31','5.67','10.64','15.50','6.64','8.29'],['Common Voice 15','Korean','CER','3.89','8.16','4.86','5.80','3.32','3.09'],['Common Voice 15','Spanish','WER','5.42','4.95','3.97','4.18','3.40','3.09'],['Common Voice 15','French','WER','8.89','22.06','10.51','9.26','7.73','6.69'],['Common Voice 15','Macro average','—','5.36','9.26','9.54','8.76','5.01','4.57'],
  ['FLEURS','Indonesian','WER','5.24','12.77','3.72','3.73','3.12','2.89'],['FLEURS','Japanese','CER','3.16','15.39','3.95','2.98','2.08','1.61'],['FLEURS','Thai','CER','6.18','11.38','6.05','4.99','4.65','6.73'],['FLEURS','Filipino','WER','10.34','18.05','8.33','7.42','N/A','11.48'],['FLEURS','Vietnamese','WER','6.32','15.19','4.70','3.23','2.79','4.95'],['FLEURS','Korean','CER','4.86','8.93','4.24','4.06','3.89','4.94'],['FLEURS','Malay','WER','8.14','17.13','4.22','4.21','N/A','8.79'],['FLEURS','Spanish','WER','5.31','8.09','2.62','2.13','2.06','1.23'],['FLEURS','Portuguese','WER','7.19','13.71','3.46','2.80','2.59','1.87'],['FLEURS','Macro average','—','6.30','13.40','4.59','3.95','—','4.94']
];
document.querySelector('#multilingual-table').innerHTML = makeTable(['Benchmark','Language','Metric','Seed-ASR','Tencent Cloud','Gemini 3.1 Pro','GPT-4o','Azure','Qwen-Audio-3.0-ASR'], multilingualRows);
document.querySelector('#hotword-table').innerHTML = makeTable(['Category','Tier','Doubao-ASR','Fun-ASR-Flash','Qwen-Audio-3.0-ASR'], hotwordRows, 'Recall (%) · without → with hotword conditioning');
document.querySelector('#context-table').innerHTML = makeTable(['Earlier context cue','Without long context','With long context'], contextExamples);

function renderExample(kind) {
  const panel = document.querySelector('#example-panel');
  if (kind === 'context') panel.innerHTML = `<div class="correction-grid">${contextExamples.map(([cue,before,after],i)=>`<article><span>${String(i+1).padStart(2,'0')} · Earlier cue</span><p>${cue}</p><div><s>${before}</s><b>→</b><strong>${after}</strong></div></article>`).join('')}</div>`;
  if (kind === 'hotword') panel.innerHTML = `<div class="example-lead"><div><p class="section-kicker">Hierarchical customization</p><h3>P0 for high-confidence terms. P1 for broader candidates.</h3><p>Across the supplied launch examples, Qwen-Audio-3.0-ASR reaches 99%+ recall on six P0 categories after hotword conditioning.</p></div><div class="table-scroll">${makeTable(['Category','Tier','Doubao-ASR','Fun-ASR-Flash','Qwen-Audio-3.0-ASR'],hotwordRows)}</div></div>`;
  if (kind === 'entity') panel.innerHTML = `<div class="example-lead"><div><p class="section-kicker">Launch examples</p><h3>Long-tail entities across practical domains.</h3><p>Shown values are entity recall (%) from the supplied promotional material.</p><img class="example-visual" src="assets/figures/entity-recall.png" alt="Industry entity recall comparison"></div><div class="table-scroll">${makeTable(['Domain','Doubao-ASR','Fun-ASR-Flash','Qwen-Audio-3.0-ASR'],industryRows)}</div></div>`;
  if (kind === 'polishing') panel.innerHTML = `<div class="polishing-redesign">
    <div class="polishing-intro"><p class="section-kicker">Native single-pass polishing</p><h3>Cleaner transcripts,<br>without a rewrite stage.</h3><p>Fillers, repetitions, explicit self-corrections, and formatting noise are handled inside the recognition pass.</p><div class="polish-score-grid"><div><span>Polishing off</span><b>2.53</b><small>Readability</small><b>3.51</b><small>Faithfulness</small></div><div class="metric-highlight"><span>Polishing on · Native</span><b>3.44</b><small>Readability</small><b>3.44</b><small>Faithfulness</small></div><div><span>Qwen3.6-Plus cascade</span><b>3.51</b><small>Readability</small><b>3.47</b><small>Faithfulness</small></div></div></div>
    <div class="polish-transformations">
      <article><span>01 · Filler removal</span><s>Um, and this means that, um, once, uh, it, it, it comes together with a voice recognition.</s><strong>And this means that once it comes together with a voice recognition.</strong></article>
      <article><span>02 · Repetition reduction</span><s>and uh not all the the the stuff you can do with it, but the the the essential stuff is there</s><strong>And not all the stuff you can do with it, but the essential stuff is there.</strong></article>
      <article><span>03 · Self-correction</span><s>I just to put it, just to put it in some comparison, some comparative context.</s><strong>Just to put it in some comparative context.</strong></article>
      <article><span>04 · Formatting</span><s>with chasing d-r-r share your daily plan as per your d-r-r with your team also</s><strong>With chasing DRR, share your daily plan as per your DRR with your team also.</strong></article>
    </div>
  </div>`;
}
document.querySelectorAll('[data-example-tab]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-example-tab]').forEach(item=>item.setAttribute('aria-selected',item===button?'true':'false'));renderExample(button.dataset.exampleTab);}));
renderExample('context');

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => { const open=navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded',open?'true':'false'); });
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
