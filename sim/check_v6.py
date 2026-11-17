"""Verificações aritméticas selecionadas do v6 (partes 1, 2 e 3).
Roda antes check_v5 (que roda check_v4). Rodar: python3 sim/check_v6.py → termina com "TUDO OK".
Não valida o jogo inteiro: ver parte 3, AY.
"""
import runpy, os, re

AQUI = os.path.dirname(__file__)
print("######## v4 + v5 ########")
runpy.run_path(os.path.join(AQUI, "check_v5.py"))

DOCS = os.path.join(AQUI, "..", "docs")
def doc(nome):
    return open(os.path.join(DOCS, nome), encoding="utf-8").read()
N1, N2, N3 = doc("06-nucleo-v6.md"), doc("06-jogo-v6.md"), doc("06-contratos-v6.md")

def r(x):
    assert 0 <= x <= 60
    return x / (x + 40)

def ok(nome, cond, info=""):
    print(f"  {'ok ' if cond else 'ERRO'} {nome} {info}")
    assert cond, nome

def faixa(nome, v, lo, hi):
    ok(nome, lo <= v <= hi, f"= {v:.2f} (alvo {lo}–{hi})")

print("\n######## v6 ########")
print("== AI.1 DPS efetivo ==")
s = lambda c: 1.09 ** (c - 1)
def m_arm(A, c):
    return 200 * s(c) / (200 * s(c) + A)
def dps(c=1):
    return 110 * s(c) * 1.10 * (1 + 0.8 * r(25)) * 0.55 * m_arm(50 * s(c), c)
D = dps()
faixa("DPS por jogador camada 1", D, 68, 72)
faixa("DPS camada 10 / HP camada 10 = igual à camada 1 (razão)", (dps(10) / s(10)) / D, 0.999, 1.001)

print("\n== AI.2 tempos-alvo ==")
linhas = [  # nome, vida, jogadores, lo, hi
    ("inseto", 180, 1, 2, 4), ("fera", 650, 1, 8, 12), ("humanoide", 800, 1, 10, 14),
    ("constructo", 1100, 1, 14, 18), ("elite fera solo", 650 * 3, 1, 25, 40),
    ("elite fera grupo 4", 650 * 3 * (1 + 0.6 * 3), 4, 15, 40), ("dracônico 4", 12000, 4, 40, 60),
    ("colosso 4", 9000, 4, 30, 45), ("mini-chefe 4", 30000, 4, 90, 180),
    ("chefe de andar 6", 120000, 6, 240, 330),
]
for nome, hp, n, lo, hi in linhas:
    faixa(f"TTK {nome} (s)", hp / (D * n), lo, hi)
for n in (12, 18, 24):
    faixa(f"TTK Assalto {n} (s)", 120000 * n / 6 * 0.9 / (D * n), 240, 300)

print("\n== AI.3 ataque principal do chefe vs tanque VIG +30 ==")
tanque = 1000 * (1 + 0.9 * r(30))
faixa("vida do tanque", tanque, 1385, 1387)
for dano in (250, 280, 300, 320, 340):
    faixa(f"ataque {dano} em % da vida", dano / tanque * 100, 18, 25)

print("\n== Núcleo A.1 armadura com s ==")
for classe, A in (("leve", 40), ("média", 85), ("pesada", 140)):
    m1, m10 = m_arm(A * s(1), 1), m_arm(A * s(10), 10)
    ok(f"{classe}: mitigação igual nas camadas 1 e 10", abs(m1 - m10) < 1e-9, f"({1-m1:.3f})")

print("\n== Núcleo D.1 parry ==")
comum = min(180, 140 + r(60) * 67)
ok("janela comum ≤ 180", comum <= 180)
pior = min(240, comum + 60 + 40 + 20)
ok("janela técnica com todos os bônus ≤ 240", pior <= 240, f"({pior} ms)")

print("\n== Contrato 17,5% em todo o conjunto ==")
ok("núcleo diz 17,5%", "17,5% de R(c)" in N1)
ok("ninguém diz 19% de R", "19% de R" not in N1 + N2 + N3)
ok("152,25 × 8 = 1.218", abs(0.175 * 870 * 8 - 1218) < 0.01)

print("\n== AQ.2 linha de consumíveis ==")
ok("140 + 60 = 200 = 20% de B", 140 + 60 == 0.20 * 1000)

print("\n== AT controle no PvP ==")
def cadeia(duracoes):
    """aplica controles em sequência dentro de 8 s; categoria única"""
    total, n = 0.0, 0
    for d in duracoes:
        n += 1
        if n == 1: total += min(1.5, d)
        elif n == 2: total += 0.5 * min(1.5, d)
        else: break
    return total
faixa("pior cadeia em 8 s (atordoar 2 + derrubar 1,2 + prender 2)", cadeia([2, 1.2, 2, 3]), 0, 2.25)

print("\n== AJ matriz família × arma ==")
bloco = N3.split("## AJ.")[1].split("## AK.")[0]
fam = ["Feras", "Insetos", "Constructos", "Mortos-vivos", "Elementais", "Aquáticos", "Aviários",
       "Humanoides", "Plantas", "Dracônicos", "Sombras", "Colossos"]
