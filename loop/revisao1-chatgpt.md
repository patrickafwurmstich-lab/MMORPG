# Revisão rodada 1 — ChatGPT (GPT-6.1 Sol) — **NÃO APROVADO**

Leu o documento inteiro, **rodou a simulação** e conferiu as contas.
(A leitura da página cortou depois do item I7; os opcionais e o fim ficaram de fora — pedir na rodada 2.)

## Bloqueadores
**B1 — A simulação econômica estava errada (erro do Claude, confirmado).**
O script aplicava o corte a 100% da criação de ouro, mas o documento só corta contratos (70%). E o ralo de mercado usava `0,12·u·0,5` também no cenário normal.
Pelas regras escritas, no pessimista: F − S = 340 − 760·u → equilíbrio exige u = 0,447, acima do teto 0,35. No teto ainda sobra **+74 ouro/jogador/hora**. Com corte limitado a 20%, o buraco é **188/h**.
→ Corrigir a simulação; achar ralos estruturais; testar mercado e cosméticos com adesão zero.

**B2 — Ímpeto sem orçamento fechado.** DES +60, Ímpeto 80 → 3 continuações = 306,7 de dano extra, mais que um golpe pesado de FOR +60 (248,6). Faltam tempo, custo, elemento, Arte, geração.
→ Dano total das continuações = D_leve × (Ímpeto/100) × r(DES), dividido em 1–3 golpes; continuação não gera Ímpeto, não encadeia, não replica Arte, elemento aplica 1× por conjunto; +0,18 s de compromisso por continuação. Fórmula de impacto única: I = I_base × (1 + 0,6rF + 0,4rCON) × (1 + Ímpeto·(0,5 + rF)/100).

**B3 — Parry percentual (35% da postura) quebra qualquer chefe com 3 parries.** Tira o valor de FOR e da ruptura; fadiga de 12 s permite travar o chefe.
→ Parry causa impacto fixo: 25 × (1 + 0,5rFOR + 0,5rPER) = 25–40. Exaustão 6 s, sem acumular fadiga nem prolongar, 10 s de imunidade depois.

**B4 — Exemplos de Artes não cumprem o orçamento.** "±5%" não está definido; e a Arte ocupa um espaço extra além das 6 ativas.
→ A Arte ocupa **um dos 6 espaços**; toda Arte declara custo, animação, recarga, efeitos e restrições contra chefe. Eco: 70% no golpe + 30% no eco, sem duplicar efeitos. Inversão não move chefe (só você, até 3 m). Passo Fantasma: máx. 10 Ímpeto por ativação. Âncora devolve fração e paga resistência. Evolução libera alternativas, não aumenta orçamento.

**B5 — Artes Singulares continuam sendo corrida.** Premia acesso antecipado, horas, grupo dedicado, guia, automação. 10 Singulares para 10 mil jogadores = 0,1%.
→ Posse de **14 dias**; depois janela de **72 h** de qualificação; **sorteio entre qualificados** (sem vantagem de chegar primeiro); 1 posse por conta com 60 dias de intervalo; desativadas em PvP e na corrida de primeira abertura de andar; nenhuma função necessária a chefe só numa Singular.

**B6 — Leitor de Estilo incentiva levar dano e jogar ferido.** "Encontro válido exige dano real" pune quem defende perfeitamente; "Risco = HP<30%" incentiva ficar ferido; sem limite de demonstrações por encontro; divisões por zero.
→ Validade pela **ameaça potencial** (ataque capaz de ≥5% da vida antes da defesa); taxas sobre **oportunidades** (≥12 em ≥3 encontros); máx. **2 demonstrações por encontro**, 30 s entre elas; 1 por ataque emitido; trocar "Risco" por "completar ação em janela contestada"; limites obrigatórios por dimensão (Q só guia as pistas).

**B7 — Elementos sem limites.** Fogo 3× em A=200 → +29% de dano para o grupo = Fogo obrigatório. Água renova reserva infinita. Vento +10 por acerto enche a barra com área.
→ Fogo −30 máx. por alvo, sem acumular entre jogadores (+8%). Vento 10 por ação, 1 s de intervalo. Água só redistribui (ou ≤120 por beneficiário/encontro). Gelo não acumula. Raio e Terra precisam de limites equivalentes.

## Importantes
- **I1 Afinidade**: C_af = C(x) − m × min(10; 0,20·C(x)) → máx. 10 pontos economizados por atributo (especialista 20, generalista 20). Aplicar só ao confirmar no Santuário; reembolso pela mesma função.
- **I2 Respec**: gratuidade termina na 1ª conclusão pessoal do andar 5; cargas por calendário (sem exigir login), teto 2; carga extra = 30 min de coleta mediana; arena testa grátis; modificador exige o atributo enquanto equipado.
- **I3 Leitura do chefe** pune o tanque que bloqueia por função: observar ≥20 oportunidades; aviso 3 s; muda só 1 família de ataques; máx. 25% dos ataques; não remove rota de âncora; dura 30 s e volta; não acumula.
- **I4 Âncoras não provam diversidade** (toda arma tem parry/pesado/atrair). Exatamente 3 rotas por chefe, ≥2 independentes de elemento; medir custo real das rotas; testar grupo homogêneo × misto.
- **I5 Rede**: cliente prevê, **servidor decide**; compensação ≤100 ms ligada à latência medida; testar RTT 50/100/150, jitter 0/20, perda 1%, timestamps adulterados.
- **I6 Andares antigos**: nível efetivo da sincronia vale para Leitor e recompensas; "rendimento atual" = maior patamar pessoal; mentoria 1×/dupla/dia, nunca entre personagens da mesma conta; mapas viram guias externos (não são demanda durável).
- **I7 Progressão vertical**: camada 10 → arma ×2,77, renda ×7,45. (cortado aqui)
