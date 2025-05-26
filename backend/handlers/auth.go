package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	
	"log"

	"backend/db"
	"golang.org/x/crypto/bcrypt"
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
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("❌ JSON 解码失败: %v", err)
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	var hashedPassword string
	err := db.DB.QueryRow("SELECT password FROM users WHERE username = ?", req.Username).Scan(&hashedPassword)
	if err == sql.ErrNoRows {
		log.Printf("❌ 用户不存在: %s", req.Username)
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	} else if err != nil {
		log.Printf("❌ 数据库查询失败: %v", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// 验证密码
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password)); err != nil {
		log.Printf("❌ 密码不匹配: %v", err)
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	log.Printf("✅ 登录成功: %s", req.Username)

	resp := LoginResponse{
		Success: true,
		Message: "Login successful",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func AuthLogoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 这里可以添加注销逻辑，比如清除会话或 JWT Token
	
	resp := LoginResponse{
		Success: true,
		Message: "Logout successful",
	}
	json.NewEncoder(w).Encode(resp)
}
