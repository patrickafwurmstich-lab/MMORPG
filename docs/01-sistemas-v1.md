# Sistemas do MMORPG — v1 (plano unificado do loop)

> Origem: fase 1 do loop entre ChatGPT, Grok e Gemini + crítica do Claude + decisões do Lucas.
> Só mecânica, sistemas e economia. Sem história nem personagens.
> Números são **parâmetros iniciais de protótipo**; a simulação em `sim/` confere se eles fecham.

## 0. Princípios (o que nenhum sistema pode quebrar)

1. **O nível aumenta o orçamento, não decide a build.** Dois nível 80 podem ser completamente diferentes.
2. **Atributo melhora número; escolha cria identidade.** Identidade vem de modificadores, Artes Únicas e equipamento com trade-off.
3. **Nenhuma configuração lidera dano + controle + sobrevivência ao mesmo tempo.** Critério de teste: ≥8 builds a até 15% da melhor numa bateria de encontros.
4. **Esforço sempre vira progresso.** Nenhum sistema de progresso depende só de sorte; todo RNG tem garantia.
5. **Chefe é problema a resolver, não barra de vida.** Sem cronômetro de fúria.
6. **Ouro é criado por objetivos, não por matar monstro.** Monstro dá material; material vira ouro só vendendo para outro jogador (transferência, não criação).
7. **Andar antigo tem que ter motivo próprio para ser visitado**, não punição por não visitar.
8. **Em 10 minutos o novato entende:** atacar, esquivar, bloquear, canalizar 1 magia.

---

## A. Atributos

Seis atributos. Todos começam em **10**; cada um aceita até **+60 pontos investidos** (teto 70).

| Atributo | Papel principal | Também afeta |
|---|---|---|
| **FOR** Força | dano de impacto, postura causada | movimento com carga pesada, conversão de Ímpeto em impacto |
| **DES** Destreza | velocidade de execução (preparo/recuperação) | movimento, conversão de Ímpeto em golpes extras, precisão em ponto fraco |
| **VIG** Vigor | vida, resistência (stamina) | postura máxima, reserva de cura por encontro |
| **POT** Potência | força da magia, energia máxima | intensidade do efeito elemental |
| **CON** Controle | precisão da magia, tempo de conjuração, área | custo de energia, duração de efeitos |
| **PER** Percepção | janela de parry, leitura de telegrafias | ponto fraco visível, pistas do Diário (Artes Únicas) |

### A.1 Retorno decrescente
Para *x* = pontos investidos (0–60):

**r(x) = x / (x + 40)**

| x | 5 | 10 | 20 | 30 | 40 | 60 |
|---|---|---|---|---|---|---|
| r(x) | 0,111 | 0,200 | 0,333 | 0,429 | 0,500 | 0,600 |

Os primeiros pontos rendem muito; os últimos ainda rendem, mas caro.

### A.2 Dano
**Dano = P_arma × K_ação × (1 + Σ wᵢ · r(xᵢ)) × M_alvo**

- **P_arma**: potência da arma (cresce por camada de andares, ver F).
- **K_ação**: coeficiente da ação (golpe leve 0,6; pesado 1,4; canalizado 1,2…).
- **wᵢ**: pesos **definidos pela ação** (somam 1,0). O jogador não escolhe o peso; escolhe a ação.
- **M_alvo** = 200/(200 + Armadura) × multiplicador elemental (0,85–1,15, sem imunidade).

Exemplos de pesos:

| Ação | FOR | DES | POT | CON | PER |
|---|---|---|---|---|---|
| Golpe pesado | 0,8 | 0,2 | | | |
| Golpe leve | 0,3 | 0,7 | | | |
| Ataque em ponto fraco | 0,3 | 0,3 | | | 0,4 |
| Canalização na arma | 0,5 | 0,1 | 0,4 | | |
| Disparo pela arma | | 0,4 | 0,4 | 0,2 | |
| Conjuração | | | 0,6 | 0,4 | |

