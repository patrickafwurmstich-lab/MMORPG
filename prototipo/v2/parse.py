import re, json, unicodedata
D='/home/claude/mmorpg/docs/09-arvore/'
LIN=re.compile(r"^\|\s*(\d{2})\s*\|\s*([^|]+?)\s*\|\s*(Técnica|Reação|Passiva|Transformação|Nó-chave)\s*\|\s*([^|]*?)\s*\|\s*(.+?)\s*\|\s*$")
def slug(s):
    s=unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+','_',s).strip('_')
def num(s): return float(s.replace(',','.'))
def tec(ef):
    t={}
    m=re.search(r'K(\d+,\d+)(?:×(\d+))?',ef)
    if m: t['K']=num(m.group(1))*(int(m.group(2)) if m.group(2) else 1); t['hits']=int(m.group(2) or 1)
    elif re.match(r'\s*0 dano',ef): t['K']=0
    m=re.search(r'\bI(\d+)',ef); t['I']=int(m.group(1)) if m else 0
    mt=re.search(r'total (\d+(?:,\d+)?) s',ef.split('rec.')[0])
    m=mt or re.search(r'(?:carga )?(\d+,\d+|\d+) s\b',ef.split('rec.')[0]); t['tempo']=num(m.group(1)) if m else 0.8
    t['carga']=bool(re.search(r'carga \d',ef.split('·')[1] if '·' in ef else ''))
    m=re.search(r'(\d+)\s?([RE])\b',ef); 
    if m: t['custo']=int(m.group(1)); t['rec']=m.group(2)
    else: t['custo']=0; t['rec']='R'
    m=re.search(r'rec\. (\d+(?:,\d+)?) s',ef); t['cd']=num(m.group(1)) if m else 6
    m=re.search(r'\[(Execução|Contenção|Ruptura|Sustentação)\]',ef); t['tag']=m.group(1) if m else ''
    txt=ef.split(';',1)[1] if ';' in ef else ''
    t['txt']=re.sub(r'\[[^\]]*\]','',txt).strip()
    low=txt.lower()
    m=re.search(r'linha de (\d+(?:,\d+)?) m',low)
    if m: t['forma']='linha'; t['alc']=num(m.group(1))
    else:
        m=re.search(r'(?:área|anel|círculo|cone|nuvem|zona) de (\d+(?:,\d+)?) m',low) or re.search(r'(\d+(?:,\d+)?) m em volta',low) or re.search(r'em volta \((\d+(?:,\d+)?) m\)',low)
        if m: t['forma']='area'; t['alc']=num(m.group(1))
        else:
            m=re.search(r'^\s*(\d+(?:,\d+)?) m[,;. ]',low) or re.search(r'(?:disparo|projétil|flecha|tiro|alcance)[^;]*?(\d+(?:,\d+)?) m',low)
            if m and num(m.group(1))>=5: t['forma']='proj'; t['alc']=num(m.group(1))
            elif re.search(r'disparo|flecha|tiro|arremess|projétil',low): t['forma']='proj'; t['alc']=15
            else: t['forma']='melee'
    m=re.search(r'(\d+(?:,\d+)?) m\b',low); t['m1']=num(m.group(1)) if m else 0
    if re.search(r'giro|gira|em volta|ao redor|à sua volta|360',low): t['volta']=1
    m=re.search(r'(?:avança|investe|avanço de|salta|dispara para frente|corre)[^;]*?(\d+(?:,\d+)?) m',low)
    if m: t['mov']=num(m.group(1))*(-1 if 'para trás' in low else 1)
    m=re.search(r'empurra[^;]*?(\d+(?:,\d+)?) m',low); 
    if m: t['emp']=num(m.group(1))
    m=re.search(r'puxa[^;]*?(\d+(?:,\d+)?) m',low)
    if m: t['puxa']=num(m.group(1))
    if re.search(r'derruba|atordo|para o alto|arremessa',low): t['derruba']=1.2
    if 'interrompe' in low: t['interr']=1
    if 'lento' in low: t['lento']=1
    m=re.search(r'(?:recebe|você recebe)\s*−(\d+)% de dano',low) or re.search(r'recebe (\d+)% menos dano',low)
    if m: t['red']=int(m.group(1))
    m=re.search(r'por (\d+(?:,\d+)?) s',low); t['dur']=num(m.group(1)) if m else None
    return t
