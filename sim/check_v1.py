"""Confere os números do docs/01-sistemas-v1.md.
Rodar: python3 sim/check_v1.py
"""
import math

def r(x):
    return x / (x + 40)

print("== A.1 retorno r(x) ==")
for x in (5, 10, 20, 30, 40, 60):
    print(f"  x={x:2d}  r={r(x):.3f}")

print("\n== A.2 golpe pesado, arma 120 (FOR 0,8 / DES 0,2) ==")
for f in (0, 5, 20, 60):
    d = 120 * (1 + 0.8 * r(f))
    print(f"  FOR +{f:2d}: {d:6.1f}  ({(d/120-1)*100:+.1f}%)")

print("\n== A.3 velocidade (ataque 1,0 s: 0,2 fixo + 0,8 escalável) ==")
H = 1 + 0.35 * r(60)
t = 0.2 + 0.8 / H
print(f"  DES +60: H={H:.3f}  t={t:.3f} s  golpes {1/t*100-100:+.1f}%")

print("\n== A.4 movimento ==")
def v(des, forc, L):
    return 5.5 * (1 + 0.10 * r(des) + 0.06 * r(forc)) * (1 - 0.30 * L / (1 + r(forc)))
print(f"  leve DES+60: {v(60,0,0):.2f}   leve FOR+60: {v(0,60,0):.2f}")
print(f"  carga máx sem inv.: {v(0,0,1):.2f}   carga máx FOR+60: {v(0,60,1):.2f} ({v(0,60,1)/v(0,0,1)*100-100:+.0f}%)")

print("\n== A.5 Ímpeto 80 ==")
print(f"  FOR+40 impacto extra: {80*(0.5+r(40)):.0f}%")
print(f"  DES+40 golpes extras: {math.floor(80*r(40)/16)}")
print(f"  DES+60 golpes extras: {math.floor(80*r(60)/16)}  | Ímpeto 100, DES+60: {math.floor(100*r(60)/16)}")

print("\n== B custos ==")
C = lambda x: x + x * x / 40
print(f"  total pontos nível 100: {20 + 3*99}")
print(f"  C(30)={C(30)}  C(60)={C(60)}  2x60={2*C(60)}  6x30={6*C(30)}")

# afinidade: desconto marginal por ponto, m=1 em 2 atributos levados a +60
def custo_com_afinidade(x, m):
    total = 0.0
    for i in range(x):
        total += (C(i + 1) - C(i)) * (1 - 0.20 * m)
    return total
eco = 2 * (C(60) - custo_com_afinidade(60, 1.0))
print(f"  economia com afinidade m=1 em 2 atributos até +60: {eco:.1f} pontos ({eco/317*100:.0f}% do orçamento)")
eco_gen = 0
# generalista: soma 2.0 espalhada (m=0,333 em 6) até +30
eco_gen = 6 * (C(30) - custo_com_afinidade(30, 2/6))
print(f"  generalista m=0,33 em 6 atributos até +30: {eco_gen:.1f} pontos")

print("\n== A.6 armadura ==")
for A in (100, 200):
    print(f"  A={A}: redução {1-200/(200+A):.1%}")

print("\n== C.3 Artes: p=1/(13-k) ==")
probs = []
sobra = 1.0
esp = 0
for k in range(1, 13):
    p = 1 / (13 - k)
    pk = sobra * p
    esp += k * pk
    sobra *= (1 - p)
    probs.append(pk)
print(f"  cada posição: {[round(x,3) for x in probs]}")
print(f"  média: {esp:.2f}  sobra após 12: {sobra:.3f}")

print("\n== G economia: 52 semanas, normal e pessimista ==")
# unidades relativas a R = 1.0 ouro/h por jogador
def simula(ralo_frac, semanas=52, controlador=True):
    M, Mstar, P, u, I = 100.0, 100.0, 1.0, 0.0, 0.0
    hist = []
    for s in range(semanas):
        horas = 10
        M += horas * (1 - u) - horas * (ralo_frac + 0.12 * u * 0.5)
        P = P * 0.7 + 0.3 * (M / Mstar)   # preços seguem a liquidez com atraso
        if controlador:
            e = 0.5 * math.log(P) + 0.25 * math.log(M / Mstar)
            I = max(-2, min(2, I + e))
            alvo = max(-0.35, min(0.35, e + 0.1 * I))
            u += max(-0.03, min(0.03, alvo - u))
        hist.append((s + 1, M, P, u))
    return hist

for nome, frac in (("normal (ralo 87%)", 0.87), ("pessimista (ralo 66%)", 0.66)):
    for ctrl in (False, True):
        h = simula(frac, controlador=ctrl)
        s, M, P, u = h[-1]
        print(f"  {nome:22s} controlador={'sim' if ctrl else 'não'}: ouro/conta {M:6.1f}  preços x{P:.2f}  u={u:+.2f}")
