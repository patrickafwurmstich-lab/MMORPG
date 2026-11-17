# Árvore de habilidades — 07. Mistura de elementos (decisão do Lucas)
> "Até 3 elementos, porque ele pode misturar; assim dá mais liberdade para testar combinação, tipo fogo com água, e a quantidade de pontos em cada um dá algo diferente."

## 1. Acesso
- **1º elemento**: escolhido na criação. **2º**: a partir do nível 30. **3º**: a partir do nível 60. Cada um abre a **árvore completa** daquele elemento (24 nós, 41 PH), com o mesmo custo.
- Domínio é **por elemento** (tempo de combate válido usando técnicas dele).
- Respec troca elementos pela regra normal (§6 do sistema). Arena/Provação: até 3 elementos, dentro dos 63 PH.
- **Preço da mistura:** cada tronco custa 9 PH (3 troncos = 27 PH, sobram 36 no nível 60 para arma, disciplina e ramos); os PH divididos também baixam a **potência** de cada elemento (§2). O especialista fica com o efeito cheio e mais nós avançados do seu elemento.

## 2. Potência do elemento (especialista × misturador)
**q_i = 0,60 + 0,40 · PH_i ÷ (soma dos PH em todas as suas árvores elementais).**
| Distribuição | Potência |
|---|---|
| 1 elemento | 100% |
| 20/20 | 80% / 80% |
| 30/10 | 90% / 70% |
| 14/14/13 | 74% / 74% / 73% |
- Sem nenhum PH elemental: elemento inicial a 100%; os outros desbloqueados a 60%. Sem os troncos não há reação.
- **O que q multiplica** (só isto; dano K, duração de controle e efeitos de nós seguem as regras próprias):

| Elemento | q multiplica |
|---|---|
| Fogo | a armadura reduzida (duração igual) |
| Gelo | o % de recuperação adicional (duração igual) |
| Raio | o bônus de impacto (interrupção continua binária, respeita imunidade/compatibilidade) |
| Terra | a barreira concedida (tetos globais iguais) |
| Vento | o Ímpeto natural concedido e a distância do efeito secundário (não muda deslocamentos próprios das técnicas) |
| Água | a reserva transferida entre personagens (não muda conservação nem cura da própria reserva) |

## 3. Reação elemental
**Contato elemental:** toda técnica **original** sua que acerta um inimigo registra nele um **contato** do elemento aplicado de fato, identificado por jogador, por **4 s** (ícone visível para você e o grupo), mesmo quando o efeito do elemento não se aplica (Terra, Água, Vento instantâneo). Parcelas derivadas não registram contato. Um contato seu por alvo (o novo substitui o antigo).
**Reação:** quando um inimigo tem um **contato seu do elemento A** e você o acerta com uma técnica original de **outro elemento seu, B**, acontece a **reação A+B**: o contato preparador é **consumido**; a ação que ativou pode deixar o próprio contato. A/B seguem a ordem da tabela (em "Fogo + Gelo", A = Fogo).
- **Requisito:** troncos (nós 01–06) das duas árvores comprados.
- **Formas pelos pontos:** p = PH_A ÷ (PH_A + PH_B). Os PH **habilitam** formas e você **prepara 1 forma por mistura** (no Santuário/checkpoint, nunca em hostilidade):
  - **Equilíbrio**: sempre disponível com os dois troncos;
  - **A dominante**: disponível com p ≥ 0,70;
  - **B dominante**: disponível com p ≤ 0,30.
  - Ex.: Fogo 30 / Água 10 (p = 0,75) → pode preparar **Ebulição** ou **Névoa curativa**. Fogo 20 / Água 20 → só **Névoa curativa**. Fogo 9 / Água 28 (p = 0,24) → **Apagar** ou **Névoa curativa**. Assim, pontos diferentes dão opções diferentes, e 1 PH a mais nunca troca sozinho a forma que você usa.
