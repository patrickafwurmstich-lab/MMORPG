# MMORPG — Contratos entre sistemas v8 (parte 3 de 3)

> **Parte 3 de 3.** A parte 1 (`08-nucleo-v8.md`) tem as fórmulas; a parte 2 (`08-jogo-v8.md`) tem o jogo concreto. Esta parte fecha **como os sistemas se encontram**: precedência, encontro e reset, tempo de combate, chefe e andar-piloto completos, Fronteira completa, controle no PvP, sincronia, cadeia produtiva com três contabilidades, catálogos (modificadores, Encaixes, acessórios, receitas, avançadas, assinaturas) e Nova Era.
> Foi escrita para responder à revisão 1 do loop 2 (ChatGPT: 11 bloqueadores; Grok: 4 bloqueadores + exploits). Números de protótipo; os que o `sim/check_v8.py` confere estão marcados com ✔.

## O que mudou do v7 para o v8 (parte 3)
| Revisão 3 | Onde |
|---|---|
| ChatGPT B7.1: sincronia nunca aumenta atributo (teto ⌈λx⌉ e original, prioridade recalculada, para quando nada admissível cabe) | AK.2 |
| ChatGPT B7.2: uma só curva de teto (f + 5) também em AK | AK |
| ChatGPT B7.3: Arena 9 → 7 → 5 → 4, placa central fixa, percurso garantido | AZ.2 |
| Grok: orçamento de mecânicas dos 6 chefes + regra de ajuste fechada; tempo-alvo 6–10 min | AI.6 |
| Grok: ala em falência, ala sem líder, sucesso parcial do Assalto | BA |
| Grok: autorressurreição só com aliado em pé; domínio só em tempo válido; desconexão na Fronteira | AI.4, parte 2 Z, AL.2 |
| Importantes da revisão 3: Perseguição em permutação com trava; Núcleo do Cerco com reserva própria; Túmulo com retirada parcial; quente recolhido por outro = terceiro; carga de fora em risco; peso físico × peso de origem; extração com agressor × defensor; custódia na Nova Era; vida na sincronia pelo VIG; deslocamento = 1 aplicação; Desafio de rota; duelo sob hostilidade; Assalto Duplo com 2 alas; Resgate em janela móvel | AZ, AL, AU, AK.3, AT, BD, BA |

## O que mudou do v6 para o v7 (parte 3)
| Revisão 2 | Onde |
|---|---|
| N1 sincronia por custo; Arena/Provação com distribuição própria | AK |
| N2 perfil de referência na curva de teto; quadro de unidades | AI.1, AI.3 (+ núcleo A.7) |
| N3 só reconexão durante a tentativa; 25% só com resolução válida | AN |
| N4 impactos base (parte 2 K.2); rota de Proteção 2 s em 4 s; cotas devolvidas; versões 1–2 / 3–6; simultaneidade do Assalto | AO, AO.1b |
| N5 marca de origem até a extração; Túmulo com regra fechada | AL.2 |
| N6 duelo/Arena fora da atribuição; Infâmia por conta e tabela única | AH-P, AL.3 |
| Grok: +5 chefes-piloto completos, Assalto dos 6 tipos | AZ |
| Grok: comunicação e interface do Assalto | BA |
| Grok: 2º andar-piloto; matriz da camada 1 preenchida | BB, BC |
| Grok/ChatGPT: 66 avançadas mapeadas aos marcos | AM, BD |
| Importantes: deslocamento forçado, Resgate, autorressurreição, participação, Posto em instância, capacidade antes de entrar, pesos, grau das receitas, Encaixe básico, domínio por tempo, Nova Era (renda e migração) | AT, AI.4, AW, AL.5, AK, parte 2 X/Z/L.4, AQ.3, AU |

## Índice
AH-P. Precedência · AI. Tempo de combate e escala · AJ. Matriz família × arma · AK. Sincronia · AL. Fronteira completa · AM. Técnicas avançadas · AN. Contrato de encontro · AO. Chefe-piloto completo (6 / 12 / 24) · AP. Andar-piloto completo · AQ. Cadeia produtiva e três contabilidades · AR. Catálogos (modificadores, Encaixes, acessórios) · AS. Artes: 15 assinaturas e ramos · AT. Controle no PvP · AU. Nova Era · AV. Fichas das mecânicas próprias · AW. Grupo, guildas, social, acessibilidade, chegada tardia, modelo comercial · AX. Montagem da matriz de andares · AZ. Os outros 5 chefes-piloto · BA. Interface do Assalto · BB. Andar-piloto 2 · BC. Matriz da camada 1 · BD. As outras 33 avançadas · AY. O que está provado e o que não está

---

## AH-P. Tabela de precedência (resolve conflitos entre regras)
Quando duas regras se aplicam ao mesmo momento, vale a de cima.
| Ordem | Regra | Exemplo |
|---|---|---|
| 1 | **Antitrapaça e sanção** | conta bloqueada não saqueia nem é saqueada |
| 2 | **Zona** (cidade segura > Fronteira > campo > instância) | Selo não funciona na Fronteira mesmo que o item diga "não perde" |
| 3 | **Infâmia** (tabela 0 / 1–2 / 3+, AL.3) | com Infâmia ≥ 1 perde 100%, mesmo protegido por Selo |
| 4 | **Causa da derrota** (PvP se houve contribuição **hostil válida da Fronteira** nos últimos 30 s; duelo/Arena não contam) | monstro dá o último golpe → ainda é derrota PvP |
| 4b | **Duelo e Arena** | terminam em 1 HP / zero perda; nunca geram Túmulo |
| 5 | **Proteção do novato** (até o andar 3) | metade das perdas de PvE; não entra na Fronteira |
| 6 | **Selo de Retorno** (só o peso coberto) | 15 de peso coberto, o resto segue a regra normal |
| 7 | **Perdas normais** (S.2) | 10% XP, 50% material |
| — | Em combate: **contrato de encontro (AN)** > técnica > equipamento > consumível | poção limitada por tentativa mesmo que o Anel diga "por encontro" |
| — | Tetos: **teto do núcleo** > bônus de arma/técnica | janela técnica nunca passa de 240 ms; velocidade nunca passa de 1,45 |

---

## AI. Tempo de combate (TTK) e escala

### AI.1 Modelo de DPS efetivo (base de todas as vidas) ✔
**DPS efetivo = P_arma × (K/tempo médio da arma) × (1 + Σw·r) × 0,55 (tempo atacando) × M_alvo.**
**Perfil de referência** (núcleo A.7): nível-teto do último andar da camada (camada 1 → nível 15, orçamento 62), principal +20, secundário +15, VIG +10, P_arma 110 (grau 110%), K/tempo ≈ 1,10, armadura inimiga 50·s → M = 0,8 → Σw·r ≈ 0,8·r(20) + 0,2·r(15) = 0,321 → **≈ 70 de dano por segundo** por jogador ✔ (o custo do perfil cabe no orçamento do nível 15 com afinidade ✔).
Inimigos e armas escalam igual (× s) e a armadura usa s → **o tempo de combate é o mesmo em toda camada** ✔.
**Andares anteriores da camada** (teto mais baixo): **vida(f) = vida da tabela × D(f)/D(último andar)**, com D(f) = DPS do perfil do nível-teto(f) (principal e secundário reduzidos pelo λ de AK). Ex.: andar 2 (nível-teto 7: perfil sincronizado 13/10/7) → D ≈ 66 → fator **0,94** ✔.

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
| **Chefe de Andar (6)** | **6–10 min** no total (≈ 5 min de dano; orçamento de mecânicas em AI.6) | **120.000** | 287 s |
| **Assalto (n = 12 / 18 / 24)** | **7–12 min** no total | **120.000 × n/6 × 0,9** = 216k / 324k / 432k | 259 s (o mesmo para qualquer n) |

