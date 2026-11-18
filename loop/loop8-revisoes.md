# Loop 8: simulador v3.2 e calibrações (commit f6fbd43)

## ChatGPT: **APROVADO**
- Os três bloqueadores do loop 7 foram resolvidos, conferidos com testes: Frenesi 2 cargas no leve duplo, bloqueio com barreira e Grito corretos, bainha sem NaN.
- **Calibração A aprovada como referência.** O ChatGPT repetiu o AO.1 com 400 tentativas: 311/400 = 77,75% [73,4–81,6], em 6,32 ± 0,06 min, com 0,17 reanimação por tentativa.
- **Adotar:**
  - P_arma 57,5 (fator 0,5227 sobre a tabela);
  - vidas do contrato;
  - ataques do chefe a 52%: 156 / 114,4 / 166,4 / 93,6;
  - reserva 600;
  - bloqueio 30%;
  - DPS de referência documental ≈ 62.
- **Armas:**
  - Dois machados: Frenesi +2% por acerto (teto 10%), leve 0,34;
  - Machado grande: leve 0,92, pesado 2,05, pesado 1,40 s.
- **Ressalvas:**
  - reotimizar as preparações dentro de A;
  - a equivalência de escala entre P e vida vale só na relação dano/vida;
  - manter as exclusões declaradas junto das conclusões.

## Grok: **NÃO APROVADO** (com condição)
- Concorda que A é o único candidato que fecha fera, constructo e duração do chefe.
- Pede três ajustes antes de cravar:
  - Tanque ≤ 15%: bloqueio 15% + área 40%;
  - reanimações ≥ 0,5: reserva 750 ou reanimação 50 fixos;
  - P_arma 60 com chefe ~55% ou atualizar o 70 do contrato.
- **Armas:** os mesmos ajustes do ChatGPT.

## Loop 9 (`sim/final.js`)
- Com os ajustes de arma, todas as armas ficaram a ±15%.
- Com as preparações reotimizadas, A deu 6/8 perfis (Força +18%, Tanque +20%) e AO.1 84,5% em 6,2 min.
- As variações do Grok deixam o chefe trivial: 99–100% de vitória e 5–5,6 min.
- Pergunta levada às IAs: medir a sobrevivência dos perfis de VIG no critério?
