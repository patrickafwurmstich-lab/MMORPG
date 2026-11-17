// Simulador de equilíbrio v2 (loop 4) — corrige os bloqueadores apontados pelo ChatGPT e pelo Grok:
// fichas explícitas (sim/fichas.js) · impacto I×(1+0,6rFOR+0,4rCON) · parry 25×(1+0,5rFOR+0,5rPER) e janela por PER ·
// resposta sorteada pelo erro de tempo · esquiva perfeita nos últimos 0,12 s (devolve custo) · bloqueio do núcleo D.1 (30% atravessa) ·
// resistência 18/s após 0,8 s · quebra = 2 s ×1,3 + 8 s de resistência · cura sem conservação · Ímpeto só de eventos originais ·
// sobretaxas somadas sobre o custo-base · 4 políticas · sementes fixas · intervalos de confiança · Chefe de Andar real (6 jogadores) ·
// calibração em dois modos (abstrato × 0,55 e por eventos). Uso: node sim/simulador2.js
"use strict";
const fs=require('fs'),path=require('path'),vm=require('vm');
const RAIZ=path.join(__dirname,'..');const OUT=path.join(__dirname,'resultado');fs.mkdirSync(OUT,{recursive:true});
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(RAIZ,'prototipo/v2/dados.js'),'utf8')+';this.DADOS=DADOS;',ctx);
const D=ctx.DADOS;const FICHAS=require('./fichas.js');
const VERSAO_DADOS=require('crypto').createHash('sha1').update(fs.readFileSync(path.join(RAIZ,'prototipo/v2/dados.js'))).digest('hex').slice(0,10);

// ---------- utilidades ----------
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let RND=Math.random;const GLOBAL={vidaMult:1};const gauss=()=>{let u=0,v=0;while(!u)u=RND();while(!v)v=RND();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
const rr=x=>x/(x+40),Cc=x=>x+x*x/40;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const media=a=>a.length?a.reduce((q,x)=>q+x,0)/a.length:NaN;
const ic95=a=>{if(a.length<2)return 0;const m=media(a);const sd=Math.sqrt(a.reduce((q,x)=>q+(x-m)**2,0)/(a.length-1));return 1.96*sd/Math.sqrt(a.length);};
const wilson=(k,n)=>{if(!n)return [0,0];const z=1.96,p=k/n,d=1+z*z/n,c=p+z*z/(2*n),e=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n));return [(c-e)/d,(c+e)/d];};
const med=arr=>{const q=[...arr].filter(x=>isFinite(x)).sort((a,b)=>a-b);return q.length?q[Math.floor(q.length/2)]:NaN;};

// ---------- regras ----------
const ATR=['FOR','DES','VIG','POT','CON','PER'];
const CUSTO_PH={'Técnica':2,'Reação':2,'Passiva':1,'Transformação':2,'Nó-chave':3};
const ARMAS={
 desarmado:{lK:.45,lT:.45,pK:1.10,pT:.95,lI:8,pI:22,bloq:.8,h:1},
 espada_curta:{lK:.55,lT:.55,pK:1.25,pT:1.00,lI:9,pI:22,bloq:1,h:1},
 espada_longa:{lK:.62,lT:.68,pK:1.45,pT:1.20,lI:10,pI:26,bloq:1,h:1},
 duas_espadas:{lK:.40,lT:.70,pK:1.30,pT:1.10,lI:6,pI:22,bloq:0,h:2},
 espada_e_escudo:{lK:.58,lT:.65,pK:1.35,pT:1.15,lI:10,pI:24,bloq:1.33,h:1},
 katana:{lK:.65,lT:.62,pK:1.50,pT:1.10,lI:9,pI:24,bloq:0,h:1},
 duas_katanas:{lK:.42,lT:.72,pK:1.35,pT:1.15,lI:6,pI:22,bloq:0,h:2},
 machado_grande:{lK:.85,lT:1.00,pK:1.90,pT:1.70,lI:15,pI:40,bloq:1.3,h:1},
 machado_pequeno:{lK:.58,lT:.60,pK:1.25,pT:1.05,lI:10,pI:24,bloq:1,h:1},
 dois_machados:{lK:.38,lT:.66,pK:1.25,pT:1.05,lI:6,pI:24,bloq:0,h:2},
 arco:{lK:.55,lT:.70,pK:1.50,pT:1.20,lI:6,pI:12,bloq:0,h:1}
};
const PESOS={leve:{FOR:.3,DES:.7},pesado:{FOR:.8,DES:.2},arma:{FOR:.5,DES:.5},imbuir:{FOR:.5,DES:.1,POT:.4},disparo:{DES:.4,POT:.4,CON:.2},arco:{DES:.7,PER:.3},conj:{POT:.6,CON:.4},disc:{FOR:.5,VIG:.5},ponto:{FOR:.3,DES:.3,PER:.4},pulso:{POT:.6,CON:.4}};
const ARV={};[...D.armas,...D.elems,...D.discs].forEach(a=>{ARV[a.id]=a;a.porN={};a.nos.forEach(n=>{a.porN[n.n]=n;n.arv=a.id;n.key=a.id+':'+n.n;});});
const ORD=['fogo','gelo','raio','terra','vento','agua'];