### AI.3 Ficha dos 6 tipos de chefe (camada 1, versão de 6; vida e dano × s, postura e impacto não escalam)
(Esta tabela é o **modelo** de cada tipo; a ficha concreta de cada chefe — AO, AZ — pode mudar a contagem, ex.: o chefe de Partes do andar 5 exige 3 das 4 partes.)
Referência defensiva: **tanque de referência (VIG +20 no nível 15) = 1.300 de vida** → ataque principal do chefe = **18–25%** dela (234–325) ✔.
| Tipo | Vida | Postura | Ataque principal (dano / aviso) | Abertura | Mecânica que trava a vitória |
|---|---|---|---|---|---|
| Âncoras | 120.000 | 1.000 | 300 / 1,0 s | exaustão 6 s (Fadiga) | 3 âncoras × 4 intervenções (AO) |
| Partes quebráveis | 110.000 | 1.200 | 320 / 1,2 s | parte quebrada = 8 s derrubado | quebrar 4 partes (6.000 de impacto/dano cada) |
| Arena que muda | 115.000 | 900 | 280 / 0,9 s | 5 s entre fases | 3 fases; o chão cai em 75% / 50% / 25% |
| Duplo | 2 × 60.000 | 800 cada | 250 / 0,9 s | separados > 15 m: os dois recebem +20% de dano | se ficam < 8 m, cada um cura 1%/s; precisam cair com ≤ 20 s de diferença |
| Perseguição | 90.000 | 1.000 | 300 / 1,0 s | encurralado: 10 s | encurralar 3 vezes em pontos diferentes do labirinto |
| Cerco | 100.000 | 1.000 | 280 / 1,0 s | 6 s entre ondas | proteger um ponto (vida 20.000) por 4 ondas |

### AI.4 Reanimação em grupo grande
- Grupo de 6: um jogador pode ser reanimado **no máx. 2 vezes** por tentativa.
- **Assalto: no máx. 3 vezes por jogador**, e o Assalto inteiro tem um **teto de n reanimações** por tentativa (24 jogadores → 24).
- **Chamado de Resgate** (consumível de Alquimia, 1 por tentativa): reanima até 2 aliados caídos num raio de 3 m em 6 s (interrompível), recarga 45 s, conta no teto. **Origem da vida:** sai da **reserva de quem usa** (cada aliado volta com 15% da vida máx. dele; se a reserva do usuário não cobre, reanima só 1 ou falha e o item não é gasto — a interface avisa). Única exceção à regra "cura gasta a reserva de quem recebe" (parte 2, N).
- **Autorressurreição** (modificador VIG +55): só funciona se **pelo menos 1 aliado** da tentativa ainda estiver em pé; o último a cair **não** se levanta sozinho (a derrota coletiva acontece normalmente). Conta no teto de reanimações.

### AI.6 Orçamento de mecânicas dos 6 chefes (estimativa de papel + regra de ajuste)
Modelo: **tempo ≈ (vida/D + M) / n**, com D = 70 por jogador e **M = jogador-segundos gastos em mecânica** em vez de dano (operar, correr, matar adds, esperar onda). Erros, reanimações e deslocamento extra entram como **+20%** sobre o resultado.
| Tipo | Vida | M estimado (jogador·s) | Tempo sem erros | Com +20% | Parcela de mecânica ✔ |
|---|---|---|---|---|---|
| Âncoras | 120.000 | 380 (12 intervenções × 21 + adds 9.000 de vida) | 349 s | 7,0 min | 18% |
| Partes | 110.000 | 463 (partes 24.000 + posicionamento 120) | 339 s | 6,8 min | 23% |
| Arena | 115.000 | 204 (3 quedas × 48 + correntes 60) | 307 s | 6,1 min | 11% |
| Duplo | 120.000 | 150 (Chamado, separar, sincronizar a morte) | 311 s | 6,2 min | 8% |
| Perseguição | 90.000 | 560 (3 fugas × 30 s × 6 + alavancas) | 308 s | 6,2 min | 30% |
| Cerco | 100.000 | 202 (4 ondas de 3.540) — **portão de tempo**: 4 ondas × 90 s | 360 s (o portão manda) | 7,2 min | 34% |
Todas abaixo do limite de **40%** de mecânica que o Grok fixou e dentro de 6–10 min.
**Regra de ajuste no protótipo (fechada, não opcional):** para cada tipo, medir tempo total T_med e parcela de mecânica m_med com o grupo de referência (10 tentativas vitoriosas). **vida_nova = vida × limitar(8 min / T_med, 0,8, 1,2)**; se m_med > 40%, primeiro reduzir intervenções/partes/ondas em 1 e medir de novo. A tabela de AI.3 é atualizada com o valor medido.

### AI.5 Leitura do chefe no Assalto
A sala do Assalto tem **2–4 alas** (uma por grupo). A leitura (núcleo E.3) acontece **por ala**: cada ala tem seu contador de ≥ 20 oportunidades e sua adaptação de 30 s; as alas não se somam. Cada adaptação continua abrindo oportunidade.
**Ataques locais** (que atingem uma ala) usam a adaptação daquela ala; **ataques globais** (toda a sala) usam **uma só regra**: o padrão da ala com mais oportunidades acumuladas (empate: nenhum) — nunca quatro adaptações ao mesmo tempo.

---

## AJ. Matriz família × arma (forte / fraca) ✔
Regra conferida: cada arma é **forte** contra ≥ 3 famílias e **fraca** contra ≥ 2; cada família tem ≥ 2 respostas fortes de arma. **Respostas à distância** contam arco **e** vetores mágicos (disparo e conjuração, que todo personagem tem): as famílias em que o arco é fraco (Sombras, Humanoides, Feras) continuam tendo resposta à distância pela magia (luz/Fogo contra Sombras; interrupção e área contra Humanoides; Gelo/Terra contra o avanço das Feras).
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
Ao entrar numa área de **andar f** (nível-teto(f) = mín(100; f + 5), camada c_f):
1. **Nível efetivo = mín(nível, nível-teto(f))**, com **nível-teto(f) = mín(100; f + 5)** (a mesma curva do núcleo E.6, usada também em AI, onboarding, chefes, capacidade e Infâmia); orçamento efetivo = pontos do nível efetivo (núcleo B: 20 + 3·(nível − 1)).
2. **Redução por custo (fator λ):** só reduz (λ ≤ 1). A afinidade é **congelada na entrada**. Para cada atributo com x original > 0, o **alvo** é **alvo_i(λ) = mín(xᵢ; máx(1; λ·xᵢ))** (atributo que existia nunca vai a 0; atributo 0 fica 0). λ é o maior valor com **Σ C_af,i(alvo_i(λ)) ≤ orçamento_teto** (busca binária). Depois:
   a) cada atributo = ⌊alvo_i⌋;
   b) **teto de cada atributo = mín(⌈alvo_i⌉; xᵢ)** — a sincronia **nunca aumenta** um atributo e nunca se afasta 1 ponto ou mais do alvo;
   c) a **sobra** é gasta 1 ponto por vez, **recalculando a prioridade a cada ponto**: entre os atributos ainda abaixo do seu teto, o de **maior resto** (alvo_i − valor atual); empate: maior x original, depois a ordem FOR, DES, VIG, POT, CON, PER; para quando **nenhum ponto admissível cabe** no orçamento (pode sobrar orçamento — a identidade da build vale mais que gastar tudo);
   d) se o orçamento do teto não paga nem 1 ponto em cada atributo que existia, a entrada é recusada com aviso (não acontece com as builds válidas a partir do nível 6);
   e) vida, resistência, postura, energia, janelas e modificadores são **recalculados** com os valores sincronizados.
   Resultado conferido ✔ para builds especialista, generalista e híbrida (100 → 6, 100 → 20, 60 → 15) e para **builds com atributos pequenos (1–5 pontos)**, incluindo o caso da revisão (20/4/1 de orçamento 38 → 35 dá **19/4/1**: λ = 0,9907, maior resto é DES 3,96 → 4; depois FOR não cabe; VIG fica 1): custo ≤ orçamento, nenhum atributo acima do original, |valor − alvo| < 1, nenhum atributo existente zerado, nenhum ponto admissível sobrando; mais **3.000 builds aleatórias** com atributos de 1–5 e afinidade.
   **Modificador** fica ativo só se o valor sincronizado alcança o marco; se não, **o espaço fica vazio** (não troca sozinho); trocar só em Santuário/checkpoint fora de hostilidade.
   **Builds achatadas para a Fronteira** (Grok): perder modificadores de +55 em andares baixos é intencional — a Fronteira de cada camada fica no último andar dela (teto alto da camada), o que limita o ganho de achatar.
