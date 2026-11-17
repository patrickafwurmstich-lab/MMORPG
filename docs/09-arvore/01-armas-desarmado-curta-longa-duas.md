# Árvore de habilidades — 01. Armas (Desarmado, Espada curta, Espada longa, Duas espadas)
Formato e regras: `00-sistema.md` §4, §9 e §10. Cada árvore: 30 nós, 51 PH. Mecânicas próprias das armas: parte 2 K.2 e parte 3 AV.

---

## DESARMADO — mecânica própria: Fluxo + Agarrão
Ramos: **A. Fluxo e direções** (combo em direções diferentes) · **B. Agarrão e arremesso** (controle de comuns e partes) · **C. Contra-ataque e condução elemental** (resposta e magia nas mãos).

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Investida de ombro | Técnica | dom. 1 | K0,60 I30 · 0,70 s · 15R · rec. 7 s; avança 3 m e empurra comuns 1 m. [Ruptura] |
| 02 | Rasteira | Técnica | dom. 10 | K0,40 I25 · 0,60 s · 12R · rec. 9 s; derruba comum 1,2 s; contra elite só −20% de postura. [Ruptura] |
| 03 | Palma elemental | Técnica | dom. 10 | K1,00 I18 · 0,80 s · 18E · rec. 5 s; imbuir (FOR 0,5/DES 0,1/POT 0,4); empurra 2 m. [Execução] |
| 04 | Postura aberta | Passiva | 01 · dom. 1 | mãos livres: conjurações 15% mais rápidas no preparo (regra da arma); em troca o bloqueio desarmado custa +10% de resistência |
| 05 | Golpe de base | Passiva | 02 · dom. 10 | o 1º leve depois de uma esquiva tem +6 de impacto; os outros leves da sequência −5% de dano |
| 06 | Ritmo de respiração | Passiva | 03 · dom. 20 | 2 s sem receber golpe: Fluxo não cai por pausa (em vez de zerar após 3 s); recebendo golpe, perde 2 níveis de Fluxo em vez de 1 |

### Ramo A — Fluxo e direções
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Respiração de fluxo | Técnica | 01 · dom. 20 | 0 dano · 1,0 s · 0R · rec. 16 s; recupera 30R e **mantém** o Fluxo. [Sustentação] |
| 08 | Mil palmas | Técnica | 07 · dom. 40 | K0,25×8 I40 total · 1,4 s · 25R · rec. 14 s; trava o comum durante a sequência; cada palma em direção diferente soma 1 Fluxo (máx. +3). [Execução] |
| 09 | Tornado de punhos | Técnica | 08 · dom. 60 | K0,30×6 I36 total · 1,3 s · 25R · rec. 14 s; gira puxando comuns 1,5 m; com Fluxo 5, +1 giro (K0,30). [Ruptura] |
| 10 | Quatro ventos | Passiva | 07 · dom. 20 | Fluxo conta também "trás" como direção (5 direções); cada nível vale +5% de impacto em vez de +6% |
| 11 | Fluxo pesado | Passiva | 08 · dom. 40 | Fluxo 5 transforma o próximo pesado em K1,40 I35 e zera o Fluxo; pesados com Fluxo < 5 −10% de dano |
| 12 | Passos de dança | Passiva | 07 · dom. 30 | a cada 2 níveis de Fluxo, sua esquiva custa −3R (até −6R); levar golpe com Fluxo ≥ 3 custa 5R extra |
| 13 | Palmas cruzadas | Transformação | 08 · dom. 40 | Mil palmas vira 4 palmas K0,45 I40 total em 0,9 s (mais rápido, sem trava do comum); custo 20R |
| 14 | Mestre do fluxo | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o Fluxo **não zera** ao repetir direção: cai 2 níveis; Fluxo máximo 6 (+6% por nível); levar um golpe ainda zera |

