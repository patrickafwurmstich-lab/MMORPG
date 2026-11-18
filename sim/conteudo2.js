// Loop 12: validação do pacote de conteúdo v1.1 com o grupo de referência novo (Força em "explosão").
// Uso: node sim/conteudo2.js [--rapido] → sim/resultado/conteudo2.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media}=S;
const RAPIDO=process.argv.includes('--rapido');const NB=RAPIDO?40:400,NC=RAPIDO?40:200;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
const c15={nivel:15,s:1};const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo)=>({s:1,inimigos:[{tipo}],dur:240,ameaca:true});
const GRUPO=pol=>[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],pol],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
const ao1=d=>({s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1v8.atq.map(x=>Object.assign({},x,{dano:Math.round(x.dano*d)}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
// pacote v1.1: Fogo −24; Lança ígnea 0,9 s; Lâmina projetada 0,85; Dança de lâminas 0,40 × 3
function aplicaPacote(on){S.GLOBAL.fogoArm=on?24:30;const mod={'fogo:7':{T:0.9},'katana:23':{K:.85},'duas_espadas:1':{K:.40}};
  for(const k in mod){if(on){S.FICHAS['_bk_'+k]=S.FICHAS[k];S.FICHAS[k]=Object.assign({},S.FICHAS[k]||{},mod[k]);}else if('_bk_'+k in S.FICHAS){S.FICHAS[k]=S.FICHAS['_bk_'+k];delete S.FICHAS['_bk_'+k];}}S.limparFichas();}
const nome=k=>{const [a,n]=k.split(':');return S.ARV[a].porN[+n].nome;};
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Loop 12 — validação do pacote de conteúdo v1.1');out('');
out(`Pacote: Fogo −30 → −24; ${nome('fogo:7')} 0,7 → 0,9 s (K, custo e recarga iguais); ${nome('katana:23')} K 0,80 → 0,85; ${nome('duas_espadas:1')} K 0,30 → 0,40 × 3. As outras técnicas propostas no loop 11 ficam como estão (têm utilidade não medida: reposicionamento, perseguição, contornar guarda). Grupo de referência novo: Força com machado grande em "explosão". Mesmas sementes; AO.1: ${NB} tentativas.`);
// 1. AO.1: critério individual E do grupo
out('');out('## 1. AO.1: grupo de referência novo com o pacote, varrendo só o dano dos ataques do chefe');out('');
out('Critério do grupo: 70–85% de vitória e 6–10 min. Critério da Força: quedas ≤ 1,1 × média e DPS ≥ 65% do melhor. As duas colunas são separadas.');out('');
out('| Cenário | Dano do chefe (% do v8) | Golpe / Varredura / Investida / Chuva | Vitória [IC] | Tempo | Grupo cumpre | Quedas Força ÷ média | DPS Força ÷ melhor | Força cumpre |');out('|---|---|---|---|---|---|---|---|---|');
const linha=(nm,pol,pac,d)=>{aplicaPacote(pac);const g=GRUPO(pol).map(([ar,pf,el,po])=>montarBuild(c15,ar,pf,el,'chefe',{pol:po}));const r=bateria(g,ao1(d),NB,HAB['médio'],POL.sustentado,20);aplicaPacote(false);
  const pj=r.porJogador,fo=pj[1],mq=media(pj.map(x=>x.quedas)),mx=Math.max(...pj.map(x=>x.dps));const gOk=r.vitorias>=.70&&r.vitorias<=.85&&r.tempo/60>=6&&r.tempo/60<=10;const fOk=fo.quedas<=1.1*mq&&fo.dps/mx>=.65;
  out(`| ${nm} | ${f(d*100,1)}% | ${S.TIPOS.ao1v8.atq.map(x=>Math.round(x.dano*d)).join(' / ')} | ${f(r.vitorias*100,2)}% [${f(r.wl*100,1)}–${f(r.wh*100,1)}] | ${f(r.tempo/60,2)} min | ${gOk?'✔':'✘'} | ${f(fo.quedas/mq,2)}× | ${f(fo.dps/mx*100)}% | ${fOk?'✔':'✘'} |`);return {r,gOk,fOk};};
linha('v1 (Força em ruptura, sem pacote)','ruptura',false,.535);
linha('Força em explosão, sem pacote','explosao',false,.535);
const res=[];for(const d of [.535,.56,.57,.58,.60])res.push({d,...linha('Força em explosão + pacote v1.1','explosao',true,d)});
const ok=res.filter(x=>x.gOk&&x.fOk);
out('');out(ok.length?`Faixa que cumpre os dois critérios: ${ok.map(x=>f(x.d*100,1)+'%').join(', ')}.`:'Nenhum valor testado cumpre os dois critérios.');
// 2. Elementos com o pacote (kits encontrados, a busca refeita com o pacote ligado)
out('');out('## 2. Elementos com o pacote (kits montados para cada elemento; constructo)');out('');
out('Comparação entre os **kits montados para cada elemento** (mesma arma e atributos; as técnicas escolhidas mudam com o elemento). Não isola só o efeito secundário do elemento. Δ = tempo contra o kit sem elemento.');out('');
aplicaPacote(true);
out('| Preparação | '+ELS.join(' | ')+' | Fogo vs 2º melhor (tempo) | Em DPS efetivo |');out('|---|'+ELS.map(()=>'---').join('|')+'|---|---|');
for(const [pf,ar] of [['Força+Destreza','espada_longa'],['Mago','desarmado'],['Lâmina mágica','espada_longa'],['Leitor (PER)','arco']]){const t0b=bateria([montarBuild(c15,ar,pf,[],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo;
  const v=ELS.map(e=>bateria([montarBuild(c15,ar,pf,[e],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo/t0b-1);const seg=Math.min(...v.slice(1));const rt=(1+v[0])/(1+seg);
  out(`| ${pf} · ${ar} | ${v.map(sg).join(' | ')} | ${sg(rt-1)} | ${sg(1/rt-1)} |`);}
out('');out('Armadura: contra A = 50, Fogo −30 vale +13,6% de dano e −24 vale +10,6% (correção do loop 11, que dizia ~16%).');
// busca com o pacote ligado
out('');out('### Elemento e arma escolhidos pela busca com o pacote ligado (nível 15)');out('');
function buscar(pf){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco');C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
const esc=Object.keys(PERFIS).map(pf=>({pf,m:buscar(pf)}));out(esc.map(x=>`- ${x.pf}: ${x.m.ar} · ${x.m.els[0]||'sem elemento'}`).join('\n'));out('');out(`Perfis com Fogo: ${esc.filter(x=>x.m.els[0]==='fogo').length}/8 (a busca minimiza só o tempo solo; não é prova de domínio universal).`);
// 3. armas com o pacote
out('');out('## 3. Armas no boneco com o pacote');out('');const v=Object.keys(ARMAS).map(ar=>({ar,d:dpsBoneco(montarBuild(c15,ar,'Força+Destreza',[],'boneco'),POL.sustentado,90)}));const m=media(v.map(x=>x.d));
out('| Arma | Δ vs média |');out('|---|---|');for(const x of v)out(`| ${x.ar} | ${sg(x.d/m-1)} |`);out('');out(`Fora de ±15%: ${v.filter(x=>Math.abs(x.d/m-1)>.15).map(x=>x.ar).join(', ')||'nenhuma'}.`);
aplicaPacote(false);
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','conteudo2.md'),L.join('\n'));console.log(L.join('\n'));
