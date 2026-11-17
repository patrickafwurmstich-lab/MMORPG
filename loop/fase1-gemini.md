# Fase 1 — Gemini (Auto, logado) — plano

## Resumo
- **4 atributos** (1–100): FOR (poder e inércia), AGI (fluidez, frequência), VIG (densidade, postura), INT (foco mágico).
- Retorno decrescente genérico: `E = Ebase × (1 − e^(−x/K)) × fator`, K = constante do andar.
- **Dano físico** = (10 + 3,2·FOR^0,85) × (1 + AGI/250).
- **Golpes/s** = 1 + 1,5·AGI/(AGI+40). FOR alta pesa com arma pesada; AGI ajuda a cancelar animação.
- **Resistência a stagger** = 4,5·VIG + 1,5·FOR. **Mitigação física** = 75%·VIG/(VIG+120) (120 VIG → 37,5%).
- **Custo de ponto** = floor(1 + 0,05·A²); desconto de até −30% por estilo, recalculado a cada 10 níveis.
- **Habilidades (SADP)**: semente por conta que varia os limiares secundários (ex.: FOR 48–55), então um guia feito para um jogador falha para outro. Calculado no servidor.
- **Combate**: i-frame fixo de 180 ms, stamina de esquiva cresce com o peso do equipamento; bloqueio absorve 100% até a postura acabar (guard break 1,2 s); **parry de 80 ms** zera a postura do inimigo e abre crítico de 300%. Elemento troca em santuários; elemento muda o efeito secundário (gelo reduz inércia, fogo quebra armadura).
- **Aggro** = (dano + 1,5·cura + 450 por interrupção) × (1 − distância/100).
- **Chefes**: sem enrage; barra de "reserva/fadiga"; mecânicas certas (pontos fracos, fazer o chefe bater em pilar) esgotam o chefe → 15 s vulnerável.
- **Crafting**: barra de maestria; raridade sobe de forma garantida após N materiais; sub-atributos escolhidos com catalisadores (fogo → resistência/dano de fogo garantido).
- **Economia**: torneira ≤150 moedas/h em missões + ≤50/h venda a NPC; ralos: 5% no mercado, reparo 40–70/h, viagem. Regulador: se inflação diária >2%, reparo +1,5% e venda a NPC cai.
- Andar 1 fornece ligas necessárias para armadura do andar 5.
- **Riscos**: complexidade (automatizar nos 3 primeiros níveis), datamining (servidor), cartéis (limite diário de compra).
- **Protótipo**: sentir 100 vs 20 de AGI; testar parry de 80 ms a 60 FPS; crafting.

## Crítica do Claude
1. **Custo de ponto quebrado**: 1 + 0,05·A² → com atributo 100 cada ponto custa 501. Com 5 pontos por nível ninguém passa de ~30. A fórmula trava a progressão.
2. **Parry de 80 ms num MMO online é inviável**: só a latência de rede (60–150 ms no Brasil) já é maior que a janela. Precisa de janela ≥150–200 ms com validação do lado do cliente + checagem no servidor, ou parry por "leitura" (direção certa) e não só timing.
3. **Semente por conta (SADP)** é anti-guia de verdade, mas cria injustiça invisível: dois amigos fazem a mesma coisa e só um ganha. Isso parece bug para o jogador. Precisa de transparência parcial (dicas pessoais).
4. **Aggro multiplicado por (1 − distância/100)** dá aggro negativo acima de 100 m e zera quem luta à distância — ok para chefe, mas quebra para mobs.
5. **4 atributos é pouco** para "tudo conversar" e gerar divergência; com 4 a combinatória é pequena e o meta aparece rápido.
6. **Raridade que sobe por quantidade de material** = grind puro com barra de progresso. Resolve RNG, mas não traz decisão.
7. **Economia**: 200 de torneira vs ~60–80 de ralo por hora = inflação estrutural de ~120/h por jogador. O regulador de 1,5% não compensa isso.
8. **Fadiga do chefe + fazer bater em pilar** é ótimo: transforma chefe em quebra-cabeça de ambiente. Guardar.
9. **Elemento muda o efeito secundário** (gelo = inércia, fogo = quebra de armadura) conecta magia com o sistema de postura. Guardar.
