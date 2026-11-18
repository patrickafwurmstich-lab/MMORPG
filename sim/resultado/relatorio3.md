# Simulador de equilíbrio v3.1 — relatório

Dados `38a6a6f7f2` · 102 fichas revisadas · sementes fixas (mulberry32) · triagem 100 lutas, finalistas 400, chefe 40 tentativas (grupo misto) e 20 (grupos iguais) · IC de 95%: Wilson (vitórias) e t de Student (tempo) · escala s = 1,09^(camada−1) · **vidas do contrato, sem fator de correção** (decisão das duas IAs no loop 5).

**v3.1 (loop 6):** ponto fraco ×1,5 e Brasa ×1,08 voltaram a valer (estavam dentro de um comentário); zona só é lançada no fim da execução; Ritmo/Fluxo/Frenesi/Marca só ganham no acerto; Golpe de Ímpeto com principal e continuação separados (pesos de leve na continuação, impacto próprio, +8% ao gastar ≥ 70); contato elemental por alvo E por jogador, registra B depois da reação, impacto de reação com FOR/CON, raio aproximado, Lava em 4 tiques, formas sem efeito numérico ficam fora; Gelo = +15% na recuperação (nada no chefe); Terra = barreira de postura 20 (máx. 40, 4 s); Grito ×1,2 por 10 s, só na fase 2, cortado só por técnica que interrompe, paga e acerta dentro de 1,2 s; fúria exige âncoras E vida ≤ 25%; Frenesi acelera (+3%/acerto, teto 1,45); duas katanas 0,24 s; saque de resposta exige bainha (0,4 s sem atacar) e a carga vem do tempo guardado; Flanco no chefe só com ele em ataque/abertura; aggro D.5 (decai e^(−Δt/8), +2×postura, troca com +20%); Leitura E.3 (≥ 20 oportunidades, aviso 5 s, ≤ 25% dos golpes, 30 s, papel pesa metade); rotas recalculadas com quem está de pé; Precisão aberta a todos (arco/PER ≥ 15 só aumenta a chance); poção guarda reserva para 1 reanimação (salvo < 20% de vida); busca escolhe pelo constructo (pré-filtro no boneco); ensaios do chefe com as mesmas sementes.

Mudanças do v2 para o v3: fases J.1 com cancelamento defensivo só nos últimos 40% da recuperação; golpes presos à ação; aviso entra na decisão; motor único (boneco = inimigo que não ataca); impacto dividido entre acertos; defesas do núcleo D.1 (sem +6 de Ímpeto, escudo −25% uma vez, parry falho 15R + 0,35 s, custo de esquiva com peso); armadura do jogador (classes L.2) depois da fração que atravessa; reanimação canalizada; chefe AO.1 real com âncoras, rotas, cotas, adds, Grito, fúria e Leitura (bloqueio/esquiva); condições postura<30/<20; Juízo só com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção; reação com forma preparada e contato por alvo.

## 1. Calibração (contrato AI: ≈ 70 de dano por segundo no perfil de referência)

Perfil de referência (nível 15, com afinidade): FOR 20 · DES 15 · VIG 10 · espada longa · sem elemento · armadura média.

| Medida | Como | DPS ÷ s | Tempo ofensivo real |
|---|---|---|---|
| Boneco | 90 s, mesmo motor, inimigo sem ataques | 154,8 | 100% por definição |
| Abstrato | boneco × 0,55 (uma vez) | **85,1** | — |
| Por eventos, fera | 60 s, vida ×50, ataques reais | **113,8** | 65% |
| Por eventos, constructo | 60 s, vida ×20, ataques reais | **122,1** | 73% |

| Inimigo | Vida do contrato: tempo ± IC | Vitória | Com vida ×1,30 (ensaio do Grok) | Faixa do contrato |
|---|---|---|---|---|
| Fera (650) | 4,0 ± 0,1 s | 100% | 5,3 s | 8–12 s |
| Constructo (1.100) | 7,4 ± 0,1 s | 100% | 9,2 s | 14–18 s |

### Ensaios de calibração (as duas propostas do loop 6)

