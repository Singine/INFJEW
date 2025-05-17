package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    // 示例 API 路由
    http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
        // 设置允许跨域（CORS）响应头，前后端分离需要
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Content-Type", "application/json")
        fmt.Fprintf(w, `{"message": "Hello from Go backend!"}`)
    })

    // 启动服务
    port := ":8080"
    fmt.Println("✅ Go 后端服务启动中，监听端口", port)
    if err := http.ListenAndServe(port, nil); err != nil {
        log.Fatalf("❌ 启动失败: %v", err)
    }
}
