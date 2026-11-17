(function(){
"use strict";
const $=id=>document.getElementById(id);
if(!window.THREE||typeof DADOS==='undefined'){document.body.innerHTML='<p style="padding:20px;font-size:18px;color:#fff">Não consegui carregar o motor 3D ou os dados. Verifique a internet e abra de novo.</p>';return;}

// =================== FÓRMULAS (00-sistema / núcleo v8) ===================
const ATR=['FOR','DES','VIG','POT','CON','PER'];
const ATR_NOME={FOR:'Força',DES:'Destreza',VIG:'Vigor',POT:'Potência',CON:'Controle',PER:'Percepção'};
const rr=x=>x/(x+40);
const Ccusto=x=>x+x*x/40;
const XPnec=L=>Math.round(100*Math.pow(L,1.6));
const PHtot=L=>4+(L-1);
const PONTOS=L=>20+3*(L-1);
const CUSTO_PH={'Técnica':2,'Reação':2,'Passiva':1,'Transformação':2,'Nó-chave':3};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
const rr2=()=>Math.random();
const dist2=(a,b)=>{const dx=a.x-b.x,dz=a.z-b.z;return dx*dx+dz*dz;};
const angTo=(a,b)=>Math.atan2(b.x-a.x,b.z-a.z);
const angDiff=(a,b)=>{let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return d;};
const fmt=(v,d=0)=>Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});

// armas (núcleo K.2): alcance, leve K/tempo, pesado K/tempo, impacto leve/pesado, bloqueio (eficiência), golpes do leve
const ARMAS={
 desarmado:{alc:1.4,lK:.45,lT:.45,pK:1.10,pT:.95,lI:8,pI:22,bloq:.8,h:1,mec:'Fluxo'},
 espada_curta:{alc:1.8,lK:.55,lT:.55,pK:1.25,pT:1.00,lI:9,pI:22,bloq:1,h:1,mec:'Flanco'},
 espada_longa:{alc:2.3,lK:.62,lT:.68,pK:1.45,pT:1.20,lI:10,pI:26,bloq:1,h:1,mec:'Guarda'},
 duas_espadas:{alc:2.0,lK:.40,lT:.70,pK:1.30,pT:1.10,lI:6,pI:22,bloq:0,h:2,mec:'Ritmo'},
 espada_e_escudo:{alc:2.0,lK:.58,lT:.65,pK:1.35,pT:1.15,lI:10,pI:24,bloq:1.33,h:1,mec:'Muralha',arc180:1},
 katana:{alc:2.4,lK:.65,lT:.62,pK:1.50,pT:1.10,lI:9,pI:24,bloq:0,h:1,mec:'Bainha'},
 duas_katanas:{alc:2.2,lK:.42,lT:.72,pK:1.35,pT:1.15,lI:6,pI:22,bloq:0,h:2,mec:'Fio duplo'},
 machado_grande:{alc:2.6,lK:.85,lT:1.00,pK:1.90,pT:1.70,lI:15,pI:40,bloq:1.3,h:1,mec:'Carga'},
 machado_pequeno:{alc:1.7,lK:.58,lT:.60,pK:1.25,pT:1.05,lI:10,pI:24,bloq:1,h:1,mec:'Marca'},
 dois_machados:{alc:1.8,lK:.38,lT:.66,pK:1.25,pT:1.05,lI:6,pI:24,bloq:0,h:2,mec:'Frenesi'},
 arco:{alc:30,lK:.55,lT:.70,pK:1.50,pT:1.20,lI:6,pI:12,bloq:0,h:1,mec:'Tensão',dist:1}
};
const OPOSTO={fogo:'gelo',gelo:'fogo',raio:'terra',terra:'raio',vento:'agua',agua:'vento'};
const COR_EL={fogo:0xff7a2a,gelo:0x7fd3ff,raio:0xfff06a,terra:0xb08850,vento:0xbfffd0,agua:0x3f8cff};
const CSS_EL={fogo:'#ff9a4a',gelo:'#9fe3ff',raio:'#fff06a',terra:'#d0a870',vento:'#bfffd0',agua:'#6fa8ff'};
const NOME_EL={fogo:'Fogo',gelo:'Gelo',raio:'Raio',terra:'Terra',vento:'Vento',agua:'Água'};
const ORDEM_EL=['fogo','gelo','raio','terra','vento','agua'];

const ARV={};const TODAS=[...DADOS.armas,...DADOS.elems,...DADOS.discs];
TODAS.forEach(a=>{ARV[a.id]=a;a.porN={};a.nos.forEach(n=>{a.porN[n.n]=n;n.arv=a.id;n.key=a.id+':'+n.n;});});
const ESP={};DADOS.esp.forEach(e=>ESP[e.id]=e);
const LIG={};DADOS.lig.forEach(l=>LIG[l.id]=l);
function noDe(key){const [a,n]=key.split(':');return ARV[a]&&ARV[a].porN[+n];}

// o que está simulado (honestidade)
const ESP_SIM=new Set(['golpe_assentado','estilhacar','pes_leves','corrente_continua','vendaval_de_laminas','muro_de_carne','divida_parcelada','segundo_folego','reator_estavel','descarga_total','coracao_de_fornalha','mao_firme','tecelao','olho_de_cacador','leitura_dupla','abertura_conservada','martelo_de_guarda','geometria_fina']);
const LIG_SIM=new Set(['passagem_de_forca','contraforte','nucleo_de_impacto','ariete_geometrico','retirada_disciplinada','descarga_itinerante','nucleo_protegido','conjuracao_assentada','guarda_informada','lente_instavel','disparo_calculado','condicao_breve','conducao_breve']);
const ARTE_SIM=new Set([1,2,6,8,9,10,12,13,14,15,16,21]);
function nivelSim(no){
  if(no.t)return {txt:'Jogável (técnica genérica)',c:'ok'};
  if(no.m&&Object.keys(no.m).length)return {txt:'Parcial: muda custo/recarga/K/impacto da técnica ligada',c:'ok'};
  return {txt:'Ainda só descrição (regra não simulada)',c:'suave'};
}

// =================== PERSONAGEM ===================
const PADRAO=()=>({nivel:1,xp:0,attrs:{FOR:0,DES:0,VIG:0,POT:0,CON:0,PER:0},arma:'espada_longa',elems:['fogo'],
  comprados:{},esp:{},lig:{},dom:{},prep:{tec:[null,null,null,null,null,null,null,null],reac:null,pas:[null,null,null,null,null,null],chave:[null,null],transf:[null,null,null]},
  formas:{},abertura:'Punir',modDef:'Normal',artes:{},arte:null,leitor:{},teste:{xp:5,dom:30,revelar:false},abates:0,guarda:'baixa'});
let P;
try{P=JSON.parse(localStorage.getItem('mmorpg_proto_v2')||'null');}catch(e){P=null;}
if(!P||!P.prep){P=PADRAO();}
function salvar(){try{localStorage.setItem('mmorpg_proto_v2',JSON.stringify(P));}catch(e){}}
const r=a=>rr(P.attrs[a]||0);
function camada(){return Math.max(1,Math.ceil(P.nivel/10));}
function S(){return Math.pow(1.09,camada()-1);}
function pontosGastos(){return ATR.reduce((s,a)=>s+Ccusto(P.attrs[a]),0);}
function phGastos(){let s=0;for(const k in P.comprados){const n=noDe(k);if(n)s+=CUSTO_PH[n.tipo];}s+=Object.keys(P.esp).length*2+Object.keys(P.lig).length*2;return s;}
function maxElems(){return P.nivel>=60?3:P.nivel>=30?2:1;}
function stats(){const s=S();
  return {vidaMax:1000*s*(1+0.9*r('VIG')),resMax:100*(1+0.6*r('VIG')),eneMax:100*(1+0.6*r('POT')),regenE:4*(1+r('CON')),
    posMax:100*(1+0.8*r('VIG')+0.4*r('FOR')),regenPos:10*(1+0.4*r('VIG')),reserva:600*(1+0.8*r('VIG'))*s,
    vel:5.5*(1+0.10*r('DES')+0.06*r('FOR')),H:1+0.35*r('DES'),Hc:1+0.25*r('CON'),crit:0.05,critD:1.30,
    estab:Math.min(0.6,0.5*r('CON')+(espAtiva('mao_firme')?0.5:0)),ten:12*r('VIG'),parry:Math.min(0.24,0.14+0.06*r('PER')+(P.arma==='espada_longa'&&P.guarda==='baixa'?0.02:0)),
    Parma:110*s,carga:12+0.3*Math.min(20,P.attrs.FOR),vazao:1+0.2*r('POT')};}
function espAtiva(id){return P.prep.pas.includes('esp:'+id);}
function ligAtiva(id){return P.prep.pas.includes('lig:'+id);}
function pasAtiva(key){return P.prep.pas.includes(key);}

// potência dos elementos (07)
function potEl(el){const tot=P.elems.reduce((s,e)=>s+phNaArvore(e),0);if(!P.elems.includes(el))return 0;if(tot<=0)return el===P.elems[0]?1:0.6;
  if(P.elems.length===1)return 1;return 0.60+0.40*phNaArvore(el)/tot;}
function phNaArvore(id){let s=0;for(const k in P.comprados){if(k.startsWith(id+':')){const n=noDe(k);if(n)s+=CUSTO_PH[n.tipo];}}return s;}
function temTronco(id){for(let i=1;i<=6;i++)if(!P.comprados[id+':'+i])return false;return true;}
function parKey(a,b){const ia=ORDEM_EL.indexOf(a),ib=ORDEM_EL.indexOf(b);return ia<ib?[a,b]:[b,a];}
function formasDisp(a,b){const [A,B]=parKey(a,b);const pa=phNaArvore(A),pb=phNaArvore(B);const p=pa+pb>0?pa/(pa+pb):0.5;return {p,A,B,dom:p>=0.70,eq:true,bdom:p<=0.30};}

// =================== CENA ===================
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
const scene=new THREE.Scene();scene.background=new THREE.Color(0x8fb6d8);scene.fog=new THREE.Fog(0x8fb6d8,30,75);
const camera=new THREE.PerspectiveCamera(55,1,0.1,200);const CAM_OFF=new THREE.Vector3(0,12,10);
scene.add(new THREE.HemisphereLight(0xdfefff,0x3a5a2a,0.85));
const sol=new THREE.DirectionalLight(0xfff2d6,0.75);sol.position.set(20,40,10);scene.add(sol);
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
addEventListener('resize',resize);resize();
const M=(c,o={})=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
const MAPA=60;
const chao=new THREE.Mesh(new THREE.PlaneGeometry(MAPA*2,MAPA*2),M(0x5f8f45));chao.rotation.x=-Math.PI/2;scene.add(chao);
function faixa(x,z,w,h,cor){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),M(cor));m.rotation.x=-Math.PI/2;m.position.set(x,0.01,z);scene.add(m);}
faixa(0,10,5,90,0xb59a6a);faixa(-22,30,40,4,0xb59a6a);faixa(22,30,40,4,0xb59a6a);faixa(14,44,24,10,0x9c8a68);
const arena=new THREE.Mesh(new THREE.CircleGeometry(16,40),M(0x8a7d6b));arena.rotation.x=-Math.PI/2;arena.position.set(0,0.02,-38);scene.add(arena);
const ARENA={x:0,z:-38,r:16};const solidos=[];
for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const x=Math.sin(a)*17,z=-38+Math.cos(a)*17;if(Math.abs(x)<3&&z>-38)continue;
  const p=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1,6,8),M(0x9c9488));p.position.set(x,3,z);scene.add(p);solidos.push({x,z,r:1});}
const SANT={x:0,z:48};
const cristal=new THREE.Mesh(new THREE.OctahedronGeometry(1.1),new THREE.MeshLambertMaterial({color:0x6fd4ff,emissive:0x2277aa}));cristal.position.set(SANT.x,2.2,SANT.z);scene.add(cristal);
const base=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.8,0.4,16),M(0xc9c3b6));base.position.set(SANT.x,0.2,SANT.z);scene.add(base);
function arvore3d(x,z){const g=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.35,1.6,6),M(0x6b4a2b));t.position.y=0.8;
  const c=new THREE.Mesh(new THREE.ConeGeometry(1.4,3,7),M(0x2f6b34));c.position.y=2.9;g.add(t,c);g.position.set(x,0,z);scene.add(g);solidos.push({x,z,r:0.7});}
function pedra(x,z,s){const m=new THREE.Mesh(new THREE.DodecahedronGeometry(s),M(0x8b8f93));m.position.set(x,s*0.6,z);m.rotation.set(rnd()*3,rnd()*3,0);scene.add(m);solidos.push({x,z,r:s*0.9});}
for(let i=0;i<170;i++){const x=(rnd()*2-1)*(MAPA-3),z=(rnd()*2-1)*(MAPA-3);
  if(Math.abs(x)<5)continue;if(Math.abs(z-30)<4)continue;if(dist2({x,z},ARENA)<22*22)continue;if(dist2({x,z},SANT)<8*8)continue;
  if(x>0&&x<28&&z>36&&z<54)continue;
  if(dist2({x,z},{x:-30,z:22})<10*10||dist2({x,z},{x:30,z:22})<10*10||dist2({x,z},{x:-28,z:-8})<9*9||dist2({x,z},{x:28,z:-8})<9*9)continue;
  if(rnd()<0.8)arvore3d(x,z);else pedra(x,z,0.6+rnd()*0.9);}
function resolveColisao(p,rad,ignora){if(!ignora)for(const s of solidos){const dx=p.x-s.x,dz=p.z-s.z,d=Math.hypot(dx,dz),m=s.r+rad;if(d<m&&d>0.0001){p.x=s.x+dx/d*m;p.z=s.z+dz/d*m;}}
  p.x=clamp(p.x,-MAPA+1,MAPA-1);p.z=clamp(p.z,-MAPA+1,MAPA-1);}
function marcaCirculo(rad,cor,op){const m=new THREE.Mesh(new THREE.CircleGeometry(rad,32),new THREE.MeshBasicMaterial({color:cor,transparent:true,opacity:op||0.35,depthWrite:false}));m.rotation.x=-Math.PI/2;scene.add(m);return m;}
function marcaCone(rad,arc,cor){const g=new THREE.CircleGeometry(rad,24,Math.PI/2-arc/2,arc);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:cor,transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;scene.add(m);return m;}
function marcaRet(w,l,cor){const g=new THREE.PlaneGeometry(w,l);g.translate(0,l/2,0);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:cor,transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;scene.add(m);return m;}
function remover(o){if(!o)return;scene.remove(o);o.traverse(n=>{if(n.geometry)n.geometry.dispose();});}
const textosEl=$('textos');const flut=[];
function texto(pos,str,cor,tam){const d=document.createElement('div');d.className='ft';d.textContent=str;d.style.color=cor||'#fff';if(tam)d.style.fontSize=tam+'px';textosEl.appendChild(d);
  flut.push({el:d,p:new THREE.Vector3(pos.x,(pos.y||1.5)+1,pos.z),t:0});if(flut.length>40){const f=flut.shift();f.el.remove();}}
let avisoT=0;function aviso(str,seg){const a=$('aviso');a.innerHTML=str;a.style.opacity=1;avisoT=seg||1.6;}
const efeitos=[];function efeito(mesh,dur,fn){efeitos.push({mesh,t:0,dur,fn});}
function flashAnel(x,z,rad,cor){const m=new THREE.Mesh(new THREE.RingGeometry(rad*0.6,rad,32),new THREE.MeshBasicMaterial({color:cor,transparent:true,opacity:0.8,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,0.05,z);scene.add(m);
  efeito(m,0.35,(e,k)=>{m.material.opacity=0.8*(1-k);m.scale.setScalar(1+k*0.4);});}
function rastro(x,z,ang,alc,arco,cor){const g=new THREE.RingGeometry(Math.max(0.1,alc*0.55),alc,20,1,Math.PI/2-arco/2,arco);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:cor||0xffffff,transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false}));
  m.rotation.x=-Math.PI/2;m.rotation.z=ang;m.position.set(x,0.9,z);scene.add(m);efeito(m,0.18,(e,k)=>{m.material.opacity=0.55*(1-k);});}
function linhaFx(x,z,ang,l,w,cor){const m=marcaRet(w,l,cor);m.rotation.z=ang;m.position.set(x,0.06,z);m.material.opacity=0.7;efeito(m,0.25,(e,k)=>{m.material.opacity=0.7*(1-k);});}

// =================== JOGADOR ===================
let ST=stats();
const pl={x:SANT.x,z:SANT.z-5,ang:Math.PI,vida:ST.vidaMax,res:ST.resMax,ene:ST.eneMax,pos:ST.posMax,imp:0,reserva:ST.reserva,
  estado:'livre',t:0,acao:null,acerto:false,combo:0,comboT:0,inv:0,parryT:0,bloq:false,atord:0,semRes:0,semPos:0,semAtk:9,curando:0,
  abertura:0,aberturaUso:null,cds:{},lento:0,reacaoCD:0,reacaoCtrlCD:0,reacaoApoioCD:0,cont:0,mortoT:0,buffs:[],cargas:0,cargaT:0,cargaGanhoT:9,usarCargas:0,
  modelagem:'Normal',firmar:0,firmarCD:0,divida:0,parcelas:[],leitura:null,leituraCD:0,pag:0,fluxo:0,ultDir:'',ritmo:0,frenesi:0,frenesiT:0,marca:null,
  machadoFora:0,saqueT:0,cargaNivel:0,ultimaTec:null,eco:0,memoria:null,ancora:0,alquimia:0,mare:0,ultimoFolego:0,ultimoFolegoDiv:0,arteCD:0,
  ganhoImpS:0,ganhoImpJ:0,correu:0,engaj:0,barreira:0,barreiraT:0};
