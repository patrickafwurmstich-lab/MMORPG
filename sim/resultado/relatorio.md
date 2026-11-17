# Simulador de equilíbrio — resultado

Gerado por `node sim/simulador.js` com os dados de `prototipo/v2/dados.js` (os mesmos 546 nós do loop 3) e os números de referência dos contratos v8 (seção AI). 88 builds no perfil de referência (nível 15) e 242 no nível 100 (11 armas × 8 perfis × 1 a 3 elementos).

## O que o simulador mede e o que ele NÃO mede
- **Tempo** = média só das lutas vencidas; a chance de morrer aparece em coluna própria.
- **Mede:** dano/s no boneco, impacto/s (quebra de postura), tempo para matar uma fera (650·s), um constructo (1.100·s), um grupo de 4 feras e a parte de um jogador no Chefe de Andar (120.000·s ÷ 6 = 20.000·s, postura 1.000 ÷ 6, ataque de 300·s a cada 2,6 s). Média de várias lutas com um jogador "médio" (30% de esquivas perfeitas/parry, 15% de golpes levados) e um "bom" (55% / 5%).
- **Usa:** r(x), C(x), dano com pesos por ação, armadura 200·s/(200·s+A), H de DES, H_c de CON, Ímpeto e continuações, Sobrecarga (3 cargas), Comprimir em área, Abertura/Punir, Fogo −30·s, Raio +25% de impacto, reação elemental, Frenesi, Ritmo, Marca, Flanco (40% do tempo); K, impacto, tempo, custo e recarga de cada técnica e as transformações que mudam esses números. O jogador escolhe sempre a ação de maior dano/s disponível.
- **Não usa:** efeitos em texto livre (passivas, nós-chave e técnicas com condição como "só contra alvo atordoado" ficam de fora), Artes, equipamento, posicionamento e mecânicas de chefe. Mostra o equilíbrio dos **números-base**; não substitui jogar.

## 1. Calibração com o documento (perfil de referência da camada 1: nível 15, principal +20, secundário +15, VIG +10, 18 PH)
| Medida | Documento | Simulador (mediana das 88 builds) | Faixa (mín–máx) | Situação |
|---|---|---|---|---|
| Dano/s efetivo (× 0,55 de tempo atacando) | ≈ 70 | 87,2 | 72,5–104,9 | **fora** |
| Fera (650) | 8–12 s | 4,5 s | 2,9–5,6 s | **fora** |
| Constructo (1.100) | 14–18 s | 7,5 s | 5,9–9,2 s | **fora** |
| Parte de 1 jogador no Chefe de Andar (20.000) | ≈ 287 s de dano (5 min) | 127,5 s | 104,8–160,3 s | **fora** |

Leitura: o documento calcula o tempo de combate supondo **55% do tempo atacando**; o simulador já desconta o tempo gasto se defendendo, curando e reposicionando depois de golpes. Diferença grande aqui indica que as técnicas da árvore somam mais (ou menos) dano do que o modelo de papel previa.

## 2. Metas de diversidade (nível 100)
| Meta | Resultado | Situação |
|---|---|---|
| ≥ 8 builds a ≤ 15% da melhor no chefe | 24 builds (melhor 76 s) | **cumpre** |
| Melhor build de cada arma a ±15% da média | 10/11 | **não cumpre**: Desarmado +15% de tempo |
| Generalista ≤ 15% atrás da melhor | 3% atrás | **cumpre** |
| Todo perfil de atributo com alguma build a ≤ 15% | 5/8 | **não cumpre**: Força +20%, Leitor (PER) +29%, Mago +38% |

