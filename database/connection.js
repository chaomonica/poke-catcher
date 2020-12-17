const pgp = require('pg-promise')();

require('dotenv').config();

var connectionString = `postgres://postgres:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}` || process.env.DATABASE_URL;

const db = pgp(connectionString);

let generatePokemon = function(request, response) {
  if(!request.query.hasOwnProperty('number')) {
    response.send("generating a pokemon for you....")
  } else {
    let pokemonId = request.query.number;
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

let visitProfessor = function(request, response){
  db.any('SELECT * FROM team')
  .then((pokemonTeam)=>{
    response.send(pokemonTeam)
  })
  .catch((err)=>{
    console.log('err in visiting professor');
    response.send(err);
  })
}

let sendProfessor = function(request, response){
  //console.log('request body: ', request.body)
  const pokedata = request.body;

  let adj = ['Strong', 'Brave', 'Shy', 'Loud', 'Cute', 'Lovely', 'Little', 'Angelic', 'Brute', 'Fast'];
  let noun = ['heart', 'head', 'foot', 'mind', 'claws', 'tail', 'warrior', 'paw', 'hide', 'song', 'stripe', 'frost', 'fang', 'storm', 'stream']

  let adjIndex = Math.floor(Math.random() * Math.floor(adj.length-1));
  let nounIndex = Math.floor(Math.random() * Math.floor(noun.length-1));
  let genName = adj[adjIndex] + '-' + noun[nounIndex];

  db.any(`INSERT INTO team(number, species, name, date, regURL)
  VALUES
  (${pokedata.number}, '${pokedata.species}', '${genName}', '2020-12-17', 'ww.gom')`)
  .then(()=>{
    response.send('you sent a pokemon to the professor....')
  })
  .catch((err)=>{
    console.log("error in uploading to database: ", err)
    response.send(err)})
}

module.exports = {
  db: db,
  test: test,
  generatePokemon: generatePokemon,
  sendProfessor: sendProfessor,
  visitProfessor: visitProfessor
}