# Árvore de habilidades — 06. Artes Únicas (24 no lançamento)
Artes são **escondidas**: não aparecem na árvore, não custam PH e são descobertas pelo **Leitor de Estilo** (núcleo C). As 10 primeiras fichas vieram do planejamento do ChatGPT; as outras 14 foram escritas no mesmo formato.

## Contrato comum (vale para todas)
- **1 Arte preparada**; ocupa 1 das 8 técnicas (mesmo se o efeito for passivo).
- Efeitos derivados seguem a regra de **ações derivadas** (00-sistema §7.1): não contam para Leitor, domínio, afinidade nem descoberta; não geram Ímpeto, Sobrecarga, Abertura nem novas ativações; não duplicam acerto, cura, interrupção nem elemento.
- Recargas persistem na troca de arma. Deslocamentos respeitam terreno, arena e linha de visão. Dano e vida usam s; impacto e recursos não.
- Suporte só entre participantes da mesma tentativa. Nenhuma Arte remove Ferido, cria reserva de cura ou resolve sozinha uma mecânica obrigatória.
- **Descoberta**: garantida até a 12ª demonstração (núcleo C.3). Cada Arte tem **3 rotas**, qualquer uma basta:
  - **Estilo**: 2 métricas do Leitor ≥ 0,55 + atributos indicados (+20 / +10) + 100 abates das famílias indicadas;
  - **Execução**: a 1ª métrica ≥ 0,65 + atributo principal +25 + 60 demonstrações em ≥ 3 famílias;
  - **Expedição**: 2 métricas ≥ 0,45 + 150 abates das famílias + os 3 desafios da Arte (sem requisito de atributo).
  Métricas: Esquiva, Defesa ativa, Agressão, Mobilidade, Precisão, Controle, Compromisso, Magia, Suporte. Nenhuma rota exige ficar com pouca vida ou levar dano de propósito.
- **Orçamento**: comparar a preparação **com e sem** a Arte, mesma duração e recursos, medindo separado dano, sobrevivência, controle e tempo de objetivo; rejeitar Arte que melhora tudo sem custo visível. O índice antigo (núcleo C.3) fica como diagnóstico.
- **Ramos (níveis 1–5)**: cada Arte sobe de nível com demonstrações; os níveis 2–5 liberam **alternativas** (escolha 1, trocável no Santuário) que mudam a forma, nunca o orçamento.

| Família | Artes |
|---|---|
| Ecos e repetição | 1 Eco · 2 Reprise · 3 Rastro duplo · 4 Memória da lâmina |
| Espaço e posição | 5 Inversão · 6 Passo Fantasma · 7 Horizonte Fixo · 8 Ponto cego |
| Resposta e antecipação | 9 Último Fôlego · 10 Contratempo · 11 Presságio · 12 Revide |
| Conversão de recursos | 13 Âncora · 14 Sangue por fôlego · 15 Combustão interna · 16 Alquimia da postura |
| Vínculo e proteção | 17 Juramento de Retorno · 18 Laço de ferro · 19 Elo de Ímpeto · 20 Escudo partilhado |
| Elemento e condução | 21 Maré · 22 Lente Partida · 23 Fusão · 24 Condutor vivo |

---

## Ecos e repetição

### 1. Eco
- **Ativação:** nos 2 s depois de uma esquiva perfeita · **custo** 15E · **recarga** 8 s · não acrescenta tempo (altera a próxima técnica ofensiva).
- **Efeito:** a técnica causa 70% do dano direto; uma imagem parada repete os 30% restantes 0,6 s depois, e você pode apontar o eco para **outro alvo a até 2 m** do ponto original (sem efeitos auxiliares). Impacto e elemento só na técnica original.
- **Preço:** o eco pode errar se o alvo sair do lugar. **Chefe/PvP:** igual; não copia agarrão nem deslocamento.
- **Alternativas:** Eco duplo (2 ecos de 15% em 0,4 e 0,8 s) · Eco atrasado (30% em 1,2 s, +5 de impacto no eco) · Eco isca (a imagem atrai comuns 1 s) · Eco defensivo (depois de um parry, uma **2ª entrada manual** em até 0,6 s abre outra janela de 70 ms; sem recompensa de parry nem contra-ataque).
- **Rotas:** Esquiva + Agressão · DES +20 / PER +10 · feras, aviários. Desafios: 10 esquivas perfeitas seguidas sem levar golpe · derrotar uma elite usando só técnicas logo após esquiva · vencer um mini-chefe sem bloquear.

