# Loop 2 — Revisão 2 — ChatGPT (sobre o v6)

**Veredito: NÃO APROVADO.** Rodou check_v6 (TUDO OK). "O v6 já permite iniciar o protótipo com muito menos improvisação que o v5", mas ainda exige decisões centrais na implementação. **Recomenda não acrescentar sistemas nem catálogos: corrigir N1–N6, consolidar divergências e trocar testes que verificam aproximação inadequada.** Depois disso aprova sem exigir prova de diversão.

## Bloqueadores dele da rodada 1
Resolvidos: B1, B2, B3 (falta capacidade que muda durante a expedição), B5, B8, B9 (escala de impacto/resistência pendente).
Parciais: B4 (substitutos com reserva nova), B6 (deslocamento < 3 m escapa), B7 (limiar 1 vs 3+ Infâmia), B10 (migração ignora andares 2–10, instâncias, desconectados), B11 (impactos básicos, rotas, versões).

## Pontos do Grok (avaliação do ChatGPT)
Tabela de chefes: resolvida como estrutura · TTK: parcial (referência de nível 30 não cabe no teto por andar) · matriz: parcial (justificativas; condição "por tipo" falha com o arco) · sincronia: **não resolvida** (fórmula proporcional errada com custo não linear).

## BLOQUEADORES novos
- **N1 Sincronia:** multiplicar pontos pela razão de orçamentos erra com C(x)=x+x²/40 (veterano 15/15 vs nativo 24/24 no nível 20); arredondamento elimina secundários; Arena/Provação expandindo nível 1 dá 98,5 > 60. → fator λ pelo **custo** (Σ C_af(λx) ≤ B), arredondar respeitando orçamento, 0–60, desempate, afinidade congelada na entrada, derivados recalculados; Arena/Provação com **distribuição normalizada própria editável grátis (orçamento 197)**. Testar níveis 1/20/60/100.
- **N2 Referência e escala:** referência "nível ~30, +25" impossível com teto = andar (B(10)=47 < 2·C(25)). Usar uma curva de teto única em AK/AI/onboarding/chefes. Recursos não escalam juntos: parry 4% → 1,84% da postura do chefe na camada 10; poção 25% → 11,5%; bombas/Terra fixas; bloqueio 34 → 73,8 de resistência. → quadro de unidades: HP e dano × s; **postura e impacto em unidades de referência**; bloqueio 0,08·dano/s + 0,25·impacto; poção e Água × s; reduções de armadura com s (Rachar armadura).
- **N3 Substitutos** trazem 50% de reserva nova sem limite → em combate só **reconexão**; substituto novo só entre tentativas; no campo os 25% exigem **resolução válida** do encontro.
- **N4 Chefe-piloto:** faltam impactos básicos (ex.: 10/25 padrão; machado grande 15/40; arco 6/12); Cobertura dura 2 s mas a rota pede 6 s; rota de controle depende de adds de outras âncoras; versão solo só reduz vida (~12 min de dano) → versões 1–2 / 3–6 / 12–24 com mecânicas próprias; Assalto precisa de interação **simultânea** concreta (ex.: operação de 3 s em cada ala numa janela de 10 s); dizer se a regressão de intervenção devolve a cota da rota.
- **N5 Materiais/Túmulo na Fronteira:** dono recupera 100%? grupo? primeiro saque encerra? quente quando o saqueador morre? carga convertida expira em 1 h dentro da Fronteira (brecha) → **marca persistente origem_fronteira até extração**, preservada em toda transformação; regra fechada de Túmulo; proteção de 15 s uma vez por Túmulo.
- **N6 Duelo × derrota PvP:** duelo pode gerar Túmulo ou apagar perda de XP → duelo termina em 1 HP sem derrota; dano consensual fora da atribuição; Infâmia com escopo (personagem/conta), tabela única 0/1/2/3+.

## IMPORTANTES
Todo deslocamento forçado na categoria · Chamado de Resgate: origem da vida (consome reserva do usuário, 15% HP, até 2) · autorressurreição VIG +55 antes da derrota coletiva e no teto · afinidade: alvo_i = mín(1; 2·parcela) · participação: média > 0 · participação mínima no Assalto 24 (0,42% do total) testar · leitura por ala: ataques globais com regra única · Posto global em canal limitado → instância de contestação 24 por lado · capacidade recalculada antes de entrar (impede entrada) · pesos de tudo (lingotes, componentes, consumíveis); refino não comprime · função receita → grau 100–120%, peso, propriedades · Encaixe básico/vazio sem material raro · variações das avançadas sem catálogo (escrever ou retirar) e mapear avançadas aos marcos · domínio por duração do encontro · taxa de produção em duas linhas (identificador contábil) · Nova Era: renda pelo patamar da Era ou histórico · migração para todos os locais.
OPCIONAIS: Profundezas, moradia, 100 andares, avançadas restantes como conteúdo futuro.

## Contradições
D.6 × AN.1 · Infâmia sem limiar × 3+ · S.2 × AL.2/AL.6 (dono/grupo/terceiros) · AB ainda reinicia Singulares · Z × AM (marcos) · AI.1 × AK · AI.3 × D.1/O (unidades) · AO × K.3 (Cobertura 2 s) · N/S × AI.4 (Resgate sem reserva) · AP Eco de Perseguição na mesma sala · AJ condição por tipo (arco único à distância) · AP 2 h + 1 h + 15 min = 3h15.

## Exploits
Substituição como cura · recuperação por abandono de encontro · envelhecimento da carga · lavagem por transformação · destino do saque quente na nova morte · proteção de Túmulo renovável · duelo como proteção de XP · empurrões curtos em cadeia · loot por dimensão vazia · lotação do canal do Posto · Infâmia por personagem · compressão de carga por receitas. "Saquear rende menos que coletar" não está provado (0,25V) → tratar como hipótese a medir.

## Testes pedidos
Sincronia (custo válido e 0–60 em toda entrada) · escala (mesma proporção de cura, ruptura e custo defensivo entre camadas) · tentativa (substituição/reconexão não criam recurso) · materiais (transformação/recuperação não removem risco nem duplicam) · morte (PvE, Fronteira, duelo, Arena) · participação zero nunca recompensa. Nomes dos testes devem corresponder ao que testam.
