# Árvore — mudanças da revisão 1 (ChatGPT + Grok)
**Bloqueadores corrigidos**
- Chaves do ramo C dos 6 elementos: 7 PH, 1 técnica + 3 passivas; check agora testa se cada chave é alcançável (PH, técnicas e passivas antes dela).
- Água 12 Senhor das marés: transferências 1:1; +10% de vida por reserva consumida em cura (teto de conservação). Arte 17: devolve só o saldo não consumido; alternativa "+10%" trocada por devolução antecipável (vínculo 5 s).
- Reprise e Memória da lâmina: só técnica ofensiva direta de arma, animação completa, K/I ×0,50 (Reprise, custo ×1,5), Memória paga custo cheio e recalcula; Reprise de apoio removida.
- Alternativas de Artes: Eco defensivo (2ª entrada manual, 70 ms), Rastro elemental (sem efeito do elemento), Último Fôlego→postura removida, Contratempo sem Ímpeto, Condutor vivo substitui o elemento.
- Abertura/exaustão de chefe pertencem à ficha do chefe (Zero absoluto, Geomante, Arquiteto do inverno reescritos).
- Rede de relâmpagos sem recursão (1 vínculo, 4 s, 6 m, 25% uma vez).
- Assassino de sombra: +15 p.p. de crítico até 40%. Maestro de aço: escolha no nível 4; 8 níveis = 2×K1,26, I45, 1,2 s, 28R.
- Métricas Magia e Suporte definidas; nenhum nó edita o Leitor (Atenção dividida: preço = −5% de movimento).
- Dívida de postura sob golpe (soma; quebra apaga o resto; sem quebra dupla). Ações derivadas (§7.1): não contam para Leitor/domínio/afinidade/descoberta nem geram recurso. Reações fora do espaço de reação usam input de técnica. Sincronia: especialização/ligação fica preparada mas inativa.
**Importantes**: custos da Modelagem e ordem de cálculo; trocas reais (Estilhaçar, Costas expostas, Contratempo da lâmina, Batida de guerra, Alvo sem guarda); Maremoto 0,11+0,12r; orçamento único de cargas; tempos de Guarda de passagem/Contra perfeito/Duelista; Revide manual em 0,6 s; Firmar só em arma com bloqueio (Respiração de aço, Respiração interna); Inabalável só nos 3 s da Provocação; Flecha de socorro e Fonte máx. 4 aliados; PvP de Curto-circuito, Toque glacial, Desvencilhar, Pano de fumaça; consentimento único; Anjo do campo sem mexer em tetos; Sobrevivente nato só tônicos; Rolo compressor e Iaijutsu absoluto com regra verificável; Fluxo, Distância segura, Rasteira; fórmulas de Vazão, Tenacidade e Estabilidade; periódicos; Sol interior não soma com Punir; Sangue quente fora da Fúria cega; Fúria cega +15% contra chefe; exclusão Último Fôlego × Sangue por fôlego; equivalência de dano marcada "não validada" com tabela de testes.
**Opcionais**: Olho clínico, Mapa mental, Eco com 2º alvo, nomes (katana: Preparar resposta; PER +55: Abertura conservada).

# Revisão 2 (Grok APROVADO; ChatGPT: ajustes locais)
- §7.1 virou **contrato de eventos**: original × parcela derivada, com tabela (parry + contra-ataque = 1 evento de defesa; Condutor vivo = ação original do aliado; Reprise/Memória = repetição sem recurso nem demonstração; Golpe de Ímpeto com continuações = 1 registro de DES; Rede = parcela). Parcela derivada não reproduz efeito auxiliar salvo exceção declarada (Reprise elemental).
- Periódicos calculáveis: Queimando padrão 20% em 6 tiques sobre dano já mitigado; percentual de vida é outra categoria; Lâmina flamejante, Chão em brasa e Cerco de fogo com números; Combustão só consome o saldo individual.
- Reprise 150% e Memória 100% do custo **final recalculado**, recursos especiais de novo; Memória de reação como exceção; Reprise curta com recarga 14 s.
- Último Fôlego: dívida = máx(0; D_efetivo − (vida antes − 1)); alternativa trocada por janela 3 s / recarga 90 s.
- Mão firme: +50 p.p. de estabilidade (teto 60%). Punho do espelho e Lâmina e reflexo com contador de Leitura explícito. Pavio curto substitui o acréscimo de preparo (−0,40 s). Fúria cega ×1,30 / ×1,45; Fúria contida ×1,10 / ×1,25. Estilhaçar 25 de Ímpeto no total. Costas expostas: 3 ações originais diferentes.
- Opcionais: testes com 1 Arte por preparação; "investimento mínimo do ramo"; Firmeza sem a chave 2 m / 3 m; curas em área: 4 por ação inteira.

# Decisão do Lucas: até 3 elementos (07-mistura-elementos.md)
- v1 → os dois NÃO APROVADO; v2: contato elemental 4 s, 1 reação por ação, recargas compartilhadas (dano 6 s, controle 10 s, apoio 12 s), potência q = 0,60 + 0,40·PH_i/ΣPH, PH habilitam formas (0,70/0,30) e o jogador prepara 1 por mistura, reação neutra sem herdar bônus, Ressonância por autorização (25 s), Maré/Fusão sem atalho. **Aprovada pelos dois.**
