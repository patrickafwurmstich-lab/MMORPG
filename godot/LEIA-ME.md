# MMORPG — Andar 1 (protótipo no Godot 4)

## Como abrir
1. Abra o **Godot 4** (4.4 ou mais novo, versão *Standard*, não a .NET).
2. Clique em **Importar**, escolha a pasta `MMORPG_Godot` e selecione o arquivo `project.godot`.
3. Na primeira vez, o Godot importa o personagem (`privado/personagens_ithappy.glb`). Isso leva alguns segundos.
4. Aperte **F5** para jogar.

## Controles
| Tecla | Ação |
|---|---|
| WASD | mover |
| Shift | disparar (gasta resistência) |
| Mouse / roda | câmera / zoom |
| Clique esquerdo | ataque leve (combo de 3) |
| E | ataque pesado |
| Q | golpe de Ímpeto (custa 50) |
| Clique direito | bloquear (apertar na hora do golpe = **aparar**) |
| Espaço | esquiva (na hora do golpe = **perfeita**, devolve o custo e dá +20 de Ímpeto) |
| Tab / botão do meio | travar o alvo |
| R | reiniciar |
| Esc | soltar o mouse |
| F1 | esconder a ajuda |

## O que tem
- Personagem ithappy com as animações dele (parado, correr, levar golpe, morrer). Os ataques são gerados por código, porque o pacote não tem animações de ataque.
- Calibração v1.1:
  - espada longa: leve K .62 / T .68 s; pesado K 1.45 / T 1.20 s;
  - P_arma 57,5 e armadura média 85;
  - defesa D.1: i-frames de 0,30 s; esquiva perfeita até 0,12 s; janela de aparar de 153 ms; bloqueio deixa passar 30%; resistência regenera 18/s; postura quebrada atordoa 2 s com dano ×1,3.
- Inimigos:
  - 2 bonecos de treino, que mostram o DPS;
  - 2 lobos: 650 de vida, 80 de dano, aviso de 0,55 s;
  - 1 golem: 1.100 de vida, 160 de dano, aviso de 1,0 s.
- Golpe pelas costas (flanco) dá ×1,3. O número aparece em amarelo.

## Observações
- A pasta `privado/` (modelos ithappy) **não vai para o GitHub**: está no `.gitignore`.
- Sem o GLB, o jogo usa um boneco de cápsula no lugar e continua funcionando.