// ficha final de uma técnica (base do documento + correção revisada)
const fichaCache={};
function ficha(no){if(fichaCache[no.key])return fichaCache[no.key];const t=no.t;const o=FICHAS[no.key]||{};const cat=ARV[no.arv].cat;
  const hits=t.hits||1;const fc={key:no.key,nome:no.nome,arv:no.arv,cat,K:o.K!=null?o.K:(t.K||0)/hits,h:o.h!=null?o.h:hits,I:o.I!=null?o.I:(t.I||0),T:o.T||Math.max(.45,t.tempo||.8),
    custo:t.custo||0,rec:t.rec||'R',cd:t.cd||6,forma:o.forma||(cat==='elem'?'proj':(no.arv==='arco'?'proj':'golpe')),alvos:o.alvos||1,tiq:o.tiq||1,dot:o.dot||0,
    cond:o.cond||(/só inicia|só em alvo|só contra|só pelo flanco|exige/.test((t.txt||'').toLowerCase())?'outra':null),alt:o.alt||null,bonus:o.bonus||null,bonusI:o.bonusI||null,
    peso:o.peso||(cat==='elem'?'conj':(no.arv==='arco'?(t.rec==='E'?'disparo':'arco'):(cat==='disc'?'disc':'arma'))),decai:o.decai||0,debuff:o.debuff||null,expoe:o.expoe||null,
    frenesi:o.frenesi||0,segundoSoFlanco:o.segundoSoFlanco||0,flancoGarantido:o.flancoGarantido||0,nota:o.nota||'',revisada:!!FICHAS[no.key],tag:t.tag};
  fc.magico=fc.rec==='E'||cat==='elem';fc.el=cat==='elem'?no.arv:(/elemento/.test(t.txt||'')&&fc.K>0?'@':null);
  if(o.forma==='area'||o.forma==='volta'||o.forma==='arco180'||o.forma==='linha'||o.forma==='zona')fc.area=true;if(fc.alvos===1&&fc.area&&!o.alvos)fc.alvos=99;
  return fichaCache[no.key]=fc;}

// ---------- builds ----------
function custoAf(x,m){const c=Cc(x);return c-m*Math.min(15,0.25*c);}
function distribuir(nivel,alvos,afin){const tot=20+3*(nivel-1);const a={FOR:0,DES:0,VIG:0,POT:0,CON:0,PER:0};const m={};alvos.slice(0,2).forEach(([at])=>m[at]=afin?1:0);
  const gasto=()=>ATR.reduce((q,at)=>q+custoAf(a[at],m[at]||0),0);
  // sobe sempre o atributo mais longe da meta (proporcional), até acabar os pontos
  const ativos=alvos.map(x=>x.slice());for(;;){ativos.sort((x,y)=>a[x[0]]/x[1]-a[y[0]]/y[1]);let ok=false;
    for(const [at,mx] of ativos){if(a[at]>=mx)continue;a[at]++;if(gasto()>tot+1e-9){a[at]--;continue;}ok=true;break;}if(!ok)break;}
  return a;}
const PERFIS={
  'Força':[['FOR',60],['VIG',60]],'Destreza':[['DES',60],['FOR',35],['VIG',35]],'Força+Destreza':[['FOR',60],['DES',60],['VIG',15]],
  'Tanque':[['VIG',60],['FOR',50]],'Leitor (PER)':[['PER',60],['DES',55]],'Mago':[['POT',60],['CON',60],['VIG',15]],
  'Lâmina mágica':[['FOR',50],['POT',50],['DES',20]],'Generalista':[['FOR',30],['DES',30],['VIG',30],['POT',30],['CON',30],['PER',30]]};
function perfilRef(p){const pr=PERFIS[p];if(p==='Generalista')return pr.map(([a])=>[a,10]);return [[pr[0][0],20],[pr[1][0],15],['VIG',10]];}
function cadeia(no,comp,acc){acc=acc||new Set();if(comp.has(no.key)||acc.has(no.key))return acc;for(const rf of no.refs){const p=ARV[no.arv].porN[rf];if(p)cadeia(p,comp,acc);}acc.add(no.key);return acc;}
const phDe=keys=>{let s=0;for(const k of keys){const [a,n]=k.split(':');s+=CUSTO_PH[ARV[a].porN[+n].tipo];}return s;};
const rA=(a,at)=>rr(a[at]||0);
const multP=(a,p)=>{let s=0;for(const k in PESOS[p])s+=PESOS[p][k]*rA(a,k);return 1+s;};
const multI=a=>1+0.6*rA(a,'FOR')+0.4*rA(a,'CON');
function tempoReal(T,a,magico){const H=1+0.35*rA(a,'DES'),Hc=1+0.25*rA(a,'CON');return magico?T*(0.35/Hc+0.2+0.45/H):T*(0.35/H+0.2+0.45/H);}
function valorEstimado(fc,a,cen){if(!fc.K)return 0;if(fc.cond&&!['flanco','atordoado','exposto|atordoado','ritmo>=3','marca','comum'].includes(fc.cond))return 0;
  const alv=cen==='grupo'?Math.min(fc.alvos,4):1;const tq=fc.tiq;const T=tempoReal(fc.T,a,fc.magico);let v=fc.K*fc.h*tq*multP(a,fc.peso)*alv*(1+fc.dot);
  if(fc.cond==='atordoado'||fc.cond==='exposto|atordoado')v*=0.35;if(fc.cond==='flanco')v*=0.5;if(fc.cond==='ritmo>=3')v*=0.6;
  return v/Math.max(T,0.5)+ (fc.I*multI(a))*0.002/Math.max(T,.5);}
