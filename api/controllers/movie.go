package controllers

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func getMovie(c *gin.Context) {
	params := c.Query("id")
	fmt.Printf(params)
}
