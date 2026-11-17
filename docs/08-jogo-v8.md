# MMORPG — Jogo v8 (parte 2 de 3: o jogo concreto)

> **Parte 2 de 3.** Usa o **núcleo (parte 1: `08-nucleo-v8.md`)**. Os contratos entre sistemas, a precedência, o balanceamento de tempo de combate, o chefe e o andar-piloto completos, a cadeia produtiva e os catálogos estão na **parte 3: `08-contratos-v8.md`**.
> Decisões do Lucas: **zonas abertas de PvP** · **morte pesada** · lista de armas = a do plano de animações.
> Números de protótipo. `sim/check_v8.py` faz **verificações aritméticas selecionadas** (não valida o jogo inteiro — ver parte 3, AY).

## O que mudou do v6 para o v7 (parte 2)
| Seção | Correção (revisão 2 do loop 2) |
|---|---|
| K.2 | **impacto base** de leve e pesado de cada arma (faltava para Ímpeto, postura, selamento e rotas de impacto) |
| P | postura dos inimigos **não escala** por camada (núcleo A.7) |
| S / V | duelo termina em 1 HP sem derrota; dano consensual fora da atribuição; Túmulo e Infâmia com regra única (parte 3, AL) |
| X | peso de tudo; receitas não comprimem peso |
| Z | domínio por **tempo de combate válido**; avançadas mapeadas aos marcos; variações das avançadas retiradas desta versão |
| AB | Singulares **não** recomeçam na Nova Era |
| L.4 | Encaixe básico (vazio) permitido |

## O que mudou do v5 para o v6 (parte 2)
| Seção | Correção (revisão 1 do loop 2) |
|---|---|
| J.3 / L.1 | **dois conjuntos de mãos** (principal + auxiliar); escudo e armas de 2 mãos ocupam o conjunto inteiro; regras de troca |
| J.1 | fases de cada ação + multigolpe: impacto é **total da ação**, dividido entre os acertos |
| K | janelas de parry com teto técnico 240 ms; "Corte do vento"/"Machado elétrico" renomeadas (elemento é fixo do personagem); arco sem bônus de "mão livre"; fichas completas das mecânicas próprias na parte 3 AV; avançadas na parte 3 AM |
| L.3 / X | **capacidade máxima** = limite confortável + 20; materiais não podem ser largados em combate |
| M | estados separados em 3 grupos; **controle incapacitante compartilhado no PvP** (parte 3 AT) |
| O / S | Selo de Retorno com **cobertura limitada, registrada antes, e que não funciona na Fronteira**; Ferida com tratamento; reanimação = mín(30%, reserva) |
| P | Colosso 9.000 HP; elementais com 0,85 (não imunes); vidas por tempo-alvo (parte 3 AI) |
| R / AC | contratos em pacotes; promessa "nada se perde" corrigida |
| T | Assalto **repetível semanalmente**; reanimação em área; chefe do andar 1 tutorial separado |
| V | Infâmia com atribuição; saque de Túmulo 50%/8 min; Selo excluído; canal 5 min; Postos 15% (Fronteira completa na parte 3 AL) |
| AB | Nova Era com aviso, Era mínima e política de acesso (parte 3 AU) |
| AF | três contabilidades (ouro, materiais, transferências) |

## Índice
J. Execução do combate · K. Arsenal (11 armas, 66 técnicas) · L. Equipamento · M. Estados · N. Cura, suporte e reanimação · O. Consumíveis · P. Inimigos e diretor de encontros · Q. O andar · R. Missões e contratos · S. Morte e derrota · T. Grupo e Assalto · U. Guildas · V. PvP (Fronteiras e Arena) · W. Profissões · X. Inventário, peso e banco · Y. Viagem, acesso pessoal e população · Z. Domínio de arma · AA. Eventos de mundo · AB. Fim de jogo e Nova Era · AC. Cadência · AD. Primeira hora · AE. Antitrapaça · AF. Economia v5 · AG. Contra o "Toram entediante" · AH. Escopo e protótipo

---

## J. Execução do combate

### J.1 Fases de toda ação
Toda ação tem **preparo → execução → recuperação**. DES acelera só preparo e recuperação (núcleo A.2). Execução nunca acelera.
- **Buffer de entrada:** 120 ms (o comando apertado no fim de uma ação sai assim que ela termina).
- **Cancelamento:** ataque não cancela ataque durante a execução. **Defesa (esquiva/bloqueio/parry) cancela os últimos 40% da recuperação**, pagando o custo normal da defesa.
- Errar o golpe não devolve recursos. Cada ação acerta o mesmo alvo **no máximo 1 vez**, salvo indicação na ficha.
- **Fases publicadas por ação** (regra para fichas): leve = 30% preparo / 20% execução / 50% recuperação do tempo da ficha; pesado = 40/15/45; técnica = indicada na ficha, padrão 35/20/45. Ex.: leve da espada curta 0,55 s = 0,165 / 0,11 / 0,275.
- **Multigolpe** (ex.: Tempestade 0,35×4): o K por acerto é o da ficha, mas o **impacto da ficha é o total da ação**, dividido entre os acertos no mesmo alvo (Tempestade 20 de impacto = 5 por acerto). Golpes divididos em vários alvos dão o impacto do acerto a cada um.
- Ataques básicos geram pressão (aggro, afinidade), **não geram Ímpeto** (Ímpeto vem de movimento/defesa — núcleo A.4).

### J.2 Câmera, alvo e colisão
- Câmera livre em 3ª pessoa. **Trava de alvo** opcional (botão): a câmera segue o alvo; golpes corpo a corpo giram até 60° em direção a ele durante o preparo.
- Inimigos grandes (colossos, dracônicos, chefes) têm **partes** com hitbox própria: ponto fraco (×1,5 e conta para Precisão), parte blindada (×0,7), parte quebrável (ao receber X de impacto, quebra e muda o comportamento).
- Jogadores **nunca colidem** entre si (nem no PvP — ninguém empurra outro para um monstro); inimigos colidem com jogadores (dá para bloquear corredor). Empurrões de técnicas afetam jogadores só no PvP e contam como controle (parte 3 AT).
- **Câmera perto de parede:** aproxima até 1,2 m e fica semitransparente; alvo grande trava no **ponto de mira mais próximo** (parte), não no centro.
- **Arco:** alcance mínimo 3 m (mais perto, o tiro sai com 50% do dano); projétil com velocidade 60 m/s e queda leve após 25 m.
- Projéteis param em terreno; magia de área respeita linha de visão.

### J.3 Troca de arma e loadout
- **Dois conjuntos de mãos (A e B).** Cada conjunto = mão principal + mão auxiliar. Arma de 2 mãos ocupa as duas; **espada e escudo ocupa o conjunto inteiro**; duas espadas/duas katanas/dois machados contam como **uma arma** de 2 mãos. As duas configurações completas contam no peso.
- Troca **em combate**: 0,6 s, sem invulnerabilidade, recarga 6 s.
- **Na troca:** recargas de técnicas **persistem**; efeitos próprios da arma que sai **acabam** (Fluxo, Ritmo, Frenesi, carga, Marca do machado pequeno, saque carregado); armas inativas **não recuperam** recursos; **não se usa defesa da arma inativa** (o escudo guardado não bloqueia); projéteis e efeitos já lançados mantêm os números de quando saíram.
- As 6 técnicas do loadout são compartilhadas: técnica de arma só funciona com a arma dela (fica cinza com a outra).
- **3 loadouts salvos** (conjuntos + 6 técnicas + 3 modificadores + Arte). Troca de loadout só em Santuário, checkpoint fora de hostilidade ou depois de reset de tentativa (parte 3 AN).

---

## K. Arsenal

