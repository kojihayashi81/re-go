package middleware

import (
	"errors"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/pascaldekloe/jwt"
)

func CheckToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		// c.Header("Vary", "Authorization")

		authHeader := c.GetHeader("Authorization")
		log.Println(authHeader)

		if authHeader == "" {
			// Could set an anonymous user
			log.Println("anonymous user")
		}

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 {
			c.JSON(http.StatusUnauthorized, errors.New("invalid auth header"))
			c.Abort()
		}

		if headerParts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized - no bearer"))
			c.Abort()
		}

		err := godotenv.Load("./envfiles/.env")
		if err != nil {
			log.Println("Error Loading .env File")
			c.JSON(http.StatusBadRequest, gin.H{
				"error":  err.Error(),
				"status": "Unavailable",
			})
			c.Abort()
			return
		}

		token := headerParts[1]

		claims, err := jwt.HMACCheck([]byte(token), []byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized - failed hmac check"))
			c.Abort()
		}

		if !claims.Valid(time.Now()) {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized - token expired"))
			c.Abort()
		}

		if !claims.AcceptAudience("mydomain.com") {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized - invalid audience"))
			c.Abort()
		}

		if claims.Issuer != "mydomain.com" {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized - invalid issuer"))
			c.Abort()
		}

		userID, err := strconv.ParseInt(claims.Subject, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, errors.New("unauthorized"))
			c.Abort()
		}

		log.Println("Valid user:", userID)
		c.Next()
	}
}
