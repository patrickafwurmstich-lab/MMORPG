# Simulador de equilíbrio v3.2 — relatório

**v3.2 (loop 7):** Frenesi +1 por acerto original (o extra da técnica, 1× por ação); bloqueio passa pela mesma resolução final do golpe (armadura, Grito ×1,2, barreira de Terra); bainha da katana como estado explícito (guarda 0,4 s ao ver o aviso, carga até 1,2 s, acaba ao atacar ou ser atingido; sem bainha não há saque de resposta); continuação do Ímpeto também recebe +8% ao gastar ≥ 70; Leitura adapta só o 4º, 8º… golpe elegível. Comparação das calibrações em `candidatos.md`.

Dados `38a6a6f7f2` · 102 fichas revisadas · sementes fixas (mulberry32) · triagem 100 lutas, finalistas 400, chefe 40 tentativas (grupo misto) e 20 (grupos iguais) · IC de 95%: Wilson (vitórias) e t de Student (tempo) · escala s = 1,09^(camada−1) · **vidas do contrato, sem fator de correção** (decisão das duas IAs no loop 5).

**v3.1 (loop 6):** ponto fraco ×1,5 e Brasa ×1,08 voltaram a valer (estavam dentro de um comentário); zona só é lançada no fim da execução; Ritmo/Fluxo/Frenesi/Marca só ganham no acerto; Golpe de Ímpeto com principal e continuação separados (pesos de leve na continuação, impacto próprio, +8% ao gastar ≥ 70); contato elemental por alvo E por jogador, registra B depois da reação, impacto de reação com FOR/CON, raio aproximado, Lava em 4 tiques, formas sem efeito numérico ficam fora; Gelo = +15% na recuperação (nada no chefe); Terra = barreira de postura 20 (máx. 40, 4 s); Grito ×1,2 por 10 s, só na fase 2, cortado só por técnica que interrompe, paga e acerta dentro de 1,2 s; fúria exige âncoras E vida ≤ 25%; Frenesi acelera (+3%/acerto, teto 1,45); duas katanas 0,24 s; saque de resposta exige bainha (0,4 s sem atacar) e a carga vem do tempo guardado; Flanco no chefe só com ele em ataque/abertura; aggro D.5 (decai e^(−Δt/8), +2×postura, troca com +20%); Leitura E.3 (≥ 20 oportunidades, aviso 5 s, ≤ 25% dos golpes, 30 s, papel pesa metade); rotas recalculadas com quem está de pé; Precisão aberta a todos (arco/PER ≥ 15 só aumenta a chance); poção guarda reserva para 1 reanimação (salvo < 20% de vida); busca escolhe pelo constructo (pré-filtro no boneco); ensaios do chefe com as mesmas sementes.

Mudanças do v2 para o v3: fases J.1 com cancelamento defensivo só nos últimos 40% da recuperação; golpes presos à ação; aviso entra na decisão; motor único (boneco = inimigo que não ataca); impacto dividido entre acertos; defesas do núcleo D.1 (sem +6 de Ímpeto, escudo −25% uma vez, parry falho 15R + 0,35 s, custo de esquiva com peso); armadura do jogador (classes L.2) depois da fração que atravessa; reanimação canalizada; chefe AO.1 real com âncoras, rotas, cotas, adds, Grito, fúria e Leitura (bloqueio/esquiva); condições postura<30/<20; Juízo só com a condição; DoT em tiques; Ritmo consumido; Fluxo por direção; reação com forma preparada e contato por alvo.

## 1. Calibração (contrato AI: ≈ 70 de dano por segundo no perfil de referência)

Perfil de referência (nível 15, com afinidade): FOR 20 · DES 15 · VIG 10 · espada longa · sem elemento · armadura média.

| Medida | Como | DPS ÷ s | Tempo ofensivo real |
|---|---|---|---|
| Boneco | 90 s, mesmo motor, inimigo sem ataques | 80,9 | 100% por definição |
| Abstrato | boneco × 0,55 (uma vez) | **44,5** | — |
| Por eventos, fera | 60 s, vida ×50, ataques reais | **59,5** | 65% |
| Por eventos, constructo | 60 s, vida ×20, ataques reais | **63,8** | 73% |

