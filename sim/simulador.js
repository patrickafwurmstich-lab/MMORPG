// Simulador de equilíbrio da árvore (loop 3) — usa os mesmos dados do protótipo (prototipo/v2/dados.js)
// e as fórmulas do núcleo v8 + 00-sistema. Uso: node sim/simulador.js  → escreve sim/resultado/*.md e *.csv
"use strict";
const fs=require('fs'),path=require('path'),vm=require('vm');
const RAIZ=path.join(__dirname,'..');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(RAIZ,'prototipo/v2/dados.js'),'utf8')+';this.DADOS=DADOS;',ctx);
const D=ctx.DADOS;
const OUT=path.join(__dirname,'resultado');fs.mkdirSync(OUT,{recursive:true});

// ---------------- fórmulas ----------------
const ATR=['FOR','DES','VIG','POT','CON','PER'];
const rr=x=>x/(x+40), Cc=x=>x+x*x/40;
const CUSTO_PH={'Técnica':2,'Reação':2,'Passiva':1,'Transformação':2,'Nó-chave':3};
const ARMAS={
 desarmado:{alc:1.4,lK:.45,lT:.45,pK:1.10,pT:.95,lI:8,pI:22,bloq:.8,h:1},
 espada_curta:{alc:1.8,lK:.55,lT:.55,pK:1.25,pT:1.00,lI:9,pI:22,bloq:1,h:1,flanco:1},
 espada_longa:{alc:2.3,lK:.62,lT:.68,pK:1.45,pT:1.20,lI:10,pI:26,bloq:1,h:1},
 duas_espadas:{alc:2.0,lK:.40,lT:.70,pK:1.30,pT:1.10,lI:6,pI:22,bloq:0,h:2,ritmo:1},
 espada_e_escudo:{alc:2.0,lK:.58,lT:.65,pK:1.35,pT:1.15,lI:10,pI:24,bloq:1.33,h:1},
 katana:{alc:2.4,lK:.65,lT:.62,pK:1.50,pT:1.10,lI:9,pI:24,bloq:0,h:1},
 duas_katanas:{alc:2.2,lK:.42,lT:.72,pK:1.35,pT:1.15,lI:6,pI:22,bloq:0,h:2},
 machado_grande:{alc:2.6,lK:.85,lT:1.00,pK:1.90,pT:1.70,lI:15,pI:40,bloq:1.3,h:1},
 machado_pequeno:{alc:1.7,lK:.58,lT:.60,pK:1.25,pT:1.05,lI:10,pI:24,bloq:1,h:1,marca:1},
 dois_machados:{alc:1.8,lK:.38,lT:.66,pK:1.25,pT:1.05,lI:6,pI:24,bloq:0,h:2,frenesi:1},
 arco:{alc:30,lK:.55,lT:.70,pK:1.50,pT:1.20,lI:6,pI:12,bloq:0,h:1,dist:1}
};
const PESOS={leve:{FOR:.3,DES:.7},pesado:{FOR:.8,DES:.2},arma:{FOR:.5,DES:.5},imbuir:{FOR:.5,DES:.1,POT:.4},disparo:{DES:.4,POT:.4,CON:.2},arco:{DES:.7,PER:.3},conj:{POT:.6,CON:.4},disc:{FOR:.5,VIG:.5}};
const ARV={};[...D.armas,...D.elems,...D.discs].forEach(a=>{ARV[a.id]=a;a.porN={};a.nos.forEach(n=>{a.porN[n.n]=n;n.arv=a.id;n.key=a.id+':'+n.n;});});

// forma da técnica (mesma regra do protótipo)
function forma(no){const t=no.t,txt=(t.txt||'').toLowerCase(),cat=ARV[no.arv].cat;let f=t.forma,alc=t.alc||0;
  if(f==='linha'){}else if(f==='area'||(/área|anel|nuvem|zona|cone/.test(txt)&&t.m1>0)){f='area';alc=alc||t.m1;}
  else if(f==='proj'||(cat==='elem'&&t.m1>=5)||(no.arv==='arco'&&!t.volta&&!/rolamento|salto|armadilha/.test(txt))){f='proj';}
  else if(cat==='elem'&&t.m1>0){f='area';alc=t.m1;}else if(t.volta){f='area';alc=Math.max(2.5,t.m1||2.5);}else f='melee';
  return {f,alc,multi:f==='area'||f==='linha'||t.atravessa||/salt|cadeia|até \d alvos|em volta/.test(txt)};}
function peso(no){const t=no.t,cat=ARV[no.arv].cat,txt=(t.txt||'').toLowerCase();return cat==='elem'?'conj':(no.arv==='arco'?(t.rec==='E'?'disparo':'arco'):(cat==='disc'?'disc':(/imbu/.test(txt)?'imbuir':'arma')));}
const condicional=no=>/só inicia|só contra|só pelo flanco|contra alvo (exposto|atordoado|marcado|lento|queimando)|se o alvo|depois de (um )?parry|após (um )?parry/.test((no.t.txt||'').toLowerCase());

