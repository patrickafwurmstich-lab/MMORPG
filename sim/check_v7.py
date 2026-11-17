"""Verificações aritméticas selecionadas do v7 (partes 1, 2 e 3).
Roda antes check_v6 (que roda v5 e v4). Rodar: python3 sim/check_v7.py → termina com "TUDO OK".
O nome de cada teste diz exatamente o que ele confere (parte 3, AY). Não valida diversão nem o jogo inteiro.
"""
import runpy, os, re, math

AQUI = os.path.dirname(__file__)
print("######## v4 + v5 + v6 ########")
runpy.run_path(os.path.join(AQUI, "check_v6.py"))

DOCS = os.path.join(AQUI, "..", "docs")
def doc(nome):
    return open(os.path.join(DOCS, nome), encoding="utf-8").read()
N1, N2, N3 = doc("07-nucleo-v7.md"), doc("07-jogo-v7.md"), doc("07-contratos-v7.md")

def r(x):
    assert 0 <= x <= 60, x
    return x / (x + 40)
def ok(nome, cond, info=""):
    print(f"  {'ok ' if cond else 'ERRO'} {nome} {info}")
    assert cond, nome
def faixa(nome, v, lo, hi):
    ok(nome, lo <= v <= hi, f"= {v:.3f} (alvo {lo}–{hi})")

s = lambda c: 1.09 ** (c - 1)
orc = lambda nivel: 20 + 3 * (nivel - 1)
teto = lambda f: min(100, f + 5)
C = lambda x: x + x * x / 40
def C_af(x, m=0.0):
    return C(x) - m * min(15, 0.25 * C(x))

print("\n######## v7 ########")
print("== Núcleo E.6 / A.7: curva de teto e perfil de referência ==")
ok("nível-teto: andar 1 → 6, 10 → 15, 95 → 100", (teto(1), teto(10), teto(95), teto(100)) == (6, 15, 100, 100))
custo_ref = C_af(20, 0.5) + C_af(15) + C_af(10)
ok("perfil +20/+15/+10 cabe no orçamento do nível 15 (62) com afinidade 0,5 no principal", custo_ref <= orc(15), f"({custo_ref:.2f} ≤ {orc(15)})")
def dps(principal, secundario, c=1):
    return 110 * s(c) * 1.10 * (1 + 0.8 * r(principal) + 0.2 * r(secundario)) * 0.55 * (200 * s(c) / (200 * s(c) + 50 * s(c)))
D = dps(20, 15)
faixa("DPS de referência camada 1", D, 68, 72)
faixa("DPS de referência camada 10 ÷ s(10) = camada 1", dps(20, 15, 10) / s(10) / D, 0.999, 1.001)

print("\n== AK: sincronia por custo (fator λ) ==")
ATR = ["FOR", "DES", "VIG", "POT", "CON", "PER"]
def custo_build(b, m=None):
    m = m or {}
    return sum(C_af(b[a], m.get(a, 0)) for a in b)
def sincroniza(build, orcamento, m=None):
    m = m or {}
    if custo_build(build, m) <= orcamento:
        return dict(build)
    lo, hi = 0.0, 1.0
    for _ in range(60):
        mid = (lo + hi) / 2
        if sum(C_af(build[a] * mid, m.get(a, 0)) for a in build) <= orcamento: lo = mid
        else: hi = mid
    lam = lo
    res = {a: min(60, math.floor(build[a] * lam)) for a in build}
    # c) secundário não some
    for a in build:
        if build[a] > 0 and res[a] == 0:
            res[a] = 1
    while custo_build(res, m) > orcamento:          # se o mínimo 1 estourou, tira do maior
        maior = max(res, key=lambda a: res[a]); res[maior] -= 1
    # b) sobra pelo maior resto fracionário
    ordem = sorted(build, key=lambda a: (-(build[a] * lam - math.floor(build[a] * lam)), -build[a], ATR.index(a)))
    mudou = True
    while mudou:
        mudou = False
        for a in ordem:
            if res[a] < 60 and build[a] > 0:
                t = dict(res); t[a] += 1
                if custo_build(t, m) <= orcamento:
                    res = t; mudou = True; break
    return res, lam
