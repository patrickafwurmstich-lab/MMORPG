# Árvore de habilidades — 02. Armas (Espada e escudo, Katana, Duas katanas, Machado grande)
Formato e regras: `00-sistema.md` §4, §9 e §10. Cada árvore: 30 nós, 51 PH.

---

## ESPADA E ESCUDO — mecânica própria: Muralha
Ramos: **A. Contenção individual** (segurar 1 alvo) · **B. Proteção de grupo** · **C. Avanço e ruptura**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Golpe de escudo | Técnica | dom. 1 | K0,30 I40 · 0,7 s · 15R · rec. 8 s; interrompe preparo marcado. [Ruptura] |
| 02 | Investida de escudo | Técnica | dom. 10 | K0,50 I35 · 0,9 s · 20R · rec. 10 s; avança 4 m bloqueando de frente. [Contenção] |
| 03 | Lâmina sagrada | Técnica | dom. 10 | K1,10 I15 · 1,0 s · 20E · rec. 6 s; imbuir; aliados a 3 m ganham 5 Ímpeto (1 vez por aliado a cada 10 s). [Sustentação] |
| 04 | Braço de escudo | Passiva | 01 · dom. 1 | bloquear com o escudo nos primeiros 0,15 s do ataque (bloqueio "cedo") custa −20% de resistência; bloqueio tardio custa +10% |
| 05 | Peso do escudo | Passiva | 02 · dom. 10 | Golpe de escudo e Investida +5 de impacto; sua esquiva custa +3R enquanto o escudo está equipado |
| 06 | Postura de guarda | Passiva | 03 · dom. 20 | segurar o bloqueio por 1 s ativa a Muralha 0,3 s mais cedo (0,2 s em vez de 0,5 s); andar bloqueando fica 10% mais lento |

### Ramo A — Contenção individual
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Provocação | Técnica | 01 · dom. 20 | 0 dano · 0,5 s · 10R · rec. 20 s; Provocar do núcleo (110% da maior ameaça, 3 s). [Contenção] |
| 08 | Escudo refletor | Reação | 07 · dom. 40 | postura 0,4 s · 15R · rec. 12 s; devolve projétil de comum; de elite/chefe: bloqueia com custo 0. [Contenção] |
| 09 | Contra-escudo | Técnica | 08 · dom. 60 | K1,00 I40 · postura 0,4 s · 15R · rec. 12 s; bloqueio perfeito (últimos 0,15 s) devolve 100% do impacto ao atacante. [Contenção] |
| 10 | Olhar fixo | Passiva | 07 · dom. 20 | o alvo provocado causa −10% de dano aos outros jogadores por 3 s; Provocação custa +5R |
| 11 | Reflexo de muralha | Passiva | 08 · dom. 40 | Escudo refletor também devolve projéteis de elite com 50% do dano; recarga 12 → 15 s |
| 12 | Duelo de guarda | Passiva | 07 · dom. 30 | contra o alvo que você provocou, seu bloqueio custa −15%; contra outros alvos, +10% |
| 13 | Provocação em área | Transformação | 07 · dom. 40 | Provocação atinge até 4 comuns a 6 m (110% por 2 s em vez de 3 s); não funciona em elite/chefe |
| 14 | Inabalável | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | enquanto um alvo provocado por você estiver vivo, seu bloqueio não quebra por resistência zero (passa a gastar postura: 1 de postura por 2 de resistência que faltar); sua velocidade de ataque −10% |

