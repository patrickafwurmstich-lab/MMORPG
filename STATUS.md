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
- [ ] Revisão loop 2 rodada 2 (v6) → `loop/loop2-revisao2-*.md`  ← PRÓXIMO
- Nota: ler respostas longas do ChatGPT: get_page_text corta; usar scroll + screenshot a partir do heading da última resposta
- [ ] Repetir até as 3 aprovarem
- [ ] Depois: aprofundar sistema por sistema (lista de armas e técnicas, 12 famílias, catálogo de Artes, chefes dos andares 1–3, receitas)

## Próximo passo
Mandar o v6 (3 links + check_v6) a ChatGPT (aba 'Auditoria de Sistemas MMORPG') e Grok (aba 'Análise rigorosa do MMORPG v5'); pedir que critiquem também a revisão da outra IA; repetir até as duas aprovarem.
Leitura de tabelas do ChatGPT: find "tabela com colunas ..." → read_page no ref (get_page_text omite tabelas).