3. **P_arma e armadura de cada peça** = mín(valor real; valor de grau 120% da camada c_f × 1,05), por espaço/classe. **Vida, resistência, postura e energia** são recalculadas pela fórmula do núcleo A.5 com os atributos sincronizados e **HP_camada(c_f)** — vida não tem "grau"; o investimento em VIG conta pelo valor sincronizado.
3b. **Capacidade** é recalculada **antes de entrar** com a FOR sincronizada: se a carga passar da capacidade efetiva, a entrada é **impedida** (com aviso) — nada é destruído.
4. **Não muda:** técnicas, domínio, Artes Únicas comuns, Ímpeto (as fórmulas usam x_ef), habilidade do jogador. **Singulares desligadas** em Fronteira, Arena e corrida de abertura.
5. **Arena e Provação:** **não** expandem a build do personagem. Cada personagem tem uma **distribuição de Arena própria** (orçamento do **nível 60 = 197**, sem afinidade, 0–60 por atributo), editável **grátis** antes da entrada (começa como cópia escalada da build atual, se couber); equipamento-padrão de grau 110%.
6. Diferença de nível **para Infâmia** usa o **nível efetivo** (depois da sincronia), nunca o real.

---

## AL. Fronteira completa (PvP aberto)

### AL.1 Números
- **Pureza:** nós normais 40–70; Fronteira 85–100. 10 min na Fronteira rendem em valor ≈ 15–20 min de coleta normal.
- **Peso da pureza:** material de pureza ≥ 85 pesa **×1,5** → um FOR +60 (capacidade 50) leva no máximo ≈ 33 de material puro ≈ 25–30 min de coleta normal em valor (teste do Grok: razão ≤ 3× ✔).
- **Fendas da Fronteira:** mini-chefes de 8.000 HP (sincronizados), a cada 30 min por conta; material raro de Encaixe.
- **Extração:** o material só fica "seguro" quando você sai por um dos **3 portões** da Fronteira (10 s parado, interrompível por dano). Morrer antes = regras de AL.2.
- **Contra o bloqueio dos portões:** além dos 3 portões fixos, **1 portão móvel** aparece a cada 10 min em ponto aleatório (anunciado só para quem está carregando ≥ 10 de peso); o **agressor inicial** (AL.3) de um confronto nos últimos 60 s **não pode usar nenhum portão** por 60 s; quem só **se defendeu** precisa de **10 s sem ação hostil própria** para extrair; a extração (10 s) só é interrompida por dano ≥ **5% da vida** de uma vez, controle incapacitante ou mover-se — dano mínimo não interrompe; dentro de 15 m de um portão, quem está extraindo recebe **−30% de dano**. Isto é uma **contramedida a medir no protótipo**, não um bloqueio "fechado".

### AL.2 Derrota, Túmulo e origem do material na Fronteira (regra fechada)
**Marca de origem.** Todo material obtido na Fronteira (coleta, Fenda, saque) recebe a marca **origem_fronteira**, que só sai numa **extração válida** (portão, AL.1). A marca **passa para tudo que for feito com ele**: dividir, juntar, refinar, fabricar, desmontar, cozinhar. **Não expira com o tempo.** Na derrota, tudo que tem a marca conta como carga arriscada pelo **peso dos materiais que o originaram** (fabricar no campo não protege nem comprime).
**Carga de fora:** todo material que você **traz** para a Fronteira é registrado na entrada e também entra em risco (recebe a marca na entrada) — não existe carga "de fora" protegida.
**Peso físico × peso de origem:** a interface mostra os dois. A **capacidade** usa o peso físico (com pureza ×1,5); o **risco** na derrota usa o peso de origem (o dos materiais que originaram cada item).
**Na derrota (Fronteira):** cai no Túmulo **50%** da carga arriscada (**100%** com Infâmia ≥ 1); **sem perda de XP**; **Selo não funciona**. Renasce **na entrada**; o Túmulo aparece no mapa por 30 min.
| Quem chega ao Túmulo | O que acontece |
|---|---|
| **Dono** | recupera **100%** do que couber na capacidade; o resto **fica no Túmulo** (retirada parcial persistente) até o fim dos 30 min; o Túmulo fecha só quando esvazia |
| **Membro do grupo do dono no momento da derrota** | recupera 100% **em nome do dono** (vai para a carga de quem recolhe, ainda com a marca), pela mesma regra de capacidade — **exceto material quente**: quente recolhido por qualquer outro jogador (grupo incluído) segue a regra de terceiro |
| **Terceiro** | **saque**: precisa ter capacidade para a sua parte; leva 50% do conteúdo, a outra metade é destruída; **o primeiro saque fecha o Túmulo**; 1 saque a cada 8 min por jogador |
Nada some por falta de capacidade: sem capacidade, a operação simplesmente não acontece (ou é parcial, para dono e grupo).
- **Proteção do dono:** 15 s, **uma vez por Túmulo**; termina ao recolher, extrair ou fazer ação hostil. Aproximar e afastar não renova.
- **Retorno protegido:** morrer de novo em até 60 s na entrada, antes de atacar ou coletar, não gera nova perda.
- **Desconectar na Fronteira:** o personagem fica **30 s no mundo** depois do logout (vulnerável, como qualquer um); se morrer nesse tempo, as regras acima valem (o quente cai inteiro). Se sair inteiro, volta na **entrada** da Fronteira ao logar, com o material e as marcas (origem e quente, com o tempo do quente pausado).
- **Saque "quente":** além da marca de origem, o que foi saqueado fica **quente por 10 min**: não vai ao banco, ao mercado, a outro jogador nem a Túmulo de outra pessoa. Se o saqueador **morre** com material quente, o quente **cai inteiro** no Túmulo dele (não divide 50/50 — quem rouba arrisca tudo) e segue as regras acima; nunca fica preservado por omissão.
- **Rentabilidade do saque é hipótese a medir, não garantia:** sem Infâmia o saqueador recebe 0,5 × 0,5 = **25%** da carga da vítima; contra uma vítima com 40 min de coleta isso vale ~10 min de coleta. Caçar na Fronteira é um perfil assumido; o protótipo mede se ele rende mais que coletar e ajusta (destruição do saque, pureza, peso ×1,5).

