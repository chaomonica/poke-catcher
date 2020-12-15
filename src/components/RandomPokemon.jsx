import React from 'react';


class RandomPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  generateRandomPokemon () {


  }



  render () {
    return (<div>
      <p>it's a pokemon!</p>
      <img id='professor' src={'./pikachu.png'} />


    </div>)
  }
}

export default RandomPokemon;