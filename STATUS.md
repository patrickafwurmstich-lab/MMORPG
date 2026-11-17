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
- [~] Fase 1 (planejamento): briefing `loop/fase1-briefing.txt` enviado às 3 IAs logadas (17/11 10:40).
      Respostas → `loop/fase1-chatgpt.md`, `loop/fase1-grok.md`, `loop/fase1-gemini.md`
      (`loop/rodada1-gemini.md` = teste antigo com Gemini deslogado/Flash Lite, só referência)
- [ ] Rodada 2: crítica cruzada → `loop/rodada2-*.md`
- [ ] Documento de sistemas consolidado → `docs/01-...`
- [ ] Simulação das fórmulas → `sim/`
- [ ] Rodadas extras por sistema (combate, habilidades, economia...)

## Próximo passo
Coletar as respostas da rodada 1.
