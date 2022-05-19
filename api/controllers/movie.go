package controllers

import (
	"log"
	"main/db"
	"main/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetMovie(c *gin.Context) {
	param := c.Param("id")

	id, err := strconv.Atoi(param)
	if err != nil {
		log.Println("Invalid id parameter", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"code":  http.StatusBadRequest,
			"error": err.Error(),
		})
		return
	}

	db, err := db.DbOpen()
	defer func() {
		err := db.Close()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"code":   http.StatusInternalServerError,
				"result": err.Error(),
			})
			return
		}
	}()

	if err != nil {
		log.Println("Internal Server Error", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": err.Error(),
		})
		return

	}

	var m models.Movie

	if err := db.First(&m, id).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, &m)
}