# Árvore de habilidades — 00. Sistema (atributos, status, pontos, preparação)

> Loop 3. Pedido do Lucas: "não quero a receita do bolo, quero o bolo" — atributos, status e habilidades **completos**, com todos os nós escritos.
> Base: núcleo v8 (`docs/08-nucleo-v8.md`). Este pacote **substitui** os 54 modificadores (núcleo A.6, parte 3 AR.1) e reorganiza as técnicas de arma (K.3, AM, BD) em árvores.
> Arquivos: 00 sistema · 01–03 árvores das 11 armas · 04 árvores dos 6 elementos · 05 disciplinas comuns · 06 Artes Únicas. Verificação: `sim/check_arvore.py`.

## 1. Contagem
| Parte | Árvores | Nós por árvore | Total |
|---|---|---|---|
| Armas | 11 | 30 | 330 |
| Elementos | 6 | 24 | 144 |
| Disciplinas comuns (Proteção, Socorro, Sobrevivência, Expedição) | 4 | 18 | 72 |
| Especializações de atributo | 6 | 3 | 18 |
| Ligações entre atributos (1 por par) | — | — | 15 |
| **Total de nós públicos** | | | **579** |
| Artes Únicas (escondidas, fora da árvore) | 6 famílias | 4 | 24 |

---

## 2. Atributos — cada um com uma mecânica própria
Seis atributos (FOR, DES, VIG, POT, **CON = Controle**, PER), até +60 investidos, r(x) = x/(x + 40), custo C(x) = x + x²/40 e Afinidade do núcleo v8 continuam iguais.
**Regra de ouro:** toda mecânica funciona **sem investimento** (com o valor mínimo); o atributo só melhora a conversão. Ninguém precisa de PER para defender nem de VIG para sobreviver.

| Atributo | Mecânica própria | Decisão que ela cria |
|---|---|---|
| FOR | **Pressão** (Ímpeto → impacto + Firmar o golpe) | gastar o Ímpeto em dano ou em quebra |
| DES | **Continuação dirigida** (Ímpeto → golpes rápidos que se movem) | continuar pressionando ou cancelar para fugir |
| VIG | **Firmar e Ceder** (dívida de postura) | segurar a linha agora e pagar depois |
| POT | **Sobrecarga** (até 3 cargas) | explodir agora ou economizar energia |
| CON | **Modelagem** (Expandir, Comprimir, Conduzir) | como a magia é entregue |
| PER | **Leitura e Abertura** | qual ataque ler e como cobrar a resposta certa |

### 2.1 FOR — Pressão
- Continua igual ao núcleo: o Golpe de Ímpeto multiplica o impacto por (1 + Ímpeto × (0,5 + r(FOR))/100).
- **Firmar o golpe:** segurar **+0,25 s** antes da execução converte até **20%** do dano do golpe principal em impacto extra: **I_extra = 20 × (parcela/0,20) × r(FOR)**, somado **depois** do multiplicador de Ímpeto. FOR +40 → −20% de dano, **+10 de impacto**. Continuações não mudam.
- Serve para quebrar parte, fechar quebra de postura ou interromper; é ruim contra alvo já atordoado.

### 2.2 DES — Continuação dirigida
- Dano e tempo totais das continuações iguais ao núcleo (A.4).
- Nova: durante as continuações você se **desloca** até **d = 0,5 + 1,5·r(DES) m** (DES +0: 0,5 m · +40: 1,25 m · +60: 1,40 m), dentro do tempo já orçado. Sem invulnerabilidade, respeita colisão, não atravessa chefe; defender cancela o resto.

