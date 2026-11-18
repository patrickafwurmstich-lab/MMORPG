# Pendências de conteúdo da calibração v1

Motor v3.2 com a calibração v1 como padrão. Mesmas sementes. AO.1: 200 tentativas; constructo: 200 lutas.

## A. Força (FOR/VIG) com machado grande no AO.1

Meta proposta (Grok, loop 10): quedas da Força ≤ 1,1 × média do grupo e DPS ≥ 65% do melhor do grupo, sem tirar o AO.1 da faixa (70–85% em 6–10 min).

| Variação do jogador Força | Vitória do grupo [IC] | Tempo | Quedas Força | Média do grupo | Razão | DPS Força ÷ melhor | Cumpre |
|---|---|---|---|---|---|---|---|
| machado grande · política ruptura | 77,0% [71–82] | 6,23 min | 0,95 | 0,67 | 1,41× | 58% | ✘ |
| machado grande · política sustentado | 90,5% [86–94] | 5,80 min | 0,64 | 0,55 | 1,17× | 69% | ✘ |
| machado grande · política explosao | 94,5% [90–97] | 5,88 min | 0,06 | 0,49 | 0,12× | 77% | ✔ |
| machado grande · política defensiva | 90,5% [86–94] | 5,87 min | 0,67 | 0,55 | 1,22× | 68% | ✘ |
| machado grande · sustentado · carga 1 fixa | 93,0% [89–96] | 5,73 min | 0,47 | 0,49 | 0,95× | 70% | ✔ |
| machado grande · sustentado · carga 2 fixa | 90,5% [86–94] | 5,80 min | 0,64 | 0,55 | 1,17× | 69% | ✘ |
| espada longa · sustentado (referência do perfil) | 98,5% [96–99] | 5,43 min | 0,38 | 0,39 | 0,98× | 78% | ✔ |

## B. Valor de cada elemento na mesma preparação (constructo, jogador médio)

Mesma arma, mesmos atributos, mesmas sementes; muda só o elemento. Δ = tempo de luta contra a mesma preparação sem elemento (negativo = mata mais rápido).

### Fogo com −30 de armadura (atual)

| Preparação | fogo | gelo | raio | terra | vento | agua | Fogo vs 2º melhor |
|---|---|---|---|---|---|---|---|
| Força+Destreza · espada_longa | -5% | -2% | -1% | -1% | -1% | -1% | -3% |
| Mago · desarmado | -34% | -14% | -10% | -11% | -8% | -18% | -19% |
| Lâmina mágica · espada_longa | -25% | -8% | -5% | -6% | -6% | -12% | -15% |
| Leitor (PER) · arco | -11% | +2% | +7% | +6% | +3% | +3% | -12% |

### Fogo com −24 de armadura

| Preparação | fogo | gelo | raio | terra | vento | agua | Fogo vs 2º melhor |
|---|---|---|---|---|---|---|---|
| Força+Destreza · espada_longa | -4% | -2% | -1% | -1% | -1% | -1% | -2% |
| Mago · desarmado | -32% | -14% | -10% | -11% | -8% | -18% | -17% |
| Lâmina mágica · espada_longa | -23% | -8% | -5% | -6% | -6% | -12% | -12% |
| Leitor (PER) · arco | -8% | +2% | +7% | +6% | +3% | +3% | -10% |

### Fogo com −18 de armadura

| Preparação | fogo | gelo | raio | terra | vento | agua | Fogo vs 2º melhor |
|---|---|---|---|---|---|---|---|
| Força+Destreza · espada_longa | -2% | -2% | -1% | -1% | -1% | -1% | -1% |
| Mago · desarmado | -30% | -14% | -10% | -11% | -8% | -18% | -14% |
| Lâmina mágica · espada_longa | -21% | -8% | -5% | -6% | -6% | -12% | -10% |
| Leitor (PER) · arco | -6% | +2% | +7% | +6% | +3% | +3% | -7% |

### Ensaio: Fogo −24 e Lança ígnea 0,7 → 0,9 s

| Preparação | fogo | gelo | raio | terra | vento | agua | Fogo vs 2º melhor |
|---|---|---|---|---|---|---|---|
| Força+Destreza · espada_longa | -1% | -2% | -1% | -1% | -1% | -1% | +0% |
| Mago · desarmado | -28% | -14% | -10% | -11% | -8% | -18% | -12% |
| Lâmina mágica · espada_longa | -15% | -8% | -5% | -6% | -6% | -12% | -3% |
| Leitor (PER) · arco | +3% | +2% | +7% | +6% | +3% | +3% | +1% |

### Elemento escolhido pela busca (nível 15, 11 armas × sem/6 elementos)

