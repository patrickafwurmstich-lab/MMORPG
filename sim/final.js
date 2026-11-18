// Loop 9: confere as condições de aprovação das duas IAs com os ajustes de arma já aplicados e preparações reotimizadas dentro de cada calibração.
// Uso: node sim/final.js → sim/resultado/final.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media}=S;
const RAPIDO=process.argv.includes('--rapido');const NC=RAPIDO?40:400,NP=RAPIDO?30:200,NBm=RAPIDO?40:400,NBb=RAPIDO?10:40;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
const c15={nivel:15,s:1},cref={nivel:15,s:1,ref:true};const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo,mod)=>({s:1,inimigos:[{tipo,mod}],dur:240,ameaca:true});
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
// ajustes de arma aceitos pelas duas IAs no loop 8
Object.assign(ARMAS.machado_grande,{lK:.92,pK:2.05,pT:1.40});ARMAS.dois_machados.lK=.34;S.GLOBAL.frenesiVel=.02;
const CAND={
  'A (ChatGPT): P_arma 57,5 · chefe 52% · bloqueio 30% · reserva 600':{pArma:57.5,dano:.52,opc:{}},
  'A2 (Grok): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reserva 750':{pArma:60,dano:.55,opc:{atravessa:.15,areaBloq:.4,reservaBase:750}},
  'A3 (Grok, alternativa): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reanimação 50 fixos':{pArma:60,dano:.55,opc:{atravessa:.15,areaBloq:.4,reanimFixa:50}}};
const ao1=c=>({s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*c.dano}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
function buscar(pf,opc){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco',opc);C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Loop 9 — conferência final da calibração (simulador v3.2)');out('');
out('Ajustes de arma aplicados (aceitos pelas duas IAs no loop 8): **Dois machados** Frenesi +2% por acerto (teto 10%) e leve 0,38 → 0,34; **Machado grande** leve 0,85 → 0,92, pesado 1,90 → 2,05, tempo do pesado 1,70 → 1,40 s (acréscimos de carga mantidos). Preparações dos perfis **reotimizadas dentro de cada calibração**. Mesmas sementes em tudo.');
out('');out(`Lutas comuns: ${NC}; perfis: ${NP}; AO.1 grupo misto: ${NBm} (médio) e ${NBb} (bom).`);
// armas (independe da calibração para Δ relativo; medido com P_arma 57,5)
S.GLOBAL.pArma=57.5;const AR=Object.keys(ARMAS).map(ar=>({ar,d:dpsBoneco(montarBuild(c15,ar,'Força+Destreza',[],'boneco'),POL.sustentado,90)}));const mA=media(AR.map(x=>x.d));
out('');out('## Armas (boneco, perfil Força+Destreza, sem elemento)');out('');out('| Arma | DPS | Δ vs média |');out('|---|---|---|');for(const x of AR)out(`| ${x.ar} | ${f(x.d,1)} | ${sg(x.d/mA-1)} |`);
const armasOk=AR.every(x=>Math.abs(x.d/mA-1)<=.15);out('');out(`Todas a ±15%: **${armasOk?'sim':'não — '+AR.filter(x=>Math.abs(x.d/mA-1)>.15).map(x=>x.ar).join(', ')}**.`);
const bRef=montarBuild(cref,'espada_longa','Força+Destreza',[],'boneco');
out('');out('## Critérios por calibração');out('');
out('| Calibração | DPS ref. (eventos) | Fera 8–12 s | Constructo 14–18 s | Perfis ≤ 15% do melhor | Tanque | AO.1 médio 70–85% | Tempo 6–10 min | Reanimações (≥ 0,5 p/ Grok) | AO.1 bom |');out('|---|---|---|---|---|---|---|---|---|---|');
const det=[];
for(const [nome,c] of Object.entries(CAND)){S.GLOBAL.pArma=c.pArma;
  const ev=bateria([bRef],solo('constructo',{vidaMult:20}),RAPIDO?20:100,HAB['médio'],POL.sustentado,2);
  const fe=bateria([bRef],solo('fera'),NC,HAB['médio'],POL.sustentado,3),co=bateria([bRef],solo('constructo'),NC,HAB['médio'],POL.sustentado,4);
  const pr=Object.keys(PERFIS).map(pf=>{const m=buscar(pf,c.opc);return {pf,ar:m.ar,els:m.els,r:bateria([m.b],solo('constructo'),NP,HAB['médio'],POL.sustentado,8)};});
  const mel=Math.min(...pr.map(x=>x.r.tempo));const dentro=pr.filter(x=>x.r.tempo/mel-1<=.15).length;const tq=pr.find(x=>x.pf==='Tanque');
  const g=GRUPO.map(([ar,pf,el,pol])=>montarBuild(c15,ar,pf,el,'chefe',Object.assign({pol},c.opc)));
  const bm=bateria(g,ao1(c),NBm,HAB['médio'],POL.sustentado,20),bb=bateria(g,ao1(c),NBb,HAB['bom'],POL.sustentado,21);
  const ok=(v,a,b)=>v>=a&&v<=b?'✔':'✘';
  out(`| ${nome} | ${f(ev.dps,1)} | ${f(fe.tempo,1)} s ${ok(fe.tempo,8,12)} | ${f(co.tempo,1)} s ${ok(co.tempo,14,18)} | ${dentro}/8 ${dentro>=7?'✔':'✘'} | ${sg(tq.r.tempo/mel-1)} ${tq.r.tempo/mel-1<=.15?'✔':'✘'} | ${f(bm.vitorias*100,1)}% [${f(bm.wl*100)}–${f(bm.wh*100)}] ${ok(bm.vitorias,.70,.85)} | ${f(bm.tempo/60,2)} min ${ok(bm.tempo/60,6,10)} | ${f(bm.reanim,2)} ${bm.reanim>=.5?'✔':'✘'} | ${f(bb.vitorias*100)}% em ${f(bb.tempo/60,1)} min |`);
  det.push({nome,pr,mel,bm});}
for(const d of det){out('');out(`### ${d.nome}`);out('');out('| Perfil | Arma · elemento (reotimizado) | Constructo | Δ vs melhor |');out('|---|---|---|---|');
  for(const x of d.pr)out(`| ${x.pf} | ${x.ar} · ${x.els.join('+')||'—'} | ${f(x.r.tempo,1)} ± ${f(x.r.ic,1)} s | ${sg(x.r.tempo/d.mel-1)} |`);
  out('');out(`AO.1 médio: quedas ${f(d.bm.quedas,1)}, poções ${f(d.bm.pocoes,1)}, quedas sem reserva ${f(d.bm.semReserva,1)}, recebido ${f(d.bm.recebido)}/min por jogador ÷ s, gritos cortados ${f(d.bm.gritosCortados,1)}/${f(d.bm.gritos,1)}.`);}
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','final.md'),L.join('\n'));console.log(L.join('\n'));
