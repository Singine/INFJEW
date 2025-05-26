package session

import (
	"github.com/gorilla/sessions"
	"net/http"
	"encoding/json"
)

var Store = sessions.NewCookieStore([]byte("infinityjewelry")) // 强烈建议改成更复杂的密钥

func InitSession(w http.ResponseWriter, r *http.Request, username string) error {
	session, _ := Store.Get(r, "session-id")
	session.Values["username"] = username
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   3600,
		HttpOnly: true,
		Secure:   true, // ✅ 必须加
		SameSite: http.SameSiteNoneMode, // ✅ 必须加
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
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	session.Save(r, w)
}

func SessionStatusHandler(w http.ResponseWriter, r *http.Request) {
	username, ok := GetUsername(r)
	w.Header().Set("Content-Type", "application/json")

	if ok {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"loggedIn": true,
			"username": username,
		})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"loggedIn": false,
		})
	}
}
