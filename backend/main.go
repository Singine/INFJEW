package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/handlers"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	http.HandleFunc("api/check-id", handlers.CheckIDHandler)
	http.HandleFunc("api/hello", handlers.HelloHandler) 


	port := ":8080"
	fmt.Printf("服务器正在运行在 %s\n", port)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("无法启动服务器:", err)
	}
}