function montarBuild(cfg,arma,perfil,elems,cen,opc){
  const a=distribuir(cfg.nivel,cfg.ref?perfilRef(perfil):PERFIS[perfil],true);const comp=new Set();let ph=cfg.ph;
  for(const e of elems)for(let i=1;i<=6;i++){const no=ARV[e].porN[i];const c=cadeia(no,comp);const cst=phDe(c);if(cst<=ph){c.forEach(k=>comp.add(k));ph-=cst;}}
  const cand=[];for(const id of [arma,...elems])for(const no of ARV[id].nos)if(no.t&&no.tipo==='Técnica'){const fc=ficha(no);if(fc.K>0)cand.push(no);}
  const tec=[];while(tec.length<8){let best=null,bv=0;for(const no of cand){if(tec.includes(no))continue;const c=cadeia(no,comp);const cst=phDe(c);if(cst>ph)continue;
      const v=valorEstimado(ficha(no),a,cen)/(1+cst*0.15);if(v>bv){bv=v;best=no;}}if(!best)break;const c=cadeia(best,comp);ph-=phDe(c);c.forEach(k=>comp.add(k));tec.push(best);}
  const phEl={};let tot=0;for(const e of elems){phEl[e]=phDe([...comp].filter(k=>k.startsWith(e+':')));tot+=phEl[e];}
  const q={};for(const e of elems)q[e]=elems.length===1?1:0.6+0.4*phEl[e]/Math.max(1,tot);
  const troncos=elems.every(e=>[1,2,3,4,5,6].every(n=>comp.has(e+':'+n)));
  return {cfg,arma,perfil,elems,a,tec:tec.map(ficha),comp,phEl,q,troncos,phSobra:ph,opc:opc||{}};}

// ---------- combate por eventos ----------
const HAB={'médio':{sigma:.117},'bom':{sigma:.07}};
const POL={
  sustentado:{parry:.5,bloq:.15,eneMin:.30,cargaEm:3,cargaSeEne:.5,guarda:'baixa',carga:2,usaJanela:false},
  explosao:{parry:.5,bloq:.15,eneMin:.15,cargaEm:3,cargaSeEne:0,guarda:'baixa',carga:2,usaJanela:true},
  ruptura:{parry:.7,bloq:.1,eneMin:.25,cargaEm:3,cargaSeEne:.4,guarda:'alta',carga:3,usaJanela:false,impacto:true},
  defensiva:{parry:.3,bloq:.45,eneMin:.35,cargaEm:3,cargaSeEne:.6,guarda:'baixa',carga:2,usaJanela:false,resMin:.5}};
function novoJogador(b,s){const a=b.a;const p={b,a,s,vidaMax:1000*s*(1+0.9*rA(a,'VIG')),resMax:100*(1+0.6*rA(a,'VIG')),eneMax:100*(1+0.6*rA(a,'POT')),
  posMax:100*(1+0.8*rA(a,'VIG')+0.4*rA(a,'FOR')),regE:4*(1+rA(a,'CON')),reserva:600*(1+0.8*rA(a,'VIG'))*s};
  if(b.opc.regenMago)p.regE=4*(1+rA(a,'CON'))+4*rA(a,'CON')*rA(a,'POT');
  Object.assign(p,{vida:p.vidaMax,res:p.resMax,ene:p.eneMax,pos:p.posMax,imp:0,impJ:0,impS:0,ocup:0,semRes:9,semPos:9,cargas:0,cargaT:0,ganhoCarga:-9,cd:{},morto:false,
    atord:0,abertura:0,abertAlvo:null,leituraCD:0,marcado:false,fluxo:0,ritmo:0,frenesi:0,frenesiT:0,marca:0,contEl:null,contT:-9,reacCD:0,reacCtrl:0,dano:0,ofens:0,semEne:0,forc:0,acoes:0,
    pend:[],ultAtq:0,barreira:0,mortes:0,recebido:0,pocoes:5,reanim:0,volta:0});return p;}
function ganhaImp(p,v,t){if(t-p.impJ>=1){p.impJ=t;p.impS=0;}const g=Math.min(v,Math.max(0,45-p.impS));p.impS+=g;p.imp=Math.min(100,p.imp+g);}
function inimigo(tipo,s){const T={boneco:{vida:Infinity,pos:300,A:50,int:Infinity,dano:0,I:0,grande:1},fera:{vida:650,pos:60,A:50,int:1.6,dano:80,I:25,aviso:.55},
  constructo:{vida:1100,pos:170,A:50,int:3.0,dano:160,I:50,aviso:1.0,grande:1},chefe:{vida:120000,pos:1000,A:50,int:2.6,dano:300,I:40,aviso:1.0,aoeInt:10,aoeDano:200,aoeI:30,grande:1,chefe:1}}[tipo];
  const vm=tipo==='boneco'?1:GLOBAL.vidaMult;return {tipo,vida:T.vida*s*vm,vidaMax:T.vida*s*vm,pos:T.pos,posMax:T.pos,A:T.A*s,int:T.int,dano:T.dano*s,I:T.I,aviso:T.aviso||1,aoeInt:T.aoeInt,aoeDano:(T.aoeDano||0)*s,aoeI:T.aoeI||0,
    grande:!!T.grande,chefe:!!T.chefe,atord:0,resistQ:0,semImp:9,armRed:0,armRedT:0,exposto:0,proxAtq:2+RND(),proxAoe:T.aoeInt||Infinity,proxFraco:6,fraco:0,lento:0,brasa:0,quebras:0};}
