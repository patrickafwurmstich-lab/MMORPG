// Simulador de equilíbrio v3 (loop 5 → 6). Corrige os bloqueadores do ChatGPT e do Grok sobre o v2:
//  1 fases J.1 (preparo/execução/recuperação; defesa só cancela os últimos 40% da recuperação; golpes presos à ação e
//    cancelados se ela for interrompida ou o personagem cair; o aviso do inimigo entra na decisão de começar uma ação)
//  2 motor único: o boneco é só um inimigo que não ataca, no mesmo laço de luta
//  3 impacto = total da ação, dividido entre os acertos; básicos duplos = impacto por lâmina × 2; acertos no seu instante
//  4 defesas do núcleo D.1: esquiva comum sem Ímpeto, perfeita +20 e devolve custo; custo 20×(1+peso/40);
//    escudo −25% uma vez; parry falho 15R + 0,35 s; cada ataque declara o que dá para esquivar/aparar/bloquear/evitar
//  5 reanimação = canalização de 4 s, 1 ajudante por alvo, interrompida por dano, contador gasto na conclusão
//  6 chefe AO.1 real (4 ataques + Grito, fases, âncoras com rotas e cotas, adds) e chefe sintético separado
//  7 condições postura<30/<20; Juízo só inicia com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção;
//    reação usa a forma preparada; contato elemental por alvo
//  métricas: tempo ofensivo = tempo realmente dentro de ação ofensiva (0–100%); IC t de Student; escala por camada.
// Não avaliado (declarado no relatório): Leitura do grupo "distância/interrupção", Fadiga 100, regressão das âncoras,
//  guardas da âncora 3 atacando, passivas de texto e nós-chave, afixos e fabricação.
"use strict";
const fs=require('fs'),path=require('path'),vm=require('vm');
const RAIZ=path.join(__dirname,'..');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(RAIZ,'prototipo/v2/dados.js'),'utf8')+';this.DADOS=DADOS;',ctx);
const D=ctx.DADOS;const FICHAS=require('./fichas.js');
const VERSAO_DADOS=require('crypto').createHash('sha1').update(fs.readFileSync(path.join(RAIZ,'prototipo/v2/dados.js'))).digest('hex').slice(0,10);

// ---------- utilidades ----------
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let RND=Math.random;const GLOBAL={pArma:110,fogoArm:30,flanco:1.3,vidaComum:1,frenesiVel:.03,frenesiPorAcerto:true};const gauss=()=>{let u=0,v=0;while(!u)u=RND();while(!v)v=RND();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
const rr=x=>x/(x+40),Cc=x=>x+x*x/40;
const media=a=>a.length?a.reduce((q,x)=>q+x,0)/a.length:NaN;
function tq(df){const z=1.959964;if(df<1)return NaN;return z+(z**3+z)/(4*df)+(5*z**5+16*z**3+3*z)/(96*df*df)+(3*z**7+19*z**5+17*z**3-15*z)/(384*df**3);}
const icT=a=>{if(a.length<2)return 0;const m=media(a);const sd=Math.sqrt(a.reduce((q,x)=>q+(x-m)**2,0)/(a.length-1));return tq(a.length-1)*sd/Math.sqrt(a.length);};
const wilson=(k,n)=>{if(!n)return [0,0];const z=1.96,p=k/n,d=1+z*z/n,c=p+z*z/(2*n),e=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n));return [Math.max(0,(c-e)/d),Math.min(1,(c+e)/d)];};
const escala=c=>Math.pow(1.09,c-1); // s = 1,09^(camada−1)

// ---------- regras de arma (K.2) ----------
const ATR=['FOR','DES','VIG','POT','CON','PER'];
const CUSTO_PH={'Técnica':2,'Reação':2,'Passiva':1,'Transformação':2,'Nó-chave':3};
const ARMAS={ // bloq: multiplicador do custo de bloqueio (null = não bloqueia) · alc: m
 desarmado:{lK:.45,lT:.45,pK:1.10,pT:.95,lI:8,pI:22,bloq:1.25,h:1,alc:1.4},
 espada_curta:{lK:.55,lT:.55,pK:1.25,pT:1.00,lI:9,pI:22,bloq:1,h:1,alc:1.8},
 espada_longa:{lK:.62,lT:.68,pK:1.45,pT:1.20,lI:10,pI:26,bloq:1,h:1,alc:2.3},
 duas_espadas:{lK:.40,lT:.70,pK:1.30,pT:1.10,lI:6,pI:22,bloq:null,h:2,alc:2.0},
 espada_e_escudo:{lK:.58,lT:.65,pK:1.35,pT:1.15,lI:10,pI:24,bloq:.75,h:1,alc:2.0},
 katana:{lK:.65,lT:.62,pK:1.50,pT:1.10,lI:9,pI:24,bloq:null,h:1,alc:2.4},
 duas_katanas:{lK:.42,lT:.72,pK:1.35,pT:1.15,lI:6,pI:22,bloq:null,h:2,alc:2.2},
 machado_grande:{lK:.85,lT:1.00,pK:1.90,pT:1.70,lI:15,pI:40,bloq:1/1.3,h:1,alc:2.6},
 machado_pequeno:{lK:.58,lT:.60,pK:1.25,pT:1.05,lI:10,pI:24,bloq:1,h:1,alc:1.7},
 dois_machados:{lK:.38,lT:.66,pK:1.25,pT:1.05,lI:6,pI:24,bloq:null,h:2,alc:1.8},
 arco:{lK:.55,lT:.70,pK:1.50,pT:1.20,lI:6,pI:12,bloq:null,h:1,alc:30}
};
const ARMADURAS={leve:{A:40,peso:4},media:{A:85,peso:9},pesada:{A:140,peso:16}};
const PESO_ARMA=3; // simplificação declarada
const PESOS={leve:{FOR:.3,DES:.7},pesado:{FOR:.8,DES:.2},arma:{FOR:.5,DES:.5},imbuir:{FOR:.5,DES:.1,POT:.4},disparo:{DES:.4,POT:.4,CON:.2},arco:{DES:.7,PER:.3},conj:{POT:.6,CON:.4},disc:{FOR:.5,VIG:.5},ponto:{FOR:.3,DES:.3,PER:.4},pulso:{POT:.6,CON:.4}};
const ARV={};[...D.armas,...D.elems,...D.discs].forEach(a=>{ARV[a.id]=a;a.porN={};a.nos.forEach(n=>{a.porN[n.n]=n;n.arv=a.id;n.key=a.id+':'+n.n;});});
const ORD=['fogo','gelo','raio','terra','vento','agua'];
const TAG=t=>{t=(t||'').toLowerCase();return t.startsWith('rup')?'Ru':t.startsWith('exe')?'Ex':t.startsWith('cont')?'Co':t.startsWith('sus')?'Su':'?';};

// ---------- fichas ----------
const fichaCache={};
function ficha(no){if(fichaCache[no.key])return fichaCache[no.key];const t=no.t;const o=FICHAS[no.key]||{};const cat=ARV[no.arv].cat;
  const hits=t.hits||1;const fc={key:no.key,nome:no.nome,arv:no.arv,cat,K:o.K!=null?o.K:(t.K||0)/hits,h:o.h!=null?o.h:hits,I:o.I!=null?o.I:(t.I||0),T:o.T||Math.max(.45,t.tempo||.8),
    custo:t.custo||0,rec:t.rec||'R',cd:t.cd||6,forma:o.forma||(cat==='elem'?'proj':(no.arv==='arco'?'proj':'golpe')),alvos:o.alvos||1,tiq:o.tiq||1,dot:o.dot||0,alc:o.alc||(cat==='elem'?15:2.5),
    cond:o.cond||(/só inicia|só em alvo|só contra|só pelo flanco|exige/.test((t.txt||'').toLowerCase())?'outra':null),alt:o.alt||null,altInicio:no.key==='desarmado:16',bonus:o.bonus||null,bonusI:o.bonusI||null,
    peso:o.peso||(cat==='elem'?'conj':(no.arv==='arco'?(t.rec==='E'?'disparo':'arco'):(cat==='disc'?'disc':'arma'))),decai:o.decai||0,debuff:o.debuff||null,expoe:o.expoe||null,
    frenesi:o.frenesi||0,nota:o.nota||'',revisada:!!FICHAS[no.key],tag:TAG(t.tag)};
  fc.magico=fc.rec==='E'||cat==='elem';fc.el=cat==='elem'?no.arv:(/elemento/.test(t.txt||'')&&fc.K>0?'@':null);
  if(['area','volta','arco180','linha','zona'].includes(o.forma))fc.area=true;if(fc.alvos===1&&fc.area&&!o.alvos)fc.alvos=99;
  fc.ritmoConsome=!!(fc.bonus&&fc.bonus.quando==='ritmo');fc.interrompe=/interromp/i.test((t.txt||'')+' '+(no.ef||''));
  return fichaCache[no.key]=fc;}