### Melhor build de cada arma (nível 100)
| Arma | Perfil | Elementos | Chefe (médio) | vs média | Chefe (bom) | Dano/s boneco | Impacto/s | Fera | 4 feras |
|---|---|---|---|---|---|---|---|---|---|
| Katana | Força+Destreza | Fogo | 76 s (morre 20%) | -15% | 76 s | 249 | 22,2 | 2,7 s | 2,6 s |
| Espada Curta | Lâmina mágica | Fogo | 80 s | -11% | 77 s | 241 | 20,1 | 2,3 s | 8,2 s |
| Dois Machados | Lâmina mágica | Fogo | 80 s (morre 10%) | -10% | 79 s | 232 | 22,9 | 2,5 s | 4,2 s |
| Machado Pequeno | Força+Destreza | Raio | 88 s | -2% | 87 s | 217 | 28,2 | 2,0 s | 3,6 s |
| Duas Katanas | Lâmina mágica | Fogo | 90 s | +0% | 87 s | 213 | 19,9 | 3,8 s | 3,9 s |
| Duas Espadas | Força+Destreza | Raio | 91 s | +2% | 86 s | 210 | 22,7 | 3,4 s | 4,2 s |
| Espada E Escudo | Generalista | Fogo | 91 s | +2% | 90 s | 209 | 21,7 | 3,3 s | 5,3 s |
| Arco | Lâmina mágica | Fogo | 92 s (morre 30%) | +3% | 90 s | 218 | 11,6 | 2,9 s | 4,2 s |
| Machado Grande | Generalista | Fogo | 96 s (morre 10%) | +7% | 94 s | 195 | 21,4 | 2,9 s | 3,5 s |
| Espada Longa | Lâmina mágica | Fogo | 96 s | +8% | 89 s | 209 | 21,4 | 3,5 s | 4,8 s |
| Desarmado | Generalista | Fogo | 103 s | +15% | 94 s | 198 | 22,0 | 3,1 s | 4,4 s |

### Perfis de atributo (nível 100)
| Perfil | Atributos | Melhor no chefe | vs melhor perfil | Média dano/s | Morre no chefe (média) | Tempo sem energia (< 15) | Básico por falta de recurso |
|---|---|---|---|---|---|---|---|
| Força | FOR 60 · DES 12 · VIG 60 · POT 1 | 92 s | +20% | 183 | 7% | 0% | 0% |
| Destreza | FOR 30 · DES 60 · VIG 50 · POT 1 | 84 s | +10% | 196 | 6% | 0% | 1% |
| Força+Destreza | FOR 60 · DES 60 · VIG 12 · POT 1 | 76 s | +0% | 214 | 7% | 0% | 1% |
| Tanque | FOR 45 · DES 37 · VIG 60 | 86 s | +12% | 196 | 1% | 0% | 1% |
| Leitor (PER) | FOR 1 · DES 50 · VIG 30 · PER 60 | 98 s | +29% | 168 | 11% | 0% | 2% |
| Mago | DES 1 · VIG 12 · POT 60 · CON 60 | 106 s | +38% | 159 | 32% | 43% | 47% |
| Lâmina mágica | FOR 45 · DES 30 · VIG 37 · POT 45 | 80 s | +4% | 207 | 5% | 20% | 28% |
| Generalista | FOR 30 · DES 30 · VIG 30 · POT 30 · CON 30 · PER 30 | 79 s | +3% | 204 | 5% | 39% | 44% |

### Elementos no perfil Mago (nível 100)
| Elementos | Chefe | Dano/s boneco | 4 feras |
|---|---|---|---|
| Fogo | 117 s | 172 | 5,5 s |
| Raio | 140 s | 144 | 4,6 s |
| Fogo + Raio | 125 s | 159 | 3,4 s |
| Fogo + Gelo + Raio | 125 s | 163 | 4,0 s |

## 3. Técnicas: vale a pena usar no lugar do ataque básico?
Medida (perfil neutro, 30 em tudo): **ganho** = quanto dano/s a mais você tem usando a técnica sempre que a recarga deixa, em vez de só bater com o ataque leve da arma. Negativo = dá menos dano do que o básico no mesmo tempo (só vale pelo impacto, controle ou utilidade).

### As 15 de maior ganho
| Técnica | Árvore | K | Tempo | Recarga | Custo | Ganho | Área |
|---|---|---|---|---|---|---|---|
| Tiro em leque | Arco | 3,00 | 1,30 s | 12,0 s | 22R | +19% | sim |
| Projétil de vento | Vento | 1,30 | 0,90 s | 3,0 s | 20E | +12% |  |
| Projétil de fogo | Fogo | 1,40 | 1,00 s | 3,0 s | 20E | +12% |  |
| Projétil de gelo | Gelo | 1,40 | 1,00 s | 3,0 s | 20E | +12% |  |
| Projétil de raio | Raio | 1,40 | 1,00 s | 3,0 s | 20E | +12% |  |
| Projétil de terra | Terra | 1,40 | 1,00 s | 3,0 s | 20E | +12% |  |
| Projétil de água | Água | 1,40 | 1,00 s | 3,0 s | 20E | +12% |  |
| Chuva de flechas | Arco | 2,40 | 1,50 s | 12,0 s | 20R | +12% | sim |
| Lança ígnea | Fogo | 1,20 | 0,70 s | 4,0 s | 18E | +11% |  |
| Mil folhas | Katana | 2,50 | 1,20 s | 12,0 s | 20R | +9% |  |
| Tempestade de machados | Machado Pequeno | 3,00 | 1,60 s | 16,0 s | 25R | +8% | sim |
| Flecha elemental | Arco | 1,30 | 1,10 s | 6,0 s | 22E | +8% |  |
| Lâmina d'água | Água | 1,80 | 1,00 s | 10,0 s | 30E | +7% | sim |
| Iai rápido | Katana | 1,00 | 0,50 s | 6,0 s | 15R | +7% |  |
| Tiro perfurante | Arco | 1,40 | 1,20 s | 8,0 s | 18R | +7% |  |

