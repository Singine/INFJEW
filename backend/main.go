package main

import (
	"fmt"
	"net/http"

	"backend/handlers"
	"backend/middleware"
	"backend/db"
	"backend/session"
	
)



func main() {

	db.InitDB()
	
	mux := http.NewServeMux()

	// 使用中间件包裹 handler
	checkIDWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.CheckIDHandler))
    helloWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.HelloHandler))
    mux.Handle("/api/check", checkIDWithCORS)
    mux.Handle("/api/hello", helloWithCORS)

	AuthLoginWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.AuthLoginHandler))
	mux.Handle("/api/AuthLogin", AuthLoginWithCORS)
	AuthLogoutWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.AuthLogoutHandler))
	mux.Handle("/api/AuthLogout", AuthLogoutWithCORS)

	sessionStatusWithCORS := middleware.WithCORS(http.HandlerFunc(session.SessionStatusHandler))
	mux.Handle("/api/session/status", sessionStatusWithCORS)


    fmt.Println("服务器启动中，监听端口 8080...")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		fmt.Printf("服务器启动失败：%v\n", err)
	}

}