| Inimigo | Vida do contrato: tempo ± IC | Vitória | Com vida ×1,30 (ensaio do Grok) | Faixa do contrato |
|---|---|---|---|---|
| Fera (650) | 8,5 ± 0,1 s | 100% | 11,1 s | 8–12 s |
| Constructo (1.100) | 15,1 ± 0,2 s | 100% | 20,6 s | 14–18 s |

### Ensaios de calibração (as duas propostas do loop 6)

| Proposta | DPS por eventos (constructo) | Fera | Constructo | Contrato |
|---|---|---|---|---|
| Atual (P_arma 110, vidas do contrato) | 63,8 | 8,5 s | 15,1 s | 8–12 / 14–18 s |
| ChatGPT: P_arma 110 → 65 | 72,1 | 7,0 ± 0,1 s | 12,8 ± 0,1 s | 8–12 / 14–18 s |
| Grok: vidas ×1,45 | 63,8 | 12,5 ± 0,2 s | 22,6 ± 0,5 s | 8–12 / 14–18 s |

Leitura: o tempo ofensivo real medido agora fica entre 65% e 73% (no v2 o indicador somava ações iniciadas e passava de 100%). O DPS por eventos ainda fica acima de 70, então as lutas comuns ficam mais curtas que o contrato. **Nenhum fator foi aplicado**: fica registrado como divergência a decidir com telemetria do protótipo.

## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado, vidas do contrato)

| Arma | Boneco DPS | Δ vs média | Fera: tempo ± IC | Constructo: vitória [IC] | Constructo: tempo ± IC | Tempo ofensivo | Dano recebido/min ÷ s |
|---|---|---|---|---|---|---|---|
| desarmado | 79,5 | -8% | 8,9 ± 0,2 s | 100% [96–100] | 14,9 ± 0,3 s | 84% | 1.082 |
| espada_curta | 94,0 | +8% | 6,0 ± 0,2 s | 100% [96–100] | 11,4 ± 0,2 s | 89% | 893 |
| espada_longa | 87,2 | +0% | 8,1 ± 0,1 s | 100% [96–100] | 13,3 ± 0,1 s | 87% | 934 |
| duas_espadas | 88,9 | +2% | 8,0 ± 0,1 s | 100% [96–100] | 13,9 ± 0,2 s | 85% | 988 |
| espada_e_escudo | 79,1 | -9% | 8,5 ± 0,1 s | 100% [96–100] | 15,1 ± 0,3 s | 85% | 980 |
| katana | 91,3 | +5% | 6,7 ± 0,1 s | 100% [96–100] | 12,1 ± 0,1 s | 87% | 1.067 |
| duas_katanas | 93,8 | +8% | 6,1 ± 0,1 s | 100% [96–100] | 12,3 ± 0,2 s | 87% | 1.018 |
| machado_grande | 75,8 | -13% | 7,9 ± 0,0 s | 100% [96–100] | 14,0 ± 0,3 s | 91% | 1.027 |
| machado_pequeno | 86,0 | -1% | 8,4 ± 0,1 s | 100% [96–100] | 13,8 ± 0,2 s | 87% | 1.116 |
| dois_machados | 97,5 | +12% | 5,2 ± 0,0 s | 100% [96–100] | 11,6 ± 0,1 s | 88% | 843 |
| arco | 82,8 | -5% | 8,1 ± 0,2 s | 100% [96–100] | 15,6 ± 0,4 s | 81% | 955 |

Fora de ±15% da média no boneco: nenhuma.

### Ensaio: Machado grande (as três cargas e as propostas)

| Versão | Boneco DPS | Δ vs média | Constructo: tempo |
|---|---|---|---|
| Carga 1 (+0,5 s) | 78,3 | -10% | 14,9 s |
| Carga 2 (+1,0 s) | 75,8 | -13% | 14,0 s |
| Carga 3 (+1,5 s) | 78,8 | -9% | 15,9 s |
| ChatGPT: carga 2 = 2,40 s e carga 3 = 2,75 s (usa carga 3) | 91,3 | +5% | 13,5 s |
| ChatGPT: idem, usando carga 2 | 89,2 | +3% | 13,3 s |
| Grok: pesado 1,70 → 1,45 s (carga 2) | 87,3 | +1% | 13,8 s |

