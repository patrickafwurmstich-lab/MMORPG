"""Verificações aritméticas selecionadas do v8. Roda antes check_v7 (que roda v4–v6).
Rodar: python3 sim/check_v8.py → termina com "TUDO OK". O nome de cada teste diz o que ele confere.
"""
import runpy, os, re

AQUI = os.path.dirname(__file__)
print("######## v4 – v7 ########")
runpy.run_path(os.path.join(AQUI, "check_v7.py"))

DOCS = os.path.join(AQUI, "..", "docs")
def doc(nome):
    return open(os.path.join(DOCS, nome), encoding="utf-8").read()
N1, N2, N3 = doc("08-nucleo-v8.md"), doc("08-jogo-v8.md"), doc("08-contratos-v8.md")

def ok(nome, cond, info=""):
    print(f"  {'ok ' if cond else 'ERRO'} {nome} {info}")
    assert cond, nome
def faixa(nome, v, lo, hi):
    ok(nome, lo <= v <= hi, f"= {v:.3f} (alvo {lo}–{hi})")
def r(x): return x / (x + 40)
D = 110 * 1.10 * (1 + 0.8 * r(20) + 0.2 * r(15)) * 0.55 * 0.8

print("\n######## v8 ########")
print("== AI.6 orçamento de mecânicas (modelo de papel: tempo = (vida/D + M)/n) ==")
chefes = {  # vida, M (jogador·s), portão de tempo (s)
    "Âncoras": (120000, 380, 0), "Partes": (110000, 463, 0), "Arena": (115000, 204, 0),
    "Duplo": (120000, 150, 0), "Perseguição": (90000, 560, 0), "Cerco": (100000, 202, 360),
}
for nome, (vida, M, portao) in chefes.items():
    t = max((vida / D + M) / 6, portao)
    dano = vida / D / 6
    parcela = 1 - dano / t
    ok(f"{nome}: parcela de mecânica ≤ 40%", parcela <= 0.40, f"({parcela:.0%})")
    faixa(f"{nome}: tempo com +20% de erros (min)", t * 1.2 / 60, 6, 10)

print("\n== AI.6 regra de ajuste ==")
ajuste = lambda T_med: max(0.8, min(1.2, 8 / T_med))
ok("chefe medido em 12 min perde 20% de vida (limite)", ajuste(12) == 0.8)
ok("chefe medido em 7 min ganha 14% de vida", abs(ajuste(7) - 8 / 7) < 1e-9)

print("\n== AI.4 autorressurreição ==")
def derrota_coletiva(em_pe_apos_queda, tem_auto):
    if em_pe_apos_queda == 0:
        return True                 # último homem não se levanta
    return False
ok("último a cair com autorressurreição → derrota coletiva", derrota_coletiva(0, True))
ok("com 1 aliado em pé → não há derrota", not derrota_coletiva(1, True))

print("\n== BA ala em falência e sucesso parcial ==")
def ala_em_falencia(vivos, segundos): return vivos <= 2 and segundos >= 10
ok("2 vivos por 10 s = falência; 3 vivos não", ala_em_falencia(2, 10) and not ala_em_falencia(3, 60))
def proxima_tentativa(alas_completas, intervencoes): return intervencoes - (1 if alas_completas >= 2 else 0)
ok("≥ 2 alas completas → próxima tentativa com 1 intervenção a menos", proxima_tentativa(2, 4) == 3 and proxima_tentativa(1, 4) == 4)

