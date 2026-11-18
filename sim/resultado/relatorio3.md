# Simulador de equilíbrio v3 — relatório

Dados `38a6a6f7f2` · 102 fichas revisadas · sementes fixas (mulberry32) · triagem 100 lutas, finalistas 400, chefe 40 tentativas (grupo misto) e 20 (grupos iguais) · IC de 95%: Wilson (vitórias) e t de Student (tempo) · escala s = 1,09^(camada−1) · **vidas do contrato, sem fator de correção** (decisão das duas IAs no loop 5).

Mudanças do v2 para o v3: fases J.1 com cancelamento defensivo só nos últimos 40% da recuperação; golpes presos à ação; aviso entra na decisão; motor único (boneco = inimigo que não ataca); impacto dividido entre acertos; defesas do núcleo D.1 (sem +6 de Ímpeto, escudo −25% uma vez, parry falho 15R + 0,35 s, custo de esquiva com peso); armadura do jogador (classes L.2) depois da fração que atravessa; reanimação canalizada; chefe AO.1 real com âncoras, rotas, cotas, adds, Grito, fúria e Leitura (bloqueio/esquiva); condições postura<30/<20; Juízo só com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção; reação com forma preparada e contato por alvo.

## 1. Calibração (contrato AI: ≈ 70 de dano por segundo no perfil de referência)

Perfil de referência (nível 15, com afinidade): FOR 20 · DES 15 · VIG 10 · espada longa · sem elemento · armadura média.

| Medida | Como | DPS ÷ s | Tempo ofensivo real |
|---|---|---|---|
| Boneco | 90 s, mesmo motor, inimigo sem ataques | 154,6 | 100% por definição |
| Abstrato | boneco × 0,55 (uma vez) | **85,0** | — |
| Por eventos, fera | 60 s, vida ×50, ataques reais | **110,6** | 63% |
| Por eventos, constructo | 60 s, vida ×20, ataques reais | **116,9** | 72% |

| Inimigo | Vida do contrato: tempo ± IC | Vitória | Com vida ×1,30 (ensaio do Grok) | Faixa do contrato |
|---|---|---|---|---|
| Fera (650) | 4,0 ± 0,1 s | 100% | 5,3 s | 8–12 s |
| Constructo (1.100) | 7,4 ± 0,1 s | 100% | 9,4 s | 14–18 s |

Leitura: o tempo ofensivo real medido agora fica entre 63% e 72% (no v2 o indicador somava ações iniciadas e passava de 100%). O DPS por eventos ainda fica acima de 70, então as lutas comuns ficam mais curtas que o contrato. **Nenhum fator foi aplicado**: fica registrado como divergência a decidir com telemetria do protótipo.

## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado, vidas do contrato)

| Arma | Boneco DPS | Δ vs média | Fera: tempo ± IC | Constructo: vitória [IC] | Constructo: tempo ± IC | Tempo ofensivo | Dano recebido/min ÷ s |
|---|---|---|---|---|---|---|---|
| desarmado | 152,3 | -8% | 2,9 ± 0,0 s | 100% [96–100] | 6,8 ± 0,1 s | 92% | 469 |
| espada_curta | 179,9 | +9% | 3,5 ± 0,1 s | 100% [96–100] | 6,4 ± 0,1 s | 89% | 649 |
| espada_longa | 166,9 | +1% | 3,5 ± 0,1 s | 100% [96–100] | 6,9 ± 0,1 s | 89% | 559 |
| duas_espadas | 170,1 | +3% | 3,1 ± 0,0 s | 100% [96–100] | 7,2 ± 0,1 s | 85% | 818 |
| espada_e_escudo | 151,2 | -8% | 3,0 ± 0,0 s | 100% [96–100] | 7,1 ± 0,1 s | 90% | 550 |
| katana | 174,6 | +6% | 3,3 ± 0,1 s | 100% [96–100] | 5,8 ± 0,2 s | 89% | 698 |
| duas_katanas | 179,4 | +9% | 2,5 ± 0,0 s | 100% [96–100] | 6,0 ± 0,2 s | 87% | 808 |
| machado_grande | 128,3 | -22% | 5,4 ± 0,1 s | 100% [96–100] | 8,9 ± 0,2 s | 91% | 687 |
| machado_pequeno | 165,2 | +0% | 3,2 ± 0,0 s | 100% [96–100] | 6,6 ± 0,1 s | 91% | 522 |
| dois_machados | 188,9 | +14% | 2,4 ± 0,0 s | 100% [96–100] | 5,6 ± 0,1 s | 90% | 582 |
| arco | 158,3 | -4% | 4,8 ± 0,1 s | 100% [96–100] | 7,8 ± 0,1 s | 85% | 802 |