### Ramo B — Agarrão e arremesso
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Arremesso de grupo | Técnica | 02 · dom. 20 | K0,50 I35 · 1,1 s · 20R · rec. 14 s; agarrão que derruba até 3 comuns em volta (1 m). [Ruptura] |
| 16 | Quebra-ossos | Técnica | 15 · dom. 40 | K0,90 I45 · 1,0 s · 20R · rec. 12 s; agarrão em elite com postura < 30% (fora disso: empurrão K0,40). [Ruptura] |
| 17 | Arremesso do gigante | Técnica | 16 · dom. 60 | K1,20 I60 · 1,6 s · 30R · rec. 20 s; agarra elite com postura < 20% e arremessa contra outro inimigo: os dois levam o dano e 50% do impacto. [Ruptura] |
| 18 | Pegada firme | Passiva | 15 · dom. 20 | Agarrão normal funciona com postura < 60% (era 50%); o arremesso alcança 3 m em vez de 4 m |
| 19 | Projétil vivo | Passiva | 15 · dom. 30 | inimigo arremessado causa a quem atingir 100% do impacto do arremesso (era 50%); o arremesso custa +5R |
| 20 | Chave de braço | Passiva | 16 · dom. 40 | segurar o botão no agarrão mantém o alvo preso até 1,5 s (ele leva +20% de dano de aliados); você fica imóvel e sem defesa nesse tempo |
| 21 | Suplex | Transformação | 16 · dom. 40 | Quebra-ossos não arremessa: derruba o alvo no lugar por 2,5 s (abertura para o grupo); impacto 45 → 30 |
| 22 | Lutador de chão | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | agarrões funcionam em **colossos e dracônicos** nas partes quebráveis (puxa a parte: +50% de impacto na parte); contra comuns, agarrões −20% de dano |

### Ramo C — Contra-ataque e condução elemental
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Contra-golpe | Reação | 03 · dom. 20 | K0,90 I20 · postura 0,5 s · 10R · rec. 8 s; se atingido durante a postura recebe 50% do dano e devolve o golpe (não é parry). [Execução] |
| 24 | Corpo de ferro | Técnica | 23 · dom. 40 | 0 dano · 1,5 s · 0R · rec. 20 s; 1,5 s sem stagger comum; +1 Fluxo por golpe recebido. [Sustentação] |
| 25 | Palma que sela | Técnica | 24 · dom. 60 | K0,80 I35 · 0,8 s · 18E · rec. 16 s; sela morto-vivo e silencia elemental 2 s (silêncio conta na categoria de controle no PvP). [Contenção] |
| 26 | Mãos condutoras | Passiva | 03 · dom. 20 | Palma elemental aplica o elemento também no 1º leve seguinte; a Palma custa +4E |
| 27 | Pele de pedra | Passiva | 23 · dom. 30 | Contra-golpe reduz o dano recebido para 40% (era 50%); a recarga sobe para 10 s |
| 28 | Respiração interna | Passiva | 24 · dom. 40 | durante Corpo de ferro, Firmar (VIG) não custa resistência; ao fim, a dívida de postura +20% |
| 29 | Palma em cadeia | Transformação | 03 · dom. 40 | Palma elemental salta para 1 alvo extra a 3 m com 60% do dano; não empurra |
| 30 | Punho do espelho | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Contra-golpe vira parry (janela **técnica** de parry do núcleo, teto 240 ms; com PER ≥ +15 usa a recarga da sua Leitura; sem PER, recarga interna +50%): sucesso devolve o golpe com +10 de impacto e 0% de dano recebido; falha = você leva 100% e 0,35 s de recuperação |

---

## ESPADA CURTA — mecânica própria: Flanco
Ramos: **A. Flanco móvel** · **B. Debilitação** (veneno, lentidão, abrir defesas) · **C. Aparar e escapar**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Passo de sombra | Técnica | dom. 1 | K0,70 I10 · 0,60 s · 15R · rec. 7 s; teleporta 3 m para as costas do alvo (chefe: 1,5 m lateral). [Execução] |
| 02 | Corte baixo | Técnica | dom. 10 | K0,60 I15 · 0,60 s · 10R · rec. 6 s; alvo com movimento −30% por 3 s (conta como Lento). [Contenção] |
| 03 | Distração | Técnica | dom. 10 | 0 dano · 0,4 s · 10R · rec. 14 s; joga 50% da sua ameaça para o aliado mais próximo. [Sustentação] |
| 04 | Lâmina leve | Passiva | 01 · dom. 1 | o passo lateral depois de cada leve (1,2 m) pode ser para trás; para trás não dá Flanco no golpe seguinte |
| 05 | Olhar periférico | Passiva | 02 · dom. 10 | a interface mostra o cone frontal de 120° dos inimigos marcados; seu Flanco dá +25% (era +30%) |
| 06 | Mão rápida | Passiva | 03 · dom. 20 | trocar para a espada curta leva 0,4 s (era 0,6 s); em troca, voltar para a arma do outro conjunto leva 0,8 s |

