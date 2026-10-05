import * as THREE from './vendor/three.module.min.js';

// Exact supplied Qwen logo vertices and the previous preview's beveled sculpture.
const OUTLINE = [[7,110],[31,70],[72,68],[107,9],[155,7],[174,36],[253,39],[275,74],[257,111],[293,167],[293,176],[273,208],[233,212],[197,271],[151,273],[143,269],[127,241],[53,241],[46,236],[27,203],[44,171]];
const HOLE = [[282,168],[246,112],[263,79],[114,79],[131,48],[115,18],[76,79],[39,79],[113,200],[74,202],[57,231],[132,231],[151,261],[226,140],[247,171]];
const CORE = [[106,116],[196,115],[151,190]];
function geometry(points, hole) {
  const path = (vertices, Type) => {
    const shape = new Type();
    vertices.forEach(([x,y],i) => shape[i?'lineTo':'moveTo']((x-150)/54,(140-y)/54));
    shape.closePath(); return shape;
  };
  const shape=path(points,THREE.Shape);
  if(hole)shape.holes.push(path(hole,THREE.Path));
  const result=new THREE.ExtrudeGeometry(shape,{depth:.42,bevelEnabled:true,bevelSegments:6,steps:1,bevelSize:.068,bevelThickness:.075,curveSegments:1});
  result.translate(0,0,-.21);return result;
}
function environment(renderer){
  const studio=new THREE.Scene();studio.background=new THREE.Color('#393042');
  const panel=(x,y,z,w,h,color,power=5,rx=0,ry=0)=>{
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));
    mesh.material.color.multiplyScalar(power);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,0);studio.add(mesh);
  };
  panel(-5,3,3,3,11,'#ffffff',6,0,.7);panel(5,1,0,2,12,'#d4beff',5,0,-1.2);
  panel(0,7,0,12,5,'#ffffff',5,-Math.PI/2);panel(-2.9,1.3,7,3.8,9,'#ffffff',6,0,-.1);
  panel(3.1,-.4,6,.75,8,'#e6d9ff',4.5,0,.15);panel(0,-4,5,9,1,'#9671eb',3);panel(0,0,-7,7,7,'#130723',.8);
  const generator=new THREE.PMREMGenerator(renderer),target=generator.fromScene(studio,.04);
  generator.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});return target;
}
export function createLogo(mount){
  let renderer,env,scene,camera,sculpture,lost=false,disposed=false,lastTime=0,lastReduced=false;
  const geometries=[],materials=[];
  function render(time=lastTime,{reduced=lastReduced}={}){
    lastTime=time;lastReduced=reduced;if(!renderer||lost||disposed)return;
    const phase=reduced?0:time;
    sculpture.rotation.set(.13+Math.sin(phase*.4)*.055,-.22+phase*Math.PI/8,-.055);
    renderer.render(scene,camera);
  }
  function resize(){
    if(!renderer||disposed)return;
    const {width,height}=mount.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render();
  }
  function dispose(){
    if(disposed)return;disposed=true;
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());env?.dispose();renderer?.dispose();renderer?.domElement.remove();
    mount.classList.remove('has-webgl');
  }
  try{
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    renderer.domElement.setAttribute('aria-hidden','true');
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(37,1,.1,50);camera.position.set(0,0,10.2);
    env=environment(renderer);scene.environment=env.texture;scene.add(new THREE.AmbientLight('#d2baff',.7));
    const key=new THREE.DirectionalLight('#ffffff',4),rim=new THREE.DirectionalLight('#c4a1ff',3.5);
    key.position.set(-4,6,6);rim.position.set(6,-2,-4);scene.add(key,rim);
    materials.push(
      new THREE.MeshPhysicalMaterial({color:'#f0eafb',metalness:.78,roughness:.12,clearcoat:1,clearcoatRoughness:.07,envMapIntensity:1.6}),
      new THREE.MeshPhysicalMaterial({color:'#7952c0',metalness:.94,roughness:.16,clearcoat:1,envMapIntensity:1.7}),
      new THREE.MeshPhysicalMaterial({color:'#9c78f0',metalness:.88,roughness:.18,clearcoat:1,envMapIntensity:1.35})
    );
    geometries.push(geometry(OUTLINE,HOLE),geometry(CORE));sculpture=new THREE.Group();
    sculpture.add(new THREE.Mesh(geometries[0],[materials[0],materials[1]]),new THREE.Mesh(geometries[1],[materials[2],materials[1]]));scene.add(sculpture);
    mount.append(renderer.domElement);resize();mount.classList.add('has-webgl');
    renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;mount.classList.remove('has-webgl');});
    renderer.domElement.addEventListener('webglcontextrestored',()=>{
      if(disposed)return;
      try{env?.dispose();env=environment(renderer);scene.environment=env.texture;lost=false;resize();mount.classList.add('has-webgl');}
      catch(error){lost=true;mount.classList.remove('has-webgl');console.warn('Qwen logo stays in SVG fallback:',error);}
    });
  }catch(error){dispose();console.warn('Qwen logo uses SVG fallback:',error);}
  return {render,resize,dispose};
}