Fora de ±15% da média no boneco: machado_grande.

### Ensaio: Machado grande (as três cargas e as propostas)

| Versão | Boneco DPS | Δ vs média | Constructo: tempo |
|---|---|---|---|
| Carga 1 (+0,5 s) | 128,0 | -22% | 8,4 s |
| Carga 2 (+1,0 s) | 128,3 | -22% | 8,9 s |
| Carga 3 (+1,5 s) | 131,2 | -20% | 8,2 s |
| ChatGPT: carga 2 = 2,40 s e carga 3 = 2,75 s (usa carga 3) | 144,8 | -12% | 7,6 s |
| ChatGPT: idem, usando carga 2 | 135,5 | -18% | 7,8 s |
| Grok: pesado 1,70 → 1,45 s (carga 2) | 136,4 | -17% | 8,0 s |

## 3. Perfis × 4 políticas (nível 15, camada 1)

Busca igual para todos: as 11 armas × (sem elemento + cada um dos 6), escolhida pelo boneco do mesmo motor. No nível 15 só existe 1 elemento (o 2º abre no nível 30).

| Perfil | Arma · elemento (busca) | Boneco | Política | Constructo: vitória | Tempo | Quedas | Sem energia | Básicos forçados |
|---|---|---|---|---|---|---|---|---|
| Força | espada_curta · fogo | 181,6 | sustentado | 100% | 7,2 s | 0,00 | 0% | 0% |
| Força | espada_curta · fogo | 181,6 | explosao | 100% | 7,2 s | 0,00 | 0% | 0% |
| Força | espada_curta · fogo | 181,6 | ruptura | 100% | 7,6 s | 0,00 | 0% | 0% |
| Força | espada_curta · fogo | 181,6 | defensiva | 100% | 7,1 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 198,8 | sustentado | 100% | 5,9 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 198,8 | explosao | 100% | 5,9 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 198,8 | ruptura | 100% | 6,3 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 198,8 | defensiva | 100% | 6,0 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 204,0 | sustentado | 100% | 5,3 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 204,0 | explosao | 100% | 5,3 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 204,0 | ruptura | 100% | 5,4 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 204,0 | defensiva | 100% | 5,4 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | sustentado | 100% | 7,2 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | explosao | 100% | 7,2 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | ruptura | 100% | 7,8 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | defensiva | 100% | 7,2 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 175,2 | sustentado | 100% | 6,9 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 175,2 | explosao | 100% | 6,9 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 175,2 | ruptura | 100% | 7,9 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 175,2 | defensiva | 100% | 7,0 s | 0,00 | 0% | 0% |
| Mago | katana · fogo | 170,1 | sustentado | 100% | 5,9 s | 0,00 | 0% | 0% |
| Mago | katana · fogo | 170,1 | explosao | 100% | 5,9 s | 0,00 | 0% | 0% |
| Mago | katana · fogo | 170,1 | ruptura | 100% | 7,6 s | 0,00 | 0% | 0% |
| Mago | katana · fogo | 170,1 | defensiva | 100% | 6,0 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 196,9 | sustentado | 100% | 6,3 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 196,9 | explosao | 100% | 6,3 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 196,9 | ruptura | 100% | 7,2 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 196,9 | defensiva | 100% | 6,3 s | 0,00 | 0% | 0% |
| Generalista | katana · fogo | 186,7 | sustentado | 100% | 6,2 s | 0,00 | 0% | 0% |
| Generalista | katana · fogo | 186,7 | explosao | 100% | 6,2 s | 0,00 | 0% | 0% |
| Generalista | katana · fogo | 186,7 | ruptura | 100% | 6,2 s | 0,00 | 0% | 0% |
| Generalista | katana · fogo | 186,7 | defensiva | 100% | 6,3 s | 0,00 | 0% | 0% |

### Finalistas (melhor política de cada perfil, 400 lutas, constructo)

| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: tempo ± IC | Δ vs melhor | Δ vs mediana |
|---|---|---|---|---|---|---|
| Força | defensiva | 100% [99–100] | 7,1 ± 0,1 s | 7,2 ± 0,1 s | +32% | +13% |
| Destreza | sustentado | 100% [99–100] | 6,0 ± 0,1 s | 5,7 ± 0,1 s | +13% | -4% |
| Força+Destreza | sustentado | 100% [99–100] | 5,4 ± 0,0 s | 5,2 ± 0,1 s | +0% | -15% |
| Tanque | sustentado | 100% [99–100] | 7,2 ± 0,1 s | 7,2 ± 0,1 s | +34% | +14% |
| Leitor (PER) | sustentado | 100% [99–100] | 6,9 ± 0,1 s | 6,8 ± 0,1 s | +29% | +10% |
| Mago | sustentado | 100% [99–100] | 6,0 ± 0,0 s | 5,8 ± 0,0 s | +11% | -5% |
| Lâmina mágica | sustentado | 100% [99–100] | 6,3 ± 0,0 s | 6,3 ± 0,0 s | +17% | +0% |
| Generalista | ruptura | 100% [99–100] | 6,3 ± 0,1 s | 6,0 ± 0,1 s | +17% | -0% |

**Contra o melhor** (denominador do contrato): 3 de 8 perfis a ≤ 15%. Fora: Força (+32%), Tanque (+34%), Leitor (PER) (+29%), Lâmina mágica (+17%), Generalista (+17%).

## 4. Nível 100 (camada 10, s = 1,09^9, atributos até 60, até 2 elementos)

Busca: as 3 melhores armas do perfil no nível 15 × (cada elemento + cada par de elementos). Constructo da camada 10, jogador médio, melhor política do nível 15.

| Perfil | Atributos | Arma · elementos | Boneco ÷ s | Vitória | Tempo ± IC | Δ vs melhor | Sem energia |
|---|---|---|---|---|---|---|---|
| Força | FOR60 VIG60 | espada_curta · fogo | 193,4 | 100% | 6,4 ± 0,1 s | +31% | 0% |
| Destreza | FOR35 DES60 VIG35 | espada_curta · fogo | 229,7 | 100% | 5,4 ± 0,1 s | +11% | 0% |
| Força+Destreza | FOR60 DES60 VIG15 | espada_curta · fogo | 238,9 | 100% | 5,1 ± 0,1 s | +5% | 0% |
| Tanque | FOR50 VIG60 | espada_curta · fogo | 188,6 | 100% | 6,6 ± 0,1 s | +36% | 0% |
| Leitor (PER) | DES55 PER60 | dois_machados · fogo | 215,1 | 100% | 5,3 ± 0,1 s | +9% | 0% |
| Mago | VIG15 POT60 CON60 | espada_curta · fogo+agua | 191,0 | 100% | 4,8 ± 0,1 s | +0% | 0% |
| Lâmina mágica | FOR50 DES20 POT50 | dois_machados · fogo | 233,4 | 100% | 5,0 ± 0,1 s | +3% | 0% |
| Generalista | FOR30 DES30 VIG30 POT30 CON30 PER30 | espada_curta · fogo+vento | 237,4 | 100% | 6,2 ± 0,1 s | +29% | 0% |

Nível 100: 5 de 8 perfis a ≤ 15% do melhor.

### Ensaio: Mago no nível 100 em luta longa (constructo com vida ×5, 60 s)

| Versão | DPS ÷ s | Sem energia (<15) |
|---|---|---|
| Atual | 174,7 | 9% |
| + Pulso básico (K0,70, 1,0 s, custo 0) | 176,2 | 8% |
| + RegE extra 4·rCON·rPOT | 189,9 | 6% |

## 5. Chefe de Andar AO.1 (camada 1, vida 120.000 sem fator, postura 1.000, armadura 50)

Ataques do contrato: Golpe pesado 300/8 s (frontal, quem tem a ameaça; esquiva, parry ou bloqueio) · Varredura 220/12 s (todos os corpo a corpo; só se evita indo para as costas) · Investida 320/20 s (um jogador; sair da linha; colisão com a âncora 1 = exausto 6 s) · Chuva 180/25 s (5 círculos) · Grito na fase 2 a cada 30 s (cortado por uma técnica de Ruptura pronta; senão +20% de dano recebido por 10 s) · fúria (−20% nos intervalos) só com as âncoras feitas · 25% invulnerável até a última âncora · 3 âncoras × 4 intervenções, cada rota no máximo 2 por âncora · adds a cada âncora (2 constructos + 1 elemental) · Leitura do grupo: quebra-guarda contra bloqueio e golpe atrasado contra esquiva · 5 poções e 2 reanimações por jogador (canal de 4 s).

