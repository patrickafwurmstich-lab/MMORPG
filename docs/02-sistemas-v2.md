# Sistemas do MMORPG — v2

> v2 = v1 + revisão rodada 1 de ChatGPT, Grok e Gemini (todos deram NÃO APROVADO / aprovado com ressalvas).
> Números conferidos em `sim/check_v2.py`. Só mecânica, sistemas e economia.

## O que mudou do v1 para o v2

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

**Retorno decrescente:** r(x) = x/(x+40) → r(10)=0,20 · r(20)=0,33 · r(30)=0,43 · r(40)=0,50 · r(60)=0,60.

### A.1 Dano
**Dano = P_arma × K_ação × (1 + Σ wᵢ·r(xᵢ)) × M_alvo**, com pesos wᵢ **definidos pela ação** (somam 1).
M_alvo = 200/(200 + Armadura) × elemento (0,85–1,15, sem imunidade).

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
Barra 0–100. **Ganha:** correr em combate +2/m (máx. 30 por arrancada), esquiva perfeita +20, parry +20, quebrar postura +15. **Teto de ganho: 45 por segundo.** Perde 10/s fora de ação ofensiva.
O próximo ataque **gasta todo o Ímpeto**:

- **Impacto** do golpe × **(1 + Ímpeto × (0,5 + r(FOR)) / 100)** → FOR +60, Ímpeto 80: impacto ×1,88.
- **Continuações** (golpes leves extras): **dano total = D_leve × (Ímpeto/100) × (1 + 3·r(DES))**, dividido em:
  1 golpe (Ímpeto < 40) · 2 (40–69) · 3 (≥ 70), limitado por DES: < +20 → máx. 1; < +40 → máx. 2.
  - DES +60, Ímpeto 80 → 229 de dano total (golpe pesado de FOR +60 = 249).
  - Cada continuação = **+0,18 s** de compromisso, cancelável só por defesa (perde as restantes).
  - Continuação **não gera Ímpeto, não encadeia outra, não replica Arte**; efeito elemental aplica **1 vez por conjunto**; impacto de cada continuação ×0,35.
- O híbrido recebe as duas conversões da mesma barra (já contado no orçamento acima).

### A.5 Vida e recursos
HP = HP_camada × (1 + 0,9·r(VIG)) · Resistência = 100 × (1 + 0,6·r(VIG)) · Energia = 100 × (1 + 0,6·r(POT)), regen 4/s × (1 + r(CON)) · Postura = 100 × (1 + 0,8·r(VIG) + 0,4·r(FOR)), regen 10/s após 2 s sem ser atingido · Armadura: dano × 200/(200 + A).

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
- Ações que geram afinidade (só em encontros válidos, C.2): quebrar postura → FOR · esquiva perfeita/continuações → DES · bloquear ameaça real → VIG · canalizar/conjurar → POT · interromper/área/manter efeito → CON · parry/ponto fraco → PER.

### B.2 Redistribuição (decisão do Lucas: grátis no começo, depois custa)
- **Grátis até a 1ª conclusão pessoal do andar 5** (não importa se o servidor já abriu andares acima).
- Depois: **1 carga a cada 7 dias de calendário** (sem precisar logar), acumula até 2. Carga extra = materiais equivalentes a ~30 min de coleta, aceitando substitutos de vários andares (não ouro).
- **Redistribuição parcial** (só 1 atributo, ou só modificadores): custa 0,6 carga.
- **Arena de treino**: testa qualquer distribuição de graça, sem salvar.

### B.3 Depois do nível 100
Nível não sobe. Evolui: domínio de armas, níveis das Artes Únicas, fabricação, mapeamento.

---

## C. Habilidades

### C.1 Origens e espaços
1. **Básicas** (toda arma) · 2. **Técnicas de arma** (públicas, ~12 por arma, por domínio de uso) · 3. **Modificadores** (A.6) · 4. **Artes Únicas** (escondidas).
**Equipado:** **6 espaços de técnica** (uma Arte Única ocupa um deles) + 3 modificadores. Só 1 Arte equipada.

### C.2 Leitor de Estilo
Por **encontro válido**, o servidor mede 8 dimensões (0–1), sempre como **acertos / oportunidades**:

| Dimensão | Fórmula |
|---|---|
| Agressão | tempo pressionando / tempo de combate |
| Mobilidade | ataques até 1 s após deslocamento ≥3 m / ataques |
| Defesa ativa | parries + bloqueios eficazes / ataques defensáveis recebidos |
| Esquiva | esquivas perfeitas / ataques esquiváveis recebidos |
| Precisão | acertos em ponto fraco ou janela / oportunidades de ponto fraco |
| Controle | (postura causada + interrupções) / tempo |
| Vetor mágico | proporção imbuir / disparo / conjurar |
| Compromisso | ações completadas em **janela contestada** (enquanto o inimigo ataca) / ações iniciadas nessas janelas |

