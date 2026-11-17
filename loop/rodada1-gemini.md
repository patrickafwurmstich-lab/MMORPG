# Rodada 1 — Gemini (3.5 Flash Lite, sem login)

## Resumo da proposta
- **5 atributos**: FOR (ATK físico, carga, recuperação de arma pesada, stagger), DES (ASPD, precisão, custo de esquiva, canalização na arma), VIG (HP, DEF, dano recebido vira regen de stamina), RES/Ressonância (ATK mágico, resistência elemental, duração de efeitos, recarga), AGI (movimento, janela de i-frames, crítico, "finta" por esquiva perfeita).
- **Retorno decrescente**: `Final = Base × (1 + A/(A+100))`.
- **Dano físico**: `(ATKarma + 1,5·FOR) × (1 + AGI/150) × (1 − DEF/(DEF+300))`; mágico análogo com RES e DES.
- **Pontos híbridos**: 5 pontos/nível; custo varia com o uso das últimas 10 h (até −25% / +30%).
- **Habilidades ocultas ("Motor de Descoberta Comportamental")**: gatilhos acumulam pontos (ex.: <15% HP, 3 esquivas seguidas, contra-ataque de fogo em <0,4 s → 1 ponto; 50 pontos → habilidade). Limiar muda ±15% por semana contra guias.
- **Combate**: esquiva com 0,2 s de i-frame, esquiva perfeita zera custo; postura em escudos/armas; canalização em 3 modos (arma, disparo, ritual no chão).
- **Aggro** = 0,5·dano + 2·stagger − 0,3·dano recebido → papéis surgem do comportamento.
- **Chefes**: muda imunidade a cada 25% de HP; "fúria" após 3 min se só der dano; exige alternar postura física e reações elementais.
- **Crafting**: materiais com propriedades físicas (elasticidade, condutividade, densidade) e posição na arma; zero RNG.
- **Economia**: torneira por missões/venda a NPC com limite diário; ralos: reparo, imposto de teleporte (15% queimado), taxa de leilão. Materiais do andar 1 necessários no andar 10+.

## Crítica do Claude (para a rodada 2)
1. **Números sem efeito real**: 0,05% de recuperação por ponto de FOR, 0,01% de finta por esquiva — com 100 pontos dá 5%/1%. Ninguém sente isso. É o "+5%" disfarçado, exatamente o problema R3.
2. **Fórmula de aggro com sinal errado**: subtrair dano recebido faz o tanque PERDER aggro ao apanhar.
3. **Limiar que muda ±15% por semana** não impede guia (guia passa a dizer "faça ~50") e pune quem estava quase conseguindo. Anti-guia tem que vir de **condições pessoais**, não de ruído.
4. **Custo de ponto pelas últimas 10 h** é lento demais para o jogador sentir a relação causa→efeito e fácil de manipular (farmar ação barata antes de distribuir).
5. **Chefe com "fúria aos 3 min"** é... uma corrida de DPS com cronômetro. Contradiz o próprio objetivo.
6. **"Ouro só por missão e venda a NPC com limite diário"** sem números de torneira vs. ralo — não dá para checar inflação.
7. **Crafting por propriedades físicas** é a melhor ideia da proposta: guardar e aprofundar.
8. **Aggro por stagger** (×2) é boa: tanque vira "quem controla", não "quem tem mais HP". Guardar.