const plG=new THREE.Group();
const corpo=new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.5,1.3,10),M(0x2f5f9e));corpo.position.y=0.95;
const cabeca=new THREE.Mesh(new THREE.SphereGeometry(0.33,12,10),M(0xf0c8a0));cabeca.position.y=1.85;
const capa=new THREE.Mesh(new THREE.BoxGeometry(0.85,1.1,0.12),M(0x1f3d66));capa.position.set(0,1.05,-0.42);
const armaP=new THREE.Group();armaP.position.set(0.55,1.15,0);
const armaP2=new THREE.Group();armaP2.position.set(-0.55,1.15,0);
const escudo=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.9,0.7),M(0x7a5a2a));escudo.position.set(-0.6,1.1,0.2);
plG.add(corpo,cabeca,capa,armaP,armaP2,escudo);scene.add(plG);
const brilho=new THREE.Mesh(new THREE.RingGeometry(0.7,0.9,24),new THREE.MeshBasicMaterial({color:0xe8c46a,transparent:true,opacity:0}));brilho.rotation.x=-Math.PI/2;brilho.position.y=0.03;plG.add(brilho);
const anelFirmar=new THREE.Mesh(new THREE.RingGeometry(1.0,1.15,24),new THREE.MeshBasicMaterial({color:0x57c27a,transparent:true,opacity:0}));anelFirmar.rotation.x=-Math.PI/2;anelFirmar.position.y=0.04;plG.add(anelFirmar);
function malhaArma(id){const g=new THREE.Group();const met=new THREE.MeshLambertMaterial({color:0xdfe6ee,emissive:0x222222});const mad=M(0x6b4a2b);
  const box=(w,h,l,mat,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,l),mat);m.position.z=z;g.add(m);return m;};
  if(id==='desarmado'){box(0.22,0.22,0.22,M(0xf0c8a0),0.1);}
  else if(id==='espada_curta'||id==='duas_espadas'){box(0.09,0.09,1.1,met,0.55);}
  else if(id==='espada_longa'||id==='espada_e_escudo'){box(0.1,0.1,1.6,met,0.8);}
  else if(id==='katana'||id==='duas_katanas'){box(0.06,0.1,1.6,met,0.8);}
  else if(id==='machado_grande'){box(0.1,0.1,1.9,mad,0.9);const h=box(0.1,0.7,0.5,met,1.7);h.position.y=0.2;}
  else if(id==='machado_pequeno'||id==='dois_machados'){box(0.08,0.08,0.9,mad,0.45);const h=box(0.08,0.45,0.35,met,0.85);h.position.y=0.12;}
  else if(id==='arco'){const a=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.04,6,16,Math.PI),mad);a.rotation.y=Math.PI/2;a.rotation.z=Math.PI/2;g.add(a);}
  return g;}
function montarArma(){while(armaP.children.length)remover(armaP.children[0]);while(armaP2.children.length)remover(armaP2.children[0]);
  armaP.add(malhaArma(P.arma));const A=ARMAS[P.arma];if(A.h===2&&P.arma!=='arco')armaP2.add(malhaArma(P.arma));escudo.visible=P.arma==='espada_e_escudo';}
montarArma();

// =================== INIMIGOS ===================
const inimigos=[];
const TIPOS={
  lobo:{nome:'Lobo cinzento',vida:450,pos:60,vel:4.4,raio:0.6,agro:11,arm:20,xp:0.08,familia:'feras',atq:[{tipo:'cone',r:2.4,arco:1.4,tel:.55,dano:80,I:25,cd:1.6}],cor:0x7d7f86,esc:1},
  golem:{nome:'Golem de pedra',vida:1200,pos:170,vel:1.9,raio:1.0,agro:9,arm:120,xp:0.2,familia:'constructos',atq:[{tipo:'circ',r:3.6,tel:1.0,dano:160,I:50,cd:3.0,alc:3}],cor:0x8a6f4f,esc:1.3},
  chefe:{nome:'Guardião do Andar 1',vida:9000,pos:420,vel:3.1,raio:1.6,agro:16,chefe:true,arm:80,xp:1.5,familia:'guardião',cor:0x4a2a5e,esc:2.2,
    atq:[{tipo:'combo',r:3.4,arco:1.8,tel:.6,dano:120,I:30,cd:2.6},{tipo:'investida',w:3,l:12,tel:.9,dano:190,I:55,cd:5},{tipo:'terremoto',r:7,tel:1.4,dano:240,I:70,cd:8}]},
  boneco:{nome:'Boneco de treino',vida:1e9,pos:300,vel:0,raio:0.7,agro:0,arm:60,xp:0,boneco:true,cor:0xc8a46a,esc:1,atq:[]}
};
function malhaInimigo(t){const g=new THREE.Group();const T=TIPOS[t];
  if(t==='lobo'){const b=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.6,1.4),M(T.cor));b.position.y=0.6;const h=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.45,0.6),M(0x6a6c72));h.position.set(0,0.85,0.85);
    const o1=new THREE.Mesh(new THREE.ConeGeometry(0.1,0.25,4),M(0x55575c));o1.position.set(0.15,1.15,0.8);const o2=o1.clone();o2.position.x=-0.15;g.add(b,h,o1,o2);}
  else if(t==='golem'){const b=new THREE.Mesh(new THREE.BoxGeometry(1.5,1.6,1.1),M(T.cor));b.position.y=1.3;const h=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.7,0.8),M(0x7a6145));h.position.y=2.45;
    const a1=new THREE.Mesh(new THREE.BoxGeometry(0.5,1.4,0.5),M(0x6d563d));a1.position.set(1.05,1.2,0);const a2=a1.clone();a2.position.x=-1.05;const ol=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.12,0.05),new THREE.MeshBasicMaterial({color:0xffb347}));ol.position.set(0,2.5,0.42);g.add(b,h,a1,a2,ol);}
  else if(t==='boneco'){const p=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,1.4,6),M(0x6b4a2b));p.position.y=0.7;const b=new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.5,1.0,10),M(T.cor));b.position.y=1.5;
    const h=new THREE.Mesh(new THREE.SphereGeometry(0.32,10,8),M(0xd8b47a));h.position.y=2.25;const br=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.15,0.15),M(0x6b4a2b));br.position.y=1.7;g.add(p,b,h,br);}
  else{const b=new THREE.Mesh(new THREE.CylinderGeometry(0.7,0.9,1.8,10),M(T.cor));b.position.y=1.2;const h=new THREE.Mesh(new THREE.SphereGeometry(0.5,12,10),M(0x2e1a3a));h.position.y=2.4;
    const c1=new THREE.Mesh(new THREE.ConeGeometry(0.14,0.7,6),M(0xe0d6c0));c1.position.set(0.32,2.85,0);c1.rotation.z=-0.4;const c2=c1.clone();c2.position.x=-0.32;c2.rotation.z=0.4;
    const ar=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.16,1.9),new THREE.MeshLambertMaterial({color:0xb08cff,emissive:0x331a55}));ar.position.set(0.85,1.3,0.7);
    const ol=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.1,0.05),new THREE.MeshBasicMaterial({color:0xff4a6a}));ol.position.set(0,2.45,0.47);g.add(b,h,c1,c2,ar,ol);}
  g.scale.setScalar(T.esc);
  const bar=new THREE.Group();const fundo=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.12),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.6,depthTest:false}));
  const fr=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.12),new THREE.MeshBasicMaterial({color:0xd9534f,depthTest:false}));fr.position.z=0.001;
  const pr=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.05),new THREE.MeshBasicMaterial({color:0xe8a33d,depthTest:false}));pr.position.set(0,-0.1,0.001);
  bar.add(fundo,fr,pr);bar.position.y=t==='golem'?3.6:(t==='boneco'?2.9:1.8);fundo.renderOrder=10;fr.renderOrder=11;pr.renderOrder=11;
  scene.add(g);if(t!=='chefe')scene.add(bar);return {g,bar,fr,pr};}
function criarInimigo(t,x,z){const T=TIPOS[t];const m=malhaInimigo(t);const s=S();
  const e={t,T,x,z,sx:x,sz:z,ang:t==='boneco'?0:rnd()*6,vidaMax:T.vida*s,vida:T.vida*s,pos:T.pos,estado:'parado',cd:1+rnd(),atq:null,marca:null,atord:0,lento:0,lentoF:0,
    armRed:0,armRedT:0,cont:null,contT:0,vagar:0,semPos:0,morto:false,mortoT:0,fase:1,golpeado:0,lido:false,danoLog:[],empX:0,empZ:0,lentoGelo:0,...m};
  e.g.position.set(x,0,z);inimigos.push(e);return e;}
function popular(){
  [[-30,22],[-27,25],[-33,19],[-28,-8],[-31,-5],[-25,-10],[-14,12],[-36,8]].forEach(p=>criarInimigo('lobo',p[0],p[1]));
  [[30,22],[27,-8],[32,-4],[36,10]].forEach(p=>criarInimigo('golem',p[0],p[1]));
  criarInimigo('chefe',0,-42);
  criarInimigo('boneco',12,44);criarInimigo('boneco',18,44);criarInimigo('boneco',24,44);
}
popular();
const chefe=()=>inimigos.find(e=>e.t==='chefe');
function reescalarInimigos(){const s=S();for(const e of inimigos){const f=e.vida/e.vidaMax;e.vidaMax=e.T.vida*s;e.vida=e.vidaMax*f;}}

// =================== LEITOR DE ESTILO ===================
const DIMS=['Esquiva','Defesa ativa','Agressão','Mobilidade','Precisão','Controle','Compromisso','Magia','Suporte'];
let enc=null;
function encontro(){if(!enc){enc={};DIMS.forEach(d=>enc[d]=[0,0]);enc.t=0;enc.calmo=0;enc.janela=0;enc.mov=0;enc.danoJ=false;enc.px=pl.x;enc.pz=pl.z;}return enc;}
function opo(d,ac){const e=encontro();e[d][1]++;if(ac)e[d][0]++;}
function fecharEncontro(){if(!enc)return;if(enc.t<4){enc=null;return;}
  for(const d of DIMS){const [a,o]=enc[d];if(o<=0)continue;const v=Math.min(1,a/o);const cur=P.leitor[d];P.leitor[d]=cur==null?v:cur*0.75+v*0.25;}
  enc=null;checarArtes();salvar();}
function checarArtes(){for(const a of DADOS.artes){if(P.artes[a.n])continue;
  const okM=a.mets.length===2&&a.mets.every(m=>(P.leitor[m]||0)>=0.55);
  const okA=a.attrs.every(([at,v])=>P.attrs[at]>=+v);
  if(okM&&okA){P.artes[a.n]=true;aviso('Arte descoberta<br><small>'+a.nome+'</small>',3);}}}

// =================== ALVO ===================
let alvo=null;
function melhorAlvo(){let m=null,md=1e9;for(const e of inimigos){if(e.morto)continue;const d=dist2(pl,e);if(d<14*14&&d<md){md=d;m=e;}}return m;}
function trocarAlvo(){const lista=inimigos.filter(e=>!e.morto&&dist2(pl,e)<16*16).sort((a,b)=>dist2(pl,a)-dist2(pl,b));if(!lista.length){alvo=null;return;}
  const i=lista.indexOf(alvo);alvo=lista[(i+1)%lista.length];}
const anelAlvo=new THREE.Mesh(new THREE.RingGeometry(0.9,1.1,28),new THREE.MeshBasicMaterial({color:0xff5050,transparent:true,opacity:0.8,depthWrite:false}));anelAlvo.rotation.x=-Math.PI/2;scene.add(anelAlvo);

// =================== DANO ===================
let hitstop=0;
const PESOS={leve:{FOR:.3,DES:.7},pesado:{FOR:.8,DES:.2},arma:{FOR:.5,DES:.5},imbuir:{FOR:.5,DES:.1,POT:.4},disparo:{DES:.4,POT:.4,CON:.2},arco:{DES:.7,PER:.3},conj:{POT:.6,CON:.4},reacao:{POT:.6,CON:.4},disc:{FOR:.5,VIG:.5}};
function mult(p){let s=0;for(const a in p)s+=p[a]*r(a);return 1+s;}
function danoInimigo(e,K,I,o){ // o:{peso,el,origem,pen,critBonus,derivada,flanco,impMult}
  if(e.morto)return 0;o=o||{};const s=S();
  let m=mult(PESOS[o.peso||'arma']);let pen=o.pen||0;let Iadd=0;
  if(pl.abertura>0&&!o.derivada&&pl.aberturaAlvo===e){const fat=espAtiva('leitura_dupla')?0.7:(espAtiva('abertura_conservada')?0.8:1);
    if(P.abertura==='Punir'){let pp=(10+20*r('PER'))*fat;if(ligAtiva('disparo_calculado')&&o.el&&pl.cargasUsadas>0)pp+=10;pen+=pp/100;}
    else if(P.abertura==='Desmontar'){Iadd+=(5+10*r('PER'))*fat*(ligAtiva('fratura_dirigida')?1:1);}
    else{pl.res=Math.min(ST.resMax,pl.res+(5+10*r('PER'))*fat);}
    pl.abertura=0;texto(e.g.position,'ABERTURA: '+P.abertura,'#ffd36a',15);if(enc)opo('Precisão',true);}
  pen=Math.min(0.35,pen);
  let arm=Math.max(0,e.T.arm*s-e.armRed)*(1-pen);
  const Marm=200*s/(200*s+arm);
  let f=1;if(e.atord>0)f*=1.5;if(o.flanco)f*=1.3;
  if(o.el)f*=(e.T.familia==='constructos'&&o.el==='raio')?1.1:1;
  let crit=!o.derivada&&rr2()<ST.crit+(o.critBonus||0);if(crit)f*=ST.critD;
  const d=Math.round(ST.Parma*K*m*Marm*f*(0.95+rr2()*0.1));
  if(!e.T.boneco)e.vida-=d;e.golpeado=0.12;e.danoLog.push([perf(),d,I+Iadd]);
  let Itot=(I+Iadd)*(o.impMult||1);
  if(o.el==='raio')Itot*=1+0.25*potEl('raio');
  if(e.marcaMachado>0)Itot*=1.25;
  if(e.atord<=0&&Itot>0){e.pos-=Itot;e.semPos=0;if(e.pos<=0)quebrarPostura(e);}
  if(P.arma==='desarmado'&&!o.derivada&&o.peso!=='conj'){}
  const cor=o.el?CSS_EL[o.el]:o.derivada?'#ffe066':(crit?'#ffd36a':'#ffffff');
  texto(e.g.position,(crit?'★':'')+fmt(d),cor,crit?21:17);
  if(e.estado==='parado'||e.estado==='voltar')e.estado='perseguir';
  pl.engaj=3;
  if(e.vida<=0)matar(e);
  return d;}
function perf(){return performance.now()/1000;}
function quebrarPostura(e){e.pos=0;e.atord=e.T.chefe?4:(e.T.boneco?2:1.6);if(e.atq){if(e.atq.marca)remover(e.atq.marca);e.atq=null;}
  texto(e.g.position,e.T.chefe?'POSTURA QUEBRADA!':'Quebrou!','#ffb347',e.T.chefe?23:17);if(e.T.chefe)aviso('Postura quebrada<br><small>+50% de dano por 4 s</small>',2);
  ganharImp(espAtiva('estilhacar')?25:15,'quebra');if(enc)opo('Controle',true);}
function matar(e){e.morto=true;e.mortoT=0;if(e.atq){if(e.atq.marca)remover(e.atq.marca);e.atq=null;}e.bar.visible=false;P.abates++;
  const xp=Math.round(e.T.xp*XPnec(P.nivel)*P.teste.xp);if(xp>0){ganharXP(xp);texto(e.g.position,'+'+fmt(xp)+' XP','#e8c46a',15);}
  if(e.T.chefe)setTimeout(vitoria,1200);if(alvo===e)alvo=null;}
function ganharXP(x){P.xp+=x;let sub=false;while(P.nivel<100&&P.xp>=XPnec(P.nivel)){P.xp-=XPnec(P.nivel);P.nivel++;sub=true;}
  if(P.nivel>=100)P.xp=0;if(sub){aviso('Nível '+P.nivel+'<br><small>+3 pontos de atributo · +1 PH</small>',2.2);recalcular(true);}salvar();}
function ganharImp(v,fonte){const now=perf();if(now-pl.ganhoImpJ>1){pl.ganhoImpJ=now;pl.ganhoImpS=0;}const cab=Math.max(0,45-pl.ganhoImpS);const g=Math.min(v,cab);pl.ganhoImpS+=g;pl.imp=Math.min(100,pl.imp+g);return g;}

// =================== ELEMENTOS E REAÇÕES ===================
function aplicarElemento(e,el,origem){if(e.morto)return;
  if(pl.mare>0)el=OPOSTO[el];
  const q=potEl(el)||0.6;const s=S();
  // reação
  if(e.cont&&e.cont!==el&&e.contT>0&&P.elems.includes(e.cont)&&P.elems.includes(el)&&temTronco(e.cont)&&temTronco(el)){
    if(!pl.reagiuNestaAcao){pl.reagiuNestaAcao=true;reacao(e,e.cont,el);e.cont=el;e.contT=4;}
  } else {e.cont=el;e.contT=4;}
  if(el==='fogo'){e.armRed=Math.max(e.armRed,30*s*q);e.armRedT=6;}
  if(el==='gelo'){e.lentoGelo=Math.max(e.lentoGelo,4);e.lentoGeloF=0.15*q;}
  if(el==='terra'){pl.barreira=Math.min(40,pl.barreira+20*q);pl.barreiraT=4;}
  if(el==='vento'){const a=angTo(pl,e);if(!e.T.chefe&&!e.T.boneco){e.empX+=Math.sin(a)*1.5*q;e.empZ+=Math.cos(a)*1.5*q;}if(perf()-(pl.ventoT||0)>1){pl.ventoT=perf();ganharImp(10*q,'vento');}}
  if(el==='raio'&&e.atq&&!e.T.chefe&&e.atq.conj){interromper(e);}
  ganharAfinidadeEl(el);}