**Encontro válido** (pelo perfil **efetivo sincronizado**, E.6):
- o inimigo tem ataque capaz de tirar **≥5% da sua vida antes da defesa** (ameaça potencial — **não precisa levar dano**);
- cada dimensão só conta com **≥12 oportunidades** distribuídas em **≥3 encontros**;
- mesma família seguida perde peso (100% → 70% → 50% → 30% em 1 h);
- sequência de inputs idêntica repetida sem variação de alvo/posição → encontro descartado (anti-macro).
Vetor de estilo = média móvel (0,8 antigo + 0,2 novo).
**Bestiário**: abates por família (12 famílias).

### C.3 Artes Únicas — fortes, mas diferentes
Mudam **uma regra** do combate só para você. Toda Arte tem **ficha de orçamento** obrigatória: custo, tempo de animação, recarga, efeitos derivados, restrições contra chefe. Orçamento comparado com uma técnica pública do mesmo espaço em **utilidade medida** (dano, controle, sobrevivência, mobilidade), não só dano.

| Arte | Regra nova | Limites do orçamento |
|---|---|---|
| **Eco** | esquiva perfeita deixa uma imagem que repete seu próximo golpe | 70% no golpe + 30% no eco; eco não aplica efeitos por acerto nem Ímpeto |
| **Inversão** | parry troca sua posição com a do inimigo | não move chefes nem objetos de missão: contra eles, reposiciona só você até 3 m |
| **Maré** | elemento troca para o oposto enquanto Ímpeto > 70 | troca no máx. 1×/5 s; usa os limites do elemento oposto |
| **Âncora** | bloquear com postura cheia devolve parte do impacto | devolve 40% do impacto, custa resistência normal, não devolve impacto já refletido |
| **Passo Fantasma** | correr atravessa inimigos menores | máx. 10 Ímpeto por ativação (não por inimigo) |

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
- Vence quem tiver a maior **Pontuação de Domínio** na janela = qualidade média das demonstrações válidas (precisão do timing, ameaça do inimigo, variedade de famílias). **Não é quem chega primeiro e não é sorte.**
- **Uma posse por conta a cada 60 dias** (o mesmo jogador não fica com ela para sempre; dá espaço a outros protagonistas).
- Presa ao personagem; sem uso por 14 dias → volta para disputa antecipada.
- **Desativadas** em PvP competitivo e na corrida de primeira abertura de andar.
- Nenhuma solução de chefe pode depender de uma Singular.
- Registro público de quem tem cada Singular (reconhecimento é a recompensa principal).

---

## D. Combate

### D.1 Defesa
- **Esquiva**: 0,30 s invulnerável (fixo); custo 20 × (1 + peso). **Perfeita** (últimos 0,12 s antes do golpe): devolve o custo + 20 Ímpeto.
- **Bloqueio**: custo de resistência = (0,08 × dano + 0,25 × impacto) / (1 + 0,6·rFOR + 0,4·rVIG). Sem resistência → quebra de guarda 1 s.
- **Parry**: janela **140 ms + r(PER) × 67 ms** (máx. 180 ms). Sucesso: **impacto fixo 25 × (1 + 0,5·rFOR + 0,5·rPER)** (25–40) + 20 Ímpeto.
- **Rede**: o cliente prevê a animação; **o servidor decide** o sucesso com entrada numerada e horário sincronizado; compensação **até 100 ms, ligada à latência medida** (não soma à janela). Meta de teste: jogador mediano acerta **35–55%** dos parries a 50/100/150 ms, jitter 0/20 ms, perda 1%.

### D.2 Postura
**Impacto causado = I_base × (1 + 0,6·rFOR + 0,4·rCON) × (1 + Ímpeto × (0,5 + rFOR)/100)** — pertence à **ação inteira**.
Postura zerada → atordoado 2 s + dano recebido ×1,3 → depois 8 s de resistência crescente a nova quebra.

### D.3 Elementos (1 na criação) — com limites
| Elemento | Efeito | Limite |
|---|---|---|
| Fogo | −30 de armadura no alvo, 6 s | **não acumula** entre jogadores (+8% de dano contra A=200) |
| Gelo | +15% na recuperação das ações do alvo | não acumula entre fontes; chefe só em ataques marcados como compatíveis |
| Raio | +25% de impacto contra alvo sem guarda; interrompe conjuração | 1×/2 s por jogador |
| Terra | barreira de 20 de postura em você/aliado | máx. 40 acumulado por alvo, dura 4 s |
| Vento | empurra; +10 Ímpeto | **por ação** (não por alvo), 1×/s |
| Água | **redistribui** reserva de cura entre aliados | só move reserva existente; nunca cria |