Arma 120, golpe pesado, FOR +0 → 120; **FOR +5 → 130,7 (+9%)**; FOR +20 → 152; FOR +60 → 177,6.
O jogador sente cada bloco de 5 pontos no começo; no fim, especializar ainda rende, mas custa muito (ver B).

### A.3 Velocidade ("velocidade gera mais golpes")
**H = 1 + 0,35 · r(DES)** — só **preparo e recuperação** aceleram.
Invulnerabilidade da esquiva, janela de parry e hitstun **não** aceleram (senão a animação fica ilegível e a rede quebra).

Ataque de 1,0 s (0,2 fixo + 0,8 escalável), DES +60: 0,2 + 0,8/1,21 = **0,861 s (+16% de golpes)**.

### A.4 Movimento ("força também ajuda a mover")
**v = 5,5 m/s × (1 + 0,10·r(DES) + 0,06·r(FOR)) × (1 − 0,30 · L / (1 + r(FOR)))**
L = carga acima do limite confortável (0–1).

- Leve, DES +60: 5,83 m/s. Leve, FOR +60: 5,70 m/s.
- Carga máxima sem investimento: 3,85 m/s. Carga máxima, FOR +60: 4,63 m/s (+20%).
Força ajuda quem está pesado; não transforma ninguém em velocista.

### A.5 Ímpeto — a ponte entre FOR e DES (sistema novo)
Recurso de 0 a 100 que **liga movimento, defesa e ataque**.

Ganha Ímpeto: correr em combate (+2 por metro, máx. 30 por arrancada), **esquiva perfeita +20**, **parry +25**, quebrar postura do inimigo +15.
Perde 10/s fora de ação ofensiva.

O próximo ataque **gasta todo o Ímpeto** e o converte conforme os atributos:
- **Impacto extra** (postura causada) = Ímpeto × (0,5 + r(FOR)) %
- **Golpes de continuação** = floor(Ímpeto × r(DES) / 16) golpes leves extras, cada um uma ação própria (não multiplica postura).

Ex.: Ímpeto 80, FOR +40 → +80% de impacto no golpe. Ímpeto 80 → DES +20: 1 golpe extra; DES +40: 2; DES +60: 3.
Assim o mesmo "correr e esquivar" vira **um tranco** em quem tem FOR e **uma rajada** em quem tem DES — e o híbrido faz um pouco de cada.

### A.6 Vida, resistência, energia, postura
- **HP** = HP_camada × (1 + 0,9 · r(VIG))
- **Resistência (stamina)** = 100 × (1 + 0,6 · r(VIG))
- **Energia** = 100 × (1 + 0,6 · r(POT)); regeneração 4/s × (1 + r(CON))
- **Postura máxima** = 100 × (1 + 0,8 · r(VIG) + 0,4 · r(FOR)); regenera 10/s após 2 s sem ser atingido
- **Armadura**: dano recebido × 200/(200 + A). A = 100 → −33%; A = 200 → −50%.

### A.7 Modificadores de técnica (identidade)
Ao chegar em **+15, +35 e +55** num atributo, o jogador escolhe **1 de 3** modificadores daquele atributo.
Só **3 modificadores equipados** ao mesmo tempo (de qualquer atributo).
Exemplos:
- FOR +15: "Recuperação do golpe pesado vira um passo à frente."
- DES +35: "Esquiva perfeita encadeia direto num golpe leve sem gastar resistência."
- VIG +15: "Pode bloquear enquanto canaliza (custo de resistência ×1,5)."
- CON +35: "Conjuração pode ser solta em movimento a 60% da velocidade."
- PER +15: "Ataques telegrafados do inimigo mostram a direção do golpe 0,2 s antes."
- POT +55: "Ao zerar a energia, o próximo canalizado vale ×1,5 e você fica 3 s sem regenerar."

---

## B. Progressão