// aplica dano/impacto de uma ação em um alvo
function golpe(p,e,K,Ibase,pesoN,o,t){o=o||{};if(e.vida<=0)return;const a=p.a,s=p.s;let pen=0,Iadd=0;
  if(p.abertura>0&&!o.derivada&&p.abertAlvo===e){const fat=1;const uso=p.usoAb;if(uso==='Punir')pen=((p.b.opc.perGrok?15+25*rA(a,'PER'):10+20*rA(a,'PER')))/100*fat;else if(uso==='Desmontar')Iadd=5+10*rA(a,'PER');else p.res=Math.min(p.resMax,p.res+(p.b.opc.perGrok?8+12*rA(a,'PER'):5+10*rA(a,'PER')));p.abertura=0;}
  const arm=Math.max(0,e.A-e.armRed)*(1-Math.min(.35,pen));const M=200*s/(200*s+arm);
  let mult=multP(a,pesoN)*M*(1+0.05*0.30);if(e.atord>0)mult*=1.3;if(e.exposto>0)mult*=1.2;if(o.flanco)mult*=1.3;if(o.fraco)mult*=1.5;if(o.fogo&&e.brasa>0)mult*=1.08;
  const d=110*s*K*mult;e.vida-=d;p.dano+=d;
  let I=(Ibase*multI(a)+Iadd)*(o.impMult||1);if(o.raioQ)I*=1+0.25*o.raioQ;if(p.marca>0&&p.b.arma==='machado_pequeno'&&!o.mag)I*=1.25;if(p.b.arma==='desarmado'&&!o.mag)I*=1+0.06*p.fluxo;if(e.resistQ>0)I*=0.5;
  if(e.atord<=0){e.pos-=I;e.semImp=0;if(e.pos<=0){e.pos=0;e.atord=2;e.resistQ=10;e.quebras++;if(!o.derivada)ganhaImp(p,15,t);}}}
function aplicarAcao(p,ac,alvos,t){const e0=alvos.find(x=>x.vida>0);if(!e0)return;const lista=ac.alvos>1?alvos.filter(x=>x.vida>0).slice(0,ac.alvos):[e0];
  let i=0;for(const e of lista){let K=ac.K*(ac.decai?Math.pow(1-ac.decai,i):1);
    for(let h=0;h<ac.h;h++){let fl=ac.flanco;if(ac.segundoSoFlanco&&h===1&&!fl)continue;golpe(p,e,K*(1+(ac.dot||0)*(h===0?1:0)),h===0?ac.I:0,ac.peso,{flanco:fl,fraco:ac.fraco&&i===0,mag:ac.magico,raioQ:ac.el==='raio'?p.b.q.raio:0,impMult:ac.impMult,derivada:ac.derivada,fogo:ac.el==='fogo'},t);}
    if(ac.debuff&&ac.debuff.armadura){e.armRed=Math.max(e.armRed,ac.debuff.armadura*p.s);e.armRedT=ac.debuff.dur;}
    if(ac.debuff&&ac.debuff.fogoMais)e.brasa=ac.debuff.dur;
    if(ac.expoe&&p.frenesi>=3)e.exposto=ac.expoe.dur;
    i++;}
  if(ac.el&&!ac.derivada){const el=ac.el==='@'?p.b.elems[0]:ac.el;elemento(p,e0,el,ac,alvos,t);}
  if(ac.magico&&!ac.derivada&&ac.custoBase>=15&&t-p.ganhoCarga>=2&&p.cargas<3){p.cargas++;p.ganhoCarga=t;p.cargaT=8;}}
function elemento(p,e,el,ac,alvos,t){const q=p.b.q[el]||0.6,s=p.s;
  if(el==='fogo'){e.armRed=Math.max(e.armRed,30*s*q);e.armRedT=6;}
  if(el==='gelo')e.lento=Math.max(e.lento,4);
  if(el==='terra')p.barreira=Math.min(40,p.barreira+20*q);
  if(el==='vento'&&t-(p.ventoT||-9)>=1){p.ventoT=t;ganhaImp(p,10*q,t);}
  // reação (07): contato 4 s, 1 por ação, forma melhor disponível, recargas
  if(p.b.troncos&&p.contEl&&p.contEl!==el&&t-p.contT<=4){const [A,B]=ORD.indexOf(p.contEl)<ORD.indexOf(el)?[p.contEl,el]:[el,p.contEl];const L=D.reacoes[A+'+'+B];
    if(L){const pa=p.b.phEl[A]||0,pb=p.b.phEl[B]||0,pp=pa/Math.max(1,pa+pb);const disp=[1];if(pp>=.7)disp.push(0);if(pp<=.3)disp.push(2);
      let fx=null,mv=-1;for(const i of disp){const x=L[i].fx||{};const v=(x.K||0)*(x.r?Math.min(4,alvos.filter(z=>z.vida>0).length):1)+((x.I||0)+(x.pos||0))*0.01+(x.selfRed?0.05:0);if(v>mv){mv=v;fx=x;}}
      const ctrl=!!(fx&&fx.ctrl);if(fx&&(ctrl?p.reacCtrl<=0:p.reacCD<=0)){if(ctrl)p.reacCtrl=10;else p.reacCD=6;
        if(fx.K||fx.I||fx.pos){const lst=fx.r?alvos.filter(z=>z.vida>0):[e];for(const z of lst)golpe(p,z,fx.K||0,(fx.I||0)+(fx.pos||0),'conj',{derivada:true,mag:true},t);}}}
    p.contEl=null;}else{p.contEl=el;p.contT=t;}}