### K.1 Regra de identidade
Cada arma muda **pelo menos 2 dimensões** de decisão (posição, geometria, compromisso, defesa, ponto fraco, cooperação) e tem **1 mecânica própria** que nenhuma outra tem. Critério de teste: em 6 encontros padrão, cada arma tem 2 situações favoráveis e 2 desfavoráveis.

### K.2 As 11 armas
Valores de camada 1 (P_arma 100–120). K = coeficiente de dano (núcleo A.1). Tempos = preparo + execução + recuperação.
Dano bruto (50% leve + 50% pesado, K/tempo) de todas as armas corpo a corpo fica a **±15% da média**; quem não bloqueia bate mais forte, o arco (30 m) bate menos — conferido em `sim/check_v5.py`.

| Arma | Mãos | Alcance | Leve K / tempo | Pesado K / tempo | Bloqueio | Mecânica própria |
|---|---|---|---|---|---|---|
| **Desarmado** | 2 | 1,4 m | 0,45 / 0,45 s | 1,10 / 0,95 s | sim (−20% eficiência) | **Fluxo + Agarrão** |
| **Espada curta** | 1 | 1,8 m | 0,55 / 0,55 s | 1,25 / 1,00 s | sim | **Flanco** |
| **Espada longa** | 1 ou 2 | 2,3 m | 0,62 / 0,68 s | 1,45 / 1,20 s | sim | **Guarda alta/baixa** |
| **Duas espadas** | 2 | 2,0 m | 0,40×2 / 0,70 s | 1,30 / 1,10 s | **não** (só parry/esquiva) | **Ritmo** |
| **Espada e escudo** | 1+escudo | 2,0 m | 0,58 / 0,65 s | 1,35 / 1,15 s | **escudo 180°** | **Muralha** |
| **Katana** | 2 | 2,4 m | 0,65 / 0,62 s | 1,50 / 1,10 s | **não** | **Bainha (saque)** |
| **Duas katanas** | 2 | 2,2 m | 0,42×2 / 0,72 s | 1,35 / 1,15 s | **não** | **Fio duplo** |
| **Machado grande** | 2 | 2,6 m | 0,85 / 1,00 s | 1,90 / 1,70 s | sim (+30% eficiência) | **Carga** |
| **Machado pequeno** | 1 | 1,7 m | 0,58 / 0,60 s | 1,25 / 1,05 s | sim | **Arremesso e Marca** |
| **Dois machados** | 2 | 1,8 m | 0,38×2 / 0,66 s | 1,25 / 1,05 s | **não** | **Frenesi** |
| **Arco** | 2 | 30 m | 0,55 / 0,70 s | 1,50 / 1,20 s (tensão) | **não** | **Tensão** |

**Impacto base (I) de leve / pesado** (antes de FOR/CON e Ímpeto, núcleo D.2; não escala por camada):
| Desarmado | Espada curta | Espada longa | Duas espadas | Espada e escudo | Katana | Duas katanas | Machado grande | Machado pequeno | Dois machados | Arco |
|---|---|---|---|---|---|---|---|---|---|---|
| 8 / 22 | 9 / 22 | 10 / 26 | 6×2 / 22 | 10 / 24 | 9 / 24 | 6×2 / 22 | 15 / 40 | 10 / 24 | 6×2 / 24 | 6 / 12 (tensão máx. 18) |

**Mecânicas próprias (números):**
- **Fluxo (desarmado):** golpes encadeados em **direções diferentes** (frente, lado, baixo, giro) somam Fluxo 0–5; cada nível +6% de impacto; repetir a mesma direção zera. **Agarrão:** único que agarra — contra inimigo de porte igual ou menor com postura < 50%: arremesso de 4 m, 40 de impacto, e o alvo arremessado atinge outros (colisão).
- **Flanco (espada curta):** golpe nas costas/lado do alvo (fora do cone frontal de 120°) = +30% dano e +20% Precisão. Passo lateral curto (1,2 m) depois de cada leve.
- **Guarda alta/baixa (espada longa):** troca instantânea de postura. Alta = +0,4 m de alcance, pesado mais forte (K 1,60), mais lenta (+10%). Baixa = mais rápida (−10%), parry +20 ms (dentro do teto técnico de 240 ms). A guarda muda o moveset inteiro (2 combos diferentes).
- **Ritmo (duas espadas):** alternar golpes esquerda/direita sem errar enche o Ritmo; a cada 4 alternados, o 5º é um **corte cruzado** (K 1,0, impacto 25). Errar ou levar golpe zera. Sem bloqueio → depende de esquiva/parry.
- **Muralha (espada e escudo):** bloqueio frontal de 180° com custo de resistência −25%. Segurando bloqueio parado, cria **cone de proteção de 60° e 3 m atrás** de você: aliados ali recebem 30% menos dano de projétil/área frontal. Golpe de escudo: impacto 30, sem dano.
- **Bainha (katana):** guardar a katana (0,4 s) e segurar = carrega saque até 1,2 s. **Saque**: corte em linha 4 m, K 1,2 → 2,0 conforme a carga. **Saque de resposta:** soltar o saque no momento em que um golpe chega é um parry com janela comum **+40 ms** (teto técnico 240 ms) seguido do corte; soltar fora da janela = saque normal e você leva o golpe. **Nunca é automático.** Sem bloqueio.
- **Fio duplo (duas katanas):** parry com as duas lâminas = **contra-ataque duplo** imediato (2 × K 0,6). Esquiva curta (2 m, i-frame 0,24 s em vez de 0,30) mas mais barata (−30% resistência).
- **Carga (machado grande):** pesado carregável em 3 níveis (0,5 / 1,0 / 1,5 s a mais): K 1,9 / 2,4 / 3,0; a partir do nível 2, **sem stagger comum** enquanto carrega (leva o dano normalmente). Bloqueio pesado mais eficiente.
- **Arremesso e Marca (machado pequeno):** arremesso até 12 m, volta sozinho em 1,5 s (sem arma na mão enquanto isso; golpes desarmados). O alvo acertado fica **marcado** 6 s: seus golpes nele +25% impacto. Só 1 marca por jogador.
- **Frenesi (dois machados):** cada acerto +3% de velocidade (máx. +15%, conta com o teto de 1,45 da velocidade); levar golpe ou 2 s sem acertar zera.
- **Tensão (arco):** segurar o pesado aumenta o dano de K 1,0 → 1,5 em 1 s; segurar mais de 2 s treme (Precisão −50%). Mira livre; tiro em ponto fraco conta Precisão. **Flechas são munição** (consumível barato, 99 por pilha; tipos com efeito: perfurante, contusiva, elemental). Rolamento para trás de 3 m.

**Magia em qualquer arma:** todos têm 1 elemento (núcleo D.3). Canalizar na arma (imbuir), disparar pela arma e conjurar existem para todas as armas por técnicas. **Desarmado** conjura 15% mais rápido (mãos livres); armas de 2 mãos imbuem 10% mais forte. Toda técnica "elemental" usa **o elemento do personagem** (os nomes abaixo são de animação).

### K.3 Técnicas públicas (6 por arma; mais 6 avançadas no domínio 60–100, seção Z)
Formato: **K / impacto · tempo / recarga · custo** — decisão. Custos em resistência salvo "en" (energia). Toda técnica tem **etiqueta de papel** (Co Contenção, Ru Ruptura, Su Sustentação, Ex Execução).

