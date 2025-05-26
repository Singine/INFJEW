package handlers

import (
	"encoding/json"
	"net/http"
	"log"

	"backend/db"
)

type CountingDown struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	Price      int    `json:"price"`
	Discount   int    `json:"discount"`
	Percentage string `json:"percentage"`
	Rating     int    `json:"rating"`
	DDL        string `json:"ddl"`
	URL        string `json:"url"`
	PicURL     string `json:"picurl"`
}

// 获取所有 CountingDown 数据
func GetCountingDownHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Method Not Allowed",
		})
		return
	}

	// 查询 countingDown 数据
	rows, err := db.DB.Query("SELECT id, title, price, discount, percentage, rating, ddl, url, picurl FROM countingDown")
	if err != nil {
		log.Printf("❌ 数据库查询失败: %v", err)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Database query failed",
		})
		return
	}
	defer rows.Close()

	var countingDowns []CountingDown
	for rows.Next() {
		var cd CountingDown
		if err := rows.Scan(&cd.ID, &cd.Title, &cd.Price, &cd.Discount, &cd.Percentage, &cd.Rating, &cd.DDL, &cd.URL, &cd.PicURL); err != nil {
			log.Printf("❌ 数据行扫描失败: %v", err)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"success": false,
				"message": "Error processing data",
			})
			return
		}
		countingDowns = append(countingDowns, cd)
	}

	// 返回获取到的 countingDown 数据
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    countingDowns,
	})
}
