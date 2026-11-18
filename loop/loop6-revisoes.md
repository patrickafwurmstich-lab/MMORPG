# Loop 6: revisão do simulador v3 (commit 38eabc9)

**As duas IAs deram NÃO APROVADO.**

## ChatGPT (rodou o código; com 3 correções, o grupo misto passou de 26/40 para 36/40 vitórias)
- **B1:** a linha que aplica ponto fraco ×1,5 e Brasa ×1,08 tinha ficado dentro de um comentário. Erro meu ao editar; corrigido no v3.1.
- **B2:** a zona era publicada no fim do preparo, então sobrevivia a uma interrupção. Os ganhos de Ritmo, Fluxo, Frenesi e Marca aconteciam ao pagar a ação, não no acerto.
- **B3:** o Golpe de Ímpeto misturava o principal e a continuação: pesos, impacto e +8%. O tempo da continuação também estava errado.
- **B4:** problemas nas misturas e nos efeitos elementais:
  - o contato elemental guardava um jogador só e era apagado depois da reação;
  - o impacto da reação saía sem FOR/CON;
  - fx.r valia "todos";
  - a Lava não tinha tiques;
  - o apoio não estava implementado;
  - Gelo, Terra e Água não seguiam o D.3.
- **B5:** o Grito multiplicava por ×3 (usava os segundos restantes como intensidade) e era interrompido automaticamente. A fúria começava sem exigir vida ≤ 25%.
- **B6:**
  - Frenesi não acelerava;
  - as duas katanas tinham 0,30 s de invulnerabilidade, em vez de 0,24;
  - o saque da katana saía sem bainha;
  - o Flanco no chefe valia 80% do tempo, sem estado.
- **Pontos importantes:**
  - o aggro não seguia o D.5;
  - a busca escolhia pelo boneco;
  - o nível 100 herdava as escolhas do nível 15;
  - as rotas eram fixadas no início;
  - o limite de PER ≥ 15 na Precisão é hipótese;
  - os ensaios usavam sementes diferentes.
- **B:** baixar o dano (o candidato é P_arma 65), não as vidas. Exigir os três critérios juntos.
- **C:** medir P65 com o dano do chefe em 100, 75, 60 e 50%. Sem regra nova para poções: basta uma política que guarde reserva.
- **E:** não aplicar buff global. Ajustar K por 1,20/ρ só em alvo único. Medir área nos alvos do projeto e técnicas mágicas no perfil Mago. Valorizar mobilidade e marcas separadamente.

## Grok
- Disse que o motor já serve para comparar builds, mas ainda não para fechar números de contrato.
- **B:** subir as vidas ×1,45 e o DPS de referência do papel para cerca de 85.
- **C:** pacote para o chefe:
  - vida 175 mil;
  - danos −33%;
  - reserva 900;
  - reanimação custando 50 fixos do ajudante.
- **D:**
  - Fogo de −30 para −18;
  - Flanco de +30% para +20%;
  - Machado grande: pT 1,40, pK 2,05, lK 0,92;
  - bloqueio deixando passar 15%;
  - área 40% bloqueável;
  - Leitor com leitura de 6 s.
- **E:** reclassificar o que é controle e subir as Execuções que continuarem abaixo.

## O que entrou no v3.1
- Todos os bloqueadores do ChatGPT foram corrigidos (detalhes no cabeçalho do `relatorio3.md`).
- As propostas de número das duas IAs viraram **ensaios** com as mesmas sementes. Nenhuma foi adotada.
