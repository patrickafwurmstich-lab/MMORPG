# MMORPG — Sistemas de jogo

Mecânica completa de um MMORPG de ação (combate tipo Toram Online, torre de andares estilo Sword Art Online T1). Só sistemas, sem história nem personagens.

**Documento atual (v8, em revisão), em 3 partes:**
1. [`docs/08-nucleo-v8.md`](docs/08-nucleo-v8.md) — regras e fórmulas
2. [`docs/08-jogo-v8.md`](docs/08-jogo-v8.md) — armas, inimigos, andar, morte, PvP, guildas, fim de jogo
3. [`docs/08-contratos-v8.md`](docs/08-contratos-v8.md) — precedência, tempo de combate, chefe e andar-piloto completos, Fronteira, cadeia produtiva, catálogos, Nova Era

**Árvore de habilidades completa (loop 3)** — [`docs/09-arvore/`](docs/09-arvore/):
`00-sistema` (6 atributos, 18 especializações, 15 ligações, status, PH) · `01..03` 11 armas × 30 nós · `04` 6 elementos × 24 · `05` 4 disciplinas × 18 · `06` 24 Artes Únicas. Total **579 nós + 24 Artes**. Conferir: `python3 sim/check_arvore.py` → `TUDO OK`.

**Verificação dos números:** `python3 sim/check_v8.py` → termina em `TUDO OK` (verificações aritméticas selecionadas).

| Pasta | O que tem |
|---|---|
| `docs/00-pesquisa-reclamacoes.md` | O que os jogadores reclamam (base do design) |
| `docs/01..04-sistemas-v*.md` | Versões do documento (v4 = fórmulas aprovadas; v5–v8 = loop 2) |
| `sim/` | Scripts que conferem as fórmulas e simulam a economia |
| `loop/` | Planos e revisões de cada IA, rodada por rodada |
| `STATUS.md` | Onde paramos / próximo passo |