| Proposta | DPS por eventos (constructo) | Fera | Constructo | Contrato |
|---|---|---|---|---|
| Atual (P_arma 110, vidas do contrato) | 122,1 | 4,0 s | 7,4 s | 8–12 / 14–18 s |
| ChatGPT: P_arma 110 → 65 | 72,1 | 7,0 ± 0,1 s | 12,8 ± 0,1 s | 8–12 / 14–18 s |
| Grok: vidas ×1,45 | 122,1 | 5,3 ± 0,1 s | 10,6 ± 0,1 s | 8–12 / 14–18 s |

Leitura: o tempo ofensivo real medido agora fica entre 65% e 73% (no v2 o indicador somava ações iniciadas e passava de 100%). O DPS por eventos ainda fica acima de 70, então as lutas comuns ficam mais curtas que o contrato. **Nenhum fator foi aplicado**: fica registrado como divergência a decidir com telemetria do protótipo.

## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado, vidas do contrato)

| Arma | Boneco DPS | Δ vs média | Fera: tempo ± IC | Constructo: vitória [IC] | Constructo: tempo ± IC | Tempo ofensivo | Dano recebido/min ÷ s |
|---|---|---|---|---|---|---|---|
| desarmado | 152,2 | -8% | 2,9 ± 0,0 s | 100% [96–100] | 6,8 ± 0,1 s | 92% | 441 |
| espada_curta | 179,9 | +8% | 3,5 ± 0,1 s | 100% [96–100] | 6,4 ± 0,1 s | 89% | 651 |
| espada_longa | 166,9 | +1% | 3,5 ± 0,1 s | 100% [96–100] | 6,9 ± 0,1 s | 89% | 560 |
| duas_espadas | 170,1 | +3% | 3,1 ± 0,0 s | 100% [96–100] | 7,2 ± 0,1 s | 85% | 818 |
| espada_e_escudo | 151,2 | -9% | 3,0 ± 0,0 s | 100% [96–100] | 7,0 ± 0,1 s | 90% | 562 |
| katana | 174,6 | +5% | 3,4 ± 0,1 s | 100% [96–100] | 6,0 ± 0,1 s | 89% | 724 |
| duas_katanas | 179,4 | +8% | 2,5 ± 0,0 s | 100% [96–100] | 6,0 ± 0,2 s | 87% | 881 |
| machado_grande | 128,3 | -23% | 5,4 ± 0,1 s | 100% [96–100] | 8,6 ± 0,2 s | 91% | 653 |
| machado_pequeno | 164,5 | -1% | 3,2 ± 0,0 s | 100% [96–100] | 6,6 ± 0,1 s | 91% | 523 |
| dois_machados | 198,9 | +20% | 2,4 ± 0,0 s | 100% [96–100] | 5,4 ± 0,1 s | 90% | 618 |
| arco | 158,3 | -5% | 4,8 ± 0,1 s | 100% [96–100] | 7,7 ± 0,1 s | 85% | 801 |

Fora de ±15% da média no boneco: machado_grande, dois_machados.

### Ensaio: Machado grande (as três cargas e as propostas)

| Versão | Boneco DPS | Δ vs média | Constructo: tempo |
|---|---|---|---|
| Carga 1 (+0,5 s) | 127,4 | -23% | 7,5 s |
| Carga 2 (+1,0 s) | 128,3 | -23% | 8,6 s |
| Carga 3 (+1,5 s) | 131,2 | -21% | 7,5 s |
| ChatGPT: carga 2 = 2,40 s e carga 3 = 2,75 s (usa carga 3) | 144,8 | -13% | 7,5 s |
| ChatGPT: idem, usando carga 2 | 135,5 | -18% | 7,4 s |
| Grok: pesado 1,70 → 1,45 s (carga 2) | 136,4 | -18% | 7,4 s |

## 3. Perfis × 4 políticas (nível 15, camada 1)

Busca igual para todos: as 11 armas × (sem elemento + cada um dos 6); as 6 melhores no boneco vão para 20 lutas contra o constructo e fica a de menor tempo. No nível 15 só existe 1 elemento (o 2º abre no nível 30).

