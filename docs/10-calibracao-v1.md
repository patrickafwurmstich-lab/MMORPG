# MMORPG: calibração-base v1 (loops 4 a 10 do simulador)

> **Aprovado pelo ChatGPT e pelo Grok no loop 10.**
>
> **Precedência:** este documento **substitui** os valores abaixo do conjunto v8 (`08-contratos-v8.md` AI e AO.1; `08-jogo-v8.md` K.2). Tudo o que não está aqui continua valendo como está no v8.
>
> **Ferramenta:** `sim/simulador3.js` (v3.2). Conferências em:
> - `sim/resultado/fechamento.md`
> - `sim/resultado/final.md`
> - `sim/resultado/candidatos.md`

## 1. Escala de dano e de vida

| Item | v8 | Calibração v1 |
|---|---|---|
| P_arma de referência (grau 110%) | 110 | **57,5**. Fator **0,5227** aplicado a toda a tabela de armas, preservando a proporção entre graus. |
| Vida da fera / constructo (camada 1) | 650 / 1.100 | **650 / 1.100** (sem mudança) |
| Vida do chefe AO.1 | 120.000 | **120.000** (sem mudança) |
| DPS de referência do perfil (contrato AI) | ≈ 70 (modelo abstrato) | **≈ 62 medido por eventos.** O 70 fica só como referência do modelo abstrato (boneco × 0,55). |
| Reserva de cura | 600 × (1 + 0,8·rVIG) × s | sem mudança |
| Bloqueio | 30% atravessa | sem mudança |
| Reanimação | contrato (mín(30%; reserva), exige ≥ 5%) | sem mudança |

Por que a escala mudou: o simulador por eventos mediu cerca de 119 de DPS com P_arma 110. Com isso a fera morria em 3,9 s e o constructo em 7,3 s. P_arma e vida são uma escala única para o tempo de luta. Baixar P_arma mantém todas as proporções de dano entre técnicas, armas e atributos.

## 2. Chefe AO.1: dano dos ataques a 53,5%

| Ataque | v8 | Calibração v1 |
|---|---|---|
| Golpe pesado (frontal 3 m, a cada 8 s) | 300 | **160** |
| Varredura 270° (a cada 12 s) | 220 | **118** |
| Investida 25 m (a cada 20 s) | 320 | **171** |
| Chuva de pedras (a cada 25 s) | 180 | **96** |

Intervalos, avisos, impactos, fases, âncoras e adds **não mudam**.

## 3. Armas (K.2)

| Arma | v8 | Calibração v1 |
|---|---|---|
| Dois machados: Frenesi | +3% de velocidade por acerto, teto 15% | **+2% por acerto original, teto 10%.** O extra das técnicas conta 1 vez por ação. |
| Dois machados: leve | K 0,38 × 2 | **K 0,34 × 2** |
| Machado grande: leve | K 0,85 | **K 0,92** |
| Machado grande: pesado | K 1,90 / 1,70 s | **K 2,05 / 1,40 s.** As cargas continuam somando +0,5 / +1,0 / +1,5 s; o K das cargas escala na mesma proporção (2,05 / 2,59 / 3,24). |

Com esses valores, as 11 armas ficam a ±15% da média no boneco: dois machados +12%, machado grande −13% e todas as outras entre −9% e +8%.

## 4. Metas do contrato de combate e resultado medido

Condições da medição:
- jogador médio (erro de tempo σ 0,117 s);
- mesmas sementes;
- AO.1 com 400 tentativas e grupo misto (Tanque com escudo, Força com machado grande, Destreza com duas espadas, Leitor com arco, Mago desarmado, Lâmina mágica com espada longa).

| Meta | Resultado |
|---|---|
| Fera 8–12 s (perfil de referência) | **8,5 s** ✔ |
| Constructo 14–18 s | **14,9 s** ✔ |
| AO.1 médio: 70–85% de vitória | **80,0%** [75,8–83,6] ✔ |
| AO.1: tempo da vitória 6–10 min | **6,25 min** ✔ |
| Reanimações > 0 | 0,16 por tentativa ✔. Fica para acompanhar no protótipo, não é meta de calibração. |
| Armas a ±15% no boneco | 11 de 11 ✔ |

## 5. Regra de perfis (nova)

| Perfis | Critério ofensivo (constructo solo) | Critério defensivo |
|---|---|---|
| Destreza, Força+Destreza, Leitor (PER), Mago, Lâmina mágica, Generalista | tempo de luta ≤ 15% acima do melhor | registrar em separado |
| **FOR/VIG ("Força") e VIG/FOR ("Tanque")** | tempo de luta ≤ **25%** acima do melhor | **obrigatório:** tempo até a primeira queda ≥ 20% maior que o de FOR/DES no ensaio controlado (constructo de estresse com 55.000 de vida e ataque de 640). O constructo letal (dano ×1,5) fica como teste complementar. |
| No AO.1 (grupo misto) | Tanque: quedas ≤ média do grupo e DPS ≥ 50% do melhor | — |

Resultado medido:
- **Força +18% e Tanque +20%** no tempo de luta.
- No ensaio controlado, FOR/VIG e VIG/FOR sobrevivem **+26%**. As duas IAs concordaram que 1,3× não é exigido.
- Os outros 6 perfis ficam a ≤ 13% do melhor.
- No AO.1, o Tanque tem 0,20 queda por tentativa (média do grupo 0,65) e 78% do DPS do melhor.

## 6. Pendências de conteúdo (não bloqueiam esta calibração)

1. **Força com machado grande no AO.1:** 0,95 queda por tentativa e 57% do DPS do melhor com a política "ruptura". Na triagem do ChatGPT, só trocar para "sustentado" já deu +25,6% de DPS e 0,68 queda. Meta proposta pelo Grok: quedas ≤ 1,1× a média e DPS ≥ 65% do melhor.
2. **Fogo dominante** (−30 de armadura contra A = 50 vale cerca de +16%) e **Flanco +30%**. O pacote Fogo −18 / Flanco +20% fica para uma passada posterior de conteúdo, não entra nesta calibração.
3. **Reanimação rara** (cerca de 0,16 por tentativa): medir no protótipo. Reanimação "50 fixos do ajudante" foi reprovada porque deixa o chefe trivial.
4. **16 técnicas de Execução abaixo de 1,20× em alvo único.** 7 delas passam quando medidas nos alvos do projeto. Ajustar K pelo fator 1,20/ρ só nas de alvo único sem outro papel. A lista está em `relatorio3.md` §6.
5. **Fora do escopo do simulador:**
   - Água;
   - controle e apoio das formas de mistura;
   - guardas da âncora 3;
   - ameaça própria dos adds;
   - Leitura "contra distância" e "contra interrupção";
   - Fadiga do chefe;
   - passivas de texto, nós-chave, Artes e afixos.

   A aprovação **não** homologa esses sistemas.