function ganharAfinidadeEl(el){}
function reacao(e,A0,B0){const [A,B]=parKey(A0,B0);const lista=DADOS.reacoes[A+'+'+B];if(!lista)return;
  const fd=formasDisp(A,B);const chave=A+'+'+B;let idx=P.formas[chave]??1;if(idx===0&&!fd.dom)idx=1;if(idx===2&&!fd.bdom)idx=1;
  const f=lista[idx];const fx=f.fx||{};
  const tipoCD=fx.ctrl?'reacaoCtrlCD':(fx.apoio||fx.selfRed||fx.selfPos||fx.selfMov||fx.selfVel?'reacaoApoioCD':'reacaoCD');
  if(pl[tipoCD]>0){texto(e.g.position,'reação em recarga','#bbb',13);return;}
  pl[tipoCD]=tipoCD==='reacaoCtrlCD'?10:(tipoCD==='reacaoApoioCD'?12:6);
  let bonus=1;if(pl.ressonancia>0){pl.ressonancia=0;bonus=1.15;}
  texto(e.g.position,f.nome.toUpperCase()+'!','#ffe066',21);flashAnel(e.x,e.z,fx.r||1.6,COR_EL[A]);
  const alvos=fx.r?inimigos.filter(o=>!o.morto&&dist2(o,e)<fx.r*fx.r):[e];
  for(const o of alvos){
    if(fx.K)danoInimigo(o,fx.K*bonus,fx.I||0,{peso:'reacao',derivada:true});
    else if(fx.I&&o.atord<=0){o.pos-=fx.I;if(o.pos<=0)quebrarPostura(o);}
    if(fx.pos&&o.atord<=0){o.pos-=fx.pos;if(o.pos<=0)quebrarPostura(o);}
    if(!o.T.chefe&&!o.T.boneco){if(fx.lento){o.lento=3;o.lentoF=0.3;}if(fx.emp){const a=angTo(pl,o);o.empX+=Math.sin(a)*fx.emp;o.empZ+=Math.cos(a)*fx.emp;}
      if(fx.puxa){const a=angTo(o,e);o.empX+=Math.sin(a)*fx.puxa;o.empZ+=Math.cos(a)*fx.puxa;}if(fx.derruba)atordoar(o,fx.derruba);}
    if(fx.interr)interromper(o);}
  if(fx.selfRed)addBuff('red',fx.selfRed/100,4);if(fx.selfPos)pl.pos=Math.min(ST.posMax,pl.pos+fx.selfPos);
  if(fx.selfMov)addBuff('mov',0.10,3);if(fx.selfVel)addBuff('vel',0.10,3);
  if(fx.oculto){pl.oculto=1;pl.ocultoT=1;const m=new THREE.Mesh(new THREE.CylinderGeometry(3,3,2.2,24,1,true),new THREE.MeshBasicMaterial({color:0xeef6ff,transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));
    m.position.set(e.x,1.1,e.z);scene.add(m);nevoas.push({x:e.x,z:e.z,r:fx.r||3,t:4,m});}
  if(fx.apoio&&!fx.selfMov)texto(plG.position,'(efeito em aliados — sem aliados neste teste)','#9fb0c2',13);}
function interromper(e){if(e.atq&&!e.T.chefe){if(e.atq.marca)remover(e.atq.marca);e.atq=null;e.cd=1.2;texto(e.g.position,'Interrompido','#fff06a',15);if(enc)opo('Controle',true);}}
function atordoar(e,t){if(e.T.chefe||e.T.boneco)return;e.atord=Math.max(e.atord,t);if(e.atq){if(e.atq.marca)remover(e.atq.marca);e.atq=null;}}
function addBuff(tipo,v,dur){pl.buffs.push({tipo,v,t:dur});}
function buff(tipo){let m=0;for(const b of pl.buffs)if(b.tipo===tipo)m=Math.max(m,b.v);return m;}
const projeteis=[];const areas=[];const nevoas=[];

// =================== TÉCNICAS (genérico a partir do documento) ===================
function tecFinal(no){const t=Object.assign({},no.t);t.K=t.K||0;const arv=ARV[no.arv];
  const mods=[];for(const k of P.prep.transf)if(k){const tn=noDe(k);if(tn&&tn.arv===no.arv&&tn.refs[0]===no.n)mods.push(tn);}
  for(const k of P.prep.pas)if(k&&!k.includes('esp:')&&!k.includes('lig:')){const pn=noDe(k);if(pn&&pn.arv===no.arv&&pn.refs[0]===no.n&&pn.m)mods.push(pn);}
  for(const mn of mods){const m=mn.m||{};if(m.custo!=null)t.custo=m.custo;if(m.cd!=null)t.cd=m.cd;if(m.K!=null)t.K=m.K;if(m.I!=null)t.I=m.I;}
  t.mods=mods.map(x=>x.nome);
  const txt=(t.txt||'').toLowerCase();const cat=arv.cat;
  let forma=t.forma,alc=t.alc||0;
  if(forma==='linha'){}
  else if(forma==='area'||(/área|anel|nuvem|zona|cone/.test(txt)&&t.m1>0)){forma='area';alc=alc||t.m1;}
  else if(forma==='proj'||(cat==='elem'&&t.m1>=5)||(no.arv==='arco'&&!t.volta&&!/rolamento|salto|armadilha/.test(txt))){forma='proj';alc=t.m1>=5?t.m1:(alc||25);}
  else if(cat==='elem'&&t.m1>0){forma='area';alc=t.m1;}
  else if(t.volta){forma='area';alc=Math.max(2.5,t.m1||ARMAS[P.arma].alc+0.6);t.self=true;}
  else forma='melee';
  if(forma==='area'&&/centrad|em volta|ao redor|à sua volta|você/.test(txt))t.self=true;
  if(/atravessa/.test(txt))t.atravessa=true;
  t.forma=forma;t.alc=alc;t.magico=cat==='elem'||t.rec==='E';
  t.peso=cat==='elem'?'conj':(no.arv==='arco'?(t.rec==='E'?'disparo':'arco'):(cat==='disc'?'disc':(/imbu/.test(txt)?'imbuir':'arma')));
  t.el=cat==='elem'?no.arv:(/elemento/.test(txt)&&t.K>0?P.elems[0]:null);
  if(t.tempo<0.4)t.tempo=0.5;
  return t;}
function podeAgir(){return pl.estado==='livre'||pl.estado==='bloq';}
function virarParaAlvo(maxD){if(!alvo||alvo.morto)alvo=melhorAlvo();if(alvo&&dist2(pl,alvo)<maxD*maxD)pl.ang=angTo(pl,alvo);}
function custoEfetivo(t,cargas){let base=t.custo;let sob=0;
  if(t.magico&&cargas>0){sob+=0.2*cargas*(cargas>=3&&espAtiva('descarga_total')?4/3:1);}
  if(t.magico&&t.modelagem==='Expandir')sob+=(ligAtiva('lente_instavel')&&cargas>=2)?0.35:0.15;
  if(t.magico&&t.modelagem==='Comprimir')sob+=0.15;
  if(t.magico&&ligAtiva('conjuracao_assentada')&&t.modelagem==='Conduzir')sob+=0.2;
  if(t.magico&&espAtiva('tecelao'))sob+=0.1;
  return Math.max(t.custo>0?5:0,Math.round(base*(1+sob)));}
function usarTecnicaKey(key,slotIdx){
  if(key==='arte'){usarArte();return;}
  const no=noDe(key);if(!no)return;
  const arv=ARV[no.arv];
  if(arv.cat==='arma'&&no.arv!==P.arma){aviso('Precisa da arma: '+arv.nome,1);return;}
  if(arv.cat==='elem'&&!P.elems.includes(no.arv)){aviso('Elemento não escolhido',1);return;}
  if(!podeAgir()&&!(pl.estado==='acao'&&pl.acao&&pl.t>pl.acao.prep+pl.acao.exec&&no.tipo!=='Reação'))return;
  if((pl.cds[key]||0)>0)return;
  const t=tecFinal(no);
  if(t.magico)t.modelagem=pl.modelagem;
  const cargas=t.magico?Math.min(pl.usarCargas,pl.cargas):0;
  const custo=custoEfetivo(t,cargas);
  const recurso=t.rec==='E'?'ene':'res';
  if(pl[recurso]<custo){aviso('Sem '+(recurso==='ene'?'energia':'resistência'),0.8);return;}
  pl[recurso]-=custo;if(recurso==='res')pl.semRes=0.6;
  if(cargas>0){pl.cargas-=cargas;if(espAtiva('descarga_total')&&cargas>=3)pl.semEneT=4;}
  let cd=t.cd;pl.cds[key]=cd;pl.cdMax=pl.cdMax||{};pl.cdMax[key]=cd;
  pl.ultimaTec={key,t,custo};pl.cargasUsadas=cargas;
  executarTecnica(no,t,cargas,false);
  if(enc){opo('Magia',t.magico);opo('Compromisso',true);pl.compromissoAberto=true;}
  if(t.magico)registrarDomEl(no.arv);
}
function executarTecnica(no,t,cargas,derivada,mult){
  mult=mult||1;
  const H=ST.H*(1+buff('vel'));const tot=t.tempo;let prep=tot*0.35,exec=tot*0.20,rec=tot*0.45;
  if(t.magico){prep=prep/ST.Hc+0.10*cargas*(cargas>=3&&espAtiva('descarga_total')?4/3:1);if(t.modelagem==='Conduzir')prep*=1.2;if(espAtiva('tecelao')&&pl.ultConj&&pl.ultConj!==no.key&&perf()-pl.ultConjT<3&&perf()-(pl.tecelaoT||0)>8){prep*=0.75;pl.tecelaoT=perf();}pl.ultConj=no.key;pl.ultConjT=perf();}
  else prep/=H;rec/=H;
  if(P.arma==='desarmado'&&t.magico)prep*=0.85;
  if(t.carga){prep=tot*0.9;exec=0.12;rec=0.3;}
  let dmult=mult;if(t.magico&&cargas>0){dmult*=1+cargas*(0.08+0.12*r('POT'))+(cargas>=3&&espAtiva('descarga_total')?(0.08+0.12*r('POT')):0);}
  let raio=t.alc;
  if(t.magico&&t.modelagem==='Expandir'&&(t.forma==='area')){raio*=1.10+0.40*r('CON');dmult*=(ligAtiva('lente_instavel')&&cargas>=2)?0.9:0.8;}
  if(t.magico&&t.modelagem==='Comprimir'&&t.forma==='area'){raio*=0.7;dmult*=1.05+0.20*r('CON');}
  let Imult=1;if(t.magico&&t.modelagem==='Comprimir'&&ligAtiva('ariete_geometrico')){Imult=1;t.Iadd=12;dmult*=0.9;}
  if(cargas>0&&ligAtiva('nucleo_de_impacto')&&t.peso==='imbuir'){t.Iadd=(t.Iadd||0)+8*cargas;dmult/=1+cargas*(0.08+0.12*r('POT'));}
  virarParaAlvo(Math.max(6,(t.forma==='proj'?t.alc:raio)+3));
  pl.estado='acao';pl.t=0;pl.acerto=false;pl.bloq=false;pl.reagiuNestaAcao=false;
  pl.acao={nome:'tec',no,t,prep,exec,rec,K:t.K*dmult,I:(t.I||0)+(t.Iadd||0),raio,derivada,conduzir:t.magico&&t.modelagem==='Conduzir'};
  if(t.forma==='area'&&!t.self){let tx,tz;if(alvo&&!alvo.morto&&dist2(pl,alvo)<16*16){tx=alvo.x;tz=alvo.z;}else{tx=pl.x+Math.sin(pl.ang)*5;tz=pl.z+Math.cos(pl.ang)*5;}
    pl.acao.tx=tx;pl.acao.tz=tz;pl.acao.marca=marcaCirculo(raio,t.el?COR_EL[t.el]:0xffe8a0,0.25);pl.acao.marca.position.set(tx,0.04,tz);}
  if(t.K===0&&!t.mov)textoUtil(no,t);
  texto(plG.position,no.nome,'#e8c46a',14);}
function textoUtil(no,t){if(t.red){addBuff('red',t.red/100,t.dur||3);texto(plG.position,'−'+t.red+'% de dano recebido','#9fe39f',14);return;}
  const tx=(t.txt||'').toLowerCase();let m=tx.match(/postura máxima \+(\d+)%/);if(m){addBuff('posMax',+m[1]/100,t.dur||t.tempo||3);texto(plG.position,'postura máx. +'+m[1]+'%','#9fe39f',14);return;}
  if(/esquiva|rolamento/.test(tx)){pl.inv=Math.max(pl.inv,0.3);}
  texto(plG.position,'(efeito especial ainda não simulado)','#9fb0c2',12);}
function resolverAcaoTec(a){const t=a.t;const cor=t.el?COR_EL[t.el]:0xffffff;
  const o={peso:t.peso,el:t.el,derivada:a.derivada};let n=0;
  const hitE=(e)=>{if(t.el&&!a.derivada)pl.elAcao=t.el;
    const fl=P.arma==='espada_curta'&&t.peso!=='conj'&&Math.abs(angDiff(e.ang,angTo(e,pl)))>Math.PI/3;
    danoInimigo(e,a.K/(t.hits||1)*(t.hits||1),a.I,Object.assign({},o,{flanco:fl}));
    if(t.derruba)atordoar(e,t.derruba);if(t.interr)interromper(e);if(t.lento&&!e.T.chefe){e.lento=3;e.lentoF=0.3;}
    if(t.emp&&!e.T.chefe&&!e.T.boneco){const ag=angTo(pl,e);e.empX+=Math.sin(ag)*t.emp;e.empZ+=Math.cos(ag)*t.emp;}
    if(t.puxa&&!e.T.chefe&&!e.T.boneco){const ag=angTo(e,pl);e.empX+=Math.sin(ag)*t.puxa;e.empZ+=Math.cos(ag)*t.puxa;}
    if(t.el&&!a.derivada)aplicarElemento(e,t.el,'tec');n++;};
  if(t.forma==='proj'){const m=new THREE.Mesh(new THREE.SphereGeometry(0.28,10,8),new THREE.MeshBasicMaterial({color:t.el?COR_EL[t.el]:0xfff3c8}));m.position.set(pl.x,1.2,pl.z);scene.add(m);
    projeteis.push({x:pl.x,z:pl.z,dx:Math.sin(pl.ang),dz:Math.cos(pl.ang),t:0,vida:t.alc/20,m,K:a.K,I:a.I,o,t2:t,atravessa:t.atravessa,ja:new Set(),der:a.derivada});return;}
  if(t.forma==='area'){const cx=t.self?pl.x:a.tx,cz=t.self?pl.z:a.tz;flashAnel(cx,cz,a.raio,cor);if(a.marca)remover(a.marca);
    for(const e of inimigos){if(!e.morto&&Math.hypot(e.x-cx,e.z-cz)<a.raio+e.T.raio*0.5)hitE(e);}}
  else if(t.forma==='linha'){linhaFx(pl.x,pl.z,pl.ang,t.alc,1.2,cor);
    for(const e of inimigos){if(e.morto)continue;const dx=e.x-pl.x,dz=e.z-pl.z;const fw=dx*Math.sin(pl.ang)+dz*Math.cos(pl.ang);const sd=Math.abs(dx*Math.cos(pl.ang)-dz*Math.sin(pl.ang));
      if(fw>-0.5&&fw<t.alc+e.T.raio&&sd<0.6+e.T.raio)hitE(e);}}
  else{const alc=ARMAS[P.arma].dist?2.5:ARMAS[P.arma].alc+0.7+(P.arma==='espada_longa'&&P.guarda==='alta'?0.4:0);rastro(pl.x,pl.z,pl.ang,alc,2.4,cor);
    for(const e of inimigos){if(e.morto)continue;const d=Math.sqrt(dist2(pl,e));if(d>alc+e.T.raio)continue;if(Math.abs(angDiff(pl.ang,angTo(pl,e)))>1.45)continue;hitE(e);}}
  if(n>0){hitstop=Math.max(hitstop,0.04);ganharCargaPorAcerto(a);}
  else if(a.t.K>0&&enc)opo('Precisão',false);}
function ganharCargaPorAcerto(a){const t=a.t;if(!t.magico||a.derivada)return;if(pl.custoUlt<15&&(pl.ultimaTec&&pl.ultimaTec.custo<15))return;
  const minG=espAtiva('reator_estavel')?3:2;if(perf()-pl.cargaGanhoT<minG)return;if(pl.cargas>=3)return;
  pl.cargas++;pl.cargaGanhoT=perf();pl.cargaT=espAtiva('reator_estavel')?12:8;texto(plG.position,'Sobrecarga '+pl.cargas,'#9ad0ff',13);}

// =================== ATAQUES BÁSICOS E MECÂNICAS DE ARMA ===================
function ataqueBase(pesado,extra){const A=ARMAS[P.arma];extra=extra||{};
  let K=pesado?A.pK:A.lK*A.h,I=pesado?A.pI:A.lI*A.h,T=pesado?A.pT:A.lT;
  if(P.arma==='espada_longa'){if(P.guarda==='alta'){T*=1.1;if(pesado)K=1.60;}else T*=0.9;}
  if(P.arma==='dois_machados')T/=1+Math.min(0.15,pl.frenesi*0.03);
  if(!pesado&&pl.combo===2)K*=1.25;
  const alc=(A.dist?0:A.alc+0.5)+(P.arma==='espada_longa'&&P.guarda==='alta'?0.4:0);
  return {K,I,T,alc,arco:2.2,custo:pesado?15:0,peso:pesado?'pesado':'leve',...extra};}
function iniciarBasico(b,nome){if(pl.res<b.custo){aviso('Sem resistência',0.7);return false;}pl.res-=b.custo;if(b.custo)pl.semRes=0.6;
  const H=ST.H*(1+buff('vel'));const prep=b.T*0.35/H,exec=b.T*0.2,rec=b.T*0.45/H;
  pl.estado='acao';pl.acao=Object.assign({nome,prep,exec,rec},b);pl.t=0;pl.acerto=false;pl.bloq=false;pl.reagiuNestaAcao=false;virarParaAlvo((b.alc||20)+3);
  pl.semAtk=0;if(enc)opo('Compromisso',true);return true;}
function ataqueLeve(){if(pl.estado==='acao'&&pl.acao&&(pl.acao.nome==='leve')&&pl.t>pl.acao.prep+pl.acao.exec){pl.filaLeve=true;return;}
  if(!podeAgir())return;
  if(P.arma==='duas_espadas'&&pl.ritmo>=4){pl.ritmo=0;iniciarBasico({K:1.0,I:25,T:0.8,alc:2.5,arco:2.6,custo:0,peso:'leve',cruzado:1},'leve');texto(plG.position,'Corte cruzado','#ffe066',15);return;}
  if(P.arma==='machado_pequeno'&&pl.machadoFora>0){iniciarBasico({K:.45,I:8,T:.45,alc:1.9,arco:2,custo:0,peso:'leve'},'leve');return;}
  if(P.arma==='arco'){const b=ataqueBase(false);iniciarBasico(Object.assign(b,{flecha:1,alcF:30}),'leve');return;}
  const i=pl.comboT>0?pl.combo:0;pl.combo=(i+1)%3;pl.comboT=0.9;iniciarBasico(ataqueBase(false),'leve');}
function ataquePesado(seg){if(!podeAgir())return;pl.combo=0;const A=ARMAS[P.arma];
  if(P.arma==='machado_pequeno'&&pl.machadoFora<=0){virarParaAlvo(14);const m=malhaArma('machado_pequeno');m.position.set(pl.x,1.2,pl.z);scene.add(m);
    projeteis.push({x:pl.x,z:pl.z,dx:Math.sin(pl.ang),dz:Math.cos(pl.ang),t:0,vida:12/16,m,K:A.pK,I:A.pI,o:{peso:'pesado'},machado:1,ja:new Set()});pl.machadoFora=1.5;pl.res-=10;pl.semRes=0.6;texto(plG.position,'Arremesso','#e8c46a',14);return;}
  iniciarBasico(ataqueBase(true),'pesado');}
function golpeImpeto(){if(!podeAgir())return;if(pl.imp<20){aviso('Ímpeto 20+',0.7);return;}
  const A=ARMAS[P.arma];const ig=pl.imp;pl.impGasto=ig;pl.imp=0;
  const Imul=(1+ig*(0.5+r('FOR'))/100)*(ig>=70?1.08:1)*(espAtiva('martelo_de_guarda')?1:1);
  let n=pl.cds?0:0;
  const b=ataqueBase(true,{});b.I=b.I*Imul;b.custo=0;b.imp=1;b.peso='pesado';
  if(espAtiva('martelo_de_guarda'))b.K*=0.9;
  iniciarBasico(b,'imp');aviso('GOLPE DE ÍMPETO '+Math.round(ig),0.8);
  // continuações (núcleo A.4 + DES 2.2)
  const desInv=P.attrs.DES;const golpes=ig<=0?0:(desInv<20?1:desInv<40?2:3);
  let danoTot=A.lK*A.h*(ig/100)*(1+3*r('DES'));if(espAtiva('pes_leves')&&pl.recuando)danoTot*=0.9;if(espAtiva('estilhacar'))danoTot*=0.9;
  const tempoTot=0.45*ig/100;const impTot=0.35*A.lI*A.h*ig/100*(ig>=70?1.08:1);
  let d=0.5+1.5*r('DES');if(ligAtiva('passagem_de_forca')&&ig>=70){d+=0.8;b.I-=10;}
  pl.contFila=golpes>0?{n:golpes,K:danoTot/golpes,I:impTot/golpes,T:tempoTot/golpes,d:d/golpes,ig,custoR:espAtiva('corrente_continua')?5:0}:null;
  if(enc)opo('Agressão',true);}
function esquiva(){
  if(pl.firmar>0){ceder();return;}
  if(!(podeAgir()||(pl.estado==='acao'&&pl.acao&&pl.t>pl.acao.prep+pl.acao.exec)||(pl.estado==='acao'&&pl.acao&&pl.acao.nome==='cont'&&espAtiva('corrente_continua'))))return;
  let custo=20;if(P.arma==='duas_katanas')custo=14;if(pl.res<custo){aviso('Sem resistência',0.7);return;}
  pl.res-=custo;pl.semRes=0.6;let dx=joyV.x,dz=joyV.z;if(Math.hypot(dx,dz)<0.2){dx=-Math.sin(pl.ang);dz=-Math.cos(pl.ang);}const l=Math.hypot(dx,dz);
  const contAtiva=pl.estado==='acao'&&pl.acao&&pl.acao.nome==='cont';
  pl.estado='esquiva';pl.t=0;pl.edx=dx/l;pl.edz=dz/l;pl.ang=Math.atan2(pl.edx,pl.edz);pl.inv=P.arma==='duas_katanas'?0.24:0.30;pl.bloq=false;pl.esqDist=P.arma==='duas_katanas'?2:(P.arma==='arco'?3:3.5);
  pl.voltarCont=contAtiva&&espAtiva('corrente_continua')&&!pl.correnteUsada?pl.contFila:null;
  if(pl.saqueT>0)pl.saqueT=0;}
function defesaDown(){
  if(pl.estado==='bloq'&&pl.bloq){firmarIniciar();return;}
  if(!podeAgir())return;
  if(P.arma==='katana'){pl.saqueT=0.001;pl.estado='saque';return;}
  pl.parryT=ST.parry;pl.parryInicio=perf();
  if(ARMAS[P.arma].bloq>0){pl.bloq=true;pl.estado='bloq';}else{pl.estado='parry';pl.t=0;}}
function defesaUp(){if(P.arma==='katana'&&pl.estado==='saque'){soltarSaque();return;}
  pl.bloq=false;if(pl.estado==='bloq')pl.estado='livre';}
let defToques=0;
function firmarIniciar(){const cd=espAtiva('muro_de_carne')?15:12;if(pl.firmarCD>0||pl.parcelas.length)return;const custo=espAtiva('segundo_folego')?20:15;if(pl.res<custo)return;
  pl.res-=custo;pl.semRes=0.6;pl.firmar=espAtiva('muro_de_carne')?1.6:1.2;pl.firmarCD=cd;texto(plG.position,'Firmar','#7fd88f',15);
  if(ligAtiva('nucleo_protegido')){pl.cargaT+=3;pl.ene=Math.min(ST.eneMax,pl.ene+10);}}
function ceder(){if(pl.firmar<=0)return;pl.firmar=0;pl.divida*= (ligAtiva('retirada_disciplinada')?0.5:0.6);
  if(espAtiva('segundo_folego'))pl.res=Math.min(ST.resMax,pl.res+10);if(ligAtiva('retirada_disciplinada'))pl.res=Math.max(0,pl.res-5);
  pagarDivida();pl.estado='esquiva';pl.t=0;const d=(ligAtiva('retirada_disciplinada')?2.5:1.5);pl.edx=-Math.sin(pl.ang);pl.edz=-Math.cos(pl.ang);pl.inv=0;pl.esqDist=d;pl.bloq=false;pl.cedeuT=3;
  texto(plG.position,'Ceder','#7fd88f',15);}
function pagarDivida(){if(pl.divida<=0)return;const np=espAtiva('divida_parcelada')?5:3;const iv=espAtiva('divida_parcelada')?0.6:0.5;const v=pl.divida/np;pl.parcelas=[];for(let i=0;i<np;i++)pl.parcelas.push({t:iv*(i+1),v});pl.divida=0;}
function soltarSaque(){const c=Math.min(1.2,pl.saqueT);pl.saqueT=0;pl.estado='livre';
  const resposta=pl.golpeChegando&&perf()-pl.golpeChegando<ST.parry+0.04;
  const K=1.2+0.8*(c/1.2);const b={K,I:24,T:0.6,alc:4,arco:0.6,custo:0,peso:'leve',linha:4};
  if(resposta){pl.inv=0.2;}iniciarBasico(b,'saque');}
function curar(){if(!podeAgir()||pl.reserva<=0||(pl.cds.cura||0)>0)return;const s=S();const q=Math.min(pl.reserva,250*s*ST.vazao);pl.reserva-=250*s;if(pl.reserva<0)pl.reserva=0;
  pl.cds.cura=1.5;pl.curaQ=q;pl.estado='cura';pl.t=0;texto(plG.position,'Cura','#7dff9a',16);}
function ler(){if(pl.leituraCD>0)return;const lim=espAtiva('leitura_dupla')?2:1;
  const cand=inimigos.filter(e=>!e.morto&&e.atq&&!e.lido&&dist2(pl,e)<16*16).sort((a,b)=>dist2(pl,a)-dist2(pl,b));
  if(!cand.length){texto(plG.position,'nada para ler','#9fb0c2',13);return;}
  for(const e of cand.slice(0,lim)){e.lido=true;e.atq.lido=true;texto(e.g.position,'LIDO','#ffd36a',16);}
  pl.leituraCD=espAtiva('olho_de_cacador')?6:8;}
function respostaCerta(e,tipo){ // Abertura PER
  if(!e||!e.atq||!e.atq.lido)return;e.atq.lido=false;e.lido=false;
  pl.abertura=espAtiva('olho_de_cacador')?1.5:(espAtiva('abertura_conservada')?5:2);pl.aberturaAlvo=e;texto(plG.position,'ABERTURA','#ffd36a',18);
  if(ligAtiva('guarda_informada')&&tipo==='bloq'){pl.divida=Math.max(0,pl.divida-10);P.abertura==='Retomar';pl.res=Math.min(ST.resMax,pl.res+(5+10*r('PER')));pl.abertura=0;}
  if(pl.leituraCD>2)pl.leituraCD=Math.min(pl.leituraCD,8);}

// jogador recebe golpe
function golpearJogador(dano,I,fonte){
  if(pl.estado==='morto')return;
  if(enc){opo('Esquiva',pl.inv>0&&pl.estado==='esquiva');}
  if(pl.inv>0){if(pl.estado==='esquiva'&&!pl.perfeitaDada){pl.perfeitaDada=true;ganharImp(20,'esquiva');texto(plG.position,'Esquiva perfeita','#c9a0ff',16);hitstop=0.08;respostaCerta(fonte,'esq');
      if(P.arteEq===1)pl.eco=2;if(ligAtiva('descarga_itinerante'))pl.descargaIt=perf();
      if(pl.voltarCont){pl.correnteUsada=true;const c=pl.voltarCont;pl.voltarCont=null;setTimeout(()=>{if(pl.estado==='livre'){pl.contFila=c;proximaCont();}},380);}}return;}
  pl.golpeChegando=perf();
  if(pl.estado==='saque'){/* katana: soltar na hora = parry */}
  const A=ARMAS[P.arma];
  const frente=Math.abs(angDiff(pl.ang,angTo(pl,fonte)))<(A.arc180?1.6:1.15);
  // parry (com ou sem bloqueio)
  if((pl.bloq||pl.estado==='parry')&&frente&&pl.parryT>0){
    ganharImp(20,'parry');const Ip=20*(1+0.5*r('FOR')+0.5*r('PER'));if(fonte.atord<=0){fonte.pos-=Ip;fonte.semPos=0;if(fonte.pos<=0)quebrarPostura(fonte);}
    texto(plG.position,'PARRY!','#ffe066',22);flashAnel(pl.x,pl.z,1.3,0xffe066);hitstop=0.1;respostaCerta(fonte,'parry');if(enc)opo('Defesa ativa',true);
    if(P.arma==='duas_katanas'){setTimeout(()=>{if(!fonte.morto){danoInimigo(fonte,0.6,6,{peso:'leve'});danoInimigo(fonte,0.6,6,{peso:'leve'});}},120);}
    if(pl.reacParry){const rp=pl.reacParry;pl.reacParry=null;executarContra(rp,fonte);}
    return;}
  if(pl.bloq&&frente){
    const efic=A.bloq||1;let custo=dano/S()*0.35/efic;if(A.arc180)custo*=0.75;pl.res-=custo;pl.semRes=0.8;
    let Ip=I*0.5;
    if(pl.firmar>0){const f=0.20+0.30*r('VIG');const lim=(15+25*r('VIG'))*(espAtiva('divida_parcelada')?0.8:1);const ad=Math.min(Ip*f,Math.max(0,lim-pl.divida));pl.divida+=ad;Ip-=ad;}
    pl.pos-=Ip;pl.semPos=0;texto(plG.position,'bloqueio','#cfe3ff',14);if(enc)opo('Defesa ativa',true);
    if(P.arteEq===13)pl.ancora=Math.min(20,I*0.4);
    if(P.arteEq===12&&(pl.cds.arte||0)<=0){pl.revideJanela=0.6;pl.revideI=Math.min(40,I);pl.revideAlvo=fonte;}
    respostaCerta(fonte,'bloq');
    if(pl.res<=0){pl.res=0;pl.estado='atord';pl.atord=1.0;pl.bloq=false;pl.firmar=0;texto(plG.position,'Guarda quebrada','#ff8080',17);}
    pl.vida-=Math.round(dano*0.15);checarPosturaJogador();checarMorte();return;}
  if(enc)opo('Defesa ativa',false);
  let d=dano*(1-buff('red'));
  if(P.arma==='machado_grande'&&pl.estado==='acao'&&pl.acao&&pl.acao.nome==='pesadoC'&&pl.cargaNivel>=2){I=0;}
  pl.vida-=d;let Ii=I;if(pl.barreira>0){const ab=Math.min(pl.barreira,Ii);pl.barreira-=ab;Ii-=ab;}pl.pos-=Ii;pl.semPos=0;texto(plG.position,'-'+fmt(d),'#ff6a6a',18);
  pl.ritmo=0;pl.frenesi=0;pl.fluxo=0;if(pl.compromissoAberto&&enc){opo('Compromisso',false);}pl.compromissoAberto=false;
  checarPosturaJogador();checarMorte();}
function executarContra(no,fonte){const t=tecFinal(no);if(t.K>0){danoInimigo(fonte,t.K,t.I,{peso:'arma'});texto(plG.position,no.nome,'#9fd',15);}}
function checarPosturaJogador(){if(pl.pos<=0&&pl.estado!=='morto'){pl.pos=0;pl.estado='atord';pl.atord=1.2;pl.bloq=false;pl.parcelas=[];pl.divida=0;pl.firmar=0;texto(plG.position,'Atordoado','#ffb347',17);}}
function checarMorte(){if(pl.vida<=0&&pl.estado!=='morto'){
  if(pl.ultimoFolego>0){pl.ultimoFolegoDiv=-pl.vida+1;pl.vida=1;pl.ultimoFolego=0;pl.ufT=1;texto(plG.position,'Último Fôlego','#ffd36a',18);return;}
  pl.vida=0;pl.estado='morto';pl.mortoT=0;aviso('Você caiu<br><small>voltando ao Santuário…</small>',2.5);fecharEncontro();}}
function renascer(){recalcular(false);Object.assign(pl,{x:SANT.x,z:SANT.z-4,vida:ST.vidaMax,res:ST.resMax,ene:ST.eneMax,pos:ST.posMax,imp:0,estado:'livre',reserva:ST.reserva,abertura:0,inv:0,cargas:0,divida:0,parcelas:[]});
  for(const e of inimigos){if(e.morto)continue;e.vida=e.vidaMax;e.pos=e.T.pos;e.x=e.sx;e.z=e.sz;e.estado='parado';if(e.atq&&e.atq.marca)remover(e.atq.marca);e.atq=null;e.fase=1;}}

// =================== ARTES ===================
function arteDados(n){return DADOS.artes.find(a=>a.n===n);}
function usarArte(){const n=P.arteEq;if(!n)return;if((pl.cds.arte||0)>0)return;const a=arteDados(n);const cd=(sec=>{pl.cds.arte=sec;pl.cdMax=pl.cdMax||{};pl.cdMax.arte=sec;});
  const pagar=(rec,v)=>{if(pl[rec]<v){aviso('Sem recurso para a Arte',0.8);return false;}pl[rec]-=v;return true;};
  if(!ARTE_SIM.has(n)){texto(plG.position,a.nome+' (ainda não simulada)','#9fb0c2',14);return;}
  switch(n){
    case 1: texto(plG.position,'Eco: ativa sozinho depois de uma esquiva perfeita','#9fb0c2',13);return;
    case 2:{const u=pl.ultimaTec;if(!u||!u.t||u.t.magico||ARV[noDe(u.key).arv].cat!=='arma'){aviso('Reprise: use antes uma técnica ofensiva de arma',1);return;}
      const custo=Math.round(u.t.custo*1.5);if(!pagar(u.t.rec==='E'?'ene':'res',custo))return;pl.cds[u.key]=(pl.cds[u.key]||0)+4;cd(20);
      executarTecnica(noDe(u.key),Object.assign({},u.t,{el:null}),0,true,0.5);texto(plG.position,'Reprise','#ffd36a',16);return;}
    case 6:{if(!pagar('res',20))return;cd(16);pl.estado='esquiva';pl.t=0;let dx=joyV.x,dz=joyV.z;if(Math.hypot(dx,dz)<0.2){dx=Math.sin(pl.ang);dz=Math.cos(pl.ang);}const l=Math.hypot(dx,dz);
      pl.edx=dx/l;pl.edz=dz/l;pl.esqDist=5;pl.inv=0;pl.fantasma=0.4;texto(plG.position,'Passo Fantasma','#ffd36a',16);return;}
    case 8:{if(!alvo||alvo.morto)return;if(!pagar('res',20))return;cd(20);alvo.pontoCego=3;texto(alvo.g.position,'Ponto cego','#ffd36a',16);return;}
    case 9:{if(!pagar('res',30))return;cd(60);pl.ultimoFolego=2;texto(plG.position,'Último Fôlego pronto (2 s)','#ffd36a',15);return;}
    case 10:{if(!(pl.estado==='acao'&&pl.acao&&pl.t>pl.acao.prep+pl.acao.exec)){aviso('Contratempo: use na recuperação de um golpe',1);return;}if(!pagar('res',20))return;cd(18);
      pl.estado='esquiva';pl.t=0;pl.edx=-Math.sin(pl.ang);pl.edz=-Math.cos(pl.ang);pl.esqDist=1.5;pl.inv=0;texto(plG.position,'Contratempo','#ffd36a',15);return;}
    case 12: texto(plG.position,'Revide: aperte a Arte até 0,6 s depois de bloquear','#9fb0c2',13);
      if(pl.revideJanela>0&&pl.revideAlvo&&!pl.revideAlvo.morto){if(!pagar('res',15))return;cd(14);pl.revideJanela=0;danoInimigo(pl.revideAlvo,0.8,pl.revideI,{peso:'arma'});texto(plG.position,'Revide','#ffd36a',16);}return;
    case 13:{if(!pagar('res',10))return;cd(10);texto(plG.position,'Âncora: bloqueie em até 2 s','#ffd36a',14);return;}
    case 14:{if(pl.vida<ST.vidaMax*0.2){aviso('Vida baixa demais',0.8);return;}pl.vida-=pl.vida*0.08;pl.res=Math.min(ST.resMax,pl.res+30);addBuff('regenR',0.2,4);cd(20);texto(plG.position,'Sangue por fôlego','#ffd36a',15);return;}
    case 15:{if(pl.imp<50){aviso('Ímpeto 50+',0.8);return;}pl.ene=Math.min(ST.eneMax,pl.ene+pl.imp/2);pl.imp=0;if(pl.cargas<3)pl.cargas++;pl.cargaT=8;cd(25);texto(plG.position,'Combustão interna','#ffd36a',15);return;}
    case 16:{if(pl.pos<40){aviso('Postura baixa demais',0.8);return;}pl.pos-=25;pl.alquimia=3;pl.alquimiaT=5;cd(18);texto(plG.position,'Alquimia da postura','#ffd36a',15);return;}
    case 21:{if(pl.imp<70){aviso('Ímpeto 70+',0.8);return;}pl.imp-=25;pl.mare=6;cd(20);texto(plG.position,'Maré: elemento oposto por 6 s','#ffd36a',15);return;}
  }}

// =================== IA ===================
function iaInimigo(e,dt){const T=e.T;
  if(e.morto){e.mortoT+=dt;e.g.position.y=-e.mortoT*0.8;e.g.rotation.z=Math.min(1.4,e.mortoT*3);if(e.mortoT>1.2)e.g.visible=false;
    if(!T.chefe&&e.mortoT>20&&dist2(pl,{x:e.sx,z:e.sz})>20*20){Object.assign(e,{morto:false,vida:e.vidaMax,pos:T.pos,x:e.sx,z:e.sz,estado:'parado',mortoT:0,cont:null});e.g.visible=true;e.g.rotation.z=0;e.g.position.y=0;e.bar.visible=true;}return;}
  if(e.contT>0){e.contT-=dt;if(e.contT<=0)e.cont=null;}
  if(e.armRedT>0){e.armRedT-=dt;if(e.armRedT<=0)e.armRed=0;}
  if(e.lento>0)e.lento-=dt;if(e.lentoGelo>0)e.lentoGelo-=dt;if(e.marcaMachado>0)e.marcaMachado-=dt;if(e.pontoCego>0)e.pontoCego-=dt;
  if(Math.abs(e.empX)+Math.abs(e.empZ)>0.01){const k=Math.min(1,dt*10);e.x+=e.empX*k;e.z+=e.empZ*k;e.empX*=1-k;e.empZ*=1-k;}
  e.semPos+=dt;if(e.atord<=0&&e.semPos>2.5)e.pos=Math.min(T.pos,e.pos+T.pos*0.12*dt);
  if(e.atord>0){e.atord-=dt;if(e.atord<=0)e.pos=T.pos*0.6;e.g.rotation.x=0.25;return;}else e.g.rotation.x=0;
  if(T.boneco){if(e.vida<e.vidaMax)e.vida=e.vidaMax;return;}
  const recF=1+(e.lentoGelo>0?e.lentoGeloF:0);
  let naNevoa=false;for(const n of nevoas){if(dist2(n,e)<n.r*n.r)naNevoa=true;}
  const velF=(e.lento>0?(1-e.lentoF):1)*(naNevoa?0.5:1)*(T.chefe&&e.fase===2?1.2:1);
  const dP=Math.sqrt(dist2(e,pl));
  if(T.chefe&&e.fase===1&&e.vida<e.vidaMax*0.5){e.fase=2;aviso('O Guardião se enfurece!<br><small>fase 2</small>',2);criarInimigo('lobo',-8,-34);criarInimigo('lobo',8,-34);}
  if(e.atq){const a=e.atq;a.t+=dt*(T.chefe&&e.fase===2?1.15:1)/recF;
    if(a.marca)a.marca.material.opacity=(a.lido?0.45:0.25)+0.3*(a.t/a.tel);if(a.marca&&a.lido)a.marca.material.color.setHex(0xffd36a);
    if(a.tipo==='investida'&&a.t>=a.tel){const sp=22*dt;e.x+=Math.sin(a.ang)*sp;e.z+=Math.cos(a.ang)*sp;a.corrido+=sp;
      if(!a.acertou&&Math.hypot(pl.x-e.x,pl.z-e.z)<T.raio+0.6){a.acertou=true;golpearJogador(a.dano*S(),a.I,e);}
      if(a.corrido>=a.l){if(a.marca)remover(a.marca);e.atq=null;e.cd=a.cd;e.lido=false;}return;}
    if(a.t>=a.tel){resolverAtaque(e,a);
      if(!e.atq)return;
      if(a.tipo==='combo'&&a.n<2){a.n++;a.t=0;a.ang=angTo(e,pl);e.ang=a.ang;if(a.marca){a.marca.rotation.z=a.ang;a.marca.position.set(e.x,0.04,e.z);}a.tel=0.45;}
      else{if(a.marca)remover(a.marca);e.atq=null;e.lido=false;e.cd=a.cd*(0.8+rnd()*0.4)*recF;}}
    return;}
  e.cd-=dt;
  const oculto=pl.oculto>0;
  const agro=pl.estado!=='morto'&&!oculto&&(dP<T.agro||(e.estado==='perseguir'&&dP<T.agro*2.2));
  const longe=Math.hypot(e.x-e.sx,e.z-e.sz);
  if(T.chefe){const dA=Math.hypot(pl.x-ARENA.x,pl.z-ARENA.z);if(dA>ARENA.r+1)e.estado='voltar';else if(pl.estado!=='morto')e.estado='perseguir';}
  else if(agro&&longe<28)e.estado='perseguir';else if(e.estado==='perseguir')e.estado='voltar';
  if(e.estado==='perseguir'){pl.engaj=3;
    e.ang+=angDiff(e.ang,angTo(e,pl))*Math.min(1,dt*6);
    const ops=T.atq.filter(a=>a.tipo!=='terremoto'||e.vida<e.vidaMax*0.85);let escolha=null;
    if(e.cd<=0){if(T.chefe){const rv=rnd();if(dP>6&&rv<0.6)escolha=ops.find(a=>a.tipo==='investida');else if(rv<0.25&&ops.find(a=>a.tipo==='terremoto'))escolha=ops.find(a=>a.tipo==='terremoto');else if(dP<3.6)escolha=ops[0];}
      else if(dP<(T.atq[0].alc||T.atq[0].r)*0.9)escolha=T.atq[0];}
    if(escolha){iniciarAtaque(e,escolha);return;}
    const parar=dP<(T.chefe?2.6:(T.atq[0].alc||T.atq[0].r)*0.75);
    if(!parar){const sp=T.vel*velF*dt;e.x+=Math.sin(e.ang)*sp;e.z+=Math.cos(e.ang)*sp;}}
  else if(e.estado==='voltar'){const d=Math.hypot(e.sx-e.x,e.sz-e.z);if(d<0.5){e.estado='parado';e.vida=e.vidaMax;e.pos=T.pos;}
    else{e.ang=Math.atan2(e.sx-e.x,e.sz-e.z);const sp=T.vel*1.3*dt;e.x+=Math.sin(e.ang)*sp;e.z+=Math.cos(e.ang)*sp;e.vida=Math.min(e.vidaMax,e.vida+e.vidaMax*0.2*dt);}}
  else{e.vagar-=dt;if(e.vagar<=0){e.vagar=2+rnd()*3;e.vang=rnd()*6.28;e.anda=rnd()<0.5;}
    if(e.anda&&!T.chefe){e.ang=e.vang;const sp=T.vel*0.25*dt;e.x+=Math.sin(e.ang)*sp;e.z+=Math.cos(e.ang)*sp;if(Math.hypot(e.x-e.sx,e.z-e.sz)>5)e.vang=Math.atan2(e.sx-e.x,e.sz-e.z);}}}
function iniciarAtaque(e,a0){const a=Object.assign({},a0,{t:0,n:0,ang:angTo(e,pl),corrido:0});e.ang=a.ang;
  if(a.tipo==='cone'||a.tipo==='combo'){a.marca=marcaCone(a.r,a.arco,0xff3030);a.marca.rotation.z=a.ang;a.marca.position.set(e.x,0.04,e.z);}
  else if(a.tipo==='circ'){a.marca=marcaCirculo(a.r,0xff3030);a.marca.position.set(e.x+Math.sin(a.ang)*1.2,0.04,e.z+Math.cos(a.ang)*1.2);a.cx=a.marca.position.x;a.cz=a.marca.position.z;}
  else if(a.tipo==='terremoto'){a.marca=marcaCirculo(a.r,0xff2020);a.marca.position.set(e.x,0.04,e.z);a.cx=e.x;a.cz=e.z;texto(e.g.position,'!!','#ff5050',30);}
  else if(a.tipo==='investida'){a.marca=marcaRet(a.w,a.l,0xff3030);a.marca.rotation.z=a.ang;a.marca.position.set(e.x,0.04,e.z);}
  e.atq=a;if(enc)opo('Controle',false);}
function resolverAtaque(e,a){let ac=false;
  if(a.tipo==='cone'||a.tipo==='combo'){const d=Math.sqrt(dist2(e,pl));if(d<a.r+0.4&&Math.abs(angDiff(a.ang,angTo(e,pl)))<a.arco/2+0.15)ac=true;
    const g=new THREE.RingGeometry(a.r*0.5,a.r,16,1,Math.PI/2-a.arco/2,a.arco);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xff5555,transparent:true,opacity:0.6,side:THREE.DoubleSide,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.rotation.z=a.ang;m.position.set(e.x,0.8,e.z);scene.add(m);efeito(m,0.2,(x,k)=>{m.material.opacity=0.6*(1-k);});}
  else{if(Math.hypot(pl.x-a.cx,pl.z-a.cz)<a.r+0.3)ac=true;flashAnel(a.cx,a.cz,a.r,0xff6040);}
  if(ac)golpearJogador(a.dano*S(),a.I,e);else if(dist2(pl,e)<(a.r+4)*(a.r+4)&&enc){opo('Esquiva',pl.estado==='esquiva');}}

// =================== ENTRADA ===================
const joyV={x:0,z:0};let joyId=null,joyC={x:0,y:0};
const joy=$('joy'),joyBase=$('joyBase'),joyPonta=$('joyPonta');
joy.addEventListener('pointerdown',ev=>{if(joyId!==null)return;joyId=ev.pointerId;joy.setPointerCapture(ev.pointerId);joyC={x:ev.clientX,y:ev.clientY};
  joyBase.style.display='block';joyBase.style.left=(ev.clientX-60)+'px';joyBase.style.top=(ev.clientY-60)+'px';$('dica-joy').style.display='none';});
joy.addEventListener('pointermove',ev=>{if(ev.pointerId!==joyId)return;let dx=ev.clientX-joyC.x,dy=ev.clientY-joyC.y;const l=Math.hypot(dx,dy),m=50;if(l>m){dx=dx/l*m;dy=dy/l*m;}
  joyPonta.style.left=(35+dx)+'px';joyPonta.style.top=(35+dy)+'px';joyV.x=dx/m;joyV.z=dy/m;});
function soltarJoy(ev){if(ev.pointerId!==joyId)return;joyId=null;joyV.x=0;joyV.z=0;joyBase.style.display='none';joyPonta.style.left='35px';joyPonta.style.top='35px';}
joy.addEventListener('pointerup',soltarJoy);joy.addEventListener('pointercancel',soltarJoy);
function botao(id,down,up){const b=$(id);b.addEventListener('pointerdown',ev=>{ev.preventDefault();try{b.setPointerCapture(ev.pointerId);}catch(e){}b.classList.add('ativo');down&&down();});
  const fim=()=>{b.classList.remove('ativo');up&&up();};b.addEventListener('pointerup',fim);b.addEventListener('pointercancel',fim);b.addEventListener('contextmenu',e=>e.preventDefault());}
let atkSeg=-1,firmouGolpe=false;
botao('bAtk',()=>{atkSeg=0;firmouGolpe=false;},()=>{soltarAtaque();});
function soltarAtaque(){if(atkSeg<0)return;const s=atkSeg;atkSeg=-1;
  if(P.arma==='arco'&&s>=0.3){tiroTenso(s-0.3);return;}
  if(P.arma==='machado_grande'&&s>=0.3){pesadoCarregado(s-0.3);return;}
  if(s<0.28)ataqueLeve();}
botao('bEsq',esquiva);botao('bDef',defesaDown,defesaUp);botao('bImp',golpeImpeto);
['bT1','bT2','bT3','bT4'].forEach((id,i)=>botao(id,()=>{const k=P.prep.tec[pl.pag*4+i];if(k)usarTecnicaKey(k);}));
botao('bPag',()=>{pl.pag=1-pl.pag;atualizarBotoes();});
botao('bReac',()=>{const k=P.prep.reac;if(!k)return;usarReacao(k);});
botao('bCura',curar);
$('bAlvo').addEventListener('click',trocarAlvo);$('bLer').addEventListener('click',ler);
$('bCarga').addEventListener('click',()=>{pl.usarCargas=(pl.usarCargas+1)%4;});
const MODS=['Normal','Expandir','Comprimir','Conduzir'];
$('bMod').addEventListener('click',()=>{let i=MODS.indexOf(pl.modelagem);i=(i+1)%4;if(MODS[i]==='Conduzir'&&ligAtiva('conjuracao_assentada')){}pl.modelagem=MODS[i];});
$('bMec').addEventListener('click',mecanicaBotao);
function mecanicaBotao(){if(P.arma==='espada_longa'){P.guarda=P.guarda==='alta'?'baixa':'alta';texto(plG.position,'Guarda '+P.guarda,'#e8c46a',15);recalcular(false);}
  else texto(plG.position,'Mecânica: '+ARMAS[P.arma].mec+' (automática)','#9fb0c2',13);}
function usarReacao(k){const no=noDe(k);if(!no)return;if((pl.cds[k]||0)>0)return;const t=tecFinal(no);const tx=(t.txt||'').toLowerCase();
  if(ARV[no.arv].cat==='arma'&&no.arv!==P.arma){aviso('Precisa da arma: '+ARV[no.arv].nome,1);return;}
  if(/parry|postura defensiva|janela|aparar|devolve/.test(tx)){if(pl.res<t.custo)return;pl.res-=t.custo;pl.cds[k]=t.cd;pl.cdMax=pl.cdMax||{};pl.cdMax[k]=t.cd;pl.parryT=Math.max(ST.parry,0.25);pl.reacParry=no;pl.estado='parry';pl.t=0;texto(plG.position,no.nome,'#9fd',14);return;}
  usarTecnicaKey(k);}
function tiroTenso(seg){if(!podeAgir())return;const K=seg>2?1.0:1.0+0.5*Math.min(1,seg);const b=ataqueBase(true);b.K=K;b.I=12+6*Math.min(1,seg);b.flecha=1;b.alcF=30;b.trema=seg>2;iniciarBasico(b,'pesado');}
function pesadoCarregado(seg){if(!podeAgir())return;const nv=seg>=1.5?3:seg>=1.0?2:seg>=0.5?1:0;const b=ataqueBase(true);if(nv>0){b.K=[0,1.9,2.4,3.0][nv];b.I=40+10*nv;}pl.cargaNivel=nv;iniciarBasico(b,'pesado');if(nv)texto(plG.position,'Carga '+nv,'#e8c46a',15);}
const teclas={};
addEventListener('keydown',ev=>{if(ev.repeat)return;if($('painel').style.display==='flex')return;const k=ev.key.toLowerCase();teclas[k]=true;
  if(k==='j'){atkSeg=0;}if(k==='k'||k===' ')esquiva();if(k==='l')defesaDown();if(k==='i')golpeImpeto();if(k==='r')ler();if(k==='c')pl.usarCargas=(pl.usarCargas+1)%4;
  if('12345678'.includes(k)&&k.length===1){const key=P.prep.tec[+k-1];if(key)usarTecnicaKey(key);}if(k==='e'){if(P.prep.reac)usarReacao(P.prep.reac);}
  if(k==='q')curar();if(k==='tab'){ev.preventDefault();trocarAlvo();}if(k==='m')abrirMenu();if(k==='g')mecanicaBotao();});
addEventListener('keyup',ev=>{const k=ev.key.toLowerCase();teclas[k]=false;if(k==='j')soltarAtaque();if(k==='l')defesaUp();});

// =================== DOMÍNIO ===================
function registrarDomEl(id){P.dom[id]=Math.min(100,(P.dom[id]||0)+0.05*P.teste.dom);}
function domTick(dt){if(pl.engaj>0){const rate=P.teste.dom/612;P.dom[P.arma]=Math.min(100,(P.dom[P.arma]||0)+rate*dt);for(const d of ['protecao','socorro','sobrevivencia','expedicao'])P.dom[d]=P.nivel;}}

// =================== RECALCULAR ===================
function recalcular(encher){const velho=ST;ST=stats();
  const f=k=>velho[k]?pl[k==='vidaMax'?'vida':k]/velho[k]:1;
  if(encher){pl.vida=ST.vidaMax;pl.res=ST.resMax;pl.ene=ST.eneMax;pl.pos=ST.posMax;pl.reserva=ST.reserva;}
  else{pl.vida=Math.min(ST.vidaMax,pl.vida*ST.vidaMax/velho.vidaMax);pl.res=Math.min(ST.resMax,pl.res);pl.ene=Math.min(ST.eneMax,pl.ene);pl.pos=Math.min(ST.posMax,pl.pos);}
  reescalarInimigos();montarArma();atualizarBotoes();salvar();}

// =================== LOOP ===================
const relogio=new THREE.Clock();const tmpV=new THREE.Vector3();
let chefeVisto=false,pausado=false;
function proximaCont(){const c=pl.contFila;if(!c||c.n<=0){pl.contFila=null;return false;}c.n--;
  if(c.custoR){if(pl.res<c.custoR){pl.contFila=null;return false;}pl.res-=c.custoR;}
  let dx=joyV.x,dz=joyV.z;if(Math.hypot(dx,dz)>0.3){pl.ang=Math.atan2(dx,dz);}
  pl.recuando=espAtiva('pes_leves')&&alvo&&Math.abs(angDiff(pl.ang,angTo(pl,alvo)))>2;
  if(!espAtiva('pes_leves')&&alvo&&!alvo.morto&&Math.abs(angDiff(pl.ang,angTo(pl,alvo)))>1.6)pl.ang=angTo(pl,alvo);
  const T=Math.max(0.06,c.T);pl.estado='acao';pl.t=0;pl.acerto=false;
  pl.acao={nome:'cont',prep:0.02,exec:T*0.6,rec:T*0.4,K:c.K,I:c.I,alc:ARMAS[P.arma].dist?2.5:ARMAS[P.arma].alc+0.5,arco:2.2,mov:c.d,peso:'leve',vendaval:espAtiva('vendaval_de_laminas')&&c.ig>=80};
  if(c.n<=0)pl.contFila=null;return true;}
function passo(dt){
  if(atkSeg>=0){atkSeg+=dt;
    if(P.arma!=='arco'&&P.arma!=='machado_grande'&&atkSeg>=0.3&&!(pl.estado==='acao'&&pl.acao&&pl.acao.nome==='pesado')){ataquePesado();if(P.arma==='machado_pequeno')atkSeg=-1;}
    // FOR: Firmar o golpe — continuar segurando durante o preparo do pesado
    if(pl.estado==='acao'&&pl.acao&&pl.acao.nome==='pesado'&&!pl.acao.firmado&&pl.t>=pl.acao.prep*0.9&&atkSeg>=0.3){
      const ex=espAtiva('golpe_assentado')?0.15:0.25;const parc=espAtiva('golpe_assentado')?0.15:0.20;pl.acao.firmado=true;pl.acao.prep+=ex;pl.acao.K*=1-parc;pl.acao.I+=20*(parc/0.20)*r('FOR');texto(plG.position,'Firmar o golpe','#e8a33d',14);}}
  ST=ST||stats();
  // recursos
  pl.semRes+=dt;if(pl.semRes>0.6&&!pl.bloq)pl.res=Math.min(ST.resMax,pl.res+28*dt*(1+buff('regenR')));
  if(!(pl.semEneT>0)){let rg=ST.regenE*(espAtiva('coracao_de_fornalha')?(pl.cargas>=3?1.2:pl.cargas===0?0.9:1):1);pl.ene=Math.min(ST.eneMax,pl.ene+rg*dt);}else pl.semEneT-=dt;
  pl.semPos+=dt;if(pl.semPos>2&&!pl.parcelas.length)pl.pos=Math.min(ST.posMax*(1+buff('posMax')),pl.pos+ST.regenPos*dt);
  for(const k in pl.cds)pl.cds[k]=Math.max(0,pl.cds[k]-dt);
  for(const k of ['reacaoCD','reacaoCtrlCD','reacaoApoioCD','firmarCD','leituraCD','abertura','parryT','revideJanela'])if(pl[k]>0)pl[k]=Math.max(0,pl[k]-dt);
  if(pl.inv>0)pl.inv-=dt;else pl.perfeitaDada=false;
  if(pl.comboT>0)pl.comboT-=dt;if(pl.mare>0)pl.mare-=dt;if(pl.ultimoFolego>0)pl.ultimoFolego-=dt;if(pl.engaj>0)pl.engaj-=dt;if(pl.cedeuT>0)pl.cedeuT-=dt;
  if(pl.machadoFora>0)pl.machadoFora-=dt;if(pl.barreiraT>0){pl.barreiraT-=dt;if(pl.barreiraT<=0)pl.barreira=0;}if(pl.ocultoT>0)pl.ocultoT-=dt;
  if(pl.ufT>0){pl.ufT-=dt;if(pl.ufT<=0){pl.vida-=pl.ultimoFolegoDiv;pl.ultimoFolegoDiv=0;checarMorte();}}
  if(pl.cargas>0){pl.cargaT-=dt;if(pl.cargaT<=0){pl.cargas=0;texto(plG.position,'cargas expiraram','#9fb0c2',12);}}
  if(pl.frenesiT>0){pl.frenesiT-=dt;if(pl.frenesiT<=0)pl.frenesi=0;}
  pl.buffs=pl.buffs.filter(b=>(b.t-=dt)>0);
  // Firmar e dívida (VIG)
  if(pl.firmar>0){pl.firmar-=dt;if(pl.firmar<=0||!pl.bloq){pl.firmar=0;pagarDivida();}}
  if(pl.parcelas.length){for(const p of pl.parcelas)p.t-=dt;while(pl.parcelas.length&&pl.parcelas[0].t<=0){const p=pl.parcelas.shift();pl.pos-=p.v;pl.semPos=0;checarPosturaJogador();}}
  // Ímpeto: perde 10/s fora de ação ofensiva
  pl.semAtk+=dt;if(pl.semAtk>2.5&&pl.imp>0)pl.imp=Math.max(0,pl.imp-10*dt);
  pl.oculto=pl.ocultoT>0?1:0;for(const n of nevoas){if(dist2(n,pl)<n.r*n.r)pl.oculto=1;}
  if(dist2(pl,SANT)<4*4&&pl.estado!=='morto'){pl.vida=Math.min(ST.vidaMax,pl.vida+ST.vidaMax*0.15*dt);if(pl.reserva<ST.reserva){pl.reserva=ST.reserva;texto(plG.position,'Reserva de cura cheia','#7dff9a',14);}
    if(enc&&!inimigos.some(e=>!e.morto&&e.estado==='perseguir'))fecharEncontro();}
  let mx=joyV.x,mz=joyV.z;if(teclas['a'])mx-=1;if(teclas['d'])mx+=1;if(teclas['w'])mz-=1;if(teclas['s'])mz+=1;
  const ml=Math.hypot(mx,mz);if(ml>1){mx/=ml;mz/=ml;}
  // Ímpeto por correr na direção de inimigo engajado
  const vel=ST.vel*(1+buff('mov'));
  if(pl.estado==='morto'){pl.mortoT+=dt;plG.rotation.z=Math.min(1.4,pl.mortoT*3);if(pl.mortoT>3){plG.rotation.z=0;renascer();}}
  else if(pl.estado==='atord'){pl.atord-=dt;if(pl.atord<=0){pl.estado='livre';pl.pos=Math.max(pl.pos,ST.posMax*0.4);}}
  else if(pl.estado==='esquiva'){pl.t+=dt;const dur=0.38;const sp=(pl.esqDist/dur)*2*(1-pl.t/dur);pl.x+=pl.edx*sp*dt;pl.z+=pl.edz*sp*dt;if(pl.t>=dur)pl.estado='livre';}
  else if(pl.estado==='parry'){pl.t+=dt;if(pl.t>0.35)pl.estado='livre';}
  else if(pl.estado==='saque'){pl.saqueT+=dt;const sp=vel*0.3*ml*dt;pl.x+=mx*sp;pl.z+=mz*sp;}
  else if(pl.estado==='cura'){pl.t+=dt;pl.vida=Math.min(ST.vidaMax,pl.vida+pl.curaQ/1.5*dt);const sp=2*ml*dt;pl.x+=mx*sp;pl.z+=mz*sp;if(pl.t>=1.5)pl.estado='livre';}
  else if(pl.estado==='acao'){const a=pl.acao;pl.t+=dt;const ini=a.prep,fim=a.prep+a.exec;
    if(a.conduzir&&pl.t<ini&&ml>0.15){const f=0.35+0.40*r('CON')-(espAtiva('mao_firme')?0.1:0);pl.x+=mx*vel*f*dt;pl.z+=mz*vel*f*dt;}
    if(pl.t>ini&&pl.t<=fim+0.02){let mov=a.nome==='tec'?(a.t.mov||0):(a.mov!=null?a.mov:(a.nome==='leve'?0.5:0.7));
      const sp=mov/Math.max(0.05,a.exec)*dt;let px=pl.x+Math.sin(pl.ang)*sp,pz=pl.z+Math.cos(pl.ang)*sp;
      if(a.nome==='cont'&&pl.recuando){px=pl.x-Math.sin(pl.ang)*sp*0;}
      if(alvo&&!alvo.morto&&!(a.nome==='tec'&&Math.abs(mov)>2)&&Math.hypot(px-alvo.x,pz-alvo.z)<alvo.T.raio+0.8){px=pl.x;pz=pl.z;}pl.x=px;pl.z=pz;}
    if(!pl.acerto&&pl.t>=ini+a.exec*0.5){pl.acerto=true;
      if(a.nome==='tec'){resolverAcaoTec(a);}
      else resolverBasico(a);}
    if(pl.t>=fim+a.rec){
      if(a.nome==='imp'||a.nome==='cont'){if(proximaCont())return;}
      pl.estado='livre';if(pl.filaLeve){pl.filaLeve=false;ataqueLeve();}
      if(pl.compromissoAberto){pl.compromissoAberto=false;}}}
  if(pl.estado==='livre'||pl.estado==='bloq'){const v=pl.bloq?1.8:vel;if(ml>0.15){const ox=pl.x,oz=pl.z;pl.x+=mx*v*dt;pl.z+=mz*v*dt;if(!pl.bloq)pl.ang=Math.atan2(mx,mz);else if(alvo&&!alvo.morto)pl.ang=angTo(pl,alvo);
      if(alvo&&!alvo.morto&&alvo.estado==='perseguir'&&!pl.bloq){const d0=Math.hypot(ox-alvo.x,oz-alvo.z),d1=Math.hypot(pl.x-alvo.x,pl.z-alvo.z);if(d1<d0&&pl.correu<30){const g=ganharImp(2*(d0-d1),'correr');pl.correu+=g;pl.semCorrer=0;}}}}
  pl.semCorrer=(pl.semCorrer||0)+dt;if(pl.semCorrer>2)pl.correu=0;
  resolveColisao(pl,0.5,pl.fantasma>0);if(pl.fantasma>0)pl.fantasma-=dt;
  // encontro
  if(pl.engaj>0){const e=encontro();e.t+=dt;e.janela+=dt;e.mov+=Math.hypot(pl.x-e.px,pl.z-e.pz);e.px=pl.x;e.pz=pl.z;
    if(e.janela>=2){opo('Agressão',e.danoJ);opo('Mobilidade',e.mov>3);e.janela=0;e.mov=0;e.danoJ=false;}}
  else if(enc){enc.calmo+=dt;if(enc.calmo>4)fecharEncontro();}
  domTick(dt);
  for(const e of inimigos){iaInimigo(e,dt);if(!e.morto&&!e.T.boneco){resolveColisao(e,e.T.raio);}
    if(!e.morto){const d=Math.hypot(e.x-pl.x,e.z-pl.z),m=e.T.raio+0.5;if(d<m&&d>0.01&&pl.estado!=='esquiva'){const k=(m-d);if(!e.T.boneco){e.x+=(e.x-pl.x)/d*k*0.5;e.z+=(e.z-pl.z)/d*k*0.5;}pl.x-=(e.x-pl.x)/d*k*(e.T.boneco?1:0.5);pl.z-=(e.z-pl.z)/d*k*(e.T.boneco?1:0.5);}}}
  for(let i=projeteis.length-1;i>=0;i--){const p=projeteis[i];p.t+=dt;const sp=p.machado?16:22;p.x+=p.dx*sp*dt;p.z+=p.dz*sp*dt;p.m.position.set(p.x,1.2,p.z);if(p.machado)p.m.rotation.y+=dt*20;let fim=p.t>p.vida;
    for(const e of inimigos){if(e.morto||p.ja.has(e))continue;if(Math.hypot(e.x-p.x,e.z-p.z)<e.T.raio+0.4){p.ja.add(e);pl.reagiuNestaAcao=false;
      if(p.machado){danoInimigo(e,p.K,p.I,p.o);e.marcaMachado=6;texto(e.g.position,'Marcado','#e8c46a',14);}
      else{danoInimigo(e,p.K,p.I,p.o);if(p.t2){const t=p.t2;if(t.derruba)atordoar(e,t.derruba);if(t.interr)interromper(e);if(t.el&&!p.der)aplicarElemento(e,t.el,'proj');ganharCargaPorAcerto({t,derivada:p.der});}}
      flashAnel(p.x,p.z,0.9,p.t2&&p.t2.el?COR_EL[p.t2.el]:0xffffff);if(!p.atravessa){fim=true;break;}}}
    if(fim){remover(p.m);projeteis.splice(i,1);}}
  for(let i=nevoas.length-1;i>=0;i--){const n=nevoas[i];n.t-=dt;n.m.material.opacity=0.35*Math.min(1,n.t);if(n.t<=0){remover(n.m);nevoas.splice(i,1);}}
  for(let i=efeitos.length-1;i>=0;i--){const f=efeitos[i];f.t+=dt;const k=Math.min(1,f.t/f.dur);f.fn(f,k);if(k>=1){remover(f.mesh);efeitos.splice(i,1);}}
  if(avisoT>0){avisoT-=dt;if(avisoT<=0)$('aviso').style.opacity=0;}
  if(alvo&&(alvo.morto||dist2(pl,alvo)>20*20))alvo=null;
  if(!alvo){const m=melhorAlvo();if(m&&dist2(pl,m)<9*9)alvo=m;}
  const c=chefe();if(c&&!c.morto&&Math.hypot(pl.x-ARENA.x,pl.z-ARENA.z)<ARENA.r){if(!chefeVisto){chefeVisto=true;aviso('Guardião do Andar 1',2);}}
}
function resolverBasico(a){const A=ARMAS[P.arma];
  if(a.flecha){const m=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.9,5),new THREE.MeshBasicMaterial({color:0xfff3c8}));m.rotation.x=Math.PI/2;m.position.set(pl.x,1.2,pl.z);scene.add(m);
    const g=new THREE.Group();g.add(m);scene.add(g);let ang=pl.ang;if(a.trema)ang+=(rr2()-0.5)*0.35;
    projeteis.push({x:pl.x,z:pl.z,dx:Math.sin(ang),dz:Math.cos(ang),t:0,vida:30/22,m,K:a.K,I:a.I,o:{peso:'arco'},ja:new Set()});pl.semAtk=0;return;}
  if(a.linha){linhaFx(pl.x,pl.z,pl.ang,a.linha,1.2,0xffffff);let n=0;for(const e of inimigos){if(e.morto)continue;const dx=e.x-pl.x,dz=e.z-pl.z;const fw=dx*Math.sin(pl.ang)+dz*Math.cos(pl.ang);const sd=Math.abs(dx*Math.cos(pl.ang)-dz*Math.sin(pl.ang));
    if(fw>-0.5&&fw<a.linha+e.T.raio&&sd<0.6+e.T.raio){danoInimigo(e,a.K,a.I,{peso:'arma'});n++;}}if(n)hitstop=0.06;return;}
  rastro(pl.x,pl.z,pl.ang,a.alc,a.arco,a.nome==='imp'?0xc46bff:(a.nome==='pesado'?0xffe8a0:(a.nome==='cont'?0xd8b0ff:0xffffff)));
  let n=0;let dir=a.nome+':'+pl.combo;
  for(const e of inimigos){if(e.morto)continue;const d=Math.sqrt(dist2(pl,e));if(d>a.alc+e.T.raio)continue;if(Math.abs(angDiff(pl.ang,angTo(pl,e)))>a.arco/2+0.25)continue;
    if(n>=1&&a.nome==='cont'&&!a.vendaval)break;if(a.vendaval&&n>=3)break;
    let I=a.I;if(P.arma==='desarmado'){I*=1+0.06*pl.fluxo;}
    if(pl.alquimia>0&&a.nome!=='cont'){I+=8;pl.alquimia--;}
    if(pl.ancora>0&&a.nome==='pesado'){I+=pl.ancora;pl.ancora=0;}
    let K=a.K;if(pl.eco>0&&a.nome!=='cont'){K*=0.7;const e2=e;const K2=a.K*0.3;setTimeout(()=>{if(!e2.morto)danoInimigo(e2,K2,0,{peso:a.peso,derivada:true});},600);}
    const fl=(P.arma==='espada_curta'||e.pontoCego>0)&&Math.abs(angDiff(e.ang,angTo(e,pl)))>Math.PI/3;
    danoInimigo(e,K,I,{peso:a.peso||'leve',flanco:fl});n++;
    if(ligAtiva('contraforte')&&a.nome==='pesado'&&pl.cedeuT>0){pl.parcelas.forEach(p=>p.v=Math.max(0,p.v-8/Math.max(1,pl.parcelas.length)));pl.res=Math.min(ST.resMax,pl.res+8);pl.cedeuT=0;}}
  if(pl.eco>0&&n>0)pl.eco=0;
  if(n>0){pl.semAtk=0;if(enc){enc.danoJ=true;opo('Precisão',true);}hitstop=Math.max(hitstop,a.nome==='pesado'||a.nome==='imp'?0.07:0.035);
    if(P.arma==='desarmado'){if(dir!==pl.ultDir){pl.fluxo=Math.min(5,pl.fluxo+1);}else pl.fluxo=0;pl.ultDir=dir;}
    if(P.arma==='duas_espadas'&&a.nome==='leve'&&!a.cruzado)pl.ritmo=Math.min(4,pl.ritmo+1);
    if(P.arma==='dois_machados'){pl.frenesi=Math.min(5,pl.frenesi+1);pl.frenesiT=2;}}
  else{if(enc)opo('Precisão',false);if(P.arma==='duas_espadas')pl.ritmo=0;}}