// ---------------- builds ----------------
function distribuir(nivel,alvos){ // alvos: [[atr,max],...] em ordem de prioridade; resto em VIG
  const tot=20+3*(nivel-1);const a={FOR:0,DES:0,VIG:0,POT:0,CON:0,PER:0};let g=0;
  for(const [at,mx] of alvos){while(a[at]<mx){const c=Cc(a[at]+1)-Cc(a[at]);if(g+c>tot)break;a[at]++;g+=c;}}
  for(const at of (nivelRef.ref?[]:['VIG','DES','FOR','POT'])){while(a[at]<60){const c=Cc(a[at]+1)-Cc(a[at]);if(g+c>tot)break;a[at]++;g+=c;}}
  return a;}
const PERFIS={
  'Força':[['FOR',60],['VIG',40]],
  'Destreza':[['DES',60],['FOR',30],['VIG',30]],
  'Força+Destreza':[['FOR',60],['DES',60]],
  'Tanque':[['VIG',60],['FOR',45]],
  'Leitor (PER)':[['PER',60],['DES',50]],
  'Mago':[['POT',60],['CON',60]],
  'Lâmina mágica':[['FOR',45],['POT',45],['DES',30]],
  'Generalista':[['FOR',30],['DES',30],['VIG',30],['POT',30],['CON',30],['PER',30]]
};
let nivelRef={nivel:100,ph:103,s:Math.pow(1.09,9),ref:false};

// custo em PH para comprar um nó + pré-requisitos ainda não comprados
function cadeia(no,comprados,acc){acc=acc||new Set();if(comprados.has(no.key)||acc.has(no.key))return acc;for(const rf of no.refs){const p=ARV[no.arv].porN[rf];if(p)cadeia(p,comprados,acc);}acc.add(no.key);return acc;}
function phDe(keys){let s=0;for(const k of keys){const [a,n]=k.split(':');s+=CUSTO_PH[ARV[a].porN[+n].tipo];}return s;}

// valor de uma técnica para um perfil (dano por segundo de execução, só alvo único sem condição)
function r(a,at){return rr(a[at]||0);}
function mult(a,p){let s=0;for(const k in PESOS[p])s+=PESOS[p][k]*r(a,k);return 1+s;}
function tempoAcao(T,a,magico){const H=1+0.35*r(a,'DES'),Hc=1+0.25*r(a,'CON');return magico?T*(0.35/Hc+0.2+0.45/H):T*(0.35/H+0.2+0.45/H);}
function valorTec(no,a,cenario){const t=no.t;if(!t.K||t.K<=0)return 0;if(condicional(no))return 0;const fm=forma(no);
  const alvos=cenario==='grupo'&&fm.multi?4:1;const T=tempoAcao(t.tempo<0.4?0.5:t.tempo,a,t.rec==='E'||ARV[no.arv].cat==='elem');
  return t.K*mult(a,peso(no))*alvos/T;}

function perfilRef(perfil){ // nível 15: principal +20, secundário +15, VIG +10 (núcleo A.7)
  const pr=PERFIS[perfil];if(perfil==='Generalista')return pr.map(([a])=>[a,9]);if(perfil==='Tanque')return [['VIG',20],['FOR',15]];return [[pr[0][0],20],[pr[1][0],15],['VIG',10]];}
function montarBuild(arma,perfil,elems,cenario){
  const a=distribuir(nivelRef.nivel,nivelRef.ref?perfilRef(perfil):PERFIS[perfil]);
  const comprados=new Set();let ph=nivelRef.ph;
  for(const e of elems)for(let i=1;i<=6;i++){const no=ARV[e].porN[i];const c=cadeia(no,comprados);const cst=phDe(c);if(cst<=ph){c.forEach(k=>comprados.add(k));ph-=cst;}}
  // técnicas candidatas: arma + elementos
  const cand=[];for(const id of [arma,...elems])for(const no of ARV[id].nos)if(no.t&&no.tipo==='Técnica')cand.push(no);
  const tec=[];
  // começa pelas técnicas dos troncos dos elementos já compradas
  while(tec.length<8){let melhor=null,mv=0;for(const no of cand){if(tec.includes(no))continue;const c=cadeia(no,comprados);const cst=phDe(c);if(cst>ph)continue;
      const v=valorTec(no,a,cenario)*(no.t.rec==='E'?1:1)/Math.max(1,cst*0.25+1);if(v>mv){mv=v;melhor=no;}}
    if(!melhor)break;const c=cadeia(melhor,comprados);ph-=phDe(c);c.forEach(k=>comprados.add(k));tec.push(melhor);}
  // transformações com números que melhoram técnicas escolhidas
  const transf=[];for(const id of [arma,...elems])for(const no of ARV[id].nos){if(no.tipo!=='Transformação'||transf.length>=3)continue;const alvoT=tec.find(x=>x.arv===no.arv&&x.n===no.refs[0]);if(!alvoT)continue;
    const m=no.m||{};const melhora=(m.K&&m.K>alvoT.t.K)||(m.cd&&m.cd<alvoT.t.cd)||(m.custo!=null&&m.custo<alvoT.t.custo);if(!melhora)continue;const c=cadeia(no,comprados);const cst=phDe(c);if(cst<=ph){ph-=cst;c.forEach(k=>comprados.add(k));transf.push(no);}}
  return {arma,perfil,elems,a,tec,transf,phSobra:ph,comprados};}