### 2. Reprise
- **Ativação:** manual, até 3 s depois de usar uma técnica · **custo** 1,5× o custo-base dela · **recarga** 20 s.
- **Efeito:** repete a última técnica **ofensiva direta de arma** usada, com a animação completa (preparo e carga incluídos), K e impacto totais ×0,50, ignorando a recarga dela. Sem elemento, controle, geração de recursos nem efeitos auxiliares; as condições de uso são conferidas de novo. Não copia Artes, reações, canalizações nem técnicas de suporte.
- **Preço:** custo 1,5×; a técnica original ganha +4 s de recarga. **Chefe/PvP:** igual; controles repetidos contam como nova aplicação na categoria.
- **Alternativas:** Reprise fiel (70% de dano, custo ×2,5) · Reprise curta (só técnicas de recarga ≤ 8 s, custo ×1,5) · Reprise lenta (repete 2 s depois, K ×0,60, custo 1,5×) · Reprise elemental (repete só o elemento, sem dano).
- **Rotas:** Compromisso + Agressão · FOR +20 / CON +10 · constructos, humanoides. Desafios: usar 6 técnicas diferentes num só encontro · derrotar 3 elites sem que nenhuma técnica sua fique em recarga mais de 2 s ociosa · vencer um encontro de Cerco sem perder o Núcleo.

### 3. Rastro duplo
- **Ativação:** passiva enquanto preparada; dispara ao correr 2 s seguidos · **recarga interna** 10 s.
- **Efeito:** ao parar de correr, uma imagem continua 3 m na direção da corrida e explode (K0,60, I10) — atrai o 1º ataque de comuns a 3 m.
- **Preço:** ocupa uma técnica sem ser ativa; correr para disparar gasta resistência. **Chefe/PvP:** chefe ignora a isca; PvP a imagem não tem nome nem barra (dá para perceber).
- **Alternativas:** Rastro longo (6 m) · Rastro de fumaça (sem dano, nuvem 2 s) · Rastro elemental (a explosão vira K0,30 do seu elemento, sem aplicar o efeito do elemento) · Rastro de guarda (a imagem bloqueia 1 projétil).
- **Rotas:** Mobilidade + Esquiva · DES +20 / VIG +10 · insetos, sombras. Desafios: atravessar o labirinto técnico sem ser atingido por armadilha · escapar de 3 perseguições de elite sem combate · completar a Expedição logística de um andar.

### 4. Memória da lâmina
- **Ativação:** manual · **custo** 20R · **recarga** 30 s · 0,5 s.
- **Efeito:** "grava" a próxima técnica **ofensiva direta de arma** que você usar; por 15 s você pode usá-la de novo **uma vez** ignorando a recarga dela, pagando 100% do custo-base e dos recursos especiais (Ritmo, Frenesi, cargas). O 2º uso repete animação e condições e é **recalculado** (não reaproveita crítico, Abertura nem Sobrecarga já consumidos).
- **Preço:** 20R para gravar + o custo cheio do 2º uso; perder os 15 s desperdiça. **Chefe/PvP:** igual.
- **Alternativas:** Memória curta (7 s, recarga 20 s) · Memória dupla (grava 2 técnicas, cada uma a 60%) · Memória de reação (grava a técnica de reação) · Memória paciente (30 s, custo 30R).
- **Rotas:** Precisão + Compromisso · PER +20 / FOR +10 · dracônicos, colossos. Desafios: quebrar 4 partes de um colosso no mesmo combate · derrotar um chefe de Partes · acertar 20 pontos fracos seguidos.

