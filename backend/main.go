package main

import (
	"fmt"
	"net/http"

	"backend/handlers"
	"backend/middleware"

	
)



func main() {

	
	
	mux := http.NewServeMux()

	// 使用中间件包裹 handler
	checkIDWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.CheckIDHandler))
    helloWithCORS := middleware.WithCORS(http.HandlerFunc(handlers.HelloHandler))
    mux.Handle("/api/check", checkIDWithCORS)
    mux.Handle("/api/hello", helloWithCORS)




    http.ListenAndServe(":8080", mux)
	fmt.Printf("服务器正在运行在 %s\n", ":8080")

}
