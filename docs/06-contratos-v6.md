# MMORPG — Contratos entre sistemas v6 (parte 3 de 3)

> **Parte 3 de 3.** A parte 1 (`06-nucleo-v6.md`) tem as fórmulas; a parte 2 (`06-jogo-v6.md`) tem o jogo concreto. Esta parte fecha **como os sistemas se encontram**: precedência, encontro e reset, tempo de combate, chefe e andar-piloto completos, Fronteira completa, controle no PvP, sincronia, cadeia produtiva com três contabilidades, catálogos (modificadores, Encaixes, acessórios, receitas, avançadas, assinaturas) e Nova Era.
> Foi escrita para responder à revisão 1 do loop 2 (ChatGPT: 11 bloqueadores; Grok: 4 bloqueadores + exploits). Números de protótipo; os que o `sim/check_v6.py` confere estão marcados com ✔.

## Índice
AH-P. Precedência · AI. Tempo de combate e escala · AJ. Matriz família × arma · AK. Sincronia · AL. Fronteira completa · AM. Técnicas avançadas · AN. Contrato de encontro · AO. Chefe-piloto completo (6 / 12 / 24) · AP. Andar-piloto completo · AQ. Cadeia produtiva e três contabilidades · AR. Catálogos (modificadores, Encaixes, acessórios) · AS. Artes: 15 assinaturas e ramos · AT. Controle no PvP · AU. Nova Era · AV. Fichas das mecânicas próprias · AW. Grupo, guildas, social, acessibilidade, chegada tardia, modelo comercial · AX. Montagem da matriz de andares · AY. O que está provado e o que não está

---

## AH-P. Tabela de precedência (resolve conflitos entre regras)
Quando duas regras se aplicam ao mesmo momento, vale a de cima.
| Ordem | Regra | Exemplo |
|---|---|---|
| 1 | **Antitrapaça e sanção** | conta bloqueada não saqueia nem é saqueada |
| 2 | **Zona** (cidade segura > Fronteira > campo > instância) | Selo não funciona na Fronteira mesmo que o item diga "não perde" |
| 3 | **Infâmia** | com Infâmia perde 100%, mesmo protegido por Selo |
| 4 | **Causa da derrota** (PvP se houve contribuição de jogador nos últimos 30 s) | monstro dá o último golpe → ainda é derrota PvP |
| 5 | **Proteção do novato** (até o andar 3) | metade das perdas de PvE; não entra na Fronteira |
| 6 | **Selo de Retorno** (só o peso coberto) | 15 de peso coberto, o resto segue a regra normal |
| 7 | **Perdas normais** (S.2) | 10% XP, 50% material |
| — | Em combate: **contrato de encontro (AN)** > técnica > equipamento > consumível | poção limitada por tentativa mesmo que o Anel diga "por encontro" |
| — | Tetos: **teto do núcleo** > bônus de arma/técnica | janela técnica nunca passa de 240 ms; velocidade nunca passa de 1,45 |

---

## AI. Tempo de combate (TTK) e escala

### AI.1 Modelo de DPS efetivo (base de todas as vidas) ✔
**DPS efetivo = P_arma × (K/tempo médio da arma) × (1 + Σw·r) × 0,55 (tempo atacando) × M_alvo.**
Camada 1, nível ~30 (+25 nos atributos da arma), P_arma 110, K/tempo ≈ 1,10, armadura inimiga 50·s → M = 0,8 → **≈ 70 de dano por segundo** por jogador.
Inimigos e armas escalam igual (× 1,09^(c−1)) e a armadura usa s (núcleo A.1) → **o tempo de combate é o mesmo em toda camada** ✔.

### AI.2 Vidas e tempos-alvo (camada 1)
| Alvo | Tempo-alvo | Vida | Conferência ✔ |
|---|---|---|---|
| Comum: inseto (enxame) | 2–4 s | 180 | 2,6 s |
| Comum: fera, aviário, sombra, aquático | 8–12 s | 650 | 9,3 s |
| Comum: humanoide, planta, elemental, morto-vivo | 10–14 s | 800 | 11,5 s |
| Comum: constructo | 14–18 s | 1.100 | 15,8 s |
| Elite solo | 25–40 s | comum × 3 (fera 1.950) | 28 s |
| Elite / chefe de campo (grupo de n) | 20–40 s / 2–4 min | **× (1 + 0,6·(n − 1))** | elite fera, 4 jogadores: 5.460 → 19,6 s |
| Dracônico (elite natural, 4 jogadores) | 40–60 s | 12.000 | 43 s |
| Colosso (grupo de 4) | 30–45 s de dano + quebras | **9.000** | 32 s |
| Mini-chefe de labirinto (grupo de 4) | 1,5–3 min de dano | 30.000 | 108 s |
| **Chefe de Andar (6)** | 8–12 min no total (≈ 5 min de dano) | **120.000** | 287 s |
| **Assalto (n = 12 / 18 / 24)** | 10–15 min no total | **120.000 × n/6 × 0,9** = 216k / 324k / 432k | 259 s (o mesmo para qualquer n) |

### AI.3 Ficha dos 6 tipos de chefe (camada 1, versão de 6; tudo × 1,09^(c−1))
Referência defensiva: tanque médio (VIG +30) = **1.386 de vida** → ataque principal do chefe = **18–25%** dela (250–350) ✔.
| Tipo | Vida | Postura | Ataque principal (dano / aviso) | Abertura | Mecânica que trava a vitória |
|---|---|---|---|---|---|
| Âncoras | 120.000 | 1.000 | 300 / 1,0 s | exaustão 6 s (Fadiga) | 3 âncoras × 4 intervenções (AO) |
| Partes quebráveis | 110.000 | 1.200 | 320 / 1,2 s | parte quebrada = 8 s derrubado | quebrar 4 partes (6.000 de impacto/dano cada) |
| Arena que muda | 100.000 | 900 | 280 / 0,9 s | 5 s entre fases | 3 fases; o chão cai em 75% / 50% / 25% |
| Duplo | 2 × 60.000 | 800 cada | 250 / 0,9 s | separados > 15 m: os dois recebem +20% de dano | se ficam < 8 m, cada um cura 1%/s; precisam cair com ≤ 20 s de diferença |
| Perseguição | 90.000 | 1.000 | 300 / 1,0 s | encurralado: 10 s | encurralar 3 vezes em pontos diferentes do labirinto |
| Cerco | 100.000 | 1.000 | 280 / 1,0 s | 6 s entre ondas | proteger um ponto (vida 20.000) por 4 ondas |

