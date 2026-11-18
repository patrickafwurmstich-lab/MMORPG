# Loop 7: revisão do simulador v3.1 (commit a7de3b5)

**As duas IAs deram NÃO APROVADO**, mas as duas revisões estão convergindo.

## ChatGPT
Os bloqueadores B1–B6 do loop 6 ficaram resolvidos ou quase. Restavam três erros localizados:
1. **Frenesi:** o ganho era por ação, e deve ser por acerto. O leve duplo dava 1 carga; o certo são 2.
2. **Bloqueio:** ignorava o Grito e a barreira de Terra. A correção é usar a mesma resolução final do golpe.
3. **Bainha da katana:** `ultFimOf` começava indefinido. Além disso, cancelar a recuperação dava um saque carregado sem a katana ter sido guardada.

Pontos menores:
- a continuação do Ímpeto sem o +8%;
- a cota da Leitura;
- a ameaça dos adds;
- as formas de mistura representadas só em parte.

**Calibração:** o ChatGPT rodou ensaios extras e propôs **P_arma 57,5 + dano do chefe 52%, mantendo as vidas e a reserva**. Na medição dele, isso cumpre as três faixas.

**Dois machados:** corrigir primeiro o ganho por acerto. Se continuar perto de +20%, cortar 8% do K (leve 0,35; pesado 1,15).

## Grok
- Disse que o v3.1 está tecnicamente sólido.
- Chamou de bloqueadores a calibração em aberto, Dois machados +19% e o AO.1 fora da meta.
- **Proposta híbrida:**
  - P_arma 90;
  - vidas ×1,30;
  - AO.1 com 160 mil de vida e dano −30%;
  - reserva 900;
  - reanimação custando 50 fixos;
  - bloqueio deixando passar 15%;
  - área 40% bloqueável.
- **Dois machados:** Frenesi +2% por acerto e leve 0,34.
- **Machado grande:** pT 1,40, pK 2,05, lK 0,92.
- Apontou o resistQ como 10 s contra os 8 s do contrato. **Verificado: não é erro.** São 2 s de atordoamento + 8 s de resistência.

## O que entrou no v3.2
- Os três bloqueadores do ChatGPT e os pontos menores foram corrigidos.
- `sim/candidatos.js` compara as duas calibrações com as mesmas sementes. **A (ChatGPT) cumpre todas as metas; B (Grok) erra a duração e a dificuldade** (100% de vitória em 4,6 min).
