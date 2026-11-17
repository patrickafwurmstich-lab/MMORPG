# MMORPG — Núcleo de regras v7 (parte 1 de 3)

> **Parte 1 de 3.** Núcleo de regras (fórmulas). **Parte 2: `07-jogo-v7.md`** (o jogo concreto: armas, inimigos, andar, morte, equipamento, grupo, guildas, PvP, fim de jogo). **Parte 3: `07-contratos-v7.md`** (contratos entre sistemas, precedência, balanceamento de tempo de combate, chefe e andar-piloto completos, cadeia produtiva, catálogos).
> **Precedência:** se duas partes parecerem divergir, vale a **tabela de precedência da parte 3 (seção AH-P)**; depois parte 3 > parte 2 > parte 1 para regras específicas, e parte 1 para fórmulas gerais. Não existem valores antigos válidos neste conjunto: os documentos v1–v5 são histórico.
> Histórico: v4 aprovado só nas fórmulas; v5 trouxe o jogo concreto; a revisão 1 do loop 2 (ChatGPT e Grok: NÃO APROVADO) apontou contratos e interações que não fechavam → v6; a revisão 2 (ChatGPT: N1–N6; Grok: escala de conteúdo e Assalto) → v7.

## O que mudou do v6 para o v7 (núcleo)
| # | Problema (revisão 2 do loop 2) | Quem | Correção |
|---|---|---|---|
| 1 | Sincronia encolhia **pontos** na razão do **orçamento**, mas o custo não é linear | ChatGPT (N1) | fator λ pelo **custo** (parte 3, AK); Arena/Provação com distribuição própria |
| 2 | Referência de combate (nível ~30) impossível com teto = nível do andar | ChatGPT (N2) | **curva única de teto: nível-teto(f) = mín(100; f + 5)** (seção E.6) e **perfil de referência** por camada (A.7) |
| 3 | HP e dano escalavam, mas postura, impacto, resistência, poção e bombas não → defesa e ruptura mudavam de valor entre camadas | ChatGPT (N2) | **quadro de unidades** (A.7): vida, dano, cura e armadura × s; **postura e impacto não escalam**; bloqueio usa dano/s |
| 4 | Afinidade podia ter alvo 2 num atributo | ChatGPT | alvo_i = mín(1; 2 × parcela_i) |
| 5 | Reserva "enche após 15 s" × 25% por encontro | ChatGPT | D.6 remete ao contrato de encontro (só resolução válida recupera) |

## O que mudou do v5 para o v6 (núcleo)
| # | Problema (revisão 1 do loop 2) | Quem | Correção |
|---|---|---|---|
| 1 | Contrato tinha dois valores (19 por cento aqui, 17,5% na parte 2) | ChatGPT, Grok | **17,5% de R** (camada 1: 152,25) em todo o conjunto |
| 2 | Armadura escalava 1,09^(c−1) com denominador fixo 200 → mitigação crescia com a camada | ChatGPT | **M_armadura = 200·s/(200·s + A)**, s = 1,09^(c−1): a mesma classe de armadura mitiga igual em toda camada (A.1, A.5) |
| 3 | Teto de parry 180 ms × bônus de armas e técnicas | ChatGPT | janela **comum ≤ 180 ms**, janela **técnica ≤ 240 ms** depois de todos os bônus; duração da postura ≠ janela válida (D.1) |
| 4 | "Sem imunidade" × elementais imunes ao próprio elemento | ChatGPT | ninguém é imune: elementais têm **0,85** contra o próprio elemento (o mínimo da faixa) e não sofrem o efeito secundário dele (D.3) |
| 5 | Consumíveis de jogador contados como ralo de ouro de NPC | ChatGPT | linha de consumíveis dividida: **140 ouro/h reagentes de NPC + 60 taxas de produção destruídas**; o pagamento ao artesão é transferência (G.1, parte 3 AQ) |
| 6 | Leitor: denominador zero, Precisão comprada pela arma, PvP | ChatGPT | 0 oportunidades = **sem atualização**; bônus de arma nunca entra no Leitor; **PvP não gera Leitor, Artes, afinidade nem domínio** (C.2) |
| 7 | Orçamento das Artes só pela média | ChatGPT | além do índice ≤ 1,10: **nenhum q acima de 1,25** (C.3) |
| 8 | Afinidade sem dinâmica | ChatGPT | média móvel por encontro válido: converge ao novo estilo em **20–30 encontros** (B.1) |
| 9 | Reserva de cura sem ciclo | ChatGPT | reserva pertence ao **encontro** (contrato de encontro, parte 3 AN) |
| 10 | Singulares × Nova Era | ChatGPT | calendário da Singular é **independente** da Era (C.4) |
| 11 | Tempo de combate não definido | Grok | modelo de DPS efetivo e tempos-alvo por tipo de inimigo (parte 3 AI) |
| 12 | Sincronia sem regra detalhada | Grok | regra completa na parte 3 AK (E.6 aponta para ela) |

## O que mudou do v4 para o v5 (núcleo)
| # | Problema (auditoria do loop 2) | Correção |
|---|---|---|
| 1 | Convenção ambígua de r(x): com PER total 70 a janela dava 182,6 ms, não 180 | **x = pontos investidos (0–60), nunca o total**; janela de parry com teto explícito de 180 ms |
| 2 | HP_camada não definido | HP_camada(c) = 1.000 × 1,09^(c−1) |
| 3 | Custo de esquiva com "peso" sem unidade | custo = 20 × (1 + peso/40), peso em unidades de equipamento + material (parte 2, L.3) |
| 4 | Ímpeto por correr podia ser gerado correndo em círculo | corrida só gera Ímpeto se reduz a distância até um inimigo engajado ou leva a um objetivo contestado; o teto de 30 por arrancada reinicia após 2 s sem correr |
| 5 | Chefe adaptativo punia quem joga bem | toda adaptação abre uma oportunidade (ex.: flanco exposto 1,2 s) |
| 6 | Âncoras viravam molde de todo chefe | âncoras são 1 dos 6 tipos de chefe (parte 2, Q.3) |
| 7 | Aprovação anterior com escopo errado | cabeçalho corrigido: fórmulas aprovadas ≠ jogo completo |

---

## O que mudou do v3 para o v4

