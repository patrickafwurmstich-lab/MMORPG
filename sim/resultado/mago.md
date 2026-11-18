# Loop 13 — correção localizada do Mago (pacote v1.1 ligado)

Constructo, jogador médio, 400 lutas, mesmas sementes; busca nas 11 armas × sem/6 elementos e melhor das 4 políticas. Teto: 15% acima do melhor perfil (FOR/VIG e VIG/FOR: 25%).

| Perfil / variação | Preparação encontrada | Constructo | Δ vs melhor | Teto | Cumpre |
|---|---|---|---|---|---|
| FOR/DES (referência) | espada_curta · — · explosao | 11,335 ± 0,10 s | +0,0% | 0% | ✔ |
| Força | dois_machados · — · explosao | 14,131 ± 0,08 s | +24,7% | 25% | ✔ |
| Tanque | dois_machados · — · sustentado | 14,201 ± 0,08 s | +25,3% | 25% | ✘ |
| Mago — atual | espada_curta · fogo · explosao | 13,480 ± 0,17 s | +18,9% | 15% | ✘ |
| Mago — Projétil 1,40 → 1,55 e Área 1,60 → 1,75 (todos os elementos; Vento 1,30 → 1,45 / 1,50 → 1,65) | katana · fogo · explosao | 13,051 ± 0,12 s | +15,1% | 15% | ✘ |
| Lâmina mágica — idem | dois_machados · fogo · explosao | 12,545 ± 0,08 s | +10,7% | 15% | ✔ |
| Mago — idem + regeneração + 4·rCON·rPOT | espada_curta · fogo · defensiva | 13,075 ± 0,15 s | +15,4% | 15% | ✘ |
| Mago — Projétil 1,60 e Área 1,80 (Vento 1,50 / 1,70) | espada_curta · fogo · explosao | 12,853 ± 0,14 s | +13,4% | 15% | ✔ |
| Lâmina mágica — idem (1,60 / 1,80) | dois_machados · fogo · explosao | 12,435 ± 0,08 s | +9,7% | 15% | ✔ |
| Mago — regeneração de energia + 4·rCON·rPOT | espada_curta · fogo · explosao | 13,432 ± 0,18 s | +18,5% | 15% | ✘ |

Pulso básico: proposta do loop 4 (ChatGPT) — ataque básico mágico à distância, sem custo, para o Mago não depender de arma física entre conjurações. Regeneração extra: proposta do loop 4 (Grok).

Gerado em 36 s.
## AO.1 e elementos com o reforço dos feitiços-base (`sim/ao1-v11.js`, 400 tentativas, mesmas sementes)

Pacote v1.1 + Projétil 1,40 → 1,60 e Área 1,60 → 1,80 em todos os elementos (Vento 1,30 → 1,50 e 1,50 → 1,70). Grupo de referência novo (Força em explosão).

| Dano do chefe (% do v8) | Vitória [IC] | Tempo | Força: quedas ÷ média | Força: DPS ÷ melhor |
|---|---|---|---|---|
| 57% | 90,00% [86,7–92,6] | 5,98 min | 0,23× | 70% |
| 58% | 88,50% [85,0–91,3] | 6,03 min | 0,23× | 70% |
| 59% | 82,50% [78,5–85,9] | 6,05 min | 0,34× | 71% |
| **60%** | **75,50% [71,1–79,5]** | **6,07 min** | **0,43×** | **73%** |
| 61% | 69,00% [64,3–73,3] | 6,10 min | 0,51× | 73% |

Elementos (kits montados por elemento; constructo; Δ contra o kit sem elemento):

| Preparação | Fogo | Gelo | Raio | Terra | Vento | Água | Fogo vs 2º melhor (tempo) |
|---|---|---|---|---|---|---|---|
| Mago · desarmado | −32% | −20% | −15% | −18% | −15% | −24% | −10,3% |
| Lâmina mágica · espada longa | −20% | −12% | −10% | −13% | −13% | −16% | −4,5% |
| Mago · espada curta | −30% | −25% | −19% | −24% | −18% | −26% | −5,6% |

Armas no boneco (sem elemento): sem mudança — o reforço só toca técnicas elementais.
