# junta index.html + estilo.css + dados.js + jogo.js num arquivo único (o app do Claude não abre artefato de vários arquivos)
import pathlib
d=pathlib.Path(__file__).parent
h=(d/'index.html').read_text()
h=h.replace('<link rel="stylesheet" href="estilo.css">','<style>\n'+(d/'estilo.css').read_text()+'\n</style>')
for f in ['dados.js','jogo.js']:
    h=h.replace(f'<script src="{f}"></script>','<script>\n'+(d/f).read_text().replace('</script','<\\/script')+'\n</script>')
(d/'andar1-v2.html').write_text(h)
print(len(h))
