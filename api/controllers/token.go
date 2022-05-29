package controllers

import (
	"fmt"
	"log"
	"main/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
)

var validUser = models.User{
	ID:       10,
	Email:    "test@example.com",
	Password: "$2a$12$fRXB6UXPd2r6OVOVDugwo.4KVWyp38.t4d3X1pVM5RtDaqK35vRtK",
}

type Credentials struct {
	Username string `json:"email"`
	Password string `json:"password"`
}

func SignIn(c *gin.Context) {
	var creds Credentials

	c.BindJSON(&creds)
	hashedPassword := validUser.Password
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password))
	if err != nil {
		log.Println("Unauthorized")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "mydomain.com"
	claims.Audiences = []string{"mydomain.com"}

	err = godotenv.Load("./envfiles/.env")
	if err != nil {
		log.Println("Error Loading .env File")
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  err.Error(),
			"status": "Unavailable",
		})
		c.Abort()
		return
	}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, jwtBytes)
}