### AI.4 Reanimação em grupo grande
- Grupo de 6: um jogador pode ser reanimado **no máx. 2 vezes** por tentativa.
- **Assalto: no máx. 3 vezes por jogador**, e o Assalto inteiro tem um **teto de n reanimações** por tentativa (24 jogadores → 24).
- **Chamado de Resgate** (consumível de Alquimia, 1 por tentativa): reanima até 2 aliados caídos num raio de 3 m em 6 s (interrompível), recarga 45 s, conta no teto. É a saída quando a reserva do caído é < 5%.

### AI.5 Leitura do chefe no Assalto
A sala do Assalto tem **2–4 alas** (uma por grupo). A leitura (núcleo E.3) acontece **por ala**: cada ala tem seu contador de ≥ 20 oportunidades e sua adaptação de 30 s; as alas não se somam. Cada adaptação continua abrindo oportunidade.

---

## AJ. Matriz família × arma (forte / fraca) ✔
Regra conferida: cada arma é **forte** contra ≥ 3 famílias e **fraca** contra ≥ 2; cada família tem ≥ 2 respostas fortes e nenhuma família é fraca contra todas as armas de um tipo (corpo a corpo/distância).
"Forte" = a mecânica da arma resolve o problema da família (não um multiplicador de dano); "fraca" = a família anula a mecânica.
| Arma | Forte contra (por quê) | Fraca contra |
|---|---|---|
| Desarmado | Mortos-vivos (investida sela), Humanoides (agarrão e arremesso no grupo), Sombras (contra-golpe de perto) | Aviários, Dracônicos, Colossos |
| Espada curta | Constructos (flanco da guarda), Humanoides (passo de sombra no curandeiro), Elementais (atrás do conjurador) | Insetos, Dracônicos |
| Espada longa | Elementais (interceptação), Humanoides (guarda e alcance), Dracônicos (guarda alta nas partes) | Aviários, Colossos |
| Duas espadas | Insetos (Tempestade), Plantas (dano contínuo sem parar), Feras (Dança de lâminas acompanha) | Constructos, Aviários, Colossos |
| Espada e escudo | Feras (bloqueia o avanço), Sombras (Muralha cobre as costas do grupo), Elementais e Mortos-vivos (golpe de escudo interrompe/sela) | Plantas, Colossos |
| Katana | Feras (saque de resposta no avanço), Aquáticos (leitura da emboscada), Aviários (lâmina projetada no mergulho) | Constructos, Colossos |
| Duas katanas | Humanoides (Espelho), Sombras (parry no golpe furtivo), Feras | Mortos-vivos (impacto baixo não sela), Elementais, Constructos |
| Machado grande | Constructos, Mortos-vivos, Dracônicos, Colossos (impacto e partes) | Feras, Aviários, Sombras, Aquáticos |
| Machado pequeno | Constructos (Quebra-escudo), Aquáticos (Gancho tira da água), Aviários (arremesso), Colossos (Marca nas partes) | Insetos, Plantas |
| Dois machados | Insetos, Plantas, Feras (Frenesi em alvos que não param) | Elementais, Aviários, Sombras |
| Arco | Aviários, Elementais, Dracônicos, Colossos, Plantas (alcance, partes altas, fora das raízes) | Sombras, Humanoides, Feras |
**Estado-chave por família:** Mortos-vivos → impacto ≥ 30 sela · Elementais → silêncio/interrupção · Insetos → área · Sombras → luz (Fogo) e PER · Plantas → Fogo e distância · Aquáticos → tirar da água · Aviários → derrubar no mergulho · Colossos/Dracônicos → partes.

---

## AK. Sincronia (Fronteira, Ecos, andares antigos, Provação)
Ao entrar numa área de **andar f** (teto = nível f, camada c_f):
1. **Nível efetivo = mín(nível, f)**; orçamento efetivo = pontos do nível efetivo (núcleo B: 20 + 3·(nível − 1)).
2. **Os pontos investidos encolhem na mesma proporção**: x_ef = arredondar(x × orçamento_teto / orçamento_real). **A forma da build é preservada** (quem tem FOR 2× DES continua com 2×) ✔. Modificador fica ativo só se x_ef ainda alcança o marco dele; Afinidade não muda.
3. **P_arma, armadura e vida máxima** = mín(valor real; valor de grau 120% da camada c_f × 1,05).
4. **Não muda:** técnicas, domínio, Artes Únicas comuns, Ímpeto (as fórmulas usam x_ef), habilidade do jogador. **Singulares desligadas** em Fronteira, Arena e corrida de abertura.
5. **Arena e Provação:** em vez do teto do andar, todos recebem o orçamento do **nível 60** (forma da build preservada) e equipamento-padrão de grau 110%.
6. Diferença de nível **para Infâmia** usa o **nível efetivo** (depois da sincronia), nunca o real.

---

## AL. Fronteira completa (PvP aberto)

### AL.1 Números
- **Pureza:** nós normais 40–70; Fronteira 85–100. 10 min na Fronteira rendem em valor ≈ 15–20 min de coleta normal.
- **Fendas da Fronteira:** mini-chefes de 8.000 HP (sincronizados), a cada 30 min por conta; material raro de Encaixe.
- **Extração:** o material só fica "seguro" quando você sai por um dos **3 portões** da Fronteira (10 s parado, interrompível por dano). Morrer antes = regras de AL.2.

### AL.2 Derrota na Fronteira
- Perde **50%** dos materiais carregados para o Túmulo (100% com Infâmia); **sem perda de XP**; **Selo não funciona**.
- Renasce **na entrada** da Fronteira (não ao lado do Túmulo); o Túmulo aparece no seu mapa por 30 min.
- **Saque:** cada jogador saqueia **1 túmulo a cada 8 min**; leva **50%** do conteúdo, a outra metade **se perde** (ralo de material: matar para lucrar rende menos que coletar) ✔. Dono que volta ao próprio túmulo: **15 s de proteção** (sem atacar).
- **Retorno protegido:** morrer de novo em até 60 s na entrada, antes de atacar ou coletar, não gera nova perda.
- **Saque "quente":** material saqueado fica marcado **10 min**: não vai ao banco, ao mercado nem a outro jogador (nem por Túmulo) — fecha a "lavagem" por cúmplice.
- **Carga convertida:** equipamento **fabricado na última hora com material que estava na carga** conta como carga arriscada (cai como material equivalente) — não dá para proteger valor fabricando no campo.

