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

## Etapas
- [x] 00 Pesquisa de reclamações → `docs/00-pesquisa-reclamacoes.md`
- [ ] Rodada 1: propostas das 3 IAs → `loop/rodada1-*.md`
- [ ] Rodada 2: crítica cruzada → `loop/rodada2-*.md`
- [ ] Documento de sistemas consolidado → `docs/01-...`
- [ ] Simulação das fórmulas → `sim/`
- [ ] Rodadas extras por sistema (combate, habilidades, economia...)

## Próximo passo
Coletar as respostas da rodada 1.
