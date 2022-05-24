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
	v1.Use(middleware.Cors())

	{
		v1.GET("/status", controllers.Status)
		v1.OPTIONS("/movie/:id", controllers.Preflight)
		v1.PUT("/movie/:id", controllers.UpdateMovie)
		v1.DELETE("/movie/:id", controllers.DeleteMovie)
		v1.OPTIONS("/movies", controllers.Preflight)
		v1.POST("/movies", controllers.CreateMovie)
		v1.GET("/movie/:id", controllers.GetMovie)
		v1.GET("/movies", controllers.GetAllMovie)
	}

	r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{"code": 404}) })

}