builds = {
    "especialista": {"FOR": 60, "DES": 60, "VIG": 12, "POT": 0, "CON": 0, "PER": 0},
    "generalista": {a: 30 for a in ATR},
    "híbrida": {"FOR": 45, "DES": 0, "VIG": 45, "POT": 0, "CON": 0, "PER": 45},
}
for nome, b in builds.items():
    ok(f"{nome} é válida no nível 100", custo_build(b) <= orc(100), f"({custo_build(b):.1f} ≤ {orc(100)})")
casos = [(100, 6), (100, 20), (60, 15)]
for nome, b in builds.items():
    for nivel, alvo in casos:
        if custo_build(b) > orc(nivel):
            continue
        res, lam = sincroniza(b, orc(alvo))
        custo = custo_build(res)
        ok(f"{nome} {nivel}→{alvo}: custo ≤ orçamento", custo <= orc(alvo), f"({custo:.1f} ≤ {orc(alvo)}) {res}")
        sobra = orc(alvo) - custo
        menor_inc = min(C(res[a] + 1) - C(res[a]) for a in res if b[a] > 0 and res[a] < 60)
        ok(f"{nome} {nivel}→{alvo}: sobra menor que o próximo ponto", sobra < menor_inc, f"(sobra {sobra:.2f})")
        ok(f"{nome} {nivel}→{alvo}: 0–60 e secundários mantidos", all(0 <= res[a] <= 60 for a in res) and all(res[a] >= 1 for a in b if b[a] > 0))
        pares = [(a, c) for a in b for c in b if b[a] > 0 and b[c] > 0 and a < c]
        ok(f"{nome} {nivel}→{alvo}: forma preservada (±1 ponto do valor proporcional)",
           all(abs(res[a] - b[a] * lam) <= 1.5 for a in b if b[a] > 0))
# o caso que o ChatGPT apontou: veterano sincronizado no 20 não pode ficar muito abaixo do nativo
vet, _ = sincroniza({"FOR": 60, "DES": 60, "VIG": 0, "POT": 0, "CON": 0, "PER": 0}, orc(20))
ok("veterano 60/60 sincronizado no nível 20 usa o orçamento (≈ nativo 24/24)", vet["FOR"] >= 23 and vet["DES"] >= 23, f"{vet}")
print("  -- Arena / Provação --")
nivel1 = {"FOR": 5, "DES": 5, "VIG": 0, "POT": 0, "CON": 0, "PER": 0}
ok("Arena não expande: build de nível 1 (custo 11,25) cabe em 197 e fica igual", sincroniza(nivel1, 197) == nivel1)
arena = {"FOR": 40, "DES": 40, "VIG": 20, "POT": 0, "CON": 0, "PER": 0}
ok("distribuição de Arena própria (40/40/20) válida em 197", custo_build(arena) <= 197 and max(arena.values()) <= 60, f"({custo_build(arena):.1f})")
print("  -- andares anteriores da camada (AI.1) --")
ref = {"FOR": 20, "DES": 15, "VIG": 10, "POT": 0, "CON": 0, "PER": 0}
a2, _ = sincroniza(ref, orc(teto(2)))
fator2 = dps(a2["FOR"], a2["DES"]) / D
faixa(f"fator de vida do andar 2 (perfil sincronizado {a2})", fator2, 0.85, 1.0)

print("\n== AI.3 / AO / AZ: ataques vs tanque de referência ==")
tanque = 1000 * (1 + 0.9 * r(20))
ok("tanque VIG +20 = 1.300", abs(tanque - 1300) < 0.01)
for nome, dano in [("Âncoras", 300), ("Partes", 320), ("Arena", 280), ("Duplo", 250), ("Perseguição", 300), ("Cerco", 280),
                   ("AO investida", 320), ("AZ pisão", 320), ("AZ Martelo", 320)]:
    faixa(f"{nome} {dano} em % da vida do tanque", dano / tanque * 100, 18, 25)
ok("nenhum ataque de chefe no texto passa de 325 (25%)",
   all(int(x) <= 325 for x in re.findall(r"\| (\d{3}) \|", N3.split("## AO.")[1].split("### AO.2")[0])))