### 2.3 VIG — Firmar e Ceder
- Com o bloqueio erguido, uma **2ª entrada** ativa **Firmar** por **1,2 s**: custo **15R**, recarga **12 s**. Não reduz dano de vida.
- Adia **f = 0,20 + 0,30·r(VIG)** do impacto recebido como **dívida de postura** (máx. **15 + 25·r(VIG)**). VIG +40 → adia 35%, dívida máx. 27,5.
- Ao sair do Firmar, a dívida cai na sua postura em **3 parcelas a cada 0,5 s** (pode quebrar você). Não some com troca de arma, cura ou fim do bloqueio.
- **Ceder** (durante o Firmar): recua até **1,5 m em 0,4 s**, larga o bloqueio e **reduz a dívida em 40%**. Sem invulnerabilidade; exige espaço.

### 2.4 POT — Sobrecarga
- Ação mágica que **gasta ≥ 15 de energia e cumpre sua função** (acertou, curou alguém ferido, protegeu alguém sob ameaça) gera **1 carga**: máx. **3**, 1 por ação, ≥ 2 s entre ganhos, expiram após **8 s** sem ação mágica válida. Ecos, efeitos derivados e reembolsos não geram carga.
- Antes de uma técnica mágica, consumir 1–3 cargas. **Por carga:** dano direto **+(0,08 + 0,12·r(POT))**, custo de energia **+20%** do custo-base, preparo **+0,10 s**. POT +40 com 3 cargas: dano ×1,42, custo ×1,60, +0,30 s.
- **Não** aumenta cura, duração de controle, redução de armadura nem geração de recursos (só técnicas que declaram uma conversão própria).

### 2.5 CON (Controle) — Modelagem
Ao preparar uma conjuração, escolher 1 modelagem (salva por técnica, trocada fora da execução). Valores com CON +0 → CON +40 → CON +60:
| Modelagem | CON +0 | CON +40 | CON +60 | Restrição |
|---|---|---|---|---|
| Expandir | raio ×1,10 | ×1,30 | ×1,34 | não aumenta alcance de cura/transferência |
| Comprimir | dano ×1,05 | ×1,15 | ×1,17 | só em ações com área; raio ×0,70 |
| Conduzir | andar a 35% | 55% | 59% | não corre, não esquiva, não bloqueia no preparo |
Fórmulas: Expandir = 1,10 + 0,40·r(CON); Comprimir = 1,05 + 0,20·r(CON); Conduzir = 35% + 40%·r(CON).
**Preparo de conjuração** (status): H_c = 1 + 0,25·r(CON), só no preparo das conjurações (DES acelera só a recuperação delas — os dois nunca aceleram o mesmo trecho).

### 2.6 PER — Leitura e Abertura
- Durante a telegrafia visível de um inimigo, **marcar** aquele ataque para Leitura (1 ativa; recarga **8 s**, cai para 2 s se o inimigo cancelar o ataque).
- **Responder certo** (parry/esquiva perfeita, interrupção na janela, bloqueio frontal sem quebrar) → **Abertura 2 s** contra aquele inimigo. A próxima ação direta consome a Abertura, escolhida na preparação:
| Uso | Efeito (fórmula) | PER +40 |
|---|---|---|
| Punir | ignora **10 + 20·r(PER)%** da armadura | 20% |
| Desmontar | **+5 + 10·r(PER)** de impacto | +10 |
| Retomar | recupera **5 + 10·r(PER)** de resistência | +10 |
- Vale para **uma ação** (não para cada acerto). Errar só perde a oportunidade.