- **Nível 1–100.** Nível 1 dá **20 pontos**; cada nível seguinte dá **3** → **317 pontos** no 100.
- **Custo acumulado de x pontos num atributo:** C(x) = x + x²/40 → +30 custa 52,5; **+60 custa 150**.
  - Especialista: 2 atributos +60 (300) + resto mínimo.
  - Generalista: todos os 6 em +30 (315).
  - Os dois são viáveis e **jogam diferente** (critério do princípio 3).
- **XP** do nível L para L+1: XP(L) = 100 × L^1,6. Fontes: 45% combate/exploração, 25% objetivos de andar, 15% contratos, 15% fabricação/coleta/mapeamento. Ninguém precisa da mesma atividade.
- **Sem multiplicador escondido por diferença de nível.**

### B.1 Afinidade ("o jeito de jogar barateia") — ideia do Lucas
Cada atributo tem afinidade **m de 0 a 1**. **Soma máxima das 6 afinidades = 2,0.**
O custo do próximo ponto naquele atributo cai **até 20%**: C'(x) = C(x) × (1 − 0,20·m).

Ações que geram afinidade (só contra inimigo que represente ameaça, ver C.2):
quebrar postura → FOR · esquiva perfeita/golpes encadeados → DES · bloquear dano real → VIG · canalizar/conjurar → POT · interromper/acertar área/manter efeito → CON · parry/ponto fraco → PER.

A afinidade acompanha os **últimos 30 encontros válidos** (média móvel 0,2). Como a soma é limitada, jogar de um jeito **redistribui** o desconto; não aumenta o orçamento infinitamente.
Efeito real (conferido em `sim/check_v1.py`): especialista consistente (m = 1 em 2 atributos até +60) economiza **~60 pontos (19% do orçamento)**; generalista (afinidade espalhada, 6 atributos até +30) economiza **~21 pontos (7%)**.
⚠️ Ponto fraco conhecido: o desconto favorece especialistas ~3×. Com 35% (primeira versão) chegava a 33% do orçamento e empurrava todo mundo a especializar; baixado para 20%. Precisa de teste.

### B.2 Redistribuição (respec) — decisão do Lucas
- **Grátis até sair do andar 5** (ou nível 25) — fase de aprender.
- Depois: **1 carga de redistribuição a cada 7 dias** (acumula até 2), feita num Santuário. Carga extra custa **materiais do andar atual** (não ouro).
- A afinidade **não** é apagada: ela é o histórico de como você joga.

### B.3 Depois do nível 100
Não sobe o nível. Evolui em: domínio de armas, níveis das Artes Únicas, especialização de fabricação e mapeamento.

---

## C. Habilidades

### C.1 Quatro origens
1. **Básicas** — toda arma: leve, pesado, esquiva, bloqueio, parry, canalizar.
2. **Técnicas de arma** (públicas) — liberadas por domínio de uso daquela arma. Cada arma tem ~12.
3. **Modificadores de técnica** — por marcos de atributo (A.7).
4. **Artes Únicas** (escondidas) — ideia do Lucas, detalhada abaixo.

**Equipado ao mesmo tempo:** 6 ativas + 3 modificadores + **1 Arte Única**. Ninguém leva todas as ferramentas.

### C.2 Leitor de Estilo (o "sistema que analisa como você luta")
Servidor registra, por **encontro válido**, 8 dimensões de 0 a 1:

| Dimensão | Mede |
|---|---|
| Agressão | % do tempo de combate pressionando |
| Mobilidade | metros e ataques logo após deslocamento |
| Defesa ativa | parries + bloqueios eficazes / tentativas |
| Esquiva | esquivas perfeitas / ataques recebidos |
| Precisão | acertos em ponto fraco e janelas |
| Controle | postura e interrupções causadas / tempo |
| Vetor mágico | proporção imbuir / disparo / conjurar |
| Risco | tempo com HP < 30% sem morrer |

Vetor de estilo = média móvel (0,8 antigo + 0,2 novo) dos últimos encontros.
**Encontro válido**: inimigo de nível ≥ seu −5, que causou dano real; repetir a mesma família de inimigo perde peso (100%, 70%, 50%, 30%… dentro de 1 hora).