| # | Problema (rodada 3) | Quem | Correção no v4 |
|---|---|---|---|
| 1 | **Bloqueador:** ralos em % de R (870) não batiam com o script (ralos absolutos da base 1.000) | ChatGPT | **Duas bases**: B(c) para ralos, R(c) = 0,87·B(c) para torneiras; tabela em ouro/h; script verifica torneira = ralo no normal |
| 2 | D.2 aplicava Ímpeto sem gastar | ChatGPT | **Ímpeto_gasto** (ataques normais = 0) |
| 3 | "Soma de 4 medidas" das Artes misturava unidades | ChatGPT | Razões contra a técnica pública; **média ≤ 1,10**, vantagem em ≤ 2 medidas |
| 4 | Consistência de estilo sem fórmula | ChatGPT | **C = 100 × compatíveis/registrados**, até 12 encontros/dia, ≥ 12 em ≥ 3 dias |
| 5 | Controle podia passar de 1 | ChatGPT | Sucesso 0 ou 1 por oportunidade |
| 6 | Lançamento com 90% de protegidos (×1,33) | Grok | Enquanto **> 60%** das contas ativas forem protegidas, o protegido sofre **60%** do corte (pior caso ×1,22) |
| 7 | Golpe de Ímpeto pode gerar hesitação | Grok | **Gasto limpo**: Ímpeto ≥ 70 → impacto total +8% (orçamento de dano igual) |
| 8 | Script não cobria todas as combinações; golpes > 0 com Ímpeto 0 | ChatGPT | Verifica as 4.941 combinações + caso zero |
| 9 | Opcionais | Grok | 1 das 3 famílias da Provação pode ser "livre" nas primeiras temporadas; monitorar abandono de alts (contratos por conta) |

---

## O que mudou do v2 para o v3 (histórico)

| # | Problema apontado (rodada 2) | Quem | Correção no v3 |
|---|---|---|---|
| 1 | A proteção dos andares 1–3 estava só no texto; o script indexava todos os ralos; ×1,22 dependia de supor 10% de protegidos | ChatGPT | Simulação com **população protegida separada** (0/10/50/90%), torneiras e ralos protegidos separados, mercado zero |
| 2 | Proteção por local virava abrigo fiscal para veteranos | ChatGPT | Proteção ligada ao **progresso pessoal** (acaba na 1ª conclusão do andar 3); contratos e cota de NPC **por conta** |
| 3 | Novatos 100% protegidos tiram a força do controlador no lançamento | Claude (simulação) | Protegido sofre **metade** do corte e índice de ralos **0,9–1,1** |
| 4 | Índice coletivo de ralos cobrava do pobre a riqueza do rico | ChatGPT | Fator do índice limitado a **0,8–1,25** |
| 5 | Controlador acomodado em u = +0,14 no normal | Grok, ChatGPT | **Renda nominal calibrada para 870/h** na camada 1 → u = 0 no normal |
| 6 | Mais DES podia piorar as continuações (+1 ponto = +50% de tempo) | ChatGPT | **Tempo e impacto totais fixos pelo Ímpeto**, divididos entre os golpes; gastar Ímpeto é **escolha** do jogador |
| 7 | Pontuação de Domínio incalculável / favorece hardcore | ChatGPT, Grok | **Provação**: 12 demonstrações (3 famílias × 4), 3 tentativas na janela, nota 50/30/20 + 30% de consistência de estilo em 14 dias |
| 8 | Leitor sem 8 medidas normalizadas; anti-macro rejeitava combos legítimos | ChatGPT | Controle por oportunidades; vetor mágico = 3 componentes; "sequência repetida" vira só **sinal**, não descarte |
| 9 | Faltavam regras básicas para simular combate | ChatGPT | Regeneração de resistência, dano que atravessa bloqueio, custo do parry falho |
| 10 | Fichas das Artes não publicadas | ChatGPT | **Fichas completas** das 5 Artes (custo, recarga, restrições) |
| 11 | Mentoria multiplicava cargas de respec | ChatGPT | Teto **0,5 carga/dia por mentor** (por conta) |
| 12 | Leitura do chefe: papéis não definidos | ChatGPT | Papel = etiqueta majoritária das 6 técnicas equipadas |
| 13 | Rede sem critério contra fraude | ChatGPT | Falsas aceitações de parry adulterado **< 1%** como critério de aceite |
| 14 | Build DES/Vento sem prova | Grok | Teste obrigatório contra 4 arquétipos + plano de corte se passar de 12–15% |
| 15 | Opcionais | Grok, ChatGPT | Troca só de modificadores = 0,4 carga; Mapas = conveniência de curto prazo; coleta testada em rotas de 10/30/60 nós |

---

## O que mudou do v1 para o v2 (histórico)

| # | Problema apontado | Quem | Correção no v2 |
|---|---|---|---|
| 1 | **Simulação econômica errada** (cortava 100% da torneira; o texto só cortava 70%) | ChatGPT | Simulação refeita; controlador passa a cobrir todas as torneiras (exceto andares 1–3) + 45% dos ralos indexados à riqueza média |
| 2 | Corte de contratos de até 35% estrangula o novato | Grok, Gemini | Corte máximo **25%**; andares 1–3 **protegidos** |
| 3 | Afinidade favorecia especialista 3× | todos | Economia por atributo limitada: **m × mín(15; 25% do custo)** → especialista 30, generalista 26 |
| 4 | Ímpeto sem orçamento (3 continuações > golpe pesado) | ChatGPT, Grok | Dano total das continuações fechado por fórmula; continuação não gera Ímpeto nem encadeia; +0,18 s de compromisso cada |
| 5 | Parry tirava 35% da postura → 3 parries quebram qualquer chefe | ChatGPT | Parry causa **impacto fixo 25–40** |
| 6 | Fadiga de 12 s trava o chefe | ChatGPT | Exaustão **6 s**, 10 s de imunidade depois |
| 7 | Artes Únicas sem orçamento real e com espaço extra | ChatGPT | Arte ocupa **1 dos 6 espaços**; ficha de orçamento obrigatória; exemplos corrigidos |
| 8 | Singulares = corrida de quem chega primeiro / venda de conta | todos | **Posse por temporada de 30 dias** + janela de qualificação + vence o **melhor domínio** na janela; 60 dias de intervalo por conta |
| 9 | Leitor de Estilo incentivava levar dano e jogar ferido | ChatGPT | Validade por **ameaça potencial**; taxas sobre **oportunidades**; máx. 2 demonstrações/encontro; "Risco" trocado por "janela contestada" |
| 10 | Elementos sem limite (Fogo obrigatório, Água infinita, Vento em área) | ChatGPT | Limites por elemento (tabela D.3) |
| 11 | Parry com rede confiando no cliente | todos | **Servidor decide**; compensação ≤100 ms ligada à latência medida |
| 12 | Leitura do chefe pune o tanque e parece trapaça | todos | ≥20 oportunidades, aviso 5 s, muda 1 família, ≤25% dos ataques, dura 30 s, log visível |
| 13 | Âncoras não provam diversidade | ChatGPT | Exatamente 3 rotas; ≥2 independem de elemento; teste homogêneo × misto |
| 14 | Exploit de materiais antigos / monopólio de coleta | Grok, Gemini | 4 contratos de material antigo/dia; pureza cai ao repetir o mesmo nó |
| 15 | Progressão vertical forte demais e não assumida | ChatGPT, Grok | Assumida e suavizada: arma ×1,09 por camada (camada 10 = ×2,17) |

