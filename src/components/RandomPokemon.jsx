import React from 'react';


class RandomPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  generateRandomPokemon () {


  }



  render () {
    let pokemonAppearedStr = 'A wild pokemon appeared!'
    if (this.props && this.props.pokemonName) {
      pokemonAppearedStr = `A wild ${this.props.pokemonName} appeared!`;
    }
    console.log("these are props", this.props)
    return (<div>
      <p>{pokemonAppearedStr}</p>
      <img id='professor' className='photo' src={this.props.pokemonImage || './pikachu.png'} />


    </div>)
  }
}

export default RandomPokemon;