// escolhe e executa a próxima ação do jogador
function escolher(p,alvos,t,pol,cen){const a=p.a,b=p.b,A=ARMAS[b.arma];const e=alvos.find(x=>x.vida>0);if(!e)return null;
  const H=1+0.35*rA(a,'DES')+(b.arma==='dois_machados'?Math.min(.15,p.frenesi*.03):0);const fT=T=>T*(0.35/H+0.2+0.45/H);
  const nVivos=alvos.filter(x=>x.vida>0).length;let best=null,bv=-1;
  const flancoP=cen==='chefe'?0.6:0.3;const janela=e.atord>0||p.abertura>0;
  const add=(ac)=>{if(ac.custoR>p.res||ac.custoE>p.ene)return;const nA=Math.min(ac.alvos||1,nVivos);let v=ac.K*ac.h*(ac.tiq||1)*multP(a,ac.peso)*nA*(1+(ac.dot||0))/ac.Tr;
    if(pol.impacto&&e.atord<=0)v=v*0.4+(ac.I*multI(a)/ac.Tr)*0.05;else v+=ac.I*0.002/ac.Tr;
    if(pol.usaJanela&&ac.grande&&!janela&&e.chefe)v*=0.3;if(v>bv){bv=v;best=ac;}};
  // básicos
  let lK=A.lK,lT=A.lT,pK=A.pK,pT=A.pT,pI=A.pI;
  if(b.arma==='espada_longa'){if(pol.guarda==='alta'){lT*=1.1;pT*=1.1;pK=1.6;}else{lT*=.9;pT*=.9;}}
  if(b.arma==='machado_grande'){const nv=pol.carga;pK=[0,1.9,2.4,3.0][nv];pT=A.pT+[0,.5,1,1.5][nv];pI=40+10*nv;}
  if(b.arma==='katana'){pK=1.2+0.8*(0.6);pT=0.6+0.72;}
  if(b.opc.pulso&&(b.perfil==='Mago'))add({nome:'pulso',K:.70,h:1,I:4,peso:'pulso',Tr:tempoReal(1.0,a,true),custoR:0,custoE:0,alvos:1,magico:true});
  const fl=RND()<flancoP&&b.arma==='espada_curta';
  add({nome:'leve',K:lK*(b.arma==='duas_espadas'&&p.ritmo>=4?0:1),h:A.h,I:A.lI,peso:'leve',Tr:fT(lT),custoR:0,custoE:0,alvos:1,flanco:fl});
  if(b.arma==='duas_espadas'&&p.ritmo>=4)add({nome:'cruzado',K:1.0,h:1,I:25,peso:'leve',Tr:fT(.8),custoR:0,custoE:0,alvos:1});
  add({nome:'pesado',K:pK,h:1,I:pI,peso:'pesado',Tr:fT(pT),custoR:15,custoE:0,alvos:b.arma==='katana'?99:1,flanco:fl,grande:true});
  if(e.fraco>0)add({nome:'ponto',K:1.0,h:1,I:15,peso:'ponto',Tr:fT(.8),custoR:0,custoE:0,alvos:1,fraco:true});
  if(p.imp>=(pol.usaJanela?50:70)&&(!pol.usaJanela||janela||!e.chefe)){const ig=p.imp;const cont=A.lK*A.h*(ig/100)*(1+3*rA(a,'DES'));
    add({nome:'impeto',K:pK+cont,h:1,I:pI*(1+ig*(0.5+rA(a,'FOR'))/100)*(ig>=70?1.08:1)+0.35*A.lI*A.h*ig/100,peso:'pesado',Tr:fT(pT)+0.45*ig/100,custoR:0,custoE:0,alvos:1,grande:true,ig});}
  for(const fc of b.tec){if((p.cd[fc.key]||0)>0)continue;let K=fc.K,I=fc.I;
    if(fc.cond){const ok=fc.cond==='flanco'?fl:fc.cond==='atordoado'?e.atord>0:fc.cond==='exposto|atordoado'?(e.atord>0||e.exposto>0):fc.cond==='ritmo>=3'?p.ritmo>=3:fc.cond==='marca'?p.marca>0:fc.cond==='comum'?!e.grande:false;
      if(!ok){if(fc.alt){K=fc.alt.K;I=fc.alt.I!=null?fc.alt.I:I;}else continue;}}
    if(fc.bonus){const qd=fc.bonus.quando;const ok=qd==='flanco'?fl:qd==='naoMirando'?(cen==='chefe'&&RND()<5/6):qd==='exposto'?e.exposto>0:qd==='marca'?p.marca>0:qd==='vida<30'?e.vida<e.vidaMax*.3:qd==='ritmo'?true:false;
      if(ok)K*=qd==='ritmo'?1+0.1*p.ritmo:fc.bonus.mult;}
    if(fc.bonusI&&fc.bonusI.quando==='gelo'&&e.lento>0)I+=fc.bonusI.I;
    let custo=fc.custo,sob=0,cargas=0,T=fc.T,Kc=K;
    if(fc.magico){const usa=p.cargas>=pol.cargaEm&&p.ene/p.eneMax>=pol.cargaSeEne&&fc.custo>=15&&(!pol.usaJanela||janela||!e.chefe);if(usa){cargas=p.cargas;sob+=0.2*cargas;Kc*=1+cargas*(0.08+0.12*rA(a,'POT'));T+=0.1*cargas;}
      if(fc.area&&nVivos<=1&&fc.forma!=='proj'){sob+=0.15;Kc*=1.05+0.2*rA(a,'CON');}
      custo=Math.round(fc.custo*(1+sob));if(fc.rec==='E'&&p.ene-custo<p.eneMax*pol.eneMin*0.5&&!janela)continue;}
    if(fc.rec==='R'&&pol.resMin&&p.res-custo<p.resMax*pol.resMin)continue;
    add({nome:'tec',fc,K:Kc,h:fc.h,tiq:fc.tiq,dot:fc.dot,I,peso:fc.peso,Tr:tempoReal(T,a,fc.magico),custoR:fc.rec==='R'?custo:0,custoE:fc.rec==='E'?custo:0,alvos:fc.alvos,
      el:fc.el,magico:fc.magico,decai:fc.decai,debuff:fc.debuff,expoe:fc.expoe,segundoSoFlanco:fc.segundoSoFlanco,flanco:fc.flancoGarantido?true:fl,cargas,custoBase:fc.custo,grande:fc.K*fc.h*fc.tiq>=1.5});}
  return best;}
