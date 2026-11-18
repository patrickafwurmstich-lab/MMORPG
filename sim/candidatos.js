// Compara as duas calibrações propostas no loop 7 (mesmo motor v3.2, mesmas sementes) e os ensaios de Dois machados.
// Uso: node sim/candidatos.js  → sim/resultado/candidatos.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media,escala}=S;
const RAPIDO=process.argv.includes('--rapido');const NC=RAPIDO?40:400,NP=RAPIDO?30:200,NBm=RAPIDO?20:100,NBb=RAPIDO?10:40;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
const c15={nivel:15,s:1},cref={nivel:15,s:1,ref:true};const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo,mod)=>({s:1,inimigos:[{tipo,mod}],dur:240,ameaca:true});
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
const CAND={
  'Atual (P_arma 110, contrato)':{pArma:110,vidaComum:1,chefe:{vida:1,dano:1},opc:{}},
  'A · ChatGPT (P_arma 57,5; vidas do contrato; dano do chefe 52%)':{pArma:57.5,vidaComum:1,chefe:{vida:1,dano:.52},opc:{}},
  'B · Grok (P_arma 90; vidas ×1,30; chefe 160 mil e −30%; reserva 900; reanimação 50 fixos; bloqueio 15%; área 40%)':{pArma:90,vidaComum:1.30,chefe:{vida:160000/120000,dano:.70},opc:{reservaBase:900,reanimFixa:50,atravessa:.15,areaBloq:.4}}};
