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

---

# Conteúdo v1.1 (loops 11–13)

> **Aprovação:**
> - **ChatGPT:** aprovou no loop 13.
> - **Grok:** aprovou o pacote do loop 12 (Fogo, técnicas, Força em explosão, chefe a 57%). Não chegou a revisar o loop 13 (feitiços-base e chefe a 60%) porque o plano gratuito atingiu o limite. Revisão pendente.
>
> **Precedência:** onde a v1.1 conflita com as seções 1 a 6 acima, vale a v1.1.
>
> **Conferências:**
> - `sim/conteudo.js` e `sim/conteudo2.js`;
> - `sim/mago.js` e `sim/ao1-v11.js`;
> - resultados em `sim/resultado/conteudo*.md` e `sim/resultado/mago.md`.

## 7. Mudanças

| Item | v1 | v1.1 |
|---|---|---|
| Fogo: redução de armadura | −30 | **−24.** Contra A = 50, isso vale +10,6% de dano (antes +13,6%). |
| Lança ígnea | 0,7 s | **0,9 s** (K 1,20, custo 18 e recarga 4 s iguais) |
| Feitiços-base (Projétil / Área) | 1,40 / 1,60 (Vento 1,30 / 1,50) | **1,60 / 1,80 (Vento 1,50 / 1,70)**, em todos os elementos |
| Lâmina projetada (katana) | K 0,80 | **K 0,85** |
| Dança de lâminas (duas espadas) | K 0,30 × 3 | **K 0,40 × 3** |
| Passo de sombra, Corte que segue, Lançamento curvo | — | **sem mudança.** Têm utilidade que o simulador não mede (reposicionar, perseguir, contornar guarda). |
| Técnicas de área, Corte de avanço, Moedor, Brasa persistente | — | sem mudança |
| Grupo de referência do AO.1 | Força com machado grande em "ruptura" | **Força com machado grande em "explosão"** (guarda o pesado para as janelas). Alternativa: "sustentado" com carga 1. |
| Ataques do AO.1 | 53,5% do v8 (160 / 118 / 171 / 96) | **60% do v8: Golpe pesado 180, Varredura 132, Investida 192, Chuva 108** |
| P_arma, vidas, reserva, bloqueio, reanimação | — | sem mudança |

Por que o chefe subiu de 53,5% para 60%: o grupo de referência ficou mais forte. A Força passou a jogar melhor (explosão) e os feitiços foram reforçados. Isso ajusta só este encontro; a escala global do jogo continua a mesma.

## 8. Resultado medido (benchmark novo)

| Meta | Resultado |
|---|---|
| AO.1, jogador médio: 70–85% de vitória | **75,5%** [71,1–79,5] ✔ |
| AO.1: 6–10 min | **6,07 min** ✔. Está perto do limite inferior; acompanhar no protótipo. |
| Força no AO.1: quedas ≤ 1,1× a média do grupo e DPS ≥ 65% do melhor | **0,43×** e **73%** ✔ |
| Perfis ofensivos a ≤ 15% do melhor | 6 de 6 ✔. Contra a referência atualizada (FOR/DES 11,302 s): Mago +13,7%, Lâmina mágica +10,0%. |
| Perfis de VIG a ≤ 25% | FOR/VIG ≈ +25,0%; **VIG/FOR +25,65%.** Ficam na margem e em acompanhamento: não se declara cumprimento estrito de 8 de 8. |
| Fogo à frente do 2º melhor elemento (tempo solo) | Mago desarmado −10,3%; Lâmina mágica −4,5%; Mago com espada curta −5,6%. Dentro da faixa combinada (até cerca de 10% em encontro neutro). |
| Armas a ±15% no boneco | 11 de 11 ✔ (o reforço só mexe em técnicas elementais) |

## 9. Pendências depois da v1.1

1. **Revisão do Grok do loop 13** (feitiços-base e chefe a 60%), quando o plano dele liberar.
2. **Tanque (VIG/FOR) na margem de 25%:** acompanhar.
3. **Duração do AO.1 perto de 6 min:** acompanhar no protótipo.
4. **Builds físicas quase não ganham com elementos no tempo solo.** Meta de conteúdo (Grok): pelo menos um elemento dar ≥ +5% para builds físicas em cenário com adds ou com quebra de postura.
5. A **reanimação** continua rara (cerca de 0,15 por tentativa).
6. As exclusões do simulador (§6.5) continuam valendo.
