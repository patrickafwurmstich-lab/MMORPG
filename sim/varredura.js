process.argv.push('--x');
const S=require('/home/claude/mmorpg/sim/simulador3.js');const {montarBuild,bateria,dpsBoneco,PERFIS,ARMAS,POL,HAB,media}=S;
Object.assign(ARMAS.machado_grande,{lK:.92,pK:2.05,pT:1.40});ARMAS.dois_machados.lK=.34;S.GLOBAL.frenesiVel=.02;
const c15={nivel:15,s:1};const ELS=['fogo','gelo','raio','terra','vento','agua'];const solo=(t,m)=>({s:1,inimigos:[{tipo:t,mod:m}],dur:240,ameaca:true});
const GRUPO=[['espada_e_escudo','Tanque',['terra'],'defensiva'],['machado_grande','Força',['fogo'],'ruptura'],['duas_espadas','Destreza',['vento'],'explosao'],['arco','Leitor (PER)',['raio'],'sustentado'],['desarmado','Mago',['gelo'],'sustentado'],['espada_longa','Lâmina mágica',['agua'],'sustentado']];
function buscar(pf,opc){const C=[];for(const ar of Object.keys(ARMAS))for(const els of [[],...ELS.map(e=>[e])]){const b=montarBuild(c15,ar,pf,els,'boneco',opc);C.push({b,d:dpsBoneco(b,POL.sustentado,60),ar,els});}C.sort((x,y)=>y.d-x.d);let m=null;for(const c of C.slice(0,6)){c.tt=bateria([c.b],solo('constructo'),12,HAB['médio'],POL.sustentado,77).tempo;if(!m||c.tt<m.tt)m=c;}return m;}
const V=JSON.parse(process.env.V);
for(const v of V){S.GLOBAL.pArma=v.p;S.GLOBAL.fogoArm=v.fogo||30;S.GLOBAL.flanco=v.fl||1.3;
 let txt='';if(v.perfis){const pr=Object.keys(PERFIS).map(pf=>{const m=buscar(pf,v.opc);return {pf,m,r:bateria([m.b],solo('constructo'),60,HAB['médio'],POL.sustentado,8)}});const mel=Math.min(...pr.map(x=>x.r.tempo));txt=pr.map(x=>x.pf.slice(0,6)+' '+x.m.ar.slice(0,8)+'/'+(x.m.els[0]||'-')+' '+((x.r.tempo/mel-1)*100).toFixed(0)).join(' | ')+' => '+pr.filter(x=>x.r.tempo/mel-1<=.15).length+'/8';}
 const g=GRUPO.map(([ar,pf,el,pol])=>montarBuild(c15,ar,pf,el,'chefe',Object.assign({pol},v.opc)));
 const ao={s:1,inimigos:[{tipo:'ao1',mod:{atq:S.TIPOS.ao1.atq.map(x=>Object.assign({},x,{dano:x.dano*v.d}))}}],dur:900,ameaca:true,ancoras:true,grito:true,leitura:true};
 const bm=bateria(g,ao,120,HAB['médio'],POL.sustentado,20);
 console.log(JSON.stringify(v),'| AO1',(bm.vitorias*100).toFixed(0)+'%',(bm.tempo/60).toFixed(2)+'min reanim',bm.reanim.toFixed(2),'\n   ',txt);}