function tecFinal(no,build){const t=Object.assign({},no.t);t.K=t.K||0;for(const tr of build.transf){if(tr.arv===no.arv&&tr.refs[0]===no.n){const m=tr.m||{};if(m.K!=null)t.K=m.K;if(m.cd!=null)t.cd=m.cd;if(m.custo!=null)t.custo=m.custo;if(m.I!=null)t.I=m.I;}}if(t.tempo<0.4)t.tempo=0.5;return t;}

// ---------------- simulação ----------------
// perfis de habilidade do jogador contra ataques: perfeita (esquiva perfeita/parry), esquiva comum, bloqueio, levou o golpe
const HAB={'médio':{perf:.30,esq:.40,bloq:.15,hit:.15},'bom':{perf:.55,esq:.30,bloq:.10,hit:.05}};
function simular(b,cen,dur,hab){
  const a=b.a,s=nivelRef.s,A=ARMAS[b.arma];const P=110*s;
  const vidaMax=1000*s*(1+0.9*r(a,'VIG')),resMax=100*(1+0.6*r(a,'VIG')),eneMax=100*(1+0.6*r(a,'POT')),regE=4*(1+r(a,'CON'));
  const posMax=100*(1+0.8*r(a,'VIG')+0.4*r(a,'FOR'));let reserva=600*(1+0.8*r(a,'VIG'))*s;
  // alvos
  // contratos v8 AI.2/AI.3: armadura de referência 50·s; fera 650·s; constructo 1.100·s; Chefe de Andar 120.000·s para 6 → 20.000·s por jogador (postura 1.000/6)
  let alvos;if(cen==='boneco')alvos=[{vida:Infinity,pos:300,posMax:300,A:50*s,regen:36}];
  else if(cen==='chefe')alvos=[{vida:20000*s,pos:1000/6,posMax:1000/6,A:50*s,regen:20,chefe:1}];
  else if(cen==='fera')alvos=[{vida:650*s,pos:60,posMax:60,A:50*s,regen:7}];
  else if(cen==='constructo')alvos=[{vida:1100*s,pos:170,posMax:170,A:50*s,regen:20}];
  else alvos=[0,1,2,3].map(()=>({vida:650*s,pos:60,posMax:60,A:50*s,regen:7}));
  let semEne=0,basicoForcado=0,acoes=0,reacoesUsadas=0;let t=0,res=resMax,ene=eneMax,imp=0,vida=vidaMax,cargas=0,cargaT=0,ganhoCarga=-9,dano=0,impTot=0,quebras=0,morto=false,curas=0;
  const cd={};let armRed=0,armRedT=0,aberturaPend=false,proxLeitura=0,ultEl=null,reacCD=0,frenesi=0,ritmo=0;
  const elems=b.elems,temReacao=elems.length>=2&&elems.every(e=>[1,2,3,4,5,6].every(n=>b.comprados.has(e+':'+n)));let contEl=null,contT=-9,reacCtrlCD=0;
  const ORD=['fogo','gelo','raio','terra','vento','agua'];const phEl=e=>phDe([...b.comprados].filter(k=>k.startsWith(e+':')));
  function formaReacao(x,y){const [A,B]=ORD.indexOf(x)<ORD.indexOf(y)?[x,y]:[y,x];const L=D.reacoes[A+'+'+B];if(!L)return null;const p=phEl(A)/Math.max(1,phEl(A)+phEl(B));const disp=[1];if(p>=0.7)disp.push(0);if(p<=0.3)disp.push(2);
    let m=null,mv=-1;for(const i of disp){const fx=L[i].fx||{};const v=(fx.K||0)*(fx.r&&cen==='grupo'?4:1)+(fx.I||0)*0.01+(fx.pos||0)*0.01;if(v>mv){mv=v;m=fx;}}return m;}const qEl={};{const ph={};let tot=0;for(const e of elems){ph[e]=phDe([...b.comprados].filter(k=>k.startsWith(e+':')));tot+=ph[e];}for(const e of elems)qEl[e]=elems.length===1?1:0.6+0.4*ph[e]/Math.max(1,tot);}
  const tecs=b.tec.map(no=>({no,t:tecFinal(no,b),fm:forma(no),peso:peso(no),magico:no.t.rec==='E'||ARV[no.arv].cat==='elem',el:ARV[no.arv].cat==='elem'?no.arv:null,cond:condicional(no)}));
  let proxAtq=cen==='boneco'?Infinity:2.0;const intervAtq=cen==='chefe'?2.6:(cen==='constructo'?3:1.6);const danoAtq=(cen==='chefe'?300:cen==='constructo'?160:80)*s;const IAtq=cen==='chefe'?40:25;
  let pos=posMax,atordP=0;
  const vivos=()=>alvos.filter(x=>x.vida>0);
  function aplicar(K,I,pesoN,multi,opts){opts=opts||{};const lista=multi?vivos():vivos().slice(0,1);
    for(const al of lista){let pen=0;if(aberturaPend&&!opts.derivada){pen=(10+20*r(a,'PER'))/100;aberturaPend=false;}
      const arm=Math.max(0,al.A-armRed)*(1-Math.min(.35,pen));const M=200*s/(200*s+arm);let f=1+0.05*0.30;if(al.atord>0)f*=1.5;if(A.flanco&&!opts.mag)f*=1+0.3*0.4;
      const d=P*K*mult(a,pesoN)*M*f;al.vida-=d;dano+=d;let Ii=I*(A.marca&&!opts.mag?1.25:1)*(opts.raio?1+0.25*(qEl.raio||0):1);impTot+=Ii;
      if(!(al.atord>0)){al.pos-=Ii;al.semImp=0;if(al.pos<=0){al.pos=0;al.atord=al.chefe?4:1.6;quebras++;imp=Math.min(100,imp+15);}}}}
  let ocupado=0;const pend=[];
  while(t<dur&&!morto){
    const dt=0.05;t+=dt;if(ene<15)semEne+=dt;
    // regen / timers
    res=Math.min(resMax,res+28*dt*0.7);ene=Math.min(eneMax,ene+regE*dt);for(const k in cd)cd[k]-=dt;reacCD-=dt;reacCtrlCD-=dt;
    if(armRedT>0){armRedT-=dt;if(armRedT<=0)armRed=0;}if(cargas>0){cargaT-=dt;if(cargaT<=0)cargas=0;}
    for(const al of alvos){if(al.atord>0){al.atord-=dt;if(al.atord<=0)al.pos=al.posMax*0.6;}else{al.semImp=(al.semImp||0)+dt;if(al.semImp>2.5)al.pos=Math.min(al.posMax,al.pos+al.regen*dt);}}
    if(cen!=='boneco'&&!vivos().length)break;
    // ataques inimigos
    if(t>=proxAtq){proxAtq=t+intervAtq;const ch=Math.random();const atordAlvo=alvos.every(x=>x.vida<=0||x.atord>0);
      if(!atordAlvo){let o=hab.perf,e2=hab.esq,bl=A.bloq>0?hab.bloq:0;const tot=o+e2+bl+hab.hit;
        if(ch<o/tot){imp=Math.min(100,imp+20);ocupado+=0.35;if(cen==='chefe'&&t>=proxLeitura){aberturaPend=true;proxLeitura=t+8;}}
        else if(ch<(o+e2)/tot){ocupado+=0.38;res-=20;}
        else if(ch<(o+e2+bl)/tot){res-=danoAtq/s*0.35/(A.bloq||1);vida-=danoAtq*0.15;pos-=IAtq*0.5;ocupado+=0.3;}
        else{vida-=danoAtq;pos-=IAtq;frenesi=0;ritmo=0;if(pos<=0){ocupado+=1.2;pos=posMax*0.4;}}
        if(vida<vidaMax*0.4&&reserva>0){const q=Math.min(reserva,250*s*(1+0.2*r(a,'POT')));reserva-=250*s;vida=Math.min(vidaMax,vida+q);ocupado+=1.5;curas++;}
        if(vida<=0){morto=true;break;}}}
    for(let k=pend.length-1;k>=0;k--){if(t>=pend[k].em){const q=pend[k];pend.splice(k,1);aplicar(q.K,q.I,q.p,q.m,q.o);}}
    if(ocupado>0){ocupado-=dt;continue;}
    // escolher ação: maior dano por segundo disponível
    let best=null,bv=0;
    const op=(nome,K,I,T,pesoN,multi,custoR,custoE,extra)=>{if(custoR>res||custoE>ene)return;const nAl=multi?vivos().length:1;const v=K*mult(a,pesoN)*nAl/T+I*0.004/T;if(v>bv){bv=v;best={nome,K,I,T,pesoN,multi,custoR,custoE,...extra};}};
    const H=1+0.35*r(a,'DES')+(A.frenesi?Math.min(.15,frenesi*.03):0);
    const Tl=A.lT*(0.35/H+0.2+0.45/H),Tp=A.pT*(0.35/H+0.2+0.45/H);
    op('leve',A.lK*A.h*(A.ritmo&&ritmo>=4?1:1),A.lI*A.h,Tl,'leve',false,0,0);
    op('pesado',A.pK,A.pI,Tp,'pesado',false,15,0);
    if(A.ritmo&&ritmo>=4)op('cruzado',1.0,25,0.8,'leve',false,0,0);
    if(imp>=70){const ig=imp;const Ii=A.pI*(1+ig*(0.5+r(a,'FOR'))/100)*1.08;const contK=A.lK*A.h*(ig/100)*(1+3*r(a,'DES'));op('impeto',A.pK+contK,Ii+0.35*A.lI*A.h*ig/100,Tp+0.45*ig/100,'pesado',false,0,0,{ig});}
    for(const x of tecs){if((cd[x.no.key]||0)>0||!x.t.K||x.cond)continue;let custo=x.t.custo,K=x.t.K,T=x.t.tempo;let usaC=0;
      if(x.magico&&cargas>=3&&custo>=15){usaC=3;K*=1+3*(0.08+0.12*r(a,'POT'));custo=Math.round(custo*1.6);T+=0.3;}
      if(x.magico&&x.fm.f==='area'&&cen!=='grupo'){K*=1.05+0.2*r(a,'CON');custo=Math.round(custo*1.15);}
      const TT=tempoAcao(T,a,x.magico);
      if(x.t.rec==='E')op('tec',K,x.t.I,TT,x.peso,x.fm.multi,0,custo,{x,usaC});else op('tec',K,x.t.I,TT,x.peso,x.fm.multi,custo+(cen==='boneco'?0:20)>res?999:custo,0,{x,usaC});}
    if(!best){ocupado=0.2;continue;}
    acoes++;if((best.nome==='leve'||best.nome==='pesado')&&tecs.some(x=>x.t.K>0&&!x.cond&&(cd[x.no.key]||0)<=0&&(x.t.rec==='E'?x.t.custo>ene:x.t.custo>res)))basicoForcado++;
    res-=best.custoR===999?0:best.custoR;ene-=best.custoE;ocupado=best.T;
    if(best.nome==='impeto')imp=0;
    if(best.nome==='cruzado')ritmo=0;else if(best.nome==='leve'&&A.ritmo)ritmo++;
    if(A.frenesi)frenesi=Math.min(5,frenesi+1);
    const mag=best.x&&best.x.magico;
    pend.push({em:t+best.T*0.55,K:best.K,I:best.I,p:best.pesoN,m:best.multi,o:{mag,raio:best.x&&best.x.el==='raio'}});
    if(best.x){cd[best.x.no.key]=best.x.t.cd;if(best.usaC)cargas=0;
      const el=best.x.el;if(el){if(el==='fogo'){armRed=30*s*qEl.fogo;armRedT=6;}
        if(temReacao&&contEl&&contEl!==el&&t-contT<=4){const fx=formaReacao(contEl,el);if(fx){const ctrl=!!fx.ctrl;if(ctrl?reacCtrlCD<=0:reacCD<=0){if(ctrl)reacCtrlCD=10;else reacCD=6;
            if(fx.K||fx.I||fx.pos)pend.push({em:t+best.T*0.6,K:fx.K||0,I:(fx.I||0)+(fx.pos||0),p:'conj',m:cen==='grupo'&&!!fx.r,o:{derivada:true,mag:true}});reacoesUsadas++;}}contEl=null;}
        else{contEl=el;contT=t;}ultEl=el;}
      if(mag&&best.x.t.custo>=15&&t-ganhoCarga>=2&&cargas<3){cargas++;ganhoCarga=t;cargaT=8;}}
  }
  const tempo=Math.min(t,dur);
  return {dps:dano/tempo/s,ips:impTot/tempo,tempo,morto,vida:Math.max(0,vida/vidaMax),quebras,curas,
    venceu:cen==='boneco'?null:!vivos().length,aplicado:dano,semEne:semEne/Math.max(t,1),forcado:basicoForcado/Math.max(1,acoes)};}