// =================== DESENHO ===================
function desenhar(dt){
  plG.position.set(pl.x,0,pl.z);plG.rotation.y=pl.ang;
  let sw=0;if(pl.estado==='acao'&&pl.acao){const a=pl.acao,k=pl.t;if(k<a.prep)sw=-1.2*(k/a.prep);else if(k<a.prep+a.exec)sw=-1.2+2.6*((k-a.prep)/a.exec);else sw=1.4*(1-Math.min(1,(k-a.prep-a.exec)/a.rec));}
  armaP.rotation.y=sw;armaP2.rotation.y=-sw*0.7;armaP.rotation.x=pl.bloq?-0.9:0;armaP.visible=!(P.arma==='machado_pequeno'&&pl.machadoFora>0);
  if(pl.estado==='saque'){armaP.rotation.y=-1.4;}
  if(pl.estado==='esquiva'){corpo.scale.y=0.6;cabeca.position.y=1.35;}else{corpo.scale.y=1;cabeca.position.y=1.85;}
  brilho.material.opacity=pl.abertura>0?0.8:(pl.imp>=70?0.35+0.25*Math.sin(performance.now()/150):0);brilho.material.color.setHex(pl.abertura>0?0xffd36a:0xc46bff);
  anelFirmar.material.opacity=pl.firmar>0?0.85:0;
  corpo.material.color.setHex(pl.mare>0?0x2f9e8e:0x2f5f9e);
  cristal.rotation.y+=dt;cristal.position.y=2.2+Math.sin(performance.now()/500)*0.15;
  for(const e of inimigos){if(e.morto&&!e.g.visible)continue;e.g.position.x=e.x;e.g.position.z=e.z;e.g.rotation.y=e.ang;
    if(e.golpeado>0){e.golpeado-=dt;e.g.position.x+=Math.sin(performance.now()/20)*0.06;}
    if(e.t!=='chefe'){e.bar.position.x=e.x;e.bar.position.z=e.z;e.bar.quaternion.copy(camera.quaternion);
      const fv=Math.max(0,e.vida/e.vidaMax),fp=Math.max(0,e.pos/e.T.pos);e.fr.scale.x=fv;e.fr.position.x=-(1-fv)*0.6;e.pr.scale.x=fp;e.pr.position.x=-(1-fp)*0.6;
      e.bar.visible=!e.morto&&(e.T.boneco||e.vida<e.vidaMax||e.estado==='perseguir');}}
  if(alvo&&!alvo.morto){anelAlvo.visible=true;anelAlvo.position.set(alvo.x,0.05,alvo.z);anelAlvo.scale.setScalar(alvo.T.raio*1.1+0.3);}else anelAlvo.visible=false;
  camera.position.set(pl.x+CAM_OFF.x,CAM_OFF.y,pl.z+CAM_OFF.z);camera.lookAt(pl.x,1,pl.z-1);
  for(let i=flut.length-1;i>=0;i--){const f=flut[i];f.t+=dt;f.p.y+=dt*1.4;tmpV.copy(f.p).project(camera);
    f.el.style.left=((tmpV.x+1)/2*innerWidth)+'px';f.el.style.top=((1-tmpV.y)/2*innerHeight)+'px';f.el.style.opacity=Math.max(0,1-f.t/1.1);if(f.t>1.1){f.el.remove();flut.splice(i,1);}}
  // HUD
  $('hVida').style.transform=`scaleX(${pl.vida/ST.vidaMax})`;$('tVida').textContent=`Vida ${fmt(Math.min(Math.ceil(pl.vida),Math.round(ST.vidaMax)))}/${fmt(ST.vidaMax)}`;
  $('hRes').style.transform=`scaleX(${pl.res/ST.resMax})`;$('tRes').textContent=`Resistência ${Math.floor(pl.res)}`;
  $('hEne').style.transform=`scaleX(${pl.ene/ST.eneMax})`;$('tEne').textContent=`Energia ${Math.floor(pl.ene)}`+(pl.cargas?` · Sobrecarga ${'◆'.repeat(pl.cargas)}`:'');
  const pm=ST.posMax*(1+buff('posMax'));$('hPos').style.transform=`scaleX(${pl.pos/pm})`;
  const div=pl.divida+pl.parcelas.reduce((s,p)=>s+p.v,0);$('hDiv').style.width=(100*Math.min(1,div/pm))+'%';
  $('tPos').textContent=`Postura ${Math.floor(pl.pos)}`+(div>0?` · dívida ${Math.ceil(div)}`:'')+(pl.barreira>0?` · barreira ${Math.ceil(pl.barreira)}`:'');
  $('hImp').style.transform=`scaleX(${pl.imp/100})`;$('tImp').textContent=`Ímpeto ${Math.floor(pl.imp)}${pl.imp>=70?' — gasto limpo':pl.imp>=20?' — pronto':''}`;
  $('hXp').style.transform=`scaleX(${P.nivel>=100?1:P.xp/XPnec(P.nivel)})`;
  let mec='';const A=ARMAS[P.arma];
  if(P.arma==='desarmado')mec=`Fluxo ${pl.fluxo}`;else if(P.arma==='duas_espadas')mec=`Ritmo ${pl.ritmo}/4`;else if(P.arma==='dois_machados')mec=`Frenesi ${pl.frenesi}`;
  else if(P.arma==='espada_longa')mec=`Guarda ${P.guarda}`;else if(P.arma==='katana'&&pl.estado==='saque')mec=`Saque ${Math.min(100,Math.round(pl.saqueT/1.2*100))}%`;
  $('info').innerHTML=`<span>Nv <b>${P.nivel}</b></span><span>${ARV[P.arma].nome}</span>${mec?`<span><b>${mec}</b></span>`:''}<span>Reserva <b>${fmt(pl.reserva)}</b></span>`+(pl.abertura>0?`<span><b>ABERTURA ${P.abertura}</b></span>`:'')+(pl.mare>0?'<span><b>Maré</b></span>':'');
  const ac=alvo&&!alvo.morto&&alvo.t!=='chefe';$('alvo').style.display=ac?'block':'none';
  if(ac){let dps='';if(alvo.T.boneco){const now=perf();alvo.danoLog=alvo.danoLog.filter(x=>now-x[0]<5);const tot=alvo.danoLog.reduce((s,x)=>s+x[1],0);const imp=alvo.danoLog.reduce((s,x)=>s+x[2],0);dps=` — dano/s ${fmt(tot/5)} · impacto/s ${fmt(imp/5,1)}`;}
    $('aNome').textContent=alvo.T.nome+(alvo.atord>0?' — atordoado':'')+dps;$('aVida').style.transform=`scaleX(${Math.max(0,alvo.vida/alvo.vidaMax)})`;$('aPos').style.transform=`scaleX(${Math.max(0,alvo.pos/alvo.T.pos)})`;
    $('aCont').innerHTML=(alvo.cont?`<span style="color:${CSS_EL[alvo.cont]}">● contato de ${NOME_EL[alvo.cont]}</span> `:'')+(alvo.marcaMachado>0?'<span style="color:#e8c46a">● marcado</span>':'');}
  const c=chefe();const mostra=c&&!c.morto&&Math.hypot(pl.x-ARENA.x,pl.z-ARENA.z)<ARENA.r+6;$('chefe').style.display=mostra?'block':'none';
  if(mostra){$('cVida').style.transform=`scaleX(${Math.max(0,c.vida/c.vidaMax)})`;$('cPos').style.transform=`scaleX(${Math.max(0,c.pos/c.T.pos)})`;}
  ['bT1','bT2','bT3','bT4'].forEach((id,i)=>{const k=P.prep.tec[pl.pag*4+i];const el=$(id);const cdk=k==='arte'?'arte':k;const mx=(pl.cdMax&&pl.cdMax[cdk])||1;el.querySelector('.cd').style.transform=`scaleY(${k?(pl.cds[cdk]||0)/mx:0})`;});
  if(P.prep.reac){const mx=(pl.cdMax&&pl.cdMax[P.prep.reac])||1;$('bReac').querySelector('.cd').style.transform=`scaleY(${(pl.cds[P.prep.reac]||0)/mx})`;}
  $('bCura').querySelector('.cd').style.transform=`scaleY(${(pl.cds.cura||0)/1.5})`;
  $('bImp').classList.toggle('sem',pl.imp<20);$('bCura').classList.toggle('sem',pl.reserva<=0);
  $('bCarga').textContent='Carga '+pl.usarCargas;$('bCarga').classList.toggle('on',pl.usarCargas>0);$('bMod').textContent=pl.modelagem;$('bMod').classList.toggle('on',pl.modelagem!=='Normal');
  $('bLer').textContent=pl.leituraCD>0?'Ler '+Math.ceil(pl.leituraCD):'Ler';$('bLer').classList.toggle('on',pl.leituraCD<=0);
}
function atualizarBotoes(){['bT1','bT2','bT3','bT4'].forEach((id,i)=>{const k=P.prep.tec[pl.pag*4+i];const el=$(id);const lb=el.querySelector('.lb');
    if(!k){lb.textContent='—';el.classList.add('vazio');return;}el.classList.remove('vazio');
    if(k==='arte'){const a=arteDados(P.arteEq);lb.textContent=a?a.nome:'Arte';el.style.borderColor='#ffd36a';return;}
    const no=noDe(k);lb.textContent=no?no.nome:'?';const arv=no&&ARV[no.arv];el.style.borderColor=arv&&arv.cat==='elem'?CSS_EL[arv.id]:'';
    el.classList.toggle('sem',!!(arv&&arv.cat==='arma'&&arv.id!==P.arma));});
  $('bPag').querySelector('.lb').textContent='Pág '+(pl.pag+1);
  const rk=P.prep.reac;$('bReac').querySelector('.lb').textContent=rk?noDe(rk).nome:'Reação';$('bReac').classList.toggle('vazio',!rk);
  $('bMec').style.display=P.arma==='espada_longa'?'':'none';}