---

## 0. Princípios

1. **O nível aumenta o orçamento, não decide a build.**
2. **Atributo melhora número; escolha cria identidade** (modificadores, Arte Única, equipamento com trade-off).
3. **Nenhuma configuração lidera dano + controle + sobrevivência.** Critério: ≥8 builds a até 15% da melhor numa bateria de encontros.
4. **Esforço sempre vira progresso.** Todo acaso de progressão tem garantia.
5. **Chefe é problema, não barra de vida.** Sem cronômetro de fúria.
6. **Ouro nasce de objetivos, não de monstro.** Monstro dá material.
7. **Andar antigo tem motivo próprio para ser visitado.**
8. **Em 10 minutos o novato entende** atacar, esquivar, bloquear e canalizar 1 magia.
9. **Progressão vertical existe e é assumida** (estilo SAO: andar de cima é mais perigoso e rende mais), mas **dentro de cada camada** a progressão é horizontal (opções, não números maiores).

---

## A. Atributos

Seis atributos, começam em **10**, até **+60 investidos** cada.

| Atributo | Papel principal | Também afeta |
|---|---|---|
| **FOR** | dano de impacto, postura causada | movimento com carga, Ímpeto → impacto, impacto do parry |
| **DES** | velocidade de preparo/recuperação | movimento, Ímpeto → golpes de continuação |
| **VIG** | vida, resistência | postura máxima, reserva de cura |
| **POT** | força da magia, energia | intensidade do elemento |
| **CON** | precisão/área/tempo de conjuração | custo de energia, impacto mágico |
| **PER** | janela de parry, leitura de telegrafias | impacto do parry, ponto fraco, pistas do Diário |

**Retorno decrescente:** r(x) = x/(x+40), onde **x = pontos investidos (0–60)**, nunca o valor total do atributo → r(10)=0,20 · r(20)=0,33 · r(30)=0,43 · r(40)=0,50 · r(60)=0,60.

### A.1 Dano
**Dano = P_arma × K_ação × (1 + Σ wᵢ·r(xᵢ)) × M_alvo**, com pesos wᵢ **definidos pela ação** (somam 1).
M_alvo = M_armadura × elemento, com **M_armadura = 200·s/(200·s + A)** e **s = 1,09^(c−1)** (c = camada do alvo; A já escala por s, então a proporção não muda entre camadas) · elemento 0,85–1,15, **ninguém é imune** (o mínimo é 0,85).

| Ação | K | FOR | DES | POT | CON | PER |
|---|---|---|---|---|---|---|
| Golpe leve | 0,6 | 0,3 | 0,7 | | | |
| Golpe pesado | 1,4 | 0,8 | 0,2 | | | |
| Ponto fraco | 1,0 | 0,3 | 0,3 | | | 0,4 |
| Canalização na arma | 1,2 | 0,5 | 0,1 | 0,4 | | |
| Disparo pela arma | 1,0 | | 0,4 | 0,4 | 0,2 | |
| Conjuração | 1,6 | | | 0,6 | 0,4 | |

Arma 120, golpe pesado: FOR +0 → 168 · FOR +5 → 183 (+9%) · FOR +20 → 213 · FOR +60 → 249.

### A.2 Velocidade
**H = 1 + 0,35·r(DES)**, só em preparo/recuperação. Invulnerabilidade, parry e hitstun **não** aceleram.
Ataque de 1,0 s (0,2 fixo + 0,8 escalável), DES +60 → 0,861 s (**+16% de golpes**).

### A.3 Movimento
**v = 5,5 × (1 + 0,10·r(DES) + 0,06·r(FOR)) × (1 − 0,30·L/(1 + r(FOR)))**, L = carga excedente 0–1.
Leve DES +60: 5,83 m/s · leve FOR +60: 5,70 · carga máx. sem investimento: 3,85 · carga máx. FOR +60: 4,63 (+20%).

### A.4 Ímpeto (ponte FOR ↔ DES) — orçamento fechado
Barra 0–100. **Ganha:** correr em combate +2/m **só enquanto reduz a distância até um inimigo engajado ou avança para um objetivo contestado** (máx. 30 por arrancada; reinicia após 2 s sem correr), esquiva perfeita +20, parry +20, quebrar postura +15. **Teto de ganho: 45 por segundo.** Perde 10/s fora de ação ofensiva.
**Gastar é escolha**: com Ímpeto ≥ 20, o jogador solta um **Golpe de Ímpeto** (pesado segurado ou botão próprio). Ataques normais não gastam a barra e **não recebem bônus dela**. O Golpe de Ímpeto gasta **toda** a barra (Ímpeto_gasto):

- **Impacto do golpe principal** × **(1 + Ímpeto_gasto × (0,5 + r(FOR)) / 100)** → FOR +60, Ímpeto 80: ×1,88.
- **Gasto limpo**: se Ímpeto_gasto ≥ 70, o **impacto** total do golpe (principal + continuações) recebe **+8%**. O dano não muda — premia esperar a hora certa sem punir quem gasta antes.
- **Continuações** — o orçamento é **total e fixo pelo Ímpeto**, não pelo número de golpes:
  - **Dano total = D_leve × (Ímpeto/100) × (1 + 3·r(DES))**
  - **Tempo total = 0,45 s × Ímpeto/100** (Ímpeto 80 → 0,36 s), não importa quantos golpes
  - **Impacto total = 0,35 × I_leve × Ímpeto/100**
  - Número de golpes é só apresentação: Ímpeto 0 → 0 · DES < +20 → 1 · < +40 → 2 · ≥ +40 → 3, dividindo o mesmo total. Assim **cada ponto de DES só aumenta o dano; nunca o tempo** (corrige o degrau DES +39 → +40).
  - DES +60, Ímpeto 80 → 229 de dano em 0,36 s (golpe pesado de FOR +60 = 249 em ~1 s).
  - Cancelável só por defesa (perde o restante). Continuação **não gera Ímpeto, não encadeia, não replica Arte**; elemento aplica 1× por conjunto.