## Espaço e posição

### 5. Inversão
- **Ativação:** até 0,6 s depois de um parry bem-sucedido · **custo** 20R · **recarga** 12 s · 0,25 s, sem invulnerabilidade extra.
- **Efeito:** troca de lugar com um inimigo comum de porte compatível a até 3 m. **Preço:** sem dano nem impacto novo.
- **Chefe/elite:** move só você para uma posição lateral válida (3 m). **PvP:** move só você.
- **Alternativas:** com aliado que deu consentimento · troca deixa o inimigo Exposto 1 s (recarga 16 s) · só vira o inimigo (sem trocar de lugar) · troca com um projétil (você aparece onde ele estava).
- **Rotas:** Defesa ativa + Controle · PER +20 / CON +10 · humanoides, elementais. Desafios: 15 parries num só encontro · derrotar um Duplo mantendo-os separados o tempo todo · interromper 10 conjurações seguidas.

### 6. Passo Fantasma
- **Ativação:** manual durante a corrida · **custo** 20R · **recarga** 16 s · dura 1 s, até 5 m.
- **Efeito:** ignora a colisão de inimigos comuns. **Preço:** sem atacar, defender ou interagir durante; sem invulnerabilidade; não gera Ímpeto pela distância.
- **Chefe/elite/PvP:** não atravessa corpos (termina antes da colisão).
- **Alternativas:** 3 m deixando imagem · atravessa projéteis · deixa rastro Lento · ativa na esquiva em vez da corrida.
- **Rotas:** Mobilidade + Agressão · DES +20 / PER +10 · insetos, feras. Desafios: atravessar 3 enxames sem parar · chegar ao conjurador de um grupo de elite em < 4 s · completar a rota direta do labirinto sem ser derrubado.

### 7. Horizonte Fixo
- **Ativação:** marca o chão onde você está · **custo** 15E na marca + 15E no retorno · **recarga** 24 s (conta ao marcar) · 0,4 s marcar / 0,4 s voltar.
- **Efeito:** por 5 s, volta à marca (até 6 m) se houver caminho válido na arena. **Preço:** sem invulnerabilidade; não volta sob controle incapacitante; não preserva recursos.
- **Chefe/PvP:** falha se o ponto ficar inválido (a interface avisa); não atravessa barreiras.
- **Alternativas:** 3 s e 8 m · a marca empurra comuns ao voltar · volta trazendo 1 aliado a 1 m (o aliado precisa aceitar) · marca dura 8 s mas o retorno custa 25E.
- **Rotas:** Mobilidade + Magia · CON +20 / DES +10 · elementais, aquáticos. Desafios: sobreviver às 3 fases de uma Arena que muda sem cair · derrotar um Perseguição · terminar um andar com bioma de maré sem ser arrastado.

### 8. Ponto cego
- **Ativação:** manual · **custo** 20R · **recarga** 20 s · 0,3 s.
- **Efeito:** por 3 s, o alvo travado perde você de vista ao sair do cone frontal dele: seu próximo golpe vindo de trás é tratado como flanco (+20%, ou o Flanco da espada curta se ela estiver na mão).
- **Preço:** só funciona se você realmente chegar às costas; acabar sem golpe desperdiça. **Chefe:** só contra chefes que viram (não Colossos). **PvP:** o alvo vê um aviso.
- **Alternativas:** 2 alvos ao mesmo tempo · dura 5 s mas sem bônus de dano (só tira você da mira de comuns) · o golpe também tira 10 de postura · ativa sozinha ao rolar por trás de um alvo (recarga 30 s).
- **Rotas:** Mobilidade + Precisão · DES +20 / PER +10 · humanoides, constructos. Desafios: 30 golpes de flanco num encontro · derrotar um guardião elite só pelas costas · vencer uma Fenda sem ser atingido de frente.

