FROM golang:latest

COPY api/ /go/src/api
WORKDIR /go/src/api

RUN go get -u github.com/cosmtrek/air && \
    go get -u github.com/gin-gonic/gin && \
    go get -u github.com/go-sql-driver/mysql && \
    go get -u github.com/jinzhu/gorm && \
    go get -u github.com/joho/godotenv && \
    go get -u github.com/go-delve/delve/cmd/dlv

CMD air -c .air.toml