# Loop 10: fechamento (commit 87d2c7a)

## ChatGPT: **APROVADO**
- Reproduziu os resultados: AO.1 a 53,5% com 320/400 vitórias; estresse com 19,77 / 24,92 / 24,99 s.
- **Regra de VIG:** TTK ≤ 25% **e** sobrevivência ≥ 20% (obrigatória). O letal fica só como teste complementar, porque com 100% de vitória para todos ele não distingue nada.
- **Força no AO.1:** pendência de conteúdo, não bloqueador. Com a política sustentada em vez de ruptura, deu +25,6% de DPS e 0,68 queda.
- **Nota técnica:** `primeiraQueda` devolve a duração da luta quando ninguém cai. Isso deve ser marcado como "sem queda" em outros cenários.

## Grok: **APROVADO**
- Nenhum erro encontrado.
- Concordou com dano 53,5%, regra de VIG (+20%; não exigir 1,3×) e reanimação rara aceita.
- **Força no AO.1:** item de conteúdo. Meta: quedas ≤ 1,1× a média e DPS ≥ 65% do melhor.
- **Bloqueadores:** nenhum.

**Resultado:** a calibração-base foi fechada → `docs/10-calibracao-v1.md`.
