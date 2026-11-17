# Árvore de habilidades — 07. Mistura de elementos (decisão do Lucas)
> "Até 3 elementos, porque ele pode misturar; assim dá mais liberdade para testar combinação, tipo fogo com água, e a quantidade de pontos em cada um dá algo diferente."

## 1. Acesso
- **1º elemento**: escolhido na criação. **2º**: a partir do nível 30. **3º**: a partir do nível 60. Cada um abre a **árvore completa** daquele elemento (24 nós, 41 PH), com o mesmo custo.
- Domínio é **por elemento** (tempo de combate válido usando técnicas dele).
- Respec troca elementos pela regra normal (§6 do sistema). Arena/Provação: até 3 elementos, dentro dos 63 PH.
- O preço da liberdade são os **PH**: 103 no nível 100; 3 árvores inteiras custariam 123. Quem abre 3 elementos não completa 3 — e ainda precisa de arma e disciplina.

## 2. Potência do elemento (especialista × misturador)
Cada elemento tem um **peso** = PH investidos naquela árvore.
- **Efeito do elemento** (−30·s de armadura do Fogo, Lento do Gelo, +25% de impacto do Raio etc.) × **(0,70 + 0,30 · PH_elemento ÷ PH_do_seu_maior_elemento)**.
- Quem tem 1 elemento só: sempre 100%. Quem divide 20/20: os dois a 100%. Quem tem 30/10: o principal a 100%, o segundo a 80%.
- Dano das técnicas **não** muda (continua K × atributos); só o efeito secundário.

## 3. Reação elemental
Quando um alvo está com o **efeito de um elemento seu** (A) e você o acerta com uma técnica de **outro elemento seu** (B) em até **4 s**, acontece a **reação A+B**.
- A **forma** da reação depende da sua divisão de PH entre as duas árvores: **p = PH_A ÷ (PH_A + PH_B)**.
  - **A dominante**: p ≥ 0,65 · **Equilíbrio**: 0,35 < p < 0,65 · **B dominante**: p ≤ 0,35.
  - Ex.: Fogo 30 / Água 10 → p = 0,75 → **Fogo dominante** (Ebulição). Fogo 20 / Água 20 → **Equilíbrio** (Névoa curativa). Fogo 8 / Água 28 → **Água dominante** (Apagar).
- Requisito: ter comprado o **tronco** (nós 01–06) das duas árvores.
- **Contrato** (§7.1 do sistema): a reação é **parcela derivada** — não gera recurso nem conta para Leitor/domínio/afinidade, não aplica elemento (não encadeia), profundidade 1. Dano da reação: K da tabela × pesos de conjuração (POT 0,6 / CON 0,4); não crita.
- **Recarga interna**: reação de dano/controle 1× por alvo a cada **6 s** por jogador; reação de apoio (em você/aliados) 1× a cada **12 s**.
- **Chefe**: só dano, impacto e postura (empurrão, Preso, puxão e Lento não valem; atraso de preparo só nos ataques compatíveis). **PvP**: controles entram na categoria única do núcleo; Preso dura metade.
- Reações só com **os seus** elementos. Misturar com o de um aliado continua sendo a Arte **Fusão**.