## Resposta e antecipação

### 9. Último Fôlego
- **Ativação:** manual, antes do golpe inimigo · **custo** 30R · **recarga** 60 s (máx. 1 por tentativa de chefe; bloqueado nos 10 s depois de Sangue por fôlego) · 0,3 s · janela 2 s.
- **Efeito:** um golpe que te derrubaria deixa você com 1 de vida por 1 s; o dano excedente volta no fim desse segundo. **Preço:** sem cura nesse segundo; a dívida só é reduzida por mitigação que já estava ativa no golpe original.
- **Chefe/PvP:** não funciona contra morte de ambiente, saída de arena ou falha letal de objetivo.
- **Alternativas:** permite concluir uma interação já iniciada (sem atacar) · dívida reaplicada em 2 parcelas · janela 1 s e recarga 40 s · a dívida volta em 4 parcelas de 0,25 s (mais tempo para uma mitigação ativa entrar).
- **Rotas:** Compromisso + Defesa ativa · VIG +20 / FOR +10 · mortos-vivos, colossos. Desafios: concluir 3 intervenções de âncora sob ataque · vencer um chefe sem ser reanimado · completar um Resgate.

### 10. Contratempo
- **Ativação:** depois de errar uma técnica direta · **custo** 20R · **recarga** 18 s.
- **Efeito:** troca até 0,35 s da recuperação restante por um passo de 1,5 m (0,35 s). **Preço:** a próxima técnica custa +10R por até 4 s; sem invulnerabilidade; não cancela a execução nem reinicia a técnica.
- **Alternativas:** recuo de 2 m · passo para frente (fecha distância) · troca 0,5 s mas o passo é de 1 m · o passo vira giro no lugar (vira para o alvo, 0,35 s).
- **Rotas:** Esquiva + Mobilidade · DES +20 / VIG +10 · feras, sombras. Desafios: vencer 5 encontros seguidos sem ser atingido depois de errar um golpe · derrotar uma sombra elite · sobreviver 60 s a um enxame sem atacar.

### 11. Presságio
- **Ativação:** manual sobre um inimigo · **custo** 15E · **recarga** 25 s · 0,4 s.
- **Efeito:** por 6 s, você vê a **próxima** ação dele 0,3 s antes da telegrafia normal (só ataques que já têm telegrafia). Se você marcar esse ataque com Leitura (PER), a Abertura dura 3 s.
- **Preço:** enquanto ativo, sua Leitura não recarrega. **Chefe:** só ataques telegrafados (não mostra padrões novos da leitura do grupo). **PvP:** não funciona.
- **Alternativas:** 2 inimigos por 4 s · mostra só a direção do ataque, mas dura 10 s · Abertura vale 120% · Presságio do grupo (aliados a 6 m também veem, recarga 40 s).
- **Rotas:** Precisão + Defesa ativa · PER +20 / VIG +10 · dracônicos, humanoides. Desafios: 10 Aberturas usadas num encontro · derrotar um dracônico sem levar o sopro · interromper o Grito do chefe-piloto 3 vezes.

### 12. Revide
- **Ativação:** reação (vai no espaço de reação **e** ocupa uma técnica) · **custo** 15R · **recarga** 14 s.
- **Efeito:** depois de **bloquear** um golpe, aperte a reação em até 0,6 s: você faz um ataque de 0,5 s, K0,80, com o impacto que o golpe tinha (máx. 40). Nunca é automático.
- **Preço:** o bloqueio custa +20% de resistência enquanto o Revide está pronto. **Chefe/PvP:** igual; no PvP o impacto devolvido é ×0,5.
- **Alternativas:** devolve só impacto (sem dano, +10) · devolve em área de 2 m (K0,40) · devolve no próximo leve em vez de na hora (+20% de dano) · funciona também com Firmar (VIG) ativo.
- **Rotas:** Defesa ativa + Compromisso · VIG +20 / FOR +10 · constructos, feras. Desafios: bloquear 30 golpes num encontro sem quebrar a guarda · derrotar uma elite só com contra-ataques · vencer um chefe de Cerco.