### Ramo B — Proteção de grupo
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Fortaleza | Técnica | 03 · dom. 20 | 0 dano · 4 s mantida · 0R na entrada, 4R/s · rec. 25 s; Muralha 360° parado (não soma com outra Muralha: vale a maior). [Contenção] |
| 16 | Juramento | Técnica | 15 · dom. 40 | 0 dano · 0,6 s · 15R · rec. 30 s; por 8 s, 40% do dano direto que 1 aliado a 10 m recebe vem para você (antes da armadura dele). [Sustentação] |
| 17 | Barreira do grupo | Técnica | 16 · dom. 60 | 0 dano · 1,0 s · 20R · rec. 40 s; aliados a 5 m ganham +60 de postura por 5 s (não soma com Terra: vale a maior). [Sustentação] |
| 18 | Cone largo | Passiva | 15 · dom. 20 | o cone da Muralha passa de 60° para 90°; a redução cai de 30% para 22% |
| 19 | Elo de sangue | Passiva | 16 · dom. 40 | dano recebido pelo Juramento conta como "interceptado" para a ameaça (0,8×) e para o Leitor; o Juramento custa +10R |
| 20 | Guarda dos caídos | Passiva | 15 · dom. 30 | aliado caído a 3 m de você enquanto você bloqueia não pode ser finalizado por comuns; você não pode atacar enquanto protege |
| 21 | Juramento duplo | Transformação | 16 · dom. 40 | o Juramento liga 2 aliados (20% de cada) por 6 s |
| 22 | Bastião | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | enquanto Fortaleza estiver ativa, aliados dentro de 4 m recuperam postura como se não tivessem sido atingidos (regen sem os 2 s de espera); Fortaleza custa 8R/s |

### Ramo C — Avanço e ruptura
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Firmeza | Técnica | 02 · dom. 20 | 0 dano · 3 s · 0R · rec. 18 s; postura máxima +40% e movimento −50%. [Contenção] |
| 24 | Avanço do baluarte | Técnica | 23 · dom. 40 | K0,60 I40 · 1,2 s · 25R · rec. 14 s; arrasta comuns 6 m. [Ruptura] |
| 25 | Escudo arremessado | Técnica | 24 · dom. 60 | K0,60 I35 · 0,9 s · 18R · rec. 14 s; ricocheteia em até 3 alvos e volta em 1,5 s (sem bloqueio até voltar). [Ruptura] |
| 26 | Aríete | Passiva | 02 · dom. 20 | Investida de escudo derruba comuns por 1 s no fim; a investida para ao bater num elite (perde o resto do avanço) |
| 27 | Peso em movimento | Passiva | 24 · dom. 40 | cada comum arrastado pelo Avanço dá +5 de impacto no final (máx. +20); o Avanço custa +5R |
| 28 | Retorno firme | Passiva | 25 · dom. 60 | pegar o escudo de volta no ar (apertar bloqueio na hora) zera 4 s da recarga; perder o tempo deixa você 0,5 s sem bloqueio a mais |
| 29 | Escudo quebra-muro | Transformação | 25 · dom. 60 | Escudo arremessado acerta 1 alvo só, I35 → 55 e quebra guarda frontal por 2 s |
| 30 | Rolo compressor | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | durante Firmeza você pode usar Investida e Avanço sem perder a Firmeza (o −50% de movimento vale também nos avanços: 2 m e 3 m) |

---

## KATANA — mecânica própria: Bainha (saque), sem bloqueio
Ramos: **A. Saque preparado** · **B. Saque de resposta** · **C. Projeção elemental** (lâmina à distância e mobilidade).

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Iai rápido | Técnica | dom. 1 | K1,00 I15 · 0,5 s · 15R · rec. 6 s; saque sem carga. [Execução] |
| 02 | Lua crescente | Técnica | dom. 10 | K1,20 I25 · 1,0 s · 18R · rec. 9 s; arco de 180°. [Ruptura] |
| 03 | Passo do relâmpago | Técnica | dom. 10 | K0,90 I10 · 0,6 s · 20R · rec. 10 s; atravessa 5 m cortando tudo na linha. [Execução] |
| 04 | Mão na bainha | Passiva | 01 · dom. 1 | guardar a katana leva 0,3 s (era 0,4 s); com a katana guardada você corre 5% mais devagar |
| 05 | Corte limpo | Passiva | 02 · dom. 10 | saques e Iai contra alvo que **não** está te atacando +10% de dano; contra alvo te atacando −5% |
| 06 | Disciplina | Passiva | 03 · dom. 20 | esquiva perfeita com a katana guardada carrega 0,3 s do saque na hora; em troca, esquiva comum descarrega 0,3 s |

