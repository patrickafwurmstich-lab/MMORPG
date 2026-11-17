"""Confere a estrutura da árvore de habilidades (docs/09-arvore).
Rodar: python3 sim/check_arvore.py → termina com "TUDO OK".
Confere contagens, custo em PH, pré-requisitos, ordem de domínio e que toda passiva traz uma troca.
Não confere equilíbrio de combate (isso é protótipo).
"""
import os, re, glob

AQUI = os.path.dirname(__file__)
PASTA = os.path.join(AQUI, "..", "docs", "09-arvore")
PH = {"Técnica": 2, "Reação": 2, "Passiva": 1, "Transformação": 2, "Nó-chave": 3}
erros = []
def ok(nome, cond, info=""):
    print(f"  {'ok ' if cond else 'ERRO'} {nome} {info}")
    if not cond: erros.append(nome)

LINHA = re.compile(r"^\|\s*(\d{2})\s*\|\s*([^|]+?)\s*\|\s*(Técnica|Reação|Passiva|Transformação|Nó-chave)\s*\|\s*([^|]*?)\s*\|\s*(.+?)\s*\|\s*$")
TROCA = re.compile(r"(−|custa|custo|perde|cai|sobe|não |em troca|recarga|mas |porém|só |exige|\+\d+R|→|menos|imóvel|fica|em vez de|\(era|tira|volta a|\+0,\d+ s|\+\d+% de (custo|resistência))")

def ler_arvores(arquivos):
    arvores = {}
    for arq in arquivos:
        nome = None
        for ln in open(arq, encoding="utf-8"):
            if ln.startswith("## ") and not ln.startswith("## Regras"):
                nome = ln[3:].split("—")[0].strip()
                arvores[nome] = []
            m = LINHA.match(ln)
            if m and nome:
                arvores[nome].append(dict(n=int(m.group(1)), nome=m.group(2), tipo=m.group(3), req=m.group(4), efeito=m.group(5)))
    return arvores

def dom(req):
    m = re.search(r"dom\. (\d+)", req)
    return int(m.group(1)) if m else None

def confere(arvores, nos, ph, estrutura, rotulo):
    for nome, lista in arvores.items():
        print(f"\n== {rotulo}: {nome} ==")
        ok("número de nós", len(lista) == nos, f"({len(lista)})")
        ok("numeração 01..N sem buraco", [x["n"] for x in lista] == list(range(1, nos + 1)))
        ok("custo total em PH", sum(PH[x["tipo"]] for x in lista) == ph, f"({sum(PH[x['tipo']] for x in lista)})")
        ok("nomes únicos", len({x['nome'] for x in lista}) == len(lista))
        for ini, fim, alvo in estrutura:
            bloco = [x for x in lista if ini <= x["n"] <= fim]
            cont = {t: sum(1 for x in bloco if x["tipo"] == t) for t in PH}
            cont["Técnica"] += cont.pop("Reação")
            ok(f"nós {ini:02d}–{fim:02d}: {alvo}", all(cont.get(k, 0) == v for k, v in alvo.items()), f"{cont}")
        por_n = {x["n"]: x for x in lista}
        for x in lista:
            if x["tipo"] == "Nó-chave":
                ok(f"{x['n']:02d} chave com requisito de chave", ("dom. 60" in x["req"] and "8 PH" in x["req"]) or ("nível 40" in x["req"] and "6 PH" in x["req"]))
                continue
            refs = [int(r) for r in re.findall(r"\b(\d{2})\b(?! s)", x["req"].split("dom.")[0].split("nível")[0])]
            for r in refs:
                ok(f"{x['n']:02d} requisito {r:02d} existe e vem antes", r in por_n and r < x["n"])
                if r in por_n and dom(por_n[r]["req"]) is not None and dom(x["req"]) is not None:
                    ok(f"{x['n']:02d} domínio ≥ do requisito {r:02d}", dom(x["req"]) >= dom(por_n[r]["req"]))
            if x["tipo"] == "Passiva":
                ok(f"{x['n']:02d} passiva '{x['nome']}' tem troca", bool(TROCA.search(x["efeito"])))
            if x["tipo"] in ("Técnica", "Reação"):
                ok(f"{x['n']:02d} técnica '{x['nome']}' tem custo e recarga", ("R" in x["efeito"] or "E" in x["efeito"]) and "rec." in x["efeito"])

