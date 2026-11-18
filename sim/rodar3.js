// Executa o simulador v3 e gera sim/resultado/relatorio3.md + builds3.csv
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media,VERSAO_DADOS,escala,fases,multP,rA}=S;
const OUT=path.join(__dirname,'resultado');fs.mkdirSync(OUT,{recursive:true});
const RAPIDO=process.argv.includes('--rapido');const N1=RAPIDO?20:100,N2=RAPIDO?40:400,NB=RAPIDO?8:40,NBi=RAPIDO?4:20;
const f=(v,d=0)=>(v===Infinity||v===-Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
// camada 1 → nível 15 (s = 1); nível 100 → camada 10 (s = 1,09^9)
const CFG={ref:{nivel:15,s:escala(1),ref:true},n15:{nivel:15,s:escala(1)},n100:{nivel:100,s:escala(10)}};
const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo,s,mod,dur)=>({s,inimigos:[{tipo,mod}],dur:dur||180,ameaca:true});
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Simulador de equilíbrio v3 — relatório');out('');
out(`Dados \`${VERSAO_DADOS}\` · ${Object.keys(S.FICHAS).length} fichas revisadas · sementes fixas (mulberry32) · triagem ${N1} lutas, finalistas ${N2}, chefe ${NB} tentativas (grupo misto) e ${NBi} (grupos iguais) · IC de 95%: Wilson (vitórias) e t de Student (tempo) · escala s = 1,09^(camada−1) · **vidas do contrato, sem fator de correção** (decisão das duas IAs no loop 5).`);
out('');out('Mudanças do v2 para o v3: fases J.1 com cancelamento defensivo só nos últimos 40% da recuperação; golpes presos à ação; aviso entra na decisão; motor único (boneco = inimigo que não ataca); impacto dividido entre acertos; defesas do núcleo D.1 (sem +6 de Ímpeto, escudo −25% uma vez, parry falho 15R + 0,35 s, custo de esquiva com peso); armadura do jogador (classes L.2) depois da fração que atravessa; reanimação canalizada; chefe AO.1 real com âncoras, rotas, cotas, adds, Grito, fúria e Leitura (bloqueio/esquiva); condições postura<30/<20; Juízo só com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção; reação com forma preparada e contato por alvo.');

// ===== 1. Calibração
out('');out('## 1. Calibração (contrato AI: ≈ 70 de dano por segundo no perfil de referência)');out('');
const bRef=montarBuild(CFG.ref,'espada_longa','Força+Destreza',[],'boneco');
out(`Perfil de referência (nível 15, com afinidade): ${Object.entries(bRef.a).filter(([,v])=>v).map(([k,v])=>k+' '+v).join(' · ')} · espada longa · sem elemento · armadura média.`);out('');
const bon=dpsBoneco(bRef,POL.sustentado,90);
const evF=bateria([bRef],solo('fera',1,{vidaMult:50},60),N1,HAB['médio'],POL.sustentado,1);
const evC=bateria([bRef],solo('constructo',1,{vidaMult:20},60),N1,HAB['médio'],POL.sustentado,2);
const ttF=bateria([bRef],solo('fera',1),N1,HAB['médio'],POL.sustentado,3),ttC=bateria([bRef],solo('constructo',1),N1,HAB['médio'],POL.sustentado,4);
const tt13F=bateria([bRef],solo('fera',1,{vidaMult:1.3}),N1,HAB['médio'],POL.sustentado,3),tt13C=bateria([bRef],solo('constructo',1,{vidaMult:1.3}),N1,HAB['médio'],POL.sustentado,4);
out('| Medida | Como | DPS ÷ s | Tempo ofensivo real |');out('|---|---|---|---|');
out(`| Boneco | 90 s, mesmo motor, inimigo sem ataques | ${f(bon,1)} | 100% por definição |`);
out(`| Abstrato | boneco × 0,55 (uma vez) | **${f(bon*.55,1)}** | — |`);
out(`| Por eventos, fera | 60 s, vida ×50, ataques reais | **${f(evF.dps,1)}** | ${f(evF.ofens*100)}% |`);
out(`| Por eventos, constructo | 60 s, vida ×20, ataques reais | **${f(evC.dps,1)}** | ${f(evC.ofens*100)}% |`);
out('');out('| Inimigo | Vida do contrato: tempo ± IC | Vitória | Com vida ×1,30 (ensaio do Grok) | Faixa do contrato |');out('|---|---|---|---|---|');
out(`| Fera (650) | ${f(ttF.tempo,1)} ± ${f(ttF.ic,1)} s | ${f(ttF.vitorias*100)}% | ${f(tt13F.tempo,1)} s | 8–12 s |`);
out(`| Constructo (1.100) | ${f(ttC.tempo,1)} ± ${f(ttC.ic,1)} s | ${f(ttC.vitorias*100)}% | ${f(tt13C.tempo,1)} s | 14–18 s |`);
out('');out(`Leitura: o tempo ofensivo real medido agora fica entre ${f(Math.min(evF.ofens,evC.ofens)*100)}% e ${f(Math.max(evF.ofens,evC.ofens)*100)}% (no v2 o indicador somava ações iniciadas e passava de 100%). O DPS por eventos ainda fica acima de 70, então as lutas comuns ficam mais curtas que o contrato. **Nenhum fator foi aplicado**: fica registrado como divergência a decidir com telemetria do protótipo.`);

