"""Confere os números do docs/03-sistemas-v3.md (com verificações automáticas).
Rodar: python3 sim/check_v3.py   → termina com "TUDO OK" ou para no primeiro erro.
"""
import math

def r(x):
    return x / (x + 40)

def C(x):
    return x + x * x / 40

def confere(nome, valor, esperado, tol=0.6):
    ok = abs(valor - esperado) <= tol
    print(f"  {'ok ' if ok else 'ERRO'} {nome}: {valor:.2f} (doc: {esperado})")
    assert ok, nome

print("== A.1 golpe pesado (K=1,4, arma 120) ==")
for f, esp in ((0, 168), (5, 182.9), (20, 212.8), (60, 248.6)):
    confere(f"FOR +{f}", 120 * 1.4 * (1 + 0.8 * r(f)), esp)

print("\n== A.2 / A.3 velocidade e movimento ==")
H = 1 + 0.35 * r(60)
confere("ataque 1 s com DES +60 (s)", 0.2 + 0.8 / H, 0.861, 0.002)
v = lambda d, f, L: 5.5 * (1 + 0.10 * r(d) + 0.06 * r(f)) * (1 - 0.30 * L / (1 + r(f)))
confere("leve DES+60", v(60, 0, 0), 5.83, 0.01)
confere("carga máx FOR+60", v(0, 60, 1), 4.63, 0.01)

print("\n== A.4 Ímpeto: orçamento total fixo ==")
def d_leve(des):
    return 120 * 0.6 * (1 + 0.7 * r(des))
def golpe_impeto(imp, des):
    n = 1 if des < 20 else (2 if des < 40 else 3)
    dano = d_leve(des) * (imp / 100) * (1 + 3 * r(des))
    tempo = 0.45 * imp / 100
    return n, dano, tempo
confere("dano DES+60 Ímpeto 80", golpe_impeto(80, 60)[1], 229.0)
confere("tempo Ímpeto 80 (s)", golpe_impeto(80, 60)[2], 0.36, 0.001)
# monotonicidade: mais DES nunca piora dano por tempo
anterior = 0
for des in range(0, 61):
    n, dano, tempo = golpe_impeto(80, des)
    taxa = dano / tempo
    assert taxa >= anterior - 1e-9, f"DES +{des} piorou dano por tempo"
    anterior = taxa
print("  ok  DES de 0 a 60: dano por tempo sempre cresce (sem degrau em +39→+40)")
anterior = 0
for imp in range(20, 101):
    _, dano, tempo = golpe_impeto(imp, 40)
    assert dano >= anterior
    anterior = dano
print("  ok  Ímpeto de 20 a 100: dano sempre cresce (sem degrau em 69→70)")
confere("impacto FOR+60 Ímpeto 80 (x)", 1 + 80 * (0.5 + r(60)) / 100, 1.88, 0.005)

print("\n== B.1 afinidade ==")
eco = lambda x, m: m * min(15, 0.25 * C(x))
confere("especialista", 2 * eco(60, 1), 30)
confere("generalista", 6 * eco(30, 1 / 3), 26.25, 0.1)
confere("híbrido", 3 * eco(45, 2 / 3), 30)

print("\n== D.1 parry ==")
confere("janela máx (ms)", 140 + r(60) * 67, 180)
confere("impacto máx", 25 * (1 + 0.5 * r(60) + 0.5 * r(60)), 40)

print("\n== C.3 Artes 1/(13-k) ==")
sobra, media = 1.0, 0.0
for k in range(1, 13):
    p = 1 / (13 - k)
    media += k * sobra * p
    sobra *= 1 - p
confere("média de demonstrações", media, 6.5, 0.001)
confere("sobra após 12", sobra, 0.0, 1e-9)

print("\n== G.2 economia com população protegida ==")
def economia(ralo, mercado, protegidos, semanas=104, F0=0.87, teto=0.25, indexado=0.45):
    M, P, u, um, I = 100.0, 1.0, 0.0, 0.0, 0.0
    fixo = ralo - mercado - indexado
    marcas = {}
    for s in range(semanas):
        razao = M / 100
        F = protegidos * F0 * (1 - u / 2) + (1 - protegidos) * F0 * (1 - u)
        S = (fixo + mercado * (1 + um)
             + indexado * (protegidos * max(0.9, min(1.1, razao))
                           + (1 - protegidos) * max(0.8, min(1.25, razao))))
        M = max(1.0, M + 10 * (F - S))
        P = P * 0.7 + 0.3 * (M / 100)
        e = 0.5 * math.log(P) + 0.25 * math.log(M / 100)
        I = max(-2, min(2, I + e))
        alvo = e + 0.1 * I
        u += max(-0.03, min(0.03, max(-teto, min(teto, alvo)) - u))
        um += max(-0.1, min(0.1, max(-0.6, min(0.6, (alvo - u) * 3)) - um))
        if s + 1 in (52, 104):
            marcas[s + 1] = P
    return marcas, u

tabela = {  # (protegidos, cenário): preço esperado no ano 2 (doc)
    (0.0, "normal"): 1.00, (0.1, "pess"): 1.04, (0.5, "pess"): 1.10, (0.9, "pess"): 1.33,
    (0.9, "merc0"): 1.03, (0.9, "defl"): 0.96,
}
cenarios = {"normal": (0.87, 0.12), "pess": (0.66, 0.06), "merc0": (0.75, 0.0), "defl": (1.00, 0.12)}
for p in (0.0, 0.1, 0.5, 0.9):
    linha = []
    for nome, (ralo, merc) in cenarios.items():
        m, u = economia(ralo, merc, p)
        linha.append(f"{nome} x{m[52]:.2f}→x{m[104]:.2f}")
        if (p, nome) in tabela:
            assert abs(m[104] - tabela[(p, nome)]) <= 0.015, (p, nome, m[104])
    print(f"  ok  protegidos {p:.0%}: " + " | ".join(linha))
m, u = economia(0.87, 0.12, 0.1)
confere("u no normal (deve ser ~0)", u, 0.0, 0.02)

print("\nTUDO OK")
