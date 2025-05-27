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


// 删除 Precious Item
func DeletePreciousItemHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Method Not Allowed",
		})
		return
	}

	var req struct {
		ID int `json:"id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("❌ 请求解析失败: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "请求体无效",
		})
		return
	}

	// 执行删除
	_, err := db.DB.Exec("DELETE FROM preciousList WHERE id = ?", req.ID)
	if err != nil {
		log.Printf("❌ 删除数据失败: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "删除失败",
		})
		return
	}

	// 删除成功后返回当前列表
	rows, err := db.DB.Query(`
		SELECT id, itemid, title, tag, price, discount, rating, status, url, picurl
		FROM preciousList
	`)
	if err != nil {
		log.Printf("❌ 查询列表失败: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "删除成功但获取数据失败",
		})
		return
	}
	defer rows.Close()

	var items []PreciousItem
	for rows.Next() {
		var item PreciousItem
		if err := rows.Scan(&item.ID, &item.ItemID, &item.Title, &item.Tag, &item.Price, &item.Discount, &item.Rating, &item.Status, &item.URL, &item.PicURL); err != nil {
			log.Printf("❌ 数据解析失败: %v", err)
			continue
		}
		items = append(items, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "删除成功",
		"data":    items,
	})
}