// ---------- builds ----------
function custoAf(x,m){const c=Cc(x);return c-m*Math.min(15,0.25*c);}
function distribuir(nivel,alvos,afin){const tot=20+3*(nivel-1);const a={FOR:0,DES:0,VIG:0,POT:0,CON:0,PER:0};const m={};alvos.slice(0,2).forEach(([at])=>m[at]=afin?1:0);
  const gasto=()=>ATR.reduce((q,at)=>q+custoAf(a[at],m[at]||0),0);const ativos=alvos.map(x=>x.slice());
  for(;;){ativos.sort((x,y)=>a[x[0]]/x[1]-a[y[0]]/y[1]);let ok=false;for(const [at,mx] of ativos){if(a[at]>=mx)continue;a[at]++;if(gasto()>tot+1e-9){a[at]--;continue;}ok=true;break;}if(!ok)break;}
  return a;}
const PERFIS={
  'Força':{alvos:[['FOR',60],['VIG',60]],armadura:'media'},'Destreza':{alvos:[['DES',60],['FOR',35],['VIG',35]],armadura:'leve'},
  'Força+Destreza':{alvos:[['FOR',60],['DES',60],['VIG',15]],armadura:'media'},'Tanque':{alvos:[['VIG',60],['FOR',50]],armadura:'pesada'},
  'Leitor (PER)':{alvos:[['PER',60],['DES',55]],armadura:'leve'},'Mago':{alvos:[['POT',60],['CON',60],['VIG',15]],armadura:'leve'},
  'Lâmina mágica':{alvos:[['FOR',50],['POT',50],['DES',20]],armadura:'media'},'Generalista':{alvos:[['FOR',30],['DES',30],['VIG',30],['POT',30],['CON',30],['PER',30]],armadura:'media'}};
const rA=(a,at)=>rr(a[at]||0);
const multP=(a,p)=>{let s=0;for(const k in PESOS[p])s+=PESOS[p][k]*rA(a,k);return 1+s;};
const multI=a=>1+0.6*rA(a,'FOR')+0.4*rA(a,'CON');
function cadeia(no,comp,acc){acc=acc||new Set();if(comp.has(no.key)||acc.has(no.key))return acc;for(const rf of no.refs){const p=ARV[no.arv].porN[rf];if(p)cadeia(p,comp,acc);}acc.add(no.key);return acc;}
const phDe=keys=>{let s=0;for(const k of keys){const [a,n]=k.split(':');s+=CUSTO_PH[ARV[a].porN[+n].tipo];}return s;};
// fases (J.1): DES acelera preparo e recuperação; CON acelera o preparo mágico; execução nunca acelera
function fases(T,a,tipo,magico,vx){const pr=tipo==='leve'?[.30,.20,.50]:tipo==='pesado'?[.40,.15,.45]:[.35,.20,.45];const H=Math.min(1.45,1+0.35*rA(a,'DES')+(vx||0)),Hc=1+0.25*rA(a,'CON');
  return {prep:T*pr[0]/(magico?Hc:H),exec:T*pr[1],rec:T*pr[2]/H};}
function valorEstimado(fc,a,cen){if(!fc.K)return 0;if(fc.cond&&!['flanco','atordoado','exposto|atordoado','ritmo>=3','comum','postura<30','postura<20'].includes(fc.cond))return 0;
  const alv=cen==='grupo'?Math.min(fc.alvos,4):1;const F=fases(fc.T,a,'tec',fc.magico);const T=F.prep+F.exec+F.rec;let v=fc.K*fc.h*fc.tiq*multP(a,fc.peso)*alv*(1+fc.dot);
  if(fc.cond&&fc.cond!=='flanco'&&!fc.altInicio)v*=0.35;if(fc.cond==='flanco')v*=0.6;return v/Math.max(T,0.5)+fc.I*multI(a)*0.002/Math.max(T,.5);}
function montarBuild(cfg,arma,perfil,elems,cen,opc){
  const P=PERFIS[perfil];const alvos=cfg.ref?(perfil==='Generalista'?P.alvos.map(([x])=>[x,10]):[[P.alvos[0][0],20],[P.alvos[1][0],15],['VIG',10]]):P.alvos;
  const a=distribuir(cfg.nivel,alvos,true);const comp=new Set();let ph=4+(cfg.nivel-1);
  for(const e of elems)for(let i=1;i<=6;i++){const no=ARV[e].porN[i];const c=cadeia(no,comp);const cst=phDe(c);if(cst<=ph){c.forEach(k=>comp.add(k));ph-=cst;}}
  const cand=[];for(const id of [arma,...elems])for(const no of ARV[id].nos)if(no.t&&no.tipo==='Técnica'){const fc=ficha(no);if(fc.K>0||fc.tag==='Ru')cand.push(no);}
  const tec=[];while(tec.length<8){let best=null,bv=0;for(const no of cand){if(tec.includes(no))continue;const c=cadeia(no,comp);const cst=phDe(c);if(cst>ph)continue;
      const fc=ficha(no);let v=valorEstimado(fc,a,cen)/(1+cst*0.15);if(fc.tag==='Ru'&&!tec.some(x=>ficha(x).tag==='Ru'))v+=0.05; // garante 1 ruptura (interrupção) se couber
      if(v>bv){bv=v;best=no;}}if(!best)break;const c=cadeia(best,comp);ph-=phDe(c);c.forEach(k=>comp.add(k));tec.push(best);}
  const phEl={};let tot=0;for(const e of elems){phEl[e]=phDe([...comp].filter(k=>k.startsWith(e+':')));tot+=phEl[e];}
  const q={};for(const e of elems)q[e]=elems.length===1?1:0.6+0.4*phEl[e]/Math.max(1,tot);
  const troncos=elems.length>=2&&elems.every(e=>[1,2,3,4,5,6].every(n=>comp.has(e+':'+n)));
  // forma preparada de cada par (07): escolhida na montagem pela melhor disponível; não muda na luta
  const formas={},formasNome={},naoAval=[];for(let i=0;i<elems.length;i++)for(let j=i+1;j<elems.length;j++){const [A,B]=ORD.indexOf(elems[i])<ORD.indexOf(elems[j])?[elems[i],elems[j]]:[elems[j],elems[i]];const L=D.reacoes[A+'+'+B];if(!L)continue;
    const pa=phEl[A]||0,pb=phEl[B]||0,pp=pa/Math.max(1,pa+pb);const disp=[1];if(pp>=.7)disp.push(0);if(pp<=.3)disp.push(2);let mi=1,mv=-1;for(const k of disp){const x=L[k].fx||{};if(!(x.K||x.I||x.pos))continue;const v=(x.K||0)*(/por tique/.test(L[k].ef)?4:1)+((x.I||0)+(x.pos||0))*.01;if(v>mv){mv=v;mi=k;}}
    if(mv<0){naoAval.push(A+'+'+B);continue;}const fx=Object.assign({},L[mi].fx);if(/por tique/.test(L[mi].ef))fx.tiques=4;formas[A+'+'+B]=fx;formasNome[A+'+'+B]=L[mi].nome;}
  const arm=ARMADURAS[(opc&&opc.armadura)||P.armadura];
  return {cfg,arma,perfil,elems,a,tec:tec.map(ficha),comp,phEl,q,troncos,formas,formasNome,formasNaoAval:naoAval,phSobra:ph,opc:opc||{},armadura:arm,
    ranged:arma==='arco'||(perfil==='Mago'&&tec.filter(n=>ficha(n).magico).length>=4)};}

// ---------- inimigos ----------
// cada ataque: dano (antes de defesa, ×s), aviso, I, int, alvo: aggro|um|todosPerto|todos, resp: e(squiva) p(arry) b(loqueio) m(over-se)
const TIPOS={
  boneco:{vida:Infinity,pos:300,A:50,atq:[]},
  fera:{vida:650,pos:60,A:50,atq:[{nome:'mordida',dano:80,aviso:.55,I:25,int:1.6,alvo:'aggro',resp:'epb'}]},
  constructo:{vida:1100,pos:170,A:50,grande:1,atq:[{nome:'pancada',dano:160,aviso:1.0,I:50,int:3.0,alvo:'aggro',resp:'epb'}]},
  elemental:{vida:800,pos:80,A:30,atq:[{nome:'disparo',dano:120,aviso:1.0,I:0,int:3.5,alvo:'um',resp:'e',dist:1}]},
  ao1:{vida:120000,pos:1000,A:50,grande:1,chefe:1,atq:[
    {nome:'Golpe pesado',dano:300,aviso:1.0,I:40,int:8,alvo:'aggro',resp:'epb'},
    {nome:'Varredura',dano:220,aviso:.9,I:30,int:12,alvo:'todosPerto',resp:'m'},
    {nome:'Investida',dano:320,aviso:1.3,I:60,int:20,alvo:'um',resp:'m',investida:1},
    {nome:'Chuva de pedras',dano:180,aviso:1.5,I:0,int:25,alvo:'chuva',resp:'m'}]},
  sint:{vida:120000,pos:1000,A:50,grande:1,chefe:1,atq:[]} // padrão definido por cenário
};
function inimigo(tipo,s,mod){const T=TIPOS[tipo];mod=mod||{};const vm=tipo==='boneco'?1:(mod.vidaMult||1)*(T.chefe?1:GLOBAL.vidaComum);
  const atq=(mod.atq||T.atq).map(x=>Object.assign({},x,{prox:(x.int*(0.3+0.4*RND()))+1}));
  return {tipo,vida:T.vida*s*vm,vidaMax:T.vida*s*vm,pos:T.pos,posMax:T.pos,A:T.A*s,atq,grande:!!T.grande,chefe:!!T.chefe,s,
    atord:0,resistQ:0,semImp:9,armRed:0,armRedT:0,exposto:0,lento:0,brasa:0,quebras:0,fraco:0,proxFraco:6,anuncio:null,contato:null,exausto:0,invuln:false,furia:false,grito:0};}