**Desarmado** — 1) Investida de ombro 0,6/30 · 0,7/7 s · 15 — avança 3 m, empurra [Ru] · 2) Rasteira 0,4/25 · 0,6/9 · 12 — derruba comum 1,2 s [Ru] · 3) Contra-golpe 0,9/20 · postura 0,5 s/8 · 10 — se atingido durante a postura, recebe 50% do dano e devolve (não é parry) [Ex] · 4) Palma elemental 1,0/18 · 0,8/5 · 18 en — imbuir, empurra 2 m [Ex] · 5) Arremesso de grupo 0,5/35 · 1,1/14 · 20 — agarrão que derruba até 3 em volta [Ru] · 6) Respiração de fluxo 0/0 · 1,0/16 · 0 — recupera 30 resistência, mantém Fluxo [Su]
**Espada curta** — 1) Passo de sombra 0,7/10 · 0,6/7 · 15 — teleporta 3 m para as costas do alvo (não chefe: 1,5 m lateral) [Ex] · 2) Corte baixo 0,6/15 · 0,6/6 · 10 — reduz movimento do alvo 30% por 3 s [Co] · 3) Estocada furtiva 1,3/10 · 0,8/8 · 15 — +50% se o alvo não está te mirando [Ex] · 4) Lâmina venenosa 0,8/8 · 0,7/6 · 15 en — imbuir; dano contínuo 30% em 6 s [Ex] · 5) Distração 0/0 · 0,4/14 · 10 — joga sua ameaça 50% para o aliado mais próximo [Su] · 6) Corte de aparar 0,5/25 · postura 0,3/9 · 12 — parry (janela comum) que já sai cortando [Co]
**Espada longa** — 1) Corte de avanço 0,8/12 · 0,8/5 · 12 — avança 2 m [Ex] · 2) Guarda de passagem 0,35/15 · 0,9/8 · 15 — bloqueio frontal 0,35 s + passo lateral 1,5 m [Co] · 3) Corte de flanco 1,0/15 · 0,85/6 · 15 — +20% no flanco, −20% contra frente protegida [Ex] · 4) Interceptação 0,55/30 · 0,75/9 · 15 — interrompe preparo marcado [Ru] · 5) Lâmina imbuída 1,2/18 · 1,05/5 · 20 en — elemento pelo vetor de arma [Ex] · 6) Cobertura 0/0 · 0,5/12 · 15 — 2 s interceptando ataque direto contra aliado a 2 m [Su]
**Duas espadas** — 1) Tempestade 0,35×4/20 · 1,2/9 · 20 — 4 cortes em círculo [Ex] · 2) Cruz ascendente 0,9/30 · 0,9/8 · 18 — joga comum para o alto 1 s [Ru] · 3) Dança de lâminas 0,3×3/12 · 1,0/7 · 15 — move-se 4 m cortando [Ex] · 4) Gume duplo elemental 1,1/16 · 0,9/6 · 22 en — cada mão um impacto; elemento 1× [Ex] · 5) Defesa giratória 0/0 · 0,8/12 · 15 — 0,8 s desviando projéteis frontais [Co] · 6) Ritmo sustentado 0/0 · 0,3/20 · 10 — por 6 s levar golpe não zera o Ritmo [Su]
**Espada e escudo** — 1) Golpe de escudo 0,3/40 · 0,7/8 · 15 — interrompe preparo marcado [Ru] · 2) Provocação 0/0 · 0,5/20 · 10 — Provocar do núcleo (110%, 3 s) [Co] · 3) Investida de escudo 0,5/35 · 0,9/10 · 20 — avança 4 m bloqueando de frente [Co] · 4) Escudo refletor 0/0 · postura 0,4/12 · 15 — devolve projétil de comum (de elite/chefe: bloqueia com custo 0) [Co] · 5) Lâmina sagrada 1,1/15 · 1,0/6 · 20 en — imbuir; aliados a 3 m ganham 5 Ímpeto [Su] · 6) Firmeza 0/0 · 3 s/18 · 0 — postura máxima +40% e movimento −50% [Co]
**Katana** — 1) Iai rápido 1,0/15 · 0,5/6 · 15 — saque sem carga [Ex] · 2) Lâmina projetada 0,8/12 · 0,8/7 · 18 en — disparo: lâmina do seu elemento 10 m [Ex] · 3) Leitura 0/0 · 1,0/12 · 10 — 1 s em que o próximo parry tem janela +60 ms (teto 240) [Co] · 4) Lua crescente 1,2/25 · 1,0/9 · 18 — arco de 180° [Ru] · 5) Passo do relâmpago 0,9/10 · 0,6/10 · 20 — atravessa 5 m cortando tudo na linha [Ex] · 6) Bainha sagrada 0/0 · 0,8/16 · 0 — enquanto guardada, regen de resistência ×2 [Su]
**Duas katanas** — 1) Tesoura 1,2/20 · 0,8/7 · 18 — dois cortes que se cruzam no mesmo ponto [Ex] · 2) Espelho 0/0 · postura 0,4/10 · 15 — parry (janela comum +30 ms, teto 240) que reflete 50% do impacto [Co] · 3) Rodopio 0,4×3/15 · 1,0/8 · 18 — área 2 m [Ex] · 4) Fio elemental 0,7×2/12 · 0,9/6 · 22 en — imbuir alternado [Ex] · 5) Corte que segue 0,9/10 · 0,7/9 · 15 — persegue alvo que fugiu até 6 m [Ex] · 6) Postura da garça 0/0 · 2 s/18 · 0 — esquivas sem custo por 2 s [Su]
**Machado grande** — 1) Terremoto 1,4/45 · 1,6/10 · 25 — área 3 m, derruba comuns [Ru] · 2) Golpe de cabo 0,4/30 · 0,6/8 · 12 — rápido, interrompe preparo marcado [Ru] · 3) Giro pesado 1,2/35 · 1,4/9 · 22 — 360°, sem stagger comum [Ex] · 4) Lâmina flamejante 1,6/30 · 1,6/8 · 30 en — imbuir carregável [Ex] · 5) Desafiar 0/0 · 0,8/20 · 10 — atrai até 5 inimigos comuns [Co] · 6) Rachar armadura 0,9/20 · 1,1/12 · 18 — −40·s de armadura no alvo 8 s (não acumula com Fogo: vale a maior) [Su]
**Machado pequeno** — 1) Arremesso duplo 0,6×2/12 · 0,9/8 · 15 — dois alvos [Ex] · 2) Gancho 0,5/20 · 0,7/10 · 15 — puxa comum 4 m até você [Co] · 3) Quebra-escudo 0,8/40 · 0,9/9 · 18 — contra guarda frontal: quebra 2 s [Ru] · 4) Machado imbuído 0,9/15 · 0,8/6 · 18 en — arremesso com seu elemento; salta para 1 alvo extra [Ex] · 5) Marca do caçador 0/0 · 0,3/14 · 10 — marca dura 12 s e o grupo ganha +10% impacto no alvo [Su] · 6) Retorno cortante 0,7/10 · —/— · 0 — passivo: o machado que volta acerta no caminho [Ex]
**Dois machados** — 1) Moedor 0,3×5/20 · 1,3/10 · 20 — avança 3 m [Ex] · 2) Salto selvagem 1,1/30 · 1,0/9 · 20 — salta 5 m em área [Ru] · 3) Corte em X 1,0/25 · 0,8/7 · 15 — +Frenesi 2 níveis [Ex] · 4) Fúria elemental 0,8×2/15 · 1,0/7 · 22 en — imbuir [Ex] · 5) Grito de guerra 0/0 · 0,6/18 · 10 — aliados a 6 m +10% velocidade 5 s (não soma com Frenesi do próprio) [Su] · 6) Sem parar 0/0 · 4 s/20 · 0 — Frenesi não zera ao levar golpe [Ex]
**Arco** — 1) Chuva de flechas 0,3×8/10 · 1,5/12 · 20 — área 4 m a até 25 m [Ex] · 2) Tiro perfurante 1,4/15 · 1,2/8 · 18 — atravessa a linha [Ex] · 3) Tiro de atordoar 0,4/35 · 1,0/10 · 18 — interrompe preparo marcado à distância [Ru] · 4) Flecha elemental 1,3/14 · 1,1/6 · 22 en — disparo pela arma [Ex] · 5) Armadilha 0,5/30 · 1,0/14 · 15 — prende comum 2 s [Co] · 6) Flecha de cura 0/0 · 1,0/12 · 25 en — move 120·s da reserva de cura do aliado para a vida dele [Su]