### Ramo A — Flanco móvel
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Estocada furtiva | Técnica | 01 · dom. 20 | K1,30 I10 · 0,80 s · 15R · rec. 8 s; +50% se o alvo não está te mirando. [Execução] |
| 08 | Cem cortes | Técnica | 07 · dom. 40 | K0,40×4 I20 total · 1,0 s · 20R · rec. 10 s; só pelo flanco. [Execução] |
| 09 | Lâminas gêmeas | Técnica | 08 · dom. 60 | K0,50×2 I15 · 0,70 s · 12R · rec. 8 s; o 2º corte só sai se o 1º foi no flanco. [Execução] |
| 10 | Rodear | Passiva | 07 · dom. 20 | correr em arco em volta de um alvo a até 4 m não gasta resistência por 1 s; o 1º golpe depois disso não pode ser crítico |
| 11 | Sombra persistente | Passiva | 01 · dom. 30 | Passo de sombra deixa você 0,5 s fora da mira de comuns (não de elites/chefes); recarga 7 → 9 s |
| 12 | Costas expostas | Passiva | 08 · dom. 40 | acertar 3 golpes de flanco seguidos deixa o alvo Exposto 2 s (+20% de dano recebido); a cada golpe de frente o contador volta a 0 |
| 13 | Passo duplo | Transformação | 01 · dom. 40 | Passo de sombra guarda 2 usos (recarga 10 s cada), mas cada passo alcança só 2 m |
| 14 | Assassino de sombra | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | golpes de flanco contra alvo que está **atacando outro jogador** têm crítico garantido (×1,30 fixo; não soma dano crítico de equipamento); golpes de frente −10% de dano |

### Ramo B — Debilitação
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Lâmina venenosa | Técnica | 02 · dom. 20 | K0,80 I8 · 0,70 s · 15E · rec. 6 s; imbuir; veneno: 30% do dano do golpe em 6 s. [Execução] |
| 16 | Corte dos tendões | Técnica | 15 · dom. 40 | K0,70 I20 · 0,80 s · 18R · rec. 14 s; alvo Lento 40% por 4 s e não corre. [Contenção] |
| 17 | Golpe de misericórdia | Técnica | 16 · dom. 60 | K2,00 I0 · 0,90 s · 20R · rec. 18 s; só em alvo atordoado ou derrubado. [Execução] |
| 18 | Veneno espesso | Passiva | 15 · dom. 20 | veneno dura 9 s com o mesmo total (mais lento, mais difícil de limpar: Tônico limpo remove só metade); 1º tique só após 2 s |
| 19 | Sangria | Passiva | 16 · dom. 40 | alvo Lento recebe +8% de dano das suas técnicas; seus leves contra alvo **sem** estado −5% |
| 20 | Toxina paralisante | Passiva | 15 · dom. 30 | veneno + Lento no mesmo alvo: a recuperação das ações dele +10% (não acumula com Gelo); seu veneno causa −20% de dano |
| 21 | Frasco quebrado | Transformação | 15 · dom. 40 | Lâmina venenosa vira área de 2 m: veneno com 15% do dano em cada alvo; custo 20E |
| 22 | Mestre das toxinas | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Golpe de misericórdia pode iniciar contra alvo com **2 estados seus** (veneno + Lento) em vez de atordoado; aí causa K1,60 |

### Ramo C — Aparar e escapar
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Corte de aparar | Reação | 03 · dom. 20 | K0,50 I25 · postura 0,30 s · 12R · rec. 9 s; parry de janela comum que já sai cortando. [Contenção] |
| 24 | Véu | Técnica | 23 · dom. 40 | 0 dano · 3 s · 15R · rec. 25 s; comuns perdem você de vista até você atacar (não chefe/PvP). [Contenção] |
| 25 | Fuga das sombras | Técnica | 24 · dom. 60 | 0 dano · 0,4 s · 10R · rec. 16 s; salta 5 m para trás e zera sua ameaça com o alvo por 3 s. [Sustentação] |
| 26 | Aparo limpo | Passiva | 23 · dom. 20 | Corte de aparar bem-sucedido dá +10 Ímpeto (parry normal dá 20; total 30, dentro do teto 45/s); falhar custa +10R |
| 27 | Esquiva rasante | Passiva | 01 · dom. 30 | esquiva curta de 2 m com i-frame 0,26 s, −20% de custo; perde 0,04 s de invulnerabilidade |
| 28 | Pano de fumaça | Passiva | 25 · dom. 60 | Fuga das sombras deixa fumaça 3 m por 3 s (projéteis −50% de acerto dentro dela, também os seus) |
| 29 | Aparo em cadeia | Transformação | 23 · dom. 40 | Corte de aparar guarda 2 usos (recarga 12 s cada); o corte do sucesso cai para K0,35 |
| 30 | Dançarino de lâmina | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | depois de um Corte de aparar bem-sucedido, o próximo Passo de sombra em 2 s não tem recarga; cada Passo assim custa +10R |

