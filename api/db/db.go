package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

func DbOpen() (*gorm.DB, error) {
	err := godotenv.Load(fmt.Sprintf("./envfiles/%s.env", os.Getenv("APP_ENV")))
	if err != nil {
		log.Fatal("Error Loading .env File")
	}

	ms := os.Getenv("DB_MS")
	dbName := os.Getenv("DB_NAME")
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	dbPort := os.Getenv("DB_PORT")
	protocol := "tcp(" + "db" + ":" + dbPort + ")"
	connect := user + ":" + pass + "@" + protocol + "/" + dbName + "?parseTime=true"

	db, err := gorm.Open(ms, connect)

	return db, err
}
