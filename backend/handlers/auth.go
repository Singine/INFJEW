package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	// "backend/db"
	// "golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Token   string `json:"token,omitempty"` // 可选的 JWT Token
}

func AuthLoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// 假设是硬编码的测试账号
	if req.Username == "admin" && req.Password == "password123" {
		resp := LoginResponse{
			Success: true,
			Message: "Login successful",
			Token:   "mock-jwt-token-123", // 后面可以替换为实际 JWT
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
		return
	}

	resp := LoginResponse{
		Success: false,
		Message: "Invalid username or password",
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(resp)
}












// package handlers

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"net/http"

// 	"backend/db"
// 	"golang.org/x/crypto/bcrypt"
// )

// type LoginRequest struct {
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// type LoginResponse struct {
// 	Success bool   `json:"success"`
// 	Message string `json:"message"`
// 	Token   string `json:"token,omitempty"` // 可选的 JWT Token
// }

// func AuthLoginHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var req LoginRequest
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		http.Error(w, "Invalid JSON", http.StatusBadRequest)
// 		return
// 	}

// 	var hashedPassword string
// 	err := db.DB.QueryRow("SELECT password FROM users WHERE username = ?", req.Username).Scan(&hashedPassword)
// 	if err == sql.ErrNoRows {
// 		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
// 		return
// 	} else if err != nil {
// 		http.Error(w, "Server error", http.StatusInternalServerError)
// 		return
// 	}

// 	// 验证密码
// 	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password)); err != nil {
// 		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
// 		return
// 	}

// 	resp := LoginResponse{
// 		Success: true,
// 		Message: "Login successful",
// 	}
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(resp)
// }

// func AuthLogoutHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	// 这里可以添加注销逻辑，比如清除会话或 JWT Token
	
// 	resp := LoginResponse{
// 		Success: true,
// 		Message: "Logout successful",
// 	}
// 	json.NewEncoder(w).Encode(resp)
// }