- Ímpeto 0 → nenhuma continuação, nenhum tempo extra.
- O híbrido recebe as duas conversões da mesma barra.

### A.5 Vida e recursos
HP = HP_camada × (1 + 0,9·r(VIG)), com **HP_camada(c) = 1.000 × 1,09^(c−1)** · Resistência = 100 × (1 + 0,6·r(VIG)) · Energia = 100 × (1 + 0,6·r(POT)), regen 4/s × (1 + r(CON)) · Postura = 100 × (1 + 0,8·r(VIG) + 0,4·r(FOR)), regen 10/s após 2 s sem ser atingido · Armadura: dano × 200·s/(200·s + A), s = 1,09^(c−1) (A.1).

### A.7 Quadro de unidades e perfil de referência
s = 1,09^(c−1) (c = camada do conteúdo). Todo número do jogo pertence a uma destas famílias:
| Escala por s | Não escala (unidade de referência) |
|---|---|
| vida (jogador e inimigo), dano, P_arma, armadura A, reserva de cura, poção (250·s), Água/Flecha de cura (200·s, 120·s), reduções de armadura (Fogo −30·s, Rachar armadura −40·s), vida de pilar/Núcleo/âncoras | **postura** (jogador e inimigo), **impacto** (de toda ação, parry, bomba, Terra), resistência, energia, Ímpeto, tempos, janelas, percentuais |
Consequência conferida ✔: parry = mesma fração da postura do chefe em toda camada; poção = mesma fração da vida; bloquear o mesmo ataque custa a mesma resistência.
**Perfil de referência da camada** (usado nos tempos de combate, parte 3 AI): nível = nível-teto do **último andar** da camada (camada 1 → 15, orçamento 62), arma de grau 110%, atributo principal da arma +20, secundário +15, VIG +10 (custo 63,1 sem afinidade; cabe com afinidade). **Tanque de referência:** VIG +20 principal → vida 1.300·s.

### A.6 Modificadores de técnica
Em **+15, +35, +55** num atributo, escolhe **1 de 3** modificadores daquele atributo. **3 equipados.** O modificador **exige o atributo enquanto equipado** (redistribuir abaixo do marco desequipa).
Exemplos: FOR +15 "recuperação do pesado vira passo à frente" · DES +35 "esquiva perfeita encadeia golpe leve sem custo" · VIG +15 "bloquear enquanto canaliza (custo ×1,5)" · CON +35 "conjurar andando a 60%" · PER +15 "telegrafias mostram a direção 0,2 s antes" · POT +55 "zerar a energia → próximo canalizado ×1,5, 3 s sem regenerar".

---

## B. Progressão

- Nível 1–100. Nível 1: **20 pontos**; +3 por nível → **317** no 100.
- Custo de x pontos num atributo: **C(x) = x + x²/40** (C(30) = 52,5; C(60) = 150). Especialista 2×60 = 300; generalista 6×30 = 315.
- XP(L) = 100 × L^1,6. Fontes: 45% combate/exploração, 25% objetivos de andar, 15% contratos, 15% fabricação/coleta/mapeamento.
- Sem multiplicador escondido por diferença de nível.

### B.1 Afinidade ("o jeito de jogar barateia")
Cada atributo tem afinidade m (0–1); **soma máxima 2,0**; nenhum atributo acima de 1,0.
**Custo com afinidade: C_af(x) = C(x) − m × mín(15; 0,25 × C(x))**
→ cada atributo economiza **no máximo 15 pontos**.
- Especialista (m=1 em 2, até +60): **30 pontos** (9%). Generalista (m≈0,33 em 6, até +30): **26**. Híbrido (m≈0,67 em 3, até +45): **30**. Agora ninguém é empurrado a especializar.
- A afinidade é registrada no combate, mas **só muda o orçamento ao confirmar num Santuário**; o reembolso usa a mesma função (sem arbitragem).
- **Dinâmica:** m_novo = 0,92·m + 0,08·alvo por encontro válido (**alvo_i = mín(1; 2 × parcela_i)**, parcela = fração das ações daquele atributo; a soma dos alvos pode ficar abaixo de 2). Uma mudança total de estilo converge 90% em **~28 encontros**; uma sequência fabricada de 5 encontros move no máx. 34% do caminho. Encontros da mesma família seguida pesam como no Leitor (100/70/50/30%).
- Ações que geram afinidade (só em encontros válidos, C.2): quebrar postura → FOR · esquiva perfeita/continuações → DES · bloquear ameaça real → VIG · canalizar/conjurar → POT · interromper/área/manter efeito → CON · parry/ponto fraco → PER.

### B.2 Redistribuição (decisão do Lucas: grátis no começo, depois custa)
- **Grátis até a 1ª conclusão pessoal do andar 5** (não importa se o servidor já abriu andares acima).
- Depois: **1 carga a cada 7 dias de calendário** (sem precisar logar), acumula até 2. Carga extra = materiais equivalentes a ~30 min de coleta, aceitando substitutos de vários andares (não ouro).
- **Redistribuição parcial**: só 1 atributo = 0,6 carga · só os 3 modificadores = 0,4 carga.
- **Arena de treino**: testa qualquer distribuição de graça, sem salvar.

### B.3 Depois do nível 100
Nível não sobe. Evolui: domínio de armas, níveis das Artes Únicas, fabricação, mapeamento.

---

## C. Habilidades

### C.1 Origens e espaços
1. **Básicas** (toda arma) · 2. **Técnicas de arma** (públicas, ~12 por arma, por domínio de uso) · 3. **Modificadores** (A.6) · 4. **Artes Únicas** (escondidas).
**Equipado:** **6 espaços de técnica** (uma Arte Única ocupa um deles) + 3 modificadores. Só 1 Arte equipada.