### 2.7 Especializações de atributo (18)
3 por atributo, nos marcos **+15 / +35 / +55** (exige o atributo **efetivo**, depois da sincronia). Custam **2 PH** e ocupam **1 das 6 passivas**. No máx. **1 especialização por atributo** preparada.
| Atributo | +15 | +35 | +55 |
|---|---|---|---|
| FOR | **Golpe assentado** — Firmar o golpe custa +0,15 s em vez de +0,25 s; a conversão máxima cai para 15% | **Martelo de guarda** — Golpe de Ímpeto contra alvo bloqueando causa +50% de impacto; contra alvo sem guarda, −10% de dano | **Estilhaçar** — quebrar a postura de um inimigo devolve 15 de Ímpeto (1 vez por alvo a cada 10 s); suas continuações perdem 1 golpe (mesmo total) |
| DES | **Pés leves** — o deslocamento das continuações pode ser **para trás**; o dano total delas cai 10% quando você recua | **Corrente contínua** — esquiva perfeita durante as continuações não as cancela (1 vez por sequência); a sequência custa 5R | **Vendaval de lâminas** — continuações com Ímpeto ≥ 80 atravessam até 2 inimigos comuns no caminho (dano dividido) |
| VIG | **Muro de carne** — Firmar dura 1,6 s; a recarga sobe para 15 s | **Dívida parcelada** — a dívida cai em 5 parcelas a cada 0,6 s (mais tempo para agir); dívida máx. −20% | **Segundo fôlego** — Ceder também recupera 10R; Firmar custa 20R |
| POT | **Reator estável** — cargas expiram após 12 s em vez de 8 s; ganho mínimo entre cargas sobe para 3 s | **Descarga total** — consumir 3 cargas de uma vez dá +1 carga "fantasma" de bônus (×4 o bônus por carga), mas a energia não regenera por 4 s | **Coração de fornalha** — com 3 cargas acumuladas, sua regeneração de energia +20%; com 0 cargas, −10% |
| CON | **Mão firme** — estabilidade de conjuração +50% (stagger comum não atrasa seu preparo); Conduzir −10 pontos de velocidade | **Geometria fina** — Expandir e Comprimir podem ser combinados na mesma ação, com os dois efeitos pela metade | **Tecelão** — a 2ª conjuração diferente em até 3 s tem preparo −25% (1 vez a cada 8 s); custo +10% |
| PER | **Olho de caçador** — Leitura recarrega em 6 s; a Abertura dura 1,5 s | **Leitura dupla** — pode marcar 2 ataques ao mesmo tempo; cada Abertura vale 70% | **Presságio** — a Abertura pode ser guardada até 5 s, mas o seu uso escolhido vale 80% |

### 2.8 Ligações entre atributos (15 — 1 por par)
Custam **2 PH**, ocupam **1 das 6 passivas**, exigem **+15 efetivos nos dois** atributos, **só 1 preparada**. Desligam se a sincronia derrubar um requisito. Não geram recursos por efeitos derivados.
| Par | Ligação | Efeito e custo |
|---|---|---|
| FOR–DES | **Passagem de força** | após Golpe de Ímpeto com ≥ 70, converte até 10 do impacto principal em +0,8 m de deslocamento das continuações (troca quebra por mobilidade) |
| FOR–VIG | **Contraforte** | 1º pesado depois de Ceder elimina até 8 da dívida de postura se acertar; +8R nesse pesado; recarga 10 s |
| FOR–POT | **Núcleo de impacto** | Sobrecarga numa ação imbuída pode trocar todo o bônus de dano por +8 de impacto por carga |
| FOR–CON | **Aríete geométrico** | conjuração Comprimida causa +12 de impacto, mas dano ×0,90; recarga 6 s |
| FOR–PER | **Fratura dirigida** | Abertura em Desmontar dobra o impacto extra contra parte quebrável; o golpe perde 15% de dano |
| DES–VIG | **Retirada disciplinada** | Ceder percorre +1 m e reduz a dívida em 50% (em vez de 40%); +5R |
| DES–POT | **Descarga itinerante** | até 1 s depois de esquiva perfeita, um disparo pode consumir 1 carga sem o +0,10 s de preparo |
| DES–CON | **Condução breve** | durante Conduzir, 1 passo de 1 m por conjuração; preparo +0,15 s |
| DES–PER | **Caça à abertura** | Punir permite um passo de aproximação de até 1,5 m no preparo; a penetração cai à metade |
| VIG–POT | **Núcleo protegido** | Firmar mantém as cargas de Sobrecarga por +3 s; +10 de energia no Firmar |
| VIG–CON | **Conjuração assentada** | troca Conduzir por conjuração **imóvel** que não sofre stagger comum; custo +20% |
| VIG–PER | **Guarda informada** | bloquear o ataque marcado por Leitura reduz a dívida atual em até 10; a Abertura é consumida na hora (Retomar) |
| POT–CON | **Lente instável** | com 2–3 cargas, pode combinar Sobrecarga e Expandir com dano ×0,90 em vez de ×0,80; custo +10% |
| POT–PER | **Disparo calculado** | Punir numa magia sobrecarregada soma +10 pontos de penetração, mas consome 1 carga extra |
| CON–PER | **Janela desenhada** | interromper o ataque marcado permite reposicionar sua próxima área em até 2 m durante o preparo |

