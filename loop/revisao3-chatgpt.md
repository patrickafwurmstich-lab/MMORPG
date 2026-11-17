# Revisão rodada 3 — ChatGPT — **NÃO APROVADO** (1 bloqueador documental)

Rodou check_v3.py: TUDO OK, mas as verificações não pegavam uma divergência de unidade.

## Pontos da rodada 2
Sim: B1 separação de protegidos, B2 abrigo fiscal/quotas, B3 DES/compromisso, I1 indexação limitada, I4 regras e fichas, I5 mentoria.
Parcial: I2 "consistência de estilo" sem fórmula; I3 Controle pode contar 2 sucessos por oportunidade.
Afinidade 30 × 26,25 não é bloqueador; dominância DES/Vento segue como hipótese de teste.

## Bloqueador
**A tabela econômica usa a base errada (G.1–G.2).** R₁ = 870, mas os ralos estão em % de R (25+20+15+12+15 = 87%) → S = 756,9 e F − S = +113/h. O script usa F = 0,87 e S = 0,87 (ralos absolutos da base antiga 1.000), por isso dá u = 0. "O modelo foi calibrado corretamente; o cabeçalho da tabela não foi atualizado."
→ Duas bases: **B(c) = 1000 × 1,20^(c−1)** (ralos em % de B) e **R(c) = 0,87·B(c)** (torneiras em % de R). Camada 1: manutenção 250, consumíveis 200, serviços 150, mercado 120, cosméticos 150 = 870. Verificação `assert torneiras_normais == ralos_normais`.

## Importantes
- **I1** D.2 aplica o Ímpeto sem gastá-lo → usar **Ímpeto_gasto** (ataques normais = 0).
- **I2** Soma de 4 medidas tem unidades diferentes → q_j = resultado da Arte / resultado público; **S = média dos 4 q_j ≤ 1,10** e vantagem em no máximo 2 medidas.
- **I3** Consistência de estilo → registrar até **12 encontros válidos por dia** nos 14 dias; **C = 100 × compatíveis / registrados**; exigir 12 encontros em ≥ 3 dias distintos; dia sem jogar não reduz; os 12 primeiros do dia entram automaticamente.
- **I4** Controle pode passar de 1 → sucesso vale 0 ou 1 por oportunidade; conjuração = 1 oportunidade por execução; postura < 30% = 1 episódio.

## Opcional
Script: verificar as 4.941 combinações DES 0–60 × Ímpeto 20–100 + caso zero (a função dava número de golpes > 0 com Ímpeto 0).

**Veredito:** NÃO APROVADO nesta versão escrita; a pendência bloqueadora é só a base dos ralos. "Não reabro a exigência de provar balanceamento."