// ---------- jogador ----------
const HAB={'médio':{sigma:.117,ganancia:.25,mover:.80,precisao:.75,colisao:.55,dir:.70},'bom':{sigma:.07,ganancia:.08,mover:.93,precisao:.92,colisao:.80,dir:.90}};
const POL={
  sustentado:{parry:.45,bloq:.15,eneMin:.30,cargaEm:3,cargaSeEne:.5,guarda:'baixa',carga:2},
  explosao:{parry:.45,bloq:.15,eneMin:.15,cargaEm:3,cargaSeEne:0,guarda:'baixa',carga:2,usaJanela:true},
  ruptura:{parry:.65,bloq:.10,eneMin:.25,cargaEm:3,cargaSeEne:.4,guarda:'alta',carga:3,impacto:true},
  defensiva:{parry:.30,bloq:.45,eneMin:.35,cargaEm:3,cargaSeEne:.6,guarda:'baixa',carga:2,resMin:.5}};
function novoJogador(b,s,id){const a=b.a;const p={id,b,a,s,vidaMax:1000*s*(1+0.9*rA(a,'VIG')),resMax:100*(1+0.6*rA(a,'VIG')),eneMax:100*(1+0.6*rA(a,'POT')),
  posMax:100*(1+0.8*rA(a,'VIG')+0.4*rA(a,'FOR'))*(b.armadura===ARMADURAS.pesada?1.2:1),regE:4*(1+rA(a,'CON')),reservaMax:600*(1+0.8*rA(a,'VIG'))*s*(b.opc.reservaBase?b.opc.reservaBase/600:1),
  A:b.armadura.A*s,custoEsq:20*(1+(b.armadura.peso+PESO_ARMA)/40)};
  if(b.opc.regenMago)p.regE+=4*rA(a,'CON')*rA(a,'POT');
  Object.assign(p,{vida:p.vidaMax,res:p.resMax,ene:p.eneMax,pos:p.posMax,reserva:p.reservaMax,imp:0,impJ:0,impS:0,semGastoR:9,semPos:9,cargas:0,cargaT:0,ganhoCarga:-9,cd:{},
    acao:null,atord:0,flinch:0,fluxo:0,ritmo:0,frenesi:0,frenesiT:0,marca:0,abertura:0,abertAlvo:null,leituraCD:0,marcado:false,reacCD:0,reacCtrl:0,
    dano:0,ofens:0,semEne:0,forc:0,acoes:0,recebido:0,pocoes:5,reanim:0,caido:false,caidoT:0,perdido:false,quedas:0,ajudando:null,ajudaT:0,gritoMais:0,ultDir:-1,
    prazo:Infinity,planos:[],tarefa:null,tarefaT:0,longe:false,ameaca:0,naoMirando:false});return p;}
function ganhaImp(p,v,t){if(t-p.impJ>=1){p.impJ=t;p.impS=0;}const g=Math.min(v,Math.max(0,45-p.impS));p.impS+=g;p.imp=Math.min(100,p.imp+g);}
const livre=(p,t)=>!p.caido&&p.atord<=0&&p.flinch<=0&&!p.tarefa&&!p.ajudando&&(!p.acao||t>=p.acao.fim);
const podeDefender=(p,t)=>{if(p.caido||p.atord>0||p.flinch>0||p.ajudando)return false;if(p.tarefa)return p.tarefa.tipo!=='canal';if(!p.acao)return true;const A=p.acao;
  return t>=A.fim||t>=A.fim-0.4*A.rec&&t>=A.tExecFim;};
function cortarAcao(p){if(p.acao){p.acao.cancelada=true;p.acao=null;}}

// ---------- dano e impacto ----------
function golpe(p,e,K,Iac,pesoN,o,t){o=o||{};if(e.vida<=0)return 0;const a=p.a,s=p.s;let pen=0,Iadd=0;
  if(p.abertura>0&&!o.derivada&&p.abertAlvo===e&&Iac>=0){const uso=p.usoAb;if(uso==='Punir')pen=(10+20*rA(a,'PER'))/100;else if(uso==='Desmontar')Iadd=5+10*rA(a,'PER');else p.res=Math.min(p.resMax,p.res+5+10*rA(a,'PER'));p.abertura=0;}
  let dmg=0;if(K>0){const arm=Math.max(0,e.A-e.armRed)*(1-Math.min(.35,pen));const Mt=200*s/(200*s+arm);
    let mult=multP(a,pesoN)*Mt;
    if(e.atord>0)mult*=1.3;
    if(e.exposto>0||e.exausto>0)mult*=1.2;
    if(o.flanco&&p.b.arma==='espada_curta')mult*=GLOBAL.flanco; // Flanco é a mecânica própria da espada curta (K.2)
    if(o.fraco)mult*=1.5;
    if(o.fogo&&e.brasa>0)mult*=1.08;
    dmg=GLOBAL.pArma*s*K*mult;if(e.vidaInvulAbaixo&&e.vida-dmg<e.vidaInvulAbaixo){dmg=Math.max(0,e.vida-e.vidaInvulAbaixo);}e.vida-=dmg;p.dano+=dmg;}
  let I=(Iac+Iadd),Ic=0;if(I>0){if(e.resistQ>0)I*=0.5;if(e.atord<=0){Ic=Math.min(I,e.pos);e.pos-=I;e.semImp=0;if(e.pos<=0){e.pos=0;e.atord=2;e.resistQ=10;e.quebras++;if(!o.derivada)ganhaImp(p,15,t);}}}
  if(e.chefe||e.ameacaDe)ameacar(e,p,dmg+2*Ic);
  return dmg;}
// aggro D.5: T = e^(−Δt/8)·T + dano + 2·postura causada (+0,8 interceptado, +0,5 cura: não há no simulador)
function ameacar(e,p,v){if(!e.T)e.T=new Map();e.T.set(p,(e.T.get(p)||0)+v);}
// impacto da ação inteira (D.2), com Ímpeto (+8% ao gastar ≥ 70) e mecânicas de arma; dividido entre os acertos por quem chama
function impactoAcao(p,ac){const a=p.a;let I=ac.I*multI(a)*(1+(ac.ig||0)*(0.5+rA(a,'FOR'))/100)*((ac.ig||0)>=70?1.08:1);if(ac.raioQ)I*=1+0.25*ac.raioQ;
  if(p.b.arma==='machado_pequeno'&&p.marca>0&&!ac.magico)I*=1.25;if(p.b.arma==='desarmado'&&!ac.magico)I*=1+0.06*p.fluxo;return I;}
function resolverAcerto(p,ac,hi,alvos,t,cena){if(ac.cancelada&&!hi.lancado)return;
  const vivos=alvos.filter(x=>x.vida>0&&!x.ancora);const e0=ac.alvo&&ac.alvo.vida>0?ac.alvo:vivos[0];if(!e0)return;
  const lista=ac.alvos>1?[e0,...vivos.filter(x=>x!==e0)].slice(0,ac.alvos):[e0];let i=0;
  for(const e of lista){let K=hi.K*(ac.decai?Math.pow(1-ac.decai,i):1);
    if(ac.condAcerto&&!checarCond(ac.condAcerto,p,e,cena))K=ac.alt?ac.alt.K:0; // perdeu a condição durante o preparo
    golpe(p,e,K,hi.I,hi.peso||ac.peso,{flanco:ac.flanco,fraco:ac.fraco&&i===0,derivada:hi.derivada,fogo:ac.el==='fogo'},t);
    if(hi.primeiro){if(ac.debuff&&ac.debuff.armadura){e.armRed=Math.max(e.armRed,ac.debuff.armadura*p.s);e.armRedT=ac.debuff.dur;}
      if(ac.debuff&&ac.debuff.fogoMais)e.brasa=ac.debuff.dur;if(ac.expoe&&p.frenesi>=3)e.exposto=ac.expoe.dur;
      if(ac.dot>0)cena.efeitos.push(...[1,2,3,4].map(k=>({t:t+k,dono:p,alvo:e,K:hi.K*ac.dot/4,peso:ac.peso})));
      if(ac.interrompe&&e.conjurando&&t<=e.conjurando.fim){e.conjurando.cortado=true;}}
    i++;}
  // ganhos de mecânica de arma só quando o acerto acontece (B2 do loop 6)
  if(hi.primeiro&&!hi.derivada)ganhosArma(p,ac,t);
  if(!hi.derivada&&p.b.arma==='dois_machados'&&!ac.magico){p.frenesi=Math.min(5,p.frenesi+(GLOBAL.frenesiPorAcerto?1:0)+(hi.primeiro&&ac.frenesiExtra?ac.frenesiExtra:0));p.frenesiT=2;} // +1 por acerto original; extra da técnica 1× por ação
  if(hi.primeiro&&ac.el){const el=ac.el==='@'?p.b.elems[0]:ac.el;if(el)elemento(p,e0,el,alvos,t,cena);}
  if(hi.primeiro&&ac.magico&&ac.custoBase>=15&&t-p.ganhoCarga>=2&&p.cargas<3){p.cargas++;p.ganhoCarga=t;p.cargaT=8;}}
