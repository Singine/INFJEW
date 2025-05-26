package handlers

import (
	"net/http"
)

// 跳转到前端登录页面
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "http://www.infjew.com/admin/login.html", http.StatusFound)
}
