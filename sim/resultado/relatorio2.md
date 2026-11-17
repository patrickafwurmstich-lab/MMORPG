# Simulador de equilíbrio v2 — relatório

Dados: dados.js `38a6a6f7f2` · fichas revisadas: 102 · sementes fixas (mulberry32) · triagem 100 lutas, finalistas 400, chefe 10 lutas de 6 jogadores · intervalos de 95% (Wilson para vitórias, t para tempo).

## 1. Calibração (contrato AI: DPS de referência ≈ 70)

Perfil de referência no nível 15 (com afinidade): FOR 20 · DES 15 · VIG 10.

| Modo | Como mede | DPS ÷ s |
|---|---|---|
| Boneco (100% atacando) | sem ameaça, política sustentado | 146,4 |
| **Abstrato** | boneco × 0,55, aplicado uma única vez | **80,5** |
| **Por eventos** | 60 s contra fera real (vida ×50), com defesa, esquiva e parry sorteados | **128,9** (tempo ofensivo efetivo 74%) |

Com as vidas atuais, a fera morre em 4,4 s (contrato: 8–12 s): o tempo ofensivo real fica perto de 74%, não 55%, e as recargas cheias no início inflam lutas curtas.

Fator de vida sugerido (F = DPS ÷ 70): abstrato 1,151 · por eventos 1,842. **Da seção 2 em diante, as vidas dos inimigos estão multiplicadas pelo fator por eventos (1,84)**, para que as lutas tenham a duração do contrato e a sobrevivência pese.

Boneco por política: sustentado 146,4 · explosao 147,6 · ruptura 132,1 · defensiva 150,0.

## 2. Armas (perfil Força+Destreza, nível 15, sem elemento, jogador médio, política sustentado)

| Arma | Boneco DPS | Fera: vitória [IC] | Fera: tempo ± IC | Constructo: vitória | Constructo: tempo | Tempo em ação ofensiva* | Δ boneco vs média |
|---|---|---|---|---|---|---|---|
| desarmado | 139,6 | 100% [96–100] | 7,6 ± 0,1 s | 100% | 15,8 s | 90% | -10% |
| espada_curta | 165,5 | 100% [96–100] | 5,6 ± 0,1 s | 100% | 11,8 s | 94% | +7% |
| espada_longa | 155,9 | 100% [96–100] | 7,0 ± 0,1 s | 100% | 13,6 s | 94% | +1% |
| duas_espadas | 154,1 | 100% [96–100] | 6,6 ± 0,0 s | 100% | 12,9 s | 97% | -0% |
| espada_e_escudo | 147,1 | 100% [96–100] | 8,1 ± 0,1 s | 100% | 13,7 s | 95% | -5% |
| katana | 164,0 | 100% [96–100] | 5,7 ± 0,3 s | 100% | 10,3 s | 96% | +6% |
| duas_katanas | 168,1 | 100% [96–100] | 5,7 ± 0,1 s | 100% | 11,1 s | 96% | +9% |
| machado_grande | 124,7 | 100% [96–100] | 9,5 ± 0,1 s | 100% | 16,9 s | 107% | -19% |
| machado_pequeno | 150,3 | 100% [96–100] | 7,2 ± 0,1 s | 100% | 14,8 s | 93% | -3% |
| dois_machados | 171,0 | 100% [96–100] | 5,9 ± 0,0 s | 100% | 10,8 s | 97% | +11% |
| arco | 157,0 | 100% [96–100] | 7,1 ± 0,1 s | 100% | 13,2 s | 97% | +2% |

\* Soma do tempo das ações iniciadas; passa de 100% quando uma ação é cortada por defesa e outra começa.
Armas fora de ±15% da média no boneco: machado_grande.

## 3. Perfis de atributo × 4 políticas (nível 15, mesma busca de elementos para todos)