// ===== 2. Armas
out('');out('## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado, vidas do contrato)');out('');
out('| Arma | Boneco DPS | Δ vs média | Fera: tempo ± IC | Constructo: vitória [IC] | Constructo: tempo ± IC | Tempo ofensivo | Dano recebido/min ÷ s |');out('|---|---|---|---|---|---|---|---|');
const AR=[];for(const ar of Object.keys(ARMAS)){const b=montarBuild(CFG.n15,ar,'Força+Destreza',[],'boneco');AR.push({ar,b,d:dpsBoneco(b,POL.sustentado,90),fe:bateria([b],solo('fera',1),N1,HAB['médio'],POL.sustentado,5),co:bateria([b],solo('constructo',1),N1,HAB['médio'],POL.sustentado,6)});}
const mA=media(AR.map(x=>x.d));
for(const x of AR)out(`| ${x.ar} | ${f(x.d,1)} | ${sg(x.d/mA-1)} | ${f(x.fe.tempo,1)} ± ${f(x.fe.ic,1)} s | ${f(x.co.vitorias*100)}% [${f(x.co.wl*100)}–${f(x.co.wh*100)}] | ${f(x.co.tempo,1)} ± ${f(x.co.ic,1)} s | ${f(x.co.ofens*100)}% | ${f(x.co.recebido)} |`);
out('');out(`Fora de ±15% da média no boneco: ${AR.filter(x=>Math.abs(x.d/mA-1)>.15).map(x=>x.ar).join(', ')||'nenhuma'}.`);
// ensaios do machado grande
out('');out('### Ensaio: Machado grande (as três cargas e as propostas)');out('');out('| Versão | Boneco DPS | Δ vs média | Constructo: tempo |');out('|---|---|---|---|');
for(const [nome,opc] of [['Carga 1 (+0,5 s)',{cargaFixa:1}],['Carga 2 (+1,0 s)',{cargaFixa:2}],['Carga 3 (+1,5 s)',{cargaFixa:3}],['ChatGPT: carga 2 = 2,40 s e carga 3 = 2,75 s (usa carga 3)',{cargaFixa:3,cargaTempos:[0,.5,.7,1.05]}],['ChatGPT: idem, usando carga 2',{cargaFixa:2,cargaTempos:[0,.5,.7,1.05]}],['Grok: pesado 1,70 → 1,45 s (carga 2)',{cargaFixa:2,cargaTempos:[-.25,.25,.75,1.25]}]]){
  const b=montarBuild(CFG.n15,'machado_grande','Força+Destreza',[],'boneco',opc);const d=dpsBoneco(b,POL.sustentado,90);const co=bateria([b],solo('constructo',1),N1,HAB['médio'],POL.sustentado,6);
  out(`| ${nome} | ${f(d,1)} | ${sg(d/mA-1)} | ${f(co.tempo,1)} s |`);}

