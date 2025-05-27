package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"backend/db"
)

type PreciousItem struct {
	ID       int    `json:"id"`
	ItemID   string `json:"itemid"`
	Title    string `json:"title"`
	Tag      string `json:"tag"`
	Price    int    `json:"price"`
	Discount int    `json:"discount"`
	Rating   int    `json:"rating"`
	Status   int    `json:"status"`
	URL      string `json:"url"`
	PicURL   string `json:"picurl"`
}

// 获取所有 Precious Item
func GetPreciousListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Method Not Allowed",
		})
		return
	}

	rows, err := db.DB.Query(`
		SELECT id, itemid, title, tag, price, discount, rating, status, url, picurl
		FROM preciousList
	`)
	if err != nil {
		log.Printf("❌ 查询 preciousList 失败: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "数据库查询失败",
		})
		return
	}
	defer rows.Close()

	var items []PreciousItem
	for rows.Next() {
		var item PreciousItem
		if err := rows.Scan(&item.ID, &item.ItemID, &item.Title, &item.Tag, &item.Price, &item.Discount, &item.Rating, &item.Status, &item.URL, &item.PicURL); err != nil {
			log.Printf("❌ 数据行解析失败: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"success": false,
				"message": "数据解析失败",
			})
			return
		}
		items = append(items, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    items,
	})
}
