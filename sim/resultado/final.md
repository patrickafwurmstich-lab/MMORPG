# Loop 9 — conferência final da calibração (simulador v3.2)

Ajustes de arma aplicados (aceitos pelas duas IAs no loop 8): **Dois machados** Frenesi +2% por acerto (teto 10%) e leve 0,38 → 0,34; **Machado grande** leve 0,85 → 0,92, pesado 1,90 → 2,05, tempo do pesado 1,70 → 1,40 s (acréscimos de carga mantidos). Preparações dos perfis **reotimizadas dentro de cada calibração**. Mesmas sementes em tudo.

Lutas comuns: 400; perfis: 200; AO.1 grupo misto: 400 (médio) e 40 (bom).

## Armas (boneco, perfil Força+Destreza, sem elemento)

| Arma | DPS | Δ vs média |
|---|---|---|
| desarmado | 79,5 | -8% |
| espada_curta | 94,0 | +8% |
| espada_longa | 87,2 | +0% |
| duas_espadas | 88,9 | +2% |
| espada_e_escudo | 79,1 | -9% |
| katana | 91,3 | +5% |
| duas_katanas | 93,8 | +8% |
| machado_grande | 75,8 | -13% |
| machado_pequeno | 86,0 | -1% |
| dois_machados | 97,5 | +12% |
| arco | 82,8 | -5% |

Todas a ±15%: **sim**.

## Critérios por calibração

| Calibração | DPS ref. (eventos) | Fera 8–12 s | Constructo 14–18 s | Perfis ≤ 15% do melhor | Tanque | AO.1 médio 70–85% | Tempo 6–10 min | Reanimações (≥ 0,5 p/ Grok) | AO.1 bom |
|---|---|---|---|---|---|---|---|---|---|
| A (ChatGPT): P_arma 57,5 · chefe 52% · bloqueio 30% · reserva 600 | 62,2 | 8,5 s ✔ | 14,9 s ✔ | 6/8 ✘ | +20% ✘ | 84,5% [81–88] ✔ | 6,20 min ✔ | 0,15 ✘ | 100% em 5,2 min |
| A2 (Grok): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reserva 750 | 64,9 | 8,3 s ✔ | 13,9 s ✘ | 6/8 ✘ | +17% ✘ | 99,8% [99–100] ✘ | 5,56 min ✘ | 0,15 ✘ | 100% em 4,9 min |
| A3 (Grok, alternativa): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reanimação 50 fixos | 64,9 | 8,3 s ✔ | 13,9 s ✘ | 6/8 ✘ | +17% ✘ | 100,0% [99–100] ✘ | 5,02 min ✘ | 3,37 ✔ | 100% em 4,8 min |

### A (ChatGPT): P_arma 57,5 · chefe 52% · bloqueio 30% · reserva 600

| Perfil | Arma · elemento (reotimizado) | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | espada_curta · fogo | 12,9 ± 0,1 s | +18% |
| Destreza | katana · fogo | 11,6 ± 0,1 s | +7% |
| Força+Destreza | katana · fogo | 10,9 ± 0,1 s | +0% |
| Tanque | espada_curta · fogo | 13,1 ± 0,1 s | +20% |
| Leitor (PER) | duas_katanas · fogo | 11,7 ± 0,3 s | +7% |
| Mago | duas_katanas · fogo | 12,3 ± 0,2 s | +13% |
| Lâmina mágica | espada_curta · fogo | 11,4 ± 0,1 s | +4% |
| Generalista | duas_katanas · fogo | 11,5 ± 0,1 s | +5% |

AO.1 médio: quedas 3,7, poções 16,4, quedas sem reserva 3,6, recebido 261/min por jogador ÷ s, gritos cortados 2,9/4,0.

### A2 (Grok): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reserva 750

| Perfil | Arma · elemento (reotimizado) | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | espada_curta · fogo | 12,3 ± 0,1 s | +16% |
| Destreza | katana · fogo | 11,1 ± 0,1 s | +4% |
| Força+Destreza | espada_curta · fogo | 10,6 ± 0,1 s | +0% |
| Tanque | espada_curta · fogo | 12,4 ± 0,1 s | +17% |
| Leitor (PER) | duas_katanas · fogo | 11,3 ± 0,3 s | +6% |
| Mago | duas_katanas · fogo | 11,8 ± 0,2 s | +11% |
| Lâmina mágica | espada_curta · fogo | 11,0 ± 0,1 s | +4% |
| Generalista | duas_katanas · fogo | 11,0 ± 0,1 s | +4% |

AO.1 médio: quedas 2,6, poções 15,4, quedas sem reserva 2,4, recebido 283/min por jogador ÷ s, gritos cortados 2,7/3,6.

### A3 (Grok, alternativa): P_arma 60 · chefe 55% · bloqueio 15% · área 40% · reanimação 50 fixos

| Perfil | Arma · elemento (reotimizado) | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | espada_curta · fogo | 12,3 ± 0,1 s | +16% |
| Destreza | katana · fogo | 11,1 ± 0,1 s | +4% |
| Força+Destreza | espada_curta · fogo | 10,6 ± 0,1 s | +0% |
| Tanque | espada_curta · fogo | 12,4 ± 0,1 s | +17% |
| Leitor (PER) | duas_katanas · fogo | 11,3 ± 0,3 s | +6% |
| Mago | duas_katanas · fogo | 11,8 ± 0,2 s | +11% |
| Lâmina mágica | espada_curta · fogo | 11,0 ± 0,1 s | +4% |
| Generalista | duas_katanas · fogo | 11,0 ± 0,1 s | +4% |

AO.1 médio: quedas 4,1, poções 12,5, quedas sem reserva 0,0, recebido 304/min por jogador ÷ s, gritos cortados 2,3/3,1.

Gerado em 133 s.
## Varredura extra (120 tentativas do AO.1, 60 lutas por perfil; `sim/varredura.js`)

| Variação sobre A | AO.1 médio | Tempo | Reanimações | Perfis |
|---|---|---|---|---|
| A + Fogo −18 + Flanco +20% (pacote de conteúdo do Grok) | 84% | 6,33 min | 0,18 | 6/8 (Força +24%, Tanque +21%) |
| A + reanimação 50 fixos do ajudante | 100% | 5,27 min | 3,63 | — |
| A + reanimação 50 fixos + dano do chefe 58% | 100% | 5,39 min | 4,52 | — |
| A + reanimação 50 fixos + dano do chefe 62% | 99% | 5,48 min | 5,15 | — |

Leitura: Fogo −18 e Flanco +20% não mudam a distância de Força e Tanque (o atraso deles vem de VIG, que não entra no tempo de luta solo). A reanimação com custo fixo do ajudante devolve 30% da vida sem gastar a reserva do caído e torna o chefe trivial mesmo com mais dano.