function media(fn,n){const rs=[];for(let i=0;i<n;i++)rs.push(fn());const o={};const vit=rs.filter(x=>x.venceu);o.tempoVit=vit.length?vit.reduce((q,x)=>q+x.tempo,0)/vit.length:Infinity;for(const k of Object.keys(rs[0])){if(k==='tempoVit')continue;const v=rs.map(x=>x[k]);o[k]=typeof v[0]==='number'?v.reduce((s,x)=>s+x,0)/n:v.filter(Boolean).length/n;}return o;}

// ---------------- execução ----------------
const f=(v,d=0)=>Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const nome=id=>ARV[id].nome;
const med=arr=>{const q=[...arr].sort((a,b)=>a-b);return q[Math.floor(q.length/2)];};
function rodar(cfg){nivelRef=cfg;const linhas=[];const combos=[];
  for(const arma of Object.keys(ARMAS))for(const perfil of Object.keys(PERFIS)){
    const mag=perfil==='Mago'||perfil==='Lâmina mágica'||perfil==='Generalista';
    const opcoes=cfg.ref?[['fogo']]:(mag?[['fogo'],['raio'],['fogo','raio'],['fogo','gelo','raio']]:[['fogo'],['raio']]);
    for(const elems of opcoes)combos.push({arma,perfil,elems});}
  for(const c of combos){
    const bB=montarBuild(c.arma,c.perfil,c.elems,'chefe');const bG=montarBuild(c.arma,c.perfil,c.elems,'grupo');
    const bon=media(()=>simular(bB,'boneco',90,HAB['médio']),3);
    const ch=media(()=>simular(bB,'chefe',900,HAB['médio']),10);
    const chB=media(()=>simular(bB,'chefe',900,HAB['bom']),10);
    const fe=media(()=>simular(bB,'fera',120,HAB['médio']),10);
    const co=media(()=>simular(bB,'constructo',120,HAB['médio']),10);
    const gr=media(()=>simular(bG,'grupo',180,HAB['médio']),8);
    linhas.push({...c,semEne:ch.semEne,forcado:ch.forcado,tec:bB.tec.map(x=>x.nome),a:bB.a,dps:bon.dps,ips:bon.ips,chefeT:ch.tempoVit,chefeV:ch.venceu,chefeM:ch.morto,chefeTb:chB.tempoVit,feraT:fe.tempoVit,constT:co.tempoVit,grupoT:gr.tempoVit,grupoV:gr.venceu});}
  return linhas;}
