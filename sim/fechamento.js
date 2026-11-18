// Loop 10: fechamento da calibração-base com a regra de perfis de VIG proposta no loop 9.
// Uso: node sim/fechamento.js → sim/resultado/fechamento.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media}=S;
const RAPIDO=process.argv.includes('--rapido');const NC=RAPIDO?40:400,NP=RAPIDO?30:200,NB=RAPIDO?40:400;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
const c15={nivel:15,s:1},cref={nivel:15,s:1,ref:true};const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo,mod)=>({s:1,inimigos:[{tipo,mod}],dur:240,ameaca:true});
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
Object.assign(ARMAS.machado_grande,{lK:.92,pK:2.05,pT:1.40});ARMAS.dois_machados.lK=.34;S.GLOBAL.frenesiVel=.02;S.GLOBAL.pArma=57.5;
const ao1=d=>({s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*d}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
function buscar(pf){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco');C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Loop 10 — fechamento da calibração-base');out('');
out('Calibração: **P_arma 57,5**, vidas do contrato (fera 650, constructo 1.100, AO.1 120.000), reserva 600, bloqueio 30%, reanimação do contrato. Armas: Dois machados (Frenesi +2%/acerto, leve 0,34) e Machado grande (leve 0,92, pesado 2,05 em 1,40 s). Mesmas sementes.');
// 1. dano do chefe
out('');out(`## 1. Dano do chefe (AO.1, grupo misto, jogador médio, ${NB} tentativas)`);out('');out('| Dano do chefe | Vitória [IC] | Tempo da vitória | Reanimações | Quedas Tanque | Quedas Força | Quedas (média do grupo) | DPS Tanque ÷ melhor | DPS Força ÷ melhor |');out('|---|---|---|---|---|---|---|---|---|');
const g=GRUPO.map(([ar,pf,el,pol])=>montarBuild(c15,ar,pf,el,'chefe',{pol}));const AO={};
for(const d of [.52,.535,.55]){const r=bateria(g,ao1(d),NB,HAB['médio'],POL.sustentado,20);AO[d]=r;const pj=r.porJogador;const mx=Math.max(...pj.map(x=>x.dps));const q=n=>pj.find(x=>x.perfil===n);
  out(`| ${f(d*100,1)}% | ${f(r.vitorias*100,2)}% [${f(r.wl*100,1)}–${f(r.wh*100,1)}] | ${f(r.tempo/60,2)} ± ${f(r.ic/60,2)} min | ${f(r.reanim,3)} | ${f(q('Tanque').quedas,2)} | ${f(q('Força').quedas,2)} | ${f(media(pj.map(x=>x.quedas)),2)} | ${f(q('Tanque').dps/mx*100)}% | ${f(q('Força').dps/mx*100)}% |`);}
// 2. perfis: ofensivo
out('');out(`## 2. Perfis (constructo solo, ${NP} lutas, preparações reotimizadas)`);out('');
const pr=Object.keys(PERFIS).map(pf=>{const m=buscar(pf);return {pf,m,r:bateria([m.b],solo('constructo'),NP,HAB['médio'],POL.sustentado,8)};});const mel=Math.min(...pr.map(x=>x.r.tempo));
const VIG=['Força','Tanque'];
out('| Perfil | Arma · elemento | Constructo | Δ vs melhor | Teto | Cumpre |');out('|---|---|---|---|---|---|');
for(const x of pr){const teto=VIG.includes(x.pf)?.25:.15;const d=x.r.tempo/mel-1;out(`| ${x.pf}${VIG.includes(x.pf)?' (perfil de VIG)':''} | ${x.m.ar} · ${x.m.els.join('+')||'—'} | ${f(x.r.tempo,1)} ± ${f(x.r.ic,1)} s | ${sg(d)} | ${f(teto*100)}% | ${d<=teto?'✔':'✘'} |`);}
// 3. ensaio defensivo controlado (o mesmo do ChatGPT no loop 9)
out('');out(`## 3. Ensaio defensivo controlado (${NP*2} lutas por distribuição)`);out('');
out('Nível 15, espada longa, armadura média, mesmas técnicas e sementes, política sustentado, jogador médio. Constructo de estresse: 55.000 de vida, ataque de 640 (para medir sobrevivência, não é inimigo do jogo). Mede o tempo até a primeira queda. Também: constructo "letal" do Grok (vida normal, dano ×1,5).');out('');
const base=montarBuild(c15,'espada_longa','Força+Destreza',[],'boneco');
const dist=[['FOR23/DES23/VIG6 (referência FOR/DES)',{FOR:23,DES:23,VIG:6,POT:0,CON:0,PER:0}],['FOR25/VIG25 (FOR/VIG)',{FOR:25,DES:0,VIG:25,POT:0,CON:0,PER:0}],['FOR23/VIG27 (VIG/FOR)',{FOR:23,DES:0,VIG:27,POT:0,CON:0,PER:0}]];
const estresse={s:1,inimigos:[{tipo:'constructo',mod:{vidaMult:50,atq:[{nome:'pancada',dano:640,aviso:1.0,I:50,int:3.0,alvo:'aggro',resp:'epb'}]}}],dur:240,ameaca:true};
const letal={s:1,inimigos:[{tipo:'constructo',mod:{atq:[{nome:'pancada',dano:240,aviso:1.0,I:50,int:3.0,alvo:'aggro',resp:'epb'}]}}],dur:240,ameaca:true};
out('| Distribuição | Tempo até cair (estresse) | Ganho sobre FOR/DES | Letal: vitória | Letal: tempo |');out('|---|---|---|---|---|');let ref=null;
for(const [n,a] of dist){const b=Object.assign({},base,{a});const r=bateria([b],estresse,NP*2,HAB['médio'],POL.sustentado,30);const l=bateria([b],letal,NP*2,HAB['médio'],POL.sustentado,31);if(!ref)ref=r.primeiraQueda;
  out(`| ${n} | ${f(r.primeiraQueda,2)} s${r.semQueda?' ('+r.semQueda+' sem queda)':''} | ${sg(r.primeiraQueda/ref-1)} | ${f(l.vitorias*100,1)}% [${f(l.wl*100)}–${f(l.wh*100)}] | ${f(l.tempo,1)} s |`);}
out('');out('Regra proposta no loop 9: perfis de VIG podem ficar até +25% no constructo solo se sobreviverem ≥ 20% mais (ChatGPT) ou ≥ 1,3× (Grok) no ensaio controlado, ou tiverem vitória no letal ≥ à do FOR/DES (Grok); no AO.1, quedas do Tanque e da Força ≤ média do grupo, DPS do Tanque ≥ 50% e da Força ≥ 70% do melhor (Grok).');
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','fechamento.md'),L.join('\n'));console.log(L.join('\n'));
