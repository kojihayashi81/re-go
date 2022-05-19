FROM golang:latest

COPY api/ /go/src/api
WORKDIR /go/src/api

RUN go install github.com/cosmtrek/air@latest && \
    go get -u github.com/gin-gonic/gin && \
    go get -u github.com/go-sql-driver/mysql && \
    go get -u github.com/jinzhu/gorm && \
    go get -u github.com/joho/godotenv && \
    go install github.com/go-delve/delve/cmd/dlv@latest && \
    go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