| Perfil | Arma · elemento (busca) | Boneco | Política | Constructo: vitória | Tempo | Quedas | Sem energia | Básicos forçados |
|---|---|---|---|---|---|---|---|---|
| Força | katana · fogo | 175,6 | sustentado | 100% | 6,6 s | 0,00 | 0% | 0% |
| Força | katana · fogo | 175,6 | explosao | 100% | 6,6 s | 0,00 | 0% | 0% |
| Força | katana · fogo | 175,6 | ruptura | 100% | 7,5 s | 0,00 | 0% | 0% |
| Força | katana · fogo | 175,6 | defensiva | 100% | 6,7 s | 0,00 | 0% | 0% |
| Destreza | dois_machados · — | 189,4 | sustentado | 100% | 5,5 s | 0,00 | 0% | 0% |
| Destreza | dois_machados · — | 189,4 | explosao | 100% | 5,5 s | 0,00 | 0% | 0% |
| Destreza | dois_machados · — | 189,4 | ruptura | 100% | 6,3 s | 0,00 | 0% | 5% |
| Destreza | dois_machados · — | 189,4 | defensiva | 100% | 6,1 s | 0,00 | 0% | 1% |
| Força+Destreza | dois_machados · — | 197,2 | sustentado | 100% | 5,4 s | 0,00 | 0% | 0% |
| Força+Destreza | dois_machados · — | 197,2 | explosao | 100% | 5,4 s | 0,00 | 0% | 0% |
| Força+Destreza | dois_machados · — | 197,2 | ruptura | 100% | 5,9 s | 0,00 | 0% | 5% |
| Força+Destreza | dois_machados · — | 197,2 | defensiva | 100% | 5,9 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | sustentado | 100% | 7,2 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | explosao | 100% | 7,2 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | ruptura | 100% | 7,8 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 180,3 | defensiva | 100% | 7,2 s | 0,00 | 0% | 0% |
| Leitor (PER) | dois_machados · — | 183,8 | sustentado | 100% | 6,7 s | 0,00 | 0% | 9% |
| Leitor (PER) | dois_machados · — | 183,8 | explosao | 100% | 6,7 s | 0,00 | 0% | 9% |
| Leitor (PER) | dois_machados · — | 183,8 | ruptura | 100% | 6,9 s | 0,00 | 0% | 15% |
| Leitor (PER) | dois_machados · — | 183,8 | defensiva | 100% | 6,8 s | 0,00 | 0% | 0% |
| Mago | espada_curta · fogo | 168,1 | sustentado | 100% | 5,8 s | 0,00 | 0% | 0% |
| Mago | espada_curta · fogo | 168,1 | explosao | 100% | 5,8 s | 0,00 | 1% | 0% |
| Mago | espada_curta · fogo | 168,1 | ruptura | 100% | 7,9 s | 0,00 | 0% | 0% |
| Mago | espada_curta · fogo | 168,1 | defensiva | 100% | 5,8 s | 0,00 | 0% | 0% |
| Lâmina mágica | dois_machados · — | 181,8 | sustentado | 100% | 5,8 s | 0,00 | 0% | 0% |
| Lâmina mágica | dois_machados · — | 181,8 | explosao | 100% | 5,8 s | 0,00 | 0% | 0% |
| Lâmina mágica | dois_machados · — | 181,8 | ruptura | 100% | 6,4 s | 0,00 | 0% | 4% |
| Lâmina mágica | dois_machados · — | 181,8 | defensiva | 100% | 6,5 s | 0,00 | 0% | 1% |
| Generalista | espada_curta · fogo | 186,1 | sustentado | 100% | 6,2 s | 0,00 | 0% | 0% |
| Generalista | espada_curta · fogo | 186,1 | explosao | 100% | 6,2 s | 0,00 | 0% | 0% |
| Generalista | espada_curta · fogo | 186,1 | ruptura | 100% | 8,0 s | 0,00 | 0% | 0% |
| Generalista | espada_curta · fogo | 186,1 | defensiva | 100% | 6,2 s | 0,00 | 0% | 0% |

### Finalistas (melhor política de cada perfil, 400 lutas, constructo)

| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: tempo ± IC | Δ vs melhor | Δ vs mediana |
|---|---|---|---|---|---|---|
| Força | sustentado | 100% [99–100] | 6,7 ± 0,1 s | 6,6 ± 0,1 s | +23% | +8% |
| Destreza | sustentado | 100% [99–100] | 5,5 ± 0,0 s | 5,4 ± 0,0 s | +1% | -11% |
| Força+Destreza | sustentado | 100% [99–100] | 5,4 ± 0,0 s | 5,4 ± 0,0 s | +0% | -12% |
| Tanque | defensiva | 100% [99–100] | 7,1 ± 0,1 s | 7,2 ± 0,1 s | +31% | +16% |
| Leitor (PER) | sustentado | 100% [99–100] | 6,7 ± 0,1 s | 6,6 ± 0,1 s | +22% | +8% |
| Mago | explosao | 100% [99–100] | 5,8 ± 0,1 s | 5,8 ± 0,1 s | +7% | -6% |
| Lâmina mágica | sustentado | 100% [99–100] | 5,9 ± 0,0 s | 6,0 ± 0,0 s | +8% | -5% |
| Generalista | defensiva | 100% [99–100] | 6,2 ± 0,0 s | 6,2 ± 0,1 s | +13% | +0% |

**Contra o melhor** (denominador do contrato): 5 de 8 perfis a ≤ 15%. Fora: Força (+23%), Tanque (+31%), Leitor (PER) (+22%).

## 4. Nível 100 (camada 10, s = 1,09^9, atributos até 60, até 2 elementos)

Busca: as 3 melhores armas do perfil no nível 15 × (cada elemento + cada par de elementos). Constructo da camada 10, jogador médio, melhor política do nível 15.

| Perfil | Atributos | Arma · elementos | Boneco ÷ s | Vitória | Tempo ± IC | Δ vs melhor | Sem energia |
|---|---|---|---|---|---|---|---|
| Força | FOR60 VIG60 | dois_machados · fogo | 200,8 | 100% | 5,9 ± 0,1 s | +38% | 0% |
| Destreza | FOR35 DES60 VIG35 | dois_machados · fogo | 229,9 | 100% | 4,4 ± 0,1 s | +1% | 0% |
| Força+Destreza | FOR60 DES60 VIG15 | dois_machados · fogo | 242,8 | 100% | 4,3 ± 0,1 s | +0% | 0% |
| Tanque | FOR50 VIG60 | dois_machados · fogo+vento | 194,9 | 100% | 6,5 ± 0,1 s | +51% | 0% |
| Leitor (PER) | DES55 PER60 | dois_machados · fogo | 207,4 | 100% | 5,2 ± 0,1 s | +21% | 0% |
| Mago | VIG15 POT60 CON60 | espada_curta · fogo | 187,5 | 100% | 4,5 ± 0,1 s | +6% | 0% |
| Lâmina mágica | FOR50 DES20 POT50 | dois_machados · fogo | 241,5 | 100% | 4,9 ± 0,1 s | +14% | 0% |
| Generalista | FOR30 DES30 VIG30 POT30 CON30 PER30 | dois_machados · fogo+agua | 245,7 | 100% | 5,0 ± 0,1 s | +17% | 0% |

Nível 100: 4 de 8 perfis a ≤ 15% do melhor.

### Ensaio: Mago no nível 100 em luta longa (constructo com vida ×5, 60 s)

| Versão | DPS ÷ s | Sem energia (<15) |
|---|---|---|
| Atual | 176,8 | 10% |
| + Pulso básico (K0,70, 1,0 s, custo 0) | 177,2 | 10% |
| + RegE extra 4·rCON·rPOT | 180,2 | 6% |

## 4b. Ensaio: pacote de conteúdo do Grok (Fogo −30 → −18, Flanco +30% → +20%, Machado grande pT 1,40 / pK 2,05 / lK 0,92)