**Técnicas mágicas (qualquer arma, por elemento):** cada elemento tem 3 conjurações públicas — **Projétil** (K 1,4, 15 m, 1,0 s, 20 en, recarga 3 s), **Área** (K 1,6, 3 m, 1,6 s, 30 en, recarga 8 s), **Utilidade** (tabela). São técnicas como as outras (ocupam espaço). Utilidades **não acumulam** consigo mesmas (1 ativa por jogador).
| Utilidade | Efeito | Custo / recarga / duração | Limite e resposta de chefe/PvP |
|---|---|---|---|
| Fogo: muralha de chamas | linha 4 m que corta passagem; 6%/s de vida a quem atravessa | 25 en / 14 s / 5 s | chefe atravessa sem dano; PvP: 3%/s |
| Gelo: chão escorregadio | área 3 m, movimento −40% | 25 en / 14 s / 5 s | chefe: só nos ataques marcados compatíveis; PvP conta como Lento |
| Raio: corrente | 0,5 K salta 3 alvos, interrompe conjuração de comum | 20 en / 10 s / instantâneo | chefe: interrompe só conjurações marcadas |
| Terra: pilar | pilar 1,5 m (vida 30% da sua) que bloqueia projéteis e é **obstáculo de colisão** | 30 en / 18 s / 6 s | **1 pilar ativo** por jogador; colisão de chefe só nos ataques marcados de investida |
| Vento: rajada | cone 5 m, empurra 5 m | 20 en / 12 s / instantâneo | chefe não é empurrado; PvP conta como deslocamento forçado |
| Água: bolha | move até **200·s** (200 na camada 1) de reserva de cura entre 2 aliados a 8 m | 25 en / 12 s / instantâneo | só participantes da mesma tentativa |

---

## L. Equipamento

### L.1 Espaços
**Conjunto de mãos A** · **conjunto de mãos B** (J.3) · cabeça · tronco · mãos · pernas · pés · **2 acessórios** (anel, amuleto) · **foco elemental** (pedra que define o elemento e suas 3 conjurações; trocar de foco **não** troca o elemento — elemento é fixo do personagem).

### L.2 Armaduras: 3 classes
| Classe (conjunto completo, camada 1) | Armadura A | Peso | Efeito próprio |
|---|---|---|---|
| Leve | 40 | 4 | esquiva perfeita +20 ms na janela |
| Média | 85 | 9 | nenhum (sem penalidade) |
| Pesada | 140 | 16 | postura máxima +20%; esquiva custa mais (peso) |
Escala por camada: A × 1,09^(c−1). Pode misturar peças (cada peça = 1/5 do conjunto).

### L.3 Peso e carga (liga com núcleo A.3 e D.1)
- **Limite confortável = 12 + 0,3 × FOR investida** (FOR +60 → 30).
- Peso total = armaduras + armas (1 a 6 cada) + **materiais carregados** (X.2).
- **L = limitar((peso − limite) / 10, 0, 1)** → entra no movimento (núcleo A.3).
- **Capacidade máxima = limite confortável + 20.** Acima dela você **não recolhe, não recebe e não compra** materiais (nem do Túmulo, nem por troca). FOR +60 → confortável 30, máximo 50.
- **Largar material:** só fora de combate (1 s por pilha). Em combate não dá para se livrar do peso.
- **Custo de esquiva = 20 × (1 + peso/40)** (peso 16 → 28).
- Assim FOR decide se você aguenta armadura pesada **e** carregar material — liga combate, coleta e morte pesada.

### L.4 Fabricação de armadura e acessório
Armadura = 4 componentes, como a arma (núcleo F.1): **Base** (material: A e peso) · **Forro** (resistência elemental: até ±15% contra 1 elemento) · **Reforço** (troca peso por A) · **Encaixe** (opcional: **vazio/básico** sem material raro; efeitos de regra do catálogo de 12 na parte 3, AR.2, exigem material de Fenda ou Eco).
**Acessórios mudam regras pequenas, não dão "+5%"** (exemplos): Anel do Primeiro Passo (começa o encontro com 20 Ímpeto; recarga interna 30 s, parte 3 AN) · Amuleto da Brasa (Golpe de Ímpeto aplica o elemento mesmo sem imbuir) · Anel do Vigia (telegrafias de comuns aparecem 0,1 s antes) · Amuleto do Peso Certo (+4 no limite confortável) · Anel do Mensageiro (reanimar aliado 25% mais rápido). Cada acessório tem 1 efeito; máx. 2 equipados; mesmo efeito não acumula.

---

## M. Estados (regras comuns)
Três grupos com regras diferentes:
1. **Controle** (Atordoado, Derrubado, Preso, Silêncio, agarrão, deslocamento forçado): **resistência decrescente** por estado — depois de sofrer, 8 s com 50% da duração para o mesmo estado; o 3º no período = imune. **No PvP**, todos os controles incapacitantes dividem **uma só categoria** (parte 3, AT).
2. **Periódicos** (Queimando, veneno, Lento, Exposto): não têm resistência decrescente; **não acumulam da mesma fonte** — reaplicar renova a duração.
3. **Penalidade persistente** (Ferido): regra própria (S.2), sem resistência e sem limpeza por técnica.
Chefes têm resistência própria (só nas janelas de abertura).

| Estado | Efeito | Duração base | Quem causa |
|---|---|---|---|
| Atordoado | não age | 2 s (quebra de postura) | postura zerada |
| Derrubado | no chão, levanta com esquiva | 1,2 s | rasteira, terremoto |
| Lento | movimento −30 a −40% | 3 s | corte baixo, gelo |
| Preso | não se move, pode atacar | 2 s | armadilha |
| Silêncio | não conjura | 3 s | inimigos conjuradores/elites |
| Queimando/veneno | dano contínuo | 6 s | técnicas que declaram (Lâmina flamejante, Lâmina venenosa) |
| Exposto | +20% dano recebido | 4 s | elites, Arte |
| Ferido | −10% vida máxima (acumula 3) | 10 min | derrota (S) |
Limpeza: consumível "Tônico limpo" ou técnica Água remove 1 estado (exceto Ferido).

---

## N. Cura, suporte e reanimação
- Cura **move vida da reserva de cura do alvo** (núcleo D.6) — não cria vida do nada. Fontes: técnicas [Su], Água, consumíveis (O), Flecha de cura.
- Suporte sem cura: Cobertura, Muralha, Grito de guerra, Marca do caçador, Terra (barreira de postura), Lâmina sagrada.
- **Reanimação** (S.1): qualquer jogador, 4 s, interrompível; Anel do Mensageiro acelera. Volta com **mín(30% da vida máx.; reserva disponível)**; exige ≥ 5% da vida máx. na reserva — a interface mostra antes quando é inviável (aí só o Chamado de Resgate, parte 3 AI.4).

---

