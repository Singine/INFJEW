package handlers

import (
	"encoding/json"
	"net/http"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {


	if r.Method != http.MethodGet {
		http.Error(w, "只允许 GET 请求", http.StatusMethodNotAllowed)
		return
	}

	response := map[string]string{
		"str": "Hello, World!",
	}

	// 编码为 JSON 并写入响应
	json.NewEncoder(w).Encode(response)
}