| Arma | Boneco (antes) | Boneco (pacote) | Δ vs média (pacote) |
|---|---|---|---|
| desarmado | 152,2 | 152,2 | -9% |
| espada_curta | 179,9 | 174,4 | +5% |
| espada_longa | 166,9 | 166,9 | +0% |
| duas_espadas | 170,1 | 170,1 | +2% |
| espada_e_escudo | 151,2 | 151,2 | -9% |
| katana | 174,6 | 174,6 | +5% |
| duas_katanas | 179,4 | 179,4 | +8% |
| machado_grande | 128,3 | 145,0 | -13% |
| machado_pequeno | 164,5 | 164,5 | -1% |
| dois_machados | 198,9 | 198,9 | +19% |
| arco | 158,3 | 158,3 | -5% |

| Perfil | Arma · elemento escolhidos | Constructo: tempo | Δ vs melhor |
|---|---|---|---|
| Força | dois_machados · — | 7,1 ± 0,1 s | +30% |
| Destreza | dois_machados · — | 5,5 ± 0,1 s | +1% |
| Força+Destreza | dois_machados · — | 5,4 ± 0,1 s | +0% |
| Tanque | dois_machados · — | 7,4 ± 0,2 s | +36% |
| Leitor (PER) | dois_machados · — | 6,6 ± 0,1 s | +22% |
| Mago | katana · fogo | 6,5 ± 0,1 s | +19% |
| Lâmina mágica | dois_machados · — | 5,9 ± 0,1 s | +9% |
| Generalista | espada_curta · fogo | 6,7 ± 0,1 s | +23% |

Com o pacote: 3 de 8 perfis a ≤ 15% do melhor; elementos escolhidos: nenhum, fogo.

## 5. Chefe de Andar AO.1 (camada 1, vida 120.000 sem fator, postura 1.000, armadura 50)

Ataques do contrato: Golpe pesado 300/8 s (frontal, quem tem a ameaça; esquiva, parry ou bloqueio) · Varredura 220/12 s (todos os corpo a corpo; só se evita indo para as costas) · Investida 320/20 s (um jogador; sair da linha; colisão com a âncora 1 = exausto 6 s) · Chuva 180/25 s (5 círculos) · Grito na fase 2 a cada 30 s (cortado por uma técnica de Ruptura pronta; senão +20% de dano recebido por 10 s) · fúria (−20% nos intervalos) só com as âncoras feitas · 25% invulnerável até a última âncora · 3 âncoras × 4 intervenções, cada rota no máximo 2 por âncora · adds a cada âncora (2 constructos + 1 elemental) · Leitura do grupo: quebra-guarda contra bloqueio e golpe atrasado contra esquiva · 5 poções e 2 reanimações por jogador (canal de 4 s).

### 5.1 Grupo misto (Tanque·escudo·terra, Força·machado grande·fogo, Destreza·duas espadas·vento, Leitor·arco·raio, Mago·desarmado·gelo, Lâmina mágica·espada longa·água)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Misto, médio | 21/40 = 53% [37–67] | 3,4 ± 0,2 min | 3,7 min | vitória 21, derrota 19 | 5,2 | 0,8 | 16,8 | 479 | 11% | 1,6/2,7 | 4,4 | 52% |
| Misto, bom | 40/40 = 100% [91–100] | 3,0 ± 0,0 min | 3,0 min | vitória 40 | 1,1 | 0,3 | 7,5 | 336 | 13% | 1,5/2,0 | 0,9 | 53% |

Dano por jogador no grupo misto médio:

| Perfil | DPS ÷ s | Recebido/min ÷ s | Quedas |
|---|---|---|---|
| Tanque | 94,1 | 474 | 0,50 |
| Força | 73,2 | 543 | 0,68 |
| Destreza | 100,2 | 539 | 0,88 |
| Leitor (PER) | 107,3 | 448 | 1,18 |
| Mago | 124,1 | 407 | 0,68 |
| Lâmina mágica | 70,2 | 463 | 1,28 |

