# Candidatos de calibração (loop 7) — simulador v3.2

Mesmo motor e mesmas sementes para todos. Perfil de referência: FOR20/DES15/VIG10, espada longa, jogador médio. Lutas comuns: 400; perfis: 200; AO.1 grupo misto: 100 (médio) e 40 (bom). Metas: fera 8–12 s, constructo 14–18 s, ≥ 7 de 8 perfis a ≤ 15% do melhor, AO.1 médio 70–85% de vitória em 6–10 min com reanimações > 0.

## 1. Resumo

| Candidato | DPS por eventos ÷ s | Fera | Constructo | Perfis a ≤ 15% do melhor | AO.1 médio: vitória [IC] | AO.1 médio: tempo da vitória | Reanimações | AO.1 bom |
|---|---|---|---|---|---|---|---|---|
| Atual (P_arma 110, contrato) | 119,0 | 3,9 ± 0,0 s | 7,3 ± 0,1 s | 4 de 8 | 51% [41–61] | 3,5 ± 0,1 min | 0,8 | 100% em 3,0 min |
| A · ChatGPT (P_arma 57,5; vidas do contrato; dano do chefe 52%) | 62,2 | 8,5 ± 0,1 s | 14,9 ± 0,1 s | 7 de 8 | 78% [69–85] | 6,3 ± 0,1 min | 0,2 | 100% em 5,3 min |
| B · Grok (P_arma 90; vidas ×1,30; chefe 160 mil e −30%; reserva 900; reanimação 50 fixos; bloqueio 15%; área 40%) | 97,4 | 6,8 ± 0,0 s | 11,8 ± 0,1 s | 6 de 8 | 100% [96–100] | 4,6 ± 0,0 min | 3,1 | 100% em 4,4 min |

### Atual (P_arma 110, contrato)

| Perfil | Arma · elemento | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | katana · fogo | 6,8 ± 0,1 s | +27% |
| Destreza | dois_machados · — | 5,4 ± 0,1 s | +0% |
| Força+Destreza | dois_machados · — | 5,4 ± 0,1 s | +0% |
| Tanque | dois_machados · — | 7,0 ± 0,1 s | +30% |
| Leitor (PER) | dois_machados · — | 6,5 ± 0,1 s | +22% |
| Mago | espada_curta · fogo | 5,9 ± 0,1 s | +10% |
| Lâmina mágica | dois_machados · — | 5,8 ± 0,1 s | +7% |
| Generalista | espada_curta · fogo | 6,2 ± 0,1 s | +15% |

AO.1 médio: quedas 5,3, poções 17,2, quedas sem reserva 4,5, recebido 485/min por jogador ÷ s, gritos cortados 1,5/2,7, resultado: vitória 51, derrota 49.

### A · ChatGPT (P_arma 57,5; vidas do contrato; dano do chefe 52%)

| Perfil | Arma · elemento | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | katana · fogo | 13,0 ± 0,1 s | +11% |
| Destreza | dois_machados · — | 12,4 ± 0,1 s | +5% |
| Força+Destreza | dois_machados · — | 11,8 ± 0,1 s | +0% |
| Tanque | dois_machados · — | 13,9 ± 0,1 s | +18% |
| Leitor (PER) | dois_machados · — | 12,0 ± 0,3 s | +2% |
| Mago | espada_curta · fogo | 12,5 ± 0,2 s | +7% |
| Lâmina mágica | dois_machados · — | 12,6 ± 0,1 s | +7% |
| Generalista | espada_curta · fogo | 12,2 ± 0,2 s | +4% |

AO.1 médio: quedas 3,9, poções 17,0, quedas sem reserva 3,7, recebido 262/min por jogador ÷ s, gritos cortados 3,0/4,3, resultado: vitória 78, derrota 22.

### B · Grok (P_arma 90; vidas ×1,30; chefe 160 mil e −30%; reserva 900; reanimação 50 fixos; bloqueio 15%; área 40%)

| Perfil | Arma · elemento | Constructo | Δ vs melhor |
|---|---|---|---|
| Força | katana · fogo | 10,3 ± 0,1 s | +13% |
| Destreza | dois_machados · — | 9,5 ± 0,1 s | +4% |
| Força+Destreza | dois_machados · — | 9,1 ± 0,1 s | +0% |
| Tanque | dois_machados · — | 11,3 ± 0,1 s | +24% |
| Leitor (PER) | dois_machados · — | 9,4 ± 0,1 s | +3% |
| Mago | espada_curta · fogo | 10,4 ± 0,2 s | +14% |
| Lâmina mágica | dois_machados · — | 9,8 ± 0,1 s | +7% |
| Generalista | espada_curta · fogo | 10,5 ± 0,1 s | +15% |

AO.1 médio: quedas 4,0, poções 18,1, quedas sem reserva 0,0, recebido 373/min por jogador ÷ s, gritos cortados 2,1/3,0, resultado: vitória 100.

## 2. Dois machados depois da correção do Frenesi (por acerto)

| Versão | Boneco DPS | Δ vs média das 11 armas |
|---|---|---|
| Atual (+3% por acerto, teto 15%) | 198,4 | +20% |
| ChatGPT: K −8% (leve 0,35; pesado 1,15) | 190,4 | +15% |
| Grok: +2% por acerto e leve 0,34 | 186,6 | +13% |
| Grok: só +2% por acerto | 192,6 | +17% |

Machado grande na mesma tabela:

| Machado grande atual | 128,3 | -23% |
| Grok: pT 1,40 · pK 2,05 · lK 0,92 | 145,0 | -13% |
| ChatGPT: carga 3 = 2,75 s | 144,8 | -13% |

Gerado em 43 s.