## Conversão de recursos

### 13. Âncora
- **Ativação:** prepare antes de bloquear · **custo** 10R + o bloqueio · **recarga** 10 s · 0,2 s · janela: próximo bloqueio em até 2 s.
- **Efeito:** guarda 40% do impacto daquele ataque (máx. 20); o próximo pesado em até 3 s soma o impacto guardado. **Preço:** esse pesado perde 10% de dano; errar desperdiça.
- **Chefe/PvP:** só impacto, nunca controle obrigatório. Não reflete dano nem armazena em cadeia.
- **Alternativas:** usa o guardado para restaurar sua postura · protege aliado atrás (cone 60°) · guardado vira área de 2 m (−50%) · guarda até 5 s.
- **Rotas:** Defesa ativa + Compromisso · VIG +20 / FOR +10 · constructos, mortos-vivos. Desafios: quebrar a postura de um chefe com impacto guardado · bloquear 3 investidas de elite seguidas · vencer um Cerco sem Muralha.

### 14. Sangue por fôlego
- **Ativação:** manual · **custo** 8% da sua vida atual (não da reserva) · **recarga** 20 s · 0,3 s · bloqueado nos 10 s depois de Último Fôlego.
- **Efeito:** recupera 30R na hora e a regeneração de resistência +20% por 4 s.
- **Preço:** a vida perdida só volta pela reserva (gasta reserva como qualquer cura); abaixo de 20% de vida não pode ser usada. **Chefe/PvP:** igual.
- **Alternativas:** 5% de vida → 20R · troca vida por postura (+30) · troca vida por energia (+25E) · sem custo de vida, mas a reserva de cura perde 60·s.
- **Rotas:** Agressão + Compromisso · VIG +20 / DES +10 · feras, insetos. Desafios: manter combate 120 s sem parar de atacar · derrotar 5 elites seguidas sem voltar ao ponto de descanso · vencer um chefe com 0 poções.

### 15. Combustão interna
- **Ativação:** manual com Ímpeto ≥ 50 · **custo** todo o Ímpeto · **recarga** 25 s · 0,3 s.
- **Efeito:** converte o Ímpeto em energia (1 E por 2 de Ímpeto) e dá 1 carga de Sobrecarga.
- **Preço:** perde o Golpe de Ímpeto; a carga dada não pode passar do máximo 3. **Chefe/PvP:** igual.
- **Alternativas:** energia → Ímpeto (o contrário) · converte só metade do Ímpeto · converte Ímpeto em postura · converte e dá 2 cargas, mas a energia não regenera por 4 s.
- **Rotas:** Magia + Agressão · POT +20 / FOR +10 · elementais, dracônicos. Desafios: usar Golpe de Ímpeto e uma técnica com 3 cargas no mesmo encontro 5 vezes · derrotar um elemental elite com magia do próprio elemento dele · vencer um chefe usando os 3 vetores mágicos.

### 16. Alquimia da postura
- **Ativação:** manual · **custo** 25 da sua postura atual · **recarga** 18 s · 0,4 s.
- **Efeito:** seus 3 próximos golpes em 5 s ganham +8 de impacto cada.
- **Preço:** postura baixa = você fica mais perto de ser atordoado; não pode ser usada com postura < 40. **Chefe/PvP:** igual.
- **Alternativas:** 1 golpe com +20 · converte postura em penetração (+10%) · converte postura de um aliado consenciente (até 15) · converte postura em resistência (+20R).
- **Rotas:** Compromisso + Controle · FOR +20 / VIG +10 · colossos, constructos. Desafios: quebrar a postura de 3 elites em 60 s · derrubar um colosso duas vezes · vencer um chefe de Partes quebrando as 4 partes.

## Vínculo e proteção