function ganhosArma(p,ac,t){const b=p.b;
  if(ac.nome==='cruzado'||ac.ritmoConsome)p.ritmo=0;else if(ac.nome==='leve'&&b.arma==='duas_espadas')p.ritmo=Math.min(4,RND()<p.hab.dir?p.ritmo+1:0);
  if(b.arma==='desarmado'&&!ac.magico){if(RND()<p.hab.dir)p.fluxo=Math.min(5,p.fluxo+1);else p.fluxo=0;}
  if(ac.nome==='pesado'&&b.arma==='machado_pequeno')p.marca=6;}
// efeitos elementais (D.3) e misturas (07)
function elemento(p,e,el,alvos,t,cena){const q=p.b.q[el]||0.6,s=p.s;
  if(el==='fogo'){e.armRed=Math.max(e.armRed,GLOBAL.fogoArm*s*q);e.armRedT=6;}
  if(el==='gelo'&&!e.chefe)e.lento=Math.max(e.lento,4); // +15% na recuperação do alvo; chefe só em ataques compatíveis (nenhum declarado no AO.1)
  if(el==='terra'){p.barreira=Math.min(40,(p.barreiraT>0?p.barreira:0)+20*q);p.barreiraT=4;}
  if(el==='vento'&&t-(p.ventoT||-9)>=1){p.ventoT=t;ganhaImp(p,10*q,t);}
  // contato por ALVO e por JOGADOR: cada jogador tem o próprio contato em cada alvo
  if(!e.contato)e.contato=new Map();const c=e.contato.get(p);
  if(p.b.troncos&&c&&c.el!==el&&t-c.t<=4){const [A,B]=ORD.indexOf(c.el)<ORD.indexOf(el)?[c.el,el]:[el,c.el];const fx=p.b.formas[A+'+'+B];
    if(fx){const ctrl=!!fx.ctrl;if(ctrl?p.reacCtrl<=0:p.reacCD<=0){if(ctrl)p.reacCtrl=10;else p.reacCD=6;cena.reacoes++;
      const vivos=alvos.filter(z=>z.vida>0&&!z.ancora);const lst=fx.r?[e,...vivos.filter(z=>z!==e)].slice(0,fx.r>=3?3:2):[e]; // raio 2 m ≈ 2 alvos, 3 m ≈ 3 (geometria aproximada)
      const Ir=((fx.I||0)+(fx.pos||0))*multI(p.a);
      for(const z of lst){if(fx.tiques)for(let k=1;k<=fx.tiques;k++)cena.efeitos.push({t:t+k,dono:p,alvo:z,K:fx.K,peso:'conj'});else golpe(p,z,fx.K||0,Ir,'conj',{derivada:true},t);if(fx.tiques&&Ir)golpe(p,z,0,Ir,'conj',{derivada:true},t);}}}}
  e.contato.set(p,{el,t});} // depois de resolver A+B, registra B
function checarCond(c,p,e,cena){switch(c){case 'flanco':return !!(cena.flanco(p));case 'atordoado':return e.atord>0;case 'exposto|atordoado':return e.atord>0||e.exposto>0||e.exausto>0;
  case 'ritmo>=3':return p.ritmo>=3;case 'comum':return !e.grande;case 'postura<30':return e.pos<e.posMax*.3;case 'postura<20':return e.pos<e.posMax*.2;default:return false;}}

// ---------- escolha da ação ofensiva (respeita o aviso dos ataques que vêm) ----------
function escolher(p,alvos,t,pol,cena,hab){if(p.bainha&&p.prazo<Infinity)return null; // segurando a bainha até o golpe
const a=p.a,b=p.b,A=b.opc.armaMod?Object.assign({},ARMAS[b.arma],b.opc.armaMod):ARMAS[b.arma];const vivos=alvos.filter(x=>x.vida>0&&!x.ancora&&!x.invulTotal);if(!vivos.length)return null;
  const e=cena.alvoDe(p,vivos);const nV=vivos.length;const fl=cena.flanco(p);const janela=e.atord>0||p.abertura>0||e.exausto>0;
  const prazo=p.prazo; // instante do próximo ataque que exige reação deste jogador (Infinity se nenhum)
  const vx=b.arma==='dois_machados'&&!b.opc.semFrenesiVel?Math.min(.15,GLOBAL.frenesiVel*p.frenesi):0;const conj=e.conjurando&&!e.conjurando.cortado&&t<e.conjurando.fim?e.conjurando:null;
  let best=null,bv=-1;
  const add=ac=>{if(ac.custoR>p.res||ac.custoE>p.ene)return;const F=ac.F;const tot=F.prep+F.exec+F.rec;
    if(prazo<Infinity&&!p.ganancioso){const pronto=t+F.prep+F.exec+0.6*F.rec;if(pronto>prazo-0.12&&t+tot>prazo-0.12)return;}
    const nA=Math.min(ac.alvos||1,nV);let v=(ac.Kval||ac.K)*ac.h*(ac.tiq||1)*multP(a,ac.peso)*nA*(1+(ac.dot||0))/tot;
    const Ie=impactoAcao(p,ac);if(pol.impacto&&e.atord<=0)v=v*0.4+(Ie/tot)*0.05;else v+=Ie*0.002/tot;
    if(pol.usaJanela&&ac.grande&&!janela&&e.chefe)v*=0.3;
    if(conj&&ac.interrompe&&t+F.prep+F.exec<=conj.fim)v+=1000; // Grito: só vale se o acerto cair dentro da janela
    if(v>bv){bv=v;best=ac;}};
  let lK=A.lK,lT=A.lT,pK=A.pK,pT=A.pT,pI=A.pI;
  if(b.arma==='espada_longa'){if(pol.guarda==='alta'){lT*=1.1;pT*=1.1;pK=1.6;}else{lT*=.9;pT*=.9;}}
  if(b.arma==='machado_grande'){const nv=b.opc.cargaFixa||pol.carga;const ext=b.opc.cargaTempos||[0,.5,1,1.5];pK=[0,A.pK,A.pK*2.4/1.9,A.pK*3.0/1.9][nv];pT=A.pT+ext[nv];pI=40+10*nv;}
  if(b.arma==='katana'){pK=1.2+0.8*0.6;pT=0.6+0.72;}
  const mk=(nome,K,h,I,peso,T,tipo,extra)=>Object.assign({nome,K,h,I,peso,F:fases(T,a,tipo,false,vx),custoR:0,custoE:0,alvos:1,flanco:fl,alvo:e},extra||{});
  if(b.opc.pulso&&b.perfil==='Mago')add(Object.assign(mk('pulso',.70,1,4,'pulso',1.0,'tec'),{F:fases(1.0,a,'tec',true),magico:true}));
  const ritmoCheio=b.arma==='duas_espadas'&&p.ritmo>=4;
  if(!ritmoCheio)add(mk('leve',lK,A.h,A.lI*A.h,'leve',lT,'leve'));else add(mk('cruzado',1.0,1,25,'leve',.8,'leve'));
  add(mk('pesado',pK,1,pI,'pesado',pT,'pesado',{custoR:15,alvos:b.arma==='katana'?99:1,grande:true,superArmadura:b.arma==='machado_grande'&&(b.opc.cargaFixa||pol.carga)>=2}));
  if(e.fraco>0)add(mk('ponto',1.0,1,15,'ponto',.8,'leve',{fraco:true}));
  if(p.imp>=Math.max(20,pol.usaJanela?50:70)&&(!pol.usaJanela||janela||!e.chefe)){const ig=p.imp; // Golpe de Ímpeto (A.4): golpe principal + continuação como trecho próprio
    const contK=A.lK*A.h*(ig/100)*(1+3*rA(a,'DES')),contT=0.45*ig/100,contI=0.35*A.lI*A.h*ig/100*(ig>=70?1.08:1);const ac=mk('impeto',pK,1,pI,'pesado',pT,'pesado',{grande:true,ig,cont:{K:contK,T:contT,I:contI}});
    ac.Kval=pK+contK*multP(a,'leve')/multP(a,'pesado');ac.F=Object.assign({},ac.F,{rec:ac.F.rec+contT});add(ac);}
  for(const fc of b.tec){if((p.cd[fc.key]||0)>0)continue;if(!fc.K&&!(fc.interrompe&&conj))continue;let K=fc.K,I=fc.I,condAcerto=null;
    if(fc.cond){const ok=checarCond(fc.cond,p,e,cena);if(!ok){if(fc.altInicio&&fc.alt){K=fc.alt.K;I=fc.alt.I!=null?fc.alt.I:I;}else continue;}else if(fc.alt&&!fc.altInicio)condAcerto=fc.cond;}
    if(fc.bonus){const qd=fc.bonus.quando;const ok=qd==='flanco'?fl:qd==='naoMirando'?(e.chefe&&cena.aggro!==p):qd==='exposto'?(e.exposto>0||e.exausto>0):qd==='marca'?p.marca>0:qd==='vida<30'?e.vida<e.vidaMax*.3:qd==='ritmo'?p.ritmo>0:false;
      if(ok)K*=qd==='ritmo'?1+0.1*p.ritmo:fc.bonus.mult;}
    if(fc.bonusI&&fc.bonusI.quando==='gelo'&&e.lento>0)I+=fc.bonusI.I;
    let custo=fc.custo,sob=0,cargas=0,T=fc.T,Kc=K;
    if(fc.magico){const usa=p.cargas>=pol.cargaEm&&p.ene/p.eneMax>=pol.cargaSeEne&&fc.custo>=15&&(!pol.usaJanela||janela||!e.chefe);if(usa){cargas=p.cargas;sob+=0.2*cargas;Kc*=1+cargas*(0.08+0.12*rA(a,'POT'));T+=0.1*cargas;}
      if(fc.area&&nV<=1&&fc.forma!=='proj'){sob+=0.15;Kc*=1.05+0.2*rA(a,'CON');}
      custo=Math.round(fc.custo*(1+sob));if(fc.rec==='E'&&p.ene-custo<p.eneMax*pol.eneMin*0.5&&!janela)continue;}
    if(fc.rec==='R'&&pol.resMin&&p.res-custo<p.resMax*pol.resMin)continue;
    add({nome:'tec',fc,K:Kc,h:fc.h,tiq:fc.tiq,dot:fc.dot,I,peso:fc.peso,F:fases(T,a,'tec',fc.magico,fc.magico?0:vx),interrompe:fc.interrompe,custoR:fc.rec==='R'?custo:0,custoE:fc.rec==='E'?custo:0,alvos:fc.alvos,alvo:e,
      el:fc.el,magico:fc.magico,decai:fc.decai,debuff:fc.debuff,expoe:fc.expoe,flanco:fl,cargas,custoBase:fc.custo,grande:fc.K*fc.h*fc.tiq>=1.5,condAcerto,alt:fc.alt,
      raioQ:fc.el==='raio'?(p.b.q.raio||0):0,ritmoConsome:fc.ritmoConsome,frenesiExtra:fc.frenesi});}
  return best;}
