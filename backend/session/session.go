package session

import (
	"github.com/gorilla/sessions"
	"net/http"
)

var Store = sessions.NewCookieStore([]byte("infinityjewelry")) // 强烈建议改成更复杂的密钥

func InitSession(w http.ResponseWriter, r *http.Request, username string) error {
	session, _ := Store.Get(r, "session-id")
	session.Values["username"] = username
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   3600, // 秒；1 小时
		HttpOnly: true,
	}
	return session.Save(r, w)
}

func GetUsername(r *http.Request) (string, bool) {
	session, _ := Store.Get(r, "session-id")
	username, ok := session.Values["username"].(string)
	return username, ok
}

func ClearSession(w http.ResponseWriter, r *http.Request) {
	session, _ := Store.Get(r, "session-id")
	session.Options.MaxAge = -1
	session.Save(r, w)
}
