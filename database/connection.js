const pgp = require('pg-promise')();

require('dotenv').config();

var connectionString = process.env.DATABASE_URL || `postgres://postgres:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`;

const db = pgp(connectionString);

let generatePokemon = function(request, response) {
  if(!request.query.hasOwnProperty('number')) {
    response.send("generating a pokemon for you....")
  } else {
    let pokemonId = 43;
    //request.query.number
    db.any(`SELECT * FROM pokemon WHERE number=${pokemonId}`)
    .then((pokemonData)=>{
      response.send(pokemonData);
    })
    .catch((err)=>{
      console.log('error: ', err);
      response.send(err)
    })
  }
}

let test = function(request, response) {
  response.send("testing, testing")
}

module.exports = {
  db: db,
  test: test,
  generatePokemon: generatePokemon
}