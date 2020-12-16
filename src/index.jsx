import React from 'react';
import ReactDOM from 'react-dom';

import Professor from './components/Professor.jsx';
import Encounter from './components/Encounter.jsx';

//const stor = require("../dist/bugPokemon.json");
// import storage from '../main.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    }
    this.setGender = this.setGender.bind(this);
  }

  componentDidMount() {
  }

  setGender(boyOrGirl) {
    this.setState({gender: boyOrGirl})
  }



  render() {
    if (this.state.gender.length === 0) {
      return ( <div>
        <p>Welcome to the wonderful world of Pokemon!</p>
         <Professor setGender={this.setGender}/>

       </div>)
    }
    else {
      return (<div>
        <h1>Oh! You are a {this.state.gender}!</h1>
       <Encounter />
     </div>)
    }

  }
}

ReactDOM.render(<App />, document.getElementById('app'));
