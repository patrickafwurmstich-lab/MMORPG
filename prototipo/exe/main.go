// Andar 1 — protótipo do MMORPG (Formiguinha Açucarada).
// Abre um servidor local com o jogo embutido e abre o navegador padrão.
// Feche esta janela para encerrar.
package main

import (
	_ "embed"
	"fmt"
	"net"
	"net/http"
	"os/exec"
	"time"
)

//go:embed jogo.html
var jogo []byte

func main() {
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Println("Erro ao abrir a porta local:", err)
		time.Sleep(10 * time.Second)
		return
	}
	url := fmt.Sprintf("http://%s/", ln.Addr().String())
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.Write(jogo)
	})
	fmt.Println("=== Andar 1 — Protótipo (MMORPG) ===")
	fmt.Println("O jogo abriu no seu navegador:", url)
	fmt.Println("Precisa de internet na primeira vez (o motor 3D vem da internet).")
	fmt.Println("Para sair, feche esta janela.")
	go func() {
		time.Sleep(300 * time.Millisecond)
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	}()
	http.Serve(ln, nil)
}
