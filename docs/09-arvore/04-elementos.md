# Árvore de habilidades — 04. Elementos (Fogo, Gelo, Raio, Terra, Vento, Água)
Cada personagem acessa **só a árvore do seu elemento** (a Arte Maré troca o elemento aplicado, mas não abre outra árvore). Domínio do elemento: tempo de combate válido usando técnicas do elemento (mesma taxa do domínio de arma).
Estrutura de cada árvore (24 nós, 41 PH): **tronco** 01–06 (as 3 conjurações públicas + 3 passivas) · **ramo A** 07–12 · **ramo B** 13–18 (2 técnicas, 2 passivas, 1 transformação, 1 chave) · **ramo C** 19–24 (1 técnica, 3 passivas, 1 transformação, 1 chave).
Pesos de dano: conjuração POT 0,6 / CON 0,4 (núcleo A.1). Todas as técnicas daqui aceitam **Modelagem** (CON) e **Sobrecarga** (POT), salvo indicação. Limites do núcleo D.3 continuam (não acumula entre jogadores, chefes só em ataques compatíveis etc.).

---

## FOGO — efeito do elemento: −30·s de armadura no alvo, 6 s
Ramos: **A. Pressão e abrasão** · **B. Zonas de perigo** · **C. Explosão concentrada**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de fogo | Técnica | dom. 1 | K1,40 I10 · 1,0 s · 20E · rec. 3 s; 15 m. [Execução] |
| 02 | Área de fogo | Técnica | dom. 10 | K1,60 I15 · 1,6 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Muralha de chamas | Técnica | dom. 10 | 0 dano direto · 25E · rec. 14 s · 5 s; linha de 4 m que corta passagem; quem atravessa perde 6% da vida por segundo (chefe atravessa sem dano; PvP 3%/s). [Contenção] |
| 04 | Calor guardado | Passiva | 01 · dom. 1 | o −30·s de armadura do Fogo dura 8 s; só pode ser reaplicado por você depois de 4 s |
| 05 | Fagulha | Passiva | 02 · dom. 10 | a Área de fogo aplica Queimando (dano contínuo de 20% em 6 s) em quem ficar no centro 1 m; o raio total cai para 2,6 m |
| 06 | Pele de brasa | Passiva | 03 · dom. 20 | você recebe −10% de dano de Fogo; recebe +10% de Gelo |

### Ramo A — Pressão e abrasão
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Lança ígnea | Técnica | 01 · dom. 20 | K1,20 I10 · 0,7 s · 18E · rec. 4 s; 20 m, rápida; dano contínuo 10% em 3 s. [Execução] |
| 08 | Brasa persistente | Técnica | 07 · dom. 40 | K0,40 I0 · 0,8 s · 20E · rec. 12 s; marca o alvo 8 s: cada golpe de Fogo seu nele +8% de dano (não acumula). [Execução] |
| 09 | Carvão vivo | Passiva | 07 · dom. 20 | Queimando dura 8 s com o mesmo total; Tônico limpo remove só metade (o seu também); custo das técnicas de dano contínuo +3E |
| 10 | Abrasão | Passiva | 08 · dom. 40 | alvo com armadura reduzida pelo seu Fogo e Queimando ao mesmo tempo: +10 de impacto nos seus golpes de arma; seus projéteis −5% de dano |
| 11 | Lança dupla | Transformação | 07 · dom. 40 | Lança ígnea sai em 2 disparos de K0,70 com 0,2 s de diferença; custo 22E |
| 12 | Coração em chamas | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Queimando aplicado por você pode passar para 1 inimigo a 2 m quando o alvo morre (com o tempo restante); seu Queimando −15% de dano |