### Técnicas de dano que dão MENOS dano que o ataque básico (42 de 116)
| Técnica | Árvore | K | Impacto | Tempo | Recarga | Ganho | O texto dá outro valor? |
|---|---|---|---|---|---|---|---|
| Guarda de passagem | Espada Longa | 0,35 | 15 | 0,90 s | 8,0 s | -6% | passo lateral 1,5 m. |
| Bola elétrica | Raio | 0,30 | 0 | 1,20 s | 16,0 s | -5% | esfera lenta que anda 8 m em 4 s e eletrifica quem estiver a 2 m. |
| Chão em brasa | Fogo | 0,25 | 0 | 1,00 s | 14,0 s | -5% | área de 3 m por 6 s; no 1º tique válido em cada alvo aplica Queimando … |
| Tornado | Vento | 0,40 | 0 | 1,60 s | 24,0 s | -5% | tornado de 2 m anda 6 m em 4 s puxando comuns para ele. |
| Tiro de atordoar | Arco | 0,40 | 35 | 1,00 s | 10,0 s | -4% | interrompe preparo marcado à distância. |
| Golpe de escudo | Espada E Escudo | 0,30 | 40 | 0,70 s | 8,0 s | -4% | interrompe preparo marcado. |
| Tiro de pinos | Arco | 0,40 | 45 | 1,20 s | 16,0 s | -4% | Preso 1,5 s. |
| Arremesso de grupo | Desarmado | 0,50 | 35 | 1,10 s | 14,0 s | -4% | agarrão que derruba até 3 comuns em volta (1 m). |
| Avanço do baluarte | Espada E Escudo | 0,60 | 40 | 1,20 s | 14,0 s | -3% | arrasta comuns 6 m. |
| Rede | Arco | 0,30 | 40 | 1,00 s | 18,0 s | -3% | derruba aviário em voo 3 s. |
| Investida de escudo | Espada E Escudo | 0,50 | 35 | 0,90 s | 10,0 s | -3% | avança 4 m bloqueando de frente. |
| Brasa persistente | Fogo | 0,40 | 0 | 0,80 s | 12,0 s | -3% | marca o alvo 8 s: cada golpe de Fogo seu nele +8% de dano (não acumula… |
| Corrente | Raio | 0,50 | 0 | 0,80 s | 10,0 s | -3% | salta para 3 alvos; interrompe conjuração de comum (chefe só conjuraçõ… |
| Dança de lâminas | Duas Espadas | 0,90 | 12 | 1,00 s | 7,0 s | -3% | move-se 4 m cortando. |
| Armadilha | Arco | 0,50 | 30 | 1,00 s | 14,0 s | -2% | prende comum 2 s (máx. 2 armadilhas no chão). |
| Rasteira | Desarmado | 0,40 | 25 | 0,60 s | 9,0 s | -2% | derruba comum 1,2 s; contra elite e chefe só o impacto I25 (sem derrub… |
| Arremesso do gigante | Desarmado | 1,20 | 60 | 1,60 s | 20,0 s | -2% | agarra elite com postura < 20% e arremessa contra outro inimigo: os do… |
| Gancho | Machado Pequeno | 0,50 | 20 | 0,70 s | 10,0 s | -2% | puxa comum 4 m até você. |
| Interceptação | Espada Longa | 0,55 | 30 | 0,75 s | 9,0 s | -1% | interrompe preparo marcado. |
| Escudo arremessado | Espada E Escudo | 0,60 | 35 | 0,90 s | 14,0 s | -1% | ricocheteia em até 3 alvos e volta em 1,5 s (sem bloqueio até voltar). |
| Golpe de cabo | Machado Grande | 0,40 | 30 | 0,60 s | 8,0 s | -1% | rápido, interrompe preparo marcado. |
| Espinhos | Terra | 0,80 | 30 | 1,00 s | 14,0 s | -1% | espinhos saem do chão numa linha de 6 m; derrubam comuns. |
| Machado bumerangue | Machado Pequeno | 0,80 | 20 | 1,00 s | 12,0 s | -1% | vai e volta acertando 2 vezes (exceção na ficha). |
| Investida de ombro | Desarmado | 0,60 | 30 | 0,70 s | 7,0 s | -1% | avança 3 m e empurra comuns 1 m. |
| Cruz ascendente | Duas Espadas | 0,90 | 30 | 0,90 s | 8,0 s | -1% | joga comum para o alto 1 s. |
| Raio em cadeia | Raio | 0,90 | 8 | 1,00 s | 8,0 s | -1% | salta 4 vezes (−15% a cada salto). |
| Corrente | Machado Pequeno | 0,70 | 30 | 0,90 s | 14,0 s | -1% | puxa você até o alvo marcado. |
| Quebra-ossos | Desarmado | 0,90 | 45 | 1,00 s | 12,0 s | -1% | agarrão em elite com postura < 30% (fora disso: empurrão K0,40). |
| Quebra-escudo | Machado Pequeno | 0,80 | 40 | 0,90 s | 9,0 s | -1% | contra guarda frontal: quebra 2 s. |
| Corte dos tendões | Espada Curta | 0,70 | 20 | 0,80 s | 14,0 s | -1% | alvo Lento 40% por 4 s e não corre. |
| Lâmina projetada | Katana | 0,80 | 12 | 0,80 s | 7,0 s | -1% | disparo: lâmina do seu elemento a 10 m. |
| Salto selvagem | Dois Machados | 1,10 | 30 | 1,00 s | 9,0 s | -0% | salta 5 m em área. |
| Pegada de gigante | Machado Grande | 0,80 | 50 | 1,00 s | 14,0 s | -0% | dano em parte quebrável conta 2×. |
| Rachar armadura | Machado Grande | 0,90 | 20 | 1,10 s | 12,0 s | -0% | −40·s de armadura no alvo 8 s (não soma com Fogo: vale a maior). |
| Área de fogo | Fogo | 1,60 | 15 | 1,60 s | 8,0 s | -0% | 3 m. |
| Área de gelo | Gelo | 1,60 | 15 | 1,60 s | 8,0 s | -0% | 3 m. |
| Área de raio | Raio | 1,60 | 15 | 1,60 s | 8,0 s | -0% | 3 m. |
| Área de terra | Terra | 1,60 | 20 | 1,60 s | 8,0 s | -0% | 3 m. |
| Área de água | Água | 1,60 | 15 | 1,60 s | 8,0 s | -0% | 3 m. |
| Área de vento | Vento | 1,50 | 15 | 1,50 s | 8,0 s | -0% | 3 m. |
| Palma que sela | Desarmado | 0,80 | 35 | 0,80 s | 16,0 s | -0% | sela morto-vivo e silencia elemental 2 s (silêncio conta na categoria … |
| Terremoto arcano | Terra | 2,00 | 50 | 2,00 s | 24,0 s | -0% | área 4 m; derruba comuns; você fica imóvel 0,5 s depois. |

### Técnicas de dano que nenhuma build do nível 100 escolheu (23, só das árvores testadas, sem as condicionais)
Arremesso de grupo (Desarmado) · Quebra-ossos (Desarmado) · Arremesso do gigante (Desarmado) · Palma que sela (Desarmado) · Guarda de passagem (Espada Longa) · Corte em meia-lua (Espada Longa) · Chuva de cortes (Duas Espadas) · Avanço do baluarte (Espada E Escudo) · Escudo arremessado (Espada E Escudo) · Reflexo duplo (Duas Katanas) · Dança das garças (Duas Katanas) · Golpe de cabo (Machado Grande) · Rachar armadura (Machado Grande) · Pegada de gigante (Machado Grande) · Quebra-escudo (Machado Pequeno) · Corte em X (Dois Machados) · Tiro de atordoar (Arco) · Armadilha (Arco) · Rede (Arco) · Tiro de pinos (Arco) · Chão em brasa (Fogo) · Toque glacial (Gelo) · Bola elétrica (Raio)