ARMA = [(1, 6, {"Técnica": 3, "Passiva": 3}), (7, 14, {"Técnica": 3, "Passiva": 3, "Transformação": 1, "Nó-chave": 1}),
        (15, 22, {"Técnica": 3, "Passiva": 3, "Transformação": 1, "Nó-chave": 1}), (23, 30, {"Técnica": 3, "Passiva": 3, "Transformação": 1, "Nó-chave": 1})]
armas = ler_arvores(sorted(glob.glob(os.path.join(PASTA, "0[1-3]-armas-*.md"))))
confere(armas, 30, 51, ARMA, "Arma")

ELEM = [(1, 6, {"Técnica": 3, "Passiva": 3}), (7, 12, {"Técnica": 2, "Passiva": 2, "Transformação": 1, "Nó-chave": 1}),
        (13, 18, {"Técnica": 2, "Passiva": 2, "Transformação": 1, "Nó-chave": 1}), (19, 24, {"Técnica": 1, "Passiva": 3, "Transformação": 1, "Nó-chave": 1})]
arq_e = glob.glob(os.path.join(PASTA, "04-elementos.md"))
elementos = ler_arvores(arq_e) if arq_e else {}
if elementos: confere(elementos, 24, 41, ELEM, "Elemento")

DISC = [(1, 6, {"Técnica": 2, "Passiva": 4}), (7, 12, {"Técnica": 1, "Passiva": 3, "Transformação": 1, "Nó-chave": 1}),
        (13, 18, {"Técnica": 1, "Passiva": 3, "Transformação": 1, "Nó-chave": 1})]
arq_d = glob.glob(os.path.join(PASTA, "05-disciplinas.md"))
disciplinas = ler_arvores(arq_d) if arq_d else {}
if disciplinas: confere(disciplinas, 18, 28, DISC, "Disciplina")

print("\n== Totais ==")
ok("11 árvores de arma", len(armas) == 11, f"({len(armas)})")
ok("6 árvores de elemento", len(elementos) == 6, f"({len(elementos)})")
ok("4 disciplinas", len(disciplinas) == 4, f"({len(disciplinas)})")
sistema = open(os.path.join(PASTA, "00-sistema.md"), encoding="utf-8").read()
sec = sistema.split("### 2.7")[1].split("### 2.8")[0]
esp = re.findall(r"^\| (FOR|DES|VIG|POT|CON|PER) \| \*\*", sec, re.M)
ok("18 especializações (6 linhas × 3)", len(esp) == 6 and sec.count("** — ") == 18, f"({sec.count('** — ')})")
lig = re.findall(r"^\| (FOR|DES|VIG|POT|CON)–(DES|VIG|POT|CON|PER) \|", sistema, re.M)
ok("15 ligações (todos os pares)", len(set(lig)) == 15, f"({len(set(lig))})")
total = 30 * len(armas) + 24 * len(elementos) + 18 * len(disciplinas) + 18 + len(set(lig))
ok("579 nós públicos", total == 579, f"({total})")
arq_a = os.path.join(PASTA, "06-artes.md")
if os.path.exists(arq_a):
    artes = re.findall(r"^### \d+\. ", open(arq_a, encoding="utf-8").read(), re.M)
    ok("24 Artes Únicas", len(artes) == 24, f"({len(artes)})")
else:
    ok("24 Artes Únicas", False, "(arquivo ainda não existe)")

print("\nTUDO OK" if not erros else f"\n{len(erros)} ERRO(S)")