### AL.3 Infâmia (atribuição, escopo e tabela única)
- O servidor registra, por **30 s**, todo dano, controle e assistência **hostil** entre jogadores (dano de duelo e Arena **nunca** entra).
- **Agressor inicial** = quem causou o primeiro dano/controle hostil sem ter recebido nenhum daquela pessoa (ou de seu grupo) nos últimos 60 s.
- **Ganha Infâmia** o agressor inicial (e quem contribuiu com ele no registro) quando a vítima, no momento do primeiro ataque: (a) estava em combate com monstro **há ≥ 3 s e antes do início do confronto**; (b) estava **caída por outra causa** antes da sua participação; ou (c) tinha nível **efetivo** mais de 10 abaixo. Monstro atraído **depois** do início do confronto não torna o adversário infrator.
- **Escopo: por conta** (alternar personagens não limpa nada).
| Infâmia | Efeito |
|---|---|
| 0 | normal |
| 1–2 | perde **100%** da carga arriscada na derrota; aparece no mapa da Fronteira para quem está a 50 m; Selo não funciona |
| 3+ | tudo de 1–2 + aparece no mapa inteiro + **sem banco 30 min** + **contratos e Postos bloqueados** até voltar a 0 |
- Ganho: **+1** por infração comum; **+3** por ataque a jogador sob proteção válida (entrada, retorno, túmulo próprio).
- Some **1 ponto por hora jogada fora da Fronteira** (não por hora offline).

### AL.4 Canais e contas
- Troca de canal: bloqueada **5 min** após combate PvP.
- Nós, Fendas e pureza pessoal da Fronteira são por **conta** (mudar de canal não multiplica recurso).
- Personagens da mesma conta não saqueiam os túmulos uns dos outros.

### AL.5 Postos
- 3 por Fronteira, **globais** (valem em todos os canais da Fronteira). A **contestação** acontece numa **instância própria** de até **24 por lado** (defensores: guilda dona + aliança; atacantes: a guilda que declarou + aliança; terceiros não entram), aberta na janela anunciada — ninguém vence lotando um canal.
- Captura: 5 min no ponto + 3 ondas de defesa de NPC; **contestação** a cada 48 h (janela de 1 h anunciada 24 h antes); **recaptura** pela mesma regra.
- Benefício: +**15%** de velocidade de coleta para a guilda ao redor do Posto e estandarte; **não fecha nós** (todos coletam), não gera ouro, não dá poder.
- **No máx. 1 Posto por guilda por Fronteira**; alianças não somam Postos.

### AL.6 Exploits fechados (Grok + ChatGPT)
| Exploit | Fechado por |
|---|---|
| Camping de Túmulo | renascer na entrada, 15 s de proteção, retorno protegido, 1 saque/8 min |
| Seguro universal (Selo) | Selo não funciona na Fronteira; cobertura limitada fora dela |
| Personagem "caminhão" | capacidade máxima = confortável + 20; pureza ≥ 85 pesa ×1,5; não larga material em combate; capacidade recalculada antes de entrar |
| Entrega por Túmulo | só o grupo **do momento da derrota** recolhe; capacidade de quem recolhe; saque destrói 50% |
| Bandido sem patrimônio | Infâmia bloqueia contratos e Postos; sem banco |
| Lavagem por cúmplice ou por transformação | saque "quente" 10 min + marca de origem que passa por toda transformação e não expira |
| Indução de Infâmia | agressor inicial + tempo do combate com monstro |
| Morte pelo último golpe | registro de 30 s define derrota PvP |
| Duelo como proteção de XP | dano consensual fora da atribuição |
| Proteção de Túmulo renovável | 1 vez por Túmulo |
| Empurrões curtos em cadeia | todo deslocamento forçado entra na categoria de controle (AT) |
| Compressão de carga por receitas | saída pesa ≥ entrada; marca de origem pelo peso de origem |
| Infâmia alternando personagens | Infâmia por conta |
| Lotação do canal do Posto | contestação em instância própria (AL.5) |
| Controle dos 3 portões (contramedida, medir) | portão móvel, agressor sem portão por 60 s, defensor extrai após 10 s sem ação hostil, interrupção só por dano ≥ 5%/controle, −30% de dano perto do portão |
| Duelo iniciado durante PvP | duelo não pode começar com hostilidade nos últimos 30 s; dano de terceiro hostil cancela o duelo na hora (as regras normais voltam) |
| Reconhecimento com proteção de entrada | sem coletar/interagir; reentrada em < 5 min não renova |
| Troca de canal | 5 min; recursos por conta |
| Contas em todos os canais | Postos globais, 1 por guilda |
| Ferida + Selo | Selo não ativa com 2+ Feridas; recarga 30 min |
| IP como critério | só sinal para investigação |

---

## AM. Técnicas avançadas (domínio 60–100)
**Catálogo completo: 66** — as 3 abaixo (marcos 60, 70, 80) + as 3 de **BD** (marcos 90, 100 e **Desafio de rota**). Variações de técnica não fazem parte desta versão.
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
- **Resolução válida** = todos os inimigos hostis do encontro abatidos (ou o objetivo do encontro cumprido). Só ela devolve **25% da reserva**; encontro encerrado porque o inimigo desistiu e voltou **não devolve nada** (fecha "puxar e soltar"). Reserva inteira só em **ponto de descanso** (8 s parado, sem hostilidade). Poções e óleo voltam a contar do zero quando o encontro termina, de qualquer jeito.
- **Efeitos "de início de encontro"** (Anel do Primeiro Passo, comida da primeira esquiva): **recarga interna de 30 s** — encerrar e reabrir encontros não repete o bônus.

### AN.2 Chefe (tentativa)
- Uma **tentativa** tem identificador próprio que cobre chefe, âncoras, adds e todos os jogadores presentes no início.
- **Fim:** vitória, derrota coletiva ou **reset integral** (todos fora da sala 10 s). Reset restaura **tudo dos dois lados** (chefe, âncoras, reserva, poções, reanimações) — nunca só um lado.
- **Durante a tentativa só entra quem já estava registrado nela** (reconexão), com a reserva e os contadores que tinha. **Substituto novo só entra entre tentativas** (depois de reset ou derrota); formação e composição mudam só aí. Assim nenhuma identidade nova traz reserva para dentro da tentativa ✔.
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
| Investida (25 m em linha) | 320 | 1,3 s | 60 | a cada 20 s | sair da linha; **colide com pilar de Terra ou âncora** → exausto 6 s |
| Chuva de pedras (5 círculos de 3 m) | 180 | 1,5 s | 0 | a cada 25 s | sair dos círculos; deixa terreno lento 6 s |
| Grito (raio 10 m) | 0 | 1,2 s | 0 | fase 2, a cada 30 s | interromper (Ruptura) ou recebe +20% dano por 10 s |
- **Fases:** 100–60% normal · 60–25% Grito + as âncoras ativas recuperam 1 intervenção se ninguém estiver a 6 m delas por 20 s · 25–0% fúria (frequências −20%) — a fúria **só** começa com as 3 âncoras desativadas; se o HP chegar a 25% antes, o chefe fica em 25% (invulnerável) até a última âncora cair (vitória = HP zerado **e** âncoras desativadas).
- **Âncoras:** cada uma tem **4 intervenções** e **3 rotas** (cada rota resolve no máx. 2 das 4; ≥ 2 independem de elemento):
| Âncora | Rota A | Rota B | Rota C |
|---|---|---|---|
| 1 (força) | **Operação manual:** canalizar 4 s parado; dano interrompe e conserva 50% por 8 s | **Impacto:** 300 de impacto acumulado em 10 s (FOR/Ímpeto) | **Colisão:** induzir a investida do chefe contra ela (mobilidade + leitura) |
| 2 (luz) | Operação manual | **Precisão:** acertar 3 cristais (ponto fraco) em 6 s (PER, arco) | **Elemento:** 2 elementos diferentes em 5 s (qualquer par) |
| 3 (cobertura) | Operação manual | **Proteção:** durante uma operação de 4 s, o operador recebe **≥ 2 s de proteção efetiva** de aliado (Cobertura 2 s, Muralha, Juramento, Fortaleza, Barreira do grupo) | **Controle:** interromper 2 conjurações dos **2 elementais de guarda próprios da âncora 3** (presentes desde o início, voltam 40 s depois de mortos) |
- **Adds:** a cada âncora desativada, 2 constructos comuns (1.100 HP) + 1 elemental (800 HP).
- **Leitura do grupo (4 padrões):** contra bloqueio → quebra-guarda (flanco aberto 1,2 s) · contra esquiva → golpes atrasados (o último sempre tem janela de parry ampla) · contra distância → puxão (3 s em que ele fica Exposto) · contra interrupção → conjuração dupla (a 2ª é falsa e abre 4 s de postura vulnerável).
- **Tempo-alvo:** 6–10 min (287 s de dano + âncoras + adds + reposicionamento; estimativa em AI.6 ≈ 5,8 min sem erros).
- **Reset:** todos fora da sala 10 s, ou derrota coletiva.
- **Cotas de rota:** cada rota resolve no máx. 2 intervenções por âncora; **quando a âncora recupera 1 intervenção** (fase 2), a cota da rota usada na intervenção perdida **é devolvida** — uma regressão nunca torna a âncora impossível.
- **Disponibilidade das rotas:** todas as rotas das 3 âncoras existem desde o início (a rota de Controle usa os guardas próprios da âncora 3; os adds das outras âncoras são extras, não requisito). Matar os guardas antes: eles voltam em 40 s.
- **Impacto da rota de Impacto:** 300 de impacto em 10 s, somando qualquer número de jogadores (ex. suficiente: 2 jogadores de machado grande, cada um com 2 pesados (40 × 1,2 = 48) e 1 Golpe de Ímpeto com 60 de Ímpeto (40 × 1,2 × 1,6 ≈ 77) → 2 × 173 = 346 em ~8 s; ex. parcial: 6 pesados de espada longa ≈ 190 + 1 bomba 50 = 240, não basta sozinho).