### 2.9 Como os atributos conversam (resumo)
- **FOR ↔ DES:** a mesma barra de Ímpeto vira impacto (FOR) ou golpes móveis (DES); o híbrido recebe as duas conversões.
- **VIG ↔ todos:** Firmar compra tempo para Sobrecarga (VIG–POT), para conjurar (VIG–CON), para ler (VIG–PER) e para o pesado (FOR–VIG).
- **POT ↔ CON:** POT decide **quanto** concentrar; CON decide **como** entregar. Juntos (Lente instável), concentram em área com perda.
- **PER ↔ todos:** a Abertura vira penetração (dano), impacto (quebra) ou resistência (sobrevivência) — PER é o atributo da **resposta certa**.
- Afinidade (núcleo B.1): cada mecânica alimenta o atributo dela — Firmar o golpe → FOR, continuação dirigida → DES, Firmar/Ceder → VIG, Sobrecarga consumida → POT, Modelagem usada → CON, Abertura usada → PER.

---

## 3. Status
### 3.1 Status primários (o que cada um disputa)
| Status | Fórmula (núcleo) | O que ele disputa |
|---|---|---|
| Vida | HP_camada × (1 + 0,9·r(VIG)) | quanto erro você aguenta |
| Resistência | 100 × (1 + 0,6·r(VIG)) | ataque × defesa × deslocamento × Firmar |
| Energia | 100 × (1 + 0,6·r(POT)) | frequência × área × Sobrecarga |
| Postura | 100 × (1 + 0,8·r(VIG) + 0,4·r(FOR)) | ficar no lugar sob pressão × dívida de postura |
| Reserva de cura | 600 × (1 + 0,8·r(VIG)) × s | recuperação ao longo da tentativa |
| Carga | 12 + 0,3·FOR (máx. +20) | proteção × segunda arma × material |

### 3.2 Status secundários (tetos **globais**: árvore + equipamento + consumível)
| Status | De onde vem | Regra |
|---|---|---|
| Chance crítica | equipamento e nós condicionais | base 5%; teto permanente 25%; teto condicional 40% |
| Dano crítico | equipamento e árvore | base ×1,30; teto ×1,60. **Não** aumenta impacto, estados nem elemento; 1 rolagem por ação (multigolpe inteiro) |
| Penetração | PER (Punir), técnica, equipamento | teto 35% da armadura; nunca ignora mitigação de mecânica de chefe |
| Preparo de conjuração | CON (H_c), condutor | só no preparo de conjurações |
| Recuperação de postura | VIG, equipamento, árvore | 10 × (1 + 0,40·r(VIG)) por segundo, depois de 2 s sem impacto |
| Estabilidade de conjuração | CON, forro | reduz atraso por stagger comum; não anula interrupção marcada |
| Tenacidade | VIG, forro, Sobrevivência | reduz duração de controle até 30%; não vale para mecânica obrigatória |
| Eficiência energética | condutor, árvore | redução total de custo ≤ 25%; nenhuma técnica paga menos de 5 E |
| Vazão de cura | POT, Socorro | mais vida movida por ação (gasta a mesma proporção da reserva) |
| Conservação de reserva | Socorro, equipamento | até +10% de vida por unidade de reserva |
| Proteção recebida | armadura, Sobrevivência | redução em condições explícitas; multiplicativa |
| Ameaça gerada | Proteção, equipamento | ×0,60 a ×1,60; não muda contribuição nem recompensa |
Ganho médio do crítico: 25% de chance × ×1,30 = **+7,5%** de dano médio — por isso só vem com **troca**.

