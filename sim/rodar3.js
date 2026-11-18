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
out('# Simulador de equilíbrio v3.1 — relatório');out('');
out(`Dados \`${VERSAO_DADOS}\` · ${Object.keys(S.FICHAS).length} fichas revisadas · sementes fixas (mulberry32) · triagem ${N1} lutas, finalistas ${N2}, chefe ${NB} tentativas (grupo misto) e ${NBi} (grupos iguais) · IC de 95%: Wilson (vitórias) e t de Student (tempo) · escala s = 1,09^(camada−1) · **vidas do contrato, sem fator de correção** (decisão das duas IAs no loop 5).`);
out('');out('**v3.1 (loop 6):** ponto fraco ×1,5 e Brasa ×1,08 voltaram a valer (estavam dentro de um comentário); zona só é lançada no fim da execução; Ritmo/Fluxo/Frenesi/Marca só ganham no acerto; Golpe de Ímpeto com principal e continuação separados (pesos de leve na continuação, impacto próprio, +8% ao gastar ≥ 70); contato elemental por alvo E por jogador, registra B depois da reação, impacto de reação com FOR/CON, raio aproximado, Lava em 4 tiques, formas sem efeito numérico ficam fora; Gelo = +15% na recuperação (nada no chefe); Terra = barreira de postura 20 (máx. 40, 4 s); Grito ×1,2 por 10 s, só na fase 2, cortado só por técnica que interrompe, paga e acerta dentro de 1,2 s; fúria exige âncoras E vida ≤ 25%; Frenesi acelera (+3%/acerto, teto 1,45); duas katanas 0,24 s; saque de resposta exige bainha (0,4 s sem atacar) e a carga vem do tempo guardado; Flanco no chefe só com ele em ataque/abertura; aggro D.5 (decai e^(−Δt/8), +2×postura, troca com +20%); Leitura E.3 (≥ 20 oportunidades, aviso 5 s, ≤ 25% dos golpes, 30 s, papel pesa metade); rotas recalculadas com quem está de pé; Precisão aberta a todos (arco/PER ≥ 15 só aumenta a chance); poção guarda reserva para 1 reanimação (salvo < 20% de vida); busca escolhe pelo constructo (pré-filtro no boneco); ensaios do chefe com as mesmas sementes.');out('');out('Mudanças do v2 para o v3: fases J.1 com cancelamento defensivo só nos últimos 40% da recuperação; golpes presos à ação; aviso entra na decisão; motor único (boneco = inimigo que não ataca); impacto dividido entre acertos; defesas do núcleo D.1 (sem +6 de Ímpeto, escudo −25% uma vez, parry falho 15R + 0,35 s, custo de esquiva com peso); armadura do jogador (classes L.2) depois da fração que atravessa; reanimação canalizada; chefe AO.1 real com âncoras, rotas, cotas, adds, Grito, fúria e Leitura (bloqueio/esquiva); condições postura<30/<20; Juízo só com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção; reação com forma preparada e contato por alvo.');

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
S.GLOBAL.pArma=65;const p65F=bateria([bRef],solo('fera',1),N1,HAB['médio'],POL.sustentado,3),p65C=bateria([bRef],solo('constructo',1),N1,HAB['médio'],POL.sustentado,4),p65E=bateria([bRef],solo('constructo',1,{vidaMult:20},60),N1,HAB['médio'],POL.sustentado,2);S.GLOBAL.pArma=110;
const v145F=bateria([bRef],solo('fera',1,{vidaMult:1.45}),N1,HAB['médio'],POL.sustentado,3),v145C=bateria([bRef],solo('constructo',1,{vidaMult:1.45}),N1,HAB['médio'],POL.sustentado,4);
out('');out('### Ensaios de calibração (as duas propostas do loop 6)');out('');out('| Proposta | DPS por eventos (constructo) | Fera | Constructo | Contrato |');out('|---|---|---|---|---|');
out(`| Atual (P_arma 110, vidas do contrato) | ${f(evC.dps,1)} | ${f(ttF.tempo,1)} s | ${f(ttC.tempo,1)} s | 8–12 / 14–18 s |`);
out(`| ChatGPT: P_arma 110 → 65 | ${f(p65E.dps,1)} | ${f(p65F.tempo,1)} ± ${f(p65F.ic,1)} s | ${f(p65C.tempo,1)} ± ${f(p65C.ic,1)} s | 8–12 / 14–18 s |`);
out(`| Grok: vidas ×1,45 | ${f(evC.dps,1)} | ${f(v145F.tempo,1)} ± ${f(v145F.ic,1)} s | ${f(v145C.tempo,1)} ± ${f(v145C.ic,1)} s | 8–12 / 14–18 s |`);
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
out('Busca igual para todos: as 11 armas × (sem elemento + cada um dos 6); as 6 melhores no boneco vão para 20 lutas contra o constructo e fica a de menor tempo. No nível 15 só existe 1 elemento (o 2º abre no nível 30).');out('');
const csv=['nivel;perfil;arma;elementos;politica;habilidade;cenario;n;vitorias;wl;wh;tempo;ic;quedas;dps;ofensivo;sem_energia;basicos_forcados;recebido_min'];
function buscar(cfg,pf,pares,opcFn){const C=[];for(const ar of Object.keys(ARMAS))for(const els of pares){const b=montarBuild(cfg,ar,pf,els,'boneco',opcFn?opcFn(ar):undefined);C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo',cfg.s),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;} // pré-filtro no boneco, escolha pelo encontro
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
  const C=[];for(const ar of armas)for(const els of pares100){const b=montarBuild(CFG.n100,ar,x.pf,els,'boneco');C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}C.sort((p,q)=>q.d-p.d);
  let m=null;for(const c of C.slice(0,5)){c.tt=bateria([c.b],solo('constructo',CFG.n100.s),RAPIDO?6:20,HAB['médio'],POL[x.x.pn],78).tempo;if(!m||c.tt<m.tt)m=c;}
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

// ===== 4b. Pacote de conteúdo do Grok
out('');out('## 4b. Ensaio: pacote de conteúdo do Grok (Fogo −30 → −18, Flanco +30% → +20%, Machado grande pT 1,40 / pK 2,05 / lK 0,92)');out('');
S.GLOBAL.fogoArm=18;S.GLOBAL.flanco=1.2;const MG={armaMod:{pT:1.40,pK:2.05,lK:.92}};
const AR2=Object.keys(ARMAS).map(ar=>{const b=montarBuild(CFG.n15,ar,'Força+Destreza',[],'boneco',ar==='machado_grande'?MG:{});return {ar,d:dpsBoneco(b,POL.sustentado,90)};});const mA2=media(AR2.map(x=>x.d));
out('| Arma | Boneco (antes) | Boneco (pacote) | Δ vs média (pacote) |');out('|---|---|---|---|');for(const x of AR2){const y=AR.find(z=>z.ar===x.ar);out(`| ${x.ar} | ${f(y.d,1)} | ${f(x.d,1)} | ${sg(x.d/mA2-1)} |`);}
out('');out('| Perfil | Arma · elemento escolhidos | Constructo: tempo | Δ vs melhor |');out('|---|---|---|---|');
const F2=[];for(const pf of Object.keys(PERFIS)){const m=buscar(CFG.n15,pf,pares15,ar=>ar==='machado_grande'?MG:undefined);const pn=fin.find(y=>y.pf===pf).x.pn;const b=m.b;F2.push({pf,m,r:bateria([b],solo('constructo',1),N1,HAB['médio'],POL[pn],8)});}
const mel2=Math.min(...F2.map(x=>x.r.tempo));for(const x of F2)out(`| ${x.pf} | ${x.m.ar} · ${x.m.els.join('+')||'—'} | ${f(x.r.tempo,1)} ± ${f(x.r.ic,1)} s | ${sg(x.r.tempo/mel2-1)} |`);
out('');out(`Com o pacote: ${F2.filter(x=>x.r.tempo/mel2-1<=.15).length} de 8 perfis a ≤ 15% do melhor; elementos escolhidos: ${[...new Set(F2.map(x=>x.m.els[0]||'nenhum'))].join(', ')}.`);
S.GLOBAL.fogoArm=30;S.GLOBAL.flanco=1.3;

// ===== 5. Chefe AO.1
out('');out('## 5. Chefe de Andar AO.1 (camada 1, vida 120.000 sem fator, postura 1.000, armadura 50)');out('');
out('Ataques do contrato: Golpe pesado 300/8 s (frontal, quem tem a ameaça; esquiva, parry ou bloqueio) · Varredura 220/12 s (todos os corpo a corpo; só se evita indo para as costas) · Investida 320/20 s (um jogador; sair da linha; colisão com a âncora 1 = exausto 6 s) · Chuva 180/25 s (5 círculos) · Grito na fase 2 a cada 30 s (cortado por uma técnica de Ruptura pronta; senão +20% de dano recebido por 10 s) · fúria (−20% nos intervalos) só com as âncoras feitas · 25% invulnerável até a última âncora · 3 âncoras × 4 intervenções, cada rota no máximo 2 por âncora · adds a cada âncora (2 constructos + 1 elemental) · Leitura do grupo: quebra-guarda contra bloqueio e golpe atrasado contra esquiva · 5 poções e 2 reanimações por jogador (canal de 4 s).');out('');
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
const mkG=(G,opc)=>G.map(([ar,pf,el,pol])=>montarBuild(CFG.n15,ar,pf,el,'chefe',Object.assign({pol},opc||{})));
const AO1={s:1,inimigos:[{tipo:'ao1'}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true};
const linhaChefe=(nome,r)=>`| ${nome} | ${r.vit}/${r.n} = ${f(r.vitorias*100)}% [${f(r.wl*100)}–${f(r.wh*100)}] | ${f(r.tempo/60,1)} ± ${f(r.ic/60,1)} min | ${f(r.dur/60,1)} min | ${Object.entries(r.motivos).map(([k,v])=>k+' '+v).join(', ')} | ${f(r.quedas,1)} | ${f(r.reanim,1)} | ${f(r.pocoes,1)} | ${f(r.recebido)} | ${f(r.tarefas*100)}% | ${f(r.gritosCortados,1)}/${f(r.gritos,1)} | ${f(r.semReserva,1)} | ${f(r.flanco*100)}% |`;
const cab='| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |';const sep='|---|---|---|---|---|---|---|---|---|---|---|---|---|';
out('### 5.1 Grupo misto (Tanque·escudo·terra, Força·machado grande·fogo, Destreza·duas espadas·vento, Leitor·arco·raio, Mago·desarmado·gelo, Lâmina mágica·espada longa·água)');out('');out(cab);out(sep);
const gM=bateria(mkG(GRUPO),AO1,NB,HAB['médio'],POL.sustentado,20),gB=bateria(mkG(GRUPO),AO1,NB,HAB['bom'],POL.sustentado,21);
out(linhaChefe('Misto, médio',gM));out(linhaChefe('Misto, bom',gB));
out('');out('Dano por jogador no grupo misto médio:');out('');out('| Perfil | DPS ÷ s | Recebido/min ÷ s | Quedas |');out('|---|---|---|---|');for(const x of gM.porJogador)out(`| ${x.perfil} | ${f(x.dps,1)} | ${f(x.recebido)} | ${f(x.quedas,2)} |`);
out('');out('### 5.2 Grupos de 6 cópias (rotas das âncoras dependem da composição)');out('');out(cab);out(sep);
for(const g of [GRUPO[1],GRUPO[2],GRUPO[3],GRUPO[0]])out(linhaChefe(`6 × ${g[1]} (${g[0]}, ${g[2][0]})`,bateria(mkG([g,g,g,g,g,g]),AO1,NBi,HAB['médio'],POL.sustentado,22)));
out('');out('### 5.3 Ensaios (grupo misto, jogador médio, **mesmas sementes da linha base**)');out('');out(cab);out(sep);
const SB=20;const roda=(nome,bs,cena)=>out(linhaChefe(nome,bateria(bs,cena,NB,HAB['médio'],POL.sustentado,SB)));
const ao1m=(dm,vm)=>({s:1,inimigos:[{tipo:'ao1',mod:{vidaMult:vm||1,atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*dm}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true});
roda('Linha base (repete 5.1)',mkG(GRUPO),AO1);
roda('Poção sem guardar reserva',mkG(GRUPO,{pocaoLivre:1}),AO1);
roda('Grok: reserva 900',mkG(GRUPO,{reservaBase:900}),AO1);
roda('Grok: bloqueio 15% + área 40% bloqueável',mkG(GRUPO,{atravessa:.15,areaBloq:.4}),AO1);
roda('ChatGPT: escudo 20%',mkG(GRUPO).map(b=>b.arma==='espada_e_escudo'?Object.assign(b,{opc:Object.assign({},b.opc,{atravessa:.20})}):b),AO1);
for(const dm of [1,.75,.6,.5]){S.GLOBAL.pArma=65;roda(`ChatGPT: P_arma 65, dano do chefe ${f(dm*100)}%`,mkG(GRUPO),ao1m(dm));S.GLOBAL.pArma=110;}
roda('Grok: pacote (vida 175 mil, dano −33%, reserva 900, reanimação 50 fixos, bloqueio 15%, área 40%)',mkG(GRUPO,{reservaBase:900,reanimFixa:50,atravessa:.15,areaBloq:.4}),ao1m(.67,175000/120000));
out('');out('### 5.4 Chefes sintéticos (testes de pressão, não são o AO.1)');out('');out(cab);out(sep);
const sint=atq=>({s:1,inimigos:[{tipo:'sint',mod:{atq}}],dur:900,ameaca:true});
out(linhaChefe('Sintético v2: 300/2,6 s (um) + 200/10 s (todos)',bateria(mkG(GRUPO),sint([{nome:'golpe',dano:300,aviso:1,I:40,int:2.6,alvo:'um',resp:'epb'},{nome:'área',dano:200,aviso:1,I:30,int:10,alvo:'todos',resp:'e'}]),NB,HAB['médio'],POL.sustentado,28)));
out(linhaChefe('Sintético do ChatGPT: 300/8 s + 120/20 s',bateria(mkG(GRUPO),sint([{nome:'golpe',dano:300,aviso:1,I:40,int:8,alvo:'aggro',resp:'epb'},{nome:'área',dano:120,aviso:1,I:20,int:20,alvo:'todos',resp:'e'}]),NB,HAB['médio'],POL.sustentado,29)));
out('');out('Tempo-alvo do contrato: 6–10 min (estimativa AI.6 ≈ 5,8 min sem erros).');

// ===== 6. Técnicas por papel
out('');out('## 6. Técnicas por papel (cálculo do motor: pesos de atributo, fases e armadura 50)');out('');
out('Regra (ChatGPT, loop 4/5): técnica de **Execução** sem condição precisa de dano ≥ 1,20 × DPS do ataque leve × tempo ocupado. Ruptura, Contenção e Sustentação não entram na regra (o valor delas é controle, impacto ou apoio). Área contada com 1 alvo; DoT e zona incluídos.');out('');
const aF=bRef.a,aM=montarBuild(CFG.ref,'desarmado','Mago',[],'boneco').a;const ex=[],outras={Ru:0,Co:0,Su:0,'?':0};let nEx=0;
for(const id of Object.keys(S.ARV)){const A=S.ARV[id];for(const no of A.nos){if(!no.t||no.tipo!=='Técnica')continue;const fc=S.ficha(no);if(!fc.K)continue;
  if(fc.tag!=='Ex'){outras[fc.tag]=(outras[fc.tag]||0)+1;continue;}if(fc.cond){continue;}nEx++;
  const a=fc.magico?aM:aF;const F=fases(fc.T,a,'tec',fc.magico);const Tt=F.prep+F.exec+F.rec;const dano=fc.K*fc.h*fc.tiq*(1+fc.dot)*multP(a,fc.peso);
  const arma=A.cat==='arma'?ARMAS[id]:ARMAS.espada_longa;const Fl=fases(arma.lT,a,'leve',false);const dpsL=arma.lK*arma.h*multP(a,'leve')/(Fl.prep+Fl.exec+Fl.rec);
  const raz=dano/(dpsL*Tt);const area=fc.alvos>1;const no2=S.ARV[id].porN[no.n];const mov=(no2.t&&no2.t.mov)||0;if(raz<1.20)ex.push({n:fc.nome,id,raz,rA:area?raz*Math.min(6,fc.alvos):null,nA:Math.min(6,fc.alvos),mov,mag:fc.magico,marca:!!(fc.debuff&&fc.debuff.fogoMais)});}}
out(`Execução sem condição: ${nEx} técnicas; **${ex.length} abaixo de 1,20×**. Fora da regra: Ruptura ${outras.Ru}, Contenção ${outras.Co}, Sustentação ${outras.Su}${outras['?']?', sem etiqueta '+outras['?']:''}.`);out('');
out('Técnicas mágicas medidas no perfil Mago de referência (POT20/CON15/VIG10); físicas no FOR20/DES15/VIG10. Área medida também no número de alvos do projeto (até 6).');out('');out('| Técnica (Execução) | Árvore | 1 alvo | Falta p/ 1,20 | Nos alvos do projeto | Observação |');out('|---|---|---|---|---|---|');
for(const x of ex.sort((p,q)=>p.raz-q.raz))out(`| ${x.n} | ${x.id} | ${f(x.raz,2)} | ${sg(1.2/x.raz-1)} | ${x.rA==null?'—':f(x.rA,2)+' ('+x.nA+' alvos)'+(x.rA>=1.2?' ✔':'')} | ${[x.mov?'mobilidade '+x.mov+' m (valor não medido)':'',x.marca?'marca amplificadora (+8% por 8 s; valor não medido)':''].filter(Boolean).join('; ')||'—'} |`);

// ===== 7. Não avaliado
out('');out('## 7. O que este simulador ainda não avalia (fora das conclusões)');out('');
['Leitura do grupo "contra distância" (puxão) e "contra interrupção" (conjuração dupla); só quebra-guarda e golpe atrasado entram.','Formas de mistura sem efeito numérico (apoio, ocultar, deslocamento, lentidão) ficam fora da busca; Água (redistribuir reserva) não está no motor.','Aggro: falta a parcela de dano interceptado e de cura (não há esses eventos no motor).','Fadiga 100 do chefe (o contrato não define o efeito em números).','Regressão das âncoras na fase 2 (a estratégia simulada faz uma âncora por vez, sem deixá-la parcial e sozinha).','Guardas elementais da âncora 3 atacando quem está lá (a rota de Controle só custa tempo).','Passivas de texto, nós-chave, Artes, afixos e fabricação.','Peso da arma: fixado em 3 para todas.','Deslocamento real: tarefas das âncoras custam 3 s de ida; ninguém é atingido por Varredura/Golpe pesado longe do chefe.','Reação elemental só entre elementos do mesmo jogador (como manda o 07); combinações entre jogadores não existem no contrato.'].forEach(x=>out('- '+x));
out('');out(`---`);out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(OUT,'relatorio3.md'),L.join('\n'));fs.writeFileSync(path.join(OUT,'builds3.csv'),csv.join('\n'));
console.log(L.join('\n'));