- **Uma reação por ação original** (contando todos os alvos, focos e acertos); o alvo que dispara é o travado elegível, ou, sem trava, o elegível mais próximo do centro da mira. A reação ainda atinge vários inimigos se a ficha dela disser; o que nunca acontece é cada vítima gerar outra explosão.
- **Recargas** (por jogador, compartilhadas entre todas as misturas): reação de **dano/impacto/postura** 6 s (e 6 s por alvo); reação de **controle** (Preso, interrupção, atraso de preparo, Lento, empurrão, puxão, derrubar) 10 s; reação de **apoio** (você/aliados) 12 s. Reação com dano + controle usa a de controle; reação com apoio + efeito hostil consome as duas.
- **Orçamento:** K da reação pela fórmula geral com POT 0,6 / CON 0,4; dano **neutro** (multiplicador elemental 1,00), armadura normal; **não** crita e **não** herda Sobrecarga, Modelagem, Abertura nem Golpe de Ímpeto da ação que ativou; impacto da reação com o multiplicador normal de FOR/CON (Ímpeto gasto = 0); geometria fixa da tabela. Bônus próprios da reação (Ressonância) entram uma vez.
- **Contrato** (§7.1 do sistema): a reação é parcela derivada — não gera Ímpeto, Sobrecarga, Abertura nem outra carga, não conta para Leitor/domínio/afinidade, não aplica elemento nem contato, profundidade 1. Poças, saltos e Queimando de uma reação são componentes agendados **da mesma** reação (não preparam contato nem disparam outra). Recuperação de postura e cura pela própria reserva são exceções declaradas a "não gera recurso" e não disparam reembolso nem reação.
- **Lento** das reações = −30% de movimento (maior efeito prevalece; PvP teto −40%).
- **Chefe:** dano, impacto e postura valem; empurrão, puxão, Preso, Lento e derrubar não; atraso de preparo e interrupção só em ataques/conjurações compatíveis. **Benefícios em aliados continuam valendo** contra chefe (cura pela própria reserva, limpeza, proteção). **PvP:** controles na categoria única do núcleo; Preso dura metade.
- Reações só com **os seus** elementos. Misturar com o de um aliado continua sendo a Arte **Fusão**.

