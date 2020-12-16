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

INSERT INTO
    pokemon(number, name, catchMax, fleeMax, regURL)
VALUES
    (1, 'bulbasaur', 5, 10, 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg'),
    (2, 'ivysaur', 7, 7, 'https://img.pokemondb.net/artwork/large/ivysaur.jpg'),
    (3, 'venusaur', 10, 5, 'https://img.pokemondb.net/artwork/large/venusaur.jpg'),
    (4, 'charmander', 5, 10, 'https://img.pokemondb.net/artwork/large/charmander.jpg'),
    (5, 'charmeleon', 7, 7, 'https://img.pokemondb.net/artwork/large/charmeleon.jpg'),
    (6, 'charizard', 10, 5, 'https://img.pokemondb.net/artwork/large/charizard.jpg'),
    (7, 'squirtle', 5, 10, 'https://img.pokemondb.net/artwork/large/squirtle.jpg'),
    (8, 'wartortle', 7, 7, 'https://img.pokemondb.net/artwork/large/wartortle.jpg'),
    (9, 'blastoise', 10, 5, 'https://img.pokemondb.net/artwork/large/blastoise.jpg');


INSERT INTO
    pokemon(number, name, catchMax, fleeMax, regURL)
VALUES
    (43, 'oddish', 5, 10, 'https://img.pokemondb.net/artwork/large/oddish.jpg');