function loop(){requestAnimationFrame(loop);let dt=Math.min(0.05,relogio.getDelta());
  if(!pausado){if(hitstop>0){hitstop-=dt;dt*=0.15;}passo(dt);}desenhar(pausado?0:dt);renderer.render(scene,camera);}

// =================== MENU ===================
let abaAtual='personagem',arvSel='espada_longa';
const ABAS=[['personagem','Personagem'],['arvore','Árvores'],['preparacao','Preparação'],['artes','Artes'],['teste','Teste'],['ajuda','Ajuda']];
function abrirMenu(){pausado=true;$('painel').style.display='flex';desenharMenu();}
function fecharMenu(){pausado=false;$('painel').style.display='none';recalcular(false);}
$('bMenu').addEventListener('click',abrirMenu);
function desenharMenu(){$('abas').innerHTML=ABAS.map(([id,n])=>`<button class="aba ${id===abaAtual?'sel':''}" data-aba="${id}">${n}</button>`).join('')+'<button class="aba" data-fechar="1" style="margin-left:auto;color:#1a1408;background:var(--ouro)">Voltar ao jogo</button>';
  const f={personagem:menuPersonagem,arvore:menuArvore,preparacao:menuPrep,artes:menuArtes,teste:menuTeste,ajuda:menuAjuda}[abaAtual];
  $('conteudo').innerHTML='<div class="col">'+f()+'</div>';}