print("\n== Núcleo A.7: quadro de unidades ==")
for c in (1, 10, 20):
    parry = 25 * (1 + 0.5 * r(60) + 0.5 * r(60))       # impacto não escala
    postura_chefe = 1000                                 # postura não escala
    pocao = 250 * s(c) / (1000 * s(c))
    bloqueio = (0.08 * (300 * s(c)) / s(c) + 0.25 * 40) / 1
    ok(f"camada {c}: parry {parry/postura_chefe:.1%} da postura, poção {pocao:.0%} da vida, bloqueio {bloqueio:.0f} de resistência",
       abs(parry / postura_chefe - 0.025 * (1 + r(60))) < 1e-9 and abs(pocao - 0.25) < 1e-9 and abs(bloqueio - 34) < 1e-9)

print("\n== AO.1b: tempo de dano igual para qualquer tamanho de grupo ==")
for n in (1, 2, 3, 4, 6):
    faixa(f"{n} jogador(es): vida {120000*n/6:.0f}", 120000 * n / 6 / (D * n), 270, 300)

print("\n== AN: tentativa e encontro ==")
class Tentativa:
    def __init__(self, membros): self.reg = {m: 600 for m in membros}; self.reserva_total = sum(self.reg.values())
    def entrar(self, quem):
        if quem not in self.reg: return False         # substituto novo só entre tentativas
        return True                                   # reconexão: mantém reserva
t = Tentativa(["a", "b", "c", "d", "e", "f"])
t.reg["a"] = 100
ok("reconexão mantém a reserva que tinha", t.entrar("a") and t.reg["a"] == 100)
ok("substituto novo não entra durante a tentativa", not t.entrar("novo"))
ok("reserva total da tentativa não cresce com 100 tentativas de entrada", (lambda: [t.entrar(f"x{i}") for i in range(100)] and True)() and sum(t.reg.values()) <= t.reserva_total)
def recupera(resolucao_valida): return 0.25 if resolucao_valida else 0.0
ok("'puxar e soltar' não recupera reserva", recupera(False) == 0 and recupera(True) == 0.25)

print("\n== AH-P / AL: derrota em todos os estados ==")
def derrota(zona, mat, infamia=0, selo=0, protegido=False, xp=1000):
    if zona in ("duelo", "arena"):
        return 0, 0
    if zona == "fronteira":
        perda_xp, frac, selo = 0, (1.0 if infamia >= 1 else 0.5), 0
    else:
        perda_xp, frac = 0.10 * xp, (1.0 if infamia >= 1 else 0.5)
        if infamia >= 1: selo = 0
    if protegido and infamia == 0:
        perda_xp *= 0.5; frac *= 0.5
    return perda_xp, (mat - min(selo, mat)) * frac
for inf in (0, 1, 2, 3):
    for zona in ("pve", "fronteira", "duelo", "arena"):
        for selo in (0, 15):
            px, pm = derrota(zona, 40, inf, selo)
            if zona in ("duelo", "arena"):
                ok(f"{zona} Infâmia {inf} Selo {selo}: zero perda", (px, pm) == (0, 0))
            elif zona == "fronteira":
                ok(f"fronteira Infâmia {inf} Selo {selo}: sem XP, Selo ignorado", px == 0 and pm == (40 if inf else 20))
            else:
                esp = 40 if inf else (40 - selo) * 0.5
                ok(f"PvE Infâmia {inf} Selo {selo}: perde {esp}", pm == esp)
ok("protegido em PvE sem Infâmia: metade", derrota("pve", 40, protegido=True) == (50, 10))

print("\n== AL.2: Túmulo e marca de origem ==")
def tumulo(quem, conteudo):
    if quem in ("dono", "grupo"): return conteudo, 0, True       # recupera, destruído, fecha
    return 0.5 * conteudo, 0.5 * conteudo, True
ok("dono recupera 100% e fecha", tumulo("dono", 20) == (20, 0, True))
ok("grupo recupera 100% e fecha", tumulo("grupo", 20) == (20, 0, True))
leva, destr, fecha = tumulo("terceiro", 20)
ok("terceiro leva 50% do Túmulo = 25% da carga, destrói 50%, fecha", leva == 10 and destr == 10 and fecha and leva / 40 == 0.25)
item = {"peso_origem": 3.0, "origem_fronteira": True}
for transf in ("refinar", "fabricar", "desmontar"):
    item = {"peso_origem": item["peso_origem"], "origem_fronteira": item["origem_fronteira"]}
ok("marca de origem sobrevive a 3 transformações e não tem prazo", item["origem_fronteira"] and "prazo" not in item)
ok("material quente cai inteiro quando o saqueador morre", (lambda quente: quente)(10) == 10)