### Ramo B — Zonas de perigo
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Chão em brasa | Técnica | 02 · dom. 20 | K0,25/s · 1,2 s · 25E · rec. 14 s; área de 3 m por 6 s (Queimando em quem entra; 1 aplicação por alvo). [Contenção] |
| 14 | Cerco de fogo | Técnica | 13 · dom. 40 | 0 dano direto · 1,4 s · 30E · rec. 24 s; anel de 4 m por 6 s: atravessar custa 6% da vida e Queimando (chefe ignora). [Contenção] |
| 15 | Fogo amigo nunca | Passiva | 13 · dom. 20 | aliados atravessam as suas zonas sem dano e com +5% de dano por 3 s; as zonas duram 1 s a menos |
| 16 | Forno | Passiva | 14 · dom. 40 | inimigos dentro do Cerco de fogo têm −15% de regeneração de postura; o Cerco custa 35E |
| 17 | Muralha em cruz | Transformação | 03 · dom. 40 | Muralha de chamas vira 2 linhas de 3 m em X (cobre esquina) |
| 18 | Senhor do incêndio | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | pode manter 2 zonas suas ao mesmo tempo (exceção à Utilidade única); cada zona dura metade |

### Ramo C — Explosão concentrada
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Supernova | Técnica | 02 · dom. 40 | K2,40 I30 · 2,2 s · 45E · rec. 25 s; área 4 m centrada em você; você não pode se mover no preparo. [Execução] |
| 20 | Pavio curto | Passiva | 19 · dom. 40 | consumir 3 cargas de Sobrecarga na Supernova reduz o preparo em 0,4 s (em vez de somar 0,3 s); a Supernova custa 50E |
| 21 | Calor do núcleo | Passiva | 19 · dom. 40 | Projétil e Área de fogo dão 1 carga de Sobrecarga extra se acertarem 3+ alvos (respeita o máx. 3 e os 2 s); com 1 alvo, nada |
| 22 | Combustão | Passiva | 01 · dom. 30 | acertar Projétil de fogo em alvo Queimando consome o Queimando e causa o dano restante na hora; em troca, o alvo deixa de queimar e a Combustão não reaplica Queimando por 6 s |
| 23 | Supernova dirigida | Transformação | 19 · dom. 60 | a Supernova sai em cone de 90° a 6 m na sua frente, K2,40 → 2,10 |
| 24 | Sol interior | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | com 3 cargas de Sobrecarga, sua próxima técnica de Fogo ignora 15% da armadura (soma com Punir até o teto de 35%); depois, a energia não regenera por 3 s |

---

## GELO — efeito do elemento: +15% na recuperação das ações do alvo
Ramos: **A. Alteração de cadência** · **B. Terreno** · **C. Fratura em janelas compatíveis**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de gelo | Técnica | dom. 1 | K1,40 I10 · 1,0 s · 20E · rec. 3 s; 15 m. [Execução] |
| 02 | Área de gelo | Técnica | dom. 10 | K1,60 I15 · 1,6 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Chão escorregadio | Técnica | dom. 10 | 0 dano direto · 25E · rec. 14 s · 5 s; área 3 m, movimento −40% (chefe só em ataques marcados; PvP conta como Lento). [Contenção] |
| 04 | Frio paciente | Passiva | 01 · dom. 1 | o efeito do Gelo dura 6 s em vez de 4 s; seus projéteis de gelo voam 15% mais devagar |
| 05 | Cristal fino | Passiva | 02 · dom. 10 | a Área de gelo deixa cristais por 2 s (pisar neles: −10% de movimento); dano da Área −5% |
| 06 | Sangue frio | Passiva | 03 · dom. 20 | você recebe −10% de dano de Gelo; recebe +10% de Fogo |