| Fogo | Elementos escolhidos pelos 8 perfis | Perfis com Fogo |
|---|---|---|
| −30 | Força: espada_curta/fogo; Destreza: katana/fogo; Força+Destreza: katana/fogo; Tanque: espada_curta/fogo; Leitor (PER): duas_katanas/fogo; Mago: duas_katanas/fogo; Lâmina mágica: espada_curta/fogo; Generalista: duas_katanas/fogo | 8/8 |
| −24 | Força: espada_curta/fogo; Destreza: katana/fogo; Força+Destreza: katana/fogo; Tanque: katana/fogo; Leitor (PER): duas_katanas/fogo; Mago: duas_katanas/fogo; Lâmina mágica: espada_curta/fogo; Generalista: duas_katanas/fogo | 8/8 |
| −18 | Força: espada_curta/fogo; Destreza: espada_curta/—; Força+Destreza: katana/fogo; Tanque: katana/fogo; Leitor (PER): duas_katanas/fogo; Mago: duas_katanas/fogo; Lâmina mágica: espada_curta/fogo; Generalista: espada_curta/fogo | 7/8 |

## B2. Armas contra o constructo (perfil Força+Destreza, Fogo, jogador médio)

O boneco não ataca; o constructo pune ações longas (fases J.1). A busca escolhe o menor tempo, então diferenças pequenas viram "8 de 8".

| Arma | Constructo | Δ vs média (negativo = mais rápida) |
|---|---|---|
| katana | 10,9 s | -13% |
| espada_curta | 11,2 s | -11% |
| machado_grande | 11,8 s | -7% |
| dois_machados | 12,4 s | -1% |
| duas_katanas | 12,8 s | +2% |
| espada_longa | 12,9 s | +2% |
| machado_pequeno | 12,9 s | +2% |
| duas_espadas | 13,1 s | +4% |
| espada_e_escudo | 13,2 s | +5% |
| desarmado | 13,7 s | +8% |
| arco | 13,8 s | +10% |

Fora de ±15% da média contra o constructo: nenhuma.
Espada curta sem o Flanco: 12,4 s (-2%). O Flanco solo é sorteado em 30% dos golpes.

## C. Técnicas de Execução abaixo de 1,20× (alvo único, sem condição)

Critério (loops 5–9): dano da técnica ≥ 1,20 × DPS do ataque leve × tempo ocupado. Físicas medidas em FOR20/DES15/VIG10; mágicas em POT20/CON15/VIG10. Proposta: K novo = K × 1,20 ÷ ρ (arredondado para cima em 0,05), só nas que não têm outro papel (área, mobilidade, marca).

| Técnica | Árvore | ρ atual | K por acerto atual | K proposto | ρ com a proposta | Observação |
|---|---|---|---|---|---|---|
| Passo de sombra | espada_curta | 1,18 | 0,70 × 1 | 0,75 | 1,26 | alvo único |
| Corte de avanço | espada_longa | 1,11 | 0,80 × 1 | — | 1,11 | mobilidade 2 m: valor não medido; ajuste parcial até 1,0× |
| Dança de lâminas | duas_espadas | 0,79 | 0,30 × 3 | 0,50 | 1,32 | alvo único |
| Tempestade | duas_espadas | 1,03 | 0,35 × 4 | — | 1,03 | área: 6,18 em 6 alvos ✔ (manter) |
| Saque do vazio | katana | 1,16 | 2,40 × 1 | — | 1,16 | área: 6,93 em 6 alvos ✔ (manter) |
| Lâmina projetada | katana | 1,16 | 0,80 × 1 | 0,85 | 1,23 | alvo único |
| Rodopio | duas_katanas | 1,04 | 0,40 × 3 | — | 1,04 | área: 6,23 em 6 alvos ✔ (manter) |
| Corte que segue | duas_katanas | 1,11 | 0,90 × 1 | 1,00 | 1,24 | alvo único |
| Giro pesado | machado_grande | 0,94 | 1,20 × 1 | — | 0,94 | área: 5,64 em 6 alvos ✔ (manter) |
| Arremesso duplo | machado_pequeno | 0,70 | 0,60 × 1 | — | 0,70 | área: 1,39 em 2 alvos ✔ (manter) |
| Lançamento curvo | machado_pequeno | 1,17 | 0,90 × 1 | 0,95 | 1,24 | alvo único |
| Tempestade de machados | machado_pequeno | 0,33 | 0,50 × 1 | — | 0,33 | área: 1,96 em 6 alvos ✔ (manter) |
| Moedor | dois_machados | 1,13 | 0,30 × 5 | — | 1,13 | mobilidade 3 m: valor não medido; ajuste parcial até 1,0× |
| Tiro em leque | arco | 0,54 | 0,60 × 1 | — | 0,54 | área: 2,71 em 5 alvos ✔ (manter) |
| Brasa persistente | fogo | 0,73 | 0,40 × 1 | — | 0,73 | marca amplificadora: medir no conjunto (manter) |

### As armas continuam a ±15% com as propostas?

| Arma | Antes | Depois |
|---|---|---|
| desarmado | -8% | -9% |
| espada_curta | +8% | +8% |
| espada_longa | +0% | +0% |
| duas_espadas | +2% | +4% |
| espada_e_escudo | -9% | -9% |
| katana | +5% | +5% |
| duas_katanas | +8% | +7% |
| machado_grande | -13% | -13% |
| machado_pequeno | -1% | -1% |
| dois_machados | +12% | +12% |
| arco | -5% | -5% |

Fora de ±15% depois: nenhuma.

Gerado em 199 s.