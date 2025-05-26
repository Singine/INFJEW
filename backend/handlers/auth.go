package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"backend/db"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("a-very-secret-key"))

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "只允许 POST 请求", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "请求格式错误", http.StatusBadRequest)
		return
	}

	var dbPassword string
	err := db.DB.QueryRow("SELECT password FROM users WHERE username = ?", req.Username).Scan(&dbPassword)
	if err != nil || dbPassword != req.Password {
		http.Error(w, "用户名或密码错误", http.StatusUnauthorized)
		return
	}

	// 创建 session
	session, _ := store.Get(r, "session-id")
	session.Values["username"] = req.Username
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   3600, // 1 小时
		HttpOnly: true,
	}
	session.Save(r, w)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("登录成功"))
}


func ExtendSessionHandler(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "session-id")
	if err != nil || session.Values["username"] == nil {
		http.Error(w, "未登录或 session 无效", http.StatusUnauthorized)
		return
	}

	// 延长 1 小时
	session.Options.MaxAge = 3600
	session.Save(r, w)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("登录状态已延长 1 小时"))
}