const REF=rodar({nivel:15,ph:18,s:1,ref:true});
const N100=rodar({nivel:100,ph:103,s:Math.pow(1.09,9),ref:false});

// técnicas: ganho sobre o ataque básico (perfil neutro 30 em tudo)
const neutro={FOR:30,DES:30,VIG:30,POT:30,CON:30,PER:30};
const H=1+0.35*rr(30);const basArma=id=>{const A=ARMAS[id];return A.lK*A.h/(A.lT*(0.35/H+0.2+0.45/H));};
const basMedio=Object.keys(ARMAS).reduce((q,id)=>q+basArma(id),0)/11;
const tecs=[];for(const id in ARV)for(const no of ARV[id].nos)if(no.t&&no.tipo==='Técnica'&&no.t.K>0){
  const T=tempoAcao(no.t.tempo<0.4?0.5:no.t.tempo,neutro,no.t.rec==='E'||ARV[id].cat==='elem');const bas=ARMAS[id]?basArma(id):basMedio;
  const ganho=(no.t.K-bas*T)/Math.max(no.t.cd,T)/bas; // fração de dano/s a mais que bater só no básico
  tecs.push({no,arv:id,T,ganho,cond:condicional(no),multi:forma(no).multi,porAcao:no.t.K/T/bas});}
