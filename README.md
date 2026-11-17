# MMORPG — Sistemas de jogo

Mecânica completa de um MMORPG de ação (combate tipo Toram Online, torre de andares estilo Sword Art Online T1). Só sistemas, sem história nem personagens.

**Documento atual (v5, em revisão):** [`docs/05-nucleo-v5.md`](docs/05-nucleo-v5.md) (regras) + [`docs/05-jogo-completo-v5.md`](docs/05-jogo-completo-v5.md) (armas, inimigos, andar, morte, PvP, guildas, fim de jogo).
**Verificação dos números:** `python3 sim/check_v5.py` → termina em `TUDO OK`.

| Pasta | O que tem |
|---|---|
| `docs/00-pesquisa-reclamacoes.md` | O que os jogadores reclamam (base do design) |
| `docs/01..04-sistemas-v*.md` | Versões do documento (v4 = aprovada) |
| `sim/` | Scripts que conferem as fórmulas e simulam a economia |
| `loop/` | Planos e revisões de cada IA, rodada por rodada |
| `STATUS.md` | Onde paramos / próximo passo |