### AL.3 Infâmia (atribuição)
- O servidor registra, por **30 s**, todo dano, controle e assistência hostil entre jogadores.
- **Agressor inicial** = quem causou o primeiro dano/controle hostil sem ter recebido nenhum daquela pessoa (ou de seu grupo) nos últimos 60 s.
- **Ganha Infâmia** o agressor inicial (e quem contribuiu com ele no registro) quando a vítima, no momento do primeiro ataque: (a) estava em combate com monstro **há ≥ 3 s e antes do início do duelo**; (b) estava **caída por outra causa** antes da sua participação; ou (c) tinha nível **efetivo** mais de 10 abaixo. Monstro atraído **depois** do início do duelo não torna o adversário infrator (fecha a "indução de Infâmia").
- Valores: **+1** por infração comum; **+3** por ataque a jogador sob proteção válida (entrada, retorno, túmulo próprio). Com **3+** Infâmia: perde 100%, aparece no mapa, sem banco por 30 min.
- Some **1 ponto por hora jogada fora da Fronteira** (não por hora offline); bandido sem patrimônio também perde: Infâmia ≥ 3 **bloqueia contratos e Postos** até zerar.

### AL.4 Canais e contas
- Troca de canal: bloqueada **5 min** após combate PvP.
- Nós, Fendas e pureza pessoal da Fronteira são por **conta** (mudar de canal não multiplica recurso).
- Personagens da mesma conta não saqueiam os túmulos uns dos outros.

### AL.5 Postos
- 3 por Fronteira, **globais** (valem em todos os canais da Fronteira; a captura acontece num canal fixo do Posto, anunciado).
- Captura: 5 min no ponto + 3 ondas de defesa de NPC; **contestação** a cada 48 h (janela de 1 h anunciada 24 h antes); **recaptura** pela mesma regra.
- Benefício: +**15%** de velocidade de coleta para a guilda ao redor do Posto e estandarte; **não fecha nós** (todos coletam), não gera ouro, não dá poder.
- **No máx. 1 Posto por guilda por Fronteira**; alianças não somam Postos.

### AL.6 Exploits fechados (Grok + ChatGPT)
| Exploit | Fechado por |
|---|---|
| Camping de Túmulo | renascer na entrada, 15 s de proteção, retorno protegido, 1 saque/8 min |
| Seguro universal (Selo) | Selo não funciona na Fronteira; cobertura limitada fora dela |
| Personagem "caminhão" | capacidade máxima = confortável + 20; não larga material em combate |
| Entrega por Túmulo | só o grupo **do momento da derrota** recolhe; capacidade de quem recolhe; saque destrói 50% |
| Bandido sem patrimônio | Infâmia bloqueia contratos e Postos; sem banco |
| Lavagem por cúmplice | saque "quente" 10 min |
| Indução de Infâmia | agressor inicial + tempo do combate com monstro |
| Morte pelo último golpe | registro de 30 s define derrota PvP |
| Reconhecimento com proteção de entrada | sem coletar/interagir; reentrada em < 5 min não renova |
| Troca de canal | 5 min; recursos por conta |
| Contas em todos os canais | Postos globais, 1 por guilda |
| Ferida + Selo | Selo não ativa com 2+ Feridas; recarga 30 min |
| IP como critério | só sinal para investigação |

---

## AM. Técnicas avançadas (domínio 60–100)
**Escopo desta versão:** 3 avançadas por arma (33). As outras 3 por arma entram com o conteúdo das camadas 3+, **mesmo formato**. Cada avançada tem 2 variações escolhidas ao liberar (parte 2, Z).
Formato: K / impacto · tempo / recarga · custo — decisão [papel].
- **Desarmado:** Mil palmas 0,25×8/40 total · 1,4/14 · 25 — trava o comum durante a sequência [Ex] · Quebra-ossos 0,9/45 · 1,0/12 · 20 — agarrão em elite com postura < 30% [Ru] · Corpo de ferro 0/0 · 1,5/20 · 0 — 1,5 s sem stagger, +1 Fluxo por golpe recebido [Su]
- **Espada curta:** Cem cortes 0,4×4/20 total · 1,0/10 · 20 — só pelo flanco [Ex] · Véu 0/0 · 3 s/25 · 15 — comuns perdem você de vista até você atacar (não chefe/PvP) [Co] · Golpe de misericórdia 2,0/0 · 0,9/18 · 20 — só em alvo atordoado/derrubado [Ex]
- **Espada longa:** Troca de guarda 0,7/20 · 0,5/8 · 10 — muda a guarda cortando [Co] · Corte que fende 1,8/30 · 1,4/12 · 25 — guarda alta, linha 5 m [Ex] · Contra perfeito 1,2/25 · postura 0,25/10 · 15 — parry (janela comum) que sai com pesado [Co]
- **Duas espadas:** Ciclone 0,3×10/30 total · 2,0/16 · 30 — anda devagar girando [Ex] · Ritmo infinito 0/0 · 6 s/24 · 0 — corte cruzado a cada 3 alternados [Su] · Lâminas em X 1,4/35 · 1,0/10 · 20 — consome o Ritmo: +10% por nível [Ex]
- **Espada e escudo:** Fortaleza 0/0 · 4 s/25 · 0 — Muralha 360° parado (não acumula com outra Muralha: vale a maior) [Co] · Avanço do baluarte 0,6/40 · 1,2/14 · 25 — arrasta comuns 6 m [Ru] · Juramento 0/0 · 0,6/30 · 15 — por 8 s, 40% do dano de 1 aliado vem para você [Su]
- **Katana:** Saque do vazio 2,4/30 · carga 2 s/14 · 25 — linha 8 m [Ex] · Bainha espelhada 0/0 · 0,6/16 · 10 — o próximo saque de resposta reflete projétil [Co] · Mil folhas 0,5×5/15 total · 1,2/12 · 20 — cada corte reduz 0,2 s da carga do próximo saque [Ex]
- **Duas katanas:** Dança das garças 0,6×4/20 total · 1,4/14 · 25 — termina atrás do alvo [Ex] · Fio do reflexo 0/0 · 5 s/22 · 0 — cada parry +10 Ímpeto (dentro do teto 45/s) [Su] · Corte em cruz 1,6/30 · 0,9/12 · 22 — ×1,5 contra Exposto [Ex]
- **Machado grande:** Cataclismo 2,8/70 · carga 2,5 s/20 · 35 — área 5 m, só carga nível 3 [Ru] · Pegada de gigante 0,8/50 · 1,0/14 · 25 — dano em parte quebrável conta 2× [Ru] · Rugido 0/0 · 0,8/25 · 10 — comuns a 6 m Lentos 3 s [Co]
- **Machado pequeno:** Tempestade de machados 0,5×6/12 · 1,6/16 · 25 — arremessa em até 6 alvos (1 por alvo) [Ex] · Corrente 0,7/30 · 0,9/14 · 20 — puxa você até o alvo marcado [Co] · Caça 0/0 · 0,3/20 · 10 — 3 marcas por 6 s (exceção à marca única) [Su]
- **Dois machados:** Fúria cega 0/0 · 6 s/30 · 0 — Frenesi começa no máximo, defesa −30% [Ex] · Redemoinho 0,4×6/25 total · 1,5/14 · 25 — puxa comuns 2 m [Ru] · Execução dupla 1,8/30 · 1,0/16 · 20 — ×1,5 em alvo < 30% de vida [Ex]
- **Arco:** Flecha estelar 2,5/20 · tensão 2 s/16 · 30 en — atravessa tudo em 40 m [Ex] · Passo do caçador 0/0 · 0,4/12 · 10 — rolamento que já começa com tensão 50% [Co] · Rede 0,3/40 · 1,0/18 · 20 — derruba aviário em voo 3 s [Ru]