### Ramo A — Alteração de cadência
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Toque glacial | Técnica | 01 · dom. 20 | K0,80 I10 · 0,6 s · 15E · rec. 6 s; corpo a corpo (2 m): o próximo ataque do alvo tem preparo +0,2 s. [Contenção] |
| 08 | Congelar o tempo | Técnica | 07 · dom. 40 | 0 dano · 1,0 s · 30E · rec. 25 s; inimigos a 4 m: recuperação +25% por 4 s (não soma com o efeito do Gelo: vale a maior; chefe só em ataques compatíveis). [Contenção] |
| 09 | Ritmo quebrado | Passiva | 07 · dom. 20 | alvo sob efeito do seu Gelo leva +5% de dano das suas armas; em troca, seu efeito de Gelo passa a ter rec. interna de 3 s por alvo |
| 10 | Mão gelada | Passiva | 08 · dom. 40 | depois de Congelar o tempo, sua esquiva perfeita contra um alvo afetado dá +10 Ímpeto extra (teto 45/s); o Congelar custa 35E |
| 11 | Toque profundo | Transformação | 07 · dom. 40 | o Toque glacial atrasa os 2 próximos ataques do alvo em +0,12 s cada |
| 12 | Inverno eterno | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o efeito do seu Gelo vale +20% (em vez de +15%) contra alvos comuns e elites; contra chefes continua 15% e só em ataques compatíveis |

### Ramo B — Terreno
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Muro de gelo | Técnica | 03 · dom. 20 | 0 dano · 1,2 s · 30E · rec. 20 s; parede de 3 m × 2 m (vida 30% da sua) por 6 s; bloqueia projéteis e passagem de comuns. [Contenção] |
| 14 | Pista de gelo | Técnica | 13 · dom. 40 | 0 dano · 0,8 s · 20E · rec. 16 s; linha de 8 m por 6 s: aliados correm +30% nela, inimigos −30%. [Sustentação] |
| 15 | Gelo espesso | Passiva | 13 · dom. 20 | o Muro de gelo tem vida 45% da sua; em troca, dura só 4 s |
| 16 | Patinador | Passiva | 14 · dom. 40 | sobre gelo seu, sua esquiva vai 1 m mais longe; sua corrida custa +10% de resistência fora do gelo |
| 17 | Muro em L | Transformação | 13 · dom. 40 | o Muro de gelo vira 2 paredes de 2 m em L |
| 18 | Arquiteto do inverno | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o Muro de gelo serve de obstáculo de colisão para investidas de chefe marcadas (como o pilar de Terra); quebrado pela colisão, deixa o chefe exausto só 3 s (Terra: 6 s) |

### Ramo C — Fratura em janelas compatíveis
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Estilhaço | Técnica | 02 · dom. 40 | K1,80 I25 · 1,2 s · 30E · rec. 14 s; contra alvo sob efeito do seu Gelo, quebra o gelo: +30 de impacto e o efeito acaba. [Ruptura] |
| 20 | Gelo quebradiço | Passiva | 19 · dom. 40 | Estilhaço contra parte quebrável ganha +10 de impacto extra; contra alvo sem gelo, o Estilhaço perde 20% |
| 21 | Frieza calculada | Passiva | 01 · dom. 30 | a cada 3 projéteis de gelo no mesmo alvo, o 4º ganha +10 de impacto; em troca, trocar de alvo zera a contagem e o 4º projétil custa +5E |
| 22 | Fratura em cadeia | Passiva | 19 · dom. 40 | Estilhaço que quebra o gelo espalha o efeito do Gelo para 1 inimigo a 3 m; o Estilhaço custa 35E |
| 23 | Estilhaço em leque | Transformação | 19 · dom. 60 | o Estilhaço vira cone de 60° a 5 m, K1,40 (quebra o gelo de todos) |
| 24 | Zero absoluto | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | quebrar o gelo de um alvo com Estilhaço durante a janela de abertura de um chefe dá +3 s de abertura (1 vez por abertura); fora disso, Estilhaço rec. 14 → 18 s |

---

