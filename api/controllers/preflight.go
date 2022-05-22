package controllers

import (
	"github.com/gin-gonic/gin"
)

func Preflight(c *gin.Context) { c.AbortWithStatus(204) }
