# Árvore de habilidades — 03. Armas (Machado pequeno, Dois machados, Arco)
Formato e regras: `00-sistema.md` §4, §9 e §10. Cada árvore: 30 nós, 51 PH.

---

## MACHADO PEQUENO — mecânica própria: Arremesso e Marca
Ramos: **A. Arremesso e retorno** · **B. Marca e perseguição** · **C. Desarme e controle**.
(Mudança: "Retorno cortante" deixa de ser técnica e vira passiva do ramo A; entra a técnica nova **Lançamento curvo**.)

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Arremesso duplo | Técnica | dom. 1 | K0,60×2 I12 · 0,9 s · 15R · rec. 8 s; dois alvos a até 12 m. [Execução] |
| 02 | Gancho | Técnica | dom. 10 | K0,50 I20 · 0,7 s · 15R · rec. 10 s; puxa comum 4 m até você. [Contenção] |
| 03 | Machado imbuído | Técnica | dom. 10 | K0,90 I15 · 0,8 s · 18E · rec. 6 s; arremesso com seu elemento; salta para 1 alvo extra. [Execução] |
| 04 | Pegada de lenhador | Passiva | 01 · dom. 1 | sem o machado na mão (esperando a volta), seus golpes desarmados ganham o Fluxo do desarmado (até 2 níveis); a volta do machado leva 1,7 s (era 1,5 s) |
| 05 | Olho de caça | Passiva | 02 · dom. 10 | a Marca dura 8 s (era 6 s); só pode ser renovada depois de 3 s |
| 06 | Lâmina de cinto | Passiva | 03 · dom. 20 | 1 machado reserva no cinto: se o principal não voltou, o próximo leve usa o reserva (K0,50); o reserva pesa +1 |

### Ramo A — Arremesso e retorno
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Lançamento curvo | Técnica | 01 · dom. 20 | K0,90 I15 · 0,8 s · 15R · rec. 9 s; arremesso que faz curva de até 90° (contorna um obstáculo ou escudo frontal). [Execução] |
| 08 | Machado bumerangue | Técnica | 07 · dom. 40 | K0,80 I20 · 1,0 s · 15R · rec. 12 s; vai e volta acertando 2 vezes (exceção na ficha). [Execução] |
| 09 | Tempestade de machados | Técnica | 08 · dom. 60 | K0,50×6 I12 total · 1,6 s · 25R · rec. 16 s; arremessa em até 6 alvos (1 por alvo). [Execução] |
| 10 | Retorno cortante | Passiva | 01 · dom. 20 | o machado que volta acerta o que estiver no caminho (K0,70 I10, 1 vez por alvo); a volta não pode ser apressada |
| 11 | Mão que espera | Passiva | 08 · dom. 40 | pegar o machado no ar na hora certa (botão de pegar) devolve 5R; em troca, errar o tempo deixa você 0,4 s sem arma |
| 12 | Braço longo | Passiva | 07 · dom. 30 | arremessos alcançam 15 m (eram 12 m); acima de 12 m, −15% de dano |
| 13 | Bumerangue pesado | Transformação | 08 · dom. 40 | Machado bumerangue acerta 1 vez só (na ida), K0,80 → 1,20 e I20 → 30; volta sem acertar |
| 14 | Chuva de aço | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | você pode arremessar o machado reserva (06) também: 2 machados no ar ao mesmo tempo; enquanto os dois estiverem no ar, sua defesa só é esquiva |

### Ramo B — Marca e perseguição
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Marca do caçador | Técnica | 02 · dom. 20 | 0 dano · 0,3 s · 10R · rec. 14 s; a Marca dura 12 s e o grupo ganha +10% de impacto no alvo (não soma com outra Marca: vale a maior). [Sustentação] |
| 16 | Caça | Técnica | 15 · dom. 40 | 0 dano · 0,3 s · 10R · rec. 20 s; até 3 marcas ao mesmo tempo por 6 s (exceção à marca única). [Sustentação] |
| 17 | Golpe da marca | Técnica | 16 · dom. 60 | K1,60 I30 · 0,9 s · 20R · rec. 12 s; consome a Marca: ×1,5. [Execução] |
| 18 | Rastro de sangue | Passiva | 15 · dom. 20 | o alvo marcado aparece no mapa da equipe por 10 s (mesmo invisível — Sombras reveladas); a Marca do caçador custa +5R |
| 19 | Caçador paciente | Passiva | 16 · dom. 40 | marcas que expiram sem ser consumidas devolvem 3 s da recarga da Caça; consumir uma marca não devolve nada |
| 20 | Golpe de misericórdia do caçador | Passiva | 17 · dom. 60 | Golpe da marca contra alvo com < 30% de vida não consome a Marca; contra os demais, a recarga sobe para 15 s |
| 21 | Marca profunda | Transformação | 15 · dom. 40 | a Marca do caçador dá +15% de impacto ao grupo, mas só dura 6 s |
| 22 | Predador | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | consumir uma Marca com Golpe da marca recarrega o Gancho; o Gancho passa a puxar **você** até elites marcados (não puxa elites) |

