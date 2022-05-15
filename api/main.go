package main

import (
	"api/controllers"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	v1 := r.Group("/v1")
	{
		v1.GET("/status", controllers.Status)
		v1.POST("/movie", controllers.SignUp)
	}
	r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{"code": 404}) })
	err := r.Run(":8000")
	if err != nil {
		log.Panicln(err)
	}
}
