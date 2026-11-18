# Loop 9: conferência final (commit 157c895)

## ChatGPT: **APROVADO** para fechar a calibração-base, com o critério de perfis revisto
- Reproduziu A com as armas novas: 84,5% de vitória em 6,20 min.
- Ressalvas:
  - A3 estava sem a reserva 750;
  - o `varredura.js` usava caminho absoluto;
  - a busca de builds é heurística.
- **Perfis de VIG:** avaliar a defesa em separado e não dar ganho ofensivo.
  - Ensaio controlado: o tempo até a primeira queda é +26% (FOR/VIG) e +27% (VIG/FOR) sobre FOR/DES.
  - **Regra:** FOR/VIG e VIG/FOR com tempo de luta ≤ 25% acima do melhor, desde que sobrevivam ≥ 20% mais. Os outros 6 perfis continuam com ≤ 15%.
- **Dano do chefe 53,5%:** 80% [75,8–83,6] em 6,25 min. Com 55%, a vitória cai para 68%, fora da meta.
- Reanimação ≥ 0,5 não é requisito.

## Grok: **NÃO APROVADO** (falta o critério de perfis e o chefe a 55%)
- Regra de VIG parecida com a do ChatGPT:
  - TTK até +25%;
  - no AO.1, quedas do Tanque e da Força ≤ média do grupo;
  - DPS do Tanque ≥ 50% e da Força ≥ 70% do melhor;
  - constructo letal ou sobrevivência ≥ 1,3×.
- Recomendou dano do chefe 55%.
- Reanimação ≥ 0,5 passa a meta de protótipo, não de calibração.
- Reanimação com 50 fixos fica reprovada.
- Armas aprovadas.
