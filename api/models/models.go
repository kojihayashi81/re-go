package models

import (
	"time"
)

type Movie struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	Year        int          `json:"year"`
	ReleaseDate time.Time    `json:"release_date" gorm:"type:datetime(6)"`
	Runtime     int          `json:"runtime"`
	Rating      int          `json:"rating"`
	MPAARating  string       `json:"mpaa_rating"`
	CreatedAt   time.Time    `json:"created_at" gorm:"type:datetime(6)"`
	UpdatedAt   time.Time    `json:"updated_at" gorm:"type:datetime(6)"`
	MovieGenre  []MovieGenre `json:"genres" gorm:"foreignKey:movie_id"`
}

type MoviePayload struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	ReleaseDate time.Time `json:"release_date" gorm:"type:datetime(6)"`
	Runtime     string    `json:"runtime"`
	Rating      string    `json:"rating"`
	MPAARating  string    `json:"mpaa_rating"`
}

type Genre struct {
	ID        int       `json:"-"`
	GenreName string    `json:"genre_name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type MovieGenre struct {
	ID        int       `json:"-"`
	MovieID   int       `json:"-"`
	GenreID   int       `json:"-"`
	Genre     Genre     `json:"genre" gorm:"foreignKey:genre_id"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
