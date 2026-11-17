// Executa o simulador v2 e gera sim/resultado/relatorio2.md + builds2.csv
"use strict";
const S=require('./simulador2.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,f,media,VERSAO_DADOS}=S;
const OUT=path.join(__dirname,'resultado');
const RAPIDO=process.argv.includes('--rapido');const N1=RAPIDO?30:100,N2=RAPIDO?60:400,NC=RAPIDO?3:10;
const s15=Math.pow(1.09,14),s100=Math.pow(1.09,99);
const CFG={ref:{nivel:15,ph:4+14,s:s15,ref:true},n15:{nivel:15,ph:4+14,s:s15},n100:{nivel:100,ph:4+99,s:s100}};
const ELS=['fogo','gelo','raio','terra','vento','agua'];
const PREF_EL={'Força':['terra'],'Destreza':['vento'],'Força+Destreza':['raio'],'Tanque':['terra'],'Leitor (PER)':['raio'],'Mago':['fogo','raio'],'Lâmina mágica':['fogo'],'Generalista':['agua']};
const L=[];const out=s=>{L.push(s);};
const t0=Date.now();

// 1) calibração: perfil de referência (FOR20/DES15/VIG10 com afinidade), espada longa, sem elemento
out('# Simulador de equilíbrio v2 — relatório');
out('');out(`Dados: dados.js \`${VERSAO_DADOS}\` · fichas revisadas: ${Object.keys(S.FICHAS).length} · sementes fixas (mulberry32) · triagem ${N1} lutas, finalistas ${N2}, chefe ${NC} lutas de 6 jogadores · intervalos de 95% (Wilson para vitórias, t para tempo).`);
out('');out('## 1. Calibração (contrato AI: DPS de referência ≈ 70)');out('');
const bRef=montarBuild(CFG.ref,'espada_longa','Força+Destreza',[],'boneco');
out(`Perfil de referência no nível 15 (com afinidade): ${Object.entries(bRef.a).filter(([,v])=>v).map(([k,v])=>k+' '+v).join(' · ')}.`);out('');
const cal={};for(const pn of Object.keys(POL)){cal[pn]=dpsBoneco(bRef,POL[pn]);}
const abstrato=cal.sustentado*0.55;
S.GLOBAL.vidaMult=50;const ev=bateria(bRef,'fera',N1,HAB['médio'],POL.sustentado,1,60);S.GLOBAL.vidaMult=1; // luta longa (60 s): sem o pico de abertura
const curta=bateria(bRef,'fera',N1,HAB['médio'],POL.sustentado,1);
out('| Modo | Como mede | DPS ÷ s |');out('|---|---|---|');
out(`| Boneco (100% atacando) | sem ameaça, política sustentado | ${f(cal.sustentado,1)} |`);
out(`| **Abstrato** | boneco × 0,55, aplicado uma única vez | **${f(abstrato,1)}** |`);
out(`| **Por eventos** | 60 s contra fera real (vida ×50), com defesa, esquiva e parry sorteados | **${f(ev.dps,1)}** (tempo ofensivo efetivo ${f(ev.ofens*100)}%) |`);
out('');const fatorAbs=abstrato/70,fatorEv=ev.dps/70;
out(`Com as vidas atuais, a fera morre em ${f(curta.tempo,1)} s (contrato: 8–12 s): o tempo ofensivo real fica perto de ${f(ev.ofens*100)}%, não 55%, e as recargas cheias no início inflam lutas curtas.`);out('');
out(`Fator de vida sugerido (F = DPS ÷ 70): abstrato ${f(fatorAbs,3)} · por eventos ${f(fatorEv,3)}. **Da seção 2 em diante, as vidas dos inimigos estão multiplicadas pelo fator por eventos (${f(fatorEv,2)})**, para que as lutas tenham a duração do contrato e a sobrevivência pese.`);
const VM=fatorEv;
out('');out('Boneco por política: '+Object.entries(cal).map(([k,v])=>`${k} ${f(v,1)}`).join(' · ')+'.');

S.GLOBAL.vidaMult=VM;
// 2) armas: perfil Força+Destreza, sem elemento, fera e constructo, jogador médio
out('');out('## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado)');out('');
out('| Arma | Boneco DPS | Fera: vitória [IC] | Fera: tempo ± IC | Constructo: vitória | Constructo: tempo | Tempo em ação ofensiva* | Δ boneco vs média |');out('|---|---|---|---|---|---|---|---|');
const armaRes=[];for(const ar of Object.keys(ARMAS)){const b=montarBuild(CFG.n15,ar,'Força+Destreza',[],'fera');const dB=dpsBoneco(b,POL.sustentado);
  const fe=bateria(b,'fera',N1,HAB['médio'],POL.sustentado,2),co=bateria(b,'constructo',N1,HAB['médio'],POL.sustentado,3);armaRes.push({ar,dB,fe,co});}
const mA=media(armaRes.map(x=>x.dB));
for(const x of armaRes)out(`| ${x.ar} | ${f(x.dB,1)} | ${f(x.fe.vitorias*100)}% [${f(x.fe.wl*100)}–${f(x.fe.wh*100)}] | ${f(x.fe.tempo,1)} ± ${f(x.fe.ic,1)} s | ${f(x.co.vitorias*100)}% | ${f(x.co.tempo,1)} s | ${f(x.fe.ofens*100)}% | ${(x.dB/mA-1>=0?'+':'')}${f((x.dB/mA-1)*100)}% |`);
const foraA=armaRes.filter(x=>Math.abs(x.dB/mA-1)>0.15).map(x=>x.ar);
out('');out('\\* Soma do tempo das ações iniciadas; passa de 100% quando uma ação é cortada por defesa e outra começa.');out(`Armas fora de ±15% da média no boneco: ${foraA.length?foraA.join(', '):'nenhuma'}.`);

// 3) perfis × políticas (triagem) → finalistas
out('');out('## 3. Perfis de atributo × 4 políticas (nível 15, mesma busca de elementos para todos)');out('');
const linhas=[];const csv=['perfil;arma;elementos;politica;habilidade;cenario;n;vitorias;wl;wh;tempo;ic;mortes;dps;ofensivo;sem_energia;basicos_forcados;quebras'];
const armasPerfil={'Força':['machado_grande','espada_longa'],'Destreza':['duas_espadas','katana'],'Força+Destreza':['espada_longa','katana'],'Tanque':['espada_e_escudo','machado_grande'],
  'Leitor (PER)':['katana','arco'],'Mago':['desarmado','arco'],'Lâmina mágica':['espada_longa','machado_pequeno'],'Generalista':['espada_curta','espada_longa']};
for(const pf of Object.keys(PERFIS)){
  // mesma busca: 1 elemento entre os 6 e o par preferido (escolhe o melhor no boneco)
  let melhor=null;for(const ar of armasPerfil[pf])for(const els of [[],...ELS.map(e=>[e]),PREF_EL[pf].length>1?PREF_EL[pf]:[PREF_EL[pf][0],'raio']]){
    const b=montarBuild(CFG.n15,ar,pf,[...new Set(els)],'fera');const d=dpsBoneco(b,POL.sustentado);if(!melhor||d>melhor.d)melhor={b,d,ar,els:[...new Set(els)]};}
  for(const pn of Object.keys(POL)){const r=bateria(melhor.b,'fera',N1,HAB['médio'],POL[pn],4),rc=bateria(melhor.b,'constructo',N1,HAB['médio'],POL[pn],5);
    linhas.push({pf,ar:melhor.ar,els:melhor.els,pn,r,rc,b:melhor.b});
    for(const [c,x] of [['fera',r],['constructo',rc]])csv.push([pf,melhor.ar,melhor.els.join('+')||'-',pn,'médio',c,x.n,x.vitorias.toFixed(3),x.wl.toFixed(3),x.wh.toFixed(3),isFinite(x.tempo)?x.tempo.toFixed(2):'',x.ic.toFixed(2),x.mortes.toFixed(2),x.dps.toFixed(1),x.ofens.toFixed(3),x.semEne.toFixed(3),x.forc.toFixed(3),x.quebras.toFixed(2)].join(';'));}}
out('| Perfil | Arma · elementos | Política | Fera: vitória | Fera: tempo | Constructo: vitória | Constructo: tempo | Sem energia | Básicos forçados |');out('|---|---|---|---|---|---|---|---|---|');
for(const x of linhas)out(`| ${x.pf} | ${x.ar} · ${x.els.join('+')||'—'} | ${x.pn} | ${f(x.r.vitorias*100)}% | ${f(x.r.tempo,1)} s | ${f(x.rc.vitorias*100)}% | ${f(x.rc.tempo,1)} s | ${f(x.r.semEne*100)}% | ${f(x.r.forc*100)}% |`);
// melhor política por perfil → finalistas com N2, médio e bom
out('');out('### Finalistas (melhor política de cada perfil, '+N2+' lutas, constructo)');out('');
out('| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: vitória | Bom: tempo | Δ tempo vs mediana |');out('|---|---|---|---|---|---|---|');
const fin=[];for(const pf of Object.keys(PERFIS)){const ls=linhas.filter(x=>x.pf===pf).filter(x=>x.rc.vitorias>0).sort((a,b)=>a.rc.tempo-b.rc.tempo);const x=ls[0]||linhas.find(y=>y.pf===pf);
  const m=bateria(x.b,'constructo',N2,HAB['médio'],POL[x.pn],6),g=bateria(x.b,'constructo',N2,HAB['bom'],POL[x.pn],7);fin.push({pf,pn:x.pn,m,g,b:x.b});}
const medT=S.med(fin.map(x=>x.m.tempo));
for(const x of fin)out(`| ${x.pf} | ${x.pn} | ${f(x.m.vitorias*100)}% [${f(x.m.wl*100)}–${f(x.m.wh*100)}] | ${f(x.m.tempo,1)} ± ${f(x.m.ic,1)} s | ${f(x.g.vitorias*100)}% | ${f(x.g.tempo,1)} s | ${(x.m.tempo/medT-1>=0?'+':'')}${f((x.m.tempo/medT-1)*100)}% |`);
const dentro=fin.filter(x=>Math.abs(x.m.tempo/medT-1)<=0.15).length;
out('');out(`Perfis a ≤ 15% da mediana: **${dentro} de ${fin.length}** (meta do contrato: ≥ 8 builds viáveis). Fora: ${fin.filter(x=>Math.abs(x.m.tempo/medT-1)>0.15).map(x=>x.pf).join(', ')||'nenhum'}.`);

// 4) ensaios propostos pelas IAs
out('');out('## 4. Ensaios das propostas do loop 4');out('');
const ens=[];const mg=fin.find(x=>x.pf==='Mago');const lt=fin.find(x=>x.pf==='Leitor (PER)');
for(const [nome,pf,opc] of [['Mago + Pulso básico (K0,70, 1,0 s, custo 0)','Mago',{pulso:1}],['Mago + RegE extra 4·rCON·rPOT','Mago',{regenMago:1}],['Leitor + leitura do Grok (6 s; 15+25·rPER; 8+12·rPER)','Leitor (PER)',{perGrok:1}]]){
  const base=fin.find(x=>x.pf===pf);const b=Object.assign({},base.b,{opc});const r=bateria(b,'constructo',N2,HAB['médio'],POL[base.pn],6);
  ens.push(`| ${nome} | ${f(base.m.tempo,1)} s | ${f(r.tempo,1)} ± ${f(r.ic,1)} s | ${(r.tempo/medT-1>=0?'+':'')}${f((r.tempo/medT-1)*100)}% |`);}
out('| Ensaio | Antes | Depois | Δ vs mediana |');out('|---|---|---|---|');ens.forEach(x=>out(x));

// 5) Chefe de Andar real: 6 jogadores, vida compartilhada 120.000·s
out('');out(`## 5. Chefe de Andar (6 jogadores, vida 120.000·s compartilhada, postura 1.000, ataque de 300 com aviso de 1,0 s, área a cada 10 s) — ${NC} lutas por grupo`);out('');
out('Regras usadas: 5 poções de 250 por tentativa (saem da reserva), até 2 reanimações por jogador (4 s de um aliado, volta com mín(30%; reserva)), caído por 25 s.');out('');
out('| Grupo (6 iguais) | Política | Vitória | Tempo da vitória | Duração média | Quedas por luta | Quebras de postura | Dano recebido por jogador/min ÷ s | Orçamento de vida + reserva ÷ s | Contrato |');out('|---|---|---|---|---|---|---|---|---|---|');
const brutoMin=300*60/2.6/6+200*6;const taxas=[];
for(const [pf,hb] of [['Força+Destreza','médio'],['Tanque','médio'],['Mago','médio'],['Força+Destreza','bom'],['Tanque','bom']]){const x=fin.find(y=>y.pf===pf);const r=bateria(x.b,'chefe',NC,HAB[hb],POL[x.pn],8);taxas.push({r,pf,hb});
  out(`| ${pf} (${hb}) | ${x.pn} | ${f(r.vitorias*100)}% | ${f(r.tempo/60,1)} min | ${f(r.dur/60,1)} min | ${f(r.mortes,1)} | ${f(r.quebras,1)} | ${f(r.recebido)} | ${f(r.orc)} | 6–10 min |`);}

{const fr=media(taxas.map(z=>z.r.recebido/brutoMin)),orc=media(taxas.map(z=>z.r.orc));const alvo=orc/8/fr;
out('');out(`Dano bruto do chefe por jogador: ${f(brutoMin)}/min ÷ s (300 a cada 2,6 s dividido por 6 + área de 200 a cada 10 s). Depois de esquiva, parry e bloqueio, chega ${f(fr*100)}% disso. Com orçamento médio de ${f(orc)} ÷ s, o grupo aguenta cerca de ${f(orc/(brutoMin*fr),1)} min. **Conflito de contrato:** para uma luta de 8 min, o dano bruto por jogador precisa ficar perto de ${f(alvo)}/min (÷ s), ou cerca de ${f(alvo/brutoMin*100)}% do atual, ou o grupo precisa de cura que não sai da reserva.`);}
// 6) técnicas abaixo do ataque básico (ficha × boneco)
out('');out('## 6. Técnicas: valor por segundo contra o ataque leve da própria arma (perfil Força+Destreza, alvo único)');out('');
const rr=x=>x/(x+40);let abaixo=[],tot=0;
for(const id of Object.keys(S.ARV)){const A=S.ARV[id];for(const no of A.nos){if(!no.t||no.tipo!=='Técnica')continue;const fc=S.ficha(no);if(!fc.K)continue;tot++;
  const a=bRef.a;const H=1+.35*rr(a.DES);const T=fc.T*(0.35/H+0.2+0.45/H);const v=fc.K*fc.h*fc.tiq*(1+fc.dot)/T;
  const arma=A.cat==='arma'?ARMAS[id]:ARMAS.espada_longa;const lv=arma.lK*arma.h/(arma.lT*(0.35/H+0.2+0.45/H));
  if(v<lv*0.95&&!fc.cond)abaixo.push(`${fc.nome} (${id}) ${f(v/lv*100)}%`);}}
out(`${abaixo.length} de ${tot} técnicas com dano ficam abaixo de 95% do ataque leve, sem contar condição, controle, área ou impacto. As que não têm papel de controle precisam de revisão:`);out('');
out(abaixo.slice(0,60).map(x=>'- '+x).join('\n'));

out('');out(`---`);out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s. Limitações conhecidas: um alvo por vez escolhe a ação pelo valor por segundo (sem planejamento de rotação longa); jogadores do chefe são cópias; o flanco é sorteado (30% solo, 60% no chefe).`);
fs.writeFileSync(path.join(OUT,'relatorio2.md'),L.join('\n'));fs.writeFileSync(path.join(OUT,'builds2.csv'),csv.join('\n'));
console.log(L.join('\n'));