def mods(ef):
    m={}
    x=re.search(r'cust\w* (\d+) ?→ ?(\d+)\s?([RE])',ef)
    if x: m['custo']=int(x.group(2))
    x=re.search(r'(?:rec\.|recarga) (\d+(?:,\d+)?) ?→ ?(\d+(?:,\d+)?) s',ef)
    if x: m['cd']=num(x.group(2))
    x=re.search(r'K(\d+,\d+) ?→ ?(\d+,\d+)',ef)
    if x: m['K']=num(x.group(2))
    x=re.search(r'impacto (\d+) ?→ ?(\d+)',ef)
    if x: m['I']=int(x.group(2))
    return m
def arvores(arq,cat):
    out=[];cur=None;ramo=None
    for ln in open(D+arq,encoding='utf-8'):
        if ln.startswith('## '):
            nome=ln[3:].split('—')[0].strip(); desc=ln[3:].split('—',1)[1].strip() if '—' in ln else ''
            cur={'id':slug(nome),'nome':nome.title() if cat!='elem' else nome.capitalize(),'cat':cat,'desc':desc,'ramos':{},'nos':[]};out.append(cur);ramo='Tronco'
        elif ln.startswith('### ') and cur: ramo=ln[4:].strip()
        else:
            m=LIN.match(ln.strip())
            if m and cur:
                n,nome,tipo,req,ef=m.groups()
                refs=[int(r) for r in re.findall(r'\b(\d{2})\b(?! s)',req.split('dom.')[0].split('nível')[0])]
                d=re.search(r'dom\. (\d+)',req); nv=re.search(r'nível (\d+)',req)
                no={'n':int(n),'nome':nome,'tipo':tipo,'reqTxt':req,'refs':refs,'dom':int(d.group(1)) if d else 0,'nivel':int(nv.group(1)) if nv else 0,'ef':ef,'ramo':ramo}
                k=re.search(r'(\d+) PH no ramo',req); 
                if k: no['phRamo']=int(k.group(1))
                kt=re.search(r'(\d+) técnicas?',req); kp=re.search(r'(\d+) passivas?',req)
                if tipo=='Nó-chave': no['kT']=int(kt.group(1)) if kt else 0; no['kP']=int(kp.group(1)) if kp else 0
                if tipo in('Técnica','Reação'): no['t']=tec(ef)
                else: no['m']=mods(ef)
                cur['nos'].append(no)
    return out
A=[]
for f in ['01-armas-desarmado-curta-longa-duas.md','02-armas-escudo-katana-duaskatanas-machadogrande.md','03-armas-machadopequeno-doismachados-arco.md']: A+=arvores(f,'arma')
E=arvores('04-elementos.md','elem'); Di=arvores('05-disciplinas.md','disc')
for a in A+E+Di: a['nos'].sort(key=lambda x:x['n'])
sis=open(D+'00-sistema.md',encoding='utf-8').read()
sec=sis.split('### 2.7')[1].split('### 2.8')[0]
esp=[]
for ln in sec.splitlines():
    m=re.match(r'^\| (FOR|DES|VIG|POT|CON|PER) \| (.+)\|\s*$',ln)
    if m:
        cel=[c.strip() for c in m.group(2).split('|')]
        for marco,c in zip([15,35,55],cel):
            nm=re.match(r'\*\*(.+?)\*\* — (.+)',c); esp.append({'id':slug(nm.group(1)),'attr':m.group(1),'marco':marco,'nome':nm.group(1),'ef':nm.group(2).replace('**','')})
lig=[]
for ln in sis.split('### 2.8')[1].split('### 2.9')[0].splitlines():
    m=re.match(r'^\| (FOR|DES|VIG|POT|CON|PER)–(FOR|DES|VIG|POT|CON|PER) \| \*\*(.+?)\*\* \| (.+?) \|',ln)
    if m: lig.append({'id':slug(m.group(3)),'a':m.group(1),'b':m.group(2),'nome':m.group(3),'ef':m.group(4).replace('**','')})
