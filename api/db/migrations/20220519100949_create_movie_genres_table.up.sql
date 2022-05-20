BEGIN;

CREATE TABLE IF NOT EXISTS movie_genres(
    id INT unsigned AUTO_INCREMENT NOT NULL,
    movie_id INT,
    genre_id INT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

COMMIT;