## 3. Perfis × 4 políticas (nível 15, camada 1)

Busca igual para todos: as 11 armas × (sem elemento + cada um dos 6); as 6 melhores no boneco vão para 20 lutas contra o constructo e fica a de menor tempo. No nível 15 só existe 1 elemento (o 2º abre no nível 30).

| Perfil | Arma · elemento (busca) | Boneco | Política | Constructo: vitória | Tempo | Quedas | Sem energia | Básicos forçados |
|---|---|---|---|---|---|---|---|---|
| Força | espada_curta · fogo | 94,9 | sustentado | 100% | 12,9 s | 0,00 | 0% | 0% |
| Força | espada_curta · fogo | 94,9 | explosao | 100% | 12,9 s | 0,00 | 0% | 0% |
| Força | espada_curta · fogo | 94,9 | ruptura | 100% | 14,0 s | 0,00 | 0% | 5% |
| Força | espada_curta · fogo | 94,9 | defensiva | 100% | 13,3 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 103,9 | sustentado | 100% | 11,6 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 103,9 | explosao | 100% | 11,6 s | 0,00 | 0% | 0% |
| Destreza | katana · fogo | 103,9 | ruptura | 100% | 12,2 s | 0,00 | 0% | 1% |
| Destreza | katana · fogo | 103,9 | defensiva | 100% | 11,9 s | 0,00 | 0% | 2% |
| Força+Destreza | katana · fogo | 106,6 | sustentado | 100% | 10,9 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 106,6 | explosao | 100% | 10,9 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 106,6 | ruptura | 100% | 11,3 s | 0,00 | 0% | 0% |
| Força+Destreza | katana · fogo | 106,6 | defensiva | 100% | 11,4 s | 0,00 | 0% | 1% |
| Tanque | espada_curta · fogo | 94,3 | sustentado | 100% | 13,1 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 94,3 | explosao | 100% | 13,1 s | 0,00 | 0% | 0% |
| Tanque | espada_curta · fogo | 94,3 | ruptura | 100% | 14,1 s | 0,00 | 0% | 5% |
| Tanque | espada_curta · fogo | 94,3 | defensiva | 100% | 13,4 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 91,6 | sustentado | 100% | 11,7 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 91,6 | explosao | 100% | 11,7 s | 0,00 | 0% | 0% |
| Leitor (PER) | duas_katanas · fogo | 91,6 | ruptura | 100% | 14,5 s | 0,00 | 0% | 1% |
| Leitor (PER) | duas_katanas · fogo | 91,6 | defensiva | 100% | 11,9 s | 0,00 | 0% | 0% |
| Mago | duas_katanas · fogo | 82,5 | sustentado | 100% | 12,2 s | 0,00 | 1% | 0% |
| Mago | duas_katanas · fogo | 82,5 | explosao | 100% | 12,4 s | 0,00 | 1% | 0% |
| Mago | duas_katanas · fogo | 82,5 | ruptura | 100% | 13,7 s | 0,00 | 0% | 0% |
| Mago | duas_katanas · fogo | 82,5 | defensiva | 100% | 12,4 s | 0,00 | 1% | 0% |
| Lâmina mágica | espada_curta · fogo | 102,9 | sustentado | 100% | 11,5 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 102,9 | explosao | 100% | 11,5 s | 0,00 | 0% | 0% |
| Lâmina mágica | espada_curta · fogo | 102,9 | ruptura | 100% | 12,8 s | 0,00 | 0% | 3% |
| Lâmina mágica | espada_curta · fogo | 102,9 | defensiva | 100% | 11,4 s | 0,00 | 0% | 0% |
| Generalista | duas_katanas · fogo | 89,2 | sustentado | 100% | 11,6 s | 0,00 | 0% | 0% |
| Generalista | duas_katanas · fogo | 89,2 | explosao | 100% | 11,8 s | 0,00 | 4% | 0% |
| Generalista | duas_katanas · fogo | 89,2 | ruptura | 100% | 12,6 s | 0,00 | 0% | 0% |
| Generalista | duas_katanas · fogo | 89,2 | defensiva | 100% | 11,7 s | 0,00 | 0% | 0% |

### Finalistas (melhor política de cada perfil, 400 lutas, constructo)

| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: tempo ± IC | Δ vs melhor | Δ vs mediana |
|---|---|---|---|---|---|---|
| Força | sustentado | 100% [99–100] | 13,0 ± 0,1 s | 13,0 ± 0,1 s | +19% | +11% |
| Destreza | explosao | 100% [99–100] | 11,6 ± 0,1 s | 11,6 ± 0,1 s | +6% | -1% |
| Força+Destreza | explosao | 100% [99–100] | 10,9 ± 0,1 s | 11,0 ± 0,1 s | +0% | -7% |
| Tanque | sustentado | 100% [99–100] | 13,1 ± 0,1 s | 13,1 ± 0,1 s | +20% | +12% |
| Leitor (PER) | sustentado | 100% [99–100] | 11,7 ± 0,2 s | 11,0 ± 0,1 s | +7% | +0% |
| Mago | sustentado | 100% [99–100] | 12,5 ± 0,2 s | 11,7 ± 0,1 s | +14% | +6% |
| Lâmina mágica | defensiva | 100% [99–100] | 11,4 ± 0,1 s | 11,3 ± 0,1 s | +4% | -3% |
| Generalista | sustentado | 100% [99–100] | 11,5 ± 0,1 s | 11,3 ± 0,1 s | +5% | -2% |

**Contra o melhor** (denominador do contrato): 6 de 8 perfis a ≤ 15%. Fora: Força (+19%), Tanque (+20%).

## 4. Nível 100 (camada 10, s = 1,09^9, atributos até 60, até 2 elementos)

Busca: as 3 melhores armas do perfil no nível 15 × (cada elemento + cada par de elementos). Constructo da camada 10, jogador médio, melhor política do nível 15.

| Perfil | Atributos | Arma · elementos | Boneco ÷ s | Vitória | Tempo ± IC | Δ vs melhor | Sem energia |
|---|---|---|---|---|---|---|---|
| Força | FOR60 VIG60 | espada_curta · fogo | 101,1 | 100% | 11,5 ± 0,2 s | +32% | 0% |
| Destreza | FOR35 DES60 VIG35 | espada_curta · fogo+gelo | 119,5 | 100% | 9,7 ± 0,1 s | +11% | 0% |
| Força+Destreza | FOR60 DES60 VIG15 | espada_curta · fogo+gelo | 122,3 | 100% | 9,1 ± 0,1 s | +4% | 0% |
| Tanque | FOR50 VIG60 | espada_curta · fogo | 98,6 | 100% | 11,8 ± 0,2 s | +35% | 0% |
| Leitor (PER) | DES55 PER60 | dois_machados · fogo | 111,1 | 100% | 9,7 ± 0,2 s | +11% | 0% |
| Mago | VIG15 POT60 CON60 | espada_curta · fogo | 98,0 | 100% | 10,4 ± 0,3 s | +19% | 0% |
| Lâmina mágica | FOR50 DES20 POT50 | dois_machados · fogo | 125,0 | 100% | 10,1 ± 0,1 s | +16% | 0% |
| Generalista | FOR30 DES30 VIG30 POT30 CON30 PER30 | dois_machados · fogo | 125,6 | 100% | 8,7 ± 0,1 s | +0% | 0% |

Nível 100: 4 de 8 perfis a ≤ 15% do melhor.

### Ensaio: Mago no nível 100 em luta longa (constructo com vida ×5, 60 s)

| Versão | DPS ÷ s | Sem energia (<15) |
|---|---|---|
| Atual | 81,7 | 7% |
| + Pulso básico (K0,70, 1,0 s, custo 0) | 82,5 | 7% |
| + RegE extra 4·rCON·rPOT | 86,1 | 5% |

## 4b. Ensaio: pacote de conteúdo do Grok (Fogo −30 → −18, Flanco +30% → +20%, Machado grande pT 1,40 / pK 2,05 / lK 0,92)

| Arma | Boneco (antes) | Boneco (pacote) | Δ vs média (pacote) |
|---|---|---|---|
| desarmado | 79,5 | 79,5 | -8% |
| espada_curta | 94,0 | 91,2 | +5% |
| espada_longa | 87,2 | 87,2 | +1% |
| duas_espadas | 88,9 | 88,9 | +3% |
| espada_e_escudo | 79,1 | 79,1 | -9% |
| katana | 91,3 | 91,3 | +5% |
| duas_katanas | 93,8 | 93,8 | +8% |
| machado_grande | 75,8 | 75,8 | -13% |
| machado_pequeno | 86,0 | 86,0 | -1% |
| dois_machados | 97,5 | 97,5 | +13% |
| arco | 82,8 | 82,8 | -4% |

