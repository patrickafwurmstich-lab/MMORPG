# Loop 2 — Auditoria do ChatGPT — **INCOMPLETO**

> "O dono tem razão: o v4 descreve mecanismos de cálculo e controle, mas não define as atividades, os adversários, as ferramentas e as decisões que sustentariam um MMORPG inteiro. Aprovação de fórmulas não é aprovação de completude." "A falha principal não é faltar mais uma fórmula. É faltar o jogo concreto que usa as fórmulas."

## 1. O que falta
**Combate/personagem/equipamento (ESSENCIAL):** catálogo de armas e movesets · técnicas públicas · regras de execução e cancelamento (buffer, encadeamento, cancelamento por defesa) · mira, câmera, lock-on, colisão · armaduras, escudos, acessórios · sistema completo de estados (interrupção, lentidão, prisão, queda, silêncio, limpeza, resistência) · cura, suporte e reviver · identidade de distância/conjuração · troca de arma/conjunto · inventário, armazenamento e saque · morte e penalidade. IMPORTANTE: domínio de armas, loadouts e comparação de builds.
**Inimigos/mundo (ESSENCIAL):** 12 famílias e variantes · IA de comuns e elites · composição de encontros · estrutura de campo/labirinto/andar · missões/contratos · regras de encontro, reset e reentrada · direito de participação/saque · acesso pessoal × desbloqueio global (novato que chega meses depois) · viagem/checkpoints · modelo de população (zonas, canais, instâncias) · endgame pós-andar 100. IMPORTANTE: eventos de mundo, cadência diária/semanal/sazonal, exploração persistente. DESEJÁVEL: moradia.
**Social/produção/operação:** guildas, decisão explícita sobre PvP, profissões e cadeias de produção, anti-bot/antifraude, telemetria, onboarding. "Não recomendo adicionar tudo. Casamento, montaria, pesca, guerra de guildas só se sustentarem os objetivos."

## 2. Raso no que existe (destaques)
- Convenção de r(x) ambígua (PER total 70 → parry 182,6 ms, não 180) → definir x = pontos investidos e clamp.
- "Continuações em quantidade diferente, mesmo orçamento" resolve matemática mas **não dá sensação diferente**: DES compra mais dano com outra animação.
- Economia: 150/h dos ralos (17%) são opcionais; contratos: 8 × 165 = 1.322/dia = 826/h só de contrato → falta declarar a sessão de referência; camada 10 emite 5,16× → simular comércio entre camadas.

## 3. Riscos de virar "Toram entediante"
1. **Builds resolvem os mesmos problemas com animações diferentes** → cada arma muda ≥ 2 dimensões (posição, geometria, compromisso, defesa, ponto fraco, cooperação). Teste: "a segunda build me obriga a observar e decidir coisas diferentes?"
2. **100 andares = 100 corredores** → matriz de estruturas de andar (reconhecimento, perseguição, travessia, controle territorial, resgate, expedição logística); nem todo chefe com 3 âncoras.
3. **Descoberta vira checklist depois da wiki** → identidade no *uso/configuração* da Arte, não na posse.
4. **Chefe adaptativo pune quem joga bem** → a adaptação abre uma **oportunidade** junto com a pressão (ex.: quebra-guarda expõe flanco por 1,2 s).
5. **Rotina econômica substitui a aventura** → vários objetivos avançam na mesma expedição; caminhos comparáveis; a atividade mais previsível não pode ser a mais rentável.

## 4. Propostas com números

### 4.1 Arsenal (protótipo: 3 armas × 6 técnicas)
| Arma | Alcance | Leve K/duração | Pesado K/duração | Identidade |
|---|---|---|---|---|
| Espada | 2,2 m | 0,60 / 0,65 s | 1,40 / 1,15 s | reposicionamento e resposta |
| Lança | 3,6 m | 0,55 / 0,72 s | 1,35 / 1,25 s | manter distância, perfurar linhas |
| Martelo | 2,4 m | 0,70 / 0,90 s | 1,55 / 1,50 s | compromisso e ruptura |
Fases: ex. espada leve = preparo 0,18 + execução 0,12 (não acelera) + recuperação 0,35. Buffer 120 ms; sem cancelamento ofensivo na execução; defesa cancela os últimos 40% da recuperação; cada ataque acerta o mesmo alvo 1×; básicos não geram Ímpeto; troca de arma só fora de combate.

