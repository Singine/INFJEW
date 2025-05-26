// package db

// import (
// 	"database/sql"
// 	_ "github.com/go-sql-driver/mysql"
// 	"log"
// )

// var DB *sql.DB

// func InitDB() {
// 	var err error
// 	dsn := "root:Haishigugue33@tcp(127.0.0.1:3306)/infjew"
// 	DB, err = sql.Open("mysql", dsn)
// 	if err != nil {
// 		log.Fatal("数据库连接失败:", err)
// 	}
// 	if err = DB.Ping(); err != nil {
// 		log.Fatal("数据库无法访问:", err)
// 	}
// }
