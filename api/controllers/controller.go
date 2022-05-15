package controllers

import (
	"api/db"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

// JSONMessage is TestType
type JSONMessage struct {
	Message string
	Int     int
}

// User is TestType
type User struct {
	gorm.Model
	Username string `form:"username" binding:"required" gorm:"unique;not null"`
	Password string `form:"password" binding:"required"`
}

// JWT is TestType
type JWT struct {
	Token string `json:"token"`
}

// Error is TestType
type Error struct {
	Message string `json:"message"`
}

// SignUp is Client Side
func SignUp(c *gin.Context) {
	var form User

	if err := c.Bind(&form); err != nil {
		c.HTML(http.StatusBadRequest, "signup.html", gin.H{"err": err})
		c.Abort()
	} else {
		username := c.PostForm("username")
		password := c.PostForm("password")

		if err := CreateUser(username, password); err != nil {
			c.HTML(http.StatusBadRequest, "signup.html", gin.H{"err": err})
		}
		c.Redirect(302, "/")
	}
}

// CreateUser is create user.
func CreateUser(username string, password string) []error {
	passwordEncrypt, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	db := db.GormConnect()
	defer db.Close()
	// Insert処理
	if err := db.Create(&User{Username: username, Password: string(passwordEncrypt)}).GetErrors(); err != nil {
		return err
	}
	return nil
}

func errorInResponse(w http.ResponseWriter, status int, error Error) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(error)
	return
}