function aplica(c){S.GLOBAL.pArma=c.pArma;S.GLOBAL.vidaComum=c.vidaComum;}
function limpa(){S.GLOBAL.pArma=110;S.GLOBAL.vidaComum=1;}
const ao1=c=>({s:1,inimigos:[{tipo:'ao1',mod:{vidaMult:c.chefe.vida,atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*c.chefe.dano}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
function buscar(pf,opc){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco',opc);C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Candidatos de calibração (loop 7) — simulador v3.2');out('');
out(`Mesmo motor e mesmas sementes para todos. Perfil de referência: FOR20/DES15/VIG10, espada longa, jogador médio. Lutas comuns: ${NC}; perfis: ${NP}; AO.1 grupo misto: ${NBm} (médio) e ${NBb} (bom). Metas: fera 8–12 s, constructo 14–18 s, ≥ 7 de 8 perfis a ≤ 15% do melhor, AO.1 médio 70–85% de vitória em 6–10 min com reanimações > 0.`);
const bRef=montarBuild(cref,'espada_longa','Força+Destreza',[],'boneco');
// builds dos perfis: escolhidos uma vez (a escolha depende pouco da escala de dano)
const perfis=Object.keys(PERFIS).map(pf=>({pf,m:buscar(pf)}));
out('');out('## 1. Resumo');out('');out('| Candidato | DPS por eventos ÷ s | Fera | Constructo | Perfis a ≤ 15% do melhor | AO.1 médio: vitória [IC] | AO.1 médio: tempo da vitória | Reanimações | AO.1 bom |');out('|---|---|---|---|---|---|---|---|---|');
const det=[];
for(const [nome,c] of Object.entries(CAND)){aplica(c);
  const ev=bateria([bRef],solo('constructo',{vidaMult:20}),RAPIDO?20:100,HAB['médio'],POL.sustentado,2);
  const fe=bateria([bRef],solo('fera'),NC,HAB['médio'],POL.sustentado,3),co=bateria([bRef],solo('constructo'),NC,HAB['médio'],POL.sustentado,4);
  const pr=perfis.map(x=>({pf:x.pf,ar:x.m.ar,els:x.m.els,r:bateria([Object.assign({},x.m.b,{opc:Object.assign({},x.m.b.opc,c.opc)})],solo('constructo'),NP,HAB['médio'],POL.sustentado,8)}));
  const mel=Math.min(...pr.map(x=>x.r.tempo));const dentro=pr.filter(x=>x.r.tempo/mel-1<=.15).length;
  const g=GRUPO.map(([ar,pf,el,pol])=>montarBuild(c15,ar,pf,el,'chefe',Object.assign({pol},c.opc)));
  const bm=bateria(g,ao1(c),NBm,HAB['médio'],POL.sustentado,20),bb=bateria(g,ao1(c),NBb,HAB['bom'],POL.sustentado,21);
  out(`| ${nome} | ${f(ev.dps,1)} | ${f(fe.tempo,1)} ± ${f(fe.ic,1)} s | ${f(co.tempo,1)} ± ${f(co.ic,1)} s | ${dentro} de 8 | ${f(bm.vitorias*100)}% [${f(bm.wl*100)}–${f(bm.wh*100)}] | ${f(bm.tempo/60,1)} ± ${f(bm.ic/60,1)} min | ${f(bm.reanim,1)} | ${f(bb.vitorias*100)}% em ${f(bb.tempo/60,1)} min |`);
  det.push({nome,pr,mel,bm,bb});limpa();}
for(const d of det){out('');out(`### ${d.nome}`);out('');out('| Perfil | Arma · elemento | Constructo | Δ vs melhor |');out('|---|---|---|---|');
  for(const x of d.pr)out(`| ${x.pf} | ${x.ar} · ${x.els.join('+')||'—'} | ${f(x.r.tempo,1)} ± ${f(x.r.ic,1)} s | ${sg(x.r.tempo/d.mel-1)} |`);
  out('');out(`AO.1 médio: quedas ${f(d.bm.quedas,1)}, poções ${f(d.bm.pocoes,1)}, quedas sem reserva ${f(d.bm.semReserva,1)}, recebido ${f(d.bm.recebido)}/min por jogador ÷ s, gritos cortados ${f(d.bm.gritosCortados,1)}/${f(d.bm.gritos,1)}, resultado: ${Object.entries(d.bm.motivos).map(([k,v])=>k+' '+v).join(', ')}.`);}
// Dois machados
out('');out('## 2. Dois machados depois da correção do Frenesi (por acerto)');out('');out('| Versão | Boneco DPS | Δ vs média das 11 armas |');out('|---|---|---|');
const dps=(ar,opc)=>dpsBoneco(montarBuild(c15,ar,'Força+Destreza',[],'boneco',opc),POL.sustentado,90);
const base=Object.keys(ARMAS).map(ar=>({ar,d:dps(ar)}));const mB=media(base.map(x=>x.d));
const linha=(n,d,m)=>out(`| ${n} | ${f(d,1)} | ${sg(d/m-1)} |`);
linha('Atual (+3% por acerto, teto 15%)',base.find(x=>x.ar==='dois_machados').d,mB);
const subst=(d)=>media(base.map(x=>x.ar==='dois_machados'?d:x.d));
let d1=dps('dois_machados',{armaMod:{lK:.35,pK:1.15}});linha('ChatGPT: K −8% (leve 0,35; pesado 1,15)',d1,subst(d1));
S.GLOBAL.frenesiVel=.02;let d2=dps('dois_machados',{armaMod:{lK:.34}});linha('Grok: +2% por acerto e leve 0,34',d2,subst(d2));
let d3=dps('dois_machados');linha('Grok: só +2% por acerto',d3,subst(d3));S.GLOBAL.frenesiVel=.03;
out('');out('Machado grande na mesma tabela:');out('');const mg=base.find(x=>x.ar==='machado_grande').d;linha('Machado grande atual',mg,mB);
const mg2=dps('machado_grande',{armaMod:{pT:1.40,pK:2.05,lK:.92}});linha('Grok: pT 1,40 · pK 2,05 · lK 0,92',mg2,media(base.map(x=>x.ar==='machado_grande'?mg2:x.d)));
const mg3=dps('machado_grande',{cargaFixa:3,cargaTempos:[0,.5,.7,1.05]});linha('ChatGPT: carga 3 = 2,75 s',mg3,media(base.map(x=>x.ar==='machado_grande'?mg3:x.d)));
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','candidatos.md'),L.join('\n'));console.log(L.join('\n'));
