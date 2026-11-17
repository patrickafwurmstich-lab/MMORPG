# STATUS do projeto — sistemas do MMORPG

> Arquivo de retomada. Quando o Lucas mandar "continua", ler este arquivo primeiro.

## Objetivo
Criar a MECÂNICA completa do MMORPG (sem história nem personagens): atributos, progressão,
habilidades, combate, chefes/andares (estilo SAO T1, desbloqueio coletivo), itens/criação e economia.
Combate de ação parecido com Toram, mas profundo. Cada jogador pode ser protagonista.

## Método (loop de IAs)
1. ChatGPT, Grok e Gemini propõem (sempre pedindo rigor e critério).
2. Cada uma critica as outras.
3. Claude cobra: por que isso? encaixa no resto? dá pra quebrar? é divertido de verdade?
4. Consolida em `docs/` e verifica os números com simulação em `sim/`.

## Como rodar (skill loop-entre-ias)
- Usar o **Chrome do Lucas** (Claude in Chrome), onde ChatGPT, Grok e Gemini estão logados.
- Grok: modelo grátis (Fast/Auto). **Expert/Heavy abrem tela de pagamento — nunca clicar em assinar.**
- ChatGPT: modo "Work" (caixa "Trabalhar com o ChatGPT").
- Digitar o texto numa linha só (sem quebras), Enter/botão enviar, ler com get_page_text.
- Toda mensagem começa com "Sejam criteriosos e rigorosos".
- Termina só quando TODAS aprovarem.

## Etapas
- [x] 00 Pesquisa de reclamações → `docs/00-pesquisa-reclamacoes.md`
- [x] Fase 1 (planejamento): `loop/fase1-*.md` (`loop/rodada1-gemini.md` = teste antigo deslogado, só referência)
- [x] Decisões do Lucas: Artes Únicas "fortes mas diferentes"; respec grátis até andar 5, depois custa
- [x] v1 → `docs/01-sistemas-v1.md` + `sim/check_v1.py`
- [x] Revisão rodada 1: ChatGPT NÃO, Grok NÃO, Gemini "aprovado com ressalvas" → `loop/revisao1-*.md`
      (ChatGPT achou erro na simulação econômica do Claude — corrigido no v2)
- [x] v2 → `docs/02-sistemas-v2.md` + `sim/check_v2.py` (tabela do que mudou no topo)
- [x] Revisão rodada 2: Grok APROVADO (3 ajustes), ChatGPT NÃO (3 bloqueadores), Gemini recusou 3× ("não consigo ajudar") → `loop/revisao2-*.md`
- [x] v3 → `docs/03-sistemas-v3.md` + `sim/check_v3.py` (verificações automáticas, termina em TUDO OK)
- [x] Revisão rodada 3: Grok APROVADO; ChatGPT NÃO (1 bloqueador: base dos ralos) → `loop/revisao3-*.md`
- [x] v4 → `docs/04-sistemas-v4.md` + `sim/check_v4.py`
- [x] Revisão rodada 4: ✅ **ChatGPT APROVADO + Grok APROVADO** → `loop/revisao4.md`. Ajustes finais aplicados no v4.
- [x] v4 aprovado (só fórmulas)
## LOOP 2 (Lucas: "está raso e incompleto")
- [x] Auditoria: ChatGPT = INCOMPLETO (`loop/loop2-auditoria-chatgpt.md`); Grok travado (alta demanda); Gemini recusou
- [x] Decisões do Lucas: **zonas abertas de PvP**, **morte pesada**
- [x] v5 = `docs/05-nucleo-v5.md` (parte 1, regras) + `docs/05-jogo-completo-v5.md` (parte 2, jogo concreto) + `sim/check_v5.py`
- [x] Revisão loop 2 rodada 1: ChatGPT NÃO (11 bloqueadores), Grok NÃO (4 bloqueadores) → `loop/loop2-revisao1-chatgpt.md`, `loop/loop2-revisao1-grok.md`
- [x] v6 = `docs/06-nucleo-v6.md` (parte 1) + `docs/06-jogo-v6.md` (parte 2) + `docs/06-contratos-v6.md` (parte 3: precedência, TTK, chefe/andar-piloto, Fronteira, cadeia produtiva, catálogos, Nova Era) + `sim/check_v6.py` (TUDO OK)
- [x] Revisão loop 2 rodada 2 (v6): ChatGPT NÃO (N1–N6: sincronia por custo, unidades/escala, substitutos, chefe nas escalas, Túmulo/origem, duelo); Grok NÃO (+chefes-piloto, +andar-piloto, UI do Assalto, Nova Era) → `loop/loop2-revisao2-*.md`
- [x] v7 = `docs/07-nucleo-v7.md` + `docs/07-jogo-v7.md` + `docs/07-contratos-v7.md` + `sim/check_v7.py` (TUDO OK)
- [x] Revisão loop 2 rodada 3 (v7): ChatGPT NÃO (B7.1 sincronia aumentava atributo, B7.2 duas curvas de teto, B7.3 Arena sem chão; "não pediria mais sistemas"); Grok NÃO (duração dos chefes, ala em falência; "com esses ajustes passa a ser aprovável") → `loop/loop2-revisao3-*.md`
- [x] v8 = `docs/08-*-v8.md` + `sim/check_v8.py` (TUDO OK)
- [x] Revisão loop 2 rodada 4 — **ChatGPT: ✅ APROVADO** (v8) → `loop/loop2-revisao4-chatgpt.md`; correções locais aplicadas como v8.1 (nos mesmos arquivos 08-*)
- [ ] **Grok rodada 4** ← PRÓXIMO: bateu o limite do plano grátis; reenviar `loop/loop2-revisao4-mensagem.txt` (+ avisar do v8.1 e do APROVADO do ChatGPT) quando liberar. Nunca clicar em Aprimorar.
- Nota: ler respostas longas do ChatGPT: get_page_text corta; usar scroll + screenshot a partir do heading da última resposta
- [ ] Repetir até as 3 aprovarem
- [ ] Depois: aprofundar sistema por sistema (lista de armas e técnicas, 12 famílias, catálogo de Artes, chefes dos andares 1–3, receitas)