## RAIO — efeito do elemento: +25% de impacto contra alvo sem guarda; interrompe conjuração (1×/2 s)
Ramos: **A. Interrupção** · **B. Saltos entre alvos** · **C. Descarga concentrada**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de raio | Técnica | dom. 1 | K1,40 I10 · 1,0 s · 20E · rec. 3 s; 15 m. [Execução] |
| 02 | Área de raio | Técnica | dom. 10 | K1,60 I15 · 1,6 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Corrente | Técnica | dom. 10 | K0,50 · 20E · rec. 10 s; salta para 3 alvos; interrompe conjuração de comum (chefe só conjurações marcadas). [Ruptura] |
| 04 | Faísca rápida | Passiva | 01 · dom. 1 | o Projétil de raio voa 2× mais rápido; alcance 15 → 12 m |
| 05 | Estática | Passiva | 02 · dom. 10 | inimigos atingidos pela Área de raio ficam "carregados" 3 s: seu próximo golpe de arma neles +5 de impacto; a Área custa 33E |
| 06 | Para-raios | Passiva | 03 · dom. 20 | você recebe −10% de dano de Raio; recebe +10% de Terra |

### Ramo A — Interrupção
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Choque | Técnica | 01 · dom. 20 | K0,60 I25 · 0,5 s · 15E · rec. 8 s; 10 m; interrompe preparo marcado. [Ruptura] |
| 08 | Sobrecarga elétrica | Técnica | 07 · dom. 40 | 0 dano · 0,8 s · 25E · rec. 20 s; o alvo fica 4 s com "curto-circuito": a próxima conjuração dele falha (chefe: só as marcadas). [Ruptura] |
| 09 | Reflexo elétrico | Passiva | 07 · dom. 20 | interromper com Choque devolve 8E; errar a interrupção (alvo não estava preparando) custa +8E |
| 10 | Silêncio estático | Passiva | 08 · dom. 40 | quem tem a conjuração anulada fica Silenciado 1 s (categoria de controle no PvP); a Sobrecarga elétrica custa 30E |
| 11 | Choque em arco | Transformação | 07 · dom. 40 | o Choque acerta até 2 alvos a 3 m um do outro, I25 → 18 cada |
| 12 | Tempestade cativa | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | a limitação "interrompe 1×/2 s" do Raio passa a 1×/1,5 s para você; o efeito +25% de impacto cai para +20% |

### Ramo B — Saltos entre alvos
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Raio em cadeia | Técnica | 03 · dom. 20 | K0,90 I8 · 1,0 s · 25E · rec. 8 s; salta 4 vezes (−15% a cada salto). [Execução] |
| 14 | Bola elétrica | Técnica | 13 · dom. 40 | K0,30/s · 1,2 s · 30E · rec. 16 s; esfera lenta que anda 8 m em 4 s e eletrifica quem estiver a 2 m. [Execução] |
| 15 | Condutor humano | Passiva | 13 · dom. 20 | saltos podem passar por aliados (sem dano a eles) para alcançar inimigos mais longe; cada salto via aliado −25% |
| 16 | Ricochete | Passiva | 13 · dom. 30 | o Raio em cadeia pode voltar ao 1º alvo no último salto; custa +5E |
| 17 | Bola estacionária | Transformação | 14 · dom. 40 | a Bola elétrica fica parada 6 s no ponto escolhido |
| 18 | Rede de relâmpagos | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | inimigos atingidos por 2 saltos seus em 4 s ficam ligados: dano de raio em um passa 25% para o outro; seus saltos não dão carga de Sobrecarga |