art=[];fam=''
for blk in re.split(r'\n(?=### \d+\. |## )',open(D+'06-artes.md',encoding='utf-8').read()):
    if blk.startswith('## ') and not blk.startswith('## Contrato'): fam=blk[3:].split('\n')[0].strip()
    m=re.match(r'### (\d+)\. (.+)',blk)
    if m:
        g=lambda k: (re.search(r'- \*\*'+k+r':\*\* (.+)',blk) or [None,''])[1].replace('**','')
        rot=g('Rotas'); mets=re.findall(r'(Esquiva|Defesa ativa|Agressão|Mobilidade|Precisão|Controle|Compromisso|Magia|Suporte)',rot.split('·')[0]) if rot else []
        at=re.findall(r'(FOR|DES|VIG|POT|CON|PER) \+(\d+)',rot)
        art.append({'n':int(m.group(1)),'nome':m.group(2).strip(),'fam':fam,'ativ':g('Ativação'),'ef':g('Efeito'),'preco':g('Preço'),'alt':g('Alternativas'),'rotas':rot,'mets':mets[:2],'attrs':at})
mx=open(D+'07-mistura-elementos.md',encoding='utf-8').read();rea={}
for ln in mx.splitlines():
    m=re.match(r'^\| \*\*(\w+) \+ (\w+)\*\*[^|]*\| (.+)\|\s*$',ln)
    if m:
        cel=[c.strip() for c in m.group(3).split('|')]
        fs=[]
        for c in cel:
            nm=re.match(r'\*\*(.+?)\*\*: (.+)',c); fs.append({'nome':nm.group(1),'ef':nm.group(2).replace('**','')})
        rea[slug(m.group(1))+'+'+slug(m.group(2))]=fs
def fx_reacoes(rea):
    def n(x):return float(x.replace(',','.'))
    for par,fs in rea.items():
        for f in fs:
            e=f['ef'].lower();r={}
            m=re.search(r'k(\d+,\d+)(?: × (\d+))?',e)
            if m:r['K']=n(m.group(1))*(int(m.group(2)) if m.group(2) else 1)
            m=re.search(r'\bi(\d+)',e)
            if m:r['I']=int(m.group(1))
            m=re.search(r'(?:área|nuvem|poça|explosão k[\d,]+ em) (?:de )?(\d+(?:,\d+)?) m',e) or re.search(r'em (\d+(?:,\d+)?) m',e)
            if m:r['r']=n(m.group(1))
            m=re.search(r'−(\d+) de postura',e)
            if m:r['pos']=int(m.group(1))
            if 'lento' in e and 'remove o lento' not in e:r['lento']=1
            m=re.search(r'empurra[^;]*?(\d+(?:,\d+)?) m',e)
            if m:r['emp']=n(m.group(1))
            m=re.search(r'puxa[^;]*?(\d+(?:,\d+)?) m',e)
            if m:r['puxa']=n(m.group(1))
            if 'interrompe' in e:r['interr']=1
            if re.search(r'derrubad|levantado|preso',e):r['derruba']=1.2
            m=re.search(r'você recebe −(\d+)% de dano',e)
            if m:r['selfRed']=int(m.group(1))
            m=re.search(r'recupera (\d+) de postura',e)
            if m:r['selfPos']=int(m.group(1))
            if re.search(r'aliados|aliado',e) and 'K' not in r:r['apoio']=1
            if re.search(r'você sai da mira|perdem você',e):r['oculto']=1
            if re.search(r'controle|preso|interromp|lento|empurra|puxa|derrub|levantad|atraso',e) and 'remove o lento' not in e:r['ctrl']=1
            if 'você e aliados' in f['ef'] and '+10% de movimento' in f['ef']:r['selfMov']=10
            if 'sua recuperação' in f['ef']:r['selfVel']=10
            f['fx']=r
fx_reacoes(rea)
dados={'armas':A,'elems':E,'discs':Di,'esp':esp,'lig':lig,'artes':art,'reacoes':rea}
open('/home/claude/jogo2/dados.js','w').write('const DADOS='+json.dumps(dados,ensure_ascii=False)+';')
ntec=sum(1 for a in A+E+Di for n in a['nos'] if 't' in n)
print(len(A),len(E),len(Di),len(esp),len(lig),len(art),len(rea),'técnicas',ntec,'nós',sum(len(a['nos']) for a in A+E+Di))
from collections import Counter
print(Counter(n['t']['forma'] for a in A+E+Di for n in a['nos'] if 't' in n))
print([a['id'] for a in A+E+Di])