## O. Consumíveis
- **Cinto de 4 espaços** (o que leva para o encontro); recarga compartilhada de 2 s entre itens.
- **Poção** (fabricada por Alquimia): move **250·s** (250 na camada 1) da sua reserva de cura para a vida em 1 s (não cria vida); máx. 5 por **tentativa** de chefe (parte 3 AN).
- **Tônico de resistência:** +40 resistência imediata. **Tônico limpo:** remove 1 estado.
- **Óleo elemental:** sua arma aplica outro elemento por 60 s (só os efeitos de dano, não as Utilidades); 1 por encontro de campo / 1 por tentativa de chefe (parte 3, AN).
- **Bomba:** impacto 50 em 3 m, sem dano (ruptura para quem não tem FOR).
- **Comida** (Culinária): 1 bônus de 30 min **de regra**, não de número (ex.: "primeira esquiva perfeita de cada encontro vale dobrado de Ímpeto"; "+2 no limite de carga").
- **Selo de Retorno (seguro limitado):** **ativado antes** (fora de combate; leva 3 s), cobre **até 15 unidades de peso** de material escolhidas por você (o resto segue a regra normal). Preço: reagente de NPC de **8% de B(c)** + o material da receita; só é consumido se a derrota acontecer. **Não funciona na Fronteira** nem com Infâmia. Recarga de **30 min** depois de consumido; não ativa com 2+ Feridas.
- **Flechas** (munição).

---

## P. Inimigos

### P.1 As 12 famílias (o que cada uma exige de você)
| Família | Função no encontro | Comportamento-chave (camada 1) | Resposta | Material |
|---|---|---|---|---|
| Feras | caçador móvel | avanço 5 m, aviso 0,70 s, 140 dano | esquiva, interceptar, obstáculo | couro/presas (Flexibilidade) |
| Insetos | enxame | 6–10 fracos (180 HP) + 1 rainha que acelera os outros | área, focar a rainha | quitina (Dureza) |
| Constructos | guardião frontal | guarda 120° (−50%), investida aviso 1,10 s | flanquear, romper, colisão | metal (Densidade) |
| Mortos-vivos | sustentador | levantam 1× após morrer se não forem "selados" (golpe de impacto ≥ 30 no corpo) | selar, impacto | essência (Condutividade) |
| Elementais | conjurador | conjuração 1,6 s a cada 7–10 s, área 2,5 m; **0,85** contra o próprio elemento (sem imunidade) | interromper, elemento oposto | núcleo elemental |
| Aquáticos | emboscada | submersos até atacar; puxam para a água (lento) | percepção (PER), ficar fora da margem | escamas |
| Aviários | artilheiro aéreo | só descem para atacar; ficam no ar 6 s | arco/disparo, derrubar no mergulho (parry) | penas (Flexibilidade) |
| Humanoides | grupo tático | 3–4 com papéis (escudo, arqueiro, curandeiro); trocam de alvo | prioridade de alvo | equipamento desmontável |
| Plantas | controle de área | raízes prendem; não se movem; regeneram 2%/s fora de combate | distância, fogo, matar rápido | fibras/resinas |
| Dracônicos | elite natural | 2 fases; sopro em cone com aviso 1,5 s; partes quebráveis | partes, posicionamento | escamas raras |
| Sombras | predador furtivo | invisíveis até 6 m (PER aumenta a distância de revelação) | PER, luz (fogo), costas na parede | pó de sombra |
| Colossos | gigante | **9.000 HP** (grupo de 4: ~32 s de dano, parte 3 AI); pernas quebráveis (1.500 de dano de impacto cada) derrubam (6 s de abertura) | quebrar partes, coordenação | núcleo colossal |

Escala: **vida e dano × 1,09^(c−1); postura e impacto não escalam** (núcleo A.7). Vidas de comuns por família: tabela da parte 3 (AI.2); elites/chefes de campo escalam com o grupo: **× (1 + 0,6·(n−1))**. Matriz família × arma: parte 3, AJ. Cada andar usa **3–4 famílias**; cada camada apresenta 1 família nova e 1 **variante regional** (mesma família com 1 regra diferente).

### P.2 Comportamento (IA)
Estados: **Patrulha → Alerta** (viu/ouviu; 1,5 s para reagir, PER do jogador reduz a detecção) **→ Combate → Recuo** (com < 20% HP, comuns com instinto fogem para chamar ajuda; dá para impedir) **→ Volta** (passa 40 m da área: volta e regenera).
- Escolha de ataque por distância + posição do alvo + cooldown; nunca 2 ataques fortes seguidos no mesmo alvo.
- Coordenação: no máx. **2 inimigos atacam o mesmo jogador ao mesmo tempo** (os outros circulam) — exceto enxames.
- **Elite** = 1 regra extra visível (ícone), **vida × 3** do comum (tempo-alvo solo 25–40 s, parte 3 AI), +30% postura (ex.: constructo elite reposiciona a guarda após a 1ª exposição de flanco).

### P.3 Diretor de encontros
- Orçamento por encontro de campo (no chefe: por onda de adds) = 4 pontos por jogador (grupo de 4 → 16). Custos: comum 1 · especialista (conjurador/artilheiro/sustentador) 1,5 · elite 3.
- Regras: máx. 2 áreas de negação simultâneas; um comum não inicia controle incapacitante no mesmo jogador por 3 s após o anterior; **toda composição deixa ao menos uma saída** (movimento, defesa ou interrupção).
- O diretor **varia as combinações** (não os números): a mesma build precisa mudar ordem de alvos/posição/recursos em ≥ 4 de 6 composições (teste).

### P.4 Chefes (além do Chefe de Andar)
- **Chefe de campo:** aparece em ponto fixo a cada 2 h; aberto (qualquer um no canal); recompensa por participação.
- **Mini-chefes do labirinto:** 1 por rota; guardam o checkpoint.
- **Chefe errante** (AA): evento.
- Todo chefe tem **HP + mecânica**, mas a mecânica varia por andar (Q.3) — âncoras são **um** dos 6 tipos, não o molde de todos.
- **Adaptação abre oportunidade** (corrige núcleo E.3): quando o chefe adapta contra a resposta dominante do grupo, a nova sequência sempre expõe uma abertura (ex.: quebra-guarda contra bloqueadores deixa o flanco aberto por 1,2 s). Quem provocou a adaptação pode explorá-la.

---

## Q. O andar

### Q.1 Partes de um andar
| Parte | Tipo | Conteúdo | Tempo médio (1ª vez, camada 1) |
|---|---|---|---|
| **Cidade** | segura, compartilhada | Santuário, banco, mercado, profissões, quadro de contratos, portal | — |
| **Campo** (2–3 zonas) | aberto, canais | 3–4 famílias, nós de coleta, chefe de campo, missão do andar | 2–3 h |
| **Fronteira** (1 por camada, em 1 andar) | aberto, **PvP** (V) | nós de alta pureza, Fendas | opcional |
| **Labirinto** | instância 1–6 | 3 rotas, 2 checkpoints, mini-chefes | 1–1,5 h |
| **Sala do chefe** | Assalto (T.2) ou instância | Chefe de Andar | 10–20 min |
Andar inteiro da 1ª vez: ~4–6 h na camada 1, ~8–10 h na camada 10.

### Q.2 Labirinto com 3 rotas
**Direta** (curta, mais elites e armadilhas) · **Longa** (mais coleta e baús de material) · **Técnica** (mecanismo ambiental: alavancas, plataformas, luz/sombra — favorece PER e mobilidade). O grupo escolhe; o mini-chefe de cada rota é diferente. Labirinto muda **1 trecho por semana** (corredores alternativos) para o mapa não virar decoreba completa.

