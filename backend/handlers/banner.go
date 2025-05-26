package handlers

import (
	"encoding/json"
	"net/http"
	"log"

	"backend/db"
)

type Banner struct {
	ID        int    `json:"id"`
	Title1    string `json:"title1"`
	Title2    string `json:"title2"`
	Subtitle  string `json:"subtitle"`
	URL       string `json:"url"`
	PicURL    string `json:"picurl"`
}

// 获取所有 Banner
func GetBannersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Method Not Allowed",
		})
		return
	}

	// 查询 banner 数据
	rows, err := db.DB.Query("SELECT id, title1, title2, subtitle, url, picurl FROM banner")
	if err != nil {
		log.Printf("❌ 数据库查询失败: %v", err)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Database query failed",
		})
		return
	}
	defer rows.Close()

	var banners []Banner
	for rows.Next() {
		var banner Banner
		if err := rows.Scan(&banner.ID, &banner.Title1, &banner.Title2, &banner.Subtitle, &banner.URL, &banner.PicURL); err != nil {
			log.Printf("❌ 数据行扫描失败: %v", err)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"success": false,
				"message": "Error processing data",
			})
			return
		}
		banners = append(banners, banner)
	}

	// 返回获取到的 banner 数据
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    banners,
	})
}