### Ramo C — Descarga concentrada
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Martelo do trovão | Técnica | 02 · dom. 40 | K2,20 I35 · 1,8 s · 40E · rec. 22 s; raio do céu num círculo de 2 m (precisa de céu aberto ou teto alto). [Ruptura] |
| 20 | Trovão guardado | Passiva | 19 · dom. 40 | o Martelo pode ser segurado até 1 s depois de pronto, mirando de novo; segurar custa 5E por 0,5 s |
| 21 | Céu carregado | Passiva | 19 · dom. 40 | durante bioma de tempestade, o Martelo custa 25E; fora dele, 45E |
| 22 | Alvo sem guarda | Passiva | 01 · dom. 30 | o bônus +25% de impacto do Raio vale também contra alvo atordoado; contra alvo em guarda, seus golpes de raio −5% |
| 23 | Martelo em linha | Transformação | 19 · dom. 60 | o Martelo vira 3 raios em linha (2 m cada, 1 s entre eles), K1,00 cada |
| 24 | Fúria dos céus | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o Martelo do trovão ganha 1 carga extra de Sobrecarga se consumir 3 (efeito de 4 cargas, teto do núcleo respeitado: ×1,56 com POT +40); depois, Martelo rec. 22 → 30 s |

---

## TERRA — efeito do elemento: barreira de 20 de postura (máx. 40 acumulado por alvo, 4 s)
Ramos: **A. Postura** · **B. Obstáculos válidos** · **C. Impacto comprometido**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de terra | Técnica | dom. 1 | K1,40 I15 · 1,0 s · 20E · rec. 3 s; 15 m (mais impacto, voa em arco). [Execução] |
| 02 | Área de terra | Técnica | dom. 10 | K1,60 I20 · 1,6 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Pilar | Técnica | dom. 10 | 0 dano · 30E · rec. 18 s · 6 s; pilar 1,5 m (vida 30% da sua), bloqueia projéteis; obstáculo de colisão para investidas marcadas; 1 pilar ativo. [Contenção] |
| 04 | Raiz firme | Passiva | 01 · dom. 1 | a barreira de postura da Terra dura 5 s; você só pode aplicá-la em você ou em 1 aliado por vez |
| 05 | Pedra pesada | Passiva | 02 · dom. 10 | Área de terra +5 de impacto; preparo +0,1 s |
| 06 | Pele de rocha | Passiva | 03 · dom. 20 | você recebe −10% de dano de Terra; recebe +10% de Raio |

### Ramo A — Postura
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Couraça de pedra | Técnica | 01 · dom. 20 | 0 dano · 0,8 s · 25E · rec. 16 s; você ou aliado a 8 m: barreira de 30 de postura (conta no máx. 40). [Sustentação] |
| 08 | Montanha | Técnica | 07 · dom. 40 | 0 dano · 1,2 s · 35E · rec. 30 s; aliados a 4 m: barreira de 20 e −20% de deslocamento forçado sofrido por 5 s. [Sustentação] |
| 09 | Pedra viva | Passiva | 07 · dom. 20 | barreira de postura que não for quebrada devolve 5E quando acaba; barreiras custam +3E |
| 10 | Base inabalável | Passiva | 08 · dom. 40 | com barreira de Terra ativa, Firmar (VIG) adia +10% do impacto; sua velocidade de ataque −5% enquanto a barreira durar |
| 11 | Couraça dupla | Transformação | 07 · dom. 40 | a Couraça dá 15 de postura a 2 alvos |
| 12 | Coração de montanha | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | o máximo acumulado de barreira por alvo vira 60 **só** com as suas técnicas; outras fontes continuam limitadas a 40 |

### Ramo B — Obstáculos válidos
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Parede de pedra | Técnica | 03 · dom. 20 | 0 dano · 1,4 s · 35E · rec. 24 s; parede 4 m × 2 m (vida 40% da sua) por 8 s; bloqueia tudo que não seja chefe. [Contenção] |
| 14 | Espinhos | Técnica | 13 · dom. 40 | K0,80 I30 · 1,0 s · 25E · rec. 14 s; espinhos saem do chão numa linha de 6 m; derrubam comuns. [Ruptura] |
| 15 | Pilar teimoso | Passiva | 03 · dom. 20 | o Pilar tem vida 45% da sua e não cai na 1ª colisão de investida (cai na 2ª); recarga 18 → 22 s |
| 16 | Parede viva | Passiva | 13 · dom. 30 | inimigos que batem na Parede levam K0,30 e −10 de postura; a Parede dura 6 s |
| 17 | Pilar duplo | Transformação | 03 · dom. 40 | 2 pilares menores (vida 20% cada); só o primeiro conta como obstáculo de colisão |
| 18 | Geomante | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | colisão de chefe no seu Pilar deixa o chefe exausto 8 s (eram 6 s), 1 vez por tentativa por chefe; Pilar custa 40E |