Registra também o **Bestiário**: abates por família de inimigo (12 famílias: feras, insetos, constructos, mortos-vivos, elementais, aquáticos, aviários, humanoides, plantas, dracônicos, sombras, colossos).

### C.3 Artes Únicas — "fortes, mas diferentes" (decisão do Lucas)
Uma Arte Única **não é um número maior**: ela **muda uma regra do combate** só para você. O orçamento numérico é igual ao de uma técnica pública (±5%); a força está no que ela permite fazer.
Exemplos de regras novas:
- **Eco**: esquiva perfeita deixa uma imagem que repete seu próximo golpe a 50% 0,4 s depois.
- **Inversão**: parry com sucesso troca sua posição com a do inimigo.
- **Maré**: seu elemento troca para o elemento oposto enquanto Ímpeto > 70.
- **Âncora**: bloquear com postura cheia devolve o impacto ao atacante em vez de consumir sua postura.
- **Passo Fantasma**: correr atravessa inimigos menores sem colisão (ganha Ímpeto ao atravessar).

**Assinatura** de cada Arte = região do vetor de estilo + mínimo de atributos + condição de bestiário. Ex. **Eco**: Esquiva ≥ 0,6, Agressão ≥ 0,5, DES ≥ +25, PER ≥ +10, 150 abates de feras ou aviários.

**Como nasce (sem sorte pura):**
1. Compatibilidade **Q = 1 − distância(vetor, assinatura)/distância_máx**. Quando Q ≥ 0,75 e os mínimos estão cumpridos, a Arte fica "preparada" (invisível).
2. A cada **demonstração** (o momento-chave da Arte, ex.: esquiva perfeita seguida de golpe em < 1 s contra a família certa), tentativa k tem chance **p = 1/(13 − k)**: **garantido na 12ª**, média 6,5.
3. Ela **surge na árvore sem aviso** (como o Lucas quer).

**Diário de Ecos** (não é notificação): página que o jogador abre se quiser, com frases indiretas sobre o que o sistema percebeu ("sua lâmina gosta de responder logo depois que você escapa"). Quanto mais **PER**, mais clara a frase. Resolve o "não entendo por que não ganho nada" sem entregar a receita.

**Raridade e protagonismo (estilo SAO):**
- **Artes Raras**: qualquer um pode ter, se jogar daquele jeito.
- **Artes Singulares**: **só 1 jogador por servidor**. Entre os que estão "preparados", ganha quem completar a 12ª demonstração primeiro. Se o dono ficar 30 dias inativo, a Arte volta a ficar livre. Por serem "diferentes e não mais fortes", ninguém fica obrigado a ter — mas quem tem é reconhecido.

**Por que guia não mata isso:** o guia pode publicar a assinatura, mas para cumpri-la você precisa **jogar daquele jeito por ~30 encontros**. Se você jogou assim, a Arte é de fato o seu estilo. E cada Arte tem **3 assinaturas alternativas** (rotas), então não existe um único "passo a passo".

**Evolução:** Arte tem níveis 1–5 por uso em contexto válido; no nível 3 escolhe **1 de 2 ramos** (ex.: Eco → "Eco Duplo" ou "Eco Elemental"). Dois donos da mesma Arte divergem.

---

## D. Combate

### D.1 Ações defensivas
- **Esquiva**: 0,30 s de invulnerabilidade fixa; custa 20 de resistência × (1 + peso). **Perfeita** = entrar nos últimos 0,12 s antes do golpe → devolve o custo + 20 Ímpeto.
- **Bloqueio**: custa resistência = (0,08 × dano + 0,25 × impacto) / (1 + 0,6·r(FOR) + 0,4·r(VIG)). Sem resistência → **quebra de guarda 1 s**. O dano que passa vai para a armadura.
- **Parry**: janela base **150 ms + até 60 ms por PER** (r(PER) × 100 ms). Sucesso: inimigo perde 35% da postura máxima + 25 Ímpeto para você.
  - **Rede**: validação no cliente com reconciliação no servidor (tolerância de até 200 ms). Testar a 50/100/150 ms antes de fixar (ver I).