function responder(p,e,dano,I,t,pol,hab,aoe){ // resposta a um ataque inimigo
  const a=p.a,A=ARMAS[p.b.arma];const marcado=p.marcado&&!aoe;p.marcado=false;
  const err=gauss()*hab.sigma;let escolha=RND();const podeBloq=A.bloq>0;
  if(p.atord>0||p.ocupGrande){return tomar(p,e,dano,I,t);}
  let jan=Math.min(.18,.14+.067*rA(a,'PER'));if(p.b.arma==='espada_longa'&&pol.guarda==='baixa')jan+=.02;if(p.b.arma==='katana')jan+=.04;jan=Math.min(.24,jan);
  if(!aoe&&escolha<pol.parry){ // tenta parry (segurando bloqueio quando a arma permite)
    p.ocup=Math.max(p.ocup,.25);
    if(Math.abs(err)<=jan/2){ganhaImp(p,20,t);if(e.atord<=0){e.pos-=25*(1+0.5*rA(a,'FOR')+0.5*rA(a,'PER'))*(e.resistQ>0?.5:1);e.semImp=0;if(e.pos<=0){e.pos=0;e.atord=2;e.resistQ=10;e.quebras++;ganhaImp(p,15,t);}}
      if(marcado)abrir(p,e,pol);if(p.b.arma==='duas_katanas'){golpe(p,e,.6,6,'leve',{},t);golpe(p,e,.6,6,'leve',{},t);}
      if(p.b.arma==='katana')golpe(p,e,1.2+0.8*.6,24,'leve',{},t);return 'parry';}
    if(podeBloq)return bloquear(p,e,dano,I,t,marcado,pol);return tomar(p,e,dano,I,t);}
  if(podeBloq&&escolha<pol.parry+pol.bloq)return bloquear(p,e,dano,I,t,marcado,pol);
  // esquiva: aperta ~0,10 s antes do golpe; i-frames 0,30 s; perfeita nos últimos 0,12 s
  const custo=p.b.arma==='duas_katanas'?14:20;if(p.res<custo)return podeBloq?bloquear(p,e,dano,I,t,marcado,pol):tomar(p,e,dano,I,t);
  p.res-=custo;p.semRes=0;p.ocup=Math.max(p.ocup,.38);const iframe=p.b.arma==='duas_katanas'?.24:.30;const off=.10+err;
  if(off>=0&&off<=iframe){if(off<=.12){p.res+=custo;ganhaImp(p,20,t);if(marcado)abrir(p,e,pol);}ganhaImp(p,6,t);return 'esquiva';}
  return tomar(p,e,dano,I,t);}
function abrir(p,e,pol){p.abertura=2;p.abertAlvo=e;p.usoAb=pol.impacto?'Desmontar':(pol.resMin?'Retomar':'Punir');}
function bloquear(p,e,dano,I,t,marcado,pol){const a=p.a,A=ARMAS[p.b.arma];
  let custo=(0.08*dano/p.s+0.25*I)/(1+0.6*rA(a,'FOR')+0.4*rA(a,'VIG'))/(A.bloq||1);if(p.b.arma==='espada_e_escudo')custo*=.75;
  p.ocup=Math.max(p.ocup,.3);if(p.res<custo){p.res=0;p.atord=1;return tomar(p,e,dano,I,t);}
  p.res-=custo;p.semRes=0;p.vida-=dano*0.30;p.recebido+=dano*0.30;p.pos-=I*0.5;p.semPos=0;if(marcado)abrir(p,e,pol);checarPostura(p);checarMorte(p);return 'bloqueio';}