| Perfil | Arma · elemento escolhidos | Constructo: tempo | Δ vs melhor |
|---|---|---|---|
| Força | katana · fogo | 13,6 ± 0,1 s | +18% |
| Destreza | katana · fogo | 12,3 ± 0,1 s | +6% |
| Força+Destreza | katana · fogo | 11,6 ± 0,2 s | +0% |
| Tanque | katana · fogo | 13,8 ± 0,2 s | +20% |
| Leitor (PER) | duas_katanas · fogo | 12,5 ± 0,4 s | +8% |
| Mago | duas_katanas · fogo | 12,7 ± 0,3 s | +10% |
| Lâmina mágica | espada_curta · fogo | 12,2 ± 0,2 s | +6% |
| Generalista | dois_machados · — | 12,7 ± 0,1 s | +10% |

Com o pacote: 6 de 8 perfis a ≤ 15% do melhor; elementos escolhidos: fogo, nenhum.

## 5. Chefe de Andar AO.1 (camada 1, vida 120.000 sem fator, postura 1.000, armadura 50)

Ataques do contrato: Golpe pesado 300/8 s (frontal, quem tem a ameaça; esquiva, parry ou bloqueio) · Varredura 220/12 s (todos os corpo a corpo; só se evita indo para as costas) · Investida 320/20 s (um jogador; sair da linha; colisão com a âncora 1 = exausto 6 s) · Chuva 180/25 s (5 círculos) · Grito na fase 2 a cada 30 s (cortado por uma técnica de Ruptura pronta; senão +20% de dano recebido por 10 s) · fúria (−20% nos intervalos) só com as âncoras feitas · 25% invulnerável até a última âncora · 3 âncoras × 4 intervenções, cada rota no máximo 2 por âncora · adds a cada âncora (2 constructos + 1 elemental) · Leitura do grupo: quebra-guarda contra bloqueio e golpe atrasado contra esquiva · 5 poções e 2 reanimações por jogador (canal de 4 s).

### 5.1 Grupo misto (Tanque·escudo·terra, Força·machado grande·fogo, Destreza·duas espadas·vento, Leitor·arco·raio, Mago·desarmado·gelo, Lâmina mágica·espada longa·água)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Misto, médio | 33/40 = 83% [68–91] | 6,0 ± 0,1 min | 6,3 min | derrota 7, vitória 33 | 3,6 | 0,1 | 16,4 | 265 | 6% | 2,6/3,9 | 3,5 | 53% |
| Misto, bom | 40/40 = 100% [91–100] | 5,2 ± 0,1 min | 5,2 min | vitória 40 | 0,9 | 0,0 | 8,5 | 199 | 8% | 2,6/3,3 | 0,9 | 53% |

Dano por jogador no grupo misto médio:

| Perfil | DPS ÷ s | Recebido/min ÷ s | Quedas |
|---|---|---|---|
| Tanque | 59,0 | 226 | 0,18 |
| Força | 44,2 | 349 | 0,93 |
| Destreza | 60,8 | 319 | 0,83 |
| Leitor (PER) | 75,4 | 213 | 0,33 |
| Mago | 68,3 | 216 | 0,28 |
| Lâmina mágica | 37,1 | 265 | 1,05 |

### 5.2 Grupos de 6 cópias (rotas das âncoras dependem da composição)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 × Força (machado_grande, fogo) | 0/20 = 0% [0–16] | — ± 0,0 min | 4,0 min | sem rota 20 | 1,1 | 0,0 | 18,2 | 438 | 8% | 0,0/4,0 | 1,1 | 52% |
| 6 × Destreza (duas_espadas, vento) | 12/20 = 60% [39–78] | 5,4 ± 0,1 min | 5,5 min | derrota 8, vitória 12 | 4,0 | 0,3 | 16,8 | 339 | 7% | 0,0/3,6 | 3,8 | 53% |
| 6 × Leitor (PER) (arco, raio) | 20/20 = 100% [84–100] | 5,1 ± 0,3 min | 5,1 min | vitória 20 | 1,2 | 0,5 | 9,4 | 209 | 5% | 3,5/3,7 | 0,7 | 45% |
| 6 × Tanque (espada_e_escudo, terra) | 20/20 = 100% [84–100] | 6,0 ± 0,1 min | 6,0 min | vitória 20 | 1,2 | 0,0 | 16,4 | 281 | 7% | 0,0/4,0 | 1,2 | 54% |