## 4. As 15 misturas × 3 formas = 45 reações
| Mistura | A dominante | Equilíbrio | B dominante |
|---|---|---|---|
| **Fogo + Gelo** (opostos) — Vapor | **Escaldar**: explosão K0,80 em 2 m; remove o Lento do alvo | **Névoa**: nuvem de 3 m por 4 s; projéteis que entram saem com dispersão ±6°; você sai da mira de comuns 1 s | **Choque térmico**: −20 de postura e −15·s de armadura extra por 4 s |
| **Fogo + Raio** — Plasma | **Arco ígneo**: K0,60 no total — com outro inimigo a 4 m, K0,42 no alvo e K0,18 no segundo (que recebe Queimando de 20% desse dano); sozinho, K0,60 no alvo | **Clarão**: interrompe comuns a 3 m (1 aplicação de controle); contra chefe: I10 e interrupção só em conjuração compatível | **Fusível**: interrompe o alvo e +15 de impacto |
| **Fogo + Terra** — Magma | **Lava**: poça de 2 m por 4 s, K0,15 por tique | **Obsidiana**: você recebe −10% de dano por 4 s e recupera 8 de postura | **Erupção**: I30; comum é levantado 1 s |
| **Fogo + Vento** — Incêndio | **Redemoinho de fogo**: o Queimando do alvo passa a 2 inimigos a 3 m (tempo restante) | **Corrente quente**: você e aliados a 4 m +10% de movimento por 3 s | **Brasa ao vento**: K0,50 e empurra 2 m |
| **Fogo + Água** (opostos) — Vapor escaldante | **Ebulição**: K0,90 num golpe só | **Névoa curativa**: aliados a 3 m (máx. 4) movem 40·s da **própria** reserva para a vida | **Apagar**: tira Queimando de aliados a 3 m e o alvo perde 20 de postura |
| **Gelo + Raio** — Supercondutor | **Estilhaço elétrico**: K0,70; o alvo recebe +10% de dano por 3 s | **Paralisia**: próximo ataque do alvo com preparo +0,20 s (não soma com outras fontes) | **Condução fria**: interrompe e Lento 2 s |
| **Gelo + Terra** — Permafrost | **Chão congelado**: área de 3 m com Lento por 3 s | **Rocha-gelo**: seu próximo Muro de gelo ou Pilar em 6 s tem +50% de vida | **Avalanche**: I35; comum é derrubado 1,2 s (no PvP vale a regra de controle do núcleo) |
| **Gelo + Vento** — Nevasca | **Tempestade de gelo**: área de 3 m, K0,20 × 3 tiques | **Vento cortante**: alvos a 3 m com −10% de velocidade de ataque por 4 s e −10 de postura | **Rajada gélida**: empurra 3 m e Lento 1 s |
| **Gelo + Água** — Congelar | **Prisão de gelo**: comum fica Preso 1,5 s | **Água viva**: remove 1 estado removível (exceto Ferido) de um aliado a 4 m | **Granizo**: K0,60 em até 3 alvos a 3 m |
| **Raio + Terra** (opostos) — Aterramento | **Descarga**: K1,00 num golpe só | **Para-raios**: por 4 s, projéteis que passam a 2 m de você saem com dispersão ±6° | **Ímã**: puxa comuns a 4 m 2 m na direção do alvo |
| **Raio + Vento** — Tempestade | **Relâmpago em cadeia**: K0,40 salta para 2 alvos a 4 m | **Olho da tempestade**: velocidade da sua recuperação ×1,10 por 3 s (teto 1,45; não muda execução, parry nem invulnerabilidade) | **Trovão**: I20 e empurra 2 m |
| **Raio + Água** — Eletrocução | **Choque**: K0,80 e interrompe | **Corrente**: por 4 s, seus golpes no alvo passam 10% a 1 inimigo a 3 m (sem passar de novo) | **Água ionizada**: aliados a 3 m (máx. 4) limpam 1 estado removível (exceto Ferido) |
| **Terra + Vento** — Tempestade de areia | **Areia pesada**: Lento 2 s e −10 de postura | **Cortina de poeira**: nuvem de 3 m por 3 s com dispersão ±6° para projéteis | **Pedregulho**: projétil K0,70, I25 |
| **Terra + Água** — Lama | **Atoleiro**: área de 3 m com Lento por 3 s | **Barro**: você recupera 15 de postura e recebe −5% de dano por 3 s | **Enxurrada**: empurra comuns 3 m em linha; contra chefe: I10, sem deslocamento |
| **Vento + Água** (opostos) — Maré-ventania | **Tromba d'água**: K0,50 e puxa 2 m | **Brisa úmida**: aliados a 4 m +10% de regeneração de resistência por 4 s | **Onda**: K0,60 em linha de 5 m e empurra 1 m |

(Ordem A/B = a ordem do nome: em "Fogo + Gelo", A = Fogo.)


## 5. Ressonância tríplice (só com 3 elementos)
1. A ação original aplica seu contato; 2. resolve a tentativa normal de reação; 3. se você aplicou **3 elementos distintos** naquele alvo nos últimos **6 s** (histórico próprio, que não some quando um contato é consumido), arma uma **autorização** válida por 6 s.
- Só uma ação original **posterior** consome a autorização: a reação dela ganha **+15% de dano ou +10 de impacto** (escolha na preparação; aumenta só o que já existe, nunca vira duração ou cura). **Não** dispensa recargas, imunidade nem compatibilidade de chefe.
- Recarga de 25 s, contada ao armar. Não gera recurso, não acumula, não soma com a 4ª parcela de Sobrecarga.

## 6. Fronteiras com o resto
- Os nós de cada árvore elemental continuam valendo só para técnicas daquele elemento. Imbuir: 1 elemento por ação (a reação é que mistura). Sobrecarga e Modelagem funcionam na técnica original de qualquer elemento seu (nunca na reação).
- **Maré** (Arte 21): troca o elemento aplicado de fato; para provocar reação, os **dois troncos** continuam obrigatórios (sem exceção). Contato de elemento sem tronco não alimenta Ressonância. A alternativa de 2 elementos da Maré registra **1** contato por ação.
- **Fusão** (Arte 23): continua aplicando os dois efeitos secundários; **não** dispara reação do catálogo nem conta 2 elementos para Ressonância.
- Testes prioritários (somar ao §9 do sistema): especialista × misturador 20/20 × triplo 14/14/13 com **o mesmo total de PH elementais**; reações de controle em grupo de 6; área contra 6 alvos marcados (1 reação por ação); Ressonância com Sobrecarga.