### Ramo C — Desarme e controle
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Quebra-escudo | Técnica | 03 · dom. 20 | K0,80 I40 · 0,9 s · 18R · rec. 9 s; contra guarda frontal: quebra 2 s. [Ruptura] |
| 24 | Corrente | Técnica | 23 · dom. 40 | K0,70 I30 · 0,9 s · 20R · rec. 14 s; puxa você até o alvo marcado. [Contenção] |
| 25 | Âncora do caçador | Técnica | 24 · dom. 60 | K0 I30 · 0,8 s · 18R · rec. 16 s; prende o alvo marcado ao chão 2 s. [Contenção] |
| 26 | Desarme | Passiva | 23 · dom. 20 | Quebra-escudo contra humanoide tira a arma dele por 3 s (ataques −30% de dano); contra outras famílias, −10% de impacto |
| 27 | Elo de ferro | Passiva | 24 · dom. 40 | ao chegar pela Corrente, seu próximo leve tem +10 de impacto; a Corrente custa +5R |
| 28 | Âncora longa | Passiva | 25 · dom. 60 | a Âncora prende 2,5 s; em troca, contra elite prende só 1 s (antes: 2 s) |
| 29 | Corrente reversa | Transformação | 24 · dom. 40 | a Corrente puxa o alvo comum até você em vez do contrário (elites: nada) |
| 30 | Mestre de armas | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | inimigos com guarda frontal (constructos, escudeiros) quebrados pelo Quebra-escudo ficam também Expostos 2 s; Quebra-escudo recarga 9 → 12 s |

---

## DOIS MACHADOS — mecânica própria: Frenesi, sem bloqueio
Ramos: **A. Frenesi sustentado** · **B. Execução** · **C. Troca de Frenesi por sobrevivência**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Moedor | Técnica | dom. 1 | K0,30×5 I20 total · 1,3 s · 20R · rec. 10 s; avança 3 m. [Execução] |
| 02 | Salto selvagem | Técnica | dom. 10 | K1,10 I30 · 1,0 s · 20R · rec. 9 s; salta 5 m em área. [Ruptura] |
| 03 | Fúria elemental | Técnica | dom. 10 | K0,80×2 I15 · 1,0 s · 22E · rec. 7 s; imbuir. [Execução] |
| 04 | Sede de luta | Passiva | 01 · dom. 1 | Frenesi não zera por 2 s sem acertar: cai 1 nível por segundo; levar golpe ainda zera |
| 05 | Golpes pesados | Passiva | 02 · dom. 10 | o pesado dos dois machados conta como 2 acertos de Frenesi; o pesado custa +3R |
| 06 | Pele grossa | Passiva | 03 · dom. 20 | com Frenesi ≥ 3, você recebe −5% de dano; com Frenesi 0, +5% |

### Ramo A — Frenesi sustentado
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Corte em X | Técnica | 01 · dom. 20 | K1,00 I25 · 0,8 s · 15R · rec. 7 s; +2 níveis de Frenesi. [Execução] |
| 08 | Sem parar | Técnica | 07 · dom. 40 | 0 dano · 4 s · 0R · rec. 20 s; Frenesi não zera ao levar golpe. [Execução] |
| 09 | Fúria cega | Técnica | 08 · dom. 60 | 0 dano · 6 s · 0R · rec. 30 s; Frenesi começa no máximo, defesa −30% (recebe +30% de dano). [Execução] |
| 10 | Batida de guerra | Passiva | 07 · dom. 20 | cada nível de Frenesi +3% de velocidade (máx. +18%, teto 1,45); acima de 3 níveis, cada acerto custa 1R |
| 11 | Respiro selvagem | Passiva | 08 · dom. 40 | ao terminar o Sem parar com Frenesi máximo, recupera 15R; com menos, nada e −10R |
| 12 | Tontura de batalha | Passiva | 07 · dom. 30 | Frenesi máximo deixa seus golpes +5 de impacto; o tempo de recuperação do pesado +0,1 s |
| 13 | Fúria contida | Transformação | 09 · dom. 60 | Fúria cega dura 3 s com defesa −10% |
| 14 | Berserker | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Frenesi máximo vira 7 níveis (+3% cada, teto 1,45); com Frenesi 7 você não pode usar técnicas [Sustentação] |

