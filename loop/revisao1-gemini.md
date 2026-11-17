# Revisão rodada 1 — Gemini — **"APROVADO COM RESSALVAS CRÍTICAS"**
(aprovação condicionada aos bloqueadores → conta como NÃO APROVADO até aplicar)

> A resposta veio duplicada/truncada no meio (o Gemini recomeçou a análise). Resumo das duas partes.

## Bloqueadores
1. **Afinidade** (B.1): vetor de comportamento não pode pôr mais de **45%** num atributo; penalidade de concentração `× (1 + 0,15 × max(0, concentração − 0,45))`. (Na primeira metade sugeriu desconto por sinergia de 2 atributos de apoio.)
2. **Controlador** (G.3): corte máximo de contratos **15%** (piso 85%); **reparo indexado** ao ouro médio: `Base × (ouro médio/esperado)^0,5`; proteger os **3 primeiros andares em 90%**.
   - Nota do Claude: o Gemini leu o cenário pessimista como deflação; na verdade é **inflação** (sobra ouro). Mas o ponto vale: o novato pobre sofre com o corte mesmo quando o servidor está rico. Proteger andares iniciais faz sentido.

## Importantes
3. **Artes Singulares**: trocar "1 por servidor para sempre" por **posse temporária**: depois de 720 h (30 dias), o Leitor reavalia os jogadores ativos e reatribui ao de maior compatibilidade recente. Mata venda de conta e vantagem de quem logou primeiro.
4. **Parry**: janela no cliente 200 ms (animação de 180 ms), servidor valida por timestamp com tolerância ±50 ms.

## Opcionais
5. **Leitura do grupo**: telegrafar 5 s antes (pulso elemental + símbolo no chão).

## Quebras encontradas
- **Macro no Leitor de Estilo**: só pontua com dano real recebido/causado e variedade de oponente; inputs em loop sem variação zeram o contador.
- **Monopólio de nós de coleta**: pureza do material cai se o mesmo jogador coleta o mesmo nó várias vezes em 2 h.

## Resolve as reclamações?
Progressão previsível: sim. Meta: parcial (afinidade). Chefe de DPS: sim. Guias: sim (citou "SADP", que não existe no v1 — confundiu com o plano dele). Andares mortos: sim.
