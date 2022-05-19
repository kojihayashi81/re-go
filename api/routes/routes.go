package routes

import (
	"main/controllers"
	"main/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router(r *gin.Engine) {

	v1 := r.Group("/v1")

	v1.Use(middleware.Logger())

	{
		v1.GET("/status", controllers.Status)
		v1.GET("/movie/:id", controllers.GetMovie)
	}

	r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{"code": 404}) })

}