function tomar(p,e,dano,I,t){p.vida-=dano;p.recebido+=dano;let Ii=I;if(p.barreira>0){const ab=Math.min(p.barreira,Ii);p.barreira-=ab;Ii-=ab;}p.pos-=Ii;p.semPos=0;p.ocup=Math.max(p.ocup,.4);p.fluxo=0;p.ritmo=0;p.frenesi=0;checarPostura(p);checarMorte(p);return 'golpe';}
function checarPostura(p){if(p.pos<=0){p.pos=p.posMax*.4;p.atord=2;}}
function checarMorte(p){if(p.vida<=0&&!p.morto){if(p.reserva>0){}p.morto=true;}}
function curarSe(p){if(p.vida<p.vidaMax*.4&&p.reserva>0&&p.pocoes>0&&p.atord<=0){const q=Math.min(p.reserva,250*p.s);p.reserva-=q;p.pocoes--;p.vida=Math.min(p.vidaMax,p.vida+q);p.ocup=Math.max(p.ocup,1.0);return true;}return false;}
// uma luta: jogadores (1 ou 6) contra alvos
function luta(builds,cen,dur,hab,pol,seed){RND=mulberry(seed);const s=builds[0].cfg.s;
  const players=builds.map(b=>novoJogador(b,s));
  let alvos;if(cen==='grupo')alvos=[0,1,2,3].map(()=>inimigo('fera',s));else alvos=[inimigo(cen,s)];
  alvos.forEach((e,i)=>{e.proxAtq=1.5+i*0.4+RND();});
  const dt=0.05;let t=0;
  while(t<dur){t+=dt;
    for(const p of players){if(p.morto&&!p.caido){p.caido=t;p.mortes++;}
      if(p.morto&&p.volta&&t>=p.volta){p.morto=false;p.volta=0;p.caido=0;const q=Math.min(.3*p.vidaMax,p.reserva);p.reserva-=q;p.vida=q;p.pos=p.posMax;p.ocup=.5;}
      else if(p.morto&&!p.volta&&p.reanim<2&&p.reserva>=.05*p.vidaMax&&t-p.caido<21){const al=players.find(x=>!x.morto&&x.atord<=0&&x!==p);if(al){al.ocup=Math.max(al.ocup,4);p.volta=t+4;p.reanim++;}}
      if(p.morto&&!p.volta&&t-p.caido>=25)p.perdido=true;}
    const vivosP=players.filter(p=>!p.morto);if(!vivosP.length)break;if(!alvos.some(e=>e.vida>0))break;
    for(const e of alvos){if(e.vida<=0)continue;if(e.atord>0){e.atord-=dt;if(e.atord<=0)e.pos=e.posMax;}else{e.semImp+=dt;if(e.semImp>2.5)e.pos=Math.min(e.posMax,e.pos+e.posMax*0.08*dt);}
      if(e.resistQ>0)e.resistQ-=dt;if(e.armRedT>0){e.armRedT-=dt;if(e.armRedT<=0)e.armRed=0;}if(e.exposto>0)e.exposto-=dt;if(e.lento>0)e.lento-=dt;if(e.brasa>0)e.brasa-=dt;
      if(e.grande&&!e.chefe&&cen!=='boneco'){}
      if(e.grande){e.proxFraco-=dt;if(e.proxFraco<=0){e.fraco=3;e.proxFraco=12;}if(e.fraco>0)e.fraco-=dt;}
      if(e.atord<=0&&t>=e.proxAtq){const gel=e.lento>0?1+0.15*(players[0].b.q.gelo||0.6)*0.5:1;e.proxAtq=t+e.int*gel*(0.85+RND()*0.3);
        const alvoP=vivosP[Math.floor(RND()*vivosP.length)];responder(alvoP,e,e.dano,e.I,t,pol,hab,false);}
      if(e.chefe&&e.atord<=0&&t>=e.proxAoe){e.proxAoe=t+e.aoeInt;for(const p of vivosP)responder(p,e,e.aoeDano,e.aoeI,t,{...pol,parry:0,bloq:pol.bloq},hab,true);}}
    for(const p of players){if(p.morto)continue;
      p.semRes+=dt;if(p.semRes>.8)p.res=Math.min(p.resMax,p.res+18*dt);p.ene=Math.min(p.eneMax,p.ene+p.regE*dt);if(p.ene<15)p.semEne+=dt;
      p.semPos+=dt;if(p.semPos>2)p.pos=Math.min(p.posMax,p.pos+10*(1+0.4*rA(p.a,'VIG'))*dt);
      for(const k in p.cd)p.cd[k]-=dt;p.reacCD-=dt;p.reacCtrl-=dt;if(p.abertura>0)p.abertura-=dt;if(p.leituraCD>0)p.leituraCD-=dt;
      if(p.cargas>0){p.cargaT-=dt;if(p.cargaT<=0)p.cargas=0;}if(p.marca>0)p.marca-=dt;if(p.frenesiT>0){p.frenesiT-=dt;if(p.frenesiT<=0)p.frenesi=0;}
      if(p.leituraCD<=0&&!p.marcado&&cen!=='boneco'){p.marcado=true;p.leituraCD=p.b.opc.perGrok?6:8;}
      for(let k=p.pend.length-1;k>=0;k--){if(t>=p.pend[k].em){const q=p.pend[k];p.pend.splice(k,1);aplicarAcao(p,q.ac,alvos,t);}}
      if(p.atord>0){p.atord-=dt;continue;}
      if(p.ocup>0){p.ocup-=dt;continue;}
      if(curarSe(p))continue;
      const ac=escolher(p,alvos,t,pol,cen);if(!ac){p.ocup=.2;continue;}
      p.acoes++;if(ac.nome==='leve'&&p.b.tec.some(fc=>fc.K>0&&(p.cd[fc.key]||0)<=0&&(fc.rec==='E'?fc.custo>p.ene:fc.custo>p.res)))p.forc++;
      p.res-=ac.custoR;if(ac.custoR)p.semRes=0;p.ene-=ac.custoE;p.ocup=ac.Tr;p.ofens+=ac.Tr;
      if(ac.nome==='impeto')p.imp=0;
      if(ac.nome==='cruzado')p.ritmo=0;else if(ac.nome==='leve'&&p.b.arma==='duas_espadas')p.ritmo=Math.min(4,p.ritmo+1);
      if(p.b.arma==='dois_machados'){p.frenesi=Math.min(5,p.frenesi+1+(ac.fc&&ac.fc.frenesi||0));p.frenesiT=2;}
      if(p.b.arma==='desarmado'&&!ac.magico)p.fluxo=Math.min(5,p.fluxo+1);
      if(ac.nome==='pesado'&&p.b.arma==='machado_pequeno')p.marca=6;
      if(ac.fc){p.cd[ac.fc.key]=ac.fc.cd;if(ac.cargas)p.cargas=0;}
      const em=t+(ac.Tr*0.55);
      if(ac.tiq>1){for(let k=0;k<ac.tiq;k++)p.pend.push({em:em+k,ac:{...ac,tiq:1,h:1,derivada:k>0,el:k===0?ac.el:null}});}
      else p.pend.push({em,ac});}}
  const venceu=!alvos.some(e=>e.vida>0);const tempo=t;
  return {venceu,tempo,mortes:players.reduce((q,p)=>q+p.mortes,0),recebido:media(players.map(p=>p.recebido/s/t*60)),orc:media(players.map(p=>(p.vidaMax+600*(1+0.8*rA(p.a,'VIG'))*s)/s)),dps:players.reduce((q,p)=>q+p.dano,0)/t/players.length/s,ofens:media(players.map(p=>p.ofens/t)),
    semEne:media(players.map(p=>p.semEne/t)),forc:media(players.map(p=>p.forc/Math.max(1,p.acoes))),quebras:alvos.reduce((q,e)=>q+e.quebras,0)};}