### Ramo C — Impacto comprometido
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Terremoto arcano | Técnica | 02 · dom. 40 | K2,00 I50 · 2,0 s · 45E · rec. 24 s; área 4 m; derruba comuns; você fica imóvel 0,5 s depois. [Ruptura] |
| 20 | Peso da terra | Passiva | 19 · dom. 40 | Terremoto arcano +15 de impacto contra alvo com guarda frontal; contra alvo voando, não acerta |
| 21 | Rocha imbuída | Passiva | 01 · dom. 30 | canalizar Terra na arma (imbuir) dá +6 de impacto por golpe; o custo de imbuir +4E |
| 22 | Falha geológica | Passiva | 19 · dom. 40 | o Terremoto arcano deixa o chão quebrado por 4 s (inimigos −20% de movimento); você também |
| 23 | Terremoto focado | Transformação | 19 · dom. 60 | Terremoto arcano num círculo de 2 m, I50 → 70 |
| 24 | Punho do mundo | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Sobrecarga em técnicas de Terra pode virar impacto (+10 por carga) em vez de dano (escolha na preparação, por técnica); técnicas com essa escolha −10% de dano mesmo sem carga |

---

## VENTO — efeito do elemento: empurra; +10 Ímpeto (por ação, 1×/s)
Ramos: **A. Reposicionamento** · **B. Condução de projéteis** · **C. Dispersão e pressão espacial**.
Regra da árvore: Vento **não** pode ter ao mesmo tempo o melhor deslocamento, a maior geração de Ímpeto e o maior dano — cada ramo escolhe um.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de vento | Técnica | dom. 1 | K1,30 I10 · 0,9 s · 20E · rec. 3 s; 15 m; empurra comum 1 m. [Execução] |
| 02 | Área de vento | Técnica | dom. 10 | K1,50 I15 · 1,5 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Rajada | Técnica | dom. 10 | 0 dano · 20E · rec. 12 s; cone 5 m, empurra 5 m (chefe não; PvP conta como deslocamento forçado). [Contenção] |
| 04 | Passo de vento | Passiva | 01 · dom. 1 | o +10 Ímpeto do Vento só vale se a ação acertou alvo hostil (não em vento contra parede); em troca vale 1×/0,8 s |
| 05 | Ar rarefeito | Passiva | 02 · dom. 10 | a Área de vento puxa (em vez de empurrar) comuns 1 m para o centro; dano −5% |
| 06 | Corpo leve | Passiva | 03 · dom. 20 | você recebe −10% de dano de Vento e −10% de deslocamento forçado; recebe +10% de dano de Água |

### Ramo A — Reposicionamento
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Salto do vento | Técnica | 03 · dom. 20 | 0 dano · 0,4 s · 15E · rec. 12 s; salto de 6 m na direção escolhida (sem invulnerabilidade). [Contenção] |
| 08 | Corrente de ar | Técnica | 07 · dom. 40 | 0 dano · 0,8 s · 25E · rec. 20 s; linha de 10 m por 5 s: aliados nela andam +25%; inimigos −15%. [Sustentação] |
| 09 | Aterrissagem | Passiva | 07 · dom. 20 | ao cair do Salto do vento, empurra comuns a 2 m em 1 m; o Salto não dá o +10 Ímpeto |
| 10 | Mão do vento | Passiva | 08 · dom. 40 | pode empurrar um aliado com a Rajada (1 m, sem dano) para tirá-lo de uma área; a Rajada custa 25E |
| 11 | Salto duplo | Transformação | 07 · dom. 40 | o Salto do vento guarda 2 usos de 4 m cada |
| 12 | Andarilho dos ventos | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | depois de um Salto do vento, sua próxima esquiva em 2 s não custa resistência; suas técnicas de dano de Vento −10% |

