package handlers

import (
	"fmt"
	"net/http"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "只允许 GET 请求", http.StatusMethodNotAllowed)
		return
	}

	fmt.Fprintln(w, "Hello, World!")
}