### AO.1b Versões por tamanho de grupo (instância)
| Jogadores | Vida | Âncoras | Mudanças de mecânica |
|---|---|---|---|
| **1–2** | 120.000 × n/6 | 2 (âncoras 1 e 2) | rotas **sem aliado**: Proteção vira "operar entre 2 ataques do chefe, sem ser atingido"; objetivos **sequenciais** (a fase 2 não recupera intervenções); sem Grito; adds pela regra de 4 pontos por jogador |
| **3–6** | 120.000 × n/6 | 3 | versão cooperativa (AO.1); com 3–4, a fase 2 recupera intervenção só após 30 s longe (em vez de 20 s) |
Tempo de dano igual para qualquer n (~287 s) ✔.

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
- Desconexão: vaga reservada 3 min (reconexão com a reserva e os contadores que tinha); substituto novo só entre tentativas (AN.2).
- **Simultaneidade obrigatória (Assalto):** a **última intervenção** das âncoras de todas as alas precisa acontecer dentro de uma **janela de 10 s** (o painel mostra a contagem quando a primeira ala termina); se uma ala não fecha a tempo, todas as âncoras finais recuperam 1 intervenção. Cada ala tem uma **operação de 3 s** final no seu setor.
- Participação para recompensa: AW (regra única, média > 0).

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
| **Tempo** | 1ª vez: campo 2 h + labirinto 1 h + chefe 15 min = 3 h 15 min de atividade, **+ 15–75 min** de cidade, deslocamento e tentativas extras ≈ 3,5–4,5 h no total; repetido: 1–1,5 h |
| **Depois de conhecido** | 1 trecho do labirinto muda por semana; Migração traz uma família de fora; contratos rotativos; Ecos invertidos do chefe (tipo **Duplo** na mesma sala — Perseguição exige labirinto, então não serve para Eco nesta sala) |

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
- **Da receita ao item (grau, peso e propriedades):** cada componente pega a **média ponderada** (pela quantidade) das 4 propriedades dos materiais usados. O componente tem uma **propriedade principal** (Núcleo: Densidade; Estrutura: Flexibilidade; Condutor: Condutividade; Mecanismo: Dureza; Base de armadura: Dureza; Forro: Condutividade; Reforço: Densidade). **Grau = 100% + 20% × (propriedade principal média / 100)**, arredondado para baixo em 1% → material de pureza 50 dá grau 110%, pureza 100 dá 120%. O item final tem o **menor grau** entre seus componentes principais (Núcleo e Estrutura; Base e Reforço). Peso do item = soma dos pesos dos componentes. Efeitos de propriedade do núcleo F.2 aplicam sobre a média.
- **Identificadores contábeis:** a taxa da estação em **consumíveis** é a linha "taxa de produção" (60/h); a taxa em **arma, armadura e joia** é a linha "serviços" (150/h). Cada cobrança tem um só identificador.
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
- **Categoria única "incapacitante"** (Atordoado, Derrubado, Preso, Silêncio, agarrão e **todo deslocamento forçado contra jogador, de qualquer distância — cada um conta como 1 aplicação inteira**): 1ª aplicação = duração normal **com teto de 1,5 s**; 2ª dentro de 8 s = 50%; 3ª = imune; ao fim de uma cadeia, **2 s de imunidade** à categoria ✔ (pior caso de uma equipe coordenada: 1,5 + 0,75 = **2,25 s** em 8 s; v5 permitia 5,2 s).
- **Lento** tem orçamento separado (máx. −40%, sem cadeia).
- Periódicos e Ferida não entram na categoria.
- Postura no PvP: quebra = atordoado **1,0 s** (não 2 s) e dano ×1,15.

---

## AU. Nova Era (transição)
1. Vencer o andar 100 **habilita** a Nova Era; a transição acontece **7 dias depois** (aviso global), e a Era precisa ter durado **no mínimo 12 semanas** (se não, espera completar).
2. **Migração (manutenção de 2 h):** **todo** personagem é validado — online, offline, em instância, em qualquer andar: quem está num lugar que não existe/está fechado na nova Era vai para a **cidade do andar aberto mais alto** (no começo, a do andar 1), sem perda; instâncias em andamento são encerradas com recompensa de participação parcial; Túmulos **de PvE** são devolvidos ao dono; Túmulos e cargas **com marca de origem ou quente** vão para **custódia** na entrada da Fronteira da camada na nova Era, com as marcas preservadas — o dono só libera entrando e **extraindo** por um portão (a manutenção nunca é uma extração gratuita); personagens offline são processados ao logar; **progresso pessoal histórico** fica registrado; na nova Era, o acesso pessoal (Y.2) recomeça pela regra normal, mas **Ventos de retorno** valem para andares que você já venceu na Era anterior (+50% XP, 1 tentativa de Assalto a mais por semana).
3. Materiais e equipamentos continuam; estações e cidades acima do andar aberto ficam inacessíveis até reabrir.
4. **Singulares** seguem o calendário próprio (núcleo C.4).
5. Recompensas únicas de abertura têm identificador **por Era e por conta** (não repetem infinitamente).
5b. **Renda:** contratos rotativos (núcleo E.6) pagam pelo **maior patamar alcançado na Era vigente** (mínimo camada 1), não pelo histórico — a renda acompanha o mundo aberto. Veteranos sobem rápido de novo pelos Ventos de retorno.
5c. Jogadores do 80+ da Era anterior: título "Veterano da Era N"; entram nos Assaltos de abertura sincronizados, sem vantagem numérica. Contratos acumulados e estações básicas (todas as cidades) continuam — nada trava profissões.
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
- **Recompensa por participação:** conta quem fez ≥ 10% da média do grupo em **qualquer** dimensão (dano, objetivo, cura movida, dano interceptado/mitigado) **com média > 0 e contribuição própria > 0** naquela dimensão (zero nunca qualifica); quem passou > 60% do encontro caído ou parado não conta. No Assalto, o mínimo é **2% do total** da dimensão (em vez de 10% da média, que com 24 seria só 0,42%).
- **Guildas:** cargos com permissões (banco: retirar até X por dia por cargo), **sucessão** automática ao cargo mais alto ativo após 30 dias de inatividade do líder, registro de banco; saída de membro com retirada de banco suspensa por 48 h após entrar.
- **Social e moderação:** amigos, bloqueio (bloqueado não vê seus pedidos nem entra no seu grupo), denúncia com replay do servidor, chat de grupo/guilda/aliança/canal, filtro configurável; trocas contestadas: reversão só por fraude comprovada.
- **Acessibilidade:** remapeamento total; todo aviso tem **forma + som**, não só cor; indicador de área opcional; opções de câmera (distância, tremor); modo de mira assistida para o arco **sem** aumentar janela de nada.
- **Chegada tardia:** andares mais de 10 abaixo da frente: **rota acelerada** (o labirinto abre a rota direta já mapeada; objetivo do andar reduzido) → **30–45 min por andar**; chefe de 6 com **escala 1–6** para baixa população: vida × **n/6** (mínimo 1/6), postura × (0,4 + 0,6·n/6), número de objetivos pela **ficha do chefe** (Âncoras: AO.1b; demais tipos: com 1–2 jogadores, −1 parte/onda/sala de encurralar e objetivos sequenciais), adds pelo diretor (4 pontos por jogador) → tempo de dano igual ao de 6 (~287 s) para qualquer n ✔; +50% XP (Ventos de retorno).
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