const testadas=new Set(['fogo','gelo','raio',...Object.keys(ARMAS)]);
const usadas={};for(const l of N100)for(const tn of l.tec)usadas[tn]=(usadas[tn]||0)+1;
const nunca=tecs.filter(x=>!usadas[x.no.nome]&&testadas.has(x.arv)&&!x.cond);
const piores=tecs.filter(x=>x.ganho<0&&!x.cond).sort((a,b)=>a.ganho-b.ganho);
const melhores=[...tecs].filter(x=>!x.cond).sort((a,b)=>b.ganho-a.ganho);

let md=`# Simulador de equilíbrio — resultado\n\nGerado por \`node sim/simulador.js\` com os dados de \`prototipo/v2/dados.js\` (os mesmos 546 nós do loop 3) e os números de referência dos contratos v8 (seção AI). ${REF.length} builds no perfil de referência (nível 15) e ${N100.length} no nível 100 (11 armas × 8 perfis × 1 a 3 elementos).\n\n`;
md+=`## O que o simulador mede e o que ele NÃO mede\n- **Tempo** = média só das lutas vencidas; a chance de morrer aparece em coluna própria.
- **Mede:** dano/s no boneco, impacto/s (quebra de postura), tempo para matar uma fera (650·s), um constructo (1.100·s), um grupo de 4 feras e a parte de um jogador no Chefe de Andar (120.000·s ÷ 6 = 20.000·s, postura 1.000 ÷ 6, ataque de 300·s a cada 2,6 s). Média de várias lutas com um jogador "médio" (30% de esquivas perfeitas/parry, 15% de golpes levados) e um "bom" (55% / 5%).\n- **Usa:** r(x), C(x), dano com pesos por ação, armadura 200·s/(200·s+A), H de DES, H_c de CON, Ímpeto e continuações, Sobrecarga (3 cargas), Comprimir em área, Abertura/Punir, Fogo −30·s, Raio +25% de impacto, reação elemental, Frenesi, Ritmo, Marca, Flanco (40% do tempo); K, impacto, tempo, custo e recarga de cada técnica e as transformações que mudam esses números. O jogador escolhe sempre a ação de maior dano/s disponível.\n- **Não usa:** efeitos em texto livre (passivas, nós-chave e técnicas com condição como "só contra alvo atordoado" ficam de fora), Artes, equipamento, posicionamento e mecânicas de chefe. Mostra o equilíbrio dos **números-base**; não substitui jogar.\n\n`;
// A — calibração
const refDps=REF.map(l=>l.dps*0.55);
md+=`## 1. Calibração com o documento (perfil de referência da camada 1: nível 15, principal +20, secundário +15, VIG +10, 18 PH)\n| Medida | Documento | Simulador (mediana das ${REF.length} builds) | Faixa (mín–máx) | Situação |\n|---|---|---|---|---|\n`;
const linhaCal=(n,doc,arr,uni,dlo,dhi)=>{const m=med(arr);const ok=m>=dlo&&m<=dhi;md+=`| ${n} | ${doc} | ${f(m,1)}${uni} | ${f(Math.min(...arr),1)}–${f(Math.max(...arr),1)}${uni} | ${ok?'dentro':'**fora**'} |\n`;};
linhaCal('Dano/s efetivo (× 0,55 de tempo atacando)','≈ 70',refDps,'',60,80);
linhaCal('Fera (650)','8–12 s',REF.map(l=>l.feraT),' s',8,12);
linhaCal('Constructo (1.100)','14–18 s',REF.map(l=>l.constT),' s',14,18);
linhaCal('Parte de 1 jogador no Chefe de Andar (20.000)','≈ 287 s de dano (5 min)',REF.map(l=>l.chefeT),' s',230,345);
md+=`\nLeitura: o documento calcula o tempo de combate supondo **55% do tempo atacando**; o simulador já desconta o tempo gasto se defendendo, curando e reposicionando depois de golpes. Diferença grande aqui indica que as técnicas da árvore somam mais (ou menos) dano do que o modelo de papel previa.\n\n`;
// B — diversidade nível 100
const okC=N100.filter(l=>l.chefeV>=0.5);const melhorT=Math.min(...okC.map(l=>l.chefeT));const d15=okC.filter(l=>l.chefeT<=melhorT*1.15);
const porArma={};for(const l of N100){if(!porArma[l.arma]||l.chefeT<porArma[l.arma].chefeT)porArma[l.arma]=l;}
const mArma=Object.values(porArma).reduce((q,l)=>q+l.chefeT,0)/11;
const foraA=Object.values(porArma).filter(l=>Math.abs(l.chefeT/mArma-1)>0.15);
const porPerfil={};for(const l of N100)(porPerfil[l.perfil]=porPerfil[l.perfil]||[]).push(l);
const melhorPorPerfil=Object.fromEntries(Object.entries(porPerfil).map(([k,L])=>[k,Math.min(...L.map(l=>l.chefeT))]));
const melhorP=Math.min(...Object.values(melhorPorPerfil));
md+=`## 2. Metas de diversidade (nível 100)\n| Meta | Resultado | Situação |\n|---|---|---|\n`;
md+=`| ≥ 8 builds a ≤ 15% da melhor no chefe | ${d15.length} builds (melhor ${f(melhorT)} s) | ${d15.length>=8?'**cumpre**':'**não cumpre**'} |\n`;
md+=`| Melhor build de cada arma a ±15% da média | ${11-foraA.length}/11 | ${foraA.length?'**não cumpre**: '+foraA.map(l=>nome(l.arma)+' '+(l.chefeT<mArma?'':'+')+f((l.chefeT/mArma-1)*100)+'% de tempo').join(', '):'**cumpre**'} |\n`;
const perfisFora=Object.entries(melhorPorPerfil).filter(([k,v])=>v>melhorP*1.15);
md+=`| Generalista ≤ 15% atrás da melhor | ${f((melhorPorPerfil['Generalista']/melhorP-1)*100)}% atrás | ${melhorPorPerfil['Generalista']<=melhorP*1.15?'**cumpre**':'**não cumpre**'} |\n`;
md+=`| Todo perfil de atributo com alguma build a ≤ 15% | ${8-perfisFora.length}/8 | ${perfisFora.length?'**não cumpre**: '+perfisFora.map(([k,v])=>k+' +'+f((v/melhorP-1)*100)+'%').join(', '):'**cumpre**'} |\n\n`;
md+=`### Melhor build de cada arma (nível 100)\n| Arma | Perfil | Elementos | Chefe (médio) | vs média | Chefe (bom) | Dano/s boneco | Impacto/s | Fera | 4 feras |\n|---|---|---|---|---|---|---|---|---|---|\n`;
Object.values(porArma).sort((x,y)=>x.chefeT-y.chefeT).forEach(l=>{md+=`| ${nome(l.arma)} | ${l.perfil} | ${l.elems.map(nome).join(' + ')} | ${f(l.chefeT)} s${l.chefeM>0?' (morre '+f(l.chefeM*100)+'%)':''} | ${(l.chefeT>=mArma?'+':'')+f((l.chefeT/mArma-1)*100)}% | ${f(l.chefeTb)} s | ${f(l.dps)} | ${f(l.ips,1)} | ${f(l.feraT,1)} s | ${f(l.grupoT,1)} s |\n`;});
md+=`\n### Perfis de atributo (nível 100)\n| Perfil | Atributos | Melhor no chefe | vs melhor perfil | Média dano/s | Morre no chefe (média) | Tempo sem energia (< 15) | Básico por falta de recurso |\n|---|---|---|---|---|---|---|---|\n`;
for(const pf in porPerfil){const L=porPerfil[pf];const a=L[0].a;const av=k=>L.reduce((q,l)=>q+l[k],0)/L.length;
  md+=`| ${pf} | ${ATR.filter(x=>a[x]).map(x=>x+' '+a[x]).join(' · ')} | ${f(melhorPorPerfil[pf])} s | +${f((melhorPorPerfil[pf]/melhorP-1)*100)}% | ${f(av('dps'))} | ${f(av('chefeM')*100)}% | ${f(av('semEne')*100)}% | ${f(av('forcado')*100)}% |\n`;}