respostas = {f: 0 for f in fam}
narmas = 0
for ln in bloco.splitlines():
    cols = [c.strip() for c in ln.split("|")]
    if len(cols) < 5 or cols[1] in ("Arma", "---") or cols[1].startswith("-"):
        continue
    narmas += 1
    fortes = [f for f in fam if f in cols[2]]
    fracas = [f for f in fam if f in cols[3]]
    ok(f"{cols[1]}: ≥3 fortes e ≥2 fracas", len(fortes) >= 3 and len(fracas) >= 2, f"({len(fortes)}/{len(fracas)})")
    for f in fortes: respostas[f] += 1
ok("11 armas na matriz", narmas == 11)
for f, k in respostas.items():
    ok(f"{f}: ≥2 respostas fortes", k >= 2, f"({k})")

print("\n== AK sincronia preserva a forma ==")
def orc(nivel): return 20 + 3 * (nivel - 1)
build = {"FOR": 60, "DES": 30, "VIG": 30, "PER": 20}
fator = orc(20) / orc(80)
ef = {k: round(v * fator) for k, v in build.items()}
ok("FOR/DES continua ≈ 2", abs(ef["FOR"] / ef["DES"] - 2) < 0.15, f"{ef}")

print("\n== L.3 capacidade ==")
conf = 12 + 0.3 * 60
ok("FOR +60: confortável 30, máximo 50", conf == 30 and conf + 20 == 50)

print("\n== AH-P precedência da derrota ==")
def derrota(xp, mat, fronteira=False, infamia=False, protegido=False, selo_peso=0, pvp=False):
    if fronteira or pvp:
        perda_xp = 0
        frac = 1.0 if infamia else 0.5
        selo_peso = 0                      # Selo não funciona na Fronteira/PvP
    else:
        perda_xp = 0.10 * xp
        frac = 1.0 if infamia else 0.5
        if infamia: selo_peso = 0
    if protegido and not infamia:
        perda_xp *= 0.5; frac *= 0.5
    coberto = min(selo_peso, mat)
    return perda_xp, (mat - coberto) * frac
ok("Fronteira + Selo: perde 50%", derrota(0, 40, fronteira=True, selo_peso=15)[1] == 20)
ok("Fronteira + Infâmia + Selo: perde 100%", derrota(0, 40, fronteira=True, infamia=True, selo_peso=15)[1] == 40)
ok("PvE + Selo 15: perde 50% do resto", derrota(1000, 40, selo_peso=15)[1] == 12.5)
ok("saque leva 50% e destrói 50%", 0.5 * 20 + 0.5 * 20 == 20)

print("\n== S.1 reanimação ==")
def reanima(hpmax, reserva):
    if reserva < 0.05 * hpmax: return None
    return min(0.30 * hpmax, reserva)
hp60, res60 = 1000 * (1 + 0.9 * r(60)), 600 * (1 + 0.8 * r(60))
v1 = reanima(hp60, res60); v2 = reanima(hp60, res60 - v1)
ok("VIG +60: 1ª volta com 30%", abs(v1 - 0.3 * hp60) < 0.01, f"({v1:.0f})")
ok("2ª volta com o que sobrou (< 30%)", v2 is not None and v2 < 0.3 * hp60, f"({v2:.0f})")
ok("sem reserva: inviável", reanima(hp60, 10) is None)

print("\n== AV Flanco no uso real ==")
taxa_curta = 0.5 * 0.55 / 0.55 + 0.5 * 1.25 / 1.00
media = 1.1069  # média real das 10 armas corpo a corpo (K.2)
faixa("espada curta com Flanco 40% do tempo / média", taxa_curta * (1 + 0.3 * 0.4) / media, 0.85, 1.15)

print("\n== Catálogos ==")
ar1 = N3.split("### AR.1")[1].split("### AR.2")[0]
nmod = sum(ln.count(" / ") * 1 + 3 for ln in ar1.splitlines() if ln.startswith("- **"))
# cada linha de atributo tem 3 marcos × 3 opções = 9
linhas_attr = [ln for ln in ar1.splitlines() if ln.startswith("- **")]
contagem = sum(len(re.findall(r"\+\d\d — ", ln)) * 3 for ln in linhas_attr)
ok("54 modificadores (6 × 3 marcos × 3)", len(linhas_attr) == 6 and contagem == 54, f"({contagem})")
aq = N3.split("### AQ.3")[1].split("- Toda receita")[0]
for prof in ("Forja", "Armaria", "Alquimia", "Joalheria", "Culinária"):
    ln = [l for l in aq.splitlines() if l.startswith(f"**{prof}:**")][0]
    ok(f"{prof}: 10 receitas", len(re.findall(r"\b(\d+)\) ", ln)) == 10)
am = N3.split("## AM.")[1].split("## AN.")[0]
nav = sum(len(re.findall(r"\[(Ex|Ru|Co|Su)\]", l)) for l in am.splitlines() if l.startswith("- **"))
ok("33 técnicas avançadas", nav == 33, f"({nav})")
asb = N3.split("## AS.")[1].split("**Ramos")[0]
nass = sum(1 for l in asb.splitlines() if l.startswith("| ") and not l.startswith("| Arte") and "---" not in l) * 3
ok("15 assinaturas", nass == 15)

print("\nTUDO OK")