// inicia a ação: agenda os acertos dentro da execução; custo e recarga no fim do preparo
function iniciar(p,ac,t,cena){p.bainha=null;const F=ac.F;Object.assign(ac,{t0:t,tPrepFim:t+F.prep,tExecFim:t+F.prep+F.exec,fim:t+F.prep+F.exec+F.rec,rec:F.rec,ofensiva:true,pago:false,cancelada:false});
  const Itot=impactoAcao(p,ac);const nh=Math.max(1,ac.h);ac.hits=[];
  if(ac.tiq>1){ // zona/canal lançado no fim da execução: tiques a cada 1 s, persistem
    ac.lanca=[];for(let k=0;k<ac.tiq;k++)ac.lanca.push({t:ac.tExecFim+k,K:ac.K,I:Itot/ac.tiq,primeiro:k===0,derivada:k>0});}
  else for(let k=0;k<nh;k++)ac.hits.push({t:ac.tPrepFim+F.exec*(k+0.5)/nh,K:ac.K,I:Itot/nh,primeiro:k===0});
  if(ac.cont)ac.hits.push({t:ac.tExecFim+ac.cont.T*0.5,K:ac.cont.K,I:ac.cont.I,peso:'leve',derivada:true}); // continuação: pesos de leve, impacto próprio, sem gerar recursos
  p.acao=ac;p.acoes++;}
function pagar(p,ac,t){ac.pago=true;p.res-=ac.custoR;if(ac.custoR)p.semGastoR=0;p.ene-=ac.custoE;if(ac.fc)p.cd[ac.fc.key]=ac.fc.cd;if(ac.cargas)p.cargas=0;if(ac.nome==='impeto')p.imp=0;
}
function lancar(p,ac){ac.lancou=true;for(const x of ac.lanca)cena.efeitosAcao.push({t:x.t,dono:p,ac,hi:Object.assign({lancado:true},x)});}
let cena=null;
// ---------- respostas defensivas ----------
function sofrer(p,dano,I){const M=200*p.s/(200*p.s+p.A);const d=dano*M*(p.gritoMais>0?1.2:1);p.vida-=d;p.recebido+=d;if(p.barreiraT>0&&p.barreira>0){const ab=Math.min(p.barreira,I);p.barreira-=ab;I-=ab;}p.pos-=I;p.semPos=0;p.bainha=null;}
function tomar(p,dano,I,t,fonte){sofrer(p,dano,I);p.semPos=0;p.fluxo=0;p.ritmo=0;p.frenesi=0;
  if(p.tarefa&&p.tarefa.tipo==='canal')p.tarefa.interrompida=true;if(p.ajudando){p.ajudando.ajudante=null;p.ajudando=null;}
  if(I>0&&!(p.acao&&p.acao.superArmadura&&!fonte.chefe)){cortarAcao(p);p.flinch=0.4;}
  if(p.pos<=0){p.pos=p.posMax*.4;p.atord=2;cortarAcao(p);}if(p.vida<=0)cair(p,t);return 'golpe';}
function cair(p,t){if(p.caido)return;if(cena&&cena.primeiraQueda==null)cena.primeiraQueda=t;p.caido=true;p.caidoT=t;p.quedas++;p.vida=0;cortarAcao(p);if(p.tarefa){p.tarefa.falhou=true;p.tarefa=null;}if(p.ajudando){p.ajudando.ajudante=null;p.ajudando=null;}}
function abrir(p,e,pol){p.abertura=2;p.abertAlvo=e;p.usoAb=pol.impacto?'Desmontar':(pol.resMin?'Retomar':'Punir');}
function responder(p,e,atq,t,pol,hab,leitura){const a=p.a,A=ARMAS[p.b.arma];const dano=atq.dano*e.s,I=atq.I;const marcado=p.marcado;p.marcado=false;
  if(!podeDefender(p,t))return tomar(p,dano,I,t,e);
  if(p.acao&&t<p.acao.fim)cortarAcao(p); // cancela os últimos 40% da recuperação
  if(atq.resp==='m'){ // evitar por posição (pular para as costas, sair da linha/círculo): exige estar livre; não custa resistência
    p.flinch=0.35;if(RND()<hab.mover){ganhaImp(p,8,t);return 'moveu';}
    if(p.b.opc.areaBloq&&ARMAS[p.b.arma].bloq!=null&&atq.nome!=='Investida'){const red=p.b.opc.areaBloq;return tomar(p,dano*(1-red),I*(1-red),t,e);} // ensaio: bloqueio frontal reduz área
    return tomar(p,dano,I,t,e);}
  const err=gauss()*hab.sigma+(leitura==='atraso'?0.12*(1-hab.precisao):0);const r=RND();const podeB=A.bloq!=null&&atq.resp.includes('b'),podeP=atq.resp.includes('p'),podeE=atq.resp.includes('e');
  const bainhaOk=p.b.arma==='katana'&&p.bainha&&t-p.bainha.t0>=0.4;
  if(podeP&&(r<pol.parry||bainhaOk)){let jan=Math.min(.18,.14+.067*rA(a,'PER'));if(p.b.arma==='espada_longa'&&pol.guarda==='baixa')jan+=.02;const saque=p.b.arma==='katana'&&p.bainha&&t-p.bainha.t0>=0.4;if(saque)jan+=.04;if(leitura==='atraso')jan+=.06;jan=Math.min(.24,jan);
    p.flinch=0.25;if(Math.abs(err)<=jan/2){ganhaImp(p,20,t);golpe(p,e,0,25*(1+0.5*rA(a,'FOR')+0.5*rA(a,'PER')),'leve',{derivada:false},t);
      if(marcado)abrir(p,e,pol);if(p.b.arma==='duas_katanas'){golpe(p,e,.6,6,'leve',{},t);golpe(p,e,.6,6,'leve',{},t);}if(saque){const carga=Math.max(0,Math.min(1,(t-p.bainha.t0-0.4)/1.2));p.bainha=null;golpe(p,e,1.2+0.8*carga,24*multI(a),'leve',{},t);}return 'parry';}
    p.res=Math.max(0,p.res-15);p.semGastoR=0;p.flinch=0.35;return tomar(p,dano,I,t,e);}
  if(podeB&&(r<pol.parry+pol.bloq||!podeE)){if(leitura==='quebraGuarda'){p.flinch=1.0;e.flancoAberto=1.2;return tomar(p,dano,I,t,e);}
    const bloqMult=A.bloq*(p.b.opc.bloqEscudo&&p.b.arma==='espada_e_escudo'?p.b.opc.bloqEscudo:1);let custo=(0.08*dano/p.s+0.25*I)/(1+0.6*rA(a,'FOR')+0.4*rA(a,'VIG'))*A.bloq;
    p.flinch=0.3;if(p.res<custo){p.res=0;p.flinch=1.0;return tomar(p,dano,I,t,e);}
    p.res-=custo;p.semGastoR=0;const passa=p.b.opc.atravessa!=null?p.b.opc.atravessa:0.30;sofrer(p,dano*passa,I*0.5);
    if(marcado)abrir(p,e,pol);if(p.pos<=0){p.pos=p.posMax*.4;p.atord=2;}if(p.vida<=0)cair(p,t);p.stats.bloq++;return 'bloqueio';}
  if(podeE){const custo=p.custoEsq*(p.b.arma==='duas_katanas'?0.7:1);if(p.res<custo)return tomar(p,dano,I,t,e);
    p.res-=custo;p.semGastoR=0;p.flinch=0.40;const iframe=p.b.arma==='duas_katanas'?0.24:0.30;const off=.10+err;p.stats.esq++;
    if(off>=0&&off<=iframe){if(off<=.12+(p.b.armadura===ARMADURAS.leve?.02:0)){p.res+=custo;ganhaImp(p,20,t);if(marcado)abrir(p,e,pol);}return 'esquiva';}
    return tomar(p,dano,I,t,e);}
  return tomar(p,dano,I,t,e);}

