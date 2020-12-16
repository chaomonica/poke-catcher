/*

sudo su postgres
psql -f database/schema.sql

CREATE DATABASE pokecatcher;

*/


\c pokecatcher;


CREATE TABLE IF NOT EXISTS pokemon (
  number INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  catchMax INT NOT NULL,
  fleeMax INT NOT NULL,
  regURL VARCHAR(200) NOT NULL
);

create index num_index on pokemon(number);

COPY pokemon(number, name, catchMax, fleeMax, regURL)
FROM '/home/monica/Documents/HackReactor/Week10/PokeCatcher/database/pokemon.csv'
DELIMITER ','
CSV HEADER;