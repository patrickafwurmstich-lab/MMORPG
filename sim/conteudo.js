// Pendências de conteúdo da calibração v1 (docs/10 §6): Força/machado grande no AO.1, Fogo dominante, técnicas de Execução.
// Uso: node sim/conteudo.js [--rapido] → sim/resultado/conteudo.md
"use strict";
const S=require('./simulador3.js');const fs=require('fs'),path=require('path');
const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media,fases,multP}=S;
const RAPIDO=process.argv.includes('--rapido');const NB=RAPIDO?40:200,NC=RAPIDO?40:200;
const f=(v,d=0)=>(v===Infinity||isNaN(v))?'—':Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});const sg=v=>(v>=0?'+':'')+f(v*100)+'%';
const c15={nivel:15,s:1},cref={nivel:15,s:1,ref:true},c100={nivel:100,s:Math.pow(1.09,9)};const ELS=['fogo','gelo','raio','terra','vento','agua'];
const solo=(tipo,mod,s)=>({s:s||1,inimigos:[{tipo,mod}],dur:240,ameaca:true});
const AO1={s:1,inimigos:[{tipo:'ao1'}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true};
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
const L=[];const out=x=>L.push(x);const t0=Date.now();
out('# Pendências de conteúdo da calibração v1');out('');out(`Motor v3.2 com a calibração v1 como padrão. Mesmas sementes. AO.1: ${NB} tentativas; constructo: ${NC} lutas.`);

// ===== A. Força no AO.1
out('');out('## A. Força (FOR/VIG) com machado grande no AO.1');out('');
out('Meta proposta (Grok, loop 10): quedas da Força ≤ 1,1 × média do grupo e DPS ≥ 65% do melhor do grupo, sem tirar o AO.1 da faixa (70–85% em 6–10 min).');out('');
out('| Variação do jogador Força | Vitória do grupo [IC] | Tempo | Quedas Força | Média do grupo | Razão | DPS Força ÷ melhor | Cumpre |');out('|---|---|---|---|---|---|---|---|');
function linhaForca(nome,G,cena){const g=G.map(([ar,pf,el,pol,opc])=>montarBuild(c15,ar,pf,el,'chefe',Object.assign({pol},opc||{})));const r=bateria(g,cena||AO1,NB,HAB['médio'],POL.sustentado,20);
  const pj=r.porJogador;const fo=pj[1];const mq=media(pj.map(x=>x.quedas));const mx=Math.max(...pj.map(x=>x.dps));const ok=fo.quedas<=1.1*mq&&fo.dps/mx>=.65;
  out(`| ${nome} | ${f(r.vitorias*100,1)}% [${f(r.wl*100)}–${f(r.wh*100)}] | ${f(r.tempo/60,2)} min | ${f(fo.quedas,2)} | ${f(mq,2)} | ${f(fo.quedas/mq,2)}× | ${f(fo.dps/mx*100)}% | ${ok?'✔':'✘'} |`);return r;}
const comF=(pol,opc,ar,el)=>GRUPO.map((x,i)=>i===1?[ar||x[0],x[1],el||x[2],pol,opc]:x);
for(const pol of ['ruptura','sustentado','explosao','defensiva'])linhaForca(`machado grande · política ${pol}`,comF(pol));
// conteúdo do machado grande: carga 2+ com super-armadura também contra chefe (hoje só contra comuns) / carga fixa menor
linhaForca('machado grande · sustentado · carga 1 fixa',comF('sustentado',{cargaFixa:1}));
linhaForca('machado grande · sustentado · carga 2 fixa',comF('sustentado',{cargaFixa:2}));
// referência: mesma pessoa com outra arma (mostra se o problema é a arma ou o perfil)
linhaForca('espada longa · sustentado (referência do perfil)',comF('sustentado',{},'espada_longa'));

// ===== B. Fogo
out('');out('## B. Valor de cada elemento na mesma preparação (constructo, jogador médio)');out('');
out('Mesma arma, mesmos atributos, mesmas sementes; muda só o elemento. Δ = tempo de luta contra a mesma preparação sem elemento (negativo = mata mais rápido).');out('');
const prepB=[['Força+Destreza','espada_longa'],['Mago','desarmado'],['Lâmina mágica','espada_longa'],['Leitor (PER)','arco']];
function tabelaEl(fogoArm){S.GLOBAL.fogoArm=fogoArm;const linhas=[];for(const [pf,ar] of prepB){const t0b=bateria([montarBuild(c15,ar,pf,[],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo;
    const v=ELS.map(e=>bateria([montarBuild(c15,ar,pf,[e],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo/t0b-1);linhas.push({pf,ar,v});}S.GLOBAL.fogoArm=30;return linhas;}
for(const fa of [30,24,18]){out(`### Fogo com −${fa} de armadura${fa===30?' (atual)':''}`);out('');out('| Preparação | '+ELS.join(' | ')+' | Fogo vs 2º melhor |');out('|---|'+ELS.map(()=>'---').join('|')+'|---|');
  for(const x of tabelaEl(fa)){const outros=x.v.slice(1);const seg=Math.min(...outros);out(`| ${x.pf} · ${x.ar} | ${x.v.map(sg).join(' | ')} | ${sg((1+x.v[0])/(1+seg)-1)} |`);}out('');}
// pacote de ensaio para o Fogo: armadura −24 e Lança ígnea mais lenta (0,7 → 0,9 s), a técnica de maior dano por segundo entre os elementos
out('### Ensaio: Fogo −24 e Lança ígnea 0,7 → 0,9 s');out('');out('| Preparação | '+ELS.join(' | ')+' | Fogo vs 2º melhor |');out('|---|'+ELS.map(()=>'---').join('|')+'|---|');
{const bk=S.FICHAS['fogo:7'];S.FICHAS['fogo:7']=Object.assign({},bk,{T:0.9});S.limparFichas();for(const x of tabelaEl(24)){const seg=Math.min(...x.v.slice(1));out(`| ${x.pf} · ${x.ar} | ${x.v.map(sg).join(' | ')} | ${sg((1+x.v[0])/(1+seg)-1)} |`);}S.FICHAS['fogo:7']=bk;S.limparFichas();}
out('');
// escolha de elemento pela busca (nível 15) com cada valor
out('### Elemento escolhido pela busca (nível 15, 11 armas × sem/6 elementos)');out('');out('| Fogo | Elementos escolhidos pelos 8 perfis | Perfis com Fogo |');out('|---|---|---|');
function buscar(pf){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco');C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}
  C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),RAPIDO?6:20,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
for(const fa of [30,24,18]){S.GLOBAL.fogoArm=fa;const esc=Object.keys(PERFIS).map(pf=>buscar(pf));S.GLOBAL.fogoArm=30;
  out(`| −${fa} | ${esc.map((m,i)=>Object.keys(PERFIS)[i]+': '+m.ar+'/'+(m.els[0]||'—')).join('; ')} | ${esc.filter(m=>m.els[0]==='fogo').length}/8 |`);}

// ===== B2. Armas contra o constructo (por que a busca escolhe espada curta/katana)
out('');out('## B2. Armas contra o constructo (perfil Força+Destreza, Fogo, jogador médio)');out('');out('O boneco não ataca; o constructo pune ações longas (fases J.1). A busca escolhe o menor tempo, então diferenças pequenas viram "8 de 8".');out('');
{const r=Object.keys(ARMAS).map(ar=>({ar,t:bateria([montarBuild(c15,ar,'Força+Destreza',['fogo'],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo}));const m=media(r.map(x=>x.t));
 out('| Arma | Constructo | Δ vs média (negativo = mais rápida) |');out('|---|---|---|');for(const x of r.sort((a,b)=>a.t-b.t))out(`| ${x.ar} | ${f(x.t,1)} s | ${sg(x.t/m-1)} |`);
 out('');out(`Fora de ±15% da média contra o constructo: ${r.filter(x=>Math.abs(x.t/m-1)>.15).map(x=>x.ar).join(', ')||'nenhuma'}.`);
 S.GLOBAL.flanco=1.0;const sc=bateria([montarBuild(c15,'espada_curta','Força+Destreza',['fogo'],'boneco')],solo('constructo'),NC,HAB['médio'],POL.sustentado,4).tempo;S.GLOBAL.flanco=1.3;
 out(`Espada curta sem o Flanco: ${f(sc,1)} s (${sg(sc/m-1)}). O Flanco solo é sorteado em 30% dos golpes.`);}

// ===== C. Técnicas de Execução
out('');out('## C. Técnicas de Execução abaixo de 1,20× (alvo único, sem condição)');out('');
out('Critério (loops 5–9): dano da técnica ≥ 1,20 × DPS do ataque leve × tempo ocupado. Físicas medidas em FOR20/DES15/VIG10; mágicas em POT20/CON15/VIG10. Proposta: K novo = K × 1,20 ÷ ρ (arredondado para cima em 0,05), só nas que não têm outro papel (área, mobilidade, marca).');out('');
const aF=montarBuild(cref,'espada_longa','Força+Destreza',[],'boneco').a,aM=montarBuild(cref,'desarmado','Mago',[],'boneco').a;const prop={};
out('| Técnica | Árvore | ρ atual | K por acerto atual | K proposto | ρ com a proposta | Observação |');out('|---|---|---|---|---|---|---|');
for(const id of Object.keys(S.ARV)){const A=S.ARV[id];for(const no of A.nos){if(!no.t||no.tipo!=='Técnica')continue;const fc=S.ficha(no);if(!fc.K||fc.tag!=='Ex'||fc.cond)continue;
  const a=fc.magico?aM:aF;const F=fases(fc.T,a,'tec',fc.magico);const Tt=F.prep+F.exec+F.rec;const dano=fc.K*fc.h*fc.tiq*(1+fc.dot)*multP(a,fc.peso);
  const arma=A.cat==='arma'?ARMAS[id]:ARMAS.espada_longa;const Fl=fases(arma.lT,a,'leve',false);const dpsL=arma.lK*arma.h*multP(a,'leve')/(Fl.prep+Fl.exec+Fl.rec);const rho=dano/(dpsL*Tt);if(rho>=1.2)continue;
  const area=fc.alvos>1,mov=(no.t.mov||0),marca=!!(fc.debuff&&fc.debuff.fogoMais);let obs=[],Kn=null;
  if(area){const ra=rho*Math.min(6,fc.alvos);obs.push(`área: ${f(ra,2)} em ${Math.min(6,fc.alvos)} alvos${ra>=1.2?' ✔ (manter)':''}`);if(ra<1.2)Kn=Math.ceil(fc.K*1.2/ra*20)/20;}
  else if(mov){obs.push(`mobilidade ${mov} m: valor não medido; ajuste parcial até 1,0×`);Kn=Math.ceil(fc.K*1.0/rho*20)/20;if(Kn<=fc.K)Kn=null;}
  else if(marca){obs.push('marca amplificadora: medir no conjunto (manter)');}
  else Kn=Math.ceil(fc.K*1.2/rho*20)/20;
  if(Kn)prop[no.key]=Kn;const rho2=Kn?rho*Kn/fc.K:rho;
  out(`| ${fc.nome} | ${id} | ${f(rho,2)} | ${f(fc.K,2)} × ${fc.h} | ${Kn?f(Kn,2):'—'} | ${f(rho2,2)}${area&&Kn?' (1 alvo)':''} | ${obs.join('; ')||'alvo único'} |`);}}
// efeito das propostas no equilíbrio entre armas
out('');out('### As armas continuam a ±15% com as propostas?');out('');
const dpsA=()=>{const v=Object.keys(ARMAS).map(ar=>({ar,d:dpsBoneco(montarBuild(c15,ar,'Força+Destreza',[],'boneco'),POL.sustentado,90)}));const m=media(v.map(x=>x.d));return v.map(x=>({ar:x.ar,d:x.d,r:x.d/m-1}));};
const antes=dpsA();for(const k in prop)S.FICHAS[k]=Object.assign({},S.FICHAS[k]||{},{K:prop[k]});S.limparFichas();const depois=dpsA();
out('| Arma | Antes | Depois |');out('|---|---|---|');for(let i=0;i<antes.length;i++)out(`| ${antes[i].ar} | ${sg(antes[i].r)} | ${sg(depois[i].r)} |`);
out('');out(`Fora de ±15% depois: ${depois.filter(x=>Math.abs(x.r)>.15).map(x=>x.ar).join(', ')||'nenhuma'}.`);
fs.writeFileSync(path.join(__dirname,'resultado','propostas-tecnicas.json'),JSON.stringify(prop,null,1));
out('');out(`Gerado em ${((Date.now()-t0)/1000).toFixed(0)} s.`);
fs.writeFileSync(path.join(__dirname,'resultado','conteudo.md'),L.join('\n'));console.log(L.join('\n'));