---

## AN. Contrato de encontro (início, fim, reset)
### AN.1 Campo
- **Começa** quando um membro do grupo causa ou recebe hostilidade de um conjunto conectado de inimigos. Puxar outro monstro ou trocar de alvo **não** cria encontro novo.
- **Termina** após **15 s sem hostilidade relevante** (inimigo que persegue mantém o encontro; inimigo que volta à área encerra).
- **Ao terminar:** reserva de cura enche em **ponto de descanso** (8 s parado, sem hostilidade) ou volta 25% por encontro encerrado; poções e óleo voltam a contar do zero.
- **Efeitos "de início de encontro"** (Anel do Primeiro Passo, comida da primeira esquiva): **recarga interna de 30 s** — encerrar e reabrir encontros não repete o bônus.

### AN.2 Chefe (tentativa)
- Uma **tentativa** tem identificador próprio que cobre chefe, âncoras, adds e todos os jogadores presentes no início.
- **Fim:** vitória, derrota coletiva ou **reset integral** (todos fora da sala 10 s). Reset restaura **tudo dos dois lados** (chefe, âncoras, reserva, poções, reanimações) — nunca só um lado.
- Quem entra no meio (reconexão ou substituto) entra **com a reserva que tinha** ao sair; substituto novo entra com **50%** da reserva, e Água não importa reserva de fora da tentativa.
- Sair e voltar ou trocar de grupo **não** restaura recursos. Loadout só muda entre tentativas.
- Limites por tentativa: 5 poções, 2 reanimações por jogador (3 no Assalto), 1 Chamado de Resgate, 1 óleo.
- Artes, domínio e Leitor contam por tentativa como encontro válido (máx. 2 demonstrações, núcleo C.3).

---

## AO. Chefe-piloto completo — tipo Âncoras (camada 1)
### AO.1 Versão de 6
- **Vida 120.000 · Postura 1.000 · Armadura 50·s · Fadiga 100.** Sala circular de 40 m, 3 âncoras a 15 m do centro (ângulos 0°, 120°, 240°).
- **Ataques** (dano antes de defesa / aviso / impacto / frequência):
| Ataque | Dano | Aviso | Impacto | Frequência | Resposta |
|---|---|---|---|---|---|
| Golpe pesado (frontal 3 m) | 300 | 1,0 s | 40 | a cada 8 s | esquiva/parry/bloqueio |
| Varredura 270° | 220 | 0,9 s | 30 | a cada 12 s | pular para as costas (único lado seguro) |
| Investida (25 m em linha) | 340 | 1,3 s | 60 | a cada 20 s | sair da linha; **colide com pilar de Terra ou âncora** → exausto 6 s |
| Chuva de pedras (5 círculos de 3 m) | 180 | 1,5 s | 0 | a cada 25 s | sair dos círculos; deixa terreno lento 6 s |
| Grito (raio 10 m) | 0 | 1,2 s | 0 | fase 2, a cada 30 s | interromper (Ruptura) ou recebe +20% dano por 10 s |
- **Fases:** 100–60% normal · 60–25% Grito + as âncoras ativas recuperam 1 intervenção se ninguém estiver a 6 m delas por 20 s · 25–0% fúria (frequências −20%) — a fúria **só** começa com as 3 âncoras desativadas; se o HP chegar a 25% antes, o chefe fica em 25% (invulnerável) até a última âncora cair (vitória = HP zerado **e** âncoras desativadas).
- **Âncoras:** cada uma tem **4 intervenções** e **3 rotas** (cada rota resolve no máx. 2 das 4; ≥ 2 independem de elemento):
| Âncora | Rota A | Rota B | Rota C |
|---|---|---|---|
| 1 (força) | **Operação manual:** canalizar 4 s parado; dano interrompe e conserva 50% por 8 s | **Impacto:** 300 de impacto acumulado em 10 s (FOR/Ímpeto) | **Colisão:** induzir a investida do chefe contra ela (mobilidade + leitura) |
| 2 (luz) | Operação manual | **Precisão:** acertar 3 cristais (ponto fraco) em 6 s (PER, arco) | **Elemento:** 2 elementos diferentes em 5 s (qualquer par) |
| 3 (cobertura) | Operação manual | **Proteção:** um aliado mantém Muralha/Cobertura sobre o operador 6 s | **Controle:** interromper 2 conjurações dos adds de guarda |
- **Adds:** a cada âncora desativada, 2 constructos comuns (1.100 HP) + 1 elemental (800 HP).
- **Leitura do grupo (4 padrões):** contra bloqueio → quebra-guarda (flanco aberto 1,2 s) · contra esquiva → golpes atrasados (o último sempre tem janela de parry ampla) · contra distância → puxão (3 s em que ele fica Exposto) · contra interrupção → conjuração dupla (a 2ª é falsa e abre 4 s de postura vulnerável).
- **Tempo-alvo:** 8–12 min ✔ (287 s de dano + âncoras + adds + reposicionamento).
- **Reset:** todos fora da sala 10 s, ou derrota coletiva.