### 17. Juramento de Retorno
- **Ativação:** aliado a até 6 m · **custo** 25E · **recarga** 30 s · 0,8 s.
- **Efeito:** transfere até 120·s da **sua** reserva para a dele; vínculo de 8 s: o saldo **não consumido** daquele empréstimo volta sozinho, debitado integralmente dele (nunca mais do que isso).
- **Preço:** o que ele usar não volta; ele precisa ter espaço na reserva. Não cura direto; 1 vínculo por vez.
- **Chefe/PvP:** só aliados válidos; o fim da tentativa encerra o vínculo antes de devolver.
- **Alternativas:** 80·s a 10 m · 2 aliados com 60·s cada · o vínculo dura 15 s · devolução antecipável manualmente depois de 3 s (vínculo máx. 5 s).
- **Rotas:** Suporte + Defesa ativa · VIG +20 / POT +10 · elementais, mortos-vivos. Desafios: manter todo o grupo vivo num chefe sem reanimações · mover 2.000·s de reserva numa tentativa · completar um Resgate sem nenhum aliado cair.

### 18. Laço de ferro
- **Ativação:** aliado a até 8 m · **custo** 20R · **recarga** 25 s · 0,5 s.
- **Efeito:** por 6 s, nenhum de vocês dois pode ser empurrado para longe do outro (deslocamento forçado para no limite de 8 m) e os dois recebem −5% de dano.
- **Preço:** se um for derrubado, o outro fica Lento 2 s. **Chefe/PvP:** não impede mecânica obrigatória de chefe (puxões de arena).
- **Alternativas:** 3 aliados com −3% · laço de 4 m com −10% · o laço puxa o aliado até você ao fim · sem redução de dano, mas dura 12 s.
- **Rotas:** Suporte + Controle · VIG +20 / CON +10 · aquáticos, aviários. Desafios: completar um andar de maré sem nenhum aliado arrastado · derrotar aviários que derrubam · vencer uma Fenda com o grupo sempre a menos de 8 m.

### 19. Elo de Ímpeto
- **Ativação:** aliado a até 6 m · **custo** 30 de Ímpeto · **recarga** 20 s · 0,3 s.
- **Efeito:** o aliado recebe 25 de Ímpeto (dentro do teto de ganho dele).
- **Preço:** você perde 30 para ele ganhar 25. **Chefe/PvP:** igual.
- **Alternativas:** passa 40 → 30 · divide entre 2 aliados (15 cada) · o aliado também ganha +5 de impacto no próximo Golpe de Ímpeto · passa resistência (30R → 25R) em vez de Ímpeto.
- **Rotas:** Suporte + Agressão · DES +20 / FOR +10 · humanoides, feras. Desafios: o grupo usar 10 Golpes de Ímpeto ≥ 70 num chefe · derrotar 3 elites em grupo sem ninguém cair · quebrar a postura de um chefe 2 vezes numa tentativa.

### 20. Escudo partilhado
- **Ativação:** reação, quando um aliado a 4 m vai ser atingido por um ataque telegrafado · **custo** 20R · **recarga** 20 s.
- **Efeito:** você recebe metade do golpe no lugar dele (com a sua armadura e o seu bloqueio, se estiver bloqueando).
- **Preço:** você precisa estar a 4 m; o golpe dividido conta para a sua postura inteira. **Chefe/PvP:** não divide mecânica de "1 alvo marcado" obrigatória.
- **Alternativas:** recebe 100% (aliado 0%) · alcance 6 m e recebe 70% · divide também o estado (se houver), cada um com metade da duração · recupera 10R se bloquear o golpe dividido.
- **Rotas:** Defesa ativa + Suporte · VIG +20 / PER +10 · dracônicos, constructos. Desafios: proteger um aliado de 10 golpes num encontro · vencer o chefe-piloto sem ninguém cair · completar a escolta de um objetivo de Resgate.

## Elemento e condução