### Ramo B — Execução
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Mordida dupla | Técnica | 02 · dom. 20 | K0,90×2 I25 · 0,9 s · 18R · rec. 12 s; deixa Exposto 3 s se Frenesi ≥ 3. [Ruptura] |
| 16 | Execução dupla | Técnica | 15 · dom. 40 | K1,80 I30 · 1,0 s · 20R · rec. 16 s; ×1,5 em alvo com < 30% de vida. [Execução] |
| 17 | Tormenta | Técnica | 16 · dom. 60 | K0,35×8 I30 total · 1,8 s · 30R · rec. 18 s; anda girando 4 m. [Execução] |
| 18 | Faro de sangue | Passiva | 15 · dom. 20 | alvos com < 30% de vida ficam marcados para você; seus golpes contra alvos com > 70% de vida −5% |
| 19 | Lâminas famintas | Passiva | 16 · dom. 40 | Execução dupla que derruba um alvo devolve 50% da recarga; se não derrubar, a recarga sobe 3 s |
| 20 | Fim da tormenta | Passiva | 17 · dom. 60 | o último giro da Tormenta causa ×1,5 contra alvo com < 30% de vida; a Tormenta custa +5R |
| 21 | Execução em cadeia | Transformação | 16 · dom. 40 | Execução dupla salta para outro alvo com < 30% de vida a 3 m (K1,00), mas perde o ×1,5 no primeiro |
| 22 | Carniceiro | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | derrubar um inimigo com uma técnica deste ramo dá Frenesi máximo; contra chefes (que não morrem rápido), seus bônus "< 30% de vida" valem só −20% |

### Ramo C — Troca de Frenesi por sobrevivência
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Grito de guerra | Técnica | 03 · dom. 20 | 0 dano · 0,6 s · 10R · rec. 18 s; aliados a 6 m +10% de velocidade 5 s (não soma com o Frenesi do próprio). [Sustentação] |
| 24 | Redemoinho | Técnica | 23 · dom. 40 | K0,40×6 I25 total · 1,5 s · 25R · rec. 14 s; puxa comuns 2 m. [Ruptura] |
| 25 | Sangue quente | Técnica | 24 · dom. 60 | 0 dano · 0,5 s · 0R · rec. 30 s; converte o Frenesi atual em vida (5% por nível, gasta a sua reserva de cura). [Sustentação] |
| 26 | Grito de alento | Passiva | 23 · dom. 20 | o Grito de guerra também dá +10 de postura aos aliados; seu Frenesi cai 2 níveis ao gritar |
| 27 | Escudo de fúria | Passiva | 25 · dom. 60 | Sangue quente também dá 2 s de −20% de dano recebido; a recarga sobe para 35 s |
| 28 | Fôlego de lobo | Passiva | 24 · dom. 40 | cada comum puxado pelo Redemoinho devolve 3R (máx. 9R); o Redemoinho custa +5R |
| 29 | Sangue frio | Transformação | 25 · dom. 60 | Sangue quente converte o Frenesi em **resistência** (8R por nível) em vez de vida, sem gastar reserva |
| 30 | Sobrevivente | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | ao cair abaixo de 30% de vida, gasta todo o Frenesi para ganhar −5% de dano recebido por nível por 4 s (1 vez a cada 40 s); seu Frenesi máximo cai para 4 |

---

## ARCO — mecânica própria: Tensão (30 m, sem bloqueio)
Ramos: **A. Tensão e precisão** · **B. Controle de campo** · **C. Flechas elementais e socorro**.

### Tronco
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 01 | Tiro perfurante | Técnica | dom. 1 | K1,40 I15 · 1,2 s · 18R · rec. 8 s; atravessa a linha. [Execução] |
| 02 | Tiro de atordoar | Técnica | dom. 10 | K0,40 I35 · 1,0 s · 18R · rec. 10 s; interrompe preparo marcado à distância. [Ruptura] |
| 03 | Passo do caçador | Técnica | dom. 10 | 0 dano · 0,4 s · 10R · rec. 12 s; rolamento que já começa com tensão 50%. [Contenção] |
| 04 | Respiração presa | Passiva | 01 · dom. 1 | a tensão treme só depois de 2,5 s (era 2 s); a tensão máxima demora 1,1 s (era 1 s) |
| 05 | Aljava organizada | Passiva | 02 · dom. 10 | trocar o tipo de flecha leva 0,3 s (sem parar de andar); em troca, cada tipo carrega no máx. 60 flechas |
| 06 | Distância segura | Passiva | 03 · dom. 20 | a mais de 15 m, +5% de dano; a menos de 6 m, o tiro sai com 60% em vez de 50% do alcance mínimo, mas a tensão máxima cai para K1,40 |

