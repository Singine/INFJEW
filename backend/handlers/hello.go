package handlers

import (
	"fmt"
	"net/http"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {

	// // 添加 CORS 允许
    // w.Header().Set("Access-Control-Allow-Origin", "*")
    // w.Header().Set("Content-Type", "text/plain")
    // w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    // w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// // if r.Method != http.MethodGet {
	// // 	http.Error(w, "只允许 GET 请求", http.StatusMethodNotAllowed)
	// // 	return
	// // }

	fmt.Fprintln(w, "Hello, World!")
}