---

## ESPADA LONGA — mecânica própria: Guarda alta / baixa
(Árvore escrita pelo ChatGPT no planejamento do loop 3 e consolidada.) Ramos: **A. Fenda** (alcance e ruptura) · **B. Passagem** (transição de guardas) · **C. Vigília** (cobertura e controle de espaço).

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Corte de avanço | Técnica | dom. 1 | K0,80 I12 · 0,80 s · 12R · rec. 5 s; avança até 2 m. [Execução] |
| 02 | Interceptação | Técnica | dom. 10 | K0,55 I30 · 0,75 s · 15R · rec. 9 s; interrompe preparo marcado. [Ruptura] |
| 03 | Lâmina imbuída | Técnica | dom. 10 | K1,20 I18 · 1,05 s · 20E · rec. 5 s; aplica o elemento 1 vez (FOR 0,5/DES 0,1/POT 0,4). [Execução] |
| 04 | Passo medido | Passiva | 01 · dom. 1 | Corte de avanço pode parar até 1 m antes do alcance escolhido; ao encurtar, I 12 → 8 |
| 05 | Mãos separadas | Passiva | 01 · dom. 10 | usar a espada longa com duas mãos: +8% de impacto, mas as técnicas custam +8% de resistência; com uma mão, nada |
| 06 | Transição consciente | Passiva | 02 · dom. 20 | depois de trocar de guarda, o 1º acerto em 1,5 s restaura 3R; recarga interna 6 s; não funciona em continuações |

### Ramo A — Fenda
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Corte de flanco | Técnica | 01 · dom. 20 | K1,00 I15 · 0,85 s · 15R · rec. 6 s; +20% no flanco, −20% contra frente protegida. [Execução] |
| 08 | Corte que fende | Técnica | 07 · dom. 40 | K1,80 I30 · 1,40 s · 25R · rec. 12 s; guarda alta; linha de 5 m × 0,8 m; máx. 3 alvos. [Execução] |
| 09 | Juízo | Técnica | 08 · dom. 60 | K2,20 I40 · 1,50 s · 30R · rec. 20 s; só inicia contra alvo Exposto ou atordoado; se o estado acabar no preparo, causa K1,20. [Execução] |
| 10 | Ponta de ruptura | Passiva | 02 · dom. 20 | Interceptação +8 de impacto contra alvo com postura ≤ 30%; −10% de dano |
| 11 | Medida longa | Passiva | 07 · dom. 30 | guarda alta +0,3 m de alcance adicional; preparo dos ataques corpo a corpo +0,08 s |
| 12 | Ferida estrutural | Passiva | 08 · dom. 40 | Corte que fende +20% de impacto em partes quebráveis; −10% de dano em todos os alvos |
| 13 | Fenda concentrada | Transformação | 08 · dom. 40 | Corte que fende: 5 → 3 m, 1 alvo, I30 → 42, K1,80 → 1,55, 25 → 28R; mesmo tempo e recarga |
| 14 | Carrasco da abertura | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Juízo pode iniciar durante a abertura de uma parte quebrada; Juízo +15% contra alvo atordoado/parte aberta; contra os demais alvos, a recarga do Juízo +5 s |