### D.2 Postura (igual para jogador e inimigo)
- **Impacto causado** = impacto_ação × (1 + 0,6·r(FOR) + 0,4·r(CON)) + bônus de Ímpeto.
- O impacto pertence à **ação inteira**: dividir em 10 acertos não multiplica por 10.
- Postura zerada → **atordoado 2 s** + dano recebido ×1,3. Depois, **8 s de resistência crescente** a nova quebra (não dá para travar ninguém para sempre). Certas aberturas de chefe ignoram isso.

### D.3 Magia para todos
Na criação escolhe **1 elemento**. Cada elemento **mexe num recurso do combate** (assim magia conversa com o resto):

| Elemento | Efeito ligado a outro sistema |
|---|---|
| Fogo | reduz a armadura do alvo (−30 A por 6 s, acumula até 3) |
| Gelo | aumenta a recuperação das ações do alvo (+15%) |
| Raio | +50% de impacto contra alvo sem guarda; interrompe conjurações |
| Terra | gera barreira de postura em você/aliado |
| Vento | empurra; gera Ímpeto para você (+10 por acerto) |
| Água | devolve reserva de cura (C.4) a aliados próximos |

**Onde canalizar** (o status decide o que rende mais — pesos da tabela A.2):
- **Na arma** (imbuir): rápido, escala FOR + POT. Melhor para quem luta perto.
- **Disparo pela arma**: médio alcance, escala DES + POT + CON.
- **Conjuração**: lenta, área/controle, escala POT + CON. Precisa de proteção do grupo.

Um golpe canalizado é **uma ação própria**: dano físico e mágico dividem o mesmo orçamento.
Elemento secundário: só por Arte Única (ex.: Maré).

### D.4 Papéis sem classe
Papéis surgem de equipamento + modificadores + Arte: **Contenção** (segura o chefe), **Ruptura** (quebra postura/interrompe), **Sustentação** (cura/barreira), **Execução** (dano nas janelas).
Um mesmo jogador pode trocar de papel trocando ativas e modificadores no Santuário.

### D.5 Aggro (coerente)
**T(t+Δt) = e^(−Δt/8) × T(t) + Dano + 0,8 × Dano interceptado + 0,5 × Cura efetiva + 2 × Postura causada**
- Sobrecura vale 0. Trocar de alvo exige superar o atual em **20%**.
- **Provocar**: sobe para 110% do maior, prende por 3 s, recarga 20 s.
- Tanque é quem **controla e intercepta**, não quem tem mais vida.

### D.6 Reserva de cura por encontro (no lugar de cronômetro)
Cada jogador tem **600 × (1 + 0,8·r(VIG))** (× escala da camada) de recuperação por encontro. Cura gasta a reserva **de quem recebe**. Erros custam algo que acaba, sem relógio de derrota.

---

## E. Andares e chefes

### E.1 Estrutura (estilo SAO T1)
- Torre em **camadas de 10 andares**. Cada andar: bioma próprio, cidade, campo, **Labirinto** e **Chefe de Andar** no topo.
- Também existem: chefes de campo, mini-chefes do labirinto, chefes de masmorra.
- **Desbloqueio global**: a primeira vitória válida de **qualquer grupo** abre o próximo andar para **todo o servidor**.
  - Primeira vitória dá **registro público + cosmético**. Sem equipamento exclusivo nem monopólio.
  - Depois, o chefe fica repetível em instância (ninguém bloqueia ninguém).
- **Mapeamento**: o labirinto começa sem mapa. Jogadores que exploram geram **Mapas** (item fabricável/vendável). Liga exploração à economia.