### AO.2 Versões de Assalto (12 e 24)
| | 6 | 12 | 24 |
|---|---|---|---|
| Vida | 120.000 | 216.000 | 432.000 |
| Postura | 1.000 | 1.600 | 2.800 (quebra coletiva escala menos que a vida) |
| Âncoras | 3 | 4 em 2 alas | 6 em 4 alas |
| Objetivos paralelos | 1 setor | 2 setores | 4 setores |
| Leitura | 1 | por ala (2) | por ala (4) |
| Reanimações | 2/jogador | 3/jogador, teto 12 | 3/jogador, teto 24 |
- **Buffs iguais não se somam entre grupos:** vale o maior (Muralha, Grito de guerra, Marca do caçador, Fogo).
- Desconexão: vaga reservada 3 min; substituto entra no checkpoint da sala com 50% da reserva.
- Participação para recompensa: dano, objetivos de âncora, suporte (cura movida, mitigação) — qualquer um ≥ 10% da média do Assalto conta; quem fica caído > 60% da tentativa não conta.

---

## AP. Andar-piloto completo (andar 2, camada 1)
| Parte | Conteúdo concreto |
|---|---|
| **Regra de bioma** | Escuridão: visão 15 m; Fogo, tochas (consumível) e cristais de luz iluminam 8 m; Sombras revelam a 6 m (+PER) |
| **Famílias** | Feras, Sombras (nova), Constructos, Insetos; variante regional: feras que só atacam fora da luz |
| **Cidade** | Santuário, banco, mercado, 5 estações, quadro de contratos (pacotes), portal |
| **Campo** | 2 zonas: Bosque (feras, insetos; 24 nós de madeira/fibra/couro) e Ruínas (constructos, sombras; 18 nós de minério/cristal); 1 chefe de campo (dracônico jovem, 12.000 × grupo, a cada 2 h); Fenda a cada ~90 min |
| **Missão do andar** | acender 5 braseiros nas Ruínas (ensina luz × Sombras) → XP + componente de receita |
| **Objetivo do andar** | Reconhecimento: mapear 3 pontos escuros (cada um protegido por 1 elite de sombra) |
| **Labirinto** | Direta (35 min, 4 elites, armadilhas de lança; mini-chefe: constructo de guarda dupla 30.000) · Longa (55 min, 3 baús de material, enxames; mini-chefe: rainha dos insetos 30.000 que gera 4 operárias a cada 20 s) · Técnica (45 min, espelhos de luz que abrem portas, sombras; mini-chefe: sombra que só é atingível iluminada) · 2 checkpoints |
| **Chefe** | Âncoras (AO) |
| **Contratos** | 8 tipos com versões do andar (ex.: Coleta "6 cristais com Condutividade ≥ 50"; Selamento não existe aqui → substituído por "Iluminação": acender 3 cristais) |
| **Tempo** | 1ª vez: campo 2 h + labirinto 1 h + chefe 15 min ≈ 3,5–4,5 h; repetido: 1–1,5 h |
| **Depois de conhecido** | 1 trecho do labirinto muda por semana; Migração traz uma família de fora; contratos rotativos; Ecos invertidos do chefe (tipo Perseguição na mesma sala) |

---

## AQ. Cadeia produtiva e três contabilidades
### AQ.1 As três contabilidades
1. **Ouro:** criado só pelas torneiras do núcleo G.1; destruído só pelos ralos (manutenção cobrada pelo NPC, reagentes de NPC, taxa de produção da estação, serviços, taxa de mercado, cosméticos).
2. **Materiais:** criados por coleta, esfola, baús, eventos; destruídos por fabricação (consumo), poção/comida usada, reparo com componentes, 50% do saque de Túmulo, Recolhedor (30%).
3. **Transferências:** mercado, pedidos, pagamento ao artesão, troca, saque — **nunca entram como ralo**.

### AQ.2 Linha de consumíveis da camada 1 (200 ouro/h no perfil médio) ✔
- **Reagentes de NPC:** 140/h (frascos, pavios, sal, tinta — vendidos só por NPC, entram em toda receita de consumível).
- **Taxa de produção:** 60/h (a estação destrói 10% do valor de referência de cada fabricação).
- Se o consumo observado ficar abaixo, o **controlador** (G.2) e a tabela são recalibrados — não se inventa gasto.