## AZ. Os outros 5 chefes-piloto (camada 1, versão de 6; Assalto pela regra de AO.2)
Formato dos ataques: dano / aviso / impacto / frequência — resposta.

### AZ.1 Partes quebráveis (andar 5)
- Vida 110.000 · Postura 1.200 · Armadura 60·s. Corpo quadrúpede de 8 m; 4 partes: **2 patas dianteiras** (6.000 cada, ×1,0), **cauda** (6.000, só atingível por trás ou de longe), **couraça das costas** (6.000, ×0,7, ponto fraco exposto só quando ele empina).
- Ataques: Pisão (frente 4 m) 320 / 1,2 s / 45 / 10 s — esquiva lateral · Cauda (arco traseiro 180°, 6 m) 260 / 0,9 s / 50 / 12 s, **some com a cauda quebrada** · Empinar + queda (área 6 m) 300 / 1,5 s / 60 / 25 s — expõe a couraça 3 s antes de cair · Sopro de poeira (cone 10 m, Lento + visão 8 m) 120 / 1,0 s / 0 / 20 s.
- Quebrar: pata → derrubado 8 s (abertura); 2 patas → nunca mais empina (perde o Empinar, ganha Rastejar: linha 15 m, 280); cauda → sem ataque traseiro; couraça → +25% de dano em todo o corpo até o fim.
- **Vitória** = vida zerada; **trava**: abaixo de 30% ele fica em 30% até **3 das 4** partes quebradas.
- Leitura (4 padrões): contra corpo a corpo na frente → pisão duplo (a 2ª abre 1,5 s a pata) · contra distância → corre até o arqueiro (para 2 s ofegante ao chegar) · contra bloqueio → arremete (perde 200 de postura se bloqueado por Muralha) · contra flanco → giro (o giro deixa a couraça visível 1 s).
- Tempo-alvo 6–10 min.

### AZ.2 Arena que muda (andar 7)
- Vida 115.000 · Postura 900. Sala de 36 m em 9 placas (3×3).
- Fases: a 75% caem **2 placas**, a 50% mais **2**, a 25% mais **1** (anunciadas 8 s antes, piscam e fazem som) → sempre restam **4 placas** e a **placa central nunca cai**; as que caem são escolhidas de modo que as restantes continuem ligadas ao centro. Quem está numa placa que cai volta ao centro com **20% de dano** (não morre). Entre fases, 5 s de abertura (chefe exausto).
- Ataques: Corte em cruz (2 linhas de 3 m em X) 280 / 0,9 s / 35 / 8 s · Salto para a placa mais cheia 300 / 1,3 s / 50 / 18 s (pune o grupo amontoado) · Ondas de choque (anéis que se expandem, pular no momento) 160 / 0,7 s / 20 / 15 s · Rachadura (marca 1 placa que não é a central: quem fica nela 4 s cai e volta ao centro com 20% de dano; a placa **não** some) — / 2 s / — / fase 3.
- Mecânica: a ordem das placas que caem é escolhida pela **posição do grupo** (as placas com mais tempo ocupado caem primeiro) → o grupo decide o terreno final.
- Leitura: contra amontoado → salto duplo · contra espalhados → corrente que liga 2 jogadores (devem se aproximar em 3 s) · contra distância → puxa todos ao centro · contra bloqueio → quebra-guarda (abertura 1,2 s nas costas).

### AZ.3 Duplo (andar 3)
- Dois chefes: **Martelo** (60.000, lento, área) e **Lâmina** (60.000, rápido, investidas).
- Regra: a < 8 m um do outro, cada um cura 1%/s; a > 15 m, os dois recebem +20% de dano. Precisam cair com **≤ 20 s** de diferença; se um cair antes, o outro **revive o parceiro com 30%** após 20 s.
- Martelo: Esmagar 320 / 1,2 s / 50 / 10 s · Tremor (área 8 m) 200 / 1,5 s / 30 / 18 s · Chamado (puxa a Lâmina para perto) — / 2 s / — / 30 s, **interrompível** (Ruptura).
- Lâmina: Estocada (linha 10 m) 250 / 0,9 s / 30 / 7 s · Dança (3 cortes) 3×100 / 0,7 s / 10 cada / 14 s · Marca (persegue 1 jogador 6 s) — / — / — / 20 s.
- Divisão esperada: 2 jogadores seguram o Martelo longe, 4 na Lâmina (ou o inverso); o Chamado é a mecânica de grupo.
- Leitura: contra separação bem feita → os dois correm um para o outro (2 s em que ficam Expostos) · contra bloqueio → Lâmina finta · contra distância → Martelo arremessa pedras · contra interrupção → Chamado falso (o verdadeiro vem 3 s depois).

### AZ.4 Perseguição (andar 6)
- Vida 90.000 · Postura 1.000. Começa no centro do labirinto; a cada **30% de vida perdida** ele foge para uma das 3 salas-esconderijo, numa **permutação sem repetição** (as 3 salas, cada uma uma vez, ordem sorteada na tentativa). **Trava por limiar:** ele não perde vida abaixo do próximo limiar (70% / 40% / 10%) enquanto não for encurralado na sala atual.
- Encurralar: o grupo fecha as **2 saídas** da sala (alavanca de 3 s cada, ou pilar de Terra na porta, ou 2 jogadores parados na porta) → encurralado 10 s (abertura, +30% de dano).
- Se não for encurralado em 45 s, ele **recupera 5%** e foge de novo.
- Ataques: Rasteira em corrida 300 / 1,0 s / 40 / 10 s · Bomba de fumaça (some 3 s, reaparece atrás de quem mais causou dano) — / 1,2 s / — / 20 s · Armadilhas deixadas na fuga (Preso 2 s).
- Vitória: vida zerada; pela trava, só é possível depois de encurralado nas **3 salas** (cada uma uma vez).

