# Loop 4 (equilíbrio medido) — ChatGPT: NÃO APROVADO como medição ("a especificação da árvore continua aprovada")
Reexecutou o código: reproduziu 87,2 / 4,5 s / 7,5 s; sem semente o resultado muda (31 → 38 builds).
## Bloqueadores do simulador
1. Dados importados perdem fichas: Guarda de passagem 0,20 s (é 0,90); Chão em brasa = 6 tiques de K0,25 (+Queimando), não 1; Bola elétrica e Tornado = K/s por 4 s; Machado bumerangue = 2 acertos; Tempestade de machados = K0,50 em até 6 alvos, 1 por alvo (o sim dava K3,00 em cada); transformações incompletas (Fenda concentrada, Palmas cruzadas). → representar explicitamente K por acerto, acertos por alvo, máx. de alvos, tiques, fases e todos os campos da transformação; não inferir por palavras.
2. FOR e PER sem funções aprovadas: impacto normal I = I_base × [1 + 0,6·r(FOR) + 0,4·r(CON)] (núcleo D.2) faltando; custo de bloqueio com FOR/VIG; parry com impacto 25 × [1 + 0,5·r(FOR) + 0,5·r(PER)]; janela comum até 180 ms / técnica 240 ms; sucesso de resposta sorteado pelo erro de tempo contra a janela (não fixo por perfil); Leitura também por bloqueio eficaz e interrupção; ponto fraco (FOR .3/DES .3/PER .4) com oportunidades explícitas.
3. Recursos e sobrevivência divergem do núcleo: cura de 280·s debitando 250·s (conservação implícita); quebra por parcela derivada dando Ímpeto (viola o contrato de eventos).
4. Ranking misturava vitória com morte (média com mortes cai de 106,5 s para 103,2 s) → tempo só das vitórias, mortalidade à parte, sementes, intervalos de confiança (10 lutas = intervalo 11–60%); 100 sementes na triagem, 400 nos finalistas.
5. Calibração compara definições diferentes de tempo → dois modos: validação abstrata (× 0,55 uma vez) e combate por eventos (tempo emerge, sem × 0,55).
6. Política de ação ruim para testar perfis: só dano imediato; Sobrecarga sempre gasta; sem valor de interromper; ignora ferramentas sem K; reação universal K0,80 inventada. → comparar políticas: sustentação, explosão em abertura, ruptura, defesa conservadora; sobretaxas somadas sobre o custo-base.
## Propostas (para ensaio depois de corrigir)
- Mago: "Pulso básico" K0,70, 1,0 s, POT .6/CON .4, 12 m, custo 0, sem elemento/contato/Sobrecarga; variante RegE = 4[1+r(CON)] + 4·r(CON)·r(POT).
- PER: corrigir a representação antes de dar poder.
- FOR: não empatar DPS de FOR/VIG (tem ~27,5% mais vida); aplicar ×1,36 de impacto, bloqueio, Carga e guardas antes de buffar.
- Calibração: ajustar vidas (F = DPS corrigido ÷ 70; se 87,2 ficar → ×1,2457: fera 9,3 s, constructo 15,7 s, chefe 286 s); 0,55 = defesa/reposicionamento, M = objetivos; não publicar com os números atuais.
- Técnicas: Execução ofensiva deve superar o básico; controle/proteção não precisa; +19% de rotação por uma técnica já é forte; não subir K em massa.
## Importantes
Vitória/TTK/distribuição separados; mesmo orçamento; não julgar FOR/VIG só por DPS; separar básico, rotação e explosão; mesma busca elemental para todos os perfis; chefe real com vida/postura/ataques compartilhados entre 6.