### 5.2 Grupos de 6 cópias (rotas das âncoras dependem da composição)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 × Força (machado_grande, fogo) | 0/20 = 0% [0–16] | — ± 0,0 min | 2,8 min | derrota 14, sem rota 6 | 5,4 | 0,3 | 21,8 | 762 | 12% | 0,0/3,0 | 5,0 | 51% |
| 6 × Destreza (duas_espadas, vento) | 11/20 = 55% [34–74] | 3,2 ± 0,2 min | 3,3 min | derrota 9, vitória 11 | 5,0 | 0,7 | 16,3 | 583 | 12% | 0,0/2,4 | 4,3 | 52% |
| 6 × Leitor (PER) (arco, raio) | 19/20 = 95% [76–99] | 3,7 ± 0,4 min | 3,8 min | vitória 19, derrota 1 | 2,6 | 1,0 | 10,2 | 310 | 6% | 2,0/2,0 | 1,6 | 43% |
| 6 × Tanque (espada_e_escudo, terra) | 19/20 = 95% [76–99] | 3,5 ± 0,2 min | 3,6 min | vitória 19, derrota 1 | 1,7 | 0,1 | 17,3 | 486 | 13% | 0,4/2,8 | 1,6 | 53% |

### 5.3 Ensaios (grupo misto, jogador médio, **mesmas sementes da linha base**)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Linha base (repete 5.1) | 21/40 = 53% [37–67] | 3,4 ± 0,2 min | 3,7 min | vitória 21, derrota 19 | 5,2 | 0,8 | 16,8 | 479 | 11% | 1,6/2,7 | 4,4 | 52% |
| Poção sem guardar reserva | 23/40 = 57% [42–71] | 3,5 ± 0,2 min | 3,7 min | vitória 23, derrota 17 | 4,5 | 0,2 | 18,1 | 474 | 11% | 1,7/2,7 | 4,3 | 53% |
| Grok: reserva 900 | 37/40 = 93% [80–97] | 3,3 ± 0,1 min | 3,4 min | vitória 37, derrota 3 | 3,2 | 0,6 | 19,0 | 505 | 12% | 1,7/2,3 | 2,6 | 53% |
| Grok: bloqueio 15% + área 40% bloqueável | 24/40 = 60% [45–74] | 3,4 ± 0,2 min | 3,7 min | vitória 24, derrota 16 | 4,7 | 0,6 | 16,2 | 467 | 11% | 1,7/2,7 | 4,0 | 52% |
| ChatGPT: escudo 20% | 23/40 = 57% [42–71] | 3,5 ± 0,2 min | 3,7 min | vitória 23, derrota 17 | 5,1 | 0,8 | 16,8 | 477 | 11% | 1,6/2,7 | 4,3 | 52% |
| ChatGPT: P_arma 65, dano do chefe 100% | 0/40 = 0% [0–9] | — ± 0,0 min | 4,4 min | derrota 40 | 7,1 | 1,1 | 18,8 | 459 | 9% | 1,6/4,1 | 5,9 | 50% |
| ChatGPT: P_arma 65, dano do chefe 75% | 3/40 = 8% [3–20] | 5,7 ± 1,2 min | 5,5 min | derrota 37, vitória 3 | 6,2 | 0,4 | 19,4 | 351 | 7% | 2,6/4,7 | 5,8 | 52% |
| ChatGPT: P_arma 65, dano do chefe 60% | 31/40 = 78% [62–88] | 5,6 ± 0,2 min | 5,8 min | vitória 31, derrota 9 | 4,1 | 0,2 | 16,9 | 297 | 7% | 2,7/3,9 | 3,9 | 53% |
| ChatGPT: P_arma 65, dano do chefe 50% | 40/40 = 100% [91–100] | 5,2 ± 0,1 min | 5,2 min | vitória 40 | 1,8 | 0,1 | 12,8 | 267 | 8% | 2,6/3,5 | 1,8 | 53% |
| Grok: pacote (vida 175 mil, dano −33%, reserva 900, reanimação 50 fixos, bloqueio 15%, área 40%) | 40/40 = 100% [91–100] | 4,1 ± 0,0 min | 4,1 min | vitória 40 | 2,1 | 1,9 | 14,7 | 354 | 10% | 2,4/3,0 | 0,0 | 53% |

### 5.4 Chefes sintéticos (testes de pressão, não são o AO.1)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sintético v2: 300/2,6 s (um) + 200/10 s (todos) | 0/40 = 0% [0–9] | — ± 0,0 min | 2,4 min | derrota 40 | 6,4 | 0,4 | 19,6 | 844 | 0% | 0,0/0,0 | 6,0 | 73% |
| Sintético do ChatGPT: 300/8 s + 120/20 s | 40/40 = 100% [91–100] | 2,4 ± 0,0 min | 2,4 min | vitória 40 | 0,9 | 0,0 | 4,4 | 290 | 0% | 0,0/0,0 | 0,9 | 37% |

