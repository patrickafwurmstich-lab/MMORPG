# Fase 1 — ChatGPT (GPT-6.1 Sol, raciocínio médio, logado) — plano

## Premissas que ele exige aceitar
1. Meta sempre existe; a meta verificável é **várias soluções competitivas** e nenhuma dominar dano + sobrevivência + controle + utilidade ao mesmo tempo.
2. Guias vão revelar as regras; a descoberta duradoura tem que estar nas **decisões em situações diferentes**.
3. Habilidade rara + exclusivamente superior + permanente vira **obrigação**.

## Resumo
- **5 atributos**: Força, Destreza, Vigor, Potência (intensidade mágica), Controle (precisão da energia). Começam em 10, até +50 cada.
- **Retorno**: r(x) = x/(x+30). Dano = Parma × Kação × [1 + Σ aᵢ·r(attrᵢ)] × Malvo, com os pesos **definidos pela ação** (somam 1).
  - Ex. golpe pesado, arma 120: F+0 = 120; F+5 = 133,7 (+11,4%); F+25 = 163,6; F+50 = 180. (Conferido: aF = 0,8.)
- **Velocidade**: H = 1 + 0,25·r(D); só preparação/recuperação aceleram — i-frame, hitstun e janela de parry NÃO. D+50 → ataque de 1 s vira 0,892 s.
- **Movimento**: v = 5,5 × [1 + 0,12·r(D)] × [1 − 0,25·L/(1 + 0,8·r(F))], L = carga excedente. Força ajuda quem está pesado, não vira velocista.
- **HP** = 1000·[1 + 0,7·r(V)]; **Armadura**: recebido = D × 200/(200 + A).
- **Modificadores de técnica** aos 10/25/40 pontos num atributo (ex.: recuperação do golpe pesado vira avanço curto; bloquear enquanto canaliza). Máx. 3 equipados. "O atributo melhora números; o modificador cria identidade."
- **Progressão**: 20 pontos no nível 1 + 2/nível = 218 no 100. Custo acumulado C(x,m) = (x + x²/50)·(1 − 0,2·m). **Afinidade de prática**: 5 afinidades com soma fixa = 2 — a prática **redistribui**, não aumenta. Confirmação em local seguro. Respec grátis em local seguro. Nível não dá multiplicador oculto.
- **Habilidades emergentes**: regras auditáveis no servidor (não IA opaca). Família de ações + mínimo de atributo + 2–3 contextos + demonstração de domínio. Depois de preparado, cada demonstração k tem p = 1/(13−k) → garantido na 12ª, média 6,5. Diário mostra evidências ("você devolveu energia após uma defesa precisa").
  - **Limites**: 3 espaços de técnica especial, só 1 emergente de grande impacto, sempre com **alternativa pública equivalente**, vantagem sustentada **≤5%** no contexto favorável.
- **Combate**: 4 recursos (vida, resistência, energia, postura). Bloqueio custa resistência = (0,08·dano + 0,25·impacto)/(1 + 0,6·rF + 0,4·rV); sem resistência → guard break 1 s. Postura causada pertence à **ação inteira** (dividir em 10 golpes não multiplica). Após quebra, 8 s de resistência a nova quebra. Canalizado = ação própria, dano físico e mágico dividem orçamento. Resistências elementais 0,85–1,15, sem imunidade.
- **Aggro**: T(t+Δt) = e^(−Δt/8)·T + dano + 0,8·dano interceptado + 0,5·cura efetiva + 2·postura. Troca de alvo exige +20%. Provocar = 110% por 3 s, recarga 20 s.
- **Reserva de cura por encontro** (600 + Vigor) em vez de cronômetro.
- **Chefe exemplo** (6 jogadores): 60.000 HP + 3 mecanismos × 4 intervenções; cada mecanismo aceita 3 rotas (parry de ataque anunciado / atrair golpe do chefe no mecanismo / 60 de postura na abertura) e **cada rota resolve no máx. 2 das 4** → nenhuma equipe resolve tudo com a mesma ferramenta. Dobrar o DPS não pula as 12 intervenções.
- Desbloqueio global sem monopólio; primeira vitória dá só registro + cosmético; repetição em instância.
- **Crafting**: 4 decisões por arma com trade-off visível antes de fabricar (ex.: haste longa +0,6 m alcance / +0,12 s recuperação). Sem falha, sem destruir, desmontar devolve 70%, teste grátis em arena. Potência base 100–120 entre graus (novo andar expande opções, não invalida o inventário). Desgaste: 20 h de uso = componentes de 1 arma.
- **Economia**: ouro vem de contratos/objetivos; monstros dão material. ΔM = torneira − ralo; ΔQ bens separado; troca entre jogadores ≠ criação de ouro. Orçamento base 1.000/h de torneira; cenário pessimista (cosmético não vende, mercado metade) = +275/h líquido — o plano tem que sobreviver a isso.
  - **Controlador**: u = clip(0,5·ln(P/P*) + 0,25·ln(liquidez/alvo), ±0,20); contratos × (1 − u), taxa de mercado 5% × (1 + u); máx. 2 p.p. por semana; só age se preço e liquidez apontam juntos. Escassez de um material → contratos daquele material, não corte geral.
  - Andares antigos: contratos que pagam 85–115% do rendimento atual; variantes para veteranos com atributo limitado.
- **Riscos**: complexidade; combinação dominante por multiplicação de sistemas (critério: ≥8 configurações a ≤15% da melhor); custo de produção de conteúdo.
- **Testes**: 16 de 20 novatos executam esquiva/bloqueio/canalização em 10 min; chefe com 30% de diferença de DPS; descoberta 100% até a 12ª; economia simulada 180 dias; **rede a 50/100/150 ms — parry de 140 ms só fica se a validação for confiável**.

## Crítica do Claude
1. **Melhor das três** em rigor: fórmulas fecham (conferi os exemplos), pensa em rede, orçamento de postura por ação, chefe com rotas limitadas.
2. **Conflito com o dono**: limitar habilidade emergente a ≤5% e exigir alternativa pública **contradiz "raras e fortes"**. É um argumento sério (evita lista obrigatória), mas a decisão é do Lucas.
3. **+50 por atributo com r(x)=x/(x+30)** = teto baixo; de +25 para +50 rende só +10% de dano. Pode deixar o fim de jogo sem sensação de crescimento. Testar.
4. **Afinidade com soma fixa = 2** é elegante, mas o desconto máximo (20%) é pequeno — o "jeito de jogar barateia" fica quase invisível.
5. **Respec grátis** + afinidade redistribuível: identidade fica fraca ("posso ser qualquer coisa a qualquer hora"). Choca com protagonismo.
6. Faltou: o que dá vontade de subir de andar se o poder é tão achatado (potência 100–120)?
