package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
	Version     string `json:"version"`
}

func Status(c *gin.Context) {
	err := godotenv.Load("./envfiles/.env")
	if err != nil {
		log.Fatal("Error Loading .env File")
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  err.Error(),
			"status": "Unavailable",
		})
		c.Abort()
	}

	c.JSON(http.StatusOK, AppStatus{
		Status:      "Available",
		Environment: os.Getenv("APP_ENV"),
		Version:     os.Getenv("VERSION"),
	})
}