### Ramo B — Passagem
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Guarda de passagem | Técnica | 01 · dom. 20 | K0,35 I15 · 0,90 s · 15R · rec. 8 s; bloqueio frontal nos 0,35 s da execução + passo lateral 1,5 m. [Contenção] |
| 16 | Troca de guarda | Técnica | 15 · dom. 40 | K0,70 I20 · 0,50 s · 10R · rec. 8 s; termina na guarda oposta (a troca só acontece se a execução terminar). [Contenção] |
| 17 | Contra perfeito | Reação | 15 · dom. 40 | 15R · rec. 10 s; postura defensiva de 0,25 s com janela de parry válida; sucesso → corte K1,20 I25 em 0,60 s. [Contenção] |
| 18 | Base móvel | Passiva | 15 · dom. 20 | Guarda de passagem +0,5 m de passo; bloqueio custa +15% de resistência |
| 19 | Resposta curta | Passiva | 17 · dom. 40 | o corte do Contra perfeito leva 0,45 s em vez de 0,60 s; K1,20 → 1,00 |
| 20 | Fôlego de passagem | Passiva | 16 · dom. 40 | acertar Troca de guarda até 2 s depois de um bloqueio eficaz restaura 6R; recarga interna 10 s |
| 21 | Passagem recuada | Transformação | 15 · dom. 40 | Guarda de passagem recua até 2 m em vez do passo lateral; perde o corte e o impacto; custo 15 → 10R |
| 22 | Duelista de transição | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | após um parry bem-sucedido, a Troca de guarda pode **substituir** o corte do Contra perfeito (K1,00 I20, custo 8R, sem recarga própria nesse uso) — uma ação no lugar da outra, nunca as duas |

### Ramo C — Vigília
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Cobertura | Técnica | 02 · dom. 20 | 15R · ativação 0,50 s · rec. 12 s; por 2 s intercepta o próximo ataque direto contra aliado a até 2 m. [Sustentação] |
| 24 | Corte em meia-lua | Técnica | 23 · dom. 40 | K1,30 I30 · 1,10 s · 20R · rec. 10 s; guarda baixa; arco frontal de 180°; máx. 4 alvos. [Ruptura] |
| 25 | Postura da montanha | Técnica | 23 · dom. 40 | entrada 0,40 s; até 3 s mantida; rec. 22 s; 10R na entrada + 6R/s; guarda alta imóvel; aliados atrás num cone de 90° recebem −20% de dano frontal (não soma com Muralha: vale a maior). [Sustentação] |
| 26 | Vigia próximo | Passiva | 23 · dom. 20 | Cobertura alcança 3 m em vez de 2 m; recarga 12 → 16 s |
| 27 | Varredura contida | Passiva | 24 · dom. 40 | Meia-lua pode ser de 120° (escolha antes da execução): custa 16R e atinge no máx. 2 alvos |
| 28 | Fundação | Passiva | 25 · dom. 40 | Firmar (VIG) durante a Postura da montanha adia +5 de impacto antes do limite da dívida; entrada da Postura 10 → 14R |
| 29 | Cobertura assentada | Transformação | 23 · dom. 40 | em vez de interceptar, protege o aliado escolhido por 2 s: −20% contra o próximo ataque direto; precisa de linha de visão |
| 30 | Sentinela de passagem | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Postura da montanha anda a 25% da velocidade; o cone continua atrás de você; custo mantido; a duração máxima cai para 2,5 s |

---

## DUAS ESPADAS — mecânica própria: Ritmo (sem bloqueio)
Ramos: **A. Ritmo preciso** · **B. Área em movimento** · **C. Defesa contra projéteis**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Dança de lâminas | Técnica | dom. 1 | K0,30×3 I12 total · 1,0 s · 15R · rec. 7 s; move-se 4 m cortando. [Execução] |
| 02 | Cruz ascendente | Técnica | dom. 10 | K0,90 I30 · 0,9 s · 18R · rec. 8 s; joga comum para o alto 1 s. [Ruptura] |
| 03 | Gume duplo elemental | Técnica | dom. 10 | K1,10 I16 · 0,9 s · 22E · rec. 6 s; cada mão 1 impacto; elemento 1×. [Execução] |
| 04 | Ambidestria | Passiva | 01 · dom. 1 | o Ritmo também conta golpes alternados de técnicas (não só leves); técnicas que alternam perdem 5% de dano |
| 05 | Pulso marcado | Passiva | 02 · dom. 10 | a interface mostra o próximo lado do Ritmo; errar o lado custa 1 nível (em vez de zerar) mas o corte cruzado precisa de 5 alternados (era 4) |
| 06 | Lâminas leves | Passiva | 03 · dom. 20 | leves das duas espadas custam −2R na esquiva seguinte (até 2 vezes por sequência); o pesado custa +4R |

