"""Confere os números do docs/02-sistemas-v2.md.
Rodar: python3 sim/check_v2.py
"""
import math

def r(x):
    return x / (x + 40)

def C(x):
    return x + x * x / 40

print("== A.1 golpe pesado (K=1,4, arma 120, FOR 0,8 / DES 0,2) ==")
for f in (0, 5, 20, 60):
    print(f"  FOR +{f:2d}: {120*1.4*(1+0.8*r(f)):6.1f}")

print("\n== A.2 velocidade ==")
H = 1 + 0.35 * r(60)
print(f"  DES +60: {0.2 + 0.8/H:.3f} s  ({(1/(0.2+0.8/H)-1)*100:+.0f}% golpes)")

print("\n== A.3 movimento ==")
v = lambda d, f, L: 5.5*(1+0.10*r(d)+0.06*r(f))*(1-0.30*L/(1+r(f)))
print(f"  leve DES60 {v(60,0,0):.2f} | leve FOR60 {v(0,60,0):.2f} | carga sem inv {v(0,0,1):.2f} | carga FOR60 {v(0,60,1):.2f}")

print("\n== A.4 Ímpeto (orçamento fechado) ==")
def d_leve(des):
    return 120 * 0.6 * (1 + 0.7 * r(des))
def continuacoes(imp, des):
    maxn = 1 if des < 20 else (2 if des < 40 else 3)
    n = 1 if imp < 40 else (2 if imp < 70 else 3)
    return min(n, maxn), d_leve(des) * (imp / 100) * (1 + 3 * r(des))
for des, imp in ((20, 80), (40, 80), (60, 80), (60, 100)):
    n, tot = continuacoes(imp, des)
    print(f"  DES +{des} Ímpeto {imp}: {n} golpe(s), dano total {tot:.1f}, tempo extra {n*0.18:.2f} s")
print(f"  referência: golpe pesado FOR +60 = {120*1.4*(1+0.8*r(60)):.1f}")
print(f"  impacto FOR +60, Ímpeto 80: x{1+80*(0.5+r(60))/100:.2f}")

print("\n== B.1 afinidade: economia = m * min(15; 0,25*C(x)) ==")
eco = lambda x, m: m * min(15, 0.25 * C(x))
print(f"  especialista 2x(+60, m=1): {2*eco(60,1):.1f}")
print(f"  generalista 6x(+30, m=1/3): {6*eco(30,1/3):.1f}")
print(f"  híbrido 3x(+45, m=2/3): {3*eco(45,2/3):.1f}")

print("\n== D.1 parry ==")
print(f"  janela PER0 140 ms | PER+60 {140 + r(60)*67:.0f} ms")
print(f"  impacto: {25:.0f} a {25*(1+0.5*r(60)+0.5*r(60)):.0f}")

print("\n== D.3 fogo contra armadura 200 ==")
print(f"  ganho de dano com -30: {(200/370)/(200/400)-1:+.1%}")

print("\n== F.3 / G.1 progressão vertical, camada 10 ==")
print(f"  arma x{1.09**9:.2f}   renda x{1.20**9:.2f}")

print("\n== C.3 Artes: 1/(13-k) ==")
sobra, media = 1.0, 0.0
for k in range(1, 13):
    p = 1 / (13 - k)
    media += k * sobra * p
    sobra *= 1 - p
print(f"  média {media:.2f}, sobra após 12: {sobra:.3f}")

print("\n== G.2 economia (controlador corrigido) ==")
def economia(ralo_total, mercado_base, semanas=104, controlador=True,
             teto=0.25, indexado=0.45, protegido=0.10):
    """Unidades: torneira nominal = 1,0 por hora por jogador.
    ralo_total: fração da torneira que os ralos removem na meta.
    protegido: parcela da torneira (andares 1-3) que o controlador não corta.
    """
    M, P, u, um, I = 100.0, 1.0, 0.0, 0.0, 0.0
    fixo = ralo_total - mercado_base - indexado
    marcas = {}
    for s in range(semanas):
        F = protegido + (1 - protegido) * (1 - u)
        S = fixo + (indexado * (M / 100) if controlador else indexado) + mercado_base * (1 + um)
        M += 10 * (F - S)
        P = P * 0.7 + 0.3 * (M / 100)
        if controlador:
            e = 0.5 * math.log(P) + 0.25 * math.log(M / 100)
            I = max(-2, min(2, I + e))
            alvo = e + 0.1 * I
            u += max(-0.03, min(0.03, max(-teto, min(teto, alvo)) - u))
            um += max(-0.1, min(0.1, max(-0.6, min(0.6, (alvo - u) * 3)) - um))
        if s + 1 in (52, 104):
            marcas[s + 1] = (round(P, 2), round(u, 2), round(5 * (1 + um), 1))
    return marcas

for nome, ralo, merc in (("normal (87%)", 0.87, 0.12),
                         ("pessimista (66%)", 0.66, 0.06),
                         ("deflação (110%)", 1.10, 0.12)):
    sem = economia(ralo, merc, controlador=False)
    com = economia(ralo, merc)
    print(f"  {nome:17s} sem controle preços x{sem[52][0]} (1 ano) | v2: ano1 x{com[52][0]} ano2 x{com[104][0]}  u={com[104][1]:+.2f} taxa={com[104][2]}%")