### AQ.3 Receitas da camada piloto (10 por profissão)
Formato: produto — materiais (substitutos entre parênteses) · reagente de NPC · taxa · rendimento.
**Forja:** 1) Lingote refinado — 3 minério (qualquer) · 0 · 2 · 1 lingote · 2) Liga densa — 2 lingote + 1 cristal (ou núcleo) · 5 · 4 · 1 · 3) Núcleo de arma — 2 liga · 0 · 6 · 1 · 4) Estrutura de arma — 2 lingote + 2 madeira (ou osso) · 0 · 5 · 1 · 5) Condutor — 1 cristal + 1 essência (ou núcleo elemental) · 8 · 6 · 1 · 6) Mecanismo — 1 liga + 2 fibra (ou couro) · 6 · 6 · 1 · 7) Arma montada — 4 componentes · 0 · 15 · 1 · 8) Pedra de afiar (componente de reparo) — 2 minério · 4 · 2 · 3 · 9) Ponta de flecha — 1 lingote · 2 · 1 · 20 · 10) Desmontagem — 1 arma → 70% dos componentes · 0 · 3.
**Armaria:** 1) Couro curtido — 2 couro (ou escama) · 3 · 2 · 1 · 2) Placa — 2 lingote · 0 · 3 · 1 · 3) Base leve/média/pesada — 3/4/5 couro curtido ou placa · 0 · 5/6/7 · 1 · 4) Forro elemental — 2 fibra + 1 essência · 6 · 4 · 1 · 5) Reforço — 1 placa + 1 couro curtido · 0 · 4 · 1 · 6) Peça de armadura montada — base + forro + reforço + Encaixe · 0 · 12 · 1 · 7) Escudo — 3 placa + 1 madeira · 0 · 10 · 1 · 8) Bolsa de expedição — 4 couro curtido · 5 · 6 · 1 · 9) Kit de remendo (reparo) — 2 couro · 4 · 2 · 3 · 10) Aljava — 2 couro curtido · 2 · 3 · 1.
**Alquimia:** 1) Poção — 2 erva + frasco · 6 · 2 · 2 · 2) Tônico de resistência — 1 erva + 1 resina · 5 · 2 · 2 · 3) Tônico limpo — 1 erva + 1 cristal (pó) · 6 · 2 · 2 · 4) Óleo elemental — 1 essência + 1 resina · 8 · 3 · 1 · 5) Bomba — 2 minério (pó) + pavio · 6 · 2 · 2 · 6) Bandagem (trata Ferida) — 2 fibra · 3 · 1 · 3 · 7) Selo de Retorno — 1 núcleo + 1 cristal · **8% de B** · 5 · 1 · 8) Chamado de Resgate — 1 essência + 2 erva · 10 · 4 · 1 · 9) Tocha — 1 madeira + 1 resina · 1 · 0,5 · 3 · 10) Reagente refinado — 3 erva (qualquer) · 2 · 1 · 2.
**Joalheria:** 1) Gema lapidada — 2 cristal · 3 · 3 · 1 · 2) Aro — 1 lingote · 2 · 2 · 1 · 3) Anel (efeito) — aro + gema + 1 material da família do efeito · 5 · 10 · 1 · 4) Amuleto (efeito) — aro + gema + 1 núcleo · 6 · 10 · 1 · 5) Foco elemental — gema + núcleo elemental · 8 · 8 · 1 · 6) Encaixe (efeito) — gema + material raro de Fenda/Eco · 6 · 8 · 1 · 7) Lente (PER, para Rota de Precisão) — 1 cristal · 2 · 2 · 1 · 8) Polimento (reparo de acessório) — 1 cristal · 2 · 1 · 3 · 9) Engaste — troca o Encaixe de uma peça · 4 · 4 · — · 10) Desmontagem de joia — 70% · 0 · 2.
**Culinária:** 1) Ração de viagem — 2 carne (ou peixe) · 2 · 1 · 3 · 2) Prato da primeira esquiva — 1 carne + 1 erva + sal · 4 · 2 · 2 · 3) Caldo do carregador (+2 carga) — 2 peixe + 1 raiz · 4 · 2 · 2 · 4) Pão de vigília (telegrafias de comuns +0,05 s) — 2 grão · 3 · 2 · 2 · 5) Assado do impacto (+5% impacto de parry) — 2 carne + sal · 4 · 2 · 2 · 6) Chá da calma (regen de energia +10% fora de combate) — 2 erva · 2 · 1 · 3 · 7) Banquete de grupo (6 pessoas, 1 comida a escolher) — 6 ingredientes · 10 · 6 · 1 · 8) Conserva (comida dura 2× fora do inventário) — sal + 1 comida · 2 · 1 · 1 · 9) Isca de pesca — 1 carne · 1 · 0,5 · 5 · 10) Tempero refinado — 2 erva (qualquer) · 1 · 1 · 2.
- Toda receita aceita **substitutos de pelo menos 2 famílias/fontes** — nenhum corredor vira obrigatório.
- **Reparo:** componentes de reparo (pedra, kit, polimento) **+ taxa do NPC** (a taxa é o ralo de manutenção de ouro; o componente é ralo de material).

---

## AR. Catálogos
### AR.1 Modificadores (6 atributos × 3 marcos × 3 opções = 54)
Formato: marco — opção 1 / opção 2 / opção 3.
- **FOR** +15 — recuperação do pesado vira passo à frente 1 m / bloquear com arma de 2 mãos custa −15% / agarrão e golpe de escudo +10 de impacto · +35 — Golpe de Ímpeto derruba comuns / pesado acerta 2 alvos (60% no 2º) / carga do machado e tensão do arco 20% mais rápidas · +55 — quebrar postura devolve 20 resistência / impacto contra partes quebráveis +25% / Ímpeto gasto ≥ 70 gera onda de 3 m (impacto 20)
- **DES** +15 — esquiva para frente encurta 30% e é 10% mais barata / 3º leve seguido +10% de dano / troca de arma 0,4 s · +35 — esquiva perfeita encadeia leve sem custo / passo lateral após qualquer leve / continuações de Ímpeto atravessam o alvo · +55 — 1 esquiva extra sem custo a cada 8 s / Ritmo, Fluxo e Frenesi não zeram no 1º erro / correr 2 s → próximo leve é investida 3 m
- **VIG** +15 — bloquear enquanto canaliza (custo ×1,5) / reserva de cura +10% / caído dura 30 s · +35 — reanimar 30% mais rápido / bloqueio de projétil sem custo 1×/6 s / Ferida −5% em vez de −10% · +55 — ao cair, 1×/tentativa, levanta com 15% (gasta reserva) / Muralha e Cobertura +1 s / postura regenera após 1 s
- **POT** +15 — canalizado aplica elemento 2× (1×/6 s) / energia +15 / conjuração de área +0,5 m · +35 — Utilidade dura +2 s / disparo pela arma atravessa 1 alvo / imbuir dura 1 s após trocar de arma · +55 — zerar a energia → próximo canalizado ×1,5 e 3 s sem regenerar / elemento contra alvo fraco ×1,15→1,20 / Utilidade 2 ativas (exceção ao limite)
- **CON** +15 — conjuração 10% mais rápida / interrupção bem-sucedida devolve 10 energia / área deixa marca 2 s (+10% impacto) · +35 — conjurar andando a 60% / projétil teleguiado leve (15°) / silêncio sofrido −30% · +55 — 2 conjurações sem custo a cada 20 s / conjuração interrompe preparo marcado / área muda de elemento a cada uso (escolha do seu ou neutro)
- **PER** +15 — telegrafias mostram a direção 0,2 s antes / ponto fraco destacado a 20 m / Sombras reveladas a 9 m · +35 — parry perfeito (centro da janela) +10 Ímpeto / tiro em ponto fraco +10% impacto / Diário com frases claras · +55 — 1 parry por encontro com janela técnica máxima / mostra o padrão da leitura do chefe 2 s antes / marcar alvo para o grupo (+10% Precisão para todos, não acumula)

### AR.2 Encaixes de armadura (12)
Esquiva perfeita devolve +5 resistência · bloqueio frontal custa −10% · Lento sofrido −30% · queda sem dano · nadar 50% mais rápido · cura recebida da Água +15% · Ferida dura 5 min · peso desta peça −50% · postura +10% abaixo de 30% de vida · imune ao chão escorregadio do próprio grupo · luz própria 4 m (escuridão) · resistência elemental +10% contra 1 elemento (forro passa de 15% → até 20%, teto).
Regra: 1 por peça, efeitos iguais **não acumulam**.

