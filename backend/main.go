package main

import (
	"fmt"
	"net/http"

	"backend/handlers"
	"backend/middleware"
	"backend/db"
	"backend/session"
)

// 中间件组合器
func ApplyMiddlewares(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
	for _, m := range middlewares {
		h = m(h)
	}
	return h
}

func main() {
	db.InitDB()

	mux := http.NewServeMux()

	// 登录后访问接口，使用自动续期 + CORS
	mux.Handle("/api/check", ApplyMiddlewares(http.HandlerFunc(handlers.CheckIDHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/hello", ApplyMiddlewares(http.HandlerFunc(handlers.HelloHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/session/status", ApplyMiddlewares(http.HandlerFunc(session.SessionStatusHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/banners", ApplyMiddlewares(http.HandlerFunc(handlers.GetBannersHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/banner/delete", ApplyMiddlewares(http.HandlerFunc(handlers.DeleteBannerHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/banner/create", ApplyMiddlewares(http.HandlerFunc(handlers.CreateBannerHandler), middleware.WithSessionRefresh, middleware.WithCORS))
	mux.Handle("/api/countingdown", ApplyMiddlewares(http.HandlerFunc(handlers.GetCountingDownHandler), middleware.WithSessionRefresh, middleware.WithCORS))

	mux.Handle("/api/countingdown/update", ApplyMiddlewares(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		handlers.UpdateCountingDownHandler(w, r)
	}), middleware.WithSessionRefresh, middleware.WithCORS))

	// 登录 / 登出接口只加 CORS，不自动续期
	mux.Handle("/api/AuthLogin", ApplyMiddlewares(http.HandlerFunc(handlers.AuthLoginHandler), middleware.WithCORS))
	mux.Handle("/api/AuthLogout", ApplyMiddlewares(http.HandlerFunc(handlers.AuthLogoutHandler), middleware.WithCORS))

	fmt.Println("服务器启动中，监听端口 8080...")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		fmt.Printf("服务器启动失败：%v\n", err)
	}
}
