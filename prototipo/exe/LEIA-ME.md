# Executável do protótipo (Windows)

`main.go` embute `jogo.html` (cópia de `../v2/andar1-v2.html`) e abre o jogo no navegador padrão por um servidor local.

Gerar:
```
cp ../v2/andar1-v2.html jogo.html
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o Andar1-Prototipo.exe .
```
O motor 3D (three.js r128) vem do cdnjs, então precisa de internet.
