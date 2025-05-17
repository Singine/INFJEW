// backend/main.go
package main

import (
    "net/http"
)

func main() {
    // 提供静态资源
    fs := http.FileServer(http.Dir("./frontend"))
    http.Handle("/", fs)

    // 提供 API 接口
    http.HandleFunc("/api/contact", contactHandler)

    // 启动服务
    http.ListenAndServe(":8080", nil)
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        name := r.FormValue("name")
        email := r.FormValue("email")
        message := r.FormValue("message")

        // 处理数据，例如存入数据库或写日志
        w.Write([]byte("表单提交成功"))
    } else {
        http.Error(w, "不支持的方法", http.StatusMethodNotAllowed)
    }
}