### AR.3 Acessórios (12; máx. 2, iguais não acumulam)
Primeiro Passo (20 Ímpeto no início; recarga interna 30 s) · Brasa (Golpe de Ímpeto aplica elemento) · Vigia (telegrafias de comuns 0,1 s antes) · Peso Certo (+4 confortável) · Mensageiro (reanimar 25% mais rápido) · Caçador (Marca dura +2 s) · Pedra Fria (Lento aplicado +0,5 s) · Lâmina Calma (1º parry do encontro +20 Ímpeto) · Coletor (+1 material a cada 5 coletas, não na Fronteira) · Andarilho (+5% movimento fora de combate) · Barreira (Terra recebida +10 postura) · Sentinela (aviso sonoro quando jogador hostil entra a 30 m, só Fronteira).

---

## AS. Artes: 15 assinaturas e ramos
Cada Arte tem **3 rotas** (assinaturas) com limites diferentes; cumprir **qualquer uma** prepara a Arte.
| Arte | Rota 1 | Rota 2 | Rota 3 |
|---|---|---|---|
| Eco | Esquiva ≥ 0,6 · Agressão ≥ 0,5 · DES +25 · 150 feras/aviários | Esquiva ≥ 0,5 · Mobilidade ≥ 0,6 · DES +20 · 100 sombras | Esquiva ≥ 0,55 · Compromisso ≥ 0,5 · PER +20 · 120 humanoides |
| Inversão | Defesa ativa ≥ 0,6 · PER +25 · 150 humanoides | Defesa ativa ≥ 0,5 · Controle ≥ 0,5 · CON +20 · 100 elementais | Defesa ativa ≥ 0,55 · Mobilidade ≥ 0,5 · DES +20 · 120 feras |
| Maré | Vetor mágico (imbuir) ≥ 0,5 · POT +30 · 150 elementais | Vetor (disparo) ≥ 0,5 · CON +20 · 120 aviários | Vetor (conjurar) ≥ 0,5 · Controle ≥ 0,5 · 100 plantas |
| Âncora | Defesa ativa ≥ 0,6 (bloqueio) · VIG +30 · 150 constructos | Compromisso ≥ 0,6 · FOR +25 · 120 colossos/dracônicos | Defesa ativa ≥ 0,5 · Controle ≥ 0,5 · VIG +20 · 120 mortos-vivos |
| Passo Fantasma | Mobilidade ≥ 0,65 · DES +30 · 150 insetos | Mobilidade ≥ 0,55 · Agressão ≥ 0,6 · 120 feras | Mobilidade ≥ 0,55 · Precisão ≥ 0,5 · PER +20 · 100 sombras |
**Ramos (níveis 1–5):** cada nível libera **1 alternativa** que muda a forma, nunca o orçamento (índice ≤ 1,10, nenhum q > 1,25):
Eco — 2: eco atrasado 0,8 s · 3: Eco Duplo (70/15/15) · 4: eco fica no lugar como isca 1 s · 5: eco copia defesa (parry) em vez de ataque.
Inversão — 2: troca com aliado em vez de inimigo · 3: troca deixa o inimigo Exposto 1 s · 4: troca só a direção (vira o inimigo) · 5: troca de lugar com o projétil.
Maré — 2: troca por Ímpeto > 50 (efeito −20%) · 3: troca na esquiva perfeita · 4: mantém os dois elementos 2 s ao trocar · 5: elemento oposto para o grupo 4 s (você fica neutro).
Âncora — 2: devolve postura em vez de impacto · 3: protege aliado atrás (cone 60°) · 4: refletido vira área 2 m (−50%) · 5: guarda o impacto e solta no próximo pesado.
Passo Fantasma — 2: atravessa projéteis · 3: deixa rastro Lento · 4: ativa na esquiva em vez de correr · 5: atravessa aliado e dá 10 Ímpeto a ele.

---

## AT. Controle no PvP
- **Categoria única "incapacitante"** (Atordoado, Derrubado, Preso, Silêncio, agarrão, deslocamento forçado ≥ 3 m): 1ª aplicação = duração normal **com teto de 1,5 s**; 2ª dentro de 8 s = 50%; 3ª = imune; ao fim de uma cadeia, **2 s de imunidade** à categoria ✔ (pior caso de uma equipe coordenada: 1,5 + 0,75 = **2,25 s** em 8 s; v5 permitia 5,2 s).
- **Lento** tem orçamento separado (máx. −40%, sem cadeia).
- Periódicos e Ferida não entram na categoria.
- Postura no PvP: quebra = atordoado **1,0 s** (não 2 s) e dano ×1,15.

---

## AU. Nova Era (transição)
1. Vencer o andar 100 **habilita** a Nova Era; a transição acontece **7 dias depois** (aviso global), e a Era precisa ter durado **no mínimo 12 semanas** (se não, espera completar).
2. Na transição: quem está acima do andar 10 fica no andar mais alto **aberto** da nova Era ou na cidade do andar 1 (sem perda); **progresso pessoal histórico** fica registrado; na nova Era, o acesso pessoal (Y.2) recomeça pela regra normal, mas **Ventos de retorno** valem para andares que você já venceu na Era anterior (+50% XP, 1 tentativa de Assalto a mais por semana).
3. Materiais e equipamentos continuam; estações e cidades acima do andar aberto ficam inacessíveis até reabrir.
4. **Singulares** seguem o calendário próprio (núcleo C.4).
5. Recompensas únicas de abertura têm identificador **por Era e por conta** (não repetem infinitamente).
6. Voto de adiamento: se ≥ 60% das contas ativas votarem, a transição atrasa 7 dias (1× por Era).

---

