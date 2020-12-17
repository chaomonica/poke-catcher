import React from 'react';
import axios from 'axios';

import RandomPokemon from './RandomPokemon.jsx';
import Example from './Modal.jsx'



class Encounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      pokemon: "",
      catchRange: [0, 10],
      fleeRange: [0, 10],
      url:"",
      caught: 1,
      fled: 0,
      attempts:0,
      isLoading: true
    }

    this.randomInt = this.randomInt.bind(this);
    this.generateRandomPokemon = this.generateRandomPokemon.bind(this);
    this.handleCatch = this.handleCatch.bind(this);
    this.handleFeed = this.handleFeed.bind(this);
    this.handleThrowRock = this.handleThrowRock.bind(this);
    this.handleRunAway = this.handleRunAway.bind(this);
    this.handleVisitProfessor = this.handleVisitProfessor.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    axios.get('/visitProfessor')
    .then((teamFromDatabase)=>{
      let arr = ["You've caught "];

      for (var i = 0; i < teamFromDatabase.data.length; i++) {

        arr.push(`${teamFromDatabase.data[i].name} a ${teamFromDatabase.data[i].species} on ${teamFromDatabase.data[i].date}, `)
      }

      let final = arr.join(" ");

     this.setState({caughtPokemon: final})
    })
  }

  randomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateRandomPokemon () {
    let pokemonNumber = this.randomInt(9) + 1;
    let baseURL = process.env.baseURL || `http://localhost:3455/encounter`;

    axios.get(baseURL, {params: {number: pokemonNumber}})
    .then((singlePokemon)=>{
      let pokemonStats = singlePokemon.data[0];

      this.setState({
        number: pokemonNumber,
        pokemon: pokemonStats.name,
        catchRange: [0, pokemonStats.catchmax],
        fleeRange: [0, pokemonStats.fleemax],
        url: pokemonStats.regurl,
        caught: 1,
        fled: 0,
        attempts:0,
        isLoading: false,
        message:""
      })
    })
    .catch((err)=>{console.log('Axios request error in Encounter jsx: ', err)})


  }

  handleCatch() {
    console.log("You threw a ball")
    let thrownBall = this.randomInt(this.state.catchRange[1]);
    console.log('thrown ball is; ', thrownBall)
    if (this.state.caught === thrownBall || thrownBall===2 || thrownBall === 3 || thrownBall === 7) {

      axios.post('./sendProfessor', {
        number: this.state.number,
        species: this.state.pokemon,
        name: "bob",
        date: new Date().toLocaleString(),
        regURL: this.state.url
      })
      .then(()=>{

        this.setState({
          pokemon: "",
          message: "Congratulations, you caught a pokemon!"}, ()=>{
            alert('caught!');
          })

      })
    }
    else {console.log("you missed")}

    let currAttempts = this.state.attempts + 1;

    if (currAttempts < 5) {
      this.setState({
        attempts: currAttempts,
        message: "unfortunately you missed..."})
    } else {
      this.setState({pokemon:""}, ()=>{
        alert('The pokemon fled...')
      })
    }

  }

  handleFeed() {
    console.log("You fed the pokemon")

    let currCatchRange = this.state.catchRange[1] * 1.5;
    let currFleeRange = this.state.fleeRange[1]  * 1.5;
    let fatPokemon = this.state.pokemon;

    if (currCatchRange > 30) {
      this.setState({pokemon:""}, ()=>{
        alert(`${fatPokemon} can't fit in the pokeball anymore. Better leave before it decides to eat you too...`)
      })
    } else {
      this.setState({
        message: `${fatPokemon} is getting chunky...`,
        catchRange: [0, currCatchRange],
        fleeRange: [0, currFleeRange],
      })
    }

  }

  handleThrowRock () {
    console.log('You threw a rock!')

    let currCatchRange = this.state.catchRange[1] / 2;
    let currFleeRange = this.state.fleeRange[1] / 2;
    let angryPokemon = this.state.pokemon;

    if (currFleeRange <= 1) {
      this.setState({pokemon:""}, ()=>{
        alert('The pokemon fled...')
      })
    } else {
      this.setState({
        message: `${angryPokemon} is getting angry...`,
        catchRange: [0, currCatchRange],
        fleeRange: [0, currFleeRange],
      })
    }
  }

  handleRunAway () {
    alert('You successfully got away...')
    this.setState({pokemon:""})
  }

  handleVisitProfessor() {
    axios.get('/visitProfessor')
    .then((teamFromDatabase)=>{
      let arr = ["You've caught "];

      for (var i = 0; i < teamFromDatabase.data.length; i++) {
        arr.push(`${teamFromDatabase.data[i].name} a ${teamFromDatabase.data[i].species} on ${teamFromDatabase.data[i].date}, `)
      }

      let final = arr.join(" ");

      this.setState({caughtPokemon: final})

    })
  }

  test() {
    console.log('test')
  }

  render () {


    if (this.state.pokemon.length===0) {
    return (
      <div className='forest'>
        <h1>Wild pokemon can appear anytime in tall grass...</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p className="overlay">If you are ready to go exploring, click the button below</p>
        <button onClick={this.generateRandomPokemon}>venture into the woods</button>
        <br></br>
        <br></br>

        <button onClick={this.handleVisitProfessor}>Send to Pokebox</button>
        <br></br>

        <Example caughtPokemon={this.state.caughtPokemon}/>



        <br />


      </div>)
    } else {
    let message = <p>{this.state.message}</p>
      return (<div>
        <RandomPokemon pokemonImage={this.state.url} pokemonName={this.state.pokemon}/>
        <button onClick={this.handleCatch}>throw ball</button>
        <button onClick={this.handleFeed}>feed</button>
        <button onClick={this.handleThrowRock}>throw rock</button>
        <br></br>
        {message}
        <br></br>
        <button onClick={this.handleRunAway}>run away</button>
      </div>)
    }

  }
}

export default Encounter;