md+=`\n### Elementos no perfil Mago (nível 100)\n| Elementos | Chefe | Dano/s boneco | 4 feras |\n|---|---|---|---|\n`;
const gE={};for(const l of N100.filter(l=>l.perfil==='Mago'))(gE[l.elems.map(nome).join(' + ')]=gE[l.elems.map(nome).join(' + ')]||[]).push(l);
for(const k in gE){const L=gE[k];const av=q=>L.reduce((z,l)=>z+l[q],0)/L.length;md+=`| ${k} | ${f(av('chefeT'))} s | ${f(av('dps'))} | ${f(av('grupoT'),1)} s |\n`;}
// C — técnicas
md+=`\n## 3. Técnicas: vale a pena usar no lugar do ataque básico?\nMedida (perfil neutro, 30 em tudo): **ganho** = quanto dano/s a mais você tem usando a técnica sempre que a recarga deixa, em vez de só bater com o ataque leve da arma. Negativo = dá menos dano do que o básico no mesmo tempo (só vale pelo impacto, controle ou utilidade).\n\n### As 15 de maior ganho\n| Técnica | Árvore | K | Tempo | Recarga | Custo | Ganho | Área |\n|---|---|---|---|---|---|---|---|\n`;
melhores.slice(0,15).forEach(x=>{md+=`| ${x.no.nome} | ${nome(x.arv)} | ${f(x.no.t.K,2)} | ${f(x.no.t.tempo,2)} s | ${f(x.no.t.cd,1)} s | ${x.no.t.custo}${x.no.t.rec} | +${f(x.ganho*100)}% | ${x.multi?'sim':''} |\n`;});
md+=`\n### Técnicas de dano que dão MENOS dano que o ataque básico (${piores.length} de ${tecs.filter(x=>!x.cond).length})\n| Técnica | Árvore | K | Impacto | Tempo | Recarga | Ganho | O texto dá outro valor? |\n|---|---|---|---|---|---|---|---|\n`;
piores.forEach(x=>{const tx=(x.no.t.txt||'');md+=`| ${x.no.nome} | ${nome(x.arv)} | ${f(x.no.t.K,2)} | ${x.no.t.I} | ${f(x.no.t.tempo,2)} s | ${f(x.no.t.cd,1)} s | ${f(x.ganho*100)}% | ${tx.slice(0,70)}${tx.length>70?'…':''} |\n`;});
md+=`\n### Técnicas de dano que nenhuma build do nível 100 escolheu (${nunca.length}, só das árvores testadas, sem as condicionais)\n${nunca.map(x=>`${x.no.nome} (${nome(x.arv)})`).join(' · ')}\n`;
fs.writeFileSync(path.join(OUT,'relatorio.md'),md);
const cab=['nivel','arma','perfil','elementos','dps','ips','chefeT','chefeVenceu','chefeMorreu','chefeTbom','feraT','constructoT','grupo4T','tecnicas'];
const lin=(nv,l)=>[nv,l.arma,l.perfil,l.elems.join('+'),f(l.dps,1),f(l.ips,2),f(l.chefeT,1),f(l.chefeV,2),f(l.chefeM,2),f(l.chefeTb,1),f(l.feraT,1),f(l.constT,1),f(l.grupoT,1),l.tec.join(', ')].join(';');
fs.writeFileSync(path.join(OUT,'builds.csv'),cab.join(';')+'\n'+[...REF.map(l=>lin(15,l)),...N100.map(l=>lin(100,l))].join('\n'));
console.log('REF dps*0.55 mediana',f(med(refDps),1),'fera',f(med(REF.map(l=>l.feraT)),1),'const',f(med(REF.map(l=>l.constT)),1),'chefe',f(med(REF.map(l=>l.chefeT))),
 '| N100: dentro15',d15.length,'armas fora',foraA.map(l=>l.arma).join(','),'perfis fora',perfisFora.map(x=>x[0]).join(','),'| técnicas piores',piores.length,'nunca',nunca.length);