## AV. Fichas das mecânicas próprias (completas)
| Mecânica | Ganha | Mantém | Zera / perde | Interações |
|---|---|---|---|---|
| Fluxo (desarmado) | +1 por golpe em direção diferente da anterior (máx. 5) | 3 s sem golpe | repetir direção, 3 s sem golpe, troca de arma | +6% impacto/nível; Corpo de ferro dá +1 ao receber golpe |
| Flanco (espada curta) | golpe fora do cone frontal de 120° | — | — | +30% dano; **não muda Precisão do Leitor** (só ponto fraco real conta); contra chefe o flanco existe só com o chefe em ataque/abertura (~40% do tempo) ✔ |
| Guarda alta/baixa | troca instantânea (0,2 s de recarga) | — | — | parry baixo +20 ms (teto 240) |
| Ritmo (duas espadas) | +1 por golpe alternado E/D que acerta | 2 s sem atacar | errar, levar golpe, troca de arma | a cada 4 alternados, o **5º golpe é substituído** pelo corte cruzado (K 1,0 em vez de 0,40×2) |
| Muralha | segurar bloqueio parado 0,5 s | enquanto parado | mover-se, resistência zero | cone 60°/3 m, −30% projétil/área frontal; **várias Muralhas: vale a maior** |
| Bainha | guardar (0,4 s) e segurar | até 1,2 s de carga | atacar, ser atingido sem defesa | saque de resposta = parry +40 ms (teto 240) |
| Fio duplo | parry com katanas | — | — | contra-ataque 2 × K 0,6; esquiva 0,24 s i-frame, −30% custo |
| Carga (machado grande) | segurar pesado | até nível 3 | soltar, ser derrubado | sem stagger comum a partir do nível 2; **não ignora controle de chefe** |
| Arremesso e Marca | arremesso acerta | 6 s | outro alvo marcado | +25% impacto no marcado; 1 marca (Caça: 3) |
| Frenesi | +3% velocidade por acerto | 2 s | levar golpe, 2 s sem acertar, troca | máx. +15%, dentro do teto 1,45 |
| Tensão (arco) | segurar pesado | 2 s | soltar, esquivar | K 1,0 → 1,5 em 1 s; >2 s: Precisão do tiro −50% (dispersão, não métrica) |
**Dano com mecânica no uso real** ✔: espada curta com Flanco em ~40% do tempo contra chefe = ×1,12 sobre a taxa base → **1,14× a média** das armas corpo a corpo, dentro de ±15% (o v5 só testava o boneco); contra comuns que não giram (constructos), Flanco ~70% = 1,23× a média — vantagem **assumida** nessa família, compensada pela fraqueza contra insetos e dracônicos (AJ).

---

## AW. Grupo, guildas, social, acessibilidade, chegada tardia, modelo comercial
- **Recompensa por participação:** conta quem fez ≥ 10% da média do grupo em **qualquer** de: dano, objetivo, cura movida, dano interceptado/mitigado; quem passou > 60% do encontro caído ou parado não conta.
- **Guildas:** cargos com permissões (banco: retirar até X por dia por cargo), **sucessão** automática ao cargo mais alto ativo após 30 dias de inatividade do líder, registro de banco; saída de membro com retirada de banco suspensa por 48 h após entrar.
- **Social e moderação:** amigos, bloqueio (bloqueado não vê seus pedidos nem entra no seu grupo), denúncia com replay do servidor, chat de grupo/guilda/aliança/canal, filtro configurável; trocas contestadas: reversão só por fraude comprovada.
- **Acessibilidade:** remapeamento total; todo aviso tem **forma + som**, não só cor; indicador de área opcional; opções de câmera (distância, tremor); modo de mira assistida para o arco **sem** aumentar janela de nada.
- **Chegada tardia:** andares mais de 10 abaixo da frente: **rota acelerada** (o labirinto abre a rota direta já mapeada; objetivo do andar reduzido) → **30–45 min por andar**; chefe de 6 com **escala 1–6** (vida × (0,3 + 0,7·n/6)) para baixa população; +50% XP (Ventos de retorno).
- **Modelo comercial:** só cosméticos e conveniências sem poder (aparência, emotes, salão decorado). **Nunca vendidos:** Selo, peso/capacidade, profissão, domínio, materiais, cargas de redistribuição, ouro, XP.

---

## AX. Montagem da matriz de andares (bioma × objetivo × chefe)
Não é qualquer combinação: regras de compatibilidade.
| Tipo de chefe | Biomas permitidos | Biomas proibidos (por quê) |
|---|---|---|
| Âncoras | todos | — |
| Partes quebráveis | todos menos baixa gravidade | baixa gravidade (partes altas ficam triviais) |
| Arena que muda | escuridão, frio, tempestade, neblina | maré (dois sistemas de chão ao mesmo tempo) · baixa gravidade (queda sem dano anula a mecânica) |
| Duplo | todos menos neblina | neblina tóxica (separar 15 m sem área purificada = dano injusto) |
| Perseguição | escuridão, frio, maré, neblina | tempestade (correr em lugar alto pune o próprio objetivo) · baixa gravidade |
| Cerco | todos menos maré | maré (o ponto defendido alaga) |
| Objetivo | Exige |
|---|---|
| Expedição logística | **não** combina com baixa gravidade; precisa de rota com 2 caminhos |
| Controle territorial | andar com ≥ 3 zonas abertas |
| Perseguição (objetivo) | não no mesmo andar do chefe Perseguição |
Regras extras: numa camada (10 andares) cada tipo de chefe aparece **1–2 vezes**, cada bioma **1–2**, nenhuma tripla repetida; a Nova Era reembaralha **dentro** destas regras.

---

## AY. O que está provado e o que não está
`sim/check_v6.py` (roda v4 e v5 antes) confere: TTK de todas as linhas de AI.2 dentro do tempo-alvo; ataque de chefe 18–25% do tanque; Assalto com mesmo tempo de dano para 12/18/24; armadura com mitigação constante entre camadas; janelas de parry ≤ 180/240; contrato 17,5% em todo o conjunto (busca o texto); cadeia de controle PvP ≤ 2,25 s em 8 s; matriz família × arma (≥ 3 fortes, ≥ 2 fracas, ≥ 2 respostas por família); sincronia preserva a forma da build; capacidade máxima; Selo nunca reduz perda na Fronteira/Infâmia (precedência); saque destrói 50%; reanimação = mín(30%, reserva) e mínimo 5%; Flanco realista dentro de ±15%; linha de consumíveis 140 + 60 = 200; 54 modificadores; 10 receitas por profissão; 33 avançadas; 15 assinaturas.
**Não prova:** diversão, as 66 técnicas em execução real, rede, comportamento de jogadores, economia por agentes, Nova Era em servidor real. Isso é trabalho do protótipo (parte 2, AH).
**Testes cruzados obrigatórios no protótipo:** derrota × Selo × Infâmia × Túmulo · troca de arma × recargas × efeitos · cadeia de controle 3×3 · reset de tentativa × substituição × Água · transição de Era com jogadores em andares altos.