### 5.1 Grupo misto (Tanque·escudo·terra, Força·machado grande·fogo, Destreza·duas espadas·vento, Leitor·arco·raio, Mago·desarmado·gelo, Lâmina mágica·espada longa·água)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados |
|---|---|---|---|---|---|---|---|---|---|---|
| Misto, médio | 26/40 = 65% [50–78] | 3,6 ± 0,1 min | 3,9 min | derrota 14, vitória 26 | 4,6 | 0,0 | 17,7 | 451 | 11% | 5,1/5,2 |
| Misto, bom | 40/40 = 100% [91–100] | 3,0 ± 0,0 min | 3,0 min | vitória 40 | 1,1 | 0,0 | 9,8 | 329 | 13% | 3,7/3,7 |

Dano por jogador no grupo misto médio:

| Perfil | DPS ÷ s | Recebido/min ÷ s | Quedas |
|---|---|---|---|
| Tanque | 45,8 | 582 | 1,00 |
| Força | 66,2 | 560 | 0,83 |
| Destreza | 95,8 | 532 | 0,95 |
| Leitor (PER) | 128,9 | 307 | 0,48 |
| Mago | 122,6 | 277 | 0,35 |
| Lâmina mágica | 95,7 | 448 | 0,98 |

### 5.2 Grupos de 6 cópias (rotas das âncoras dependem da composição)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 × Força (machado_grande, fogo) | 0/20 = 0% [0–16] | — ± 0,0 min | 2,7 min | derrota 12, sem rota 8 | 5,3 | 0,2 | 23,3 | 811 | 6% | 0,0/3,2 |
| 6 × Destreza (duas_espadas, vento) | 0/20 = 0% [0–16] | — ± 0,0 min | 2,0 min | sem rota 20 | 0,4 | 0,0 | 11,0 | 583 | 9% | 2,0/2,0 |
| 6 × Leitor (PER) (arco, raio) | 6/20 = 30% [15–52] | 3,4 ± 0,4 min | 6,8 min | derrota 14, vitória 6 | 5,3 | 0,4 | 15,2 | 241 | 3% | 11,8/11,9 |
| 6 × Tanque (espada_e_escudo, terra) | 0/20 = 0% [0–16] | — ± 0,0 min | 2,2 min | sem rota 20 | 0,1 | 0,0 | 9,3 | 470 | 8% | 2,0/2,0 |

### 5.3 Ensaios propostos (grupo misto, jogador médio)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados |
|---|---|---|---|---|---|---|---|---|---|---|
| Grok: reserva 600 → 900 | 39/40 = 98% [87–100] | 3,3 ± 0,1 min | 3,3 min | vitória 39, derrota 1 | 2,5 | 0,0 | 19,4 | 487 | 12% | 4,2/4,2 |
| Grok: bloqueio deixa passar 15% | 29/40 = 73% [57–84] | 3,6 ± 0,1 min | 3,7 min | vitória 29, derrota 11 | 4,3 | 0,0 | 17,5 | 462 | 11% | 4,9/5,0 |
| ChatGPT: escudo deixa passar 20% | 32/40 = 80% [65–90] | 3,7 ± 0,2 min | 3,8 min | vitória 32, derrota 8 | 3,9 | 0,0 | 17,0 | 443 | 11% | 5,0/5,1 |
| Grok: dano do chefe −40% | 40/40 = 100% [91–100] | 3,0 ± 0,0 min | 3,0 min | vitória 40 | 0,6 | 0,0 | 9,0 | 320 | 13% | 3,6/3,6 |
| Grok: −40% + reserva 900 + 15% | 40/40 = 100% [91–100] | 3,0 ± 0,0 min | 3,0 min | vitória 40 | 0,0 | 0,0 | 8,7 | 307 | 14% | 3,2/3,2 |

### 5.4 Chefes sintéticos (testes de pressão, não são o AO.1)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados |
|---|---|---|---|---|---|---|---|---|---|---|
| Sintético v2: 300/2,6 s (um) + 200/10 s (todos) | 0/40 = 0% [0–9] | — ± 0,0 min | 2,5 min | derrota 40 | 6,0 | 0,0 | 20,0 | 780 | 0% | 0,0/0,0 |
| Sintético do ChatGPT: 300/8 s + 120/20 s | 40/40 = 100% [91–100] | 2,4 ± 0,0 min | 2,4 min | vitória 40 | 0,3 | 0,0 | 4,0 | 252 | 0% | 0,0/0,0 |

Tempo-alvo do contrato: 6–10 min (estimativa AI.6 ≈ 5,8 min sem erros).