### C.2 Leitor de Estilo
Por **encontro válido**, o servidor mede 8 dimensões (0–1), sempre como **acertos / oportunidades**. **Dimensão sem oportunidade no encontro = sem atualização** (não vira 0). Cada oportunidade gera **no máx. 1 acerto**. Bônus de equipamento ou de arma (ex.: Flanco da espada curta) **mudam dano, nunca a métrica do Leitor**. **PvP (Fronteira, duelo, Arena) não alimenta Leitor, afinidade, Artes nem domínio.**

| Dimensão | Fórmula |
|---|---|
| Agressão | tempo pressionando / tempo de combate |
| Mobilidade | ataques até 1 s após deslocamento ≥3 m / ataques |
| Defesa ativa | parries + bloqueios eficazes / ataques defensáveis recebidos |
| Esquiva | esquivas perfeitas / ataques esquiváveis recebidos |
| Precisão | acertos em ponto fraco ou janela / oportunidades de ponto fraco |
| Controle | oportunidades aproveitadas / oportunidades. **Oportunidade** = cada conjuração inimiga (1 por execução) ou cada episódio de postura inimiga < 30% (1 por episódio, não por quadro). Aproveitar = interromper ou quebrar; vale **0 ou 1** por oportunidade, mesmo que faça as duas coisas |
| Vetor mágico | **3 componentes** separados (imbuir, disparo, conjurar), cada um = usos daquele vetor / ações mágicas; somam 1 |
| Compromisso | ações completadas em **janela contestada** (enquanto o inimigo ataca) / ações iniciadas nessas janelas |

Assim são **10 números de 0 a 1** comparáveis (7 dimensões + 3 componentes mágicos).

**Encontro válido** (pelo perfil **efetivo sincronizado**, E.6):
- o inimigo tem ataque capaz de tirar **≥5% da sua vida antes da defesa** (ameaça potencial — **não precisa levar dano**);
- cada dimensão só conta com **≥12 oportunidades** distribuídas em **≥3 encontros**;
- mesma família seguida perde peso (100% → 70% → 50% → 30% em 1 h);
- **Anti-automação**: sequência repetida, tempo de reação constante demais etc. viram **sinais** para uma revisão (pontuação de suspeita). Nenhum sinal sozinho descarta progresso — combos legítimos repetem sequências. Só a soma de sinais + revisão bloqueia a progressão de Artes daquela conta.
Vetor de estilo = média móvel (0,8 antigo + 0,2 novo).
**Bestiário**: abates por família (12 famílias).

### C.3 Artes Únicas — fortes, mas diferentes
Mudam **uma regra** do combate só para você. Toda Arte tem **ficha de orçamento** obrigatória: custo, tempo de animação, recarga, efeitos derivados, restrições contra chefe. Orçamento comparado com uma técnica pública do mesmo espaço em **utilidade medida** (dano, controle, sobrevivência, mobilidade), não só dano.

**Fichas das 5 Artes de exemplo**

| Arte | Regra nova | Gatilho / custo | Recarga | Orçamento e restrições |
|---|---|---|---|---|
| **Eco** | esquiva perfeita deixa uma imagem que repete seu próximo golpe 0,4 s depois | automático na esquiva perfeita; 15 energia | 6 s | golpe 70% + eco 30% (não soma dano); eco sem efeitos por acerto, sem Ímpeto, sem elemento |
| **Inversão** | parry troca sua posição com a do inimigo | no parry; 20 resistência | 10 s | 0,2 s invulnerável na troca; não atravessa parede; chefe/elite/objeto de missão: só você se move até 3 m |
| **Maré** | seu elemento vira o oposto (Fogo↔Gelo, Raio↔Terra, Vento↔Água) enquanto Ímpeto > 70 | passivo | troca máx. 1×/5 s | regen de energia −25% enquanto ativa; usa os limites do elemento oposto |
| **Âncora** | bloquear com postura ≥ 90% devolve parte do impacto ao atacante | no bloqueio; custo normal + 10 resistência | 4 s | devolve 40% do impacto; impacto refletido não reflete de novo |
| **Passo Fantasma** | correr atravessa inimigos menores | correr 1,5 s ativa; dura 2 s | 12 s | máx. 10 Ímpeto por ativação; não atravessa elites/chefes |

Cada ficha é comparada, no protótipo, contra uma técnica pública de referência do mesmo espaço, em condições fixas, em **4 medidas**: dano por tempo (D), controle (C), sobrevivência (S), mobilidade (M).
Para cada medida: **q = resultado da Arte / resultado da técnica pública**. **Índice = (q_D + q_C + q_S + q_M) / 4**. Meta: **índice ≤ 1,10**, **q > 1 em no máximo 2 medidas** e **nenhum q acima de 1,25**. Medida em que a técnica de referência rende 0 (ex.: técnica sem controle): a Arte entra com valor absoluto limitado ao da técnica pública de outra arma com a maior medida naquela dimensão (nunca divisão por zero).

**Assinatura** = **limites mínimos por dimensão** (obrigatórios) + mínimo de atributos + bestiário.
Ex. Eco: Esquiva ≥ 0,6 · Agressão ≥ 0,5 · DES ≥ +25 · PER ≥ +10 · 150 abates de feras ou aviários.
Cada Arte tem **3 assinaturas alternativas** (rotas).

**Como nasce:**
1. Limites cumpridos → Arte "preparada" (invisível). A distância Q só serve para as pistas do Diário.
2. Cada **demonstração** (momento-chave da Arte) → tentativa k com chance **1/(13 − k)**: garantia na 12ª, média 6,5.
   **Máx. 2 demonstrações por encontro**, separadas por ≥30 s; 1 por ataque inimigo.
3. Surge na árvore **sem aviso**.

**Diário de Ecos**: página opcional com frases indiretas sobre o que o sistema percebeu; mais **PER** = frases mais claras. Não é notificação.

**Evolução 1–5** por uso válido: libera **alternativas**, não aumenta orçamento (ex.: Eco Duplo = 70% + 15% + 15%).