// ---------- âncoras (AO.1) ----------
function planoAncoras(players,hab){ // rotas disponíveis para este grupo
  const els=new Set(players.map(p=>p.b.elems).flat());const R={};
  R.impacto=players.slice().sort((x,y)=>taxaImpacto(y)-taxaImpacto(x)).slice(0,2);R.impactoDur=300/R.impacto.reduce((q,p)=>q+taxaImpacto(p),0);
  R.precisao=players.filter(p=>p.b.arma==='arco'||p.a.PER>=15);if(!R.precisao.length)R.precisao=players.slice(); // qualquer um pode acertar os cristais; arco/PER ≥ 15 só aumenta a chance (hipótese declarada)
  const porEl={};for(const p of players)for(const e of p.b.elems)if(!porEl[e])porEl[e]=p;const par=Object.values(porEl);R.elemento=(els.size>=2?[par[0],par.find(x=>x!==par[0])||par[1]]:(players.find(p=>p.b.elems.length>=2)?[players.find(p=>p.b.elems.length>=2)]:null));
  if(R.elemento&&R.elemento.some(x=>!x))R.elemento=null;
  R.protecao=players.filter(p=>p.b.arma==='espada_e_escudo'||p.b.elems.includes('terra'));if(!R.protecao.length)R.protecao=null;
  R.controle=players.filter(p=>p.b.tec.some(fc=>fc.tag==='Ru'));if(!R.controle.length)R.controle=null;
  return R;}
function taxaImpacto(p){const A=ARMAS[p.b.arma];const F=fases(A.pT,p.a,'pesado',false);return A.pI*multI(p.a)/(F.prep+F.exec+F.rec);}

