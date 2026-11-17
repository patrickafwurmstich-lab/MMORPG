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
- [ ] Revisão 2 enviada aos dois (`loop/loop3-revisao2-mensagem.txt`) → corrigir até aprovarem
- [ ] Perguntas finais ao Lucas (último do loop)