$('abas').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;if(b.dataset.fechar){fecharMenu();return;}abaAtual=b.dataset.aba;desenharMenu();$('conteudo').scrollTop=0;});
function menuPersonagem(){const s=stats();const pts=PONTOS(P.nivel),g=pontosGastos();
  let h=`<h1>Nível ${P.nivel}</h1><p class="suave">XP ${fmt(P.xp)} / ${fmt(XPnec(P.nivel))} · camada de escala ${camada()} (s = ${fmt(S(),3)}) · PH ${phGastos()}/${PHtot(P.nivel)} · pontos de atributo ${fmt(g,1)}/${pts}</p>`;
  h+=`<h2>Atributos</h2><p class="suave">Custo de x pontos: x + x²/40 (núcleo B). Máximo +60 cada. r(x) = x/(x+40).</p>`;
  for(const a of ATR){const x=P.attrs[a];const prox=x<60?Ccusto(x+1)-Ccusto(x):0;
    h+=`<div class="atr"><b>${a}</b><span>+${x}</span><span class="suave">${ATR_NOME[a]} · r = ${fmt(rr(x),2)} · próximo ponto custa ${fmt(prox,2)}</span><span class="linha"><button class="b" data-at="${a}" data-d="-5">−5</button><button class="b" data-at="${a}" data-d="-1">−</button><button class="b pri" data-at="${a}" data-d="1">+</button><button class="b" data-at="${a}" data-d="5">+5</button></span></div>`;}
  const linhas=[['Vida',fmt(s.vidaMax),'1.000·s × (1 + 0,9·r(VIG))'],['Resistência',fmt(s.resMax),'100 × (1 + 0,6·r(VIG))'],['Energia',fmt(s.eneMax),'100 × (1 + 0,6·r(POT))'],['Regeneração de energia',fmt(s.regenE,2)+'/s','4 × (1 + r(CON))'],
    ['Postura',fmt(s.posMax),'100 × (1 + 0,8·r(VIG) + 0,4·r(FOR))'],['Recuperação de postura',fmt(s.regenPos,1)+'/s','10 × (1 + 0,4·r(VIG)), após 2 s'],['Reserva de cura',fmt(s.reserva),'600 × (1 + 0,8·r(VIG)) × s'],
    ['Velocidade de movimento',fmt(s.vel,2)+' m/s','5,5 × (1 + 0,10·r(DES) + 0,06·r(FOR))'],['Velocidade de ação (H)','×'+fmt(s.H,3),'1 + 0,35·r(DES), só preparo/recuperação'],['Preparo de conjuração (H_c)','×'+fmt(s.Hc,3),'1 + 0,25·r(CON)'],
    ['Janela de parry',fmt(s.parry*1000)+' ms','teto técnico 240 ms'],['Estabilidade de conjuração',fmt(s.estab*100)+'%','0,50·r(CON), teto 60%'],['Tenacidade',fmt(s.ten,1)+' p.p.','12·r(VIG), teto 30%'],
    ['Chance crítica',fmt(s.crit*100)+'%','base 5% (sem equipamento)'],['Dano crítico','×'+fmt(s.critD,2),'base'],['P_arma (teste)',fmt(s.Parma),'110 × s'],['Carga',fmt(s.carga,1),'12 + 0,3·FOR'],['Vazão de cura','×'+fmt(s.vazao,2),'1 + 0,20·r(POT)'],
    ['Ímpeto → impacto (FOR)','×'+fmt(1+80*(0.5+r('FOR'))/100,2)+' com 80','1 + Ímpeto × (0,5 + r(FOR))/100'],['Continuações (DES)',fmt(0.5+1.5*r('DES'),2)+' m de deslocamento','dano total × (1 + 3·r(DES))'],
    ['Firmar (VIG)','adia '+fmt((0.2+0.3*r('VIG'))*100)+'% · dívida máx. '+fmt(15+25*r('VIG'),1),'f = 0,20 + 0,30·r(VIG)'],['Sobrecarga (POT)','+'+fmt((0.08+0.12*r('POT'))*100,1)+'% por carga','0,08 + 0,12·r(POT)'],
    ['Modelagem (CON)','Expandir ×'+fmt(1.1+0.4*r('CON'),2)+' · Comprimir ×'+fmt(1.05+0.2*r('CON'),2)+' · Conduzir '+fmt((0.35+0.4*r('CON'))*100)+'%',''],['Abertura (PER)','Punir '+fmt(10+20*r('PER'))+'% · Desmontar +'+fmt(5+10*r('PER'),1)+' · Retomar +'+fmt(5+10*r('PER'),1),'']];
  h+=`<h2>Status</h2><table><tr><th>Status</th><th>Valor</th><th>Fórmula</th></tr>${linhas.map(l=>`<tr><td>${l[0]}</td><td class="n">${l[1]}</td><td class="suave">${l[2]}</td></tr>`).join('')}</table>`;
  h+=`<h2>Elementos</h2><p class="suave">Até ${maxElems()} elemento(s) no seu nível (2º no 30, 3º no 60).</p><div class="chips">${ORDEM_EL.map(e=>`<button class="chip ${P.elems.includes(e)?'sel':''}" data-el="${e}" ${!P.elems.includes(e)&&P.elems.length>=maxElems()?'disabled':''}>${NOME_EL[e]}${P.elems.includes(e)?' · '+fmt(potEl(e)*100)+'%':''}</button>`).join('')}</div>`;
  h+=`<h2>Arma</h2><div class="chips">${DADOS.armas.map(a=>`<button class="chip ${P.arma===a.id?'sel':''}" data-arma="${a.id}">${a.nome} · dom. ${Math.floor(P.dom[a.id]||0)}</button>`).join('')}</div>`;
  return h;}
