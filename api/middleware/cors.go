package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		cors.New(cors.Config{
			AllowOrigins: []string{
				"*",
			},
			AllowMethods: []string{
				"POST",
				"GET",
				"OPTIONS",
			},
			AllowHeaders: []string{
				"Access-Control-Allow-Credentials",
				"Access-Control-Allow-Headers",
				"Content-Type",
				"Content-Length",
				"Accept-Encoding",
				"Authorization",
			},
			AllowCredentials: true,
			MaxAge:           24 * time.Hour,
		})
	}
}
