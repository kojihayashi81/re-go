package main

import (
	"flag"
	"log"
	"main/routes"

	"github.com/gin-gonic/gin"
)

type config struct {
	port int
	env  string
}

var cfg config

func init() {
	flag.IntVar(&cfg.port, "port", 8000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment (development|production)")
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
