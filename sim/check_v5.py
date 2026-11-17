"""Confere os números novos do v5 (parte 2) e roda as checagens do núcleo (check_v4).
Rodar: python3 sim/check_v5.py  → termina com "TUDO OK".
"""
import runpy, os

print("######## NÚCLEO (check_v4) ########")
runpy.run_path(os.path.join(os.path.dirname(__file__), "check_v4.py"))

def r(x):
    assert 0 <= x <= 60, "x = pontos investidos (0–60)"
    return x / (x + 40)

def confere(nome, valor, esperado, tol=0.01):
    ok = abs(valor - esperado) <= tol
    print(f"  {'ok ' if ok else 'ERRO'} {nome}: {valor:.3f} (doc: {esperado})")
    assert ok, nome

print("\n######## PARTE 2 ########")
print("== Núcleo v5: parry com teto ==")
confere("janela PER +60 (ms)", min(180, 140 + r(60) * 67), 180, 0.001)

print("\n== K.2 armas: dano bruto por segundo (K/tempo) ==")
# (leve K, leve tempo, pesado K, pesado tempo, bloqueia?, alcance)
armas = {
    "Desarmado": (0.45, 0.45, 1.10, 0.95, True, 1.4),
    "Espada curta": (0.55, 0.55, 1.25, 1.00, True, 1.8),
    "Espada longa": (0.62, 0.68, 1.45, 1.20, True, 2.3),
    "Duas espadas": (0.80, 0.70, 1.30, 1.10, False, 2.0),
    "Espada e escudo": (0.58, 0.65, 1.35, 1.15, True, 2.0),
    "Katana": (0.65, 0.62, 1.50, 1.10, False, 2.4),
    "Duas katanas": (0.84, 0.72, 1.35, 1.15, False, 2.2),
    "Machado grande": (0.85, 1.00, 1.90, 1.70, True, 2.6),
    "Machado pequeno": (0.58, 0.60, 1.25, 1.05, True, 1.7),
    "Dois machados": (0.76, 0.66, 1.25, 1.05, False, 1.8),
    "Arco": (0.55, 0.70, 1.50, 1.20, False, 30.0),
}
taxas = {}
for nome, (kl, tl, kp, tp, bloq, alc) in armas.items():
    taxa = 0.5 * kl / tl + 0.5 * kp / tp      # mistura 50/50 leve/pesado
    taxas[nome] = taxa
    print(f"  {nome:16s} {taxa:.3f}  bloqueio={'sim' if bloq else 'não'}  alcance={alc} m")
corpo = {n: t for n, t in taxas.items() if armas[n][5] < 10}
media = sum(corpo.values()) / len(corpo)
for n, t in corpo.items():
    assert abs(t / media - 1) <= 0.15, f"{n} fora de ±15% do dano bruto médio"
print(f"  ok  todas as armas corpo a corpo a até ±15% da média ({media:.3f}) — diferenças pagas em defesa/alcance")
sem_bloq = [t for n, t in corpo.items() if not armas[n][4]]
com_bloq = [t for n, t in corpo.items() if armas[n][4]]
assert sum(sem_bloq) / len(sem_bloq) > sum(com_bloq) / len(com_bloq)
print("  ok  armas sem bloqueio têm mais dano bruto que as com bloqueio (troca coerente)")
assert taxas["Arco"] < media
print("  ok  arco (30 m) tem menos dano bruto que a média corpo a corpo")

print("\n== L.3 peso e carga ==")
limite = lambda for_inv: 12 + 0.3 * for_inv
L = lambda peso, for_inv: max(0.0, min(1.0, (peso - limite(for_inv)) / 10))
esquiva = lambda peso: 20 * (1 + peso / 40)
confere("limite FOR +60", limite(60), 30)
confere("esquiva com peso 16", esquiva(16), 28)
confere("L pesada (16) + armas (6) sem FOR", L(22, 0), 1.0)
confere("L pesada + armas com FOR +60", L(22, 60), 0.0)
confere("L pesada + armas + 10 de material, FOR +30", L(32, 30), 1.0)

print("\n== R / AF contratos (sessão de 2 h) ==")
R1 = 870
contrato = 0.175 * R1
confere("contrato camada 1", contrato, 152.25)
confere("8 contratos por dia", 8 * contrato, 1218.0)
confere("média por hora na sessão de 2 h", 8 * contrato / 2, 609.0)   # = 70% de R (núcleo G.1)

print("\n== S.2 derrota ==")
def derrota(xp_nivel, materiais, protegido=False, selo=False, fronteira=False, infamia=False):
    xp = 0 if fronteira else xp_nivel * (0.05 if protegido else 0.10)
    frac = 0 if selo else (1.0 if infamia else (0.25 if protegido else 0.5))
    return xp, materiais * frac
confere("XP perdido (nível com 10.000)", derrota(10000, 40)[0], 1000)
confere("materiais no túmulo (40)", derrota(10000, 40)[1], 20)
confere("protegido: materiais", derrota(10000, 40, protegido=True)[1], 10)
confere("com Selo de Retorno", derrota(10000, 40, selo=True)[1], 0)
confere("Fronteira: XP", derrota(10000, 40, fronteira=True)[0], 0)
confere("Fronteira com Infâmia: materiais", derrota(10000, 40, fronteira=True, infamia=True)[1], 40)

print("\n== P.3 diretor de encontros ==")
orc = lambda jogadores: 4 * jogadores
custo = {"comum": 1, "especialista": 1.5, "elite": 3}
grupo4 = 2 * custo["elite"] + 4 * custo["especialista"] + 4 * custo["comum"]
confere("orçamento grupo de 4", orc(4), 16)
assert grupo4 <= orc(4)
print(f"  ok  exemplo (2 elites + 4 especialistas + 4 comuns = {grupo4}) cabe no orçamento")

print("\n== Escala por camada ==")
confere("HP_camada 10", 1000 * 1.09 ** 9, 2171.89, 0.01)

print("\nTUDO OK")