### C.4 Artes Singulares (1 por servidor, estilo SAO)
- **Posse por temporada de 30 dias.**
- Ao fim da temporada abre uma **janela de 72 h**: qualquer jogador com a assinatura cumprida pode disputar (inclusive o dono atual).
- Vence a maior **Pontuação de Domínio**. **Não é quem chega primeiro e não é sorte.** Como se calcula:
  - **Provação** (instância própria): exatamente **12 demonstrações pontuadas** — 3 famílias de inimigos × 4 —, com **equipamento e atributos sincronizados** (todos no mesmo patamar).
  - Nota de cada demonstração (0–100) = **50% execução** (quão perto do centro da janela de tempo) + **30% precisão** (normalizada pela dificuldade do ataque) + **20% objetivo** (completou a demonstração sem perder o alvo).
  - Cada jogador tem **3 tentativas** de Provação na janela; vale a **melhor**. Mais horas não dão mais tentativas.
  - **Pontuação final = 70% Provação + 30% consistência de estilo**. Quem *vive* aquele estilo ganha peso, não só quem treina a prova.
  - **Consistência de estilo**: nos 14 dias anteriores, o servidor registra automaticamente os **12 primeiros encontros válidos de cada dia**. Um encontro é "compatível" se o vetor daquele encontro cumpre os limites mínimos da assinatura. **C = 100 × compatíveis / registrados.** Exige ≥ 12 encontros registrados em ≥ 3 dias diferentes. Dia sem jogar não reduz a nota; jogar mais de 12 encontros no dia não aumenta.
  - Nas primeiras temporadas do servidor, a 3ª família da Provação pode ser uma **família livre do bestiário da assinatura** (reduz a carga de conteúdo) — mas é **a mesma para todos os concorrentes daquela Arte naquela temporada**, sorteada e anunciada no início da janela (ninguém escolhe o adversário mais fácil).
  - Empate (diferença ≤ 0,5/100): Provação extra idêntica entre os empatados. Nunca desempate por quem chegou primeiro.
- **Calendário próprio:** a temporada de 30 dias **não** é interrompida pela Nova Era (parte 2 AB); a Provação da janela seguinte usa os andares da Era vigente.
- **Uma posse por conta a cada 60 dias** (o mesmo jogador não fica com ela para sempre; dá espaço a outros protagonistas).
- Presa ao personagem; sem uso por 14 dias → volta para disputa antecipada.
- **Desativadas** em PvP competitivo e na corrida de primeira abertura de andar.
- Nenhuma solução de chefe pode depender de uma Singular.
- Registro público de quem tem cada Singular (reconhecimento é a recompensa principal).

---

## D. Combate

### D.1 Defesa
- **Esquiva**: 0,30 s invulnerável (fixo); custo **20 × (1 + peso/40)** (peso: parte 2, L.3). **Perfeita** (últimos 0,12 s antes do golpe): devolve o custo + 20 Ímpeto.
- **Resistência** regenera **18/s** depois de **0,8 s** sem gastar.
- **Bloqueio**: custo de resistência = (0,08 × **dano/s** + 0,25 × impacto) / (1 + 0,6·rFOR + 0,4·rVIG) — s = 1,09^(c−1) da camada do atacante (A.7), então o custo de bloquear o mesmo ataque é igual em toda camada. **30% do dano atravessa** o bloqueio (antes da armadura). Sem resistência → quebra de guarda 1 s.
- **Parry**: janela **comum = mín(180 ms; 140 ms + r(PER) × 67 ms)**. Bônus de arma/técnica (guarda baixa +20, Leitura +60, saque +40, leve +20 de armadura leve na esquiva) somam por cima, mas a **janela técnica final tem teto de 240 ms**. Técnicas como "Corte de aparar — janela 0,3 s" descrevem a **duração da postura**; a parte válida é a janela calculada, centrada no fim da postura. Nada vira parry automático. Sucesso: **impacto fixo 25 × (1 + 0,5·rFOR + 0,5·rPER)** (25–40) + 20 Ímpeto. **Parry falho**: custa 15 de resistência e deixa 0,35 s de recuperação (não dá para "spammar" parry).
- **Rede**: o cliente prevê a animação; **o servidor decide** o sucesso com entrada numerada e horário sincronizado; compensação **até 100 ms, ligada à latência medida** (não soma à janela).
  Critérios de aceite: jogador mediano acerta **35–55%** dos parries a 50/100/150 ms, jitter 0/20 ms, perda 1% · **falsas aceitações de parry com horário adulterado < 1%**.

### D.2 Postura
**Impacto causado = I_base × (1 + 0,6·rFOR + 0,4·rCON) × (1 + Ímpeto_gasto × (0,5 + rFOR)/100)** — pertence à **ação inteira**. Ímpeto_gasto = 0 em qualquer ação que não seja o Golpe de Ímpeto (parry e continuações têm fórmulas próprias).
Postura zerada → atordoado 2 s + dano recebido ×1,3 → depois 8 s de resistência crescente a nova quebra.

### D.3 Elementos (1 na criação) — com limites
| Elemento | Efeito | Limite |
|---|---|---|
| Fogo | −30·s de armadura no alvo, 6 s (o estado **Queimando** só vem de técnicas que o declaram) | **não acumula** entre jogadores (+8% de dano contra A=200) |
| Gelo | +15% na recuperação das ações do alvo | não acumula entre fontes; chefe só em ataques marcados como compatíveis |
| Raio | +25% de impacto contra alvo sem guarda; interrompe conjuração | 1×/2 s por jogador |
| Terra | barreira de 20 de postura em você/aliado | máx. 40 acumulado por alvo, dura 4 s |
| Vento | empurra; +10 Ímpeto | **por ação** (não por alvo), 1×/s |
| Água | **redistribui** reserva de cura entre aliados | só move reserva existente; nunca cria; só entre participantes da mesma tentativa |

**Elementais e o próprio elemento:** multiplicador 0,85 (o piso) e sem o efeito secundário do elemento. Nenhum alvo é imune.

**Onde canalizar** (pesos de A.1): na arma (FOR + POT, perto) · disparo (DES + POT + CON, médio) · conjuração (POT + CON, área/controle, lenta). Golpe canalizado = **ação própria** (físico e mágico dividem orçamento).

### D.4 Papéis sem classe
Contenção · Ruptura · Sustentação · Execução — vêm de técnicas + modificadores + Arte + equipamento; troca no Santuário.
Cada técnica tem uma **etiqueta de papel**. **Papel do jogador = etiqueta majoritária das 6 técnicas equipadas** (empate → as duas). Usado pela leitura do chefe (E.3) e pela formação de grupo — nunca como restrição.

