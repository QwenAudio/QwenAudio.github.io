import * as THREE from './vendor/three.module.min.js';

// Sample locations match atlas.js. A language is not confined to one country:
// country highlights here identify the representative locations of the demos.
const LANGUAGES = [
  ['zh','中文','Chinese','中国','China','CHN',116.4074,39.9042],
  ['en','英语','English','英国','United Kingdom','GBR',-.1276,51.5072],
  ['ja','日语','Japanese','日本','Japan','JPN',139.6917,35.6895],
  ['ko','韩语','Korean','韩国','South Korea','KOR',126.978,37.5665],
  ['vi','越南语','Vietnamese','越南','Vietnam','VNM',105.8342,21.0278],
  ['th','泰语','Thai','泰国','Thailand','THA',100.5018,13.7563],
  ['id','印尼语','Indonesian','印度尼西亚','Indonesia','IDN',106.8456,-6.2088],
  ['ms','马来语','Malay','马来西亚','Malaysia','MYS',101.6869,3.139],
  ['tl','菲律宾语','Tagalog','菲律宾','Philippines','PHL',120.9842,14.5995],
  ['hi','印地语','Hindi','印度','India','IND',77.209,28.6139],
  ['ar','阿拉伯语','Arabic','沙特阿拉伯','Saudi Arabia','SAU',46.6753,24.7136],
  ['fr','法语','French','法国','France','FRA',2.3522,48.8566],
  ['de','德语','German','德国','Germany','DEU',13.405,52.52],
  ['es','西班牙语','Spanish','西班牙','Spain','ESP',-3.7038,40.4168],
  ['pt','葡萄牙语','Portuguese','葡萄牙','Portugal','PRT',-9.1393,38.7223],
  ['ru','俄语','Russian','俄罗斯','Russia','RUS',37.6173,55.7558],
  ['it','意大利语','Italian','意大利','Italy','ITA',12.4964,41.9028],
  ['nl','荷兰语','Dutch','荷兰','Netherlands','NLD',4.9041,52.3676],
  ['sv','瑞典语','Swedish','瑞典','Sweden','SWE',18.0686,59.3293],
  ['da','丹麦语','Danish','丹麦','Denmark','DNK',12.5683,55.6761],
  ['fi','芬兰语','Finnish','芬兰','Finland','FIN',24.9384,60.1699],
  ['no','挪威语','Norwegian','挪威','Norway','NOR',10.7522,59.9139],
  ['el','希腊语','Greek','希腊','Greece','GRC',23.7275,37.9838],
  ['pl','波兰语','Polish','波兰','Poland','POL',21.0122,52.2297],
  ['cs','捷克语','Czech','捷克','Czechia','CZE',14.4378,50.0755],
  ['hu','匈牙利语','Hungarian','匈牙利','Hungary','HUN',19.0402,47.4979],
  ['ro','罗马尼亚语','Romanian','罗马尼亚','Romania','ROU',26.1025,44.4268],
  ['bg','保加利亚语','Bulgarian','保加利亚','Bulgaria','BGR',23.3219,42.6977],
  ['hr','克罗地亚语','Croatian','克罗地亚','Croatia','HRV',15.9819,45.815],
  ['sk','斯洛伐克语','Slovak','斯洛伐克','Slovakia','SVK',17.1077,48.1486]
].map(([code,zh,en,countryZh,countryEn,iso,lon,lat])=>({code,zh,en,countryZh,countryEn,iso,lon,lat}));
const DIALECTS = [
  ['四川','Sichuan','成都','Chengdu',104.0668,30.5728,'四川省'],
  ['山西','Shanxi','太原','Taiyuan',112.5489,37.8706,'山西省'],
  ['河南','Henan','洛阳','Luoyang',112.454,34.6197,'河南省'],
  ['济南','Jinan','济南','Jinan',117.1201,36.6512,'山东省'],
  ['粤语','Cantonese','广州','Guangzhou',113.2644,23.1291,'广东省'],
  ['陕西','Shaanxi','西安','Xi’an',108.9398,34.3416,'陕西省'],
  ['青岛','Qingdao','青岛','Qingdao',120.3826,36.0671,'山东省'],
  ['上海','Shanghainese','上海','Shanghai',121.4737,31.2304,'上海市'],
  ['南昌','Nanchang','南昌','Nanchang',115.8579,28.682,'江西省'],
  ['宁波','Ningbo','宁波','Ningbo',121.544,29.8683,'浙江省'],
  ['客家','Hakka','梅州','Meizhou',116.1226,24.2886,'广东省'],
  ['杭州','Hangzhou','杭州','Hangzhou',120.1551,30.2741,'浙江省'],
  ['温州','Wenzhounese','温州','Wenzhou',120.6994,27.9939,'浙江省'],
  ['湖南','Hunan','长沙','Changsha',112.9388,28.2282,'湖南省'],
  ['福建','Fujian','福州','Fuzhou',119.2965,26.0745,'福建省'],
  ['苏州','Suzhou','苏州','Suzhou',120.5853,31.2989,'江苏省']
].map(([zh,en,cityZh,cityEn,lon,lat,province],index)=>({zh,en,cityZh,cityEn,lon,lat,province,index}));
const NS = 'http://www.w3.org/2000/svg';
const isZh = ()=>document.documentElement.lang.startsWith('zh');
const tr = (zh,en)=>isZh()?zh:en;
const el = (tag,cls,parent)=>{const n=document.createElement(tag);n.className=cls;if(parent)parent.append(n);return n;};
const svgEl = (tag,attrs,parent)=>{const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(parent)parent.append(n);return n;};
const spherical = (lon,lat,r=1)=>new THREE.Vector3(Math.cos(lon*Math.PI/180)*Math.cos(lat*Math.PI/180)*r,Math.sin(lat*Math.PI/180)*r,-Math.sin(lon*Math.PI/180)*Math.cos(lat*Math.PI/180)*r);