// ===== 3. Perfis, nível 15
out('');out('## 3. Perfis × 4 políticas (nível 15, camada 1)');out('');
out('Busca igual para todos: as 11 armas × (sem elemento + cada um dos 6), escolhida pelo boneco do mesmo motor. No nível 15 só existe 1 elemento (o 2º abre no nível 30).');out('');
const csv=['nivel;perfil;arma;elementos;politica;habilidade;cenario;n;vitorias;wl;wh;tempo;ic;quedas;dps;ofensivo;sem_energia;basicos_forcados;recebido_min'];
function buscar(cfg,pf,pares){let m=null;for(const ar of Object.keys(ARMAS))for(const els of pares){const b=montarBuild(cfg,ar,pf,els,'boneco');const d=dpsBoneco(b,POL.sustentado,60);if(!m||d>m.d)m={b,d,ar,els};}return m;}
const pares15=[[],...ELS.map(e=>[e])];
const linhas=[];
for(const pf of Object.keys(PERFIS)){const m=buscar(CFG.n15,pf,pares15);
  for(const pn of Object.keys(POL)){const r=bateria([m.b],solo('constructo',1),N1,HAB['médio'],POL[pn],7);linhas.push({pf,m,pn,r});
    csv.push([15,pf,m.ar,m.els.join('+')||'-',pn,'médio','constructo',r.n,r.vitorias.toFixed(3),r.wl.toFixed(3),r.wh.toFixed(3),isFinite(r.tempo)?r.tempo.toFixed(2):'',r.ic.toFixed(2),r.quedas.toFixed(2),r.dps.toFixed(1),r.ofens.toFixed(3),r.semEne.toFixed(3),r.forc.toFixed(3),r.recebido.toFixed(0)].join(';'));}}
out('| Perfil | Arma · elemento (busca) | Boneco | Política | Constructo: vitória | Tempo | Quedas | Sem energia | Básicos forçados |');out('|---|---|---|---|---|---|---|---|---|');
for(const x of linhas)out(`| ${x.pf} | ${x.m.ar} · ${x.m.els.join('+')||'—'} | ${f(x.m.d,1)} | ${x.pn} | ${f(x.r.vitorias*100)}% | ${f(x.r.tempo,1)} s | ${f(x.r.quedas,2)} | ${f(x.r.semEne*100)}% | ${f(x.r.forc*100)}% |`);
out('');out(`### Finalistas (melhor política de cada perfil, ${N2} lutas, constructo)`);out('');
const fin=[];for(const pf of Object.keys(PERFIS)){const ls=linhas.filter(x=>x.pf===pf&&x.r.vitorias>0).sort((a,b)=>a.r.tempo-b.r.tempo);const x=ls[0]||linhas.find(y=>y.pf===pf);
  fin.push({pf,x,m:bateria([x.m.b],solo('constructo',1),N2,HAB['médio'],POL[x.pn],8),g:bateria([x.m.b],solo('constructo',1),N2,HAB['bom'],POL[x.pn],9)});}
const melhor=Math.min(...fin.map(x=>x.m.tempo));const medT=[...fin.map(x=>x.m.tempo)].sort((a,b)=>a-b)[Math.floor(fin.length/2)];
out('| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: tempo ± IC | Δ vs melhor | Δ vs mediana |');out('|---|---|---|---|---|---|---|');
for(const x of fin)out(`| ${x.pf} | ${x.x.pn} | ${f(x.m.vitorias*100)}% [${f(x.m.wl*100)}–${f(x.m.wh*100)}] | ${f(x.m.tempo,1)} ± ${f(x.m.ic,1)} s | ${f(x.g.tempo,1)} ± ${f(x.g.ic,1)} s | ${sg(x.m.tempo/melhor-1)} | ${sg(x.m.tempo/medT-1)} |`);
const dentroM=fin.filter(x=>x.m.tempo/melhor-1<=.15).length;
out('');out(`**Contra o melhor** (denominador do contrato): ${dentroM} de ${fin.length} perfis a ≤ 15%. Fora: ${fin.filter(x=>x.m.tempo/melhor-1>.15).map(x=>`${x.pf} (${sg(x.m.tempo/melhor-1)})`).join(', ')||'nenhum'}.`);

