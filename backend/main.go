package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", handler)
	
	port := ":8080"
	fmt.Printf("服务器正在运行在 %s\n", port)
	
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("无法启动服务器:", err)
	}
}
