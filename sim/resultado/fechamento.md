# Loop 10 — fechamento da calibração-base

Calibração: **P_arma 57,5**, vidas do contrato (fera 650, constructo 1.100, AO.1 120.000), reserva 600, bloqueio 30%, reanimação do contrato. Armas: Dois machados (Frenesi +2%/acerto, leve 0,34) e Machado grande (leve 0,92, pesado 2,05 em 1,40 s). Mesmas sementes.

## 1. Dano do chefe (AO.1, grupo misto, jogador médio, 400 tentativas)

| Dano do chefe | Vitória [IC] | Tempo da vitória | Reanimações | Quedas Tanque | Quedas Força | Quedas (média do grupo) | DPS Tanque ÷ melhor | DPS Força ÷ melhor |
|---|---|---|---|---|---|---|---|---|
| 52,0% | 84,50% [80,6–87,7] | 6,20 ± 0,06 min | 0,153 | 0,16 | 0,95 | 0,62 | 77% | 58% |
| 53,5% | 80,00% [75,8–83,6] | 6,25 ± 0,06 min | 0,160 | 0,20 | 0,95 | 0,65 | 78% | 57% |
| 55,0% | 68,25% [63,5–72,6] | 6,32 ± 0,07 min | 0,190 | 0,33 | 0,98 | 0,73 | 80% | 57% |

## 2. Perfis (constructo solo, 200 lutas, preparações reotimizadas)

| Perfil | Arma · elemento | Constructo | Δ vs melhor | Teto | Cumpre |
|---|---|---|---|---|---|
| Força (perfil de VIG) | espada_curta · fogo | 12,9 ± 0,1 s | +18% | 25% | ✔ |
| Destreza | katana · fogo | 11,6 ± 0,1 s | +7% | 15% | ✔ |
| Força+Destreza | katana · fogo | 10,9 ± 0,1 s | +0% | 15% | ✔ |
| Tanque (perfil de VIG) | espada_curta · fogo | 13,1 ± 0,1 s | +20% | 25% | ✔ |
| Leitor (PER) | duas_katanas · fogo | 11,7 ± 0,3 s | +7% | 15% | ✔ |
| Mago | duas_katanas · fogo | 12,3 ± 0,2 s | +13% | 15% | ✔ |
| Lâmina mágica | espada_curta · fogo | 11,4 ± 0,1 s | +4% | 15% | ✔ |
| Generalista | duas_katanas · fogo | 11,5 ± 0,1 s | +5% | 15% | ✔ |

## 3. Ensaio defensivo controlado (400 lutas por distribuição)

Nível 15, espada longa, armadura média, mesmas técnicas e sementes, política sustentado, jogador médio. Constructo de estresse: 55.000 de vida, ataque de 640 (para medir sobrevivência, não é inimigo do jogo). Mede o tempo até a primeira queda. Também: constructo "letal" do Grok (vida normal, dano ×1,5).

| Distribuição | Tempo até cair (estresse) | Ganho sobre FOR/DES | Letal: vitória | Letal: tempo |
|---|---|---|---|---|
| FOR23/DES23/VIG6 (referência FOR/DES) | 19,77 s | +0% | 100,0% [99–100] | 13,4 s |
| FOR25/VIG25 (FOR/VIG) | 24,92 s | +26% | 100,0% [99–100] | 16,3 s |
| FOR23/VIG27 (VIG/FOR) | 24,99 s | +26% | 100,0% [99–100] | 16,5 s |

Regra proposta no loop 9: perfis de VIG podem ficar até +25% no constructo solo se sobreviverem ≥ 20% mais (ChatGPT) ou ≥ 1,3× (Grok) no ensaio controlado, ou tiverem vitória no letal ≥ à do FOR/DES (Grok); no AO.1, quedas do Tanque e da Força ≤ média do grupo, DPS do Tanque ≥ 50% e da Força ≥ 70% do melhor (Grok).

Gerado em 121 s.