// ===== 4. Nível 100
out('');out('## 4. Nível 100 (camada 10, s = 1,09^9, atributos até 60, até 2 elementos)');out('');
out('Busca: as 3 melhores armas do perfil no nível 15 × (cada elemento + cada par de elementos). Constructo da camada 10, jogador médio, melhor política do nível 15.');out('');
const pares100=[...ELS.map(e=>[e])];for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)pares100.push([ELS[i],ELS[j]]);
const f100=[];for(const x of fin){const top=[...new Set(linhas.filter(y=>y.pf===x.pf).map(y=>y.m.ar))];
  const armas=Object.keys(ARMAS).map(ar=>({ar,d:dpsBoneco(montarBuild(CFG.n15,ar,x.pf,[],'boneco'),POL.sustentado,30)})).sort((a,b)=>b.d-a.d).slice(0,3).map(z=>z.ar);
  let m=null;for(const ar of armas)for(const els of pares100){const b=montarBuild(CFG.n100,ar,x.pf,els,'boneco');const d=dpsBoneco(b,POL.sustentado,60);if(!m||d>m.d)m={b,d,ar,els};}
  const r=bateria([m.b],solo('constructo',CFG.n100.s),N1,HAB['médio'],POL[x.x.pn],10);f100.push({pf:x.pf,m,r});
  csv.push([100,x.pf,m.ar,m.els.join('+'),x.x.pn,'médio','constructo',r.n,r.vitorias.toFixed(3),r.wl.toFixed(3),r.wh.toFixed(3),isFinite(r.tempo)?r.tempo.toFixed(2):'',r.ic.toFixed(2),r.quedas.toFixed(2),r.dps.toFixed(1),r.ofens.toFixed(3),r.semEne.toFixed(3),r.forc.toFixed(3),r.recebido.toFixed(0)].join(';'));}
const mel100=Math.min(...f100.map(x=>x.r.tempo));
out('| Perfil | Atributos | Arma · elementos | Boneco ÷ s | Vitória | Tempo ± IC | Δ vs melhor | Sem energia |');out('|---|---|---|---|---|---|---|---|');
for(const x of f100)out(`| ${x.pf} | ${Object.entries(x.m.b.a).filter(([,v])=>v).map(([k,v])=>k+v).join(' ')} | ${x.m.ar} · ${x.m.els.join('+')} | ${f(x.m.d,1)} | ${f(x.r.vitorias*100)}% | ${f(x.r.tempo,1)} ± ${f(x.r.ic,1)} s | ${sg(x.r.tempo/mel100-1)} | ${f(x.r.semEne*100)}% |`);
out('');out(`Nível 100: ${f100.filter(x=>x.r.tempo/mel100-1<=.15).length} de ${f100.length} perfis a ≤ 15% do melhor.`);
// ensaios do Mago no nível 100 (luta longa, esgotamento)
const mg=f100.find(x=>x.pf==='Mago');if(mg){out('');out('### Ensaio: Mago no nível 100 em luta longa (constructo com vida ×5, 60 s)');out('');out('| Versão | DPS ÷ s | Sem energia (<15) |');out('|---|---|---|');
  for(const [n,opc] of [['Atual',{}],['+ Pulso básico (K0,70, 1,0 s, custo 0)',{pulso:1}],['+ RegE extra 4·rCON·rPOT',{regenMago:1}]]){const b=Object.assign({},mg.m.b,{opc:Object.assign({},mg.m.b.opc,opc)});
    const r=bateria([b],solo('constructo',CFG.n100.s,{vidaMult:5},60),N1,HAB['médio'],POL[fin.find(y=>y.pf==='Mago').x.pn],11);out(`| ${n} | ${f(r.dps,1)} | ${f(r.semEne*100)}% |`);}}

