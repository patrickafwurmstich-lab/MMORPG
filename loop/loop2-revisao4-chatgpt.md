# Loop 2 — Revisão 4 — ChatGPT (sobre o v8)

## ✅ APROVADO como base de design do jogo
Rodou check_v8 (TUDO OK). B7.1, B7.2, B7.3 **resolvidos**. Pedidos do Grok atendidos (duração como modelo documental; ala em falência; ala sem líder; sucesso parcial; autorressurreição; domínio por tempo).
"O v8 atingiu o nível necessário para orientar a implementação do conjunto do jogo... A próxima etapa deve ser implementar e medir a fatia vertical."

## IMPORTANTES (correções locais, não bloqueiam)
- I1 Domínio penaliza matar rápido (mínimo de 15 s por encontro; divisão inteira) → acumular segundos válidos entre encontros; 1 unidade a cada 20 s acumulados; teto de 15 por encontro; sem mínimo por encontro.
- I2 Sucesso parcial: benefício máx. 1 intervenção por objetivo relativo à ficha-base, sem acúmulo, prazo de 30 min da 1ª concessão, 3 trocas contra a composição original, 1 recompensa por objetivo na cadeia; equivalente para tipos sem contador.
- I3 Ala em falência: alívio 1 vez por episódio; sai da falência com 3 em pé por 10 s; novo alívio só após 60 s; espera da simultaneidade 60 s por ciclo; reforço de outra ala não muda grupo nem tetos.
- I4 AY ainda manda reduzir vida quando a mecânica passa de 40% (reduzir vida AUMENTA a parcela) → primeiro reduzir trabalho mecânico, depois vida; atualizar vitória e limiares ao remover etapas.
- I5 Perseguição: falha (45 s) repete a sala atual; só encurralar avança a permutação.
- I6 Logout leva à entrada = retorno logístico → reconectar na posição persistida; entrada só para posição inválida.
- I7 Custódia da Nova Era pode bloquear muito tempo → mostrar prazo/condição; alternativa de retirada com nova extração.
## Outros
AL.6 com rótulos: encerrado por regra / mitigado / depende de validação. Relatório do check deve destacar os resultados do v8.