| Técnica | K / I | Tempo / recarga | Custo | Decisão |
|---|---|---|---|---|
| Espada — Corte de avanço | 0,80 / 12 | 0,80 s / 5 s | | avança 2 m, sem invulnerabilidade |
| Espada — Guarda de passagem | 0,35 / 15 | 0,90 / 8 | | bloqueio frontal 0,35 s + passo lateral 1,5 m |
| Espada — Corte de flanco | 1,00 / 15 | 0,85 / 6 | | +20% no flanco; −20% contra frente protegida |
| Espada — Interceptação | 0,55 / 30 | 0,75 / 9 | | interrompe preparação marcada |
| Espada — Lâmina imbuída | 1,20 / 18 | 1,05 / 5 | 20 energia | elemento pelo vetor de arma |
| Espada — Cobertura | 0 / 0 | 0,50 / 12 | | 2 s interceptando ataque contra aliado a 2 m |
| Lança — Estocada de retenção | 0,75 / 14 | 0,85 / 5 | | recua 1 m na recuperação |
| Lança — Varredura | 0,70 / 20 | 1,10 / 8 | | cone 110° |
| Lança — Fixação | 0,45 / 32 | 0,95 / 10 | | cancela avanço inimigo |
| Lança — Perfuração alinhada | 1,10 / 18 | 1,20 / 7 | | linha 4 m |
| Lança — Disparo conduzido | 1,00 / 14 | 1,00 / 5 | 22 energia | projétil 14 m |
| Lança — Guarda de corredor | 0 / 0 | 0,60 / 12 | | 2 s de postura defensiva, movimento 40% |
| Martelo — Demolição | 1,40 / 45 | 1,60 / 8 | | ruptura forte, exposição longa |
| Martelo — Golpe curto | 0,65 / 20 | 0,85 / 5 | | resposta segura, 1,6 m |
| Martelo — Varredura baixa | 0,75 / 28 | 1,25 / 9 | | 140° |
| Martelo — Sustentar impacto | 0 / 0 | 0,45 / 12 | | 0,8 s ignorando um stagger comum |
| Martelo — Descarga de solo | 1,60 / 30 | 1,80 / 10 | 30 energia | área 2,5 m, conjuração |
| Martelo — Abertura de guarda | 0,60 / 35 | 1,10 / 8 | | tira guarda frontal de comum por 1,5 s |
Critério: em 6 encontros, cada arma com 2 situações favoráveis e 2 desfavoráveis.

### 4.2 Ecologia de inimigos (6 famílias funcionais no protótipo)
| Família | HP / postura | Comportamento | Resposta |
|---|---|---|---|
| Caçadores móveis | 650 / 80 | avanço 5 m, aviso 0,70 s, 140 de dano | esquiva, interceptar, obstáculo |
| Guardiões frontais | 1.100 / 180 | guarda frontal 120° (−50%), investida aviso 1,10 s | flanquear, romper, colisão |
| Conjuradores | 600 / 70 | conjuração 1,60 s a cada 7–10 s, área 2,5 m | interromper, sair, quebrar linha de visão |
| Artilheiros | 700 / 90 | disparo aviso 0,90 s; foge se alvo < 4 m | cobertura, aproximação coordenada |
| Predadores de grupo | 450 / 60 | dois cercam; só um salta por vez | controle de espaço, prioridade de alvo |
| Sustentadores | 800 / 100 | canal 2 s a cada 12 s restaura 10% da postura de aliado | separar, interromper, matar primeiro |
Elite = 1 regra extra visível, até +50% HP e +30% postura (ex.: guardião reposiciona a guarda após a 1ª exposição de flanco).
**Diretor de encontros:** comum 1 ponto, especialista/suporte 1,5, elite 3. Máx. 2 áreas de negação simultâneas; um comum não inicia outro controle incapacitante no mesmo jogador por 3 s; sempre ao menos uma saída.
Integração: oportunidades do Leitor acumulam entre encontros; Ímpeto por corrida só se reduz distância a alvo engajado (reset após 2 s sem correr); monstros comuns ensinam o vocabulário do chefe; receitas aceitam material de 2 famílias.
Critério: a mesma build muda ordem de alvos/posição/recursos em ≥ 4 de 6 composições.

### 4.3 Expedição de andar, cooperação e falha
- Andar-piloto: **3 rotas de labirinto** (direta perigosa · longa com recursos · técnica com mecanismo); 2 checkpoints pessoais; 3 configurações de objetivo anunciadas; labirinto 1–6 jogadores; chefe para 6.
- Âncora de exemplo resolvida por operação manual (interrupção guarda 50% do progresso por 8 s), cobertura de aliado, Água/Terra ajudam, FOR/Ímpeto ou mobilidade (induzir investida); só 1 oportunidade de colisão ativa por vez.
- Encontro: começa com hostilidade de um conjunto conectado; trocar de alvo não cria outro; reserva de cura do chefe só restaura em vitória ou reset integral; ponto de descanso restaura após 8 s sem hostilidade.
- **Incapacitação:** 0 HP → caído até 25 s; reanimação 4 s interrompível, volta com 30% HP (sai da reserva do receptor); máx. 2 reanimações por jogador por tentativa; derrota coletiva → checkpoint; **sem perda de nível, atributo ou item**; materiais ficam; volta ao combate em ≤ 90 s.
- Grupo de 6; busca mostra capacidades (proteção, interrupção, alcance, sustentação), sem bloqueio por papel; vaga reservada 3 min; recompensa por participação (combate, objetivos, suporte, mitigação), sem DPS mínimo.
- Contratos: sessão de referência de 2 h; pagamento por contrato de ~17,5% de R (não 19%), contratos sobrepõem coleta e objetivos.

## 5. Veredito: **INCOMPLETO**
Exige: catálogos implementáveis (armas, técnicas, modificadores, equipamento, inimigos, receitas, consumíveis); uma jornada completa (criação → grupo → exploração → derrota → recuperação → chefe → fabricação → próxima sessão); um andar inteiro; economia por perfis de jogador; progressão coletiva e tardia (pós-100); separar metas de resultados de protótipo.