// ---------- luta ----------
function luta(builds,cfgCena,hab,pol,seed){RND=mulberry(seed);const s=cfgCena.s;
  const players=builds.map((b,i)=>{const p=novoJogador(b,s,i);p.hab=hab;p.pol=b.opc.pol?POL[b.opc.pol]:pol;p.stats={bloq:0,esq:0};p.papel=papel(b);return p;});
  const alvos=[];const C={efeitos:[],efeitosAcao:[],aggro:null,tarefasT:0,motivo:null,ancoras:null,adds:0,gritos:0,gritosCortados:0,colisoes:0,reacoes:0,flancoT:0,leituras:0,quedasSemReserva:0};cena=C;
  for(const x of cfgCena.inimigos)alvos.push(inimigo(x.tipo,s,x.mod));
  const chefe=alvos.find(e=>e.chefe);
  const melee=p=>!p.b.ranged;
  // Flanco contra chefe: só com o chefe em ataque/abertura (contrato: ~40% do tempo) e para quem não tem a ameaça
  const chefeAbre=()=>chefe&&(chefe.atord>0||chefe.exausto>0||chefe.flancoAberto>0||(chefe.anuncio&&true)||t-(chefe.ultImpacto||-9)<0.6);
  C.flanco=p=>{if(!chefe)return RND()<0.3;if(C.aggro===p||!melee(p))return false;return chefeAbre();};
  C.alvoDe=(p,vivos)=>{const adds=vivos.filter(x=>!x.chefe);if(chefe&&adds.length&&C.aggro!==p)return adds[0];return vivos.find(x=>x.chefe&&!x.invulTotal)||vivos[0];};
  if(chefe&&cfgCena.ancoras){C.ancoras={atual:0,feitas:[0,0,0],cotas:[{},{},{}],fim:false};}
  const dt=0.02;let t=0;const dur=cfgCena.dur;const decai=Math.exp(-dt/8);
  const L={oport:0,cont:{},ativa:null,ate:0,aviso:0,familia:0,cd:0}; // Leitura do grupo (E.3)
  // aggro D.5: maior T; trocar de alvo exige +20%
  const aggroDe=()=>{if(!chefe||!chefe.T)return C.aggro&&!C.aggro.caido?C.aggro:players.find(p=>!p.caido)||null;const cand=players.filter(p=>!p.caido&&!p.longe);if(!cand.length)return players.find(p=>!p.caido)||null;
    const T=p=>chefe.T.get(p)||0;let m=cand.reduce((a,b)=>T(b)>T(a)?b:a);const cur=C.aggro&&!C.aggro.caido&&!C.aggro.longe?C.aggro:null;if(cur&&T(m)<1.2*T(cur))m=cur;return m;};
  while(t<dur){t+=dt;
    const vivosP=players.filter(p=>!p.caido);if(!vivosP.length){C.motivo='derrota';break;}
    if(!alvos.some(e=>e.vida>0&&!e.ancora)&&(!C.ancoras||C.ancoras.fim)){break;}
    if(C.ancoras&&C.ancoras.semRota&&chefe&&chefe.invulTotal)break;
    for(const e of alvos)if(e.T)for(const [k,v] of e.T)e.T.set(k,v*decai);
    C.aggro=aggroDe();if(chefeAbre())C.flancoT+=dt;
    // --- chefe: fases, 25% invulnerável sem âncoras, fúria só com âncoras feitas E vida ≤ 25%, Grito na fase 2
    if(chefe&&chefe.vida>0){const fr=chefe.vida/chefe.vidaMax;
      if(C.ancoras&&!C.ancoras.fim)chefe.vidaInvulAbaixo=chefe.vidaMax*.25;else chefe.vidaInvulAbaixo=0;
      if(C.ancoras&&C.ancoras.fim&&fr<=0.25&&!chefe.furia){chefe.furia=true;chefe.atq.forEach(x=>x.int*=0.8);}
      chefe.invulTotal=!!(C.ancoras&&!C.ancoras.fim&&chefe.vida<=chefe.vidaMax*.25+1e-6);
      const fase2=fr<0.6&&fr>0.25;
      if(cfgCena.grito&&fase2&&!chefe.gritoT)chefe.gritoT=t+5;
      if(chefe.gritoT&&t>=chefe.gritoT&&chefe.atord<=0&&!chefe.conjurando){if(fase2){chefe.conjurando={fim:t+1.2,cortado:false};C.gritos++;}chefe.gritoT=fase2?t+30:0;}
      if(chefe.conjurando&&(t>=chefe.conjurando.fim||chefe.conjurando.cortado)){if(chefe.conjurando.cortado)C.gritosCortados++;else players.forEach(p=>p.gritoMais=10);chefe.conjurando=null;}}
    // --- efeitos lançados (tiques de zona, DoT)
    for(let k=C.efeitosAcao.length-1;k>=0;k--){const x=C.efeitosAcao[k];if(t>=x.t){C.efeitosAcao.splice(k,1);resolverAcerto(x.dono,x.ac,x.hi,alvos,t,C);}}
    for(let k=C.efeitos.length-1;k>=0;k--){const x=C.efeitos[k];if(t>=x.t){C.efeitos.splice(k,1);if(x.alvo.vida>0)golpe(x.dono,x.alvo,x.K,0,x.peso,{derivada:true},t);}}
    // --- Leitura do grupo (E.3): ≥ 20 oportunidades; aviso 5 s; 1 família (Golpe pesado); ≤ 25% dos ataques; 30 s
    if(cfgCena.leitura&&!L.ativa&&L.oport>=20&&t>=L.cd){let dom=null,mv=0,tot=0;for(const k in L.cont){tot+=L.cont[k];if(L.cont[k]>mv){mv=L.cont[k];dom=k;}}
      if(dom&&mv/tot>=0.5&&(dom==='bloqueio'||dom==='esquiva')){L.ativa=dom==='bloqueio'?'quebraGuarda':'atraso';L.aviso=t+5;L.ate=t+35;L.familia=0;C.leituras++;}L.oport=0;L.cont={};}
    if(L.ativa&&t>=L.ate){L.ativa=null;L.cd=t+10;}
    // --- inimigos
    for(const e of alvos){if(e.vida<=0)continue;
      if(e.atord>0){e.atord-=dt;if(e.atord<=0)e.pos=e.posMax;}else{e.semImp+=dt;if(e.semImp>2.5)e.pos=Math.min(e.posMax,e.pos+e.posMax*0.08*dt);}
      if(e.resistQ>0)e.resistQ-=dt;if(e.armRedT>0){e.armRedT-=dt;if(e.armRedT<=0)e.armRed=0;}if(e.exposto>0)e.exposto-=dt;if(e.lento>0)e.lento-=dt;if(e.brasa>0)e.brasa-=dt;if(e.exausto>0)e.exausto-=dt;if(e.flancoAberto>0)e.flancoAberto-=dt;
      if(e.grande){e.proxFraco-=dt;if(e.proxFraco<=0){e.fraco=3;e.proxFraco=12;}if(e.fraco>0)e.fraco-=dt;}
      if(e.atord>0||e.exausto>0){e.atq.forEach(x=>x.prox+=dt);if(e.anuncio)e.anuncio.imp+=dt;continue;}
      if(e.anuncio&&t>=e.anuncio.imp){const an=e.anuncio;e.anuncio=null;const atq=an.atq;e.ultImpacto=t;
        for(const p of an.alvos){if(p.caido)continue;p.prazo=Infinity;
          let leit=null;if(atq.nome==='Golpe pesado'&&L.ativa&&t>=L.aviso){L.familia++;if(L.familia%4===0)leit=L.ativa;} // ≤ 25% dos golpes da família
          if(p.longe&&atq.alvo==='todosPerto')continue;
          const r=responder(p,e,atq,t,p.pol,p.hab,leit);
          if(atq.nome==='Golpe pesado'&&cfgCena.leitura){L.oport++;const w=(r==='bloqueio'&&p.papel==='Co')?0.5:1;L.cont[r]=(L.cont[r]||0)+w;}
          if(atq.investida&&C.ancoras&&!C.ancoras.fim&&C.ancoras.atual===0&&r==='moveu'&&podeRota(C,0,'colisao')&&RND()<p.hab.colisao){intervir(C,0,'colisao',t);e.exausto=6;C.colisoes++;}}}
      if(!e.anuncio){const pr=e.atq.filter(x=>t>=x.prox).sort((x,y)=>x.prox-y.prox)[0];if(pr){
        const lento=e.lento>0?1+0.15*0.45:1; // Gelo: +15% na recuperação (≈ 45% do ciclo do ataque)
        pr.prox=t+pr.int*lento*(0.9+0.2*RND());
        let alv=[];const vp=players.filter(p=>!p.caido);
        if(pr.alvo==='aggro')alv=[C.aggro&&!C.aggro.caido?C.aggro:vp[Math.floor(RND()*vp.length)]];
        else if(pr.alvo==='um')alv=[vp[Math.floor(RND()*vp.length)]];
        else if(pr.alvo==='todosPerto')alv=vp.filter(p=>melee(p)&&!p.longe);
        else if(pr.alvo==='chuva')alv=vp.filter(()=>RND()<5/6);
        else alv=vp;
        alv=alv.filter(Boolean);if(alv.length){e.anuncio={atq:pr,imp:t+pr.aviso,alvos:alv};for(const p of alv){p.prazo=Math.min(p.prazo||Infinity,t+pr.aviso);p.ganancioso=RND()<p.hab.ganancia;
          if(p.b.arma==='katana'&&pr.resp.includes('p')&&pr.aviso>=0.4&&!p.bainha&&!p.ganancioso&&(!p.acao||t>=p.acao.fim))p.bainha={t0:t};} /* katana guarda (0,4 s) para o saque de resposta */}}}}
    if(C.ancoras&&!C.ancoras.fim)gerirAncoras(C,players,alvos,t,cfgCena);
    // --- reanimação: 1 ajudante por alvo, canal de 4 s, exige reserva do caído ≥ 5% (ou custo fixo do ajudante no ensaio)
    for(const p of players){if(!p.caido||p.perdido)continue;if(t-p.caidoT>=25){p.perdido=true;continue;}
      const fixa=p.b.opc.reanimFixa;const okRes=fixa?true:p.reserva>=.05*p.vidaMax;if(!okRes&&!p.semReservaContado){p.semReservaContado=true;C.quedasSemReserva++;}
      if(!p.ajudante&&p.reanim<2&&okRes){const h=players.find(x=>!x.caido&&!x.ajudando&&!x.tarefa&&x!==C.aggro&&x.atord<=0&&(!fixa||x.reserva>=fixa*s));if(h){cortarAcao(h);h.ajudando=p;h.ajudaT=t+4;p.ajudante=h;}}}
    for(const p of players){if(p.caido)continue;
      p.semGastoR+=dt;if(p.semGastoR>.8)p.res=Math.min(p.resMax,p.res+18*dt);p.ene=Math.min(p.eneMax,p.ene+p.regE*dt);if(p.ene<15)p.semEne+=dt;
      p.semPos+=dt;if(p.semPos>2)p.pos=Math.min(p.posMax,p.pos+10*(1+0.4*rA(p.a,'VIG'))*dt);if(p.gritoMais>0)p.gritoMais-=dt;if(p.barreiraT>0)p.barreiraT-=dt;
      for(const k in p.cd)p.cd[k]-=dt;p.reacCD-=dt;p.reacCtrl-=dt;if(p.abertura>0)p.abertura-=dt;if(p.leituraCD>0)p.leituraCD-=dt;
      if(p.cargas>0){p.cargaT-=dt;if(p.cargaT<=0)p.cargas=0;}if(p.marca>0)p.marca-=dt;if(p.frenesiT>0){p.frenesiT-=dt;if(p.frenesiT<=0)p.frenesi=0;}
      if(p.leituraCD<=0&&!p.marcado&&cfgCena.ameaca){p.marcado=true;p.leituraCD=8;}
      if(p.imp>0&&!(p.acao&&p.acao.ofensiva))p.imp=Math.max(0,p.imp-10*dt);
      if(p.ajudando){if(t>=p.ajudaT){const q=p.ajudando;if(q.caido&&!q.perdido){q.caido=false;const fixa=q.b.opc.reanimFixa;let v;if(fixa){v=.3*q.vidaMax;p.reserva-=fixa*s;}else{v=Math.min(.3*q.vidaMax,q.reserva);q.reserva-=v;}q.vida=v;q.pos=q.posMax;q.reanim++;q.flinch=0.5;}q.ajudante=null;p.ajudando=null;}continue;}
      if(p.tarefa){C.tarefasT+=dt;continue;}
      if(p.atord>0){p.atord-=dt;continue;}if(p.flinch>0){p.flinch-=dt;continue;}
      const ac=p.acao;
      if(ac){if(!ac.pago&&t>=ac.tPrepFim&&ac.ofensiva)pagar(p,ac,t);
        if(ac.lanca&&!ac.lancou&&t>=ac.tExecFim)lancar(p,ac); // zona só existe depois da execução completa
        if(ac.hits)for(const hi of ac.hits)if(!hi.feito&&t>=hi.t){hi.feito=true;resolverAcerto(p,ac,hi,alvos,t,C);}
        if(ac.ofensiva)p.ofens+=dt;
        if(t<ac.fim)continue;if(ac.ofensiva)p.ultFimOf=t;p.acao=null;}
      // poção (1 s, máx. 5, sai da reserva): política preserva reserva para 1 reanimação (30% da vida), salvo emergência (< 20%)
      if(p.vida<p.vidaMax*.4&&p.reserva>0&&p.pocoes>0&&cfgCena.ameaca){const q=Math.min(p.reserva,250*s);const guarda=p.b.opc.pocaoLivre?0:0.30*p.vidaMax;
        if(p.reserva-q>=guarda||p.vida<p.vidaMax*.2){p.reserva-=q;p.pocoes--;p.vida=Math.min(p.vidaMax,p.vida+q);p.acao={fim:t+1.0,hits:[],ofensiva:false,pago:true,rec:1,tExecFim:t+1};continue;}}
      if(p.prazo<=t)p.prazo=Infinity;
      const esc=escolher(p,alvos,t,p.pol,C,p.hab);if(!esc){continue;}
      if(esc.nome==='leve'&&p.b.tec.some(fc=>fc.K>0&&(p.cd[fc.key]||0)<=0&&(fc.rec==='E'?fc.custo>p.ene:fc.custo>p.res)))p.forc++;
      iniciar(p,esc,t,C);}
  }
  const venceu=!alvos.some(e=>e.vida>0&&!e.ancora)&&(!C.ancoras||C.ancoras.fim);
  if(!venceu&&!C.motivo)C.motivo=(C.ancoras&&!C.ancoras.fim&&chefe&&chefe.invulTotal)?(C.ancoras.semRota?'sem rota':'âncoras'):'tempo';
  return {venceu,tempo:t,motivo:venceu?'vitória':C.motivo,quedas:players.reduce((q,p)=>q+p.quedas,0),reanim:players.reduce((q,p)=>q+p.reanim,0),pocoes:players.reduce((q,p)=>q+5-p.pocoes,0),
    dps:players.reduce((q,p)=>q+p.dano,0)/t/players.length/s,ofens:media(players.map(p=>p.ofens/t)),semEne:media(players.map(p=>p.semEne/t)),forc:media(players.map(p=>p.forc/Math.max(1,p.acoes))),
    recebido:media(players.map(p=>p.recebido/s/t*60)),quebras:alvos.reduce((q,e)=>q+e.quebras,0),tarefas:C.tarefasT/players.length/t,gritos:C.gritos,gritosCortados:C.gritosCortados,colisoes:C.colisoes,
    reacoes:C.reacoes,flanco:C.flancoT/t,primeiraQueda:C.primeiraQueda,leituras:C.leituras,semReserva:C.quedasSemReserva,
    porJogador:players.map(p=>({perfil:p.b.perfil,dps:p.dano/t/s,recebido:p.recebido/s/t*60,quedas:p.quedas}))};}