export async function createGeography(mount,onSelect) {
  mount.classList.add('hero-geography');
  const d3=window.d3;
  if(!d3)throw new Error('Geography requires the existing local D3 dependency.');
  // Fetch private copies so the original atlas's winding normalization is untouched.
  const [world,china]=await Promise.all(['world-countries','china-provinces'].map(name=>fetch(new URL(`./assets/maps/${name}.geojson`,import.meta.url)).then(r=>{if(!r.ok)throw new Error(`Map unavailable: ${name}`);return r.json();})));
  china.features.forEach(feature=>{if(!feature.geometry)return;const p=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;p.forEach(poly=>poly.forEach(ring=>ring.reverse()));});
  const worldWrap=el('div','geo-world',mount), chinaWrap=el('div','geo-china',mount);
  const screenGlow=el('div','geo-orb-aura',worldWrap);
  const canvas=el('canvas','geo-world-canvas',worldWrap);
  canvas.setAttribute('aria-label','Interactive globe: representative countries for 30 supported language samples');
  const labelLayer=el('div','geo-world-labels',worldWrap);
  const languageCallout=el('button','geo-main-callout geo-language-callout',worldWrap);
  languageCallout.type='button';
  const details=el('details','geo-language-menu',worldWrap);
  details.addEventListener('toggle',()=>mount.dispatchEvent(new CustomEvent('geography-menu-toggle',{bubbles:true,detail:{open:details.open}})));
  const summary=el('summary','',details), languageGrid=el('div','geo-language-grid',details);
  const languageButtons=LANGUAGES.map(item=>{const b=el('button','',languageGrid);b.type='button';b.addEventListener('click',()=>onSelect({kind:'languages',code:item.code}));return b;});
  const note=el('p','geo-map-note',worldWrap);
  const markerButtons=LANGUAGES.map(item=>{
    const b=el('button','geo-world-marker',labelLayer);b.type='button';b.dataset.code=item.code;
    b.innerHTML='<i></i><span></span>';b.addEventListener('click',()=>onSelect({kind:'languages',code:item.code}));return b;
  });

  const chinaSurface=el('div','geo-china-surface',chinaWrap);
  const chinaSvg=svgEl('svg',{viewBox:'0 0 1000 620','aria-label':'16 dialect sample locations on real China provincial boundaries',role:'group'},chinaSurface);
  const defs=svgEl('defs',{},chinaSvg);
  const grad=svgEl('linearGradient',{id:'heroChinaActive',x1:'0',y1:'0',x2:'1',y2:'1'},defs);
  svgEl('stop',{offset:'0%','stop-color':'#b1a1ff'},grad);svgEl('stop',{offset:'100%','stop-color':'#7755ee'},grad);
  // Keep northern/mainland geography large; all southern offshore features are
  // retained at their true coordinates in a conventional, labelled inset below.
  const mainlandExtent={type:'MultiPoint',coordinates:[[73.502355,18.0],[135.09567,53.563269]]};
  const chinaProjection=d3.geoMercator().fitExtent([[20,8],[980,606]],mainlandExtent);
  const chinaPath=d3.geoPath(chinaProjection);
  const mainClip=svgEl('clipPath',{id:'heroChinaMainClip'},defs);svgEl('rect',{x:0,y:0,width:1000,height:616},mainClip);
  const base=svgEl('g',{class:'geo-china-depth',transform:'translate(0 10)','clip-path':'url(#heroChinaMainClip)'},chinaSvg);
  const surface=svgEl('g',{class:'geo-china-regions','clip-path':'url(#heroChinaMainClip)'},chinaSvg);
  const provinceNodes=[];
  china.features.forEach(feature=>{
    const d=chinaPath(feature);if(!d)return;
    svgEl('path',{d},base);
    const supported=DIALECTS.find(x=>x.province===feature.properties.name);
    const p=svgEl('path',{d,class:supported?'supported':'','data-province':feature.properties.name||''},surface);
    provinceNodes.push({node:p,name:feature.properties.name});
    if(supported){p.setAttribute('tabindex','0');p.setAttribute('role','button');p.setAttribute('aria-label',feature.properties.name+' dialect samples');p.addEventListener('click',()=>onSelect({kind:'dialects',index:supported.index}));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect({kind:'dialects',index:supported.index});}});}
  });
  const markers=svgEl('g',{class:'geo-china-markers'},chinaSvg);
  const dialectNodes=DIALECTS.map(item=>{
    const [x,y]=chinaProjection([item.lon,item.lat]);
    const g=svgEl('g',{class:'geo-dialect-pin',transform:`translate(${x} ${y})`,tabindex:0,role:'button','aria-label':`${item.zh} · ${item.cityZh}`},markers);
    svgEl('circle',{class:'geo-pin-halo',r:18},g);svgEl('circle',{class:'geo-pin-dot',r:6},g);
    g.addEventListener('click',()=>onSelect({kind:'dialects',index:item.index}));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect({kind:'dialects',index:item.index});}});
    return {node:g,x,y};
  });
  const calloutLine=svgEl('path',{class:'geo-city-leader',fill:'none'},chinaSvg);
  const cityText=svgEl('text',{class:'geo-city-label'},chinaSvg);
  const inset=svgEl('g',{class:'geo-south-sea-inset',transform:'translate(818 411)'},chinaSvg);
  svgEl('rect',{x:0,y:0,width:158,height:194,rx:5,class:'geo-inset-frame'},inset);
  const insetClip=svgEl('clipPath',{id:'heroChinaInsetClip'},defs);svgEl('rect',{x:7,y:7,width:144,height:156},insetClip);
  const insetRegions=svgEl('g',{'clip-path':'url(#heroChinaInsetClip)'},inset);
  const insetProjection=d3.geoMercator().fitExtent([[7,7],[151,163]],{type:'MultiPoint',coordinates:[[105,2.5],[125,24.8]]});
  const insetPath=d3.geoPath(insetProjection);
  china.features.forEach(feature=>svgEl('path',{d:insetPath(feature),class:'geo-inset-region'},insetRegions));
  const insetLabel=svgEl('text',{x:79,y:181,'text-anchor':'middle',class:'geo-inset-label'},inset);
  const dialectCallout=el('button','geo-main-callout geo-dialect-callout',chinaWrap);dialectCallout.type='button';
  const dialectIndex=el('div','geo-dialect-index',chinaWrap);
  const dialectButtons=DIALECTS.map(item=>{const b=el('button','',dialectIndex);b.type='button';b.addEventListener('click',()=>onSelect({kind:'dialects',index:item.index}));return b;});

  let activeLanguage=LANGUAGES[0],activeDialect=DIALECTS[0],locale='',lastLanguage='',lastDialect='',width=1,height=1,disposed=false,renderer,scene,camera,globe,mesh,globeTexture,fallback;
  languageCallout.addEventListener('click',()=>onSelect({kind:'languages',code:activeLanguage.code}));
  dialectCallout.addEventListener('click',()=>onSelect({kind:'dialects',index:activeDialect.index}));
  try {
    renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(38,1,.1,60);camera.position.set(0,0,7.8);
    const textureCanvas=document.createElement('canvas');textureCanvas.width=2048;textureCanvas.height=1024;
    const ctx=textureCanvas.getContext('2d');ctx.fillStyle='#e9e2ff';ctx.fillRect(0,0,2048,1024);
    const projection=d3.geoEquirectangular().scale(2048/(2*Math.PI)).translate([1024,512]);const path=d3.geoPath(projection,ctx);
    const supported=new Set(LANGUAGES.map(x=>x.iso));
    world.features.forEach(feature=>{ctx.beginPath();path(feature);ctx.fillStyle=supported.has(feature.properties.ADM0_A3)?'#8060e5':'#c8bde9';ctx.fill();ctx.strokeStyle='#f5f1ff';ctx.lineWidth=1.1;ctx.stroke();});
    ctx.beginPath();path(d3.geoGraticule().step([15,15])());ctx.strokeStyle='rgba(118,89,183,.22)';ctx.lineWidth=.7;ctx.stroke();
    globeTexture=new THREE.CanvasTexture(textureCanvas);globeTexture.colorSpace=THREE.SRGBColorSpace;globeTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    globe=new THREE.Group();scene.add(globe);
    mesh=new THREE.Mesh(new THREE.SphereGeometry(2.18,96,64),new THREE.MeshPhysicalMaterial({map:globeTexture,roughness:.65,metalness:.03,clearcoat:.18,clearcoatRoughness:.36}));globe.add(mesh);
    const rim=new THREE.Mesh(new THREE.SphereGeometry(2.215,64,40),new THREE.MeshBasicMaterial({color:0x9d7df7,transparent:true,opacity:.16,side:THREE.BackSide}));globe.add(rim);
    scene.add(new THREE.AmbientLight(0xe7dbff,2.0));const light=new THREE.DirectionalLight(0xffffff,3.2);light.position.set(-3,5,6);scene.add(light);
    const violetLight=new THREE.DirectionalLight(0x9369ff,1.2);violetLight.position.set(4,-2,3);scene.add(violetLight);
    const orbitMaterial=new THREE.LineBasicMaterial({color:0x9c82e4,transparent:true,opacity:.38});
    [0,1].forEach(i=>{const points=[];for(let j=0;j<=180;j++){const a=j/180*Math.PI*2;points.push(new THREE.Vector3(Math.cos(a)*2.6,Math.sin(a)*2.6,0));}const ring=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),orbitMaterial);ring.rotation.set(i?1.1:.15,.55,i?.6:-.2);scene.add(ring);});
    const raycaster=new THREE.Raycaster();canvas.addEventListener('click',event=>{const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1),camera);const hit=raycaster.intersectObject(mesh)[0];if(!hit)return;const local=globe.worldToLocal(hit.point.clone()).normalize();const point=[Math.atan2(-local.z,local.x)*180/Math.PI,Math.asin(local.y)*180/Math.PI];const feature=world.features.find(f=>d3.geoContains(f,point));const language=feature&&LANGUAGES.find(x=>x.iso===feature.properties.ADM0_A3);if(language)onSelect({kind:'languages',code:language.code});});
  } catch(error) {
    canvas.hidden=true;screenGlow.hidden=true;labelLayer.hidden=true;
    fallback=svgEl('svg',{viewBox:'0 0 1000 580',class:'geo-world-fallback','aria-label':'World map of representative supported-language countries'},worldWrap);
    const projection=d3.geoNaturalEarth1().fitExtent([[12,20],[988,540]],world),path=d3.geoPath(projection);
    world.features.forEach(feature=>{const language=LANGUAGES.find(x=>x.iso===feature.properties.ADM0_A3);const p=svgEl('path',{d:path(feature),class:language?'supported':''},fallback);if(language){p.setAttribute('tabindex','0');p.setAttribute('role','button');p.setAttribute('aria-label',language.en);p.addEventListener('click',()=>onSelect({kind:'languages',code:language.code}));p.addEventListener('keydown',e=>{if(e.key==='Enter')onSelect({kind:'languages',code:language.code});});}});
  }

  function localize(){
    const next=document.documentElement.lang;if(next===locale)return;locale=next;
    summary.textContent=tr('30 种语言 · 选择试听 ↗','30 languages · choose a sample ↗');
    note.textContent=tr('点亮的是语言样例代表国家，并非该语言的全部使用范围。','Highlights indicate sample countries, not the full regions where each language is spoken.');
    LANGUAGES.forEach((item,i)=>{languageButtons[i].textContent=tr(item.zh,item.en);languageButtons[i].title=tr(item.countryZh,item.countryEn);markerButtons[i].querySelector('span').textContent=tr(item.zh,item.en);markerButtons[i].setAttribute('aria-label',`${tr(item.zh,item.en)} · ${tr(item.countryZh,item.countryEn)}`);markerButtons[i].title=markerButtons[i].getAttribute('aria-label');});
    DIALECTS.forEach((item,i)=>{dialectButtons[i].textContent=tr(item.zh,item.en);dialectButtons[i].title=tr(item.cityZh,item.cityEn);});
    insetLabel.textContent=tr('南海诸岛','South China Sea');
  }
  let lastFrame=null;
  function resize(){const r=mount.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);if(renderer){renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=width/height<1?9.4:7.8;camera.updateProjectionMatrix();}if(lastFrame)render(lastFrame.mode,lastFrame.seconds,{reduced:lastFrame.reduced});}
  const observer=new ResizeObserver(resize);observer.observe(mount);resize();localize();
  const axis=new THREE.Vector3();
  function render(mode,seconds,{reduced=false}={}) {
    if(disposed)return;lastFrame={mode,seconds,reduced};localize();const languageMode=mode==='languages';worldWrap.hidden=!languageMode;chinaWrap.hidden=languageMode;
    if(languageMode){
      const t=reduced?1.5:seconds;const longitude=112-12*Math.min(t,9);const latitude=22+4*Math.sin(t*.2);
      const featured=['zh','ja','hi','ar','ru','fr','en','de','es'][Math.min(8,Math.floor(t))];activeLanguage=LANGUAGES.find(x=>x.code===featured)||LANGUAGES[0];
      if(lastLanguage!==`${locale}:${activeLanguage.code}`){lastLanguage=`${locale}:${activeLanguage.code}`;languageCallout.innerHTML=`<small>${tr(activeLanguage.countryZh,activeLanguage.countryEn)}</small><strong>${tr(activeLanguage.zh,activeLanguage.en)}</strong><span>${tr('点击试听','Listen to this language')} ↗</span>`;}
      if(renderer){
        globe.rotation.set(latitude*Math.PI/180,-(longitude+90)*Math.PI/180,0);globe.updateMatrixWorld(true);
        const captionCandidates=[];
        LANGUAGES.forEach((item,i)=>{
          axis.copy(spherical(item.lon,item.lat,2.22)).applyMatrix4(globe.matrixWorld);
          const front=axis.z>4.93/camera.position.z;const projected=axis.clone().project(camera);const b=markerButtons[i];b.hidden=!front;
          const x=(projected.x*.5+.5)*width,y=(-projected.y*.5+.5)*height;
          b.style.left=`${x}px`;b.style.top=`${y}px`;
          b.classList.toggle('is-featured',item.code===activeLanguage.code);b.classList.remove('is-captioned');
          b.style.setProperty('--pin-scale',String(.8+.2*Math.max(0,axis.z/2.2)));
          if(front){const label=tr(item.zh,item.en);const labelWidth=18+[...label].reduce((sum,char)=>sum+(char.charCodeAt(0)>255?14:8.5),0);captionCandidates.push({item,b,x:x+13,y:y-8,w:labelWidth,h:29});}
        });
        // Prioritize the active language, then spatially separated context.
        // Every real-coordinate pin stays visible/clickable even when its label
        // is suppressed, so dense European/East Asian clusters stay legible.
        const priority=[activeLanguage.code,'hi','ar','zh','ja','ru','es','en','id','sv'];
        captionCandidates.sort((a,b)=>{const rank=code=>{const n=priority.indexOf(code);return n<0?99:n;};return rank(a.item.code)-rank(b.item.code);});
        const placed=[];
        for(const c of captionCandidates){
          if(placed.length>=4)break;
          if(c.x+c.w>width-10||c.y<5||c.y+c.h>height-45)continue;
          if(placed.some(p=>c.x<p.x+p.w+14&&c.x+c.w+14>p.x&&c.y<p.y+p.h+12&&c.y+c.h+12>p.y))continue;
          c.b.classList.add('is-captioned');placed.push(c);
        }
        renderer.render(scene,camera);
      }
    } else {
      const index=reduced?0:Math.floor(Math.max(0,seconds)*1.8)%DIALECTS.length;activeDialect=DIALECTS[index];
      if(lastDialect!==`${locale}:${index}`){lastDialect=`${locale}:${index}`;dialectCallout.innerHTML=`<small>${tr(activeDialect.cityZh,activeDialect.cityEn)}</small><strong>${tr(activeDialect.zh,activeDialect.en)}${isZh()&&![4,10].includes(index)?'方言':''}</strong><span>${tr('听原音 · 看原文','Original audio · source text')} ↗</span>`;}
      dialectNodes.forEach((item,i)=>{item.node.classList.toggle('is-active',i===index);item.node.querySelector('.geo-pin-halo').setAttribute('r',i===index?20+5*Math.sin(seconds*4):12);});
      dialectButtons.forEach((b,i)=>b.classList.toggle('is-active',i===index));provinceNodes.forEach(item=>item.node.classList.toggle('is-active',item.name===activeDialect.province));
      const {x,y}=dialectNodes[index];const right=x>720;const labelX=right?Math.min(962,x+64):x-62,labelY=y-38;
      calloutLine.setAttribute('d',`M${x},${y} L${x+(right?24:-24)},${labelY} H${labelX}`);
      cityText.setAttribute('x',labelX);cityText.setAttribute('y',labelY-9);cityText.setAttribute('text-anchor',right?'end':'start');cityText.textContent=tr(activeDialect.cityZh,activeDialect.cityEn);
      chinaSurface.style.transform=reduced?'none':`perspective(1200px) rotateX(${8+Math.sin(seconds*.45)*2}deg) rotateZ(${-2+Math.sin(seconds*.35)*.8}deg)`;
    }
  }
  function dispose(){disposed=true;observer.disconnect();if(scene)scene.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});globeTexture?.dispose();renderer?.dispose();mount.replaceChildren();}
  return {render,resize,dispose};
}