### Ramo B — Condução de projéteis
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Vento a favor | Técnica | 01 · dom. 20 | 0 dano · 0,6 s · 20E · rec. 16 s; por 6 s, projéteis seus e de aliados a 6 m voam +30% de alcance e mais rápido. [Sustentação] |
| 14 | Vento contra | Técnica | 13 · dom. 40 | 0 dano · 0,8 s · 25E · rec. 18 s; por 4 s, uma parede de vento de 4 m desvia projéteis inimigos de comuns e elites (chefe: −30%). [Contenção] |
| 15 | Curva no ar | Passiva | 13 · dom. 20 | seus projéteis de Vento fazem curva leve (15°) para o alvo travado; dano −5% |
| 16 | Redemoinho de flechas | Passiva | 13 · dom. 30 | projéteis de aliados que passam pela sua Área de vento ganham o efeito empurra; a Área custa +5E |
| 17 | Vento contra móvel | Transformação | 14 · dom. 40 | a parede do Vento contra anda com você (2 m à frente), mas dura 2,5 s |
| 18 | Mestre das correntes | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | projéteis desviados pelo Vento contra voltam ao atirador com 30% do dano; o Vento contra custa 30E |

### Ramo C — Dispersão e pressão espacial
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Tornado | Técnica | 02 · dom. 40 | K0,40/s · 1,6 s · 40E · rec. 24 s; tornado de 2 m anda 6 m em 4 s puxando comuns para ele. [Ruptura] |
| 20 | Olho calmo | Passiva | 19 · dom. 40 | aliados dentro do Tornado não são empurrados e recebem −10% de dano de projéteis; o Tornado anda 4 m |
| 21 | Rajada cortante | Passiva | 03 · dom. 30 | a Rajada causa K0,50 e +5 de impacto; empurra 3 m (era 5 m) |
| 22 | Pressão do ar | Passiva | 19 · dom. 40 | inimigos puxados pelo Tornado perdem 10 de postura ao chegar ao centro; o Tornado custa 45E |
| 23 | Tornado parado | Transformação | 19 · dom. 60 | o Tornado fica parado no ponto escolhido por 5 s com raio 3 m |
| 24 | Olho da tempestade | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | enquanto um Tornado seu existe, o +10 Ímpeto do Vento vale 1×/0,6 s para você; depois que ele some, nenhum Ímpeto de Vento por 3 s |

---

## ÁGUA — efeito do elemento: redistribui reserva de cura entre aliados (nunca cria)
Ramos: **A. Redistribuição de reserva** · **B. Socorro** · **C. Condução e limpeza**.
Regra da árvore: Água precisa ter dano viável — o ramo C tem dano comparável às outras árvores.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Projétil de água | Técnica | dom. 1 | K1,40 I10 · 1,0 s · 20E · rec. 3 s; 15 m. [Execução] |
| 02 | Área de água | Técnica | dom. 10 | K1,60 I15 · 1,6 s · 30E · rec. 8 s; 3 m. [Execução] |
| 03 | Bolha | Técnica | dom. 10 | 0 dano · 25E · rec. 12 s; move até 200·s de reserva entre 2 aliados a 8 m (só da mesma tentativa). [Sustentação] |
| 04 | Fluxo calmo | Passiva | 01 · dom. 1 | o efeito de redistribuição da Água também vale nos seus projéteis que acertam (move 20·s do aliado mais cheio para o mais vazio a 8 do alvo); projéteis −5% de dano |
| 05 | Maré baixa | Passiva | 02 · dom. 10 | a Área de água deixa o chão molhado 4 s (Raio aliado +10% de dano nele); em troca, você anda 10% mais devagar no molhado |
| 06 | Corpo de água | Passiva | 03 · dom. 20 | você recebe −10% de dano de Água; recebe +10% de Raio |