### E.2 Chefe = problema, não barra de vida
Cada chefe tem **HP + Âncoras** (mecanismos). Vitória = HP zerado **e** âncoras desativadas.
- Exemplo (6 jogadores): 60.000 HP + **3 âncoras × 4 intervenções**.
- Cada âncora aceita **3 rotas** (ex.: parry num golpe anunciado / atrair o golpe do chefe para a âncora / acumular 60 de postura na abertura local / acertar com o elemento certo).
- **Cada rota resolve no máximo 2 das 4 intervenções** de uma âncora → nenhum grupo resolve tudo com a mesma ferramenta → **builds diferentes são úteis**.
- Dobrar o DPS reduz a parte do HP, mas **não pula as 12 intervenções**.

### E.3 Leitura do grupo (o chefe se adapta)
A cada **60 s** o chefe mede a resposta mais usada pelo grupo (bloqueio, esquiva, distância, elemento) e **muda um padrão** para pressioná-la (máx. 3 mudanças), sempre com aviso visual.
Ex.: grupo que só bloqueia → golpes que atravessam bloqueio e exigem esquiva.
Isso pune o "meta único" dentro da luta.

### E.4 Fadiga e ambiente
Chefes têm **Fadiga**: certas ações (bater num pilar, cair numa armadilha do cenário, ser interrompido no meio do ataque grande) somam fadiga; fadiga cheia → **12 s exausto** (postura zerada sem resistência a quebra).

### E.5 Falha corrigível
Errar a mecânica gera **problema corrigível** (área perigosa, aliado preso para resgatar, âncora que recupera 1 intervenção), **nunca** bônus cumulativo de dano no chefe.

### E.6 Andares antigos vivos
1. **Sincronia de andar**: ao voltar, seus números são limitados ao teto daquele andar (o veterano não "atropela").
2. **Materiais exclusivos com propriedades únicas** (F) que entram como **opção** em receitas atuais.
3. **Quadro de contratos rotativo** paga 85–115% do rendimento de um andar atual.
4. **Bestiário das Artes Únicas** exige famílias de vários andares → para ganhar certas Artes você precisa voltar.
5. **Mentoria**: veterano sincronizado em grupo com novato ganha "Marcas de Mentor" (cosméticos e cargas de respec).

---

## F. Itens e fabricação

### F.1 Arma = 4 componentes, resultado visível antes de fabricar
| Componente | Decide | Exemplo |
|---|---|---|
| **Estrutura** (forma) | alcance, recuperação | Haste longa: +0,6 m alcance, +0,12 s recuperação |
| **Núcleo** (material) | impacto, peso, potência | Liga densa: +20% impacto, +2 de carga |
| **Condutor** | magia: raio, custo, vetor favorito | Expansivo: raio 2→3 m, custo 20→30 |
| **Mecanismo** | movimento especial | Retrátil: avanço curto após golpe pesado (ocupa 1 modificador) |

### F.2 Materiais com propriedades
Cada material tem 4 propriedades 0–100: **Densidade, Dureza, Condutividade, Flexibilidade**. O resultado sai por fórmula. Ex.: Núcleo → impacto +0,25% por ponto de Densidade; peso +0,03 por ponto de Densidade; Condutividade reduz o custo de energia 0,2% por ponto.

### F.3 Regras
- **Sem falha, sem destruir item**, afixos escolhidos (fim do "+5% aleatório").
- **Têmpera** (opcional): mini-jogo de habilidade (não sorte) que dá até +5% em **uma** propriedade escolhida.
- Desmontar devolve 70% dos materiais estruturais. Teste grátis na arena de treino.
- **Potência por camada**: P_arma base = 100 × 1,12^(camada−1). Dentro da camada, os graus variam 100–115% → andar novo **abre opções**, não joga fora o inventário a cada andar.
- **Desgaste previsível**: 20 h de uso ativo consomem o equivalente a 1 arma em componentes de reparo. Nunca quebra no meio da luta.

---

## G. Economia

### G.1 De onde vem e para onde vai o ouro
Renda-alvo por jogador ativo por hora: **R(c) = 1.000 × 1,25^(camada − 1)** ouro/h.

