// Loop 13: correção localizada do Mago (perfil POT/CON) com o pacote v1.1 ligado.
// Uso: node sim/mago.js [--rapido] → sim/resultado/mago.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,ARMAS,POL,HAB,PERFIS}=S;
const RAPIDO=process.argv.includes('--rapido');const N=RAPIDO?60:400;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100,1)+'%';
const c15={nivel:15,s:1};const ELS=['fogo','gelo','raio','terra','vento','agua'];const solo={s:1,inimigos:[{tipo:'constructo'}],dur:240,ameaca:true};
S.GLOBAL.fogoArm=24;Object.assign(S.FICHAS,{'fogo:7':Object.assign({},S.FICHAS['fogo:7'],{T:0.9}),'katana:23':Object.assign({},S.FICHAS['katana:23'],{K:.85}),'duas_espadas:1':Object.assign({},S.FICHAS['duas_espadas:1'],{K:.40})});S.limparFichas();
function buscar(pf,opc){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco',opc);C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);for(const c of C.slice(0,8))c.tt=bateria([c.b],solo,RAPIDO?8:30,HAB['médio'],POL.sustentado,77).tempo;
  const top=C.slice(0,8).sort((x,y)=>x.tt-y.tt).slice(0,3); // as 3 melhores da triagem vão para 400 lutas × 4 políticas (referência robusta)
  let best=null;for(const m of top)for(const pn of Object.keys(POL)){const r=bateria([m.b],solo,N,HAB['médio'],POL[pn],8);if(!best||r.tempo<best.r.tempo)best={m,pn,r};}return best;}
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Loop 13 — correção localizada do Mago (pacote v1.1 ligado)');out('');out(`Constructo, jogador médio, ${N} lutas, mesmas sementes; busca nas 11 armas × sem/6 elementos e melhor das 4 políticas. Teto: 15% acima do melhor perfil (FOR/VIG e VIG/FOR: 25%).`);out('');
const ref=buscar('Força+Destreza');const melhor=ref.r.tempo;
const linha=(nm,x,teto)=>out(`| ${nm} | ${x.m.ar} · ${x.m.els[0]||'—'} · ${x.pn} | ${f(x.r.tempo,3)} ± ${f(x.r.ic,2)} s | ${sg(x.r.tempo/melhor-1)} | ${f(teto*100)}% | ${x.r.tempo/melhor-1<=teto?'✔':'✘'} |`);
out('| Perfil / variação | Preparação encontrada | Constructo | Δ vs melhor | Teto | Cumpre |');out('|---|---|---|---|---|---|');
linha('FOR/DES (referência)',ref,0);
for(const pf of ['Força','Tanque'])linha(pf,buscar(pf),.25);
linha('Mago — atual',buscar('Mago'),.15);
const proj=(k1,k2)=>{for(const e of ELS){S.FICHAS[e+':1']=Object.assign({},S.FICHAS[e+':1'],{K:k1});S.FICHAS[e+':2']=Object.assign({},S.FICHAS[e+':2'],{K:k2});}S.limparFichas();};
const vento=()=>{S.FICHAS['vento:1']=Object.assign({},S.FICHAS['vento:1'],{K:1.3});S.FICHAS['vento:2']=Object.assign({},S.FICHAS['vento:2'],{K:1.5});S.limparFichas();};
proj(1.55,1.75);vento();S.FICHAS['vento:1'].K=1.45;S.FICHAS['vento:2'].K=1.65;S.limparFichas();
linha('Mago — Projétil 1,40 → 1,55 e Área 1,60 → 1,75 (todos os elementos; Vento 1,30 → 1,45 / 1,50 → 1,65)',buscar('Mago'),.15);
linha('Lâmina mágica — idem',buscar('Lâmina mágica'),.15);
linha('Mago — idem + regeneração + 4·rCON·rPOT',buscar('Mago',{regenMago:1}),.15);
proj(1.60,1.80);S.FICHAS['vento:1'].K=1.50;S.FICHAS['vento:2'].K=1.70;S.limparFichas();
linha('Mago — Projétil 1,60 e Área 1,80 (Vento 1,50 / 1,70)',buscar('Mago'),.15);
linha('Lâmina mágica — idem (1,60 / 1,80)',buscar('Lâmina mágica'),.15);
for(const e of ELS){delete S.FICHAS[e+':1'].K;delete S.FICHAS[e+':2'].K;}S.limparFichas();
linha('Mago — regeneração de energia + 4·rCON·rPOT',buscar('Mago',{regenMago:1}),.15);
out('');out('Pulso básico: proposta do loop 4 (ChatGPT) — ataque básico mágico à distância, sem custo, para o Mago não depender de arma física entre conjurações. Regeneração extra: proposta do loop 4 (Grok).');
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','mago.md'),L.join('\n'));console.log(L.join('\n'));