### Ramo A — Ritmo preciso
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Ritmo sustentado | Técnica | 01 · dom. 20 | 0 dano · 0,3 s · 10R · rec. 20 s; por 6 s levar golpe não zera o Ritmo. [Sustentação] |
| 08 | Lâminas em X | Técnica | 07 · dom. 40 | K1,40 I35 · 1,0 s · 20R · rec. 10 s; consome o Ritmo: +10% de dano por nível consumido. [Execução] |
| 09 | Chuva de cortes | Técnica | 08 · dom. 60 | K0,25×12 I30 total · 2,4 s · 35R · rec. 20 s; exige Ritmo ≥ 3. [Execução] |
| 10 | Compasso | Passiva | 07 · dom. 20 | corte cruzado também aplica +10 de impacto se o alvo estava atacando; o corte cruzado custa 3R |
| 11 | Contratempo da lâmina | Passiva | 08 · dom. 40 | Lâminas em X pode consumir só metade do Ritmo (metade do bônus); a recarga cai para 7 s se consumir tudo |
| 12 | Batida perfeita | Passiva | 07 · dom. 30 | esquiva perfeita soma 1 nível de Ritmo; esquiva comum durante o Ritmo tira 1 nível |
| 13 | Infinito | Transformação | 07 · dom. 40 | Ritmo sustentado vira "corte cruzado a cada 3 alternados por 6 s" (a antiga avançada Ritmo infinito); perde a proteção contra golpes |
| 14 | Maestro de aço | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Ritmo máximo 8 níveis; Lâminas em X com 8 níveis vira 2 cortes (+10% por nível em cada, impacto total 45); com menos de 4 níveis, Lâminas em X −20% |

### Ramo B — Área em movimento
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Tempestade | Técnica | 01 · dom. 20 | K0,35×4 I20 total · 1,2 s · 20R · rec. 9 s; 4 cortes em círculo de 2 m. [Execução] |
| 16 | Ciclone | Técnica | 15 · dom. 40 | K0,30×10 I30 total · 2,0 s · 30R · rec. 16 s; anda devagar girando. [Execução] |
| 17 | Passo cruzado | Técnica | 16 · dom. 60 | K0,60×2 I15 · 0,7 s · 15R · rec. 9 s; atravessa o alvo cortando dos dois lados. [Execução] |
| 18 | Giro largo | Passiva | 15 · dom. 20 | Tempestade alcança 2,6 m; cada corte −10% de dano |
| 19 | Olho do furacão | Passiva | 16 · dom. 40 | durante o Ciclone, projéteis de comuns são desviados; o Ciclone custa +5R e você não pode cancelar por esquiva nos primeiros 0,8 s |
| 20 | Rastro cortante | Passiva | 17 · dom. 60 | Passo cruzado deixa um rastro de 3 m que causa K0,20 a quem passar por 2 s (1 vez por alvo); custo +5R |
| 21 | Ciclone curto | Transformação | 16 · dom. 40 | Ciclone dura 1,0 s com 5 giros (K0,40×5), sem andar; recarga 10 s |
| 22 | Redemoinho de aço | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | técnicas de área deste ramo mantêm o Ritmo (cada giro alterna o lado); dano de área contra alvo único −15% |

### Ramo C — Defesa contra projéteis
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Defesa giratória | Reação | 02 · dom. 20 | 0 dano · 0,8 s · 15R · rec. 12 s; desvia projéteis frontais por 0,8 s. [Contenção] |
| 24 | Espelho de aço | Técnica | 23 · dom. 40 | postura 0,5 s · 15R · rec. 14 s; devolve projétil com cada lâmina (2 projéteis com 50% do dano original cada). [Contenção] |
| 25 | Escudo de lâminas | Técnica | 24 · dom. 60 | 0 dano · 2 s mantido · 8R/s · rec. 18 s; aliados a 2 m atrás de você: projéteis frontais −40%; você anda a 50%. [Sustentação] |
| 26 | Olho no arqueiro | Passiva | 23 · dom. 20 | projétil desviado por você dá +5 Ímpeto (1 vez a cada 2 s); Defesa giratória custa +5R |
| 27 | Devolução certeira | Passiva | 24 · dom. 40 | projéteis devolvidos miram o atirador (não seguem reto); o dano devolvido cai para 40% cada |
| 28 | Lâminas em cruz | Passiva | 25 · dom. 60 | Escudo de lâminas também desvia ataques de área frontal de comuns (−20%); custo 8 → 10R/s |
| 29 | Giro defensivo | Transformação | 23 · dom. 40 | Defesa giratória protege 360° mas por 0,5 s |
| 30 | Muralha de aço | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | as duas espadas ganham **bloqueio só contra projéteis** (custo normal de bloqueio −25%); bloqueio contra corpo a corpo continua impossível |
