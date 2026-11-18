// Loop 13: AO.1 e elementos com o pacote v1.1 + reforço dos feitiços-base (Projétil 1,60 / Área 1,80; Vento 1,50 / 1,70). Uso: node sim/ao1-v11.js
const S=require('./simulador3.js');const {montarBuild,bateria,POL,HAB,media}=S;const ELS=['fogo','gelo','raio','terra','vento','agua'];
S.GLOBAL.fogoArm=24;Object.assign(S.FICHAS,{'fogo:7':Object.assign({},S.FICHAS['fogo:7'],{T:0.9}),'katana:23':Object.assign({},S.FICHAS['katana:23'],{K:.85}),'duas_espadas:1':Object.assign({},S.FICHAS['duas_espadas:1'],{K:.40})});
for(const e of ELS){S.FICHAS[e+':1']=Object.assign({},S.FICHAS[e+':1'],{K:e==='vento'?1.5:1.6});S.FICHAS[e+':2']=Object.assign({},S.FICHAS[e+':2'],{K:e==='vento'?1.7:1.8});}S.limparFichas();
const G=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'explosao'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
for(const d of [.57,.58,.59,.60,.61]){const ao={s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1v8.atq.map(x=>Object.assign({},x,{dano:Math.round(x.dano*d)}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true};
const g=G.map(([ar,pf,el,pol])=>montarBuild({nivel:15,s:1},ar,pf,el,'chefe',{pol}));const r=S.bateria(g,ao,400,HAB['médio'],POL.sustentado,20);const pj=r.porJogador,fo=pj[1],mq=media(pj.map(x=>x.quedas)),mx=Math.max(...pj.map(x=>x.dps));
console.log(d,(r.vitorias*100).toFixed(2)+'%',r.wl.toFixed(3),r.wh.toFixed(3),(r.tempo/60).toFixed(2),'forca',(fo.quedas/mq).toFixed(2),(fo.dps/mx*100).toFixed(0));}
const solo={s:1,inimigos:[{tipo:'constructo'}],dur:240,ameaca:true};
for(const [pf,ar] of [['Mago','desarmado'],['Lâmina mágica','espada_longa'],['Mago','espada_curta']]){const t0=S.bateria([montarBuild({nivel:15,s:1},ar,pf,[],'boneco')],solo,200,HAB['médio'],POL.sustentado,4).tempo;
 const v=ELS.map(e=>S.bateria([montarBuild({nivel:15,s:1},ar,pf,[e],'boneco')],solo,200,HAB['médio'],POL.sustentado,4).tempo/t0-1);const seg=Math.min(...v.slice(1));console.log(pf,ar,v.map(x=>(x*100).toFixed(0)).join(' '),'fogo vs 2o',(((1+v[0])/(1+seg)-1)*100).toFixed(1));}