### 3.3 Trocas de verdade (fabricação — alternativas para o mesmo componente)
| Escolha | Ganha | Perde |
|---|---|---|
| Gume serrilhado | +10 pp de crítico | −8% de dano não crítico |
| Ponta penetrante | 15% de penetração | −20% de impacto |
| Condutor veloz | −15% de preparo mágico | +20% de custo de energia |
| Condutor econômico | −15% de custo de energia | +15% de preparo mágico |
| Forro estável | +20% de recuperação de postura | −15% de regeneração de energia |
| Reforço de permanência | +20% de postura máxima | +3 de peso |
| Talismã de vazão | +20% de cura por ação | +25% de energia nas curas |
| Talismã de conservação | +8% de vida por reserva | curas +0,25 s de preparo |
| Nó de área | +25% de raio | −20% de dano por alvo |
| Nó de execução | +12% contra alvo quebrado | −8% contra postura > 50% |
A prévia de fabricação mostra dano médio e variação com a build atual (o gume serrilhado pode **piorar** uma build com pouco crítico).
**Fora do jogo de propósito:** acerto × esquiva numérica, 15 resistências separadas, "velocidade de tudo", sorte, roubo de vida (criaria cura fora da reserva), redução genérica de recarga.

---

## 4. Pontos de habilidade (PH), custos e pré-requisitos
- **PH(L) = 4 + (L − 1)** → nível 1: 4 · 15: 18 · 30: 33 · 60: 63 · 100: **103**. Orçamento separado dos atributos. Nada dá PH extra (conquista, temporada ou dinheiro).
- **Custos:** técnica 2 · reação 2 · passiva 1 · transformação 2 · nó-chave 3 · especialização 2 · ligação 2.
- **Uma árvore de arma inteira = 51 PH** (12×2 + 12×1 + 3×2 + 3×3); elemental inteira = **41**; disciplina inteira = **28**. No nível 100: arma + elemento = 92 → sobram 11 (ou duas armas parciais + suporte).
- **Pré-requisitos:** nós básicos domínio 1–20; desenvolvimento 20–40; transformações domínio 40; **nó-chave**: domínio 60 + **8 PH no ramo** + **2 técnicas e 2 passivas do ramo**. Domínio 70–100 dá desafios e aparência, nunca a ferramenta essencial.
- Atributo **não** bloqueia técnica pública (pode aprender uma que sua build usa mal); requisito de atributo só existe em especialização e ligação.
- Árvore elemental: domínio do elemento sobe como o de arma (tempo de combate válido usando técnicas do elemento).
- Disciplinas: sem domínio; pré-requisito por nível (nós 1–6: nível 5; 7–12: nível 20; 13–18: nível 40).

## 5. Preparação (o que vai para o combate)
| Espaço | Quantidade | Regra |
|---|---|---|
| Técnicas ativas | **8** | a Arte Única ocupa 1 delas |
| Reação | **1** | só técnicas marcadas como reação (contra-ataque, defesa especial, resgate) — nunca automática |
| Passivas | **6** | incluem especialização e ligação |
| Nós-chave | **2** | máx. 1 por árvore |
| Transformações | **3** | máx. 1 por técnica |
| Arte Única | 1 | dentro das 8 técnicas |
- Kit fundamental (sempre): leve, pesado, esquiva, bloqueio, parry, corrida, interação, Golpe de Ímpeto, Firmar.
- As 8 técnicas são compartilhadas pelos conjuntos A e B (técnica de arma só com a arma dela).
- **Revelação progressiva:** 4 espaços de técnica no início · 6 no nível 10 · 8 no nível 20 · reação depois do tutorial de reação · transformação e chave só depois de usar a técnica original.
- Controle: 2 páginas de 4 técnicas (botão de ombro) + 1 botão de reação.
- **3 preparações salvas**; trocar em Santuário, checkpoint fora de hostilidade ou entre tentativas.

