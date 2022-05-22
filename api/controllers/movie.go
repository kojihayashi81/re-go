package controllers

import (
	"log"
	"main/db"
	"main/models"
	"net/http"
	"strconv"
	"time"

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

	result := db.Preload("MovieGenre.Genre").First(&m, id)
	if result.Error != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, &m)
}

func GetAllMovie(c *gin.Context) {
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

	var movies []*models.Movie
	result := db.Find(&movies)
	if result.Error != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": err.Error(),
		})
		return
	}
	db.Preload("MovieGenre.Genre").Find(&movies)

	c.JSON(http.StatusOK, &movies)
}

func CreateMovie(c *gin.Context) {
	var moviePayload models.MoviePayload
	c.BindJSON(&moviePayload)

	id, _ := strconv.Atoi(moviePayload.ID)
	runtime, _ := strconv.Atoi(moviePayload.Runtime)
	rating, _ := strconv.Atoi(moviePayload.Rating)
	movie := &models.Movie{
		ID:          id,
		Title:       moviePayload.Title,
		Description: moviePayload.Description,
		Year:        moviePayload.ReleaseDate.Year(),
		ReleaseDate: moviePayload.ReleaseDate,
		Runtime:     runtime,
		Rating:      rating,
		MPAARating:  moviePayload.MPAARating,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		MovieGenre:  []models.MovieGenre{},
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

	db.Create(movie)

	c.JSON(http.StatusOK, gin.H{"message": "OK"})
}

func UpdateMovie(c *gin.Context) {
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

	var moviePayload models.MoviePayload
	c.BindJSON(&moviePayload)

	runtime, _ := strconv.Atoi(moviePayload.Runtime)
	rating, _ := strconv.Atoi(moviePayload.Rating)
	movie := &models.Movie{
		ID:          id,
		Title:       moviePayload.Title,
		Description: moviePayload.Description,
		Year:        moviePayload.ReleaseDate.Year(),
		ReleaseDate: moviePayload.ReleaseDate,
		Runtime:     runtime,
		Rating:      rating,
		MPAARating:  moviePayload.MPAARating,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		MovieGenre:  []models.MovieGenre{},
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

	db.Save(movie)

	c.JSON(http.StatusOK, gin.H{"message": "OK"})
}
