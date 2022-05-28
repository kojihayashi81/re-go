package main

import (
	"flag"
	"log"
	"main/routes"

	"github.com/gin-gonic/gin"
)

type Config struct {
	port int
	env  string
	jwt  struct {
		secret string
	}
}

var cfg Config

func init() {
	flag.IntVar(&cfg.port, "port", 8000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment (development|production)")
	flag.StringVar(&cfg.jwt.secret, "jwt-secret", "", "secret")
}

func main() {
	flag.Parse()

	r := gin.Default()

	routes.Router(r)

	err := r.Run(":8000")
	if err != nil {
		log.Panicln(err)
	}
}