### Q.3 Matriz de tipos de andar (contra "100 corredores")
Cada andar tem 1 **regra de bioma** e 1 **tipo de objetivo**; nenhuma combinação se repete numa camada.
**Regras de bioma** (exemplos): escuridão (visão 15 m; fogo ilumina) · frio (resistência regenera −30% longe de fogueiras) · baixa gravidade (saltos 2×, quedas sem dano) · maré (zonas alagam a cada 10 min) · tempestade (raio cai em quem está em lugar alto) · neblina tóxica (−1% HP/s fora de áreas purificadas por Água/Vento).
**Tipos de objetivo do andar** (o que libera a sala do chefe): Reconhecimento (mapear 3 pontos) · Perseguição (caçar um elite que foge entre zonas) · Travessia (escoltar um mecanismo) · Controle territorial (manter 3 totens ao mesmo tempo, grupo grande) · Resgate (encontrar NPCs perdidos no labirinto) · Expedição logística (levar material pesado até a sala — peso importa).
**Tipos de chefe** (6): Âncoras (núcleo E.2) · Partes quebráveis (colosso) · Arena que muda (o chão cai em fases) · Duplo (dois chefes que se curam se ficarem perto) · Perseguição (o chefe foge pelo labirinto e você o encurrala) · Cerco (proteger um ponto enquanto ondas + chefe atacam).

---

## R. Missões e contratos
- **Missão do andar** (1 por andar, única): ensina a regra de bioma e a família nova; recompensa: XP + 1 componente de receita.
- **Quadro de contratos** (núcleo G.1: 8 por dia por conta): gerados por andar, **8 tipos** — Caça (abater X de uma função) · Coleta (material com propriedade mínima) · Entrega (levar peso de A a B) · Escolta · Selamento (mortos-vivos) · Limpeza (ninho de insetos/plantas) · Reconhecimento (visitar pontos) · Abate de elite. Vários contratos **avançam na mesma expedição** (sobreposição de propósito).
- **Pedidos de jogadores:** qualquer jogador publica um contrato pagando com o próprio ouro (transferência, não cria ouro) — ex.: "50 quitina com Dureza ≥ 60".
- **Sessão de referência:** 2 h/dia; contratos pagam **17,5% de R por contrato** (camada 1: 152,25); 8 contratos ≈ 96 min, sobrepostos com coleta e objetivos.
- **Pacotes contra sobreposição excessiva:** o quadro oferece contratos em **pacotes de 2–3** com objetivos que **não podem ser cumpridos pela mesma ação** (cada abate, entrega ou ponto conta para **1 contrato só**, à escolha do jogador). Uma expedição de 30 min completa no máximo 3 contratos.

---

## S. Morte e derrota (decisão do Lucas: pesada)

### S.1 Caído e reanimação
0 HP → **caído** até 25 s (pode se arrastar 1 m/s). Aliado reanima em 4 s (interrompível) → volta com **mín(30% HP; reserva disponível)**, tirados da reserva de cura do caído (mínimo 5%; senão só Chamado de Resgate). Máx. 2 reanimações por jogador por tentativa de chefe de 6; no Assalto, regra própria (parte 3, AI.4). Passou 25 s ou grupo todo caído → **derrota**.

### S.2 Derrota (o que se perde)
| Perda | Valor | Observação |
|---|---|---|
| XP | **10% do XP do nível atual** | nunca perde nível |
| Materiais carregados | **50%** caem num **Túmulo** no local | equipados e banco nunca caem |
| Durabilidade | −10% extra no equipamento | entra no ralo de manutenção |
| Ferida | −10% vida máxima por 10 min (acumula até 3) | **custo de insistir** (não é proteção): **tratamento** grátis em Santuário (30 s) ou com Bandagem de Alquimia; a interface mostra as Feridas antes de reentrar |
- **Túmulo:** fica 30 min; você ou seu grupo **no momento da derrota** recupera tudo (respeitando a capacidade de quem recolhe). Na Fronteira valem as regras fechadas da parte 3, AL.2 (dono, grupo e terceiros). Túmulo de PvE: se você não quer enfrentar o mesmo obstáculo, o **Recolhedor** do Santuário traz o Túmulo por **30% do conteúdo** (ralo de material) após 10 min.
- **Selo de Retorno** (O): protege só o que foi coberto antes, fora da Fronteira.
- **Causa da derrota:** se jogadores causaram dano ou controle **hostil válido da Fronteira** em você nos últimos **30 s**, a derrota é **PvP** (mesmo que o monstro dê o último golpe): sem perda de XP, regras de V.2. **Dano de duelo e de Arena nunca conta** para essa atribuição.
- **Retorno protegido:** você reaparece fora de qualquer área de combate; morrer de novo em até 60 s no ponto de retorno (antes de atacar ou coletar) **não** gera nova perda.
- **Protegidos** (novatos até o andar 3, núcleo G.2): perdem metade (5% XP, 25% materiais).
- Volta: checkpoint mais próximo; tempo até voltar a lutar ≤ 90 s (aprender não vira caminhada).
- Dentro do labirinto, derrota coletiva reinicia o encontro, não o labirinto (checkpoints mantêm progresso).

### S.3 Por que pesada funciona aqui
A perda é sobre o que você **arriscou carregar**, e o peso (L.3) já faz o jogador escolher entre levar mais material (lucro, mas lento e arriscado) ou voltar ao banco. Isso transforma cada expedição numa decisão — e alimenta as Fronteiras PvP.

---

## T. Grupo e Assalto
### T.1 Grupo
6 jogadores. **Busca de grupo** mostra capacidades (proteção, interrupção, alcance, sustentação, ruptura) pelas etiquetas das técnicas, **nunca bloqueia por papel ou DPS**. Desconexão reserva a vaga 3 min. Substituição só em checkpoint. **Saque pessoal** em PvE (cada um recebe o seu; não existe disputa por item). Recompensa por participação (dano, objetivos, suporte, mitigação), sem DPS mínimo.

### T.2 Assalto ao Chefe de Andar (SAO)
- **Primeira abertura** do andar = **Assalto**: 2 a 4 grupos (12–24 jogadores). Chefe de Assalto tem mecânicas que **exigem grupos em lugares diferentes** (ex.: 2 âncoras longe uma da outra). Fichas de 6/12/24, vida, alas e reanimação: **parte 3, AI e AO**.
- **Assalto repetível:** depois da abertura, o Assalto de cada andar fica disponível **1× por semana por personagem** (recompensa de Operação de guilda e material de Encaixe), além da instância de 6.
- **Andar 1:** o chefe **tutorial** (AD) é uma instância própria de 1–6, sempre disponível; o Chefe de Andar 1 do servidor é um Assalto normal.
- **Conselho do Assalto:** qualquer jogador convoca; organiza grupos e funções no mapa da sala; pode marcar alvos.
- Depois da abertura: o mesmo chefe em **instância de 6** (versão de 6 com mecânicas reduzidas) para quem chega depois (Y.2).
- Recompensa do pioneiro: registro público + cosmético + título do andar.

---

## U. Guildas
- Até **60 membros**; cargos configuráveis; banco de guilda (com registro).
- **Progresso de guilda por objetivos, não ouro:** Operações semanais (3 por semana: ex. "abater 200 elites do andar X", "concluir 10 labirintos pela rota técnica", "vencer 1 Assalto"). Níveis de guilda liberam **conveniências** (salão, estações de fabricação no salão, mais espaços de banco, estandarte), **nunca poder de combate**.
- **Salão da guilda:** moradia coletiva (ralo de ouro opcional: decoração, estações).
- **Alianças** (até 4 guildas) para Assaltos.
- **Território nas Fronteiras** (V.3): guildas podem controlar **Postos**; Posto dá **acesso prioritário a nós de alta pureza**, não gera ouro.

---

