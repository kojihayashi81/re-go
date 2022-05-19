BEGIN;

CREATE TABLE IF NOT EXISTS movies(
   id INT unsigned AUTO_INCREMENT NOT NULL,
   title VARCHAR (50) NOT NULL,
   description TEXT,
   year SMALLINT,
   release_date DATE,
   runtime INT,
   rating INT,
   mpaa_rating VARCHAR (50),
   created_at DATETIME,
   updated_at DATETIME,
   PRIMARY KEY (id)
);

COMMIT;