function menuArvore(){const a=ARV[arvSel];
  let h=`<div class="linha"><label for="selArv">Árvore</label><select id="selArv">${[['Armas',DADOS.armas],['Elementos',DADOS.elems],['Disciplinas',DADOS.discs]].map(([g,l])=>`<optgroup label="${g}">${l.map(x=>`<option value="${x.id}" ${x.id===arvSel?'selected':''}>${x.nome}</option>`).join('')}</optgroup>`).join('')}<optgroup label="Atributos"><option value="_esp" ${arvSel==='_esp'?'selected':''}>Especializações e ligações</option></optgroup></select>
    <span class="suave">PH ${phGastos()}/${PHtot(P.nivel)} · livres <b style="color:var(--ouro)">${PHtot(P.nivel)-phGastos()}</b></span></div>`;
  if(arvSel==='_esp')return h+menuEsp();
  const dom=a.cat==='disc'?'(disciplina: exige nível)':`domínio ${Math.floor(P.dom[a.id]||0)}`;
  h+=`<h1>${a.nome}</h1><p class="suave">${a.desc} · ${dom} · ${phNaArvore(a.id)} PH gastos aqui${a.cat==='elem'&&!P.elems.includes(a.id)?' · <span class="ruim">elemento não escolhido (escolha em Personagem)</span>':''}</p>`;
  const ramos={};a.nos.forEach(n=>{(ramos[n.ramo]=ramos[n.ramo]||[]).push(n);});
  for(const rm in ramos){h+=`<div class="ramo"><h3>${rm}</h3><div class="grade">${ramos[rm].map(cardNo).join('')}</div></div>`;}
  return h;}
function podeComprar(no){const a=ARV[no.arv];if(P.comprados[no.key])return {ok:false,m:'comprado'};
  if(PHtot(P.nivel)-phGastos()<CUSTO_PH[no.tipo])return {ok:false,m:'PH insuficiente'};
  if(a.cat==='elem'&&!P.elems.includes(a.id))return {ok:false,m:'escolha este elemento'};
  for(const rf of no.refs)if(!P.comprados[no.arv+':'+rf])return {ok:false,m:'falta o nó '+String(rf).padStart(2,'0')};
  if(no.dom&&(P.dom[no.arv]||0)<no.dom)return {ok:false,m:`domínio ${no.dom} (tem ${Math.floor(P.dom[no.arv]||0)})`};
  if(no.nivel&&P.nivel<no.nivel)return {ok:false,m:'nível '+no.nivel};
  if(no.tipo==='Nó-chave'){const doRamo=a.nos.filter(x=>x.ramo===no.ramo&&x!==no&&P.comprados[x.key]);const ph=doRamo.reduce((s,x)=>s+CUSTO_PH[x.tipo],0);
    const tc=doRamo.filter(x=>x.tipo==='Técnica'||x.tipo==='Reação').length,ps=doRamo.filter(x=>x.tipo==='Passiva').length;
    if(ph<(no.phRamo||0)||tc<(no.kT||0)||ps<(no.kP||0))return {ok:false,m:`ramo: ${ph}/${no.phRamo} PH, ${tc}/${no.kT} téc., ${ps}/${no.kP} pas.`};}
  return {ok:true};}
function slotDe(no){if(no.tipo==='Técnica')return 'tec';if(no.tipo==='Reação')return 'reac';if(no.tipo==='Passiva')return 'pas';if(no.tipo==='Nó-chave')return 'chave';return 'transf';}
function estaPrep(key){const p=P.prep;return p.tec.includes(key)||p.reac===key||p.pas.includes(key)||p.chave.includes(key)||p.transf.includes(key);}
function cardNo(no){const comp=!!P.comprados[no.key];const pc=podeComprar(no);const prep=estaPrep(no.key);const s=nivelSim(no);
  let extra='';if(no.t){const t=tecFinal(no);extra=`<span class="req">forma no teste: ${({melee:'golpe corpo a corpo',area:'área',linha:'linha',proj:'projétil'})[t.forma]}${t.alc&&t.forma!=='melee'?' '+fmt(t.alc,1)+' m':''}${t.mods.length?' · modificada por: '+t.mods.join(', '):''}</span>`;}
  return `<div class="card ${comp?'comprado':''} ${prep?'prep':''}"><div class="cab"><b>${String(no.n).padStart(2,'0')} ${no.nome}</b><span class="tag t-${no.tipo}">${no.tipo} · ${CUSTO_PH[no.tipo]} PH</span></div>
  <div class="ef">${no.ef}</div><div class="req">Requisito: ${no.reqTxt||'—'}</div>${extra}<div class="sim ${s.c}">${s.txt}</div>
  <div class="acoes">${comp?`<button class="b ${prep?'':'pri'}" data-prep="${no.key}">${prep?'Tirar da preparação':'Preparar'}</button><button class="b" data-vender="${no.key}">Devolver PH</button>`:`<button class="b pri" data-comprar="${no.key}" ${pc.ok?'':'disabled'}>Comprar</button>${pc.ok?'':`<span class="req ruim">${pc.m}</span>`}`}</div></div>`;}
function menuEsp(){let h=`<h1>Especializações</h1><p class="suave">2 PH cada, ocupam 1 passiva, máx. 1 por atributo preparada; exigem o atributo nos marcos +15/+35/+55.</p><div class="grade">`;
  for(const e of DADOS.esp){const comp=!!P.esp[e.id];const ok=P.attrs[e.attr]>=e.marco;const prep=P.prep.pas.includes('esp:'+e.id);
    h+=`<div class="card ${comp?'comprado':''} ${prep?'prep':''}"><div class="cab"><b>${e.nome}</b><span class="tag">${e.attr} +${e.marco} · 2 PH</span></div><div class="ef">${e.ef}</div><div class="sim ${ESP_SIM.has(e.id)?'ok':'suave'}">${ESP_SIM.has(e.id)?'Simulada':'Ainda só descrição'}</div>
    <div class="acoes">${comp?`<button class="b ${prep?'':'pri'}" data-prepx="esp:${e.id}">${prep?'Tirar':'Preparar'}</button><button class="b" data-venderx="esp:${e.id}">Devolver PH</button>`:`<button class="b pri" data-comprarx="esp:${e.id}" ${ok&&PHtot(P.nivel)-phGastos()>=2?'':'disabled'}>Comprar</button>${ok?'':`<span class="req ruim">precisa ${e.attr} +${e.marco}</span>`}`}</div></div>`;}
  h+=`</div><h1>Ligações</h1><p class="suave">2 PH, ocupam 1 passiva, só 1 preparada; exigem +15 nos dois atributos.</p><div class="grade">`;
  for(const l of DADOS.lig){const comp=!!P.lig[l.id];const ok=P.attrs[l.a]>=15&&P.attrs[l.b]>=15;const prep=P.prep.pas.includes('lig:'+l.id);
    h+=`<div class="card ${comp?'comprado':''} ${prep?'prep':''}"><div class="cab"><b>${l.nome}</b><span class="tag">${l.a}–${l.b} · 2 PH</span></div><div class="ef">${l.ef}</div><div class="sim ${LIG_SIM.has(l.id)?'ok':'suave'}">${LIG_SIM.has(l.id)?'Simulada':'Ainda só descrição'}</div>
    <div class="acoes">${comp?`<button class="b ${prep?'':'pri'}" data-prepx="lig:${l.id}">${prep?'Tirar':'Preparar'}</button><button class="b" data-venderx="lig:${l.id}">Devolver PH</button>`:`<button class="b pri" data-comprarx="lig:${l.id}" ${ok&&PHtot(P.nivel)-phGastos()>=2?'':'disabled'}>Comprar</button>${ok?'':`<span class="req ruim">precisa ${l.a} e ${l.b} +15</span>`}`}</div></div>`;}
  return h+'</div>';}