### D.5 Aggro
**T(t+Δt) = e^(−Δt/8)·T + Dano + 0,8·Dano interceptado + 0,5·Cura efetiva + 2·Postura causada**. Sobrecura = 0. Troca de alvo exige +20%. Provocar: 110% do maior, 3 s, recarga 20 s.

### D.6 Reserva de cura por encontro
600 × (1 + 0,8·rVIG) × escala da camada. Cura gasta a reserva **de quem recebe**. Água só redistribui. **Quando enche e quando zera** é definido pelo contrato de encontro (parte 3, AN): no chefe a reserva é da tentativa; no campo, enche inteira só em **ponto de descanso**, e recupera 25% quando um encontro termina com **resolução válida** (todos os inimigos hostis abatidos ou objetivo cumprido) — inimigo que desiste e volta não recupera nada.

---

## E. Andares e chefes

### E.1 Estrutura
Torre em **camadas de 10 andares**; cada andar: bioma, cidade, campo, **Labirinto**, **Chefe de Andar**; também chefes de campo, mini-chefes e chefes de masmorra.
**Desbloqueio global**: a 1ª vitória válida de qualquer grupo abre o próximo andar para todo o servidor. Recompensa do pioneiro: registro público + cosmético. Depois, repetível em instância.
**Mapeamento**: o labirinto começa sem mapa; explorar gera **Mapas** — conveniência vendável **de curto prazo** (depois vira guia externo); não conta como renda de longo prazo.

### E.2 Chefe = HP + mecânica (exemplo: âncoras — 1 dos 6 tipos de chefe da parte 2, Q.3)
Ex. (6 jogadores, camada 1): **120.000 HP** (tempo-alvo: parte 3, AI) + **3 âncoras × 4 intervenções**. Ficha completa: parte 3, AO. Vitória = HP zerado **e** âncoras desativadas.
- **Cada chefe define exatamente 3 rotas** por âncora; **≥2 independem de elemento**; nenhuma exige elemento exclusivo.
- **Cada rota resolve no máx. 2 das 4 intervenções** de uma âncora.
- Rotas têm **custos reais diferentes** (tempo, exposição, posição, pausa no dano) — medidos no protótipo. Teste obrigatório: grupo homogêneo × grupo misto com mesmo orçamento.

### E.3 Leitura do grupo
- Avalia depois de **≥20 oportunidades relevantes** (não por relógio).
- Escolhe 1 de **4–5 padrões pré-definidos** do chefe; aviso **5 s antes** (aura/cor/som) + log "Chefe adaptou: pressão contra bloqueio".
- Muda **só 1 família de ataques**, no máx. **25%** dos ataques passam a pressionar a resposta dominante.
- Nunca remove uma rota de âncora. **Dura 30 s** e volta ao normal; não acumula.
- **Toda adaptação abre uma oportunidade**: a sequência nova expõe uma abertura comunicada (ex.: quebra-guarda contra bloqueadores deixa o flanco aberto 1,2 s). Quem provocou a adaptação pode explorá-la.
- Mede o **grupo**, ponderando por papel (D.4): a resposta "típica" do papel pesa metade — bloqueio de quem está em Contenção, distância de quem está em Execução por disparo/conjuração, interrupção de quem está em Ruptura. Não punir quem faz o próprio papel.

### E.4 Fadiga e ambiente
Ações de ambiente (bater num pilar, cair em armadilha, ser interrompido no ataque grande) enchem a Fadiga. Cheia → **exausto 6 s** (sem acumular fadiga nem prolongar por novas quebras) → **10 s sem nova exaustão**.

### E.5 Falha corrigível
Errar gera problema corrigível (área perigosa, aliado preso, âncora recupera 1 intervenção) — **nunca** bônus cumulativo de dano no chefe.

### E.6 Andares antigos vivos
1. **Sincronia**: **nível-teto(f) = mín(100; f + 5)** (andar 1 → 6, andar 10 → 15, andar 50 → 55, andar 95+ → 100); seus números são limitados ao teto do andar; o **nível efetivo** vale para Leitor de Estilo e recompensas. Regra completa (nível, pontos, arma, armadura, o que não muda): **parte 3, AK**.
2. **Materiais exclusivos** com propriedades únicas entram como **opção** em receitas atuais.
3. **Contratos rotativos**: pagam 85–115% do rendimento do **maior patamar que você já alcançou**; **máx. 4 contratos de material antigo por dia**.
4. **Bestiário das Artes** exige famílias de vários andares.
5. **Mentoria**: veterano sincronizado + novato → "Marcas de Mentor". Exige contribuição verificável dos dois, nunca entre personagens da mesma conta. Teto: **0,5 carga de respec por dia por mentor** (por conta), não importa quantos novatos ajude; duplas além disso dão só reconhecimento (cosmético não negociável).

---

## F. Itens e fabricação

### F.1 Arma = 4 componentes, resultado visível antes de fabricar
Estrutura (alcance/recuperação) · Núcleo (impacto/peso/potência) · Condutor (magia: raio/custo/vetor) · Mecanismo (movimento especial; ocupa 1 modificador).
Ex.: haste longa +0,6 m / +0,12 s · liga densa +20% impacto / +2 carga · condutor expansivo raio 2→3 m / custo 20→30.

### F.2 Materiais com 4 propriedades (0–100)
Densidade, Dureza, Condutividade, Flexibilidade → resultado por fórmula (ex.: impacto +0,25%/ponto de Densidade; custo de energia −0,2%/ponto de Condutividade).
**Coleta**: o mesmo jogador no mesmo nó perde pureza (100% → 80% → 60% → 40% em 2 h) → contra monopólio. Admitido: não para bot que roda rota grande; testar rotas de 10/30/60 nós no protótipo antes de chamar isso de proteção.

### F.3 Regras
Sem falha, sem destruir, afixos escolhidos · Têmpera (habilidade, não sorte): até +5% numa propriedade · desmontar devolve 70% · teste grátis na arena · desgaste: 20 h de uso = 1 arma em componentes de reparo, nunca quebra na luta.
**Potência**: P_arma = 100 × **1,09^(camada − 1)** (camada 10 = ×2,17); dentro da camada, graus de **100–120%** com trade-offs → andar novo abre opções sem jogar fora o inventário.

---

## G. Economia