// papel do jogador = etiqueta majoritária das técnicas equipadas (D.4)
function papel(b){const c={};for(const fc of b.tec)c[fc.tag]=(c[fc.tag]||0)+1;let m='?',v=0;for(const k in c)if(c[k]>v){v=c[k];m=k;}return m;}
// rotas e cotas: cada âncora precisa de 4 intervenções; cada rota resolve no máximo 2 por âncora
const ROTAS=[['colisao','impacto','manual'],['precisao','elemento','manual'],['protecao','controle','manual']];
function podeRota(C,i,r){return (C.ancoras.cotas[i][r]||0)<2;}
function intervir(C,i,r,t){const A=C.ancoras;A.cotas[i][r]=(A.cotas[i][r]||0)+1;A.feitas[i]++;}
function gerirAncoras(C,players,alvos,t,cfg){const A=C.ancoras;const i=A.atual;const R=planoAncoras(players.filter(p=>!p.caido)); // rotas recalculadas com quem está de pé
  if(A.feitas[i]>=4){A.atual++;spawnAdds(alvos,cfg.s);if(A.atual>=3){A.fim=true;return;}return;}
  if(A.tarefa){const tf=A.tarefa;
    if(tf.falhou||tf.quem.some(p=>p.caido)){tf.quem.forEach(p=>{if(p.tarefa===tf)p.tarefa=null;p.longe=false;});A.tarefa=null;return;}
    if(tf.tipo==='canal'&&tf.interrompida){tf.interrompida=false;tf.fim=t+Math.max(0,(tf.fim-t))+2.0;} // conserva 50% do canal (2 de 4 s)
    if(t>=tf.fim){if(RND()<tf.prob)intervir(C,i,tf.rota,t);tf.quem.forEach(p=>{p.tarefa=null;p.longe=false;});A.tarefa=null;}return;}
  // escolhe a próxima rota disponível
  const vivos=players.filter(p=>!p.caido);const livreT=p=>p&&!p.caido&&!p.tarefa&&!p.ajudando; // quem tem a ameaça também pode ir (a ameaça passa para outro)
  const pega=l=>{const c=l.filter(livreT);return c.find(p=>p!==C.aggro)||c[0]||null;};
  for(const r of ROTAS[i]){if(!podeRota(C,i,r))continue;let quem=null,dur=0,prob=1,tipo='acao';
    if(r==='colisao')continue; // acontece na Investida (resolvido no ataque)
    if(r==='impacto'){if(R.impactoDur>10)continue;quem=R.impacto;dur=3+R.impactoDur;}
    if(r==='precisao'){const c=pega(R.precisao);if(!c)continue;quem=[c];dur=(c.b.arma==='arco'?0:3)+6;prob=c.hab.precisao*((c.b.arma==='arco'||c.a.PER>=15)?1:0.6);}
    if(r==='elemento'){if(!R.elemento)continue;quem=R.elemento;dur=3+5;}
    if(r==='protecao'){if(!R.protecao)continue;const pr=pega(R.protecao);if(!pr)continue;const op=vivos.filter(p=>p!==pr&&livreT(p)&&p!==C.aggro)[0];if(!op)continue;quem=[op,pr];dur=3+4;}
    if(r==='controle'){if(!R.controle)continue;const c=pega(R.controle);if(!c)continue;quem=[c];dur=3+7;prob=0.85;}
    if(r==='manual'){const op=vivos.filter(p=>livreT(p)&&p!==C.aggro).sort((x,y)=>x.dano-y.dano)[0];if(!op)continue;quem=[op];dur=3+4;tipo='canal';}
    if(!quem||!quem.every(livreT))continue;
    const tf={rota:r,quem,fim:t+dur,prob,tipo};quem.forEach(p=>{cortarAcao(p);p.tarefa=tf;p.longe=true;});A.tarefa=tf;return;}
  // sem nada disponível agora: verifica se a âncora ainda é possível
  const rest=4-A.feitas[i];const cap=ROTAS[i].reduce((q,r)=>q+(r==='colisao'||(r==='impacto'&&R.impactoDur<=10)||(r==='precisao'&&R.precisao.length)||(r==='elemento'&&R.elemento)||(r==='protecao'&&R.protecao)||(r==='controle'&&R.controle)||r==='manual'?2-(A.cotas[i][r]||0):0),0);
  if(cap<rest)A.semRota=true;}
function spawnAdds(alvos,s){alvos.push(inimigo('constructo',s),inimigo('constructo',s),inimigo('elemental',s));}

function bateria(builds,cfgCena,n,hab,pol,base){const R=[];for(let i=0;i<n;i++)R.push(luta(builds,cfgCena,hab,pol,(base||1)*100003+i*7919+13));
  const vit=R.filter(x=>x.venceu);const tv=vit.map(x=>x.tempo);const [wl,wh]=wilson(vit.length,n);const mot={};R.forEach(x=>mot[x.motivo]=(mot[x.motivo]||0)+1);
  const m=k=>media(R.map(x=>x[k]));
  return {n,vit:vit.length,vitorias:vit.length/n,wl,wh,tempo:vit.length?media(tv):Infinity,ic:icT(tv),motivos:mot,quedas:m('quedas'),reanim:m('reanim'),pocoes:m('pocoes'),dps:m('dps'),ofens:m('ofens'),semEne:m('semEne'),forc:m('forc'),
    recebido:m('recebido'),quebras:m('quebras'),tarefas:m('tarefas'),gritos:m('gritos'),gritosCortados:m('gritosCortados'),colisoes:m('colisoes'),dur:m('tempo'),reacoes:m('reacoes'),primeiraQueda:media(R.filter(x=>x.primeiraQueda!=null).map(x=>x.primeiraQueda)),semQueda:R.filter(x=>x.primeiraQueda==null).length,flanco:m('flanco'),leituras:m('leituras'),semReserva:m('semReserva'),
    porJogador:R[0].porJogador.map((_,j)=>({perfil:R[0].porJogador[j].perfil,dps:media(R.map(x=>x.porJogador[j].dps)),recebido:media(R.map(x=>x.porJogador[j].recebido)),quedas:media(R.map(x=>x.porJogador[j].quedas))}))};}
// boneco = mesmo motor, inimigo sem ataques, sem ameaça
function dpsBoneco(b,pol,dur){const s=b.cfg.s;const r=luta([b],{s,inimigos:[{tipo:'boneco'}],dur:dur||60,ameaca:false},HAB['médio'],pol,42);return r.dps;}

module.exports={GLOBAL,ficha,montarBuild,luta,bateria,dpsBoneco,PERFIS,ARMAS,ARMADURAS,POL,HAB,ARV,D,TIPOS,media,wilson,icT,escala,fases,multP,multI,rA,VERSAO_DADOS,FICHAS};
if(require.main===module)require('./rodar3.js');