### 5.3 Ensaios (grupo misto, jogador médio, **mesmas sementes da linha base**)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Linha base (repete 5.1) | 33/40 = 83% [68–91] | 6,0 ± 0,1 min | 6,3 min | derrota 7, vitória 33 | 3,6 | 0,1 | 16,4 | 265 | 6% | 2,6/3,9 | 3,5 | 53% |
| Poção sem guardar reserva | 30/40 = 75% [60–86] | 6,2 ± 0,2 min | 6,4 min | derrota 10, vitória 30 | 3,9 | 0,0 | 18,2 | 264 | 6% | 2,9/4,0 | 3,9 | 53% |
| Grok: reserva 900 | 40/40 = 100% [91–100] | 5,5 ± 0,1 min | 5,5 min | vitória 40 | 1,9 | 0,1 | 18,6 | 291 | 7% | 2,7/3,7 | 1,9 | 53% |
| Grok: bloqueio 15% + área 40% bloqueável | 37/40 = 93% [80–97] | 6,1 ± 0,2 min | 6,2 min | derrota 3, vitória 37 | 3,4 | 0,1 | 15,7 | 260 | 6% | 2,7/3,8 | 3,3 | 54% |
| ChatGPT: escudo 20% | 34/40 = 85% [71–93] | 6,1 ± 0,2 min | 6,3 min | derrota 6, vitória 34 | 3,5 | 0,1 | 16,4 | 265 | 6% | 2,6/3,9 | 3,5 | 53% |
| ChatGPT: P_arma 65, dano do chefe 100% | 0/40 = 0% [0–9] | — ± 0,0 min | 4,4 min | derrota 40 | 6,9 | 0,9 | 18,9 | 465 | 9% | 1,8/4,4 | 5,9 | 50% |
| ChatGPT: P_arma 65, dano do chefe 75% | 4/40 = 10% [4–23] | 5,8 ± 0,7 min | 5,8 min | derrota 36, vitória 4 | 6,0 | 0,2 | 19,7 | 338 | 7% | 2,7/4,7 | 5,8 | 52% |
| ChatGPT: P_arma 65, dano do chefe 60% | 29/40 = 73% [57–84] | 5,5 ± 0,2 min | 5,8 min | derrota 11, vitória 29 | 4,0 | 0,1 | 17,1 | 294 | 7% | 2,8/3,8 | 3,9 | 53% |
| ChatGPT: P_arma 65, dano do chefe 50% | 40/40 = 100% [91–100] | 5,0 ± 0,1 min | 5,0 min | vitória 40 | 2,1 | 0,1 | 12,6 | 274 | 8% | 2,5/3,2 | 2,1 | 53% |
| Grok: pacote (vida 175 mil, dano −33%, reserva 900, reanimação 50 fixos, bloqueio 15%, área 40%) | 14/40 = 35% [22–50] | 8,6 ± 0,4 min | 8,5 min | derrota 26, vitória 14 | 12,6 | 7,6 | 25,5 | 317 | 5% | 4,1/5,6 | 0,0 | 54% |

### 5.4 Chefes sintéticos (testes de pressão, não são o AO.1)

| Grupo | Vitórias [IC] | Tempo da vitória ± IC | Duração média | Resultado | Quedas | Reanimações | Poções | Recebido/min por jogador ÷ s | Tempo em âncoras | Gritos cortados | Quedas sem reserva | Flanco disponível |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sintético v2: 300/2,6 s (um) + 200/10 s (todos) | 0/40 = 0% [0–9] | — ± 0,0 min | 2,4 min | derrota 40 | 6,3 | 0,3 | 19,7 | 831 | 0% | 0,0/0,0 | 6,0 | 73% |
| Sintético do ChatGPT: 300/8 s + 120/20 s | 40/40 = 100% [91–100] | 5,0 ± 0,1 min | 5,0 min | vitória 40 | 2,0 | 0,1 | 11,8 | 266 | 0% | 0,0/0,0 | 1,9 | 37% |