function bateria(build,cen,n,hab,pol,base,durF){const R=[];for(let i=0;i<n;i++){const bs=cen==='chefe'?[0,1,2,3,4,5].map(()=>build):[build];R.push(luta(bs,cen,durF||(cen==='chefe'?900:180),hab,pol,(base||1)*1000+i*7919+13));}
  const vit=R.filter(x=>x.venceu);const tv=vit.map(x=>x.tempo);const [wl,wh]=wilson(vit.length,n);
  return {n,vitorias:vit.length/n,wl,wh,tempo:vit.length?media(tv):Infinity,ic:ic95(tv),mortes:media(R.map(x=>x.mortes)),dps:media(R.map(x=>x.dps)),ofens:media(R.map(x=>x.ofens)),semEne:media(R.map(x=>x.semEne)),forc:media(R.map(x=>x.forc)),quebras:media(R.map(x=>x.quebras)),recebido:media(R.map(x=>x.recebido)),orc:media(R.map(x=>x.orc)),dur:media(R.map(x=>x.tempo))};}
function dpsBoneco(b,pol){RND=mulberry(42);const p=novoJogador(b,b.cfg.s);const e=inimigo('boneco',b.cfg.s);let t=0;const dt=.05;
  while(t<90){t+=dt;p.semRes+=dt;if(p.semRes>.8)p.res=Math.min(p.resMax,p.res+18*dt);p.ene=Math.min(p.eneMax,p.ene+p.regE*dt);for(const k in p.cd)p.cd[k]-=dt;p.reacCD-=dt;p.reacCtrl-=dt;
    if(p.cargas>0){p.cargaT-=dt;if(p.cargaT<=0)p.cargas=0;}if(e.atord>0){e.atord-=dt;if(e.atord<=0)e.pos=e.posMax;}if(e.resistQ>0)e.resistQ-=dt;if(e.armRedT>0){e.armRedT-=dt;if(e.armRedT<=0)e.armRed=0;}
    for(let k=p.pend.length-1;k>=0;k--){if(t>=p.pend[k].em){const q=p.pend[k];p.pend.splice(k,1);aplicarAcao(p,q.ac,[e],t);}}
    if(p.ocup>0){p.ocup-=dt;continue;}const ac=escolher(p,[e],t,pol,'boneco');if(!ac){p.ocup=.2;continue;}
    p.res-=ac.custoR;if(ac.custoR)p.semRes=0;p.ene-=ac.custoE;p.ocup=ac.Tr;if(ac.nome==='impeto')p.imp=0;if(ac.fc){p.cd[ac.fc.key]=ac.fc.cd;if(ac.cargas)p.cargas=0;}
    if(ac.tiq>1){for(let k=0;k<ac.tiq;k++)p.pend.push({em:t+ac.Tr*.55+k,ac:{...ac,tiq:1,h:1,derivada:k>0}});}else p.pend.push({em:t+ac.Tr*.55,ac});}
  return p.dano/90/b.cfg.s;}

module.exports={GLOBAL,ficha,montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,ARV,D,f,med,media,wilson,VERSAO_DADOS,FICHAS};
if(require.main===module)require('./rodar2.js');
