package middleware

import (
	"net/http"
)

func WithCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// 只允许来自 infjew.com 和 www.infjew.com 的请求
		if origin == "https://infjew.com" || origin == "https://www.infjew.com" || origin == "http://www.infjew.com" || origin == "http://infjew.com" || origin == "https://dashboard.infjew.com" || origin == "http://dashboard.infjew.com" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Credentials", "true") // 允许发送 cookie
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Content-Type", "application/json")

		// 预检请求
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
