# Fase 1 — Grok (Fast, logado) — plano

## Resumo
- **6 atributos** (1–200, soft-cap 120): FOR, AGI, VIT, ESP (magia), PRE (precisão/penetração/parry), SOR (não afeta drop; só emergência de habilidades e variação).
- **Dano físico** = (1,8·FOR + 0,6·PRE) × (1 + AGI/400) × mult. arma. **Mágico** = (2,1·ESP + 0,4·PRE) × mult. canalização × (1 + FOR/500 se na arma).
- **Velocidade de ataque** = base × (1 + AGI/180). **Movimento** = 5,2 m/s × (1 + AGI/220) × (1 + FOR/800).
- **Postura** = 100 + 1,4·VIT + 0,7·FOR; regen = 8 + 0,12·VIT (+0,06·ESP em postura defensiva).
- **Retorno decrescente** acima de 80: efetivo = 1 − (excesso/(excesso+90))^1,35.
- **Cruzadas**: FOR×AGI = impacto cinético (stagger extra FOR·AGI/12000); AGI+PRE amplia parry perfeito 0,8% por ponto acima de 100; VIT+ESP = regen de postura e resistência a controle; ESP+FOR na arma = quebra de postura mágica.
- **Progressão**: 5 pontos + 1 ponto de especialização por nível. Custo N→N+1 = 1 + floor((N/25)^1,7) + penalidade de estilo (±30–60% conforme as últimas 200 ações).
- **Resonance (habilidades emergentes)**: limiares de atributo + % de tipo de monstro nos últimos 3 andares + padrões (parry %, distância, canalização). Progresso 0–100%; chance por combate = (prog/100)^1,8 × 0,15 + SOR/2000. Habilidade aparece como "técnica desconhecida" e o tooltip completo só depois de 8–12 usos.
- **Combate**: esquiva 0,28–0,38 s de i-frame; bloqueio direcional gasta postura; parry 0,16 s + PRE/AGI. Postura igual para jogador e chefe.
- **Aggro** = dano + 2,4·postura causada + 0,6·cura + 18 por bloqueio; decai 4%/s fora de combate.
- **Chefes**: sem enrage; adaptam-se ao estilo do grupo (muito bloqueio → ataques que punem bloqueio; muito longe → fecha distância). Falhar na mecânica aumenta a regen de postura do chefe em vez de dar dano extra.
- **Crafting**: faixa de afixos determinística por material + forja do andar + "assinatura" do artesão; trava de afixo com material extra; RNG só na margem de 1–5%.
- **Economia** (meio do jogo): torneiras 1.800–2.600/h (monstro+missão), 2.200–3.800/h venda de material; ralos: reparo 18–25%, craft 12–20%, taxa de mercado 5% + progressiva, consumíveis 800–1.400/h. **Estabilizador automático**: se a média de 7 dias de ouro por jogador subir >12%, custos sobem 15–25% por 7–14 dias (e o inverso).
- **Riscos**: complexidade (tutorial de 25–35 min), datamining do Resonance, bots.
- **Protótipo primeiro**: 1v1 contra elite medindo se 15 pontos de atributo são sentidos; custo variável + estilo; chefe sem enrage; craft + mercado com 20–30 jogadores; Resonance com 4–5 condições.

## Crítica do Claude
1. **SOR como ruído contradiz "não é sorte pura"** e o próprio pedido; e jogador vai empilhar SOR para farmar habilidades = novo meta. Cortar SOR.
2. **Penalidade de estilo pelas "últimas 200 ações"** é manipulável: farmar 200 ações baratas antes de distribuir. Precisa de ações **qualificadas** (contra ameaça real) e janela por encontros, não por ações.
3. **Movimento × (1 + FOR/800)**: com 120 FOR = +15%. OK, sentido. Mas AGI/400 no dano com AGI 120 = +30% — AGI acaba dominante (dano, ASPD, movimento, i-frame, parry). Risco de meta AGI.
4. **Chefe que se adapta ao estilo do grupo** é a melhor ideia aqui: mata a corrida de DPS e obriga variedade. Guardar.
5. **Aggro por postura e bloqueio** coerente (soma, não subtrai). Guardar.
6. **"Seed derivado do personagem"** no craft: na prática vira RNG fixo por personagem — dá para farmar alts. Preferir determinismo por material/posição (ideia do Gemini).
7. **Estabilizador automático com anúncio** é bom, mas mexer em preço de reparo pune quem não causou a inflação. Melhor ajustar a torneira (ouro dropado) e os ralos voluntários.
8. Ponto de especialização separado: não explicou o que compra além de "árvores de canalização" — risco de árvore previsível voltar pela porta dos fundos.
