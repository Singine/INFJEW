
package session

import (
	"encoding/json"
	"net/http"
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