**Onde canalizar** (pesos de A.1): na arma (FOR + POT, perto) · disparo (DES + POT + CON, médio) · conjuração (POT + CON, área/controle, lenta). Golpe canalizado = **ação própria** (físico e mágico dividem orçamento).

### D.4 Papéis sem classe
Contenção · Ruptura · Sustentação · Execução — vêm de técnicas + modificadores + Arte + equipamento; troca no Santuário.

### D.5 Aggro
**T(t+Δt) = e^(−Δt/8)·T + Dano + 0,8·Dano interceptado + 0,5·Cura efetiva + 2·Postura causada**. Sobrecura = 0. Troca de alvo exige +20%. Provocar: 110% do maior, 3 s, recarga 20 s.

### D.6 Reserva de cura por encontro
600 × (1 + 0,8·rVIG) × escala da camada. Cura gasta a reserva **de quem recebe**. Água só redistribui.

---

## E. Andares e chefes

### E.1 Estrutura
Torre em **camadas de 10 andares**; cada andar: bioma, cidade, campo, **Labirinto**, **Chefe de Andar**; também chefes de campo, mini-chefes e chefes de masmorra.
**Desbloqueio global**: a 1ª vitória válida de qualquer grupo abre o próximo andar para todo o servidor. Recompensa do pioneiro: registro público + cosmético. Depois, repetível em instância.
**Mapeamento**: o labirinto começa sem mapa; explorar gera **Mapas** (conveniência vendável — admitido: depois de um tempo vira guia externo; não é pilar econômico).

### E.2 Chefe = HP + âncoras
Ex. (6 jogadores): 60.000 HP + **3 âncoras × 4 intervenções**. Vitória = HP zerado **e** âncoras desativadas.
- **Cada chefe define exatamente 3 rotas** por âncora; **≥2 independem de elemento**; nenhuma exige elemento exclusivo.
- **Cada rota resolve no máx. 2 das 4 intervenções** de uma âncora.
- Rotas têm **custos reais diferentes** (tempo, exposição, posição, pausa no dano) — medidos no protótipo. Teste obrigatório: grupo homogêneo × grupo misto com mesmo orçamento.

### E.3 Leitura do grupo
- Avalia depois de **≥20 oportunidades relevantes** (não por relógio).
- Escolhe 1 de **4–5 padrões pré-definidos** do chefe; aviso **5 s antes** (aura/cor/som) + log "Chefe adaptou: pressão contra bloqueio".
- Muda **só 1 família de ataques**, no máx. **25%** dos ataques passam a pressionar a resposta dominante.
- Nunca remove uma rota de âncora. **Dura 30 s** e volta ao normal; não acumula.
- Mede o **grupo**, ponderando por papel: o bloqueio do jogador em Contenção pesa metade (não punir quem faz seu papel).

### E.4 Fadiga e ambiente
Ações de ambiente (bater num pilar, cair em armadilha, ser interrompido no ataque grande) enchem a Fadiga. Cheia → **exausto 6 s** (sem acumular fadiga nem prolongar por novas quebras) → **10 s sem nova exaustão**.

### E.5 Falha corrigível
Errar gera problema corrigível (área perigosa, aliado preso, âncora recupera 1 intervenção) — **nunca** bônus cumulativo de dano no chefe.

### E.6 Andares antigos vivos
1. **Sincronia**: seus números são limitados ao teto do andar; o **nível efetivo** vale para Leitor de Estilo e recompensas.
2. **Materiais exclusivos** com propriedades únicas entram como **opção** em receitas atuais.
3. **Contratos rotativos**: pagam 85–115% do rendimento do **maior patamar que você já alcançou**; **máx. 4 contratos de material antigo por dia**.
4. **Bestiário das Artes** exige famílias de vários andares.
5. **Mentoria**: veterano sincronizado + novato → "Marcas de Mentor" (cosméticos e 0,5 carga de respec), **1×/dia por dupla**, exige contribuição verificável dos dois, nunca entre personagens da mesma conta.

---

## F. Itens e fabricação

### F.1 Arma = 4 componentes, resultado visível antes de fabricar
Estrutura (alcance/recuperação) · Núcleo (impacto/peso/potência) · Condutor (magia: raio/custo/vetor) · Mecanismo (movimento especial; ocupa 1 modificador).
Ex.: haste longa +0,6 m / +0,12 s · liga densa +20% impacto / +2 carga · condutor expansivo raio 2→3 m / custo 20→30.