### G.1 Torneiras e ralos — duas bases
- **Base dos ralos: B(c) = 1.000 × 1,20^(camada − 1)** ouro/h.
- **Renda (torneiras): R(c) = 0,87 × B(c)** → camada 1: **870 ouro/h**. No cenário normal, torneiras = ralos (u = 0).

| Torneiras (% de **R**) | % | Camada 1 (ouro/h) | Regras |
|---|---|---|---|
| Contratos do quadro | 70% | 609 | **8 por dia por conta**, acumulam 3 dias. Cada contrato ≈ 12 min e paga **17,5% de R(c)** (camada 1: **152,25**; 8 = 1.218 numa sessão de referência de 2 h = 609/h). Quem joga mais de ~2 h/dia não ganha mais ouro de contrato: as horas extras rendem **material**, que só vira ouro vendendo a outro jogador |
| Venda limitada a NPC | 15% | 130,5 | **cota diária por conta** |
| Objetivos de andar/eventos | 15% | 130,5 | |
| **Total** | 100% | **870** | |

| Ralos (% de **B**) | % | Camada 1 (ouro/h) | Indexado à riqueza? |
|---|---|---|---|
| Manutenção/reparo | 25% | 250 | **sim** |
| Consumíveis: reagentes de NPC | 14% | 140 (50 indexados) | parte |
| Consumíveis: taxa de produção destruída na estação | 6% | 60 | não |
| Serviços (viagem, Santuário, taxa de fabricação) | 15% | 150 | **sim** |
| Taxa de mercado (5% do volume) | 12% | 120 | sobe com o controlador (até 8%) |
| Cosméticos/moradia (opcional) | 15% | 150 | não |
| **Total** | 87% de B | **870** | indexados: 450 (45% de B) |

**Três contabilidades separadas** (parte 3, AQ): ouro criado/destruído (só as linhas acima) · materiais criados/destruídos · transferências entre jogadores (mercado, pedidos, pagamento ao artesão, saque de Túmulo) — transferência **nunca** conta como ralo.

**Monstro não dá ouro** — dá material, que só vira ouro vendendo para outro jogador (transferência, não criação).

### G.2 Controlador automático
Semanal: P = índice de preços de uma cesta; M = ouro médio por conta ativa.
e = 0,5·ln(P/P*) + 0,25·ln(M/M*) · I = soma de e (±2) · **u = limitar(e + 0,1·I, −0,25, +0,25)**, mudando no máx. 3 p.p./semana.

**Proteção do novato — por progresso pessoal, não por local:**
- Uma conta é **protegida** até concluir pela 1ª vez o **andar 3**. Voltar ao andar 1 depois **não** devolve a proteção (fecha o "abrigo fiscal" de veterano nos andares baixos).
- Protegido: torneiras × (1 − **u/2**) e ralos indexados com fator limitado a **0,9–1,1**.
- **Regra de lançamento**: enquanto **mais de 60%** das contas ativas forem protegidas (começo do servidor), o protegido sofre **60%** do corte (u × 0,6) em vez de 50%.
- Demais: torneiras × (1 − u) e 45% dos ralos (reparo, serviços, parte dos consumíveis) × fator **limitado a 0,8–1,25** (o pobre nunca paga mais que 25% acima do normal por causa da riqueza dos outros).
- Taxa de mercado sobe até **8%** com o que passar do teto.
- Se só um material encarece, cria contratos daquele material (não corta a renda geral). Nunca confisca saldo.

**Simulação** (`sim/check_v3.py`, 104 semanas; população protegida separada; preços após 1 e 2 anos):

| Protegidos | Normal | Pessimista (ralo 66%) | Mercado zero | Deflação (ralo 100%) |
|---|---|---|---|---|
| 0% | ×1,00 | ×1,03 | ×1,00 | ×1,00 |
| 10% (regime normal) | ×1,00 | ×1,04 | ×1,00 | ×1,00 |
| 50% | ×1,00 | ×1,10 | ×1,00 | ×1,00 |
| 90% (lançamento, com a regra de 60%) | ×1,00 | ×1,21 → ×1,22 | ×1,02 → ×1,01 | ×0,97 → ×0,98 |

Leitura honesta: o controlador segura bem até ~50% de protegidos. No **lançamento** (90% protegidos por 2 anos inteiros — pior caso irreal, porque a proteção acaba no andar 3) o pessimista estabiliza em ×1,22. Monitorar as primeiras semanas.
Modelo simplificado (uma moeda, preço segue a liquidez com atraso); a validação real é a simulação por agentes do protótipo (I.5).

### G.3 Mercado
Livro de ordens, histórico, taxa 5–8%, contratos de fabricação, troca direta registrada.

---

## H. Riscos
1. **Complexidade cedo** → 10 min com 4 ações; Ímpeto no andar 1; modificadores no nível 5; Artes surgem sozinhas.
2. **Build dominante por soma de sistemas** (alvo nº 1 do Grok: DES alta + FOR média + PER, Vento, canalização na arma, esquiva encadeada) → orçamento fechado do Ímpeto, limite de ganho 45/s, Vento por ação. **Teste obrigatório** na arena contra 4 arquétipos (FOR puro, híbrido VIG/CON, conjurador, tanque de bloqueio), comparando **dano por tempo total** (incluindo o tempo para gerar Ímpeto e a exposição). Se passar de **12–15%**: continuações (1 + 2,4·rDES) e/ou Vento +7.
3. **Singulares** → temporada + domínio + intervalo de 60 dias; monitorar se as mesmas guildas dominam.
4. **Economia** → lançamento com quase todos protegidos é o ponto mais fraco (×1,22 no pior caso com a regra de 60%); simulação por agentes com entrada/saída de contas antes de abrir. Contratos por conta podem frustrar quem tem vários personagens: monitorar abandono de alts.
5. **Produção de conteúdo** → validar 3 andares antes de prometer 100.

## I. Ordem de protótipo
1. Arena (1 arma, 1 elemento, esquiva/bloqueio/parry/postura/Ímpeto) + teste de rede.
2. Atributos/custos/afinidade/6 modificadores — **testar a build Vento-DES primeiro**.
3. Chefe de 6 com âncoras, leitura do grupo, fadiga.
4. Fabricação por componentes.
5. Economia simulada (agentes) 180 dias.
6. 3 andares + desbloqueio + sincronia.
7. Leitor de Estilo + 5 Artes + 1 Singular.
