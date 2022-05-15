package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
)

// GormConnect is DB Connect.
func GormConnect() *gorm.DB {
	err := godotenv.Load(fmt.Sprintf("./envfiles/%s.env", os.Getenv("GO_ENV")))
	if err != nil {
		log.Fatal("Error Loading .env File")
	}

	DBMS := os.Getenv("ENV")
	DBNAME := os.Getenv("DBNAME")
	DBUser := os.Getenv("DBUSER")
	DBPass := os.Getenv("DBPASS")
	PROTOCOL := os.Getenv("PROTOCOL")

	CONNECT := DBUser + ":" + DBPass + "@" + PROTOCOL + "/" + DBNAME

	db, err := gorm.Open(DBMS, CONNECT)
	if err != nil {
		panic(err.Error())
	}

	return db
}