Tempo-alvo do contrato: 6–10 min (estimativa AI.6 ≈ 5,8 min sem erros).

## 6. Técnicas por papel (cálculo do motor: pesos de atributo, fases e armadura 50)

Regra (ChatGPT, loop 4/5): técnica de **Execução** sem condição precisa de dano ≥ 1,20 × DPS do ataque leve × tempo ocupado. Ruptura, Contenção e Sustentação não entram na regra (o valor delas é controle, impacto ou apoio). Área contada com 1 alvo; DoT e zona incluídos.

Execução sem condição: 66 técnicas; **16 abaixo de 1,20×**. Fora da regra: Ruptura 31, Contenção 15, Sustentação 2.

Técnicas mágicas medidas no perfil Mago de referência (POT20/CON15/VIG10); físicas no FOR20/DES15/VIG10. Área medida também no número de alvos do projeto (até 6).

| Técnica (Execução) | Árvore | 1 alvo | Falta p/ 1,20 | Nos alvos do projeto | Observação |
|---|---|---|---|---|---|
| Tempestade de machados | machado_pequeno | 0,33 | +268% | 1,96 (6 alvos) ✔ | — |
| Tiro em leque | arco | 0,54 | +121% | 2,71 (5 alvos) ✔ | — |
| Arremesso duplo | machado_pequeno | 0,70 | +72% | 1,39 (2 alvos) ✔ | — |
| Brasa persistente | fogo | 0,73 | +63% | — | marca amplificadora (+8% por 8 s; valor não medido) |
| Dança de lâminas | duas_espadas | 0,79 | +51% | — | — |
| Moedor | dois_machados | 1,01 | +19% | — | mobilidade 3 m (valor não medido) |
| Giro pesado | machado_grande | 1,02 | +18% | 6,11 (6 alvos) ✔ | — |
| Tempestade | duas_espadas | 1,03 | +16% | 6,18 (6 alvos) ✔ | — |
| Rodopio | duas_katanas | 1,04 | +16% | 6,23 (6 alvos) ✔ | — |
| Corte em X | dois_machados | 1,10 | +10% | — | — |
| Corte de avanço | espada_longa | 1,11 | +8% | — | mobilidade 2 m (valor não medido) |
| Corte que segue | duas_katanas | 1,11 | +8% | — | — |
| Saque do vazio | katana | 1,16 | +4% | 6,93 (6 alvos) ✔ | — |
| Lâmina projetada | katana | 1,16 | +4% | — | — |
| Lançamento curvo | machado_pequeno | 1,17 | +2% | — | — |
| Passo de sombra | espada_curta | 1,18 | +2% | — | — |

## 7. O que este simulador ainda não avalia (fora das conclusões)

- Leitura do grupo "contra distância" (puxão) e "contra interrupção" (conjuração dupla); só quebra-guarda e golpe atrasado entram.
- Formas de mistura sem efeito numérico (apoio, ocultar, deslocamento, lentidão) ficam fora da busca; Água (redistribuir reserva) não está no motor.
- Aggro: falta a parcela de dano interceptado e de cura (não há esses eventos no motor).
- Fadiga 100 do chefe (o contrato não define o efeito em números).
- Regressão das âncoras na fase 2 (a estratégia simulada faz uma âncora por vez, sem deixá-la parcial e sozinha).
- Guardas elementais da âncora 3 atacando quem está lá (a rota de Controle só custa tempo).
- Passivas de texto, nós-chave, Artes, afixos e fabricação.
- Peso da arma: fixado em 3 para todas.
- Deslocamento real: tarefas das âncoras custam 3 s de ida; ninguém é atingido por Varredura/Golpe pesado longe do chefe.
- Reação elemental só entre elementos do mesmo jogador (como manda o 07); combinações entre jogadores não existem no contrato.

---
Gerado em 56 s.