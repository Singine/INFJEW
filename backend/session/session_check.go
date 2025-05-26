package session

import (
	"encoding/json"
	"github.com/gorilla/sessions"
	"net/http"
	"backend/session"
)

func SessionStatusHandler(w http.ResponseWriter, r *http.Request) {
	username, ok := session.GetUsername(r)
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