function nomeSlot(k){if(!k)return '<span class="suave">vazio</span>';if(k==='arte'){const a=arteDados(P.arteEq);return 'Arte: '+(a?a.nome:'—');}
  if(k.startsWith('esp:'))return 'Especialização: '+ESP[k.slice(4)].nome;if(k.startsWith('lig:'))return 'Ligação: '+LIG[k.slice(4)].nome;const n=noDe(k);return n?`${n.nome} <span class="suave">(${ARV[n.arv].nome})</span>`:'?';}
function menuPrep(){const p=P.prep;
  const bloco=(tit,arr,campo)=>`<h2>${tit}</h2>`+arr.map((k,i)=>`<div class="slot ${k?'cheio':''}"><span>${i+1}. ${nomeSlot(k)}</span>${k?`<button class="b" data-tirar="${campo}:${i}">Tirar</button>`:''}</div>`).join('');
  let h=`<h1>Preparação</h1><p class="suave">8 técnicas (a Arte ocupa 1) + 1 reação + 6 passivas (inclui especialização e ligação) + 2 nós-chave (máx. 1 por árvore) + 3 transformações (máx. 1 por técnica). Prepare pelos cards das árvores.</p>`;
  h+=bloco('Técnicas (botões: página 1 = 1–4, página 2 = 5–8)',p.tec,'tec');
  h+=`<h2>Reação</h2><div class="slot ${p.reac?'cheio':''}"><span>${nomeSlot(p.reac)}</span>${p.reac?'<button class="b" data-tirar="reac:0">Tirar</button>':''}</div>`;
  h+=bloco('Passivas',p.pas,'pas')+bloco('Nós-chave',p.chave,'chave')+bloco('Transformações',p.transf,'transf');
  h+=`<h2>Uso da Abertura (PER)</h2><div class="chips">${['Punir','Desmontar','Retomar'].map(u=>`<button class="chip ${P.abertura===u?'sel':''}" data-ab="${u}">${u}</button>`).join('')}</div>`;
  h+=`<h2>Reações elementais preparadas</h2>`;
  const els=P.elems;let pares=[];for(let i=0;i<els.length;i++)for(let j=i+1;j<els.length;j++)pares.push(parKey(els[i],els[j]));
  if(!pares.length)h+='<p class="suave">Com 2 ou 3 elementos (nível 30 e 60) e os troncos comprados, as reações aparecem aqui. Para testar já, use a aba Teste.</p>';
  for(const [A,B] of pares){const ch=A+'+'+B;const fd=formasDisp(A,B);const lista=DADOS.reacoes[ch];let idx=P.formas[ch]??1;
    h+=`<div class="card"><div class="cab"><b>${NOME_EL[A]} + ${NOME_EL[B]}</b><span class="tag">p = ${fmt(fd.p,2)} · ${temTronco(A)&&temTronco(B)?'<span class="ok">troncos ok</span>':'<span class="ruim">falta tronco</span>'}</span></div>
      <div class="chips">${lista.map((f,i)=>{const disp=i===0?fd.dom:i===2?fd.bdom:true;return `<button class="chip ${idx===i?'sel':''}" data-forma="${ch}:${i}" ${disp?'':'disabled'} title="${f.ef}">${f.nome}</button>`;}).join('')}</div>
      <div class="ef">${lista[idx]?lista[idx].ef:''}</div><div class="req">${NOME_EL[A]} dominante precisa p ≥ 0,70 · ${NOME_EL[B]} dominante precisa p ≤ 0,30 · Equilíbrio sempre</div></div>`;}
  return h;}
function menuArtes(){let h=`<h1>Artes Únicas</h1><p class="suave">Escondidas. O Leitor de Estilo mede o seu jeito de lutar por encontro; quando 2 métricas da Arte passam de 0,55 e você tem os atributos da rota de estilo, ela aparece. 1 Arte preparada, ocupa 1 técnica.</p><h2>Leitor de Estilo</h2><table>`;
  for(const d of DIMS){const v=P.leitor[d];h+=`<tr><td>${d}</td><td class="n">${v==null?'<span class="suave">sem dados</span>':fmt(v,2)}</td><td><div class="barra" style="height:8px"><i style="background:var(--ouro);transform:scaleX(${v||0})"></i></div></td></tr>`;}
  h+=`</table>${enc?`<p class="suave">Encontro em andamento: ${fmt(enc.t,0)} s</p>`:''}<div class="grade">`;
  for(const a of DADOS.artes){const tem=P.artes[a.n]||P.teste.revelar;const prep=P.arteEq===a.n;
    h+=`<div class="card ${tem?'comprado':''} ${prep?'prep':''}"><div class="cab"><b>${tem?a.n+'. '+a.nome:a.n+'. ???'}</b><span class="tag">${a.fam}</span></div>`+
      (tem?`<div class="ef"><b>Ativação:</b> ${a.ativ}</div><div class="ef"><b>Efeito:</b> ${a.ef}</div><div class="req">Preço: ${a.preco}</div><div class="sim ${ARTE_SIM.has(a.n)?'ok':'suave'}">${ARTE_SIM.has(a.n)?'Simulada (versão de teste)':'Ainda só descrição'}</div>
      <div class="acoes"><button class="b ${prep?'':'pri'}" data-arte="${a.n}">${prep?'Tirar':'Preparar'}</button></div>`
      :`<div class="req">Pista: ${a.mets.join(' + ')} · ${a.attrs.map(x=>x[0]+' +'+x[1]).join(' / ')}</div>`)+`</div>`;}
  return h+'</div>';}
function menuTeste(){const t=P.teste;
  return `<h1>Ferramentas de teste</h1><p class="suave">Para testar nível por nível sem ter que grindar. O jogo final não terá isso.</p>
  <div class="card"><div class="cab"><b>Nível</b><span class="tag">atual ${P.nivel}</span></div><div class="acoes"><button class="b pri" data-t="nv1">+1 nível</button><button class="b" data-t="nv5">+5</button><button class="b" data-t="nv10">+10</button><button class="b" data-t="nv100">Nível 100</button><button class="b" data-t="nvm1">−1 nível</button></div></div>
  <div class="card"><div class="cab"><b>XP por abate</b><span class="tag">×${t.xp}</span></div><div class="chips">${[1,5,20].map(v=>`<button class="chip ${t.xp===v?'sel':''}" data-txp="${v}">×${v}${v===1?' (normal)':''}</button>`).join('')}</div></div>
  <div class="card"><div class="cab"><b>Velocidade do domínio</b><span class="tag">×${t.dom}</span></div><div class="chips">${[1,30,200].map(v=>`<button class="chip ${t.dom===v?'sel':''}" data-tdom="${v}">×${v}${v===1?' (normal: ~8 h até 50)':''}</button>`).join('')}</div>
    <div class="acoes"><button class="b" data-t="dom100">Domínio 100 em tudo</button><button class="b" data-t="dom0">Zerar domínio</button></div></div>
  <div class="card"><div class="cab"><b>Respec</b></div><div class="acoes"><button class="b" data-t="resatr">Devolver todos os atributos</button><button class="b" data-t="resph">Devolver todos os PH</button><button class="b" data-t="troncos">Comprar troncos dos meus elementos</button></div></div>
  <div class="card"><div class="cab"><b>Artes</b></div><div class="acoes"><button class="b ${t.revelar?'pri':''}" data-t="revelar">${t.revelar?'Esconder Artes não descobertas':'Revelar todas as Artes'}</button><button class="b" data-t="leitor0">Zerar Leitor</button></div></div>
  <div class="card"><div class="cab"><b>Começar do zero</b></div><div class="acoes"><button class="b" data-t="reset">Apagar personagem</button></div></div>`;}
function menuAjuda(){return `<h1>Como testar</h1>
  <p>1. Em <b>Teste</b>, suba o nível. 2. Em <b>Personagem</b>, distribua atributos e veja os status mudarem. 3. Em <b>Árvores</b>, compre nós (PH, requisitos e domínio são os do documento) e toque em <b>Preparar</b>. 4. Volte ao jogo: as técnicas aparecem nos botões (Pág troca 1–4 / 5–8). 5. Use os <b>bonecos de treino</b> (leste do Santuário): mostram dano/s e impacto/s.</p>
  <h2>Controles</h2><table>
  <tr><td>Ataque</td><td>toque = leve · segure = pesado · continue segurando no preparo = <b>Firmar o golpe</b> (FOR) · arco: segure = tensão · machado grande: segure = carga</td></tr>
  <tr><td>Esquiva</td><td>esquiva perfeita = +20 Ímpeto · durante Firmar = <b>Ceder</b> (VIG)</td></tr>
  <tr><td>Defesa</td><td>toque na hora = parry · segure = bloqueio · tocar de novo bloqueando = <b>Firmar</b> (VIG) · katana: segure e solte = saque</td></tr>
  <tr><td>Golpe Ímpeto</td><td>com 20+: golpe + continuações (DES) na direção do joystick; 70+ = gasto limpo</td></tr>
  <tr><td>Ler</td><td>marca o ataque avisado do inimigo; responder certo (parry, esquiva perfeita, bloqueio) = <b>Abertura</b> (PER)</td></tr>
  <tr><td>Carga</td><td>quantas cargas de Sobrecarga (POT) gastar na próxima magia</td></tr>
  <tr><td>Modelagem</td><td>Normal / Expandir / Comprimir / Conduzir (CON) nas magias</td></tr>
  <tr><td>Reação</td><td>a técnica do espaço de reação</td></tr>
  <tr><td>Teclado</td><td>WASD · J ataque · K esquiva · L defesa · I Ímpeto · 1–8 técnicas · E reação · R ler · C carga · Q cura · Tab alvo · G guarda · M menu</td></tr></table>
  <h2>O que é simplificado</h2><p class="suave">As 196 técnicas usam os números do documento (K, impacto, tempo, custo, recarga) e uma forma genérica (golpe, área, linha ou projétil). Efeitos especiais escritos em texto livre ainda não rodam; cada card diz o que está simulado. Passivas e transformações aplicam mudanças de custo, recarga, K e impacto quando o texto tem esses números. Sem equipamento: crítico e penetração ficam na base.</p>`;}
$('conteudo').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.at){const a=d.at,dv=+d.d;for(let i=0;i<Math.abs(dv);i++){if(dv>0){if(P.attrs[a]>=60)break;const novo=pontosGastos()-Ccusto(P.attrs[a])+Ccusto(P.attrs[a]+1);if(novo>PONTOS(P.nivel)+1e-9)break;P.attrs[a]++;}else{if(P.attrs[a]<=0)break;P.attrs[a]--;}}
    validarPrep();}
  else if(d.el){const e=d.el;if(P.elems.includes(e)){if(P.elems.length>1)P.elems=P.elems.filter(x=>x!==e);}else if(P.elems.length<maxElems())P.elems.push(e);validarPrep();}
  else if(d.arma){P.arma=d.arma;pl.fluxo=0;pl.ritmo=0;pl.frenesi=0;}
  else if(d.comprar){const no=noDe(d.comprar);if(podeComprar(no).ok)P.comprados[no.key]=true;}
  else if(d.vender){venderNo(d.vender);}
  else if(d.prep){togglePrep(d.prep);}
  else if(d.comprarx){const [tp,id]=d.comprarx.split(':');if(PHtot(P.nivel)-phGastos()>=2)(tp==='esp'?P.esp:P.lig)[id]=true;}
  else if(d.venderx){const [tp,id]=d.venderx.split(':');delete (tp==='esp'?P.esp:P.lig)[id];P.prep.pas=P.prep.pas.map(k=>k===d.venderx?null:k);}
  else if(d.prepx){togglePrep(d.prepx);}
  else if(d.tirar){const [c,i]=d.tirar.split(':');if(c==='reac')P.prep.reac=null;else{if(P.prep[c][+i]==='arte')P.arteEq=null;P.prep[c][+i]=null;}}
  else if(d.ab){P.abertura=d.ab;}
  else if(d.forma){const [ch,i]=d.forma.split(':');P.formas[ch]=+i;}
  else if(d.arte){const n=+d.arte;if(P.arteEq===n){P.arteEq=null;P.prep.tec=P.prep.tec.map(k=>k==='arte'?null:k);}else{P.arteEq=n;if(!P.prep.tec.includes('arte')){const i=P.prep.tec.indexOf(null);if(i<0){aviso('Técnicas cheias: tire uma para a Arte',1.5);P.arteEq=null;}else P.prep.tec[i]='arte';}}}
  else if(d.txp){P.teste.xp=+d.txp;}
  else if(d.tdom){P.teste.dom=+d.tdom;}
  else if(d.t){const t=d.t;
    if(t.startsWith('nv')&&t!=='nvm1'){const n=t==='nv100'?100-P.nivel:+t.slice(2);P.nivel=Math.min(100,P.nivel+n);P.xp=0;}
    if(t==='nvm1'){P.nivel=Math.max(1,P.nivel-1);P.xp=0;while(pontosGastos()>PONTOS(P.nivel)){const a=ATR.reduce((m,x)=>P.attrs[x]>P.attrs[m]?x:m,'FOR');P.attrs[a]--;}while(phGastos()>PHtot(P.nivel)){const k=Object.keys(P.comprados).pop();if(!k)break;venderNo(k);}while(P.elems.length>maxElems())P.elems.pop();}
    if(t==='dom100'){TODAS.forEach(a=>P.dom[a.id]=100);}if(t==='dom0'){P.dom={};}
    if(t==='resatr'){ATR.forEach(a=>P.attrs[a]=0);validarPrep();}
    if(t==='resph'){P.comprados={};P.esp={};P.lig={};P.prep=PADRAO().prep;P.arteEq=null;}
    if(t==='troncos'){for(const e of P.elems)for(let i=1;i<=6;i++){const no=ARV[e].porN[i];if(!P.comprados[no.key]&&PHtot(P.nivel)-phGastos()>=CUSTO_PH[no.tipo]&&no.refs.every(rf=>P.comprados[e+':'+rf]))P.comprados[no.key]=true;}
      for(const e of P.elems)if(!temTronco(e)){P.dom[e]=Math.max(P.dom[e]||0,20);for(let i=1;i<=6;i++){const no=ARV[e].porN[i];if(!P.comprados[no.key]&&PHtot(P.nivel)-phGastos()>=CUSTO_PH[no.tipo])P.comprados[no.key]=true;}}}
    if(t==='revelar')P.teste.revelar=!P.teste.revelar;if(t==='leitor0')P.leitor={};
    if(t==='reset'){P=PADRAO();}
    recalcular(true);}
  salvar();ST=stats();desenharMenu();});
$('conteudo').addEventListener('change',ev=>{if(ev.target.id==='selArv'){arvSel=ev.target.value;desenharMenu();$('conteudo').scrollTop=0;}});
function venderNo(key){const no=noDe(key);if(!no)return;
  const dependentes=ARV[no.arv].nos.filter(x=>P.comprados[x.key]&&x.refs.includes(no.n));for(const dd of dependentes)venderNo(dd.key);
  delete P.comprados[key];const p=P.prep;p.tec=p.tec.map(k=>k===key?null:k);if(p.reac===key)p.reac=null;p.pas=p.pas.map(k=>k===key?null:k);p.chave=p.chave.map(k=>k===key?null:k);p.transf=p.transf.map(k=>k===key?null:k);}
function togglePrep(key){const p=P.prep;
  if(estaPrep(key)){p.tec=p.tec.map(k=>k===key?null:k);if(p.reac===key)p.reac=null;p.pas=p.pas.map(k=>k===key?null:k);p.chave=p.chave.map(k=>k===key?null:k);p.transf=p.transf.map(k=>k===key?null:k);return;}
  if(key.startsWith('esp:')||key.startsWith('lig:')){const tp=key.slice(0,3);
    if(tp==='lig'&&p.pas.some(k=>k&&k.startsWith('lig:'))){aviso('Só 1 ligação preparada',1.2);return;}
    if(tp==='esp'){const at=ESP[key.slice(4)].attr;if(p.pas.some(k=>k&&k.startsWith('esp:')&&ESP[k.slice(4)].attr===at)){aviso('Só 1 especialização por atributo',1.2);return;}}
    const i=p.pas.indexOf(null);if(i<0){aviso('Passivas cheias (6)',1.2);return;}p.pas[i]=key;return;}
  const no=noDe(key);const sl=slotDe(no);
  if(sl==='reac'){p.reac=key;return;}
  if(sl==='chave'){if(p.chave.some(k=>k&&noDe(k).arv===no.arv)){aviso('Máx. 1 nó-chave por árvore',1.2);return;}}
  if(sl==='transf'){if(p.transf.some(k=>k&&noDe(k).arv===no.arv&&noDe(k).refs[0]===no.refs[0])){aviso('Máx. 1 transformação por técnica',1.2);return;}}
  const arr=p[sl];const i=arr.indexOf(null);if(i<0){aviso('Espaços cheios: tire um em Preparação',1.4);return;}arr[i]=key;}
function validarPrep(){const p=P.prep;p.pas=p.pas.map(k=>{if(!k)return k;if(k.startsWith('esp:')){const e=ESP[k.slice(4)];return P.attrs[e.attr]>=e.marco?k:k;}if(k.startsWith('lig:')){return k;}return k;});}
function vitoria(){pausado=true;$('telaCaixa').innerHTML='<h1>Andar 1 liberado</h1><p>Você derrotou o Guardião do Andar 1.</p><p class="suave">Abates: '+P.abates+'</p><button class="b pri" id="bDeNovo">Continuar testando</button>';$('tela').style.display='block';
  $('bDeNovo').addEventListener('click',()=>{$('tela').style.display='none';pausado=false;const c=chefe();if(c){c.morto=false;c.vida=c.vidaMax;c.pos=c.T.pos;c.x=c.sx;c.z=c.sz;c.g.visible=true;c.g.rotation.z=0;c.g.position.y=0;c.fase=1;c.estado='parado';}});}

// prep inicial para quem começa do zero
if(!Object.keys(P.comprados).length&&P.nivel===1){P.comprados['espada_longa:1']=true;P.comprados['fogo:1']=true;P.prep.tec[0]='espada_longa:1';P.prep.tec[1]='fogo:1';P.dom.espada_longa=P.dom.espada_longa||0;}
recalcular(true);atualizarBotoes();
aviso('Teste de personagem<br><small>Menu → Teste para subir nível · Árvores para comprar nós</small>',3.5);
loop();
})();