## 6. Respec (decisão do Lucas: grátis no começo, depois custa)
- Grátis até a 1ª conclusão pessoal do andar 5.
- Depois: **1 carga por semana** (máx. 2) redistribui atributos **e** PH. Só uma árvore: 0,4 carga.
- Trocar técnicas, passivas e transformações **já compradas** na preparação é **grátis**.
- Mudança de balanceamento reembolsa de graça os nós afetados e os que dependem deles.
- Arena de treino: testa qualquer nó sem comprar.

## 7. Sincronia e PvP
- Técnicas e nós comprados continuam disponíveis; **requisitos** (especialização, ligação) usam os atributos **sincronizados**.
- Arena e Provação: **63 PH** (nível 60) e acesso a **todos os nós públicos** na preparação de Arena.
- PvP não dá domínio, Leitor, afinidade nem Artes (núcleo C.2).

## 8. Como a árvore conversa com o resto
| Sistema | Papel |
|---|---|
| Atributos | eficiência e as 6 mecânicas próprias |
| Árvore | quais técnicas existem e que regras elas mudam |
| Domínio de arma | familiaridade e acesso aos ramos |
| Afinidade | barateia os atributos que suas mecânicas usam (só no Santuário) |
| Leitor de Estilo | descobre Artes e dá pistas; nunca escolhe a build nem dá dano |
| Equipamento | geometria, peso e as trocas de 3.3 |
| Arte Única | 1 exceção pessoal preparada |
| Habilidade do jogador | realiza a oportunidade; passiva nenhuma faz isso por ele |

## 9. Regras contra ciclos e builds dominantes (valem para todos os nós)
1. Reembolso **não** dispara outro reembolso; custos são pagos **antes** de reembolsos.
2. Ação derivada (eco, salto, retorno, continuação) **não** gera Ímpeto, carga, Abertura nem dispara efeitos "ao acertar".
3. Um ataque inimigo sustenta **no máx. 1 recompensa de defesa por sistema** (Ímpeto, Abertura, resistência).
4. Nenhuma passiva reduz custo abaixo do piso (5 E / 5R) nem passa os tetos do núcleo (velocidade 1,45, parry técnico 240 ms, crítico 40%, penetração 35%).
5. Buffs iguais não se somam: vale o maior.
6. Toda passiva que dá algo **tira** algo (custo, tempo, alcance, outro caso); passivas "puras" só no tronco e só para regras de uso, não números.
7. **Metas de teste:** nenhuma preparação lidera ao mesmo tempo dano, segurança e objetivos; ≥ 3 preparações competitivas por função; especialista pode ganhar > 15% no encontro favorável se perde em outro; generalista ≤ 15% abaixo da melhor média; nó presente em quase todas as preparações = pedágio a corrigir.

## 10. Formato das fichas (01–05)
`K` = coeficiente de dano · `I` = impacto total da ação · tempo = preparo + execução + recuperação (fases 35/20/45% salvo indicação) · `R` resistência · `E` energia · `rec.` recarga · `s` = escala da camada (núcleo A.7) · `dom.` = domínio da arma/elemento exigido · requisito por número = nó anterior que precisa estar comprado.
Tipos: **Técnica** (2 PH) · **Reação** (2 PH, vai no espaço de reação) · **Passiva** (1 PH) · **Transformação** (2 PH) · **Nó-chave** (3 PH; exige dom. 60, 8 PH no ramo, 2 técnicas e 2 passivas do ramo).
Estrutura de toda árvore de arma: **tronco** (nós 01–06: 3 técnicas + 3 passivas, 9 PH) e **3 ramos** de 8 nós (3 técnicas + 3 passivas + 1 transformação + 1 nó-chave = 14 PH).