## Próximo passo
Mandar o v8 (3 links + check_v8) a ChatGPT (aba 'Auditoria de Sistemas MMORPG') e Grok (aba 'Análise rigorosa do MMORPG v5'); pedir que critiquem também a revisão da outra IA; repetir até as duas aprovarem.
Leitura de tabelas do ChatGPT: find "tabela com colunas ..." → read_page no ref (get_page_text omite tabelas).

## Loop 3 — árvore completa (pedido do Lucas: "o bolo, não a receita")
- [x] Plano do ChatGPT → `loop/loop3-planejamento-chatgpt.md`
- [x] Escrito: sistema, 11 armas (330), 6 elementos (144), 4 disciplinas (72), 18 especializações, 15 ligações, 24 Artes
- [x] `sim/check_arvore.py` → TUDO OK
- [x] Grok aprovou o v8 (loop 2 fechado com os dois) → `loop/revisao4-grok-aprovado.md`
- [x] Revisão 1: ChatGPT e Grok NÃO APROVADO → `loop/loop3-revisao1-*.md`; tudo corrigido → `docs/09-arvore/CHANGELOG.md`
- [x] Revisão 2: Grok APROVADO; ChatGPT pediu ajustes locais → aplicados (commit baf173f)
- [x] Revisão 3: ChatGPT APROVADO → **loop 3 fechado, as duas IAs aprovaram a árvore**
- [ ] Perguntas finais ao Lucas (último do loop)

## Loop 3 — parte do Lucas (último do loop), 2026-11-17
- 8 técnicas: OK · Artes escondidas, 1 por vez: OK · próximo passo: ele vai **ler tudo primeiro**.
- MUDANÇA: **até 3 elementos** por personagem, com mistura que muda conforme os PH em cada um → `docs/09-arvore/07-mistura-elementos.md` (potência por peso, 15 misturas × 3 formas = 45 reações, Ressonância tríplice). Check: TUDO OK.
- [x] Mistura v1: os dois NÃO APROVADO → v2 juntando os dois (commit fb9272b)
- [x] Mistura v2: **Grok APROVADO + ChatGPT APROVADO**
- [ ] Lucas lê tudo e diz o que mudar (ele pediu para ler antes do próximo passo)

## Simulador de equilíbrio (2026-11-17)
- `node sim/simulador.js` → `sim/resultado/relatorio.md` e `builds.csv` (176 builds: nível 15 de referência + nível 100).
- Cumpre: ≥ 8 builds a ≤ 15% (31), armas ±15% (11/11), generalista a 7%.
- Não cumpre: perfis Força pura (+22%), Leitor/PER (+28%) e Mago puro (+33%, morre 30%) ficam fora dos 15%.
- Calibração: a árvore dá ~25% mais dano/s que o modelo de papel (AI.1: 87 vs 70) → combates mais curtos que os tempos-alvo.
- 42 das 116 técnicas de dano dão menos dano que o ataque básico (até −5%); quase todas são de controle/impacto.
- [ ] Decidir com o Lucas / mandar ao loop: Mago, PER e Força pura; calibrar vidas ou P_arma.