| Perfil | Arma · elementos | Política | Fera: vitória | Fera: tempo | Constructo: vitória | Constructo: tempo | Sem energia | Básicos forçados |
|---|---|---|---|---|---|---|---|---|
| Força | espada_longa · fogo | sustentado | 100% | 7,0 s | 100% | 12,5 s | 0% | 0% |
| Força | espada_longa · fogo | explosao | 100% | 7,0 s | 100% | 12,4 s | 0% | 0% |
| Força | espada_longa · fogo | ruptura | 100% | 8,4 s | 100% | 14,0 s | 0% | 0% |
| Força | espada_longa · fogo | defensiva | 100% | 7,0 s | 100% | 12,5 s | 0% | 0% |
| Destreza | katana · fogo | sustentado | 100% | 5,3 s | 100% | 9,6 s | 0% | 0% |
| Destreza | katana · fogo | explosao | 100% | 5,3 s | 100% | 9,6 s | 0% | 0% |
| Destreza | katana · fogo | ruptura | 100% | 5,4 s | 100% | 9,9 s | 0% | 0% |
| Destreza | katana · fogo | defensiva | 100% | 5,8 s | 100% | 10,3 s | 0% | 0% |
| Força+Destreza | katana · fogo | sustentado | 100% | 5,5 s | 100% | 9,6 s | 0% | 0% |
| Força+Destreza | katana · fogo | explosao | 100% | 5,5 s | 100% | 9,6 s | 0% | 0% |
| Força+Destreza | katana · fogo | ruptura | 100% | 5,2 s | 100% | 9,8 s | 0% | 0% |
| Força+Destreza | katana · fogo | defensiva | 100% | 5,9 s | 100% | 10,2 s | 0% | 0% |
| Tanque | espada_e_escudo · fogo | sustentado | 100% | 7,2 s | 100% | 13,1 s | 0% | 0% |
| Tanque | espada_e_escudo · fogo | explosao | 100% | 7,2 s | 100% | 13,0 s | 0% | 0% |
| Tanque | espada_e_escudo · fogo | ruptura | 100% | 8,8 s | 100% | 14,7 s | 0% | 0% |
| Tanque | espada_e_escudo · fogo | defensiva | 100% | 7,2 s | 100% | 12,9 s | 0% | 0% |
| Leitor (PER) | katana · fogo | sustentado | 100% | 5,9 s | 100% | 10,2 s | 0% | 0% |
| Leitor (PER) | katana · fogo | explosao | 100% | 5,9 s | 100% | 10,2 s | 0% | 0% |
| Leitor (PER) | katana · fogo | ruptura | 100% | 5,9 s | 100% | 10,3 s | 0% | 0% |
| Leitor (PER) | katana · fogo | defensiva | 100% | 6,3 s | 100% | 10,7 s | 0% | 0% |
| Mago | arco · fogo | sustentado | 100% | 6,7 s | 100% | 12,0 s | 2% | 0% |
| Mago | arco · fogo | explosao | 100% | 6,6 s | 100% | 12,1 s | 6% | 0% |
| Mago | arco · fogo | ruptura | 100% | 6,9 s | 100% | 13,1 s | 5% | 0% |
| Mago | arco · fogo | defensiva | 100% | 6,9 s | 100% | 12,3 s | 2% | 0% |
| Lâmina mágica | espada_longa · fogo | sustentado | 100% | 6,6 s | 100% | 11,2 s | 0% | 0% |
| Lâmina mágica | espada_longa · fogo | explosao | 100% | 6,5 s | 100% | 11,2 s | 0% | 0% |
| Lâmina mágica | espada_longa · fogo | ruptura | 100% | 8,1 s | 100% | 13,6 s | 0% | 0% |
| Lâmina mágica | espada_longa · fogo | defensiva | 100% | 6,5 s | 100% | 11,3 s | 0% | 0% |
| Generalista | espada_curta · fogo | sustentado | 100% | 6,2 s | 100% | 10,9 s | 0% | 0% |
| Generalista | espada_curta · fogo | explosao | 100% | 6,2 s | 100% | 11,0 s | 0% | 0% |
| Generalista | espada_curta · fogo | ruptura | 100% | 7,6 s | 100% | 13,2 s | 0% | 0% |
| Generalista | espada_curta · fogo | defensiva | 100% | 6,2 s | 100% | 11,0 s | 0% | 0% |

### Finalistas (melhor política de cada perfil, 400 lutas, constructo)

| Perfil | Política | Médio: vitória [IC] | Médio: tempo ± IC | Bom: vitória | Bom: tempo | Δ tempo vs mediana |
|---|---|---|---|---|---|---|
| Força | explosao | 100% [99–100] | 12,4 ± 0,1 s | 100% | 12,0 s | +11% |
| Destreza | explosao | 100% [99–100] | 9,6 ± 0,1 s | 100% | 9,1 s | -14% |
| Força+Destreza | explosao | 100% [99–100] | 9,6 ± 0,1 s | 100% | 8,9 s | -14% |
| Tanque | defensiva | 100% [99–100] | 12,9 ± 0,0 s | 100% | 13,1 s | +16% |
| Leitor (PER) | sustentado | 100% [99–100] | 10,3 ± 0,2 s | 100% | 9,6 s | -8% |
| Mago | sustentado | 100% [99–100] | 12,0 ± 0,1 s | 100% | 11,8 s | +8% |
| Lâmina mágica | sustentado | 100% [99–100] | 11,2 ± 0,1 s | 100% | 11,0 s | +0% |
| Generalista | sustentado | 100% [99–100] | 11,0 ± 0,0 s | 100% | 10,9 s | -2% |

