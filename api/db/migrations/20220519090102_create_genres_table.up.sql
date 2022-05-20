BEGIN;

CREATE TABLE IF NOT EXISTS genres(
    id INT unsigned AUTO_INCREMENT NOT NULL,
    genre_name VARCHAR (50) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

COMMIT;