## V. PvP (decisão do Lucas: zonas abertas)
### V.1 Onde
- **Fronteiras:** 1 zona por camada (num dos 10 andares), aberta, **PvP livre** para quem entrar. Tem os **nós de maior pureza** (até 100) e **Fendas** (mini-chefes com material raro).
- **Duelo** consensual em qualquer lugar: **termina em 1 HP** (ninguém cai), **zero perda** (XP, material, Ferida, durabilidade), e o dano consensual não entra na atribuição de derrota. **Arena ranqueada** (V.4).
- Fora de Fronteira/duelo/arena: **impossível** atacar jogador.

### V.2 Regras da Fronteira
- **Sincronia obrigatória:** todos os números são limitados ao teto do andar da Fronteira (núcleo E.6) → nível alto não atropela.
- **Artes Singulares desativadas** (núcleo C.4). Artes Únicas comuns funcionam.
- Derrota em Fronteira: perde **50% dos materiais carregados** para o Túmulo, que **qualquer um pode saquear**; XP **não** é perdido em PvP (só em PvE).
- **Infâmia:** regra fechada com atribuição na **parte 3, AL.3** (agressor inicial, registro de 30 s, contribuições, cúmplices). Efeitos pela **tabela única 0 / 1–2 / 3+** da parte 3 (AL.3), por conta.
- **Túmulo na Fronteira:** dono e grupo do momento recuperam 100%; terceiro saqueia 50% (a outra metade se perde), o primeiro saque fecha o Túmulo, 1 saque a cada 8 min; proteção do dono 15 s, uma vez por Túmulo (parte 3, AL.2).
- **Selo de Retorno não funciona** na Fronteira.
- **Morrer na Fronteira:** você renasce na **entrada** da Fronteira.
- **Proteção de entrada:** 10 s invulnerável ao entrar, **sem coletar, capturar ou interagir**; reentrada em menos de 5 min não renova a proteção.
- Protegidos (novatos) não entram na Fronteira até concluir o andar 3.

### V.3 Postos (território)
Cada Fronteira tem 3 **Postos**. Guilda que mantém o Posto (captura de 5 min, defesa por ondas) ganha por 48 h: prioridade nos nós ao redor (os outros também coletam, mas a guilda coleta **15%** mais rápido) e um estandarte. **No máx. 1 Posto por guilda por Fronteira.** Postos são **globais** (o mesmo Posto em todos os canais; regras de captura na parte 3, AL.5). **Não gera ouro**, não dá poder de combate.

### V.4 Arena ranqueada
1×1 e 3×3; atributos e equipamento **normalizados** (a **distribuição de Arena própria** de 197 pontos, editável grátis — parte 3 AK.5 —, equipamento-padrão de grau 110%, domínio e Artes Únicas comuns permitidos, consumíveis proibidos); **zero perda** de XP, material, Ferida ou durabilidade; temporadas de 8 semanas; recompensa: títulos e cosméticos. Singulares desativadas.

---

## W. Profissões
- **Coleta (todas liberadas):** Mineração · Extração vegetal · Esfola (de monstros abatidos) · Pesca (aquáticos e materiais de água).
- **Fabricação (dominar no máx. 2 das 5, por personagem;** personagens da mesma conta podem dominar outras — a interdependência vem do tempo de domínio e do mercado, não de um bloqueio de conta**):** Forja (armas) · Armaria (armaduras e escudos) · Alquimia (poções, tônicos, óleos, bombas, Selos) · Joalheria (acessórios e focos) · Culinária (comidas).
  Todos podem fabricar o básico das 5; **dominar** (nível 1–50 em cada) libera receitas avançadas e precisa de escolha → ninguém faz tudo → mercado entre jogadores.
- **Refino:** material bruto → refinado; o refino **move propriedades** (ex.: fundir dois minérios mistura Densidade e Dureza pela média ponderada; temperar sobe Dureza −Flexibilidade). É aqui que a fabricação tem decisões.
- XP de profissão por fabricar coisas **diferentes** (repetir a mesma receita rende cada vez menos no dia).
- **Receitas completas da camada piloto** (10 por profissão, com intermediários, substitutos, rendimento e taxa): **parte 3, AQ**.
- **Nós de coleta:** compartilhados (todos veem o mesmo nó), reposição 5 min; pureza: campo **40–70**, Fronteira **85–100**; pureza pessoal decrescente do núcleo F.2 **por conta** (vale em todos os canais).

---

## X. Inventário, peso e banco
- **Mochila:** 40 espaços de equipamento/consumível. **Tudo tem peso:** equipamento não equipado = peso da peça; consumível 0,1; flechas 0,01; lingote/placa/couro curtido 0,4; componente de arma/armadura 0,5–1,0; joia 0,1.
- **Receitas não comprimem:** o peso da saída é **≥ 100% da soma dos pesos dos materiais** usados (refinar 3 minérios de 0,5 → 1 lingote de 0,4 + escória de 1,1 que fica na estação: a escória **não** some, é peso descartado só na cidade).
- **Bolsa de materiais:** sem limite de espaços, **mas o peso conta na carga** (L.3) e existe **capacidade máxima** (confortável + 20): cada material tem peso (minério 0,5; couro 0,2; núcleo 1,0…).
- **Banco** em toda cidade (compartilhado entre personagens da conta). Material no banco não cai em derrota.
- Bolsa de expedição melhorada (Armaria): +4 no limite confortável só para materiais.

---

## Y. Viagem, acesso pessoal e população
### Y.1 Viagem
Portal de cidade em cada andar que você **pisou pessoalmente**. Teleporte entre cidades = serviço (ralo indexado do núcleo G.1). Checkpoints de labirinto: voltar a eles é grátis dentro da mesma expedição.

### Y.2 Acesso pessoal × desbloqueio global
O andar abre para o servidor no primeiro Assalto, mas **para entrar pessoalmente no próximo andar** você precisa ter vencido o Chefe do andar atual pelo menos 1 vez (instância de 6, com sincronia; pode ir com amigos de qualquer nível). Assim o novato que chega meses depois **joga** a torre em vez de pular.
**Ventos de retorno:** andares mais de 10 abaixo da frente do servidor dão +50% XP e contratos duplos de material (alcança a frente sem pular conteúdo).

### Y.3 População
Zonas abertas em **canais** de até 150 jogadores (troca de canal livre fora de combate); cidade até 300 por canal; labirinto e chefes em instância; Assalto em instância de até 24; Fronteira em canais de 100 (sem troca de canal durante **5 min** após combate PvP; Fendas e nós com timers por **conta**, não por canal).

---

## Z. Domínio de arma
- Cada uma das 11 armas tem domínio **1–100** por uso em encontros válidos (núcleo C.2).
- Técnicas públicas: **1, 10, 20, 30, 40, 50** liberam as 6 de K.3; **60, 70, 80** liberam as 3 avançadas de AM; **90 e 100** liberam as 2 primeiras de BD; a 3ª de BD vem do **Desafio de rota** (50 encontros válidos usando as 3 primeiras avançadas). **Variações** de técnicas não fazem parte desta versão (conteúdo futuro, não especificado).
- Domínio pós-100 = **Maestria**: estrelas cosméticas e 1 "assinatura de arma" (efeito visual + som), sem poder.
- Domínio por arma, não por personagem → trocar de arma é recomeçar o domínio (decisão real).
- **Taxa por tempo, não por encontro:** 1 unidade de domínio por **20 s de combate válido** com aquela arma (máx. 15 unidades por encontro de campo ou por tentativa de chefe — um chefe de 10 min não vale 30 feras, mas vale mais que uma). **Tempo válido** só conta em encontro **válido pelo Leitor** (ameaça ≥ 5% da sua vida) e se você ficou em combate **≥ 15 s** naquele encontro/tentativa. 1 ponto = 30 unidades até 50 e 50 unidades de 50 a 100 → **referência sem o teto por encontro: ≈ 8 h de combate até 50 e ≈ 14 h de 50 a 100** ✔ (encontros longos rendem menos por minuto por causa do teto de 15; a duração real depende do perfil de atividade e é medida no protótipo). Arma do conjunto B ganha só pelo tempo em que esteve na mão.
- Catálogo das avançadas: **parte 3, AM e BD** (6 por arma, 66 no total).