Tempo-alvo do contrato: 6–10 min (estimativa AI.6 ≈ 5,8 min sem erros).

## 6. Técnicas por papel (cálculo do motor: pesos de atributo, fases e armadura 50)

Regra (ChatGPT, loop 4/5): técnica de **Execução** sem condição precisa de dano ≥ 1,20 × DPS do ataque leve × tempo ocupado. Ruptura, Contenção e Sustentação não entram na regra (o valor delas é controle, impacto ou apoio). Área contada com 1 alvo; DoT e zona incluídos.

Execução sem condição: 66 técnicas; **15 abaixo de 1,20×**. Fora da regra: Ruptura 31, Contenção 15, Sustentação 2.

Técnicas mágicas medidas no perfil Mago de referência (POT20/CON15/VIG10); físicas no FOR20/DES15/VIG10. Área medida também no número de alvos do projeto (até 6).

| Técnica (Execução) | Árvore | 1 alvo | Falta p/ 1,20 | Nos alvos do projeto | Observação |
|---|---|---|---|---|---|
| Tempestade de machados | machado_pequeno | 0,33 | +268% | 1,96 (6 alvos) ✔ | — |
| Tiro em leque | arco | 0,54 | +121% | 2,71 (5 alvos) ✔ | — |
| Arremesso duplo | machado_pequeno | 0,70 | +72% | 1,39 (2 alvos) ✔ | — |
| Brasa persistente | fogo | 0,73 | +63% | — | marca amplificadora (+8% por 8 s; valor não medido) |
| Dança de lâminas | duas_espadas | 0,79 | +51% | — | — |
| Giro pesado | machado_grande | 0,94 | +28% | 5,64 (6 alvos) ✔ | — |
| Tempestade | duas_espadas | 1,03 | +16% | 6,18 (6 alvos) ✔ | — |
| Rodopio | duas_katanas | 1,04 | +16% | 6,23 (6 alvos) ✔ | — |
| Corte de avanço | espada_longa | 1,11 | +8% | — | mobilidade 2 m (valor não medido) |
| Corte que segue | duas_katanas | 1,11 | +8% | — | — |
| Moedor | dois_machados | 1,13 | +6% | — | mobilidade 3 m (valor não medido) |
| Saque do vazio | katana | 1,16 | +4% | 6,93 (6 alvos) ✔ | — |
| Lâmina projetada | katana | 1,16 | +4% | — | — |
| Lançamento curvo | machado_pequeno | 1,17 | +2% | — | — |
| Passo de sombra | espada_curta | 1,18 | +2% | — | — |

## 7. O que este simulador ainda não avalia (fora das conclusões)

- Leitura do grupo "contra distância" (puxão) e "contra interrupção" (conjuração dupla); só quebra-guarda e golpe atrasado entram.
- Formas de mistura sem efeito numérico (apoio, ocultar, deslocamento, lentidão) ficam fora da busca; Água (redistribuir reserva) não está no motor.
- Aggro: falta a parcela de dano interceptado e de cura (não há esses eventos no motor). Adds usam a mesma ameaça do chefe (simplificação).
- Formas de mistura usadas só pela parte numérica (dano, impacto, postura); controle e apoio de formas mistas ficam omitidos.
- Fadiga 100 do chefe (o contrato não define o efeito em números).
- Regressão das âncoras na fase 2 (a estratégia simulada faz uma âncora por vez, sem deixá-la parcial e sozinha).
- Guardas elementais da âncora 3 atacando quem está lá (a rota de Controle só custa tempo).
- Passivas de texto, nós-chave, Artes, afixos e fabricação.
- Peso da arma: fixado em 3 para todas.
- Deslocamento real: tarefas das âncoras custam 3 s de ida; ninguém é atingido por Varredura/Golpe pesado longe do chefe.
- Reação elemental só entre elementos do mesmo jogador (como manda o 07); combinações entre jogadores não existem no contrato.

---
Gerado em 92 s.