### Ramo A — Tensão e precisão
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 07 | Flecha do falcão | Técnica | 01 · dom. 20 | K1,20 I20 · 1,0 s · 18R · rec. 10 s; teleguiada 20°. [Execução] |
| 08 | Tiro em leque | Técnica | 07 · dom. 40 | K0,60×5 I25 total · 1,3 s · 22R · rec. 12 s; cone de 30° a 15 m. [Execução] |
| 09 | Flecha estelar | Técnica | 08 · dom. 60 | K2,50 I20 · tensão 2 s · 30E · rec. 16 s; atravessa tudo em 40 m. [Execução] |
| 10 | Olho de águia | Passiva | 07 · dom. 20 | tiros em ponto fraco +10% de dano; tiros fora do ponto fraco −5% |
| 11 | Mira firme | Passiva | 09 · dom. 60 | parado por 1 s, a dispersão some e você ganha +5 pp de crítico; em troca, andar zera a dispersão e o bônus, e mirar parado deixa a esquiva 0,1 s mais lenta para começar |
| 12 | Leque fechado | Passiva | 08 · dom. 40 | o Tiro em leque pode ser 15° (todas as flechas num alvo próximo: K0,60×5 no mesmo alvo); nesse modo custa +5R |
| 13 | Estrela cadente | Transformação | 09 · dom. 60 | Flecha estelar cai do alto num círculo de 3 m (K2,00), precisa de céu aberto |
| 14 | Atirador de elite | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | tensão máxima mantida por 1 s sem atirar vira "tiro de elite": K ×1,25 e penetração +15% (teto 35%); depois de atirar, a tensão demora 1,5 s para encher |

### Ramo B — Controle de campo
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 15 | Armadilha | Técnica | 02 · dom. 20 | K0,50 I30 · 1,0 s · 15R · rec. 14 s; prende comum 2 s (máx. 2 armadilhas no chão). [Contenção] |
| 16 | Rede | Técnica | 15 · dom. 40 | K0,30 I40 · 1,0 s · 20R · rec. 18 s; derruba aviário em voo 3 s. [Ruptura] |
| 17 | Tiro de pinos | Técnica | 16 · dom. 60 | K0,40 I45 · 1,2 s · 20R · rec. 16 s; Preso 1,5 s. [Contenção] |
| 18 | Armadilha escondida | Passiva | 15 · dom. 20 | armadilhas ficam invisíveis para comuns (Sombras e humanoides as veem); colocar leva +0,3 s |
| 19 | Rede pesada | Passiva | 16 · dom. 40 | a Rede também segura comuns no chão 1,5 s; contra aviários, 2,5 s (era 3 s) |
| 20 | Campo minado | Passiva | 15 · dom. 30 | até 3 armadilhas no chão; cada uma prende 1,5 s (era 2 s) |
| 21 | Armadilha de impacto | Transformação | 15 · dom. 40 | a Armadilha não prende: explode com I50 (derruba comum, quebra postura) |
| 22 | Senhor do campo | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | inimigos presos ou derrubados por você levam +15% de dano de todo o grupo (não soma com Exposto: vale o maior); suas técnicas de dano direto −10% |

### Ramo C — Flechas elementais e socorro
| Nº | Nó | Tipo | Requisito | Efeito |
|---|---|---|---|---|
| 23 | Flecha elemental | Técnica | 03 · dom. 20 | K1,30 I14 · 1,1 s · 22E · rec. 6 s; disparo pela arma com o elemento. [Execução] |
| 24 | Flecha de cura | Técnica | 23 · dom. 40 | 0 dano · 1,0 s · 25E · rec. 12 s; move 120·s da reserva do aliado para a vida dele. [Sustentação] |
| 25 | Chuva de flechas | Técnica | 24 · dom. 60 | K0,30×8 I10 total · 1,5 s · 20R · rec. 12 s; área 4 m a até 25 m. [Execução] |
| 26 | Ponta encantada | Passiva | 23 · dom. 20 | Flecha elemental aplica o efeito secundário do elemento por 50% mais tempo; custo +4E |
| 27 | Mão de curandeiro | Passiva | 24 · dom. 40 | Flecha de cura alcança 30 m e não exige parar; a vida movida cai para 100·s |
| 28 | Chuva elemental | Passiva | 25 · dom. 60 | a Chuva de flechas aplica o seu elemento (1 vez por alvo); custa 10E além da resistência |
| 29 | Flecha de socorro | Transformação | 24 · dom. 40 | Flecha de cura cria uma área de 3 m por 4 s: cada aliado dentro move 40·s por segundo da própria reserva para a vida |
| 30 | Arqueiro do vale | Nó-chave | dom. 60; 8 PH no ramo; 2 técnicas + 2 passivas | Flecha de cura e Flecha elemental dividem a recarga em 2 cargas (8 s cada); o dano das suas técnicas de dano −10% |