### 21. Maré
- **Ativação:** manual com Ímpeto ≥ 70 · **custo** 25 de Ímpeto · **recarga** 20 s · 0,4 s · dura 6 s.
- **Efeito:** troca o elemento das suas ações ofensivas para o elemento oposto (Fogo↔Gelo, Raio↔Terra, Vento↔Água).
- **Preço:** regeneração de energia −25% durante. Não muda Utilidade, árvore, afinidade nem equipamento (Água temporária não move reserva; Terra temporária não cria pilar).
- **Alternativas:** 3 s por 15 de Ímpeto · troca na esquiva perfeita · mantém os 2 elementos por 2 s ao trocar · dá o elemento oposto a aliados por 4 s (você fica neutro).
- **Rotas:** Magia (imbuir) + Agressão · POT +20 / CON +10 · elementais. Desafios: derrotar um elemental de cada elemento · vencer um andar com bioma oposto ao seu elemento · aplicar 2 elementos diferentes em 5 s numa âncora 3 vezes.

### 22. Lente Partida
- **Ativação:** muda uma conjuração de área preparada · **custo** +10E · **recarga** 12 s · preparo +0,2 s.
- **Efeito:** a área vira 2 círculos (65% do raio e 50% do dano cada), centros até 4 m um do outro. Um alvo nos dois recebe no máx. o dano original; elemento 1 vez por alvo.
- **Chefe/PvP:** linha de visão conferida para cada círculo.
- **Alternativas:** 2 focos no mesmo lugar separados por 0,8 s · 3 focos de 40% · um foco de dano e outro de controle (só o efeito secundário) · os focos podem cair sobre 2 grupos de aliados para curar (técnicas de cura de área).
- **Rotas:** Magia (conjurar) + Controle · CON +20 / POT +10 · plantas, insetos. Desafios: acertar 6 alvos com uma só conjuração · derrotar uma rainha dos insetos e suas operárias · vencer um Cerco usando só magia de área.

### 23. Fusão
- **Ativação:** quando um aliado aplica o elemento dele num alvo, você tem 2 s para ativar · **custo** 20E · **recarga** 20 s · 0,3 s.
- **Efeito:** sua próxima técnica elemental nesse alvo aplica **os dois** efeitos secundários (o seu e o do aliado) — exceção explícita à regra "1 elemento por ação".
- **Preço:** depende de um aliado com outro elemento; sem aliado, a Arte não faz nada. **Chefe/PvP:** só em ataques compatíveis do chefe; no PvP a duração dos efeitos fica pela metade.
- **Alternativas:** Fusão a distância (alvo até 15 m) · Fusão que vira dano (+20%, sem o 2º efeito) · Fusão em área (2 m, 60%) · Fusão invertida (o aliado ganha o seu efeito na próxima técnica dele).
- **Rotas:** Magia + Suporte · POT +20 / PER +10 · elementais, plantas. Desafios: o grupo aplicar 4 elementos num mesmo alvo · derrotar uma planta elite com Fogo combinado · vencer um chefe com 3 elementos diferentes no grupo.

### 24. Condutor vivo
- **Ativação:** manual · **custo** 25E · **recarga** 30 s · 0,5 s · dura 5 s.
- **Efeito:** você vira o ponto de saída das conjurações de 1 aliado a 10 m: as magias dele partem de você (alcance a partir da sua posição).
- **Preço:** enquanto dura, você anda a 70% e não conjura; o aliado precisa aceitar. **Chefe/PvP:** igual; não atravessa paredes.
- **Alternativas:** 2 aliados por 3 s · as magias dele usam o **seu** elemento em vez do dele (1 aplicação por ação; −10% de dano) · o aliado é o ponto de saída das **suas** magias · dura 8 s, você não pode atacar.
- **Rotas:** Suporte + Magia · CON +20 / VIG +10 · aquáticos, elementais. Desafios: acertar 20 conjurações em alvos marcados por um aliado ficando a até 2 m dele · completar uma Travessia sem que o conjurador do grupo caia · vencer um chefe Duplo com magia nos dois ao mesmo tempo.