## 6. Técnicas por papel (cálculo do motor: pesos de atributo, fases e armadura 50)

Regra (ChatGPT, loop 4/5): técnica de **Execução** sem condição precisa de dano ≥ 1,20 × DPS do ataque leve × tempo ocupado. Ruptura, Contenção e Sustentação não entram na regra (o valor delas é controle, impacto ou apoio). Área contada com 1 alvo; DoT e zona incluídos.

Execução sem condição: 66 técnicas; **36 abaixo de 1,20×**. Fora da regra: Ruptura 31, Contenção 15, Sustentação 2.

| Técnica (Execução) | Árvore | Dano ÷ (DPS leve × tempo), 1 alvo | Falta para 1,20 | Com 3 alvos (só área) |
|---|---|---|---|---|
| Tempestade de machados | machado_pequeno | 0,33 | +268% | 0,98 |
| Brasa persistente | fogo | 0,41 | +192% | — |
| Tiro em leque | arco | 0,54 | +121% | 1,63 ✔ |
| Arremesso duplo | machado_pequeno | 0,70 | +72% | 1,39 ✔ |
| Raio em cadeia | raio | 0,74 | +62% | 2,22 ✔ |
| Lâmina projetada | katana | 0,79 | +51% | — |
| Dança de lâminas | duas_espadas | 0,79 | +51% | — |
| Área de fogo | fogo | 0,82 | +46% | 2,47 ✔ |
| Área de gelo | gelo | 0,82 | +46% | 2,47 ✔ |
| Área de raio | raio | 0,82 | +46% | 2,47 ✔ |
| Bola elétrica | raio | 0,82 | +46% | 2,47 ✔ |
| Área de terra | terra | 0,82 | +46% | 2,47 ✔ |
| Área de água | agua | 0,82 | +46% | 2,47 ✔ |
| Área de vento | vento | 0,82 | +46% | 2,47 ✔ |
| Supernova | fogo | 0,90 | +34% | 2,69 ✔ |
| Gume duplo elemental | duas_espadas | 0,96 | +25% | — |
| Machado imbuído | machado_pequeno | 0,97 | +24% | 1,94 ✔ |
| Moedor | dois_machados | 1,01 | +19% | — |
| Giro pesado | machado_grande | 1,02 | +18% | 3,05 ✔ |
| Tempestade | duas_espadas | 1,03 | +16% | 3,09 ✔ |
| Rodopio | duas_katanas | 1,04 | +16% | 3,11 ✔ |
| Corte em X | dois_machados | 1,10 | +10% | — |
| Corte de avanço | espada_longa | 1,11 | +8% | — |
| Corte que segue | duas_katanas | 1,11 | +8% | — |
| Palma elemental | desarmado | 1,12 | +7% | — |
| Lâmina imbuída | espada_longa | 1,12 | +7% | — |
| Projétil de fogo | fogo | 1,15 | +4% | — |
| Projétil de gelo | gelo | 1,15 | +4% | — |
| Projétil de raio | raio | 1,15 | +4% | — |
| Projétil de terra | terra | 1,15 | +4% | — |
| Projétil de água | agua | 1,15 | +4% | — |
| Saque do vazio | katana | 1,16 | +4% | 3,47 ✔ |
| Lançamento curvo | machado_pequeno | 1,17 | +2% | — |
| Passo de sombra | espada_curta | 1,18 | +2% | — |
| Projétil de vento | vento | 1,19 | +1% | — |
| Fio elemental | duas_katanas | 1,19 | +0% | — |

## 7. O que este simulador ainda não avalia (fora das conclusões)

- Leitura do grupo "contra distância" (puxão) e "contra interrupção" (conjuração dupla); só quebra-guarda e golpe atrasado entram.
- Fadiga 100 do chefe (o contrato não define o efeito em números).
- Regressão das âncoras na fase 2 (a estratégia simulada faz uma âncora por vez, sem deixá-la parcial e sozinha).
- Guardas elementais da âncora 3 atacando quem está lá (a rota de Controle só custa tempo).
- Passivas de texto, nós-chave, Artes, afixos e fabricação.
- Peso da arma: fixado em 3 para todas.
- Deslocamento real: tarefas das âncoras custam 3 s de ida; ninguém é atingido por Varredura/Golpe pesado longe do chefe.
- Reação elemental só entre elementos do mesmo jogador (como manda o 07); combinações entre jogadores não existem no contrato.

---
Gerado em 25 s.