### Ramo A — Saque preparado
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Mil folhas | Técnica | 01 · dom. 20 | K0,50×5 I15 total · 1,2 s · 20R · rec. 12 s; cada corte reduz 0,2 s da carga do próximo saque. [Execução] |
| 08 | Saque do vazio | Técnica | 07 · dom. 40 | K2,40 I30 · carga 2 s · 25R · rec. 14 s; linha de 8 m. [Execução] |
| 09 | Corte da lua cheia | Técnica | 08 · dom. 60 | K1,80 I35 · 1,4 s · 28R · rec. 16 s; 360° a partir do saque carregado (exige carga ≥ 1 s). [Execução] |
| 10 | Carga paciente | Passiva | 07 · dom. 20 | saque carregado até 1,6 s (era 1,2 s) com K até 2,3; acima de 1,2 s você não pode esquivar sem perder a carga |
| 11 | Silêncio antes do golpe | Passiva | 08 · dom. 40 | enquanto carrega, comuns perdem 30% da sua ameaça; elites não; a carga é cancelada se você levar dano |
| 12 | Fio afiado | Passiva | 07 · dom. 30 | saque com carga máxima tem +10 pp de crítico; saques sem carga −10 pp |
| 13 | Vazio estreito | Transformação | 08 · dom. 40 | Saque do vazio vira estocada de 3 m, 1 alvo, K2,40 → 2,80, carga 2 → 1,5 s |
| 14 | Iaijutsu absoluto | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o saque carregado guarda a carga ao trocar de alvo e ao andar (a carga só some se você atacar outra coisa, esquivar ou levar dano); você não pode correr carregando |

### Ramo B — Saque de resposta
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Leitura | Técnica | 02 · dom. 20 | 0 dano · 1,0 s · 10R · rec. 12 s; por 1 s, o próximo parry tem janela +60 ms (teto 240). [Contenção] |
| 16 | Bainha espelhada | Técnica | 15 · dom. 40 | 0 dano · 0,6 s · 10R · rec. 16 s; o próximo saque de resposta reflete projétil. [Contenção] |
| 17 | Bainha de ferro | Técnica | 16 · dom. 60 | 0 dano · 4 s · 0R · rec. 25 s; carregando o saque, recebe 30% menos dano. [Sustentação] |
| 18 | Janela calma | Passiva | 15 · dom. 20 | o saque de resposta tem +20 ms extra de janela (teto 240) se você não atacou nos últimos 2 s; se atacou, −20 ms |
| 19 | Contra-saque | Passiva | 16 · dom. 40 | saque de resposta bem-sucedido dá +10 de impacto; falhar custa 10R |
| 20 | Respiração de aço | Passiva | 17 · dom. 60 | durante a Bainha de ferro, Firmar (VIG) adia +10% do impacto; a Bainha de ferro custa 3R/s |
| 21 | Leitura longa | Transformação | 15 · dom. 40 | Leitura dura 2 s com janela +40 ms (em vez de 1 s com +60) |
| 22 | Mente de água | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | 2 saques de resposta seguidos (em até 3 s) deixam o alvo Exposto 3 s; se o 2º falhar, você fica 0,6 s sem poder defender |

### Ramo C — Projeção elemental
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Lâmina projetada | Técnica | 03 · dom. 20 | K0,80 I12 · 0,8 s · 18E · rec. 7 s; disparo: lâmina do seu elemento a 10 m. [Execução] |
| 24 | Passo do vento | Técnica | 23 · dom. 40 | K0,80 I10 · 0,5 s · 15R · rec. 8 s; 3 cargas: avança 4 m cortando. [Execução] |
| 25 | Bainha sagrada | Técnica | 24 · dom. 60 | 0 dano · 0,8 s · 0R · rec. 16 s; enquanto a katana está guardada, regeneração de resistência ×2 por 6 s. [Sustentação] |
| 26 | Lâmina longa | Passiva | 23 · dom. 20 | Lâmina projetada alcança 14 m; dano −10% |
| 27 | Rastro elemental | Passiva | 24 · dom. 40 | cada carga do Passo do vento deixa o elemento no chão por 2 s (efeito secundário do elemento, 1 vez por alvo); custo +3R por carga |
| 28 | Pausa do guerreiro | Passiva | 25 · dom. 60 | Bainha sagrada também regenera 2E/s; nesse tempo você não ganha Ímpeto |
| 29 | Lâmina dupla | Transformação | 23 · dom. 40 | Lâmina projetada vira 2 lâminas em V (K0,50 cada) a 8 m |
| 30 | Espírito da lâmina | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o saque carregado também dispara uma Lâmina projetada na mesma linha (K0,40, sem custo extra de energia); o saque custa +5R |

---

## DUAS KATANAS — mecânica própria: Fio duplo, sem bloqueio
Ramos: **A. Contra-ataque duplo** · **B. Reposicionamento** · **C. Pressão em janelas**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Tesoura | Técnica | dom. 1 | K1,20 I20 · 0,8 s · 18R · rec. 7 s; dois cortes que se cruzam no mesmo ponto. [Execução] |
| 02 | Rodopio | Técnica | dom. 10 | K0,40×3 I15 total · 1,0 s · 18R · rec. 8 s; área 2 m. [Execução] |
| 03 | Fio elemental | Técnica | dom. 10 | K0,70×2 I12 · 0,9 s · 22E · rec. 6 s; imbuir alternado. [Execução] |
| 04 | Duas mentes | Passiva | 01 · dom. 1 | o contra-ataque duplo do parry pode ser dividido entre 2 alvos a 2 m; dividido, cada corte −15% |
| 05 | Pés de garça | Passiva | 02 · dom. 10 | a esquiva curta (2 m) passa a 2,4 m; i-frame 0,24 → 0,22 s |
| 06 | Lâminas sincronizadas | Passiva | 03 · dom. 20 | acertar os 2 cortes de uma técnica no mesmo alvo +5 de impacto; acertar só 1 corte, a técnica perde 10% |

### Ramo A — Contra-ataque duplo
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Espelho | Reação | 01 · dom. 20 | postura 0,4 s · 15R · rec. 10 s; parry (janela comum +30 ms, teto 240) que reflete 50% do impacto. [Contenção] |
| 08 | Fio do reflexo | Técnica | 07 · dom. 40 | 0 dano · 5 s · 0R · rec. 22 s; cada parry dá +10 Ímpeto extra (dentro do teto 45/s). [Sustentação] |
| 09 | Reflexo duplo | Técnica | 08 · dom. 60 | postura 0,3 s · 15R · rec. 12 s; parry que contra-ataca 2 alvos (K0,60 cada). [Contenção] |
| 10 | Corte de retorno | Passiva | 07 · dom. 20 | o contra-ataque duplo passa a K0,70 cada; o parry falho custa 20R (era 15) |
| 11 | Ritmo de duelo | Passiva | 08 · dom. 40 | 3 parries em 10 s deixam o próximo pesado com +20% de dano, mas esse pesado custa +5R; um golpe recebido zera a contagem |
| 12 | Olhos atentos | Passiva | 07 · dom. 30 | parries contra ataques de **comuns** recarregam o Espelho 2 s mais rápido; em troca, o Espelho custa +5R |
| 13 | Espelho partido | Transformação | 07 · dom. 40 | Espelho reflete 100% do impacto, mas a janela fica comum (sem os +30 ms) |
| 14 | Lâmina e reflexo | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | parry **técnico** (janela ≤ 240 ms) deixa uma Abertura de PER (2 s) **sem** precisar marcar Leitura, 1 vez a cada 10 s; essa Abertura **consome** a sua Leitura (vai para recarga, 12 s); com PER < +15 a Abertura vale só Punir |

### Ramo B — Reposicionamento
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Corte que segue | Técnica | 02 · dom. 20 | K0,90 I10 · 0,7 s · 15R · rec. 9 s; persegue alvo que fugiu até 6 m. [Execução] |
| 16 | Postura da garça | Técnica | 15 · dom. 40 | 0 dano · 2 s · 0R · rec. 18 s; esquivas sem custo por 2 s. [Sustentação] |
| 17 | Dança das garças | Técnica | 16 · dom. 60 | K0,60×4 I20 total · 1,4 s · 25R · rec. 14 s; termina atrás do alvo. [Execução] |
| 18 | Perseguição | Passiva | 15 · dom. 20 | Corte que segue alcança 8 m; o dano cai 10% para cada 2 m acima de 4 m |
| 19 | Voo baixo | Passiva | 16 · dom. 40 | durante a Postura da garça, cada esquiva deixa o próximo golpe com +5 de impacto (máx. +15); depois dela, a esquiva custa +5R por 3 s |
| 20 | Costas do inimigo | Passiva | 17 · dom. 60 | terminar a Dança das garças nas costas dá Flanco de espada curta (+20%) no 1º golpe seguinte; a Dança custa +5R |
| 21 | Garça ferida | Transformação | 16 · dom. 40 | Postura da garça dura 1 s, mas esquivas também dão +5 de Ímpeto cada (máx. 15) |
| 22 | Vento entre lâminas | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | toda esquiva perfeita reposiciona você 1 m para o lado do alvo (escolha esquerda/direita pela direção); esquivas comuns custam +3R |

### Ramo C — Pressão em janelas
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Corte em cruz | Técnica | 03 · dom. 20 | K1,60 I30 · 0,9 s · 22R · rec. 12 s; ×1,5 contra Exposto. [Execução] |
| 24 | Tempestade de pétalas | Técnica | 23 · dom. 40 | K0,30×8 I24 total · 1,6 s · 25R · rec. 16 s; área 3 m; cada parry nos últimos 4 s reduz 1 s da recarga. [Execução] |
| 25 | Fio do silêncio | Técnica | 24 · dom. 60 | K0,90 I25 · 0,7 s · 18E · rec. 14 s; silencia 2 s (categoria de controle no PvP). [Contenção] |
| 26 | Janela aberta | Passiva | 23 · dom. 20 | Corte em cruz contra alvo atordoado também ×1,5; contra alvo sem estado, −10% |
| 27 | Chuva constante | Passiva | 24 · dom. 40 | Tempestade de pétalas aplica −10% na regeneração de postura do alvo por 4 s; custa +5R |
| 28 | Lâmina calada | Passiva | 25 · dom. 60 | silêncio do Fio dura 2,5 s contra conjuradores; contra outros alvos, Fio do silêncio −20% de dano |
| 29 | Cruz rápida | Transformação | 23 · dom. 40 | Corte em cruz em 0,6 s com K1,30 (bônus contra Exposto ×1,4) |
| 30 | Tempestade sem fim | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | durante a janela de abertura de um chefe (exaustão, parte quebrada, encurralado), suas técnicas deste ramo recarregam 30% mais rápido; fora dela, −10% |

---

## MACHADO GRANDE — mecânica própria: Carga (pesado em 3 níveis)
Ramos: **A. Carga e partes** · **B. Área comprometida** · **C. Guarda e contra-impacto**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Golpe de cabo | Técnica | dom. 1 | K0,40 I30 · 0,6 s · 12R · rec. 8 s; rápido, interrompe preparo marcado. [Ruptura] |
| 02 | Giro pesado | Técnica | dom. 10 | K1,20 I35 · 1,4 s · 22R · rec. 9 s; 360°, sem stagger comum. [Execução] |
| 03 | Lâmina flamejante | Técnica | dom. 10 | K1,60 I30 · 1,6 s · 30E · rec. 8 s; imbuir carregável (aplica o estado Queimando). [Execução] |
| 04 | Peso morto | Passiva | 01 · dom. 1 | o pesado nível 1 sai 0,1 s mais cedo; o nível 3 leva +0,1 s |
| 05 | Pegada dupla | Passiva | 02 · dom. 10 | bloqueio com machado grande custa −10% (além dos +30% de eficiência da arma); sua corrida custa +10% de resistência |
| 06 | Chão rachado | Passiva | 03 · dom. 20 | pesado nível 3 deixa o chão rachado 2 m por 3 s (inimigos −20% de movimento); você também anda 20% mais devagar sobre ele |