### Ramo A — Redistribuição de reserva
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Vasos comunicantes | Técnica | 03 · dom. 20 | 0 dano · 1,0 s · 30E · rec. 20 s; nivela a reserva de até 4 aliados a 10 m (todos ficam com a média). [Sustentação] |
| 08 | Fonte | Técnica | 07 · dom. 40 | 0 dano · 1,2 s · 35E · rec. 30 s; área 4 m por 6 s: aliados dentro movem 30·s por segundo da própria reserva para a vida. [Sustentação] |
| 09 | Gota a gota | Passiva | 07 · dom. 20 | a Bolha move até 260·s; custo 25 → 30E |
| 10 | Correnteza | Passiva | 08 · dom. 40 | aliados dentro da Fonte também recuperam postura como se não fossem atingidos; a Fonte dura 4 s |
| 11 | Bolha em cadeia | Transformação | 03 · dom. 40 | a Bolha move 120·s de cada um de 3 aliados para o mais ferido |
| 12 | Senhor das marés | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | 10% de toda reserva que você move não sai de quem doa (conta como sua conservação de reserva, teto 10%); você não ganha Sobrecarga com técnicas de Água de suporte |

### Ramo B — Socorro
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 13 | Toque da maré | Técnica | 03 · dom. 20 | 0 dano · 0,8 s · 20E · rec. 8 s; move 180·s da reserva do aliado para a vida dele em 2 s. [Sustentação] |
| 14 | Onda de resgate | Técnica | 13 · dom. 40 | 0 dano · 1,5 s · 35E · rec. 40 s; reanima 1 aliado caído a 6 m em 2 s (em vez de 4 s), com a reserva dele (conta no teto de reanimações). [Sustentação] |
| 15 | Mão de chuva | Passiva | 13 · dom. 20 | Toque da maré pode ser usado andando a 50%; em troca, move só 150·s |
| 16 | Corrente de vida | Passiva | 14 · dom. 40 | quem você reanima volta com +5% de vida (da reserva dele; continua respeitando o mínimo de 5%); a Onda custa 40E |
| 17 | Toque contínuo | Transformação | 13 · dom. 40 | o Toque da maré vira canalização: 60·s por segundo por até 4 s (cancela se você levar dano) |
| 18 | Guardião da fonte | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | aliado que você curou nos últimos 3 s recebe −10% de dano; você recebe +10% enquanto canaliza |

### Ramo C — Condução e limpeza
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 19 | Lâmina d'água | Técnica | 01 · dom. 40 | K1,80 I20 · 1,0 s · 30E · rec. 10 s; linha de 8 m que atravessa e **remove 1 estado removível** de aliados que estiverem nela. [Execução] |
| 20 | Pressão | Passiva | 19 · dom. 40 | Lâmina d'água +15% de dano contra alvo molhado (Maré baixa); contra alvo seco, −5% |
| 21 | Água limpa | Passiva | 01 · dom. 30 | seus projéteis de água removem Queimando de aliados que atravessarem; custam +3E |
| 22 | Correnteza forte | Passiva | 19 · dom. 40 | a Lâmina d'água empurra comuns 2 m na direção do disparo; o dano dela −5% |
| 23 | Jato | Transformação | 19 · dom. 60 | a Lâmina d'água vira jato contínuo de 1,5 s (K0,90 por 0,5 s, 3 vezes); você anda a 30% |
| 24 | Maremoto | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | a Lâmina d'água ganha Sobrecarga com +0,15 por carga (em vez de 0,08 + 0,12·r(POT) com POT baixo); com POT ≥ +40, vale a fórmula normal; a Lâmina custa 35E |