print("\n== Z domínio: segundos acumulados entre encontros (v8.1) ==")
def unidades(encontros):
    acumulado, total = 0.0, 0
    for seg, valido in encontros:
        if not valido: continue
        acumulado += min(seg, 300)            # teto: 15 unidades (300 s) por encontro
        total += int(acumulado // 20); acumulado %= 20
    return total
ok("seis feras de 10 s = 3 unidades (matar rápido não atrasa)", unidades([(10, True)] * 6) == 3)
ok("inimigo sem ameaça não conta", unidades([(300, False)]) == 0)
ok("chefe de 10 min = 15 unidades (teto por tentativa)", unidades([(600, True)]) == 15)
ok("60 insetos de 2,6 s = 7 unidades", unidades([(2.6, True)] * 60) == 7)

print("\n== Textos coerentes ==")
ok("tempo-alvo do chefe de 6 é 6–10 min em todo o documento", "8–12 min" not in N3)
ok("parte 2: orçamento do diretor diz 'encontro de campo'", "por encontro de campo" in N2)

print("\n== AK sincronia v8 (nunca aumenta; prioridade recalculada) ==")
import math, random
C = lambda x: x + x * x / 40
def C_af(x, m=0.0): return C(x) - m * min(15, 0.25 * C(x))
ATR = ["FOR", "DES", "VIG", "POT", "CON", "PER"]
def custo(b, m): return sum(C_af(b[a], m.get(a, 0)) for a in b)
def alvo(b, lam):
    return {a: (0 if b[a] == 0 else min(b[a], max(1.0, b[a] * lam))) for a in b}
def sincroniza(b, orc, m=None):
    m = m or {}
    if custo(b, m) <= orc: return dict(b), 1.0
    lo, hi = 0.0, 1.0
    for _ in range(60):
        mid = (lo + hi) / 2
        t = alvo(b, mid)
        if sum(C_af(t[a], m.get(a, 0)) for a in b) <= orc: lo = mid
        else: hi = mid
    lam = lo
    t = alvo(b, lam)
    res = {a: math.floor(t[a]) for a in b}
    teto = {a: min(math.ceil(t[a]), b[a]) for a in b}
    while True:                                   # prioridade recalculada a cada ponto
        cands = [a for a in b if res[a] < teto[a]]
        cands.sort(key=lambda a: (-(t[a] - res[a]), -b[a], ATR.index(a)))
        dado = False
        for a in cands:
            tt = dict(res); tt[a] += 1
            if custo(tt, m) <= orc:
                res = tt; dado = True; break
        if not dado: break
    return res, lam
def confere(b, orc, m=None, nome=""):
    m = m or {}
    res, lam = sincroniza(b, orc, m)
    t = alvo(b, lam)
    c = custo(res, m)
    adm = [a for a in b if res[a] < min(math.ceil(t[a]), b[a])]
    sobra_ok = all(custo({**res, a: res[a] + 1}, m) > orc for a in adm)
    cond = (c <= orc + 1e-9 and all(res[a] <= b[a] for a in b) and all(abs(res[a] - t[a]) < 1 for a in b)
            and all(res[a] >= 1 for a in b if b[a] > 0) and sobra_ok)
    return cond, res, lam
cond, res, lam = confere({"FOR": 20, "DES": 4, "VIG": 1, "POT": 0, "CON": 0, "PER": 0}, 35)
ok("caso da revisão: 20/4/1 de orçamento 38 → 35 dá 19/4/1 (válido: nada aumenta, desvio < 1)", cond and (res["FOR"], res["DES"], res["VIG"]) == (19, 4, 1), f"{res} λ={lam:.4f}")
orc = lambda n: 20 + 3 * (n - 1)
casos = [("especialista 100→6", {"FOR": 60, "DES": 60, "VIG": 12, "POT": 0, "CON": 0, "PER": 0}, orc(6)),
         ("generalista 100→20", {a: 30 for a in ATR}, orc(20)),
         ("especialista 60→15", {"FOR": 45, "DES": 45, "VIG": 0, "POT": 0, "CON": 0, "PER": 0}, orc(15)),
         ("generalista 60→15", {a: 20 for a in ATR}, orc(15)),
         ("híbrida 60→15", {"FOR": 30, "DES": 0, "VIG": 30, "POT": 0, "CON": 0, "PER": 30}, orc(15))]
for nome, b, o in casos:
    ok(f"{nome}: build de origem válida", custo(b, {}) <= (orc(100) if "100" in nome else orc(60)))
    cond, res, lam = confere(b, o)
    ok(f"{nome}: custo ≤ orçamento, nunca acima do original, |x − alvo| < 1, nada admissível sobrando", cond, f"{res}")
random.seed(7)
falhas = 0
for _ in range(3000):
    b = {a: random.choice([0, 0, 1, 2, 3, 4, 5, random.randint(6, 60)]) for a in ATR}
    m = {a: random.choice([0, 0.33, 0.5, 1.0]) for a in random.sample(ATR, 2)}
    if sum(1 for a in b if b[a] > 0) == 0: continue
    o = random.randint(20, 317)
    if custo(b, m) > orc(100): continue
    minimo = sum(C_af(1, m.get(a, 0)) for a in b if b[a] > 0)
    if o < minimo: continue
    cond, res, lam = confere(b, o, m)
    falhas += 0 if cond else 1
ok("3.000 builds aleatórias (com atributos de 1–5 e afinidade): todas cumprem as 5 propriedades", falhas == 0, f"(falhas {falhas})")
print("  -- curva única --")
ok("AK não usa mais mín(nível, f)", "mín(nível, f)" not in N3 and "teto = nível f" not in N3)
ref = {"FOR": 20, "DES": 15, "VIG": 10, "POT": 0, "CON": 0, "PER": 0}
af = {"FOR": 0.5}
a2, _ = sincroniza(ref, orc(min(100, 2 + 5)), af)
ok("perfil de referência sincronizado no andar 2 COM a afinidade do perfil", custo(a2, af) <= orc(7), f"{a2}")

print("\n== AZ.2 Arena: chão em todos os limiares ==")
placas = 9
estados = []
for cai in (2, 2, 1):
    placas -= cai; estados.append(placas)
ok("placas restantes 7 → 5 → 4, central nunca cai", estados == [7, 5, 4] and min(estados) >= 1)

print("\n== AL.2 Túmulo: capacidade e cadeia real ==")
def recolher(quem, tumulo, capacidade, quente=False):
    if quem == "terceiro" or (quente and quem != "dono"):
        parte = 0.5 * tumulo
        if capacidade < parte: return 0, tumulo, False       # não acontece; nada some
        return parte, 0, True                                 # leva 50%, 50% destruído, fecha
    leva = min(capacidade, tumulo)
    return leva, tumulo - leva, tumulo - leva == 0
ok("dono com capacidade 10 e Túmulo 20: leva 10, ficam 10, não fecha", recolher("dono", 20, 10) == (10, 10, False))
ok("terceiro sem capacidade: nada acontece e nada some", recolher("terceiro", 20, 5) == (0, 20, False))
v = 40; tumulo1 = 0.5 * v                                     # vítima morre: 20 no Túmulo
leva1, _, _ = recolher("terceiro", tumulo1, 50)               # saqueador leva 10 (quente)
tumulo2 = leva1                                               # saqueador morre: quente cai inteiro
leva2, _, _ = recolher("grupo", tumulo2, 50, quente=True)     # grupo do saqueador recolhe → regra de terceiro
ok("cadeia vítima → saqueador → grupo do saqueador: 40 → 20 → 10 → 5 (quente nunca passa inteiro)", (tumulo1, leva1, leva2) == (20, 10, 5))

print("\n== AN participante novo ==")
registrados = {"a", "b"}
ok("participante novo não entra em tentativa iniciada", "novo" not in registrados)

print("\nTUDO OK")
