package models

import (
	"time"
)

type Movie struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Descriotion string       `json:"description"`
	Year        int          `json:"year"`
	ReleaseDate time.Time    `json:"release_date" gorm:"type:datetime(6)"`
	Runtime     int          `json:"runtime"`
	Rating      int          `json:"rating"`
	MRAARating  string       `json:"mpaa_rating"`
	CreatedAt   time.Time    `json:"created_at" gorm:"type:datetime(6)"`
	UpdatedAt   time.Time    `json:"updated_at" gorm:"type:datetime(6)"`
	MovieGenre  []MovieGenre `json:"-"`
}

type Genre struct {
	ID        int       `json:"id"`
	GenreName string    `json:"genre_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MovieGenre struct {
	ID        int       `json:"id"`
	MovieID   int       `json:"movie_id"`
	GenreID   int       `json:"genre_id"`
	Genre     Genre     `json:"genre"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
