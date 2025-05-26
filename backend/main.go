package main

import (
	"fmt"
	"net/http"

	"backend/handlers"
	"backend/middleware"

	// "backend/db"

	// // 引入 gorilla/sessions 包用于会话管理
	// "github.com/gorilla/sessions"
)

// var store = sessions.NewCookieStore([]byte("a-very-secret-key")) // 用于加密 session
	

func main() {

	// db.InitDB()

	// http.HandleFunc("/login", handlers.LoginHandler)
	// http.HandleFunc("/extend-session", handlers.ExtendSessionHandler)

	
	mux := http.NewServeMux()

	// 使用中间件包裹 handler
	checkIDWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.CheckIDHandler))
    helloWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.HelloHandler))
    mux.Handle("/api/check", checkIDWithCORS)
    mux.Handle("/api/hello", helloWithCORS)


    http.ListenAndServe(":8080", mux)
	fmt.Printf("服务器正在运行在 %s\n", ":8080")

}
