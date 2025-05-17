package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        fmt.Fprintf(w, `{"message":"Hello from Go!"}`)
    })

    fmt.Println("Server started at http://localhost:8080")
    http.ListenAndServe("127.0.0.1:8080", nil)
}
