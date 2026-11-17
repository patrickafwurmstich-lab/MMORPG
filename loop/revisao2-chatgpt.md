# Revisão rodada 2 — ChatGPT — **NÃO APROVADO**

## Críticas da rodada 1
Sim: B3 parry/fadiga, B7 elementos, I1 afinidade (30 × 26,25 aceitável), I2 respec, I4 âncoras.
Parcial: B1 economia, B2 Ímpeto, B4 Artes (faltam as fichas), B5 Singulares (pontuação indefinida), B6 Leitor, I3 leitura do chefe (papéis não definidos), I5 rede (falta critério contra fraude), I6 andares antigos, I7 escalas econômicas por camada, I8 simulação sem verificações automáticas.
Trecho perdido da rodada 1: I7 escalas verticais; I8 coeficiente K omitido e limites da simulação; quebras principais eram Ímpeto/Vento/Eco, parry/fadiga, Água, afinidade, encontros artificiais, cotas por personagem, mentoria e Inversão.

## Bloqueadores
**B1 — Proteção dos ralos existe no texto, mas não no script.** O texto isenta andares 1–3 da indexação, mas o script indexa toda a parcela. E os 10% protegidos são hipótese fixa. Teste dele: proteção também nos ralos → 10%: ×1,24 · 50%: ×1,73 · 90%: ×3,32. "×1,22 não é propriedade geral do controlador."
→ Separar torneiras protegidas, despesas protegidas e população por camada; testar 0/10/50/90%, mercado zero, entrada/saída de contas.

**B2 — Proteção vira abrigo fiscal para veteranos.** Contrato antigo paga pelo maior patamar; se "protegido" for por local, veterano ganha R da camada 10 (×5,16) nos andares 1–3 sem corte.
→ Proteção ligada ao **progresso pessoal** (termina na 1ª conclusão do andar 3; voltar não restaura); 8 contratos/dia **por conta**; cota de NPC por conta; definir duração e recompensa dos contratos.

**B3 — Mais DES piora as continuações.** DES +39 → 192 de dano em 0,36 s; +40 → 194 em 0,54 s (+1,1% dano, +50% de tempo). Mesmo no limiar Ímpeto 69→70. Postura ×0,35 por continuação triplica de 1 para 3.
→ Tempo total do conjunto = 0,45 × Ímpeto/100, dividido entre os golpes; impacto total = 0,35 × I_leve × Ímpeto/100, dividido; jogador **escolhe** gastar o Ímpeto (não é obrigatório no próximo ataque); Ímpeto 0 = nada. O fator (1 + 3rDES) não está reprovado; comparar em dano por tempo total.

## Importantes
- **I1 Indexação coletiva cobra dos pobres a riqueza dos ricos**: se M/M* = 2, reparo dobra para quem não tem nada. → limitar o fator a **0,8–1,25**, indexar pelo patamar econômico, re-simular; calibrar o normal para ~**870 ouro/h** mantendo ralos absolutos.
- **I2 Pontuação de Domínio não é calculável**: → exatamente **12 demonstrações pontuadas** por disputa (3 famílias × 4), equipamento sincronizado, nota **50% execução mecânica, 30% precisão normalizada, 20% cumprimento de objetivos**, empate (±0,5/100) = prova extra idêntica, sem desempate por chegada.
- **I3 Leitor sem 8 medidas normalizadas**: Controle por oportunidades; vetor mágico como 3 componentes; tirar "sequência repetida" como descarte automático (rejeita combos legítimos, aceita scripts com ruído); sinal de automação não invalida progresso sozinho.
- **I4 Faltam regras para simular combate**: resistência regenera **18/s após 0,8 s**; bloqueio deixa passar **30%** antes da armadura; parry falho custa **15 de resistência + 0,35 s**; publicar custos e recargas das 5 Artes.
- **I5 Mentoria multiplica**: teto **0,5 carga/dia por mentor** (por conta); demais duplas só reconhecimento.

## Opcionais
- F.2 pureza por nó não impede bot que roda rota; testar rotas de 10/30/60 nós.
- D.1 teste com 2 armas e 2 elementos; falsas aceitações de parry adulterado < 1%.

**Veredito: NÃO APROVADO.** "A aprovação não exige provar todo o balanceamento; exige fechar essas regras e testar um modelo que corresponda ao documento."
