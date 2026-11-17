// Fichas explícitas das técnicas (loop 4, revisão do ChatGPT: "representar K por acerto, acertos por alvo,
// máximo de alvos, tiques, fases e todos os campos da transformação; não inferir por palavras").
// Base: números lidos do documento (dados.js). Aqui ficam as correções revisadas à mão, técnica por técnica.
// Campos: K = K POR ACERTO · h = acertos em cada alvo · alvos = máx. de alvos (99 = todos na área) ·
//   forma: golpe | arco180 | volta (360° em você) | linha | area (no alvo) | proj | zona (dura no chão) ·
//   alc (m) · T = tempo total (s) · carga = segura antes (s, já dentro de T) · tiq = tiques de dano (zona/canal) ·
//   dot = fração do dano direto que vira dano contínuo · cond = condição para usar ·
//   bonus = {quando, mult} · I = impacto total da ação · nota = interpretação que precisa de confirmação.
"use strict";
const F={
 // ---------- DESARMADO ----------
 'desarmado:1':{forma:'golpe',mov:3},
 'desarmado:2':{forma:'golpe'},
 'desarmado:3':{forma:'golpe',peso:'imbuir'},
 'desarmado:8':{K:.25,h:8,forma:'golpe'},
 'desarmado:9':{K:.30,h:6,forma:'volta',alc:2,alvos:99},
 'desarmado:15':{forma:'volta',alc:1.5,alvos:3,cond:'comum'},
 'desarmado:16':{cond:'postura<30',alt:{K:.40,I:10},nota:'fora da condição vira empurrão K0,40'},
 'desarmado:17':{cond:'postura<20',nota:'só elite com postura < 20%'},
 'desarmado:25':{peso:'imbuir'},
 // ---------- ESPADA CURTA ----------
 'espada_curta:1':{forma:'golpe',flancoGarantido:1},
 'espada_curta:7':{bonus:{quando:'naoMirando',mult:1.5}},
 'espada_curta:8':{K:.40,h:4,cond:'flanco'},
 'espada_curta:9':{K:.50,h:2,segundoSoFlanco:1},
 'espada_curta:15':{dot:.30,peso:'imbuir'},
 'espada_curta:17':{cond:'atordoado'},
 // ---------- ESPADA LONGA ----------
 'espada_longa:1':{mov:2},
 'espada_longa:3':{peso:'imbuir'},
 'espada_longa:7':{bonus:{quando:'flanco',mult:1.2}},
 'espada_longa:8':{forma:'linha',alc:5,alvos:3},
 'espada_longa:9':{cond:'exposto|atordoado',alt:{K:1.2}},
 'espada_longa:15':{T:.90},
 'espada_longa:24':{forma:'arco180',alc:2.8,alvos:4},
 // ---------- DUAS ESPADAS ----------
 'duas_espadas:1':{K:.30,h:3,mov:4},
 'duas_espadas:3':{peso:'imbuir'},
 'duas_espadas:8':{bonus:{quando:'ritmo',mult:1.0},nota:'+10% por nível de Ritmo consumido (até 4 sem a chave)'},
 'duas_espadas:9':{K:.25,h:12,cond:'ritmo>=3'},
 'duas_espadas:15':{K:.35,h:4,forma:'volta',alc:2,alvos:99},
 'duas_espadas:16':{K:.30,h:10,forma:'volta',alc:2,alvos:99},
 'duas_espadas:17':{K:.60,h:2},
 // ---------- ESPADA E ESCUDO ----------
 'espada_e_escudo:2':{mov:4},
 'espada_e_escudo:3':{peso:'imbuir'},
 'espada_e_escudo:25':{forma:'proj',alc:12,alvos:3},
 // ---------- KATANA ----------
 'katana:2':{forma:'arco180',alc:2.8,alvos:99},
 'katana:3':{forma:'linha',alc:5,alvos:99,mov:5},
 'katana:7':{K:.50,h:5},
 'katana:8':{forma:'linha',alc:8,alvos:99,carga:2},
 'katana:9':{forma:'volta',alc:3,alvos:99,carga:1,T:2.4,nota:'exige saque carregado ≥ 1 s: 1 s de carga somado aos 1,4 s'},
 'katana:23':{forma:'proj',alc:10,peso:'disparo'},
 'katana:24':{mov:4,nota:'3 cargas; aqui conta só o ritmo sustentado (1 a cada 8 s)'},
 // ---------- DUAS KATANAS ----------
 'duas_katanas:2':{K:.40,h:3,forma:'volta',alc:2,alvos:99},
 'duas_katanas:3':{K:.70,h:2,peso:'imbuir'},
 'duas_katanas:17':{K:.60,h:4},
 'duas_katanas:23':{bonus:{quando:'exposto',mult:1.5}},
 'duas_katanas:24':{K:.30,h:8,forma:'volta',alc:3,alvos:99},
 'duas_katanas:25':{peso:'imbuir'},
 // ---------- MACHADO GRANDE ----------
 'machado_grande:2':{forma:'volta',alc:2.6,alvos:99},
 'machado_grande:3':{dot:.20,peso:'imbuir'},
 'machado_grande:7':{debuff:{armadura:40,dur:8}},
 'machado_grande:15':{forma:'area',alc:3,alvos:99,self:1},
 'machado_grande:16':{forma:'linha',alc:6,alvos:99,mov:6},
 'machado_grande:17':{forma:'area',alc:5,alvos:99,self:1,carga:2.5},
 // ---------- MACHADO PEQUENO ----------
 'machado_pequeno:1':{K:.60,h:1,forma:'proj',alc:12,alvos:2,nota:'dois machados em dois alvos; com 1 alvo, conta 1 acerto'},
 'machado_pequeno:3':{forma:'proj',alc:12,alvos:2,peso:'disparo'},
 'machado_pequeno:7':{forma:'proj',alc:12},
 'machado_pequeno:8':{K:.80,h:2,forma:'proj',alc:12},
 'machado_pequeno:9':{K:.50,h:1,forma:'proj',alc:12,alvos:6},
 'machado_pequeno:17':{bonus:{quando:'marca',mult:1.5}},
 // ---------- DOIS MACHADOS ----------
 'dois_machados:1':{K:.30,h:5,mov:3},
 'dois_machados:2':{forma:'area',alc:2.5,alvos:99,mov:5},
 'dois_machados:3':{K:.80,h:2,peso:'imbuir'},
 'dois_machados:7':{frenesi:2},
 'dois_machados:15':{K:.90,h:2,expoe:{se:'frenesi>=3',dur:3}},
 'dois_machados:16':{bonus:{quando:'vida<30',mult:1.5}},
 'dois_machados:17':{K:.35,h:8,forma:'volta',alc:2,alvos:99},
 'dois_machados:24':{K:.40,h:6,forma:'volta',alc:2,alvos:99},
 // ---------- ARCO ----------
 'arco:1':{forma:'linha',alc:30,alvos:99,peso:'arco'},
 'arco:2':{forma:'proj',alc:30,peso:'arco'},
 'arco:7':{forma:'proj',alc:30,peso:'arco'},
 'arco:8':{K:.60,h:1,forma:'arco180',alc:15,alvos:5,peso:'arco',nota:'5 flechas num cone de 30°: 1 por alvo (com 1 alvo perto, pode levar 2 — confirmar)'},
 'arco:9':{forma:'linha',alc:40,alvos:99,carga:2,peso:'disparo'},
 'arco:15':{forma:'proj',alc:20,peso:'arco'},'arco:16':{forma:'proj',alc:20,peso:'arco'},'arco:17':{forma:'proj',alc:20,peso:'arco'},
 'arco:23':{forma:'proj',alc:30,peso:'disparo'},
 'arco:25':{K:.30,h:8,forma:'area',alc:4,alvos:99,peso:'arco'},
 // ---------- ELEMENTOS ----------
 'fogo:1':{forma:'proj',alc:15},'gelo:1':{forma:'proj',alc:15},'raio:1':{forma:'proj',alc:15},'terra:1':{forma:'proj',alc:15},'vento:1':{forma:'proj',alc:15},'agua:1':{forma:'proj',alc:15},
 'fogo:2':{forma:'area',alc:3,alvos:99},'gelo:2':{forma:'area',alc:3,alvos:99},'raio:2':{forma:'area',alc:3,alvos:99},'terra:2':{forma:'area',alc:3,alvos:99},'vento:2':{forma:'area',alc:3,alvos:99},'agua:2':{forma:'area',alc:3,alvos:99},
 'fogo:7':{forma:'proj',alc:20,dot:.10},
 'fogo:8':{forma:'proj',alc:15,debuff:{fogoMais:.08,dur:8}},
 'fogo:13':{K:.25,h:1,tiq:6,forma:'zona',alc:3,alvos:99,dot:.20/6,nota:'6 tiques de K0,25 + Queimando de 20% do 1º tique'},
 'fogo:19':{forma:'area',alc:4,alvos:99,self:1},
 'gelo:7':{forma:'golpe',alc:2},
 'gelo:19':{forma:'proj',alc:15,bonusI:{quando:'gelo',I:30}},
 'raio:3':{forma:'proj',alc:15,alvos:3,T:.8},
 'raio:7':{forma:'proj',alc:10},
 'raio:13':{forma:'proj',alc:15,alvos:5,decai:.15,nota:'salta 4 vezes, −15% a cada salto'},
 'raio:14':{K:.30,h:1,tiq:4,forma:'zona',alc:2,alvos:99,nota:'K0,30 por segundo durante 4 s se o alvo ficar a 2 m da esfera'},
 'raio:19':{forma:'area',alc:2,alvos:99},
 'terra:14':{forma:'linha',alc:6,alvos:99},
 'terra:19':{forma:'area',alc:4,alvos:99,self:1},
 'vento:19':{K:.40,h:1,tiq:4,forma:'zona',alc:2,alvos:99,nota:'K0,40 por segundo durante 4 s'},
 'agua:19':{forma:'linha',alc:8,alvos:99}
};
module.exports=F;