---

## AA. Eventos de mundo
| Evento | Frequência | O que acontece | Sucesso / falha |
|---|---|---|---|
| **Fenda** | a cada ~90 min por campo | portal de família de outro andar (sincronizada) | fechar = material da outra família; falhar = a família fica 1 h no campo |
| **Migração** | semanal | 1 família troca de andar por 3 dias | novas composições; contratos especiais |
| **Chefe errante** | 2×/dia por camada | chefe de campo antigo, versão variante, anda entre zonas | participação → componente raro |
| **Maré do bioma** | conforme regra do andar | a regra de bioma intensifica 20 min | mais pureza nos nós durante a maré |
Eventos dão **material e contratos**, não ouro direto (ouro só por objetivos fixos do núcleo).

---

## AB. Fim de jogo e Nova Era
1. **Enquanto a torre não termina:** a frente do servidor é o conteúdo principal (Assaltos); atrás dela, Ecos (abaixo), Fronteiras, Arena, Operações de guilda, profissões, Singulares.
2. **Ecos dos Andares:** refazer chefes antigos em **versão invertida** (mesma arena, mecânica trocada por outro dos 6 tipos), sincronizada, semanal → material de Maestria e componentes de Encaixe raros.
3. **Andar 100 → Nova Era** (regras de transição na **parte 3, AU**: vencer o 100 habilita, aviso de 7 dias, Era mínima de 12 semanas): quando a transição acontece, encerra-se a **Era**. Na Nova Era: a torre é **reembaralhada** (andares trocam de bioma, famílias, tipos de objetivo e de chefe; números iguais), os personagens continuam, os andares precisam ser reabertos por Assalto; as **Singulares seguem o calendário próprio** (núcleo C.4), sem reinício. Registro histórico da Era anterior (quem abriu cada andar). É o "recomeço" sem apagar ninguém.
4. **Profundezas** (opcional, depois do 100): andares procedurais infinitos com 3 regras de bioma sorteadas por semana; ranking por profundidade; recompensa cosmética e de Maestria (sem poder).

---

## AC. Cadência (rotina sem obrigação)
- **Diário:** 8 contratos (acumulam 3 dias) · eventos · coleta. **Promessa honesta:** o sistema **reduz** a pressão diária (3 dias de acúmulo), mas quem fica mais de 3 dias sem jogar perde contratos daquele período.
- **Semanal:** 3 Operações de guilda · Ecos · trecho novo do labirinto · Migração.
- **Temporada:** Singulares (30 dias) · Arena (8 semanas) · Postos (48 h).
- Regra: **qualquer sessão de 30 min avança algo** (1 labirinto curto, 2–3 contratos, 1 Fenda).

---

## AD. Primeira hora (onboarding)
| Minutos | O que acontece | Ensina |
|---|---|---|
| 0–10 | criação (elemento) → campo inicial seguro | atacar, esquivar, bloquear, 1 conjuração |
| 10–25 | primeira elite (fera) | esquiva perfeita → Ímpeto → Golpe de Ímpeto |
| 25–40 | escolher 1ª arma de verdade (testar 3 na arena) | identidade de arma |
| 40–60 | mini-labirinto em grupo assistido (NPCs ou jogadores) | checkpoint, reanimação, saque pessoal |
| nível 5 | 1º modificador | escolhas de build |
| andar 1 | Chefe tutorial (instância 1–6, âncoras simples, separada do Assalto do andar 1) | chefe = problema |
Morte pesada só começa a valer depois do minuto 60 (antes: sem perda).

---

## AE. Antitrapaça (bots e venda de ouro)
- Monstro não dá ouro (núcleo); contratos por conta; pureza decrescente por nó; Leitor de Estilo com sinais de automação.
- **Contas novas** (< 7 dias ou < andar 3): não enviam ouro a outros jogadores nem publicam pedidos > 5.000; recebem normalmente.
- Todas as trocas registradas; reversão de transações fraudulentas.
- Fronteiras: farm de túmulo entre contas da mesma pessoa (morrer de propósito para passar material) → só o **saque de terceiro** destrói 50% (o grupo do momento recupera inteiro, mas material quente recolhido por outro segue a regra de terceiro — parte 3 AL.2), o que torna a passagem cara; dispositivo/IP recorrente é **sinal para investigação**, nunca critério único (jogadores da mesma casa não são bloqueados).

---

## AF. Economia v5 (o que muda nos números)
1. **Sessão de referência** 2 h; contratos 17,5% de R cada (R.4).
2. **Três contabilidades** (parte 3, AQ): **ouro** (só o que o NPC/estação destrói conta como ralo), **materiais** (consumir poção, reparo com componentes, metade destruída no saque de Túmulo, Recolhedor) e **transferências** (pagamento ao artesão, mercado, pedidos, saque).
   - Selo de Retorno, poções, flechas, comidas → ralo de ouro = **reagentes de NPC (140/h) + taxa de produção destruída (60/h)** na camada 1; o preço que o artesão cobra é transferência.
   - Durabilidade extra por derrota → "Manutenção".
   - Salão de guilda e moradia → "Cosméticos/moradia" (opcional).
3. **Transferências (não criam ouro):** Pedidos de jogadores, mercado, saque de Túmulo em PvP (material).
4. **Teste obrigatório na simulação por agentes:** perfis de jogador — casual 30 min/dia, médio 2 h, intenso 5 h, artesão, caçador de Fronteira — e consumo opcional 0/50/100%.
O controlador do núcleo continua sendo a rede de segurança; os números de G.1 não mudam.

---

## AG. Contra o "Toram entediante" (os 5 riscos e a resposta)
| Risco | Resposta no v5 |
|---|---|
| Builds resolvem os mesmos problemas com animações diferentes | 11 armas, cada uma com mecânica própria e 2 dimensões de decisão (K.1–K.2); famílias que exigem respostas diferentes (P.1) |
| 100 andares = 100 corredores | matriz bioma × objetivo × tipo de chefe (Q.3); labirinto muda 1 trecho/semana; Nova Era reembaralha |
| Descoberta vira checklist | 15 assinaturas (3 rotas × 5 Artes) e **ramos das próprias Artes** nos níveis 1–5 (parte 3, AS); Singulares por domínio |
| Chefe adaptativo pune quem joga bem | adaptação sempre abre oportunidade (P.4) |
| Rotina econômica substitui a aventura | contratos em pacotes dentro da expedição (R); 30 min sempre avança algo (AC); acúmulo de 3 dias reduz a pressão diária |

---

## AH. Escopo do protótipo (o que fazer primeiro)
**Fatia vertical 1 (arena):** 3 armas (espada longa, katana, machado grande) com todas as técnicas + desarmado; 6 famílias funcionais (feras, insetos, constructos, elementais, humanoides, mortos-vivos); diretor de encontros; estados; caído/reanimação.
**Fatia vertical 2 (andar-piloto):** cidade + 2 zonas de campo + labirinto de 3 rotas + chefe de âncoras + 1 regra de bioma (escuridão) + derrota pesada com Túmulo + 8 tipos de contrato.
**Fatia 3:** Fronteira PvP com sincronia + Postos; profissões Forja/Alquimia; guilda básica.
O resto (Nova Era, Profundezas, Arena ranqueada, 11 armas) depois que as fatias 1–2 provarem diversão.