### AZ.5 Cerco (andar 8)
- Vida 100.000 · Postura 1.000. O grupo protege o **Núcleo** (vida 20.000·s, não regenera sozinho). O Núcleo tem **reserva de cura própria de 5.000·s por tentativa**: Água pode **transferir** reserva de jogadores para ela (até 200·s por uso); Flecha de cura e técnicas [Su] convertem essa reserva em vida do Núcleo com **metade** da eficiência. Nenhuma cura gratuita.
- 4 ondas, a cada 90 s: onda = 2 constructos + 1 elemental + 3 insetos (pelo diretor de encontros, 4 pontos por jogador); o chefe ataca o Núcleo a cada 20 s com Lança (2.000 no Núcleo; interceptável por Cobertura/Muralha/parry: **parry na Lança anula o dano**).
- Entre ondas, 6 s de abertura (chefe exausto).
- Derrota: Núcleo a 0 → tentativa perdida.
- Vitória: vida zerada depois da onda 4 (antes disso ele não cai abaixo de 20%).

### AZ.6 Assalto: como os 6 tipos viram 12–24
| Tipo | O que a ala faz |
|---|---|
| Âncoras | cada ala segura 1–2 âncoras |
| Partes | cada ala uma parte; quebras precisam ocorrer com ≤ 15 s de diferença entre alas para o derrubar longo (12 s) |
| Arena | cada ala ocupa um quadrante; placas caem por quadrante |
| Duplo → Quádruplo | 4 chefes em 2 pares: no Assalto de **12 (2 alas)** cada ala segura **um par**; no de 18–24 (3–4 alas), cada ala segura um chefe e os pares ficam em alas vizinhas |
| Perseguição | as alas fecham as saídas em salas diferentes ao mesmo tempo |
| Cerco | 2–4 Núcleos, um por ala |

## BA. Comunicação e interface do Assalto
- **Conselho do Assalto** define até 4 alas; cada ala tem **1 líder de ala** (escolhido pelo Conselho ou o 1º a aceitar).
- Líder de ala: **3 marcadores** de mapa (atacar / defender / reunir) visíveis só para a ala; o Conselho tem 3 marcadores globais.
- **Painel do Assalto** (todos veem): vida do chefe, estado de cada âncora/parte/Núcleo por ala, reanimações restantes por ala, próxima mecânica anunciada (ícone + som 5 s antes), adaptação por ala.
- **Pings rápidos** com voz sintetizada opcional ("âncora 2 precisa de ajuda").
- Sem voz obrigatória: toda mecânica de Assalto tem **aviso no mundo** (forma + som) e no painel.
- Reanimação: além do teto do Assalto, **teto por ala = 6** (uma ala não gasta as de todos).
- Chamado de Resgate: 1 por tentativa por jogador e no máx. **2 usos por ala em qualquer janela móvel de 60 s** (sem cascata); os tetos (jogador, ala, Assalto) são conferidos **antes** de consumir o item — se algum teto bloqueia, o item não é gasto.
- **Ala sem líder** (saiu, caiu por > 30 s ou desconectou): o **Conselho herda** os marcadores da ala até alguém aceitar.
- **Ala em falência:** se uma ala fica com **≤ 2 jogadores em pé por 10 s**, o objetivo dela **congela** (não regride nem avança), o chefe **não usa ataques locais** naquela ala por **20 s** e o painel avisa todas as alas; o Conselho pode mandar jogadores de outra ala (a leitura da ala que recebe não muda). A janela simultânea de 10 s espera a ala em falência se recompor (até 60 s; depois disso, a ala conta como "não fechou").
- **Sucesso parcial:** se a tentativa falha mas **≥ 2 alas** completaram seus objetivos, a próxima tentativa (até 30 min depois, mesma composição ± 3 trocas entre tentativas) começa com as âncoras/partes/Núcleos daquelas alas **com 1 intervenção a menos**, e todos recebem recompensa de participação reduzida (material, sem marca de abertura).

## BB. Andar-piloto 2 — andar 5 (campo aberto + partes)
| Parte | Conteúdo |
|---|---|
| Bioma | **Tempestade**: a cada 40 s um raio cai em quem está em lugar alto (>3 m) — 300 de dano, aviso 1,5 s; pedras de cobre (nós) atraem raios (dá para usar contra inimigos) |
| Famílias | Feras, Aviários (nova), Dracônicos, Plantas; variante: aviários que só descem durante a chuva |
| Campo | 3 zonas abertas (Planalto, Vale, Cânion) — a maior parte do andar é aberta; 2 chefes de campo (dracônico, colosso jovem 9.000) |
| Objetivo do andar | **Controle territorial**: 3 torres de pedra em zonas diferentes ativas ao mesmo tempo por 5 min (um grupo de 6 não dá conta: incentiva 2–3 grupos se coordenarem no campo aberto). **Rota tardia e baixa população** (AW): cada torre conquistada **fica ativa 10 min**, então um grupo só completa as três em sequência |
| Labirinto | curto (1 rota principal + 2 desvios), porque o andar é de campo |
| Chefe | Partes quebráveis (AZ.1) |
| Contratos do andar | Caça de aviários no ar (arco/derrubar no mergulho), Coleta de cobre em lugar alto (risco de raio), Entrega pelo cânion |
| Tempo | 1ª vez ≈ 4–5 h; repetido 1,5 h |

## BC. Matriz da camada 1 preenchida (exemplo concreto de AX)
| Andar | Bioma | Objetivo | Chefe |
|---|---|---|---|
| 1 | (nenhum — tutorial) | Reconhecimento | Âncoras simples |
| 2 | Escuridão | Reconhecimento | Âncoras (AO) |
| 3 | Maré | Travessia | Duplo |
| 4 | Frio | Resgate | Partes quebráveis (variante gelo) |
| 5 | Tempestade | Controle territorial | Partes quebráveis |
| 6 | Neblina | Expedição logística | Perseguição |
| 7 | Escuridão | Resgate | Arena que muda |
| 8 | Frio | Controle territorial | Cerco |
| 9 | Baixa gravidade | Perseguição | Cerco (variante: Núcleo flutuante que se move) |
| 10 | Tempestade | Travessia | Duplo (fim de camada, Fronteira da camada fica no andar 10) |
Conferida contra as regras de AX no `check_v8.py` ✔ (cada chefe 1–2 vezes, cada bioma 1–2 vezes, compatibilidades respeitadas, objetivo Perseguição nunca no andar do chefe Perseguição).