Perfis a ≤ 15% da mediana: **7 de 8** (meta do contrato: ≥ 8 builds viáveis). Fora: Tanque.

## 4. Ensaios das propostas do loop 4

| Ensaio | Antes | Depois | Δ vs mediana |
|---|---|---|---|
| Mago + Pulso básico (K0,70, 1,0 s, custo 0) | 12,0 s | 12,0 ± 0,1 s | +8% |
| Mago + RegE extra 4·rCON·rPOT | 12,0 s | 12,0 ± 0,1 s | +8% |
| Leitor + leitura do Grok (6 s; 15+25·rPER; 8+12·rPER) | 10,3 s | 10,3 ± 0,2 s | -8% |

## 5. Chefe de Andar (6 jogadores, vida 120.000·s compartilhada, postura 1.000, ataque de 300 com aviso de 1,0 s, área a cada 10 s) — 10 lutas por grupo

Regras usadas: 5 poções de 250 por tentativa (saem da reserva), até 2 reanimações por jogador (4 s de um aliado, volta com mín(30%; reserva)), caído por 25 s.

| Grupo (6 iguais) | Política | Vitória | Tempo da vitória | Duração média | Quedas por luta | Quebras de postura | Dano recebido por jogador/min ÷ s | Orçamento de vida + reserva ÷ s | Contrato |
|---|---|---|---|---|---|---|---|---|---|
| Força+Destreza (médio) | explosao | 0% | — min | 3,3 min | 6,0 | 11,5 | 585 | 1.780 | 6–10 min |
| Tanque (médio) | defensiva | 0% | — min | 2,6 min | 6,0 | 9,6 | 891 | 2.156 | 6–10 min |
| Mago (médio) | sustentado | 0% | — min | 2,8 min | 6,0 | 7,3 | 689 | 1.780 | 6–10 min |
| Força+Destreza (bom) | explosao | 100% | 3,0 min | 3,0 min | 0,1 | 13,0 | 209 | 1.780 | 6–10 min |
| Tanque (bom) | defensiva | 0% | — min | 2,9 min | 6,0 | 11,3 | 779 | 2.156 | 6–10 min |

Dano bruto do chefe por jogador: 2.354/min ÷ s (300 a cada 2,6 s dividido por 6 + área de 200 a cada 10 s). Depois de esquiva, parry e bloqueio, chega 27% disso. Com orçamento médio de 1.930 ÷ s, o grupo aguenta cerca de 3,1 min. **Conflito de contrato:** para uma luta de 8 min, o dano bruto por jogador precisa ficar perto de 901/min (÷ s), ou cerca de 38% do atual, ou o grupo precisa de cura que não sai da reserva.

## 6. Técnicas: valor por segundo contra o ataque leve da própria arma (perfil Força+Destreza, alvo único)

26 de 119 técnicas com dano ficam abaixo de 95% do ataque leve, sem contar condição, controle, área ou impacto. As que não têm papel de controle precisam de revisão:

- Investida de ombro (desarmado) 86%
- Rasteira (desarmado) 67%
- Corte dos tendões (espada_curta) 87%
- Interceptação (espada_longa) 80%
- Guarda de passagem (espada_longa) 43%
- Dança de lâminas (duas_espadas) 79%
- Cruz ascendente (duas_espadas) 87%
- Golpe de escudo (espada_e_escudo) 48%
- Investida de escudo (espada_e_escudo) 62%
- Avanço do baluarte (espada_e_escudo) 56%
- Escudo arremessado (espada_e_escudo) 75%
- Golpe de cabo (machado_grande) 78%
- Pegada de gigante (machado_grande) 94%
- Arremesso duplo (machado_pequeno) 69%
- Gancho (machado_pequeno) 74%
- Tempestade de machados (machado_pequeno) 32%
- Quebra-escudo (machado_pequeno) 92%
- Corrente (machado_pequeno) 80%
- Tiro de atordoar (arco) 51%
- Tiro em leque (arco) 59%
- Armadilha (arco) 64%
- Rede (arco) 38%
- Tiro de pinos (arco) 42%
- Brasa persistente (fogo) 55%
- Corrente (raio) 69%
- Espinhos (terra) 88%

---
Gerado em 4 s. Limitações conhecidas: um alvo por vez escolhe a ação pelo valor por segundo (sem planejamento de rotação longa); jogadores do chefe são cópias; o flanco é sorteado (30% solo, 60% no chefe).