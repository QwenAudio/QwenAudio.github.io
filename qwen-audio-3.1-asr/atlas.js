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

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => { const open=navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded',open?'true':'false'); });
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
