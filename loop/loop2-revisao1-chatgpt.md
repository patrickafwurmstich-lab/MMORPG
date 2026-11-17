# Loop 2 — Revisão 1 — ChatGPT (sobre o v5)

**Veredito: NÃO APROVADO.** Rodou check_v5.py (TUDO OK). "v4: faltavam grandes partes do jogo. v5: as grandes partes aparecem, mas seus contratos e interações ainda não fecham."

## 1. Incompletude do v4 resolvida?
Quase tudo **Parcial**: armas (faltam combos/fases), técnicas (66 avançadas sem catálogo), execução (fases por ação), câmera/mira/colisão, armaduras (espaços, Encaixes), estados (cadeias de controles diferentes), cura (ciclo da reserva), arco/conjuração (projéteis, alcance mínimo), troca de arma (estados/recargas/escudo), inventário (peso sem capacidade máxima), morte (atribuição, Selo×Infâmia), domínio (taxa), loadouts.

## 2. BLOQUEADORES
- **B1** Economia confunde destruição de itens com destruição de ouro (consumíveis de jogador na linha de 200 ouro/h de NPC; reparo com componentes). Separar ouro / materiais / transferências; ex.: 140 reagentes NPC + 60 taxa de produção.
- **B2** Selo de Retorno protege tudo, até na Fronteira com Infâmia (script dá precedência ao Selo); custo fixo para valor ilimitado. → Selo não funciona na Fronteira; cobertura limitada e com preço; registrado antes do encontro.
- **B3** Peso limita velocidade mas não capacidade (bolsa ilimitada). → Capacidade máx = confortável + 20; acima não recolhe; descarte em combate definido.
- **B4** Falta contrato de início/fim/reset de encontro (reserva, 5 poções, óleo, Anel, comida, Artes, reanimação, entrada de novos). → ID de tentativa no chefe; campo: fim após 15 s sem hostilidade; acessórios de abertura com recarga interna 30 s.
- **B5** Teto de parry 180 ms vs bônus (+20, +40, +60, janelas 0,3/0,4). → janela comum ≤180; técnica ≤240; duração da postura ≠ janela; saque não é parry automático.
- **B6** Resistência por estado não impede cadeia de controles diferentes no PvP (5,2 s). → categoria compartilhada "incapacitante" em PvP: 1ª ≤1,5 s; 2ª em 8 s 50%; 3ª imune; 2 s de imunidade após cadeia.
- **B7** Infâmia sem atribuição (vítima marca monstro; caído por terceiros; nível antes da sincronia). → registro de 30 s de dano/controle/assistência; monstro atraído depois não torna o adversário infrator; Infâmia +1 / +3; duração e cúmplices.
- **B8** Duas armas × espaço secundário/escudo. → dois conjuntos de mãos (principal+auxiliar), 2 mãos ocupa ambas; recargas persistem; efeitos acabam na troca; sem defesa da arma inativa.
- **B9** Armadura escala 1,09^(c−1) mas denominador 200 fixo → mitigação cresce com camada. → M = 200s/(200s + A), s = 1,09^(c−1) (ou não escalar A); reconciliar bloqueio, resistência, impacto do parry, bombas/barreiras fixas.
- **B10** Nova Era sem regras (desconectados no alto, progresso, Singulares, imposição pelo grupo mais rápido). → vencer o 100 habilita; aviso 7 dias; Era mínima 12 semanas; Singulares com calendário próprio; progresso histórico mantido; quem está em lugar inválido volta à cidade.
- **B11** Falta um chefe e Assalto completamente executáveis. → fichas de 6/12/24; HP × N/6; objetivos paralelos 1/2/4 setores; buffs equivalentes não acumulam entre grupos; Muralha pega a maior redução; Água não importa reserva de fora.

## 3. IMPORTANTE / OPCIONAL
IMPORTANTE: fases das técnicas (preparo/execução/recuperação); mecânicas exclusivas com ficha completa (Fluxo duração/reset; Ritmo substitui ou acrescenta…); multigolpes (impacto total vs por acerto); 66 avançadas (ou retirar promessa); magias (custo, recarga, duração, limite; Pilar 1 ativo, 6 s); elemento fixo vs técnicas temáticas ("Corte do vento", "Machado elétrico"); modificadores (54 escolhas prometidas, só 6 exemplos); Leitor (denominador zero = sem atualização; sucesso ≤1 por oportunidade; PvP não gera Artes/domínio); Precisão da espada curta não pode comprar pontos do Leitor; Artes: 15 assinaturas (3 rotas × 5); teto por medida das Artes ≤1,25; Afinidade: convergência em 20–30 encontros; profissões: 10 receitas completas por profissão na camada piloto; limite de 2 profissões por personagem ou conta; coleta (nós pessoais/compartilhados, reposição, pureza); contratos: pacotes, um objetivo não conclui 8; recompensa por participação; guildas e Postos (permissões, captura, recaptura, por canal?); Arena (orçamento; zero perda); chegada tardia (rota acelerada 30–45 min por andar, escala 1–6); acessibilidade; social e moderação; modelo comercial.
OPCIONAL: moradia; Profundezas; 100 andares (contrato de conteúdo + alguns andares completos).
Também: 6 técnicas para 6 espaços = pouca build; matriz 6×6×6 precisa de compatibilidades e exclusões.

## 4. Contradições
G.1×R contrato 19% vs 17,5% · D.1×K parry · A.1×P.1 "sem imunidade" vs elementais imunes · G.1×O/W consumíveis · J.3×L.1 mãos · S/O×V Selo vs perda · M×S Ferida usando resistência decrescente · C.4×AB 30 dias vs Nova Era · "nada se perde sem logar" vs contratos acumulam 3 dias · U×T operação semanal pede Assalto (só primeira abertura) · Q×AD chefe do andar 1 como Assalto e como tutorial · K×M Fogo: Queimando vs redução de armadura · L.4 lista de Encaixes faltando · Z×AG variações respondendo por Artes · arco de duas mãos com bônus de "mão livre".

## 5. Exploits
Seguro universal · converter carga em equipamento · entrega por Túmulo · personagem caminhão · bandido sem patrimônio · lavagem de Infâmia (saque "quente" 10 min) · indução de Infâmia · morte pelo último golpe (contribuições 30 s) · camping de Túmulo · invulnerabilidade de entrada para reconhecimento · troca de canal multiplicando nós · contas alternativas em todos os canais · reset de cura por substituição · transferência via mercado · IP como critério único.
Ferida: a justificativa está invertida (aumenta chance de nova derrota) → tratamento acessível, retorno protegido. Reanimação: volta com mín(30%, reserva), mínimo 5%.

## 6. Script
TUDO OK é verdadeiro no alcance: não testa técnicas, mecânicas exclusivas (Flanco: espada curta 1,125 → 1,4625), PvP, buffs de 24, reset, consumíveis reais, Nova Era, economia por agentes. Cabeçalho deve dizer "verificações aritméticas selecionadas".

## 7. Condições para aprovar
Versão consolidada sem valores antigos e com precedência; 11 bloqueadores; andar-piloto e chefe completos (6 e Assalto); cadeia produtiva com moeda/materiais/transferências; Fronteira completa; testes cruzados (derrota, troca, controle, cura, Era); catálogos completos ou escopo reduzido explicitamente.