## 4. As 15 misturas × 3 formas = 45 reações
| Mistura | A dominante | Equilíbrio | B dominante |
|---|---|---|---|
| **Fogo + Gelo** (opostos) — Vapor | **Escaldar**: explosão K0,80 em 2 m; remove o Lento do alvo | **Névoa**: nuvem de 3 m por 4 s; projéteis que entram saem com dispersão ±6°; você sai da mira de comuns 1 s | **Choque térmico**: −20 de postura e −15·s de armadura extra por 4 s |
| **Fogo + Raio** — Plasma | **Arco ígneo**: K0,60 salta para 1 inimigo a 4 m e aplica Queimando (20% do dano do salto) | **Clarão**: interrompe comuns a 3 m (1 aplicação de controle) | **Fusível**: interrompe o alvo e +15 de impacto |
| **Fogo + Terra** — Magma | **Lava**: poça de 2 m por 4 s, K0,15 por tique | **Obsidiana**: você recebe −10% de dano por 4 s | **Erupção**: I30; comum é levantado 1 s |
| **Fogo + Vento** — Incêndio | **Redemoinho de fogo**: o Queimando do alvo passa a 2 inimigos a 3 m (tempo restante) | **Corrente quente**: você e aliados a 4 m +10% de movimento por 3 s | **Brasa ao vento**: K0,50 e empurra 2 m |
| **Fogo + Água** (opostos) — Vapor escaldante | **Ebulição**: K0,90 num golpe só | **Névoa curativa**: aliados a 3 m (máx. 4) movem 40·s da **própria** reserva para a vida | **Apagar**: tira Queimando de aliados a 3 m e o alvo perde 20 de postura |
| **Gelo + Raio** — Supercondutor | **Estilhaço elétrico**: K0,70; o alvo recebe +10% de dano por 3 s | **Paralisia**: próximo ataque do alvo com preparo +0,20 s (não soma com outras fontes) | **Condução fria**: interrompe e Lento 2 s |
| **Gelo + Terra** — Permafrost | **Chão congelado**: área de 3 m com Lento por 3 s | **Rocha-gelo**: seu próximo Muro de gelo ou Pilar em 6 s tem +50% de vida | **Avalanche**: I35; comum é derrubado |
| **Gelo + Vento** — Nevasca | **Tempestade de gelo**: área de 3 m, K0,20 × 3 tiques | **Vento cortante**: alvos a 3 m com −10% de velocidade de ataque por 4 s | **Rajada gélida**: empurra 3 m e Lento 1 s |
| **Gelo + Água** — Congelar | **Prisão de gelo**: comum fica Preso 1,5 s | **Água viva**: remove 1 estado de um aliado a 4 m | **Granizo**: K0,60 em até 3 alvos a 3 m |
| **Raio + Terra** (opostos) — Aterramento | **Descarga**: K1,00 num golpe só | **Para-raios**: por 4 s, projéteis que passam a 2 m de você saem com dispersão ±6° | **Ímã**: puxa comuns a 4 m 2 m na direção do alvo |
| **Raio + Vento** — Tempestade | **Relâmpago em cadeia**: K0,40 salta para 2 alvos a 4 m | **Olho da tempestade**: sua recuperação +10% por 3 s (teto 1,45) | **Trovão**: I20 e empurra 2 m |
| **Raio + Água** — Eletrocução | **Choque**: K0,80 e interrompe | **Corrente**: por 4 s, seus golpes no alvo passam 10% a 1 inimigo a 3 m (sem passar de novo) | **Água ionizada**: aliados a 3 m (máx. 4) limpam 1 estado |
| **Terra + Vento** — Tempestade de areia | **Areia pesada**: Lento 2 s e −10 de postura | **Cortina de poeira**: nuvem de 3 m por 3 s com dispersão ±6° para projéteis | **Pedregulho**: projétil K0,70, I25 |
| **Terra + Água** — Lama | **Atoleiro**: área de 3 m com Lento por 3 s | **Barro**: você recupera 15 de postura | **Enxurrada**: empurra 3 m em linha (comuns) |
| **Vento + Água** (opostos) — Maré-ventania | **Tromba d'água**: K0,50 e puxa 2 m | **Brisa úmida**: aliados a 4 m +10% de regeneração de resistência por 4 s | **Onda**: K0,60 em linha de 5 m e empurra 1 m |

(Ordem A/B = a ordem do nome: em "Fogo + Gelo", A = Fogo.)

## 5. Ressonância tríplice (só com 3 elementos)
Aplicar os **3 elementos seus** no mesmo alvo em até **6 s** → a próxima reação sua nesse alvo tem **+15% de dano** e ignora a recarga interna de 6 s **uma vez**. Recarga 20 s. Não gera recurso; não acumula.

## 6. O que muda nas outras regras
- Os nós de cada árvore elemental continuam valendo só para técnicas daquele elemento.
- Imbuir: 1 elemento por ação (a reação é que mistura). Sobrecarga e Modelagem funcionam em técnicas de qualquer elemento seu.
- **Maré** (Arte 21): troca o elemento das ações para o oposto do elemento usado; a reação conta o elemento aplicado de fato, mas usa a forma pela divisão de PH das árvores que você tem (sem árvore do oposto: forma Equilíbrio).
- Testes prioritários (somar à tabela do §9 do sistema): especialista 41 PH × misturador 20/20 × triplo 14/14/13 no mesmo encontro; reações de controle em grupo de 6; Ressonância com Sobrecarga.