### Ramo A — Carga e partes
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Rachar armadura | Técnica | 01 · dom. 20 | K0,90 I20 · 1,1 s · 18R · rec. 12 s; −40·s de armadura no alvo 8 s (não soma com Fogo: vale a maior). [Sustentação] |
| 08 | Pegada de gigante | Técnica | 07 · dom. 40 | K0,80 I50 · 1,0 s · 25R · rec. 14 s; dano em parte quebrável conta 2×. [Ruptura] |
| 09 | Força da terra | Técnica | 08 · dom. 60 | 0 dano · 1,0 s · 0R · rec. 30 s; o próximo pesado vira carga nível 3 instantânea. [Execução] |
| 10 | Carga rápida | Passiva | 07 · dom. 20 | níveis de carga em 0,4/0,8/1,2 s (eram 0,5/1,0/1,5); K do nível 3 cai de 3,0 para 2,7 |
| 11 | Cirurgião de pedra | Passiva | 08 · dom. 40 | a interface mostra quanto falta para quebrar cada parte; seu dano em partes **não** quebráveis −10% |
| 12 | Machado na fenda | Passiva | 07 · dom. 30 | Rachar armadura também reduz a regeneração de postura do alvo em 20%; a redução de armadura cai para −30·s |
| 13 | Carga contida | Transformação | 08 · dom. 40 | Pegada de gigante pode ser carregada (1 nível: +0,5 s, I50 → 70) |
| 14 | Quebra-montanhas | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | quebrar uma parte devolve **um nível de carga instantâneo** ao seu próximo pesado (1 vez por parte); fora de chefes com partes, Força da terra recarrega em 40 s |

### Ramo B — Área comprometida
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Terremoto | Técnica | 02 · dom. 20 | K1,40 I45 · 1,6 s · 25R · rec. 10 s; área 3 m, derruba comuns. [Ruptura] |
| 16 | Avalanche | Técnica | 15 · dom. 40 | K1,60 I55 · 1,8 s · 30R · rec. 16 s; avança 6 m derrubando comuns. [Ruptura] |
| 17 | Cataclismo | Técnica | 16 · dom. 60 | K2,80 I70 · carga 2,5 s · 35R · rec. 20 s; área 5 m, só com carga nível 3. [Ruptura] |
| 18 | Ondas de choque | Passiva | 15 · dom. 20 | Terremoto alcança 4 m; inimigos a mais de 3 m perdem metade do dano |
| 19 | Impulso | Passiva | 16 · dom. 40 | a Avalanche pode ser parada mais cedo (a qualquer ponto) com o golpe final; parar antes de 3 m tira 30% do dano |
| 20 | Fim do mundo | Passiva | 17 · dom. 60 | Cataclismo deixa o chão rachado de Chão rachado (06) em 5 m; recarga 20 → 24 s |
| 21 | Terremoto em linha | Transformação | 15 · dom. 40 | Terremoto vira linha de 6 m × 1,5 m |
| 22 | Senhor da terra | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | técnicas de área deste ramo não sofrem stagger comum durante o preparo **e** a execução; custam +10% de resistência |

### Ramo C — Guarda e contra-impacto
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Desafiar | Técnica | 03 · dom. 20 | 0 dano · 0,8 s · 10R · rec. 20 s; atrai até 5 inimigos comuns a 8 m. [Contenção] |
| 24 | Rugido | Técnica | 23 · dom. 40 | 0 dano · 0,8 s · 10R · rec. 25 s; comuns a 6 m ficam Lentos 3 s. [Contenção] |
| 25 | Muro de ferro | Reação | 24 · dom. 60 | 0 dano · 2 s · 15R · rec. 20 s; machado plantado: bloqueio 360° (custo ×1,3). [Contenção] |
| 26 | Peito aberto | Passiva | 23 · dom. 20 | depois de Desafiar, você recebe −10% de dano de comuns por 5 s; elites causam +10% |
| 27 | Eco do rugido | Passiva | 24 · dom. 40 | o Rugido também tira 10 de postura dos comuns; custa +5R |
| 28 | Contra-impacto | Passiva | 25 · dom. 60 | bloquear com o Muro de ferro guarda 30% do impacto recebido (máx. 20) para o próximo pesado em 3 s; esse pesado perde 10% de dano |
| 29 | Muro avançado | Transformação | 25 · dom. 60 | Muro de ferro só frontal (180°), mas você pode andar a 30% |
| 30 | Montanha viva | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | seu pesado nível 2+ não é interrompido por ataques de **elite** (chefes ainda interrompem); você recebe +10% de dano enquanto carrega |