// ===== 5. Chefe AO.1
out('');out('## 5. Chefe de Andar AO.1 (camada 1, vida 120.000 sem fator, postura 1.000, armadura 50)');out('');
out('Ataques do contrato: Golpe pesado 300/8 s (frontal, quem tem a ameaça; esquiva, parry ou bloqueio) · Varredura 220/12 s (todos os corpo a corpo; só se evita indo para as costas) · Investida 320/20 s (um jogador; sair da linha; colisão com a âncora 1 = exausto 6 s) · Chuva 180/25 s (5 círculos) · Grito na fase 2 a cada 30 s (cortado por uma técnica de Ruptura pronta; senão +20% de dano recebido por 10 s) · fúria (−20% nos intervalos) só com as âncoras feitas · 25% invulnerável até a última âncora · 3 âncoras × 4 intervenções, cada rota no máximo 2 por âncora · adds a cada âncora (2 constructos + 1 elemental) · Leitura do grupo: quebra-guarda contra bloqueio e golpe atrasado contra esquiva · 5 poções e 2 reanimações por jogador (canal de 4 s).');out('');
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
const mkG=(G,opc)=>G.map(([ar,pf,el,pol])=>montarBuild(CFG.n15,ar,pf,el,'chefe',Object.assign({pol},opc||{})));
const AO1={s:1,inimigos:[{tipo:'ao1'}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true};
const linhaChefe=(nome,r)=>`| ${nome} | ${r.vit}/${r.n} = ${f(r.vitorias*100)}% [${f(r.wl*100)}–${f(r.wh*100)}] | ${f(r.tempo/60,1)} ± ${f(r.ic/60,1)} min | ${f(r.dur/60,1)} min | ${Object.entries(r.motivos).map(([k,v])=>k+' '+v).join(', ')} | ${f(r.quedas,1)} | ${f(r.reanim,1)} | ${f(r.pocoes,1)} | ${f(r.recebido)} | ${f(r.tarefas*100)}% | ${f(r.gritosCortados,1)}/${f(r.gritos,1)} |`;
const cab='| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados |';const sep='|---|---|---|---|---|---|---|---|---|---|---|';
out('### 5.1 Grupo misto (Tanque·escudo·terra, Força·machado grande·fogo, Destreza·duas espadas·vento, Leitor·arco·raio, Mago·desarmado·gelo, Lâmina mágica·espada longa·água)');out('');out(cab);out(sep);
const gM=bateria(mkG(GRUPO),AO1,NB,HAB['médio'],POL.sustentado,20),gB=bateria(mkG(GRUPO),AO1,NB,HAB['bom'],POL.sustentado,21);
out(linhaChefe('Misto, médio',gM));out(linhaChefe('Misto, bom',gB));
out('');out('Dano por jogador no grupo misto médio:');out('');out('| Perfil | DPS ÷ s | Recebido/min ÷ s | Quedas |');out('|---|---|---|---|');for(const x of gM.porJogador)out(`| ${x.perfil} | ${f(x.dps,1)} | ${f(x.recebido)} | ${f(x.quedas,2)} |`);
out('');out('### 5.2 Grupos de 6 cópias (rotas das âncoras dependem da composição)');out('');out(cab);out(sep);
for(const g of [GRUPO[1],GRUPO[2],GRUPO[3],GRUPO[0]])out(linhaChefe(`6 × ${g[1]} (${g[0]}, ${g[2][0]})`,bateria(mkG([g,g,g,g,g,g]),AO1,NBi,HAB['médio'],POL.sustentado,22)));
out('');out('### 5.3 Ensaios propostos (grupo misto, jogador médio)');out('');out(cab);out(sep);
out(linhaChefe('Grok: reserva 600 → 900',bateria(mkG(GRUPO,{reservaBase:900}),AO1,NB,HAB['médio'],POL.sustentado,23)));
out(linhaChefe('Grok: bloqueio deixa passar 15%',bateria(mkG(GRUPO,{atravessa:.15}),AO1,NB,HAB['médio'],POL.sustentado,24)));
out(linhaChefe('ChatGPT: escudo deixa passar 20%',bateria(mkG(GRUPO).map(b=>b.arma==='espada_e_escudo'?Object.assign(b,{opc:Object.assign({},b.opc,{atravessa:.20})}):b),AO1,NB,HAB['médio'],POL.sustentado,25)));
const ao1dano=m=>({s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*m}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
out(linhaChefe('Grok: dano do chefe −40%',bateria(mkG(GRUPO),ao1dano(.6),NB,HAB['médio'],POL.sustentado,26)));
out(linhaChefe('Grok: −40% + reserva 900 + 15%',bateria(mkG(GRUPO,{reservaBase:900,atravessa:.15}),ao1dano(.6),NB,HAB['médio'],POL.sustentado,27)));
out('');out('### 5.4 Chefes sintéticos (testes de pressão, não são o AO.1)');out('');out(cab);out(sep);
const sint=atq=>({s:1,inimigos:[{tipo:'sint',mod:{atq}}],dur:900,ameaca:true});
out(linhaChefe('Sintético v2: 300/2,6 s (um) + 200/10 s (todos)',bateria(mkG(GRUPO),sint([{nome:'golpe',dano:300,aviso:1,I:40,int:2.6,alvo:'um',resp:'epb'},{nome:'área',dano:200,aviso:1,I:30,int:10,alvo:'todos',resp:'e'}]),NB,HAB['médio'],POL.sustentado,28)));
out(linhaChefe('Sintético do ChatGPT: 300/8 s + 120/20 s',bateria(mkG(GRUPO),sint([{nome:'golpe',dano:300,aviso:1,I:40,int:8,alvo:'aggro',resp:'epb'},{nome:'área',dano:120,aviso:1,I:20,int:20,alvo:'todos',resp:'e'}]),NB,HAB['médio'],POL.sustentado,29)));
out('');out('Tempo-alvo do contrato: 6–10 min (estimativa AI.6 ≈ 5,8 min sem erros).');

// ===== 6. Técnicas por papel
out('');out('## 6. Técnicas por papel (cálculo do motor: pesos de atributo, fases e armadura 50)');out('');
out('Regra (ChatGPT, loop 4/5): técnica de **Execução** sem condição precisa de dano ≥ 1,20 × DPS do ataque leve × tempo ocupado. Ruptura, Contenção e Sustentação não entram na regra (o valor delas é controle, impacto ou apoio). Área contada com 1 alvo; DoT e zona incluídos.');out('');
const a=bRef.a;const ex=[],outras={Ru:0,Co:0,Su:0,'?':0};let nEx=0;
for(const id of Object.keys(S.ARV)){const A=S.ARV[id];for(const no of A.nos){if(!no.t||no.tipo!=='Técnica')continue;const fc=S.ficha(no);if(!fc.K)continue;
  if(fc.tag!=='Ex'){outras[fc.tag]=(outras[fc.tag]||0)+1;continue;}if(fc.cond){continue;}nEx++;
  const F=fases(fc.T,a,'tec',fc.magico);const Tt=F.prep+F.exec+F.rec;const dano=fc.K*fc.h*fc.tiq*(1+fc.dot)*multP(a,fc.peso);
  const arma=A.cat==='arma'?ARMAS[id]:ARMAS.espada_longa;const Fl=fases(arma.lT,a,'leve',false);const dpsL=arma.lK*arma.h*multP(a,'leve')/(Fl.prep+Fl.exec+Fl.rec);
  const raz=dano/(dpsL*Tt);const area=fc.alvos>1;if(raz<1.20)ex.push({n:fc.nome,id,raz,raz3:area?raz*Math.min(3,fc.alvos):null});}}
out(`Execução sem condição: ${nEx} técnicas; **${ex.length} abaixo de 1,20×**. Fora da regra: Ruptura ${outras.Ru}, Contenção ${outras.Co}, Sustentação ${outras.Su}${outras['?']?', sem etiqueta '+outras['?']:''}.`);out('');
out('| Técnica (Execução) | Árvore | Dano ÷ (DPS leve × tempo), 1 alvo | Falta para 1,20 | Com 3 alvos (só área) |');out('|---|---|---|---|---|');
for(const x of ex.sort((p,q)=>p.raz-q.raz))out(`| ${x.n} | ${x.id} | ${f(x.raz,2)} | ${sg(1.2/x.raz-1)} | ${x.raz3==null?'—':f(x.raz3,2)+(x.raz3>=1.2?' ✔':'')} |`);

// ===== 7. Não avaliado
out('');out('## 7. O que este simulador ainda não avalia (fora das conclusões)');out('');
['Leitura do grupo "contra distância" (puxão) e "contra interrupção" (conjuração dupla); só quebra-guarda e golpe atrasado entram.','Fadiga 100 do chefe (o contrato não define o efeito em números).','Regressão das âncoras na fase 2 (a estratégia simulada faz uma âncora por vez, sem deixá-la parcial e sozinha).','Guardas elementais da âncora 3 atacando quem está lá (a rota de Controle só custa tempo).','Passivas de texto, nós-chave, Artes, afixos e fabricação.','Peso da arma: fixado em 3 para todas.','Deslocamento real: tarefas das âncoras custam 3 s de ida; ninguém é atingido por Varredura/Golpe pesado longe do chefe.','Reação elemental só entre elementos do mesmo jogador (como manda o 07); combinações entre jogadores não existem no contrato.'].forEach(x=>out('- '+x));
out('');out(`---`);out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(OUT,'relatorio3.md'),L.join('\n'));fs.writeFileSync(path.join(OUT,'builds3.csv'),csv.join('\n'));
console.log(L.join('\n'));
