package controller

import "github.com/gin-gonic/gin"

// JSONMessage is TestType
type JSONMessage struct {
	Message string
	Int     int
}

// MyFunction is testFunction
func MyFunction(c *gin.Context) {
	message := JSONMessage{Message: "pong", Int: 123}
	c.JSON(200, message)
}