## BD. As outras 33 avançadas (completa as 66)
Liberadas nos marcos 90 e 100 (e a 6ª pelo **Desafio de rota**: completar 50 encontros válidos usando as 3 primeiras avançadas — nome diferente da Maestria pós-100, que é só cosmética). Formato igual a AM.
- **Desarmado:** Tornado de punhos 0,3×6/36 total · 1,3/14 · 25 — gira puxando comuns 1,5 m [Ru] · Palma que sela 0,8/35 · 0,8/16 · 18 en — sela mortos-vivos e silencia elementais 2 s [Co] · Arremesso do gigante 1,2/60 · 1,6/20 · 30 — agarra elite com postura < 20% e arremessa contra outro inimigo (dano nos dois) [Ru]
- **Espada curta:** Lâminas gêmeas 0,5×2/15 · 0,7/8 · 12 — 2º corte só se o 1º foi no flanco [Ex] · Fuga das sombras 0/0 · 0,4/16 · 10 — salta 5 m para trás e deixa o alvo com ameaça zerada para você 3 s [Su] · Corte dos tendões 0,7/20 · 0,8/14 · 18 — alvo Lento 40% 4 s e não corre [Co]
- **Espada longa:** Postura da montanha 0/0 · 3 s/22 · 0 — guarda alta parada: Muralha frontal 90° (−20%) para quem está atrás [Su] · Corte em meia-lua 1,3/30 · 1,1/10 · 20 — 180°, guarda baixa [Ex] · Juízo 2,2/40 · carga 1,5 s/20 · 30 — só contra alvo Exposto ou atordoado [Ex]
- **Duas espadas:** Espelho de aço 0/0 · postura 0,5/14 · 15 — devolve projétil com cada lâmina (2 projéteis) [Co] · Chuva de cortes 0,25×12/30 total · 2,4/20 · 35 — exige Ritmo ≥ 3 [Ex] · Passo cruzado 0,6×2/15 · 0,7/9 · 15 — atravessa o alvo cortando dos dois lados [Ex]
- **Espada e escudo:** Escudo arremessado 0,6/35 · 0,9/14 · 18 — ricocheteia em 3 alvos, volta em 1,5 s (sem bloqueio até voltar) [Ru] · Barreira do grupo 0/0 · 1,0/40 · 20 — aliados a 5 m ganham 60 de postura 5 s (não acumula com Terra: vale a maior) [Su] · Contra-escudo 1,0/40 · postura 0,4/12 · 15 — bloqueio perfeito (últimos 0,15 s) devolve 100% do impacto [Co]
- **Katana:** Corte da lua cheia 1,8/35 · 1,4/16 · 28 — 360° a partir do saque carregado [Ex] · Passo do vento 0,8/10 · 0,5/8 · 15 — 3 cargas: avança 4 m cortando [Ex] · Bainha de ferro 0/0 · 4 s/25 · 0 — carregando o saque, toma 30% menos dano [Su]
- **Duas katanas:** Reflexo duplo 0/0 · postura 0,3/12 · 15 — parry que contra-ataca 2 alvos [Co] · Tempestade de pétalas 0,3×8/24 total · 1,6/16 · 25 — área 3 m, cada parry da última 4 s reduz 1 s da recarga [Ex] · Fio do silêncio 0,9/25 · 0,7/14 · 18 en — silencia 2 s (conta na categoria PvP) [Co]
- **Machado grande:** Avalanche 1,6/55 · 1,8/16 · 30 — avança 6 m derrubando comuns [Ru] · Força da terra 0/0 · 1,0/30 · 0 — próximo pesado vira carga nível 3 instantânea [Ex] · Muro de ferro 0/0 · 2 s/20 · 15 — machado plantado: bloqueio 360° (custo ×1,3) [Su]
- **Machado pequeno:** Machado bumerangue 0,8/20 · 1,0/12 · 15 — vai e volta acertando 2× (exceção na ficha) [Ex] · Âncora do caçador 0/30 · 0,8/16 · 18 — prende o alvo marcado ao chão 2 s [Co] · Golpe da marca 1,6/30 · 0,9/12 · 20 — consome a marca: ×1,5 [Ex]
- **Dois machados:** Tormenta 0,35×8/30 total · 1,8/18 · 30 — anda girando 4 m [Ex] · Mordida dupla 0,9×2/25 · 0,9/12 · 18 — deixa Exposto 3 s se Frenesi ≥ 3 [Ru] · Sangue quente 0/0 · 0,5/30 · 0 — converte o Frenesi atual em vida (5% por nível, gasta reserva) [Su]
- **Arco:** Flecha do falcão 1,2/20 · 1,0/10 · 18 — teleguiada 20° [Ex] · Tiro de pinos 0,4/45 · 1,2/16 · 20 — prende Preso 1,5 s [Co] · Tiro em leque 0,6×5/25 total · 1,3/12 · 22 — cone 30° a 15 m [Ex]

---

## AY. O que está provado e o que não está
`sim/check_v8.py` (roda v4–v7 antes; os testes de sincronia do v7 ficaram como histórico — a função válida é a do v8). **Nome do teste = propriedade testada:**
| Teste | O que ele realmente confere |
|---|---|
| Perfil de referência | o custo do perfil (+20/+15/+10) cabe no orçamento do nível-teto da camada; DPS ≈ 70 |
| TTK (fase de dano) | vida ÷ DPS de cada linha de AI.2 dentro do tempo-alvo de **dano** (não executa âncoras, adds ou deslocamento) |
| Ataque do chefe | 18–25% da vida do tanque de referência (VIG +20) para todos os ataques principais de AI.3, AO e AZ |
| Quadro de unidades | parry/postura, poção/vida e custo de bloqueio iguais nas camadas 1 e 10 |
| Sincronia por custo (v8) | o caso 20/4/1 (38 → 35); especialista, generalista e híbrida (100 → 6, 100 → 20, 60 → 15, com builds de origem válidas); **3.000 builds aleatórias** com atributos de 1–5 e afinidade: custo ≤ orçamento, nenhum atributo acima do original, desvio < 1 do alvo, nenhum atributo existente zerado, nenhum ponto admissível sobrando |
| Curva única | o texto de AK não contém a fórmula antiga; perfil do andar 2 sincronizado **com** a afinidade do perfil |
| Orçamento de mecânicas (AI.6) | modelo de papel tempo = (vida/D + M)/n: parcela ≤ 40% e 6–10 min com +20% para os 6 chefes; regra de ajuste limitada a ±20% |
| Arena (AZ.2) | placas restantes 7 → 5 → 4 |
| Túmulo (v8) | retirada parcial do dono; terceiro sem capacidade não faz nada e nada some; cadeia vítima → saqueador → grupo do saqueador = 40 → 20 → 10 → 5 |
| Assalto | ala em falência (≤ 2 vivos por 10 s); sucesso parcial com ≥ 2 alas; autorressurreição do último não evita derrota |
| Arena | distribuição própria de 197 válida; nunca expande acima de 60 |
| Tentativa | reconexão não cria reserva; substituto só entre tentativas; "puxar e soltar" não recupera |
| Derrota | estados PvE / Fronteira / duelo / Arena × Infâmia 0/1/2/3 × Selo × protegido |
| Túmulo (v7) | dono 100%, grupo 100%, terceiro 25% líquido; saque fecha; quente cai inteiro |
| Marca de origem | sobrevive a 3 transformações e não expira com tempo |
| Controle PvP | sequência de controles de fontes diferentes, incluindo empurrões curtos, ≤ 2,25 s em 8 s (modelo abstrato: sem distância nem latência) |
| Participação | dimensão com média 0 nunca qualifica; mínimo de 2% no Assalto 24 |
| Matriz família × arma | **contagem** (≥ 3 fortes, ≥ 2 fracas, ≥ 2 respostas) — não verifica as justificativas |
| Matriz da camada 1 | as 10 linhas de BC respeitam as regras de AX |
| Flanco | conta **condicionada** à premissa de 40% do tempo de flanco (a frequência real é medida no protótipo) |
| Catálogos | **quantidade**: 54 modificadores, 50 receitas, 66 avançadas, 15 assinaturas — não a coerência dos efeitos |
| Domínio | horas até 50 e 100 pela taxa de 20 s |
**Não prova:** diversão, execução real das técnicas, rede, comportamento de jogadores, economia por agentes, rentabilidade de caçar na Fronteira, duração total dos chefes com mecânicas, Nova Era em servidor real. Isso é trabalho do protótipo (parte 2, AH).
**Testes cruzados obrigatórios no protótipo:** derrota × Selo × Infâmia × Túmulo · troca de arma × recargas × efeitos · cadeia de controle 3×3 · reset de tentativa × reconexão × Água · transição de Era com jogadores em todos os andares · **duração total dos 6 chefes** (se as mecânicas passarem de 40% do tempo, reduzir a vida — Grok).