### F.2 Materiais com 4 propriedades (0–100)
Densidade, Dureza, Condutividade, Flexibilidade → resultado por fórmula (ex.: impacto +0,25%/ponto de Densidade; custo de energia −0,2%/ponto de Condutividade).
**Coleta**: o mesmo jogador no mesmo nó perde pureza (100% → 80% → 60% → 40% em 2 h) → contra monopólio e bots.

### F.3 Regras
Sem falha, sem destruir, afixos escolhidos · Têmpera (habilidade, não sorte): até +5% numa propriedade · desmontar devolve 70% · teste grátis na arena · desgaste: 20 h de uso = 1 arma em componentes de reparo, nunca quebra na luta.
**Potência**: P_arma = 100 × **1,09^(camada − 1)** (camada 10 = ×2,17); dentro da camada, graus de **100–120%** com trade-offs → andar novo abre opções sem jogar fora o inventário.

---

## G. Economia

### G.1 Torneiras e ralos
Renda-alvo por jogador ativo por hora: **R(c) = 1.000 × 1,20^(camada − 1)**.

| Torneiras | % de R | |
|---|---|---|
| Contratos do quadro | 70% | 8/dia por personagem, acumulam 3 dias |
| Venda limitada a NPC | 15% | teto diário |
| Objetivos de andar/eventos | 15% | |

| Ralos | % de R (meta) | Indexado à riqueza? |
|---|---|---|
| Manutenção/reparo | 25% | **sim** |
| Consumíveis de NPC | 20% (5% indexado) | parte |
| Serviços (viagem, Santuário, taxa de fabricação) | 15% | **sim** |
| Taxa de mercado (5% do volume) | ~12% | sobe com o controlador (até 8%) |
| Cosméticos/moradia (opcional) | ~15% | não |

**Monstro não dá ouro** — dá material, que só vira ouro vendendo para outro jogador.

### G.2 Controlador automático (corrigido)
Semanal: P = índice de preços de uma cesta; M = ouro médio por conta ativa.
e = 0,5·ln(P/P*) + 0,25·ln(M/M*) · I = soma de e (±2) · **u = limitar(e + 0,1·I, −0,25, +0,25)**, mudando no máx. 3 p.p./semana.
- **Todas as torneiras** × (1 − u), **exceto andares 1–3** (protegidos — o novato não paga a conta do servidor rico).
- Taxa de mercado sobe até **8%** com o que passar do teto.
- **45% dos ralos** (reparo, serviços, parte dos consumíveis) × (M/M*), **exceto andares 1–3**.
- Se só um material encarece, cria contratos daquele material (não corta a renda geral). Nunca confisca saldo.

**Resultado da simulação corrigida** (`sim/check_v2.py`, 104 semanas):
| Cenário | Sem controle | v2 |
|---|---|---|
| Normal (ralo 87%) | preços ×1,65/ano | ×1,00, estável |
| Pessimista (cosmético não vende, mercado pela metade: ralo 66%) | ×2,69/ano | **×1,22 e estável por 2 anos** (novo equilíbrio, sem disparar) |
| Deflação (ralo 110%) | ×0,50/ano | ×1,00 (u = −0,11: contratos pagam mais) |

⚠️ No cenário normal o controlador se acomoda em u ≈ +0,14 → a renda efetiva fica ~87% de R. Ou seja, R nominal está ~13% alto para os ralos previstos: **calibrar R no protótipo** para u ≈ 0 no normal (deixa toda a faixa do controlador para emergências).

### G.3 Mercado
Livro de ordens, histórico, taxa 5–8%, contratos de fabricação, troca direta registrada.

---

## H. Riscos
1. **Complexidade cedo** → 10 min com 4 ações; Ímpeto no andar 1; modificadores no nível 5; Artes surgem sozinhas.
2. **Build dominante por soma de sistemas** (alvo nº 1 do Grok: DES alta + FOR média + PER, Vento, canalização na arma, esquiva encadeada) → orçamento fechado do Ímpeto, limite de ganho 45/s, Vento por ação; **testar essa build primeiro na arena**.
3. **Singulares** → temporada + domínio + intervalo de 60 dias; monitorar se as mesmas guildas dominam.
4. **Economia** → o equilíbrio pessimista de +22% depende do índice dos ralos; testar com adesão zero a cosmético e mercado.
5. **Produção de conteúdo** → validar 3 andares antes de prometer 100.

## I. Ordem de protótipo
1. Arena (1 arma, 1 elemento, esquiva/bloqueio/parry/postura/Ímpeto) + teste de rede.
2. Atributos/custos/afinidade/6 modificadores — **testar a build Vento-DES primeiro**.
3. Chefe de 6 com âncoras, leitura do grupo, fadiga.
4. Fabricação por componentes.
5. Economia simulada (agentes) 180 dias.
6. 3 andares + desbloqueio + sincronia.
7. Leitor de Estilo + 5 Artes + 1 Singular.
