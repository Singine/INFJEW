package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// 响应结构体
type Response struct {
	Result bool `json:"result"`
}

// 处理 POST 请求的 handler
func checkIDHandler(w http.ResponseWriter, r *http.Request) {
	// 只允许 POST 方法
	if r.Method != http.MethodPost {
		http.Error(w, "只允许 POST 请求", http.StatusMethodNotAllowed)
		return
	}

	// 解析表单数据
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "解析参数失败", http.StatusBadRequest)
		return
	}

	// 获取 id 参数
	idStr := r.FormValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "id 参数必须是数字", http.StatusBadRequest)
		return
	}

	// 判断 id 是否等于 1
	result := (id == 1)

	// 设置响应头为 JSON
	w.Header().Set("Content-Type", "application/json")

	// 返回 JSON 响应
	json.NewEncoder(w).Encode(Response{Result: result})
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/check-id", checkIDHandler) // 注册新的路由

	port := ":8080"
	fmt.Printf("服务器正在运行在 %s\n", port)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("无法启动服务器:", err)
	}
}
