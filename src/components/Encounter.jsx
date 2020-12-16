import React from 'react';
import axios from 'axios';

class Encounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: "",
      catchRange: [0, 10],
      fleeRange: [0, 10],
      caught: 1,
      fled: 0,
      attempts:0
    }

    this.randomInt = this.randomInt.bind(this);
    this.generateRandomPokemon = this.generateRandomPokemon.bind(this);
    this.handleCatch = this.handleCatch.bind(this);
    this.handleFeed = this.handleFeed.bind(this);
    this.handleThrowRock = this.handleThrowRock.bind(this);
  }

  randomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateRandomPokemon () {
    let pokemonNumber = this.randomInt(9);
    let baseURL = process.env.baseURL || 'http://localhost:3062/encounter';
    console.log('this is baseURL: ', baseURL)

    axios.get(baseURL, {params: {number: pokemonNumber}})
    .then((data)=>{console.log("this is received: ", data)})



    this.setState({pokemon: "pikachu"}, ()=>{

      let catchRangeMax = this.state.catchRange[1];
      let fleeRangeMax = this.state.fleeRange[1]

      this.setState({caught: this.randomInt(catchRangeMax), fled: this.randomInt(fleeRangeMax)})

    })

  }

  handleCatch() {
    console.log("You threw a ball")
    let thrownBall = this.randomInt(this.state.catchRange[1]);
    console.log('thrown ball is; ', thrownBall)
    if (this.state.caught === thrownBall) {
      console.log("CAUGHT!")
    }
    else {console.log("you missed")}

    let currAttempts = this.state.attempts + 1;
    this.setState({attempts: currAttempts})
  }

  handleFeed() {
    console.log("You fed the pokemon")

    let currCatchRange = this.state.catchRange[1] + 50;
    let currFleeRange = this.state.fleeRange[1] + 50;

    this.setState({
      catchRange: [0, currCatchRange],
      fleeRange: [0, currFleeRange],
    })
  }

  handleThrowRock () {
    console.log('rock')
  }

  render () {
    if (this.state.pokemon.length===0) {
    return (<div>
      <p>If you are ready to go exploring, click the button below</p>

      <button onClick={this.generateRandomPokemon}>venture into the woods</button>
      <br></br>


    </div>)
    }
    else {
      return (<div>
        <img id='professor' src={'./pikachu.png'} />
        <br></br>
        <button onClick={this.handleCatch}>throw ball</button>
        <button onClick={this.handleFeed}>feed</button>
        <button onClick={this.handleThrowRock}>throw rock</button>
      </div>)
    }

  }
}

export default Encounter;