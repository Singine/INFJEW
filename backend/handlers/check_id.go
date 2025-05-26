package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Response struct {
	Result bool `json:"result"`
}

func CheckIDHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "只允许 POST 请求", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "解析参数失败", http.StatusBadRequest)
		return
	}

	idStr := r.FormValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "id 参数必须是数字", http.StatusBadRequest)
		return
	}

	result := (id == 1)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Result: result})
}