| Torneiras (criação) | % de R | Observação |
|---|---|---|
| Contratos do quadro | 70% | **8 contratos/dia por personagem, acumulam até 3 dias** (casual não perde) |
| Venda limitada a NPC | 15% | teto diário; só para itens "lixo" |
| Objetivos de andar/eventos | 15% | |

| Ralos (destruição) | % de R (meta) |
|---|---|
| Manutenção/reparo | 25% |
| Consumíveis (poções, reagentes) | 20% |
| Taxas de fabricação e serviços (viagem, Santuário) | 15% |
| Taxa de mercado (5% do volume) | ~12% |
| Cosméticos/moradia (opcional) | ~15% |

**Monstros não dão ouro**: dão material. Bot farmando monstro gera material que só vira ouro se **outro jogador comprar** → transferência, não inflação.

**Cenário pessimista obrigatório** (cosmético não vende, mercado pela metade): ralo cai para ~66% → sobra +34% de R/h. O controlador (G.3) segura isso, mas cortando a renda de contratos — conferido em `sim/check_v1.py`.

### G.2 Mercado entre jogadores
Livro de ordens de compra e venda, histórico de preço e volume, taxa 5%. Contratos de fabricação (comprador fornece material). Troca direta registrada. Mapas de labirinto e Mapas de chefe são bens de jogador.

### G.3 Controlador automático (inflação e deflação)
Toda semana mede: índice de preços de uma cesta de bens (P), ouro por conta ativa (M).
e = 0,5 · ln(P/P*) + 0,25 · ln(M/M*)  · I = soma acumulada de e (limitada a ±2)
**u = limitar(e + 0,1 · I, −0,35, +0,35)**
- Recompensa de contratos × (1 − u); taxa de mercado 5% × (1 + u).
- Muda no máximo **3 pontos percentuais por semana**. Contratos já aceitos não mudam.
- Por que o termo acumulado (I): sem ele, na simulação pessimista o controlador travava em u ≈ 0,27 e os preços subiam **+78% em um ano**. Com ele, voltam para +18% em um ano e o cenário normal fica estável (preços ×0,97–1,00).
- ⚠️ Custo honesto: no cenário pessimista os contratos chegam a pagar ~65% do normal. Melhor não depender de ralos opcionais (ver H.4).
- Só age se preço **e** liquidez apontam para o mesmo lado. Se só um material encarece, o sistema **cria contratos daquele material** em vez de cortar a renda de todos.
- Não confisca saldo de ninguém.

### G.4 Andares antigos na economia
Contratos rotativos de materiais de andares antigos; materiais únicos por andar como opção de receita; Mapas de labirinto antigos para novatos.

---

## H. Riscos principais
1. **Complexidade cedo demais** → 10 primeiros minutos só com ataque, esquiva, bloqueio, 1 canalização; Ímpeto aparece no andar 1, modificadores no nível 5, Artes Únicas surgem sozinhas.
2. **Uma build dominar por multiplicação de sistemas** (Ímpeto + velocidade + efeitos por acerto) → postura por ação, golpes de continuação limitados pelo Ímpeto, 3 modificadores, teste dos 8 builds a 15%.
3. **Artes Singulares gerarem injustiça/abuso** (contas paradas, compra de conta) → liberação após 30 dias inativo, Arte presa ao personagem, registro público de quem tem.
4. **Economia depender de ralos opcionais** → simular 180 dias com adesão 0/50/100%.

## I. Ordem de protótipo
1. Arena: 1 arma, 1 elemento, esquiva/bloqueio/parry/postura/Ímpeto. Critério: 16 de 20 novatos usam tudo em 10 min; rede a 50/100/150 ms.
2. Atributos + custos + afinidade + 6 modificadores (simulação + arena).
3. Chefe de 6 com âncoras e leitura do grupo. Critério: grupo com 30% menos DPS e boa execução vence mais que o inverso.
4. Fabricação por componentes.
5. Economia simulada 180 dias.
6. 3 andares + desbloqueio global + sincronia.
7. Leitor de estilo + 5 Artes Únicas.
