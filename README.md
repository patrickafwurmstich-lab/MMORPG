# MMORPG — Sistemas de jogo

Mecânica completa de um MMORPG de ação (combate tipo Toram Online, torre de andares estilo Sword Art Online T1). Só sistemas, sem história nem personagens.

**Documento atual (v7, em revisão), em 3 partes:**
1. [`docs/07-nucleo-v7.md`](docs/07-nucleo-v7.md) — regras e fórmulas
2. [`docs/07-jogo-v7.md`](docs/07-jogo-v7.md) — armas, inimigos, andar, morte, PvP, guildas, fim de jogo
3. [`docs/07-contratos-v7.md`](docs/07-contratos-v7.md) — precedência, tempo de combate, chefe e andar-piloto completos, Fronteira, cadeia produtiva, catálogos, Nova Era

**Verificação dos números:** `python3 sim/check_v7.py` → termina em `TUDO OK` (verificações aritméticas selecionadas).

| Pasta | O que tem |
|---|---|
| `docs/00-pesquisa-reclamacoes.md` | O que os jogadores reclamam (base do design) |
| `docs/01..04-sistemas-v*.md` | Versões do documento (v4 = fórmulas aprovadas; v5–v7 = loop 2) |
| `sim/` | Scripts que conferem as fórmulas e simulam a economia |
| `loop/` | Planos e revisões de cada IA, rodada por rodada |
| `STATUS.md` | Onde paramos / próximo passo |