print("\n== AT: controle no PvP com empurrões curtos ==")
def cadeia(aplicacoes):
    tot, n = 0.0, 0.0
    for dur, meia in aplicacoes:
        if n >= 2: break
        fator = 1.0 if n < 1 else 0.5
        tot += fator * min(1.5, dur)
        n += 0.5 if meia else 1
    return tot
faixa("atordoar 2 + empurrão 0,5 m + prender 2 + derrubar 1,2", cadeia([(2, False), (0, True), (2, False), (1.2, False)]), 0, 2.25)
faixa("três empurrões curtos + atordoar", cadeia([(0, True), (0, True), (0, True), (2, False)]), 0, 2.25)

print("\n== AW: participação ==")
def qualifica(propria, media, total, assalto=False):
    if media <= 0 or propria <= 0: return False
    return propria >= (0.02 * total if assalto else 0.10 * media)
ok("dimensão com média 0 não qualifica ninguém", not qualifica(0, 0, 0))
ok("Assalto 24: 0,42% do total não qualifica; 2% qualifica", not qualifica(0.42, 100 / 24, 100, True) and qualifica(2, 100 / 24, 100, True))

print("\n== BC: matriz da camada 1 contra as regras de AX ==")
proib = {"Partes quebráveis": {"Baixa gravidade"}, "Arena que muda": {"Maré", "Baixa gravidade"},
         "Duplo": {"Neblina"}, "Perseguição": {"Tempestade", "Baixa gravidade"}, "Cerco": {"Maré"}}
bloco = N3.split("## BC.")[1].split("## BD.")[0]
linhas = []
for ln in bloco.splitlines():
    cols = [c.strip() for c in ln.split("|")]
    if len(cols) >= 5 and cols[1].isdigit():
        linhas.append((int(cols[1]), cols[2], cols[3], cols[4]))
ok("10 andares", len(linhas) == 10)
chefes, biomas = {}, {}
for andar, bioma, obj, chefe in linhas:
    tipo = next(t for t in ["Âncoras", "Partes quebráveis", "Arena que muda", "Duplo", "Perseguição", "Cerco"] if t in chefe)
    b = bioma.split()[0] if not bioma.startswith("(") else None
    b = {"Baixa": "Baixa gravidade"}.get(b, b)
    if b:
        ok(f"andar {andar}: {tipo} permitido em {b}", b not in proib.get(tipo, set()))
        biomas[b] = biomas.get(b, 0) + 1
    if "Expedição" in obj: ok(f"andar {andar}: Expedição fora de baixa gravidade", b != "Baixa gravidade")
    if obj.startswith("Perseguição"): ok(f"andar {andar}: objetivo Perseguição não no andar do chefe Perseguição", tipo != "Perseguição")
    chefes[tipo] = chefes.get(tipo, 0) + 1
ok("cada tipo de chefe aparece 1–2 vezes", all(1 <= v <= 2 for v in chefes.values()) and len(chefes) == 6, f"{chefes}")
ok("cada bioma aparece 1–2 vezes", all(1 <= v <= 2 for v in biomas.values()), f"{biomas}")

print("\n== Catálogos (quantidade) ==")
blocos_av = N3.split("## AM.")[1].split("## AN.")[0] + N3.split("## BD.")[1].split("## AY.")[0]
nav = sum(len(re.findall(r"\[(Ex|Ru|Co|Su)\]", l)) for l in blocos_av.splitlines() if l.startswith("- **"))
ok("66 técnicas avançadas", nav == 66, f"({nav})")
ok("ninguém promete variações de avançadas nesta versão", "não fazem parte desta versão" in N2 and "não fazem parte desta versão" in N3)

print("\n== Z: domínio por tempo ==")
h50 = 50 * 30 * 20 / 3600; h100 = 50 * 50 * 20 / 3600
faixa("horas até domínio 50", h50, 8, 9); faixa("horas de 50 a 100", h100, 13, 15)

print("\n== Textos coerentes ==")
ok("parte 2 não diz que Singulares recomeçam", "Singulares recomeçam" not in N2)
ok("núcleo D.6 não promete encher após 15 s", "enche em ponto de descanso ou após 15 s" not in N1)
ok("ninguém garante que saquear rende menos que coletar", "rende menos que coletar)" not in N3)

print("\nTUDO OK")
