package main

import (
	"api/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	v1 := router.Group("/v1")
	{
		v1.GET("/test", controller.MyFunction)
	}

	router.Run(":8000")
}
