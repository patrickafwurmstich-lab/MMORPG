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
- [ ] Revisão rodada 2 → `loop/revisao2-*.md`  ← PRÓXIMO
- [ ] Repetir até as 3 aprovarem
- [ ] Depois: aprofundar sistema por sistema (lista de armas e técnicas, 12 famílias, catálogo de Artes, chefes dos andares 1–3, receitas)

## Próximo passo
Mandar o v2 para revisão rodada 2 (mesmas abas do Chrome: Grok, ChatGPT, Gemini), pedir também ao ChatGPT os itens depois do I7 que a leitura cortou.
