# Loop 5 — revisão do simulador v2 (commit 50ff069)

Mensagem enviada: `loop5-mensagem.txt`. **As duas IAs deram NÃO APROVADO.**

## ChatGPT (GPT-6.1, 15 min, rodou o código e fez testes isolados)

### Bloqueadores do motor
1. **Fases das ações:** os golpes ficam em `p.pend` (acertam em 0,55·Tr), mas a defesa não cancela nem reprograma esses golpes. `p.ocupGrande` nunca recebe valor. Um personagem atordoado continua entregando golpes já programados. O aviso do ataque inimigo não entra na decisão. → Modelar preparo, execução e recuperação. Cancelamento defensivo só nos últimos 40% da recuperação (J.1). Ligar os impactos pendentes à ação que os gerou e cancelá-los se ela for interrompida ou o personagem cair. Usar o começo do aviso para decidir se inicia uma ação longa.
2. **Dois motores:** `dpsBoneco()` não atualiza Fluxo, Ritmo, Frenesi nem Marca. Na medição dele, a luta contra boneco sem ataques dá valores diferentes (espada longa 146,4 contra 152,1; machado grande 117,2 contra 129,4). → O boneco tem de ser uma configuração do mesmo motor.
3. **Impacto em técnicas de vários golpes:** todo o impacto vai no 1º acerto (J.1 manda dividir). Exemplo: 8×K0,25 com I40 contra postura 30 deu 225,5 em vez de 192,0 (+17,4%). Nos básicos de duas lâminas, `lI` é por lâmina, mas o motor aplica uma vez só. → Normalizar I como total, dividir entre os acertos e agendar cada acerto no seu instante.
4. **Recompensas defensivas erradas:**
   - Toda esquiva dá +6 de Ímpeto (o núcleo dá 0, e 20 só na perfeita).
   - O escudo recebe desconto duplo (÷1,33 e ×0,75).
   - Parry errado não cobra os 15R nem a recuperação de 0,35 s.
   - A área pode ser bloqueada (falta `!aoe`).
   → Declarar em cada ataque o que dá para bloquear, aparar ou esquivar.
5. **Reanimação:** o mesmo aliado pode reanimar vários ao mesmo tempo e a reanimação termina mesmo se ele cair. → Uma canalização de 4 s, interrompível, com um ajudante por alvo.
6. **Chefe:** `GLOBAL.vidaMult` continua ligado, então a vida real era 221.040 e não 120.000. O padrão de ataque também é sintético. O AO.1 tem: golpe pesado de 300 a cada 8 s, varredura de 220 a cada 12, investida de 320 a cada 20, chuva de pedras de 180 a cada 25, âncoras e adds. → Chamar o atual de "chefe sintético" e reproduzir o AO.1.
7. **Regras sem execução no motor:**
   - Condições postura<30 e postura<20.
   - Juízo inicia com o K alternativo.
   - O DoT é antecipado no acerto.
   - Lâminas em X não consome Ritmo.
   - Fluxo não exige mudança de direção.
   - A reação deveria usar a forma preparada.
   - O contato elemental precisa ser por alvo.

### Problemas de método
- "Tempo ofensivo" soma ações iniciadas → medir a união dos intervalos realmente executados.
- Os perfis só foram testados no nível 15: o n100 não é usado e o Mago tinha POT23/CON23. Lutas de 12 s são curtas para medir esgotamento.
- A comparação com a mediana mudou o denominador do contrato. Contra o melhor: Mago +25%, Força +29%, Tanque +34%.
- O IC usa 1,96 (não t). Com 10 lutas de chefe, 0/10 ainda é compatível com até 28% de vitória.
- A escala usa nível em vez de camada: `1,09^(camada−1)`.
- A busca não é equivalente: duas armas e um par diferente por perfil, e pares testados no nível 15, antes do 2º elemento (nível 30).

### Respostas às perguntas
- **B:** manter as vidas atuais e o 0,55 por enquanto. Não usar um fator único tirado da fera.
- **C:** corrigir o padrão do chefe (AO.1), sem cura fora da reserva. Ensaio sintético de 8 min: 300 a cada 8 s + 120 a cada 20 s ≈ 735/min por jogador.
- **D:** antes, corrigir o desconto duplo, o parry errado, a armadura no dano que atravessa, o peso na esquiva, a Muralha (30% aos aliados no cone) e testar grupo misto. Só depois ensaiar 20% atravessando o escudo.
- **E:** não dar +19% ao Machado grande. Primeiro corrigir. Ensaio possível: carga 2 com 2,40 s no total e carga 3 com 2,75 s, mantendo K1,90/2,40/3,00. Técnicas de Execução: dano ≥ 1,20 × DPS básico × tempo ocupado. Controle, área e suporte ficam de fora dessa regra. A tabela da seção 6 deve usar o cálculo do motor.

## Grok
Disse que a v2 "virou um instrumento sério". Bloqueadores apontados:
1. Quebra sem ×1,3 e resistQ errado. *(Verificado: incorreto. O ×1,3 está em `golpe` (`if(e.atord>0)mult*=1.3`), e resistQ = 10 equivale a 2 s de atordoamento + 8 s.)*
2. Chefe com vida diferente da anunciada (igual ao ChatGPT) e dano incompatível com 6–10 min.
3. O bloqueio com 30% atravessando e a área não bloqueável pioram o Tanque.

Propostas:
- Fator de vida ×1,30 (e não ×1,84).
- Chefe: 300 → 180, área 200 → 120, reserva 600 → 900.
- Bloqueio: 15% atravessando; área bloqueável a 50% em guarda frontal.
- Machado grande: pT 1,70 → 1,45.
- Marcar Contenção e Ruptura no ranking de técnicas.

## Consenso e próximo passo (simulador v3)
- **As duas concordam:**
  - não aplicar ×1,84;
  - registrar a vida real do chefe;
  - não criar cura fora da reserva;
  - não buffar o Machado grande no escuro;
  - classificar as técnicas por papel.
- **Divergem em:** quanto mudar o chefe, o bloqueio e o fator de vida. O Grok já propõe números; o ChatGPT quer corrigir o motor antes.
- **Ordem do v3:**
  1. Motor único com fases.
  2. Impacto dividido.
  3. Defesas corretas por ataque.
  4. Reanimação canalizada.
  5. AO.1 real e chefe sintético separado.
  6. Condições que faltam.
  7. Métricas e IC corretos.
  8. Nível 100 e escala por camada.
  9. Só então ensaiar os números do Grok.
