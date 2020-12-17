import React from 'react';
import ReactDOM from 'react-dom';

import Professor from './components/Professor.jsx';
import Encounter from './components/Encounter.jsx';

import './components/style.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    }
    this.setGender = this.setGender.bind(this);
  }

  componentDidMount() {
    console.warn(process.env.API_URL)
  }

  setGender(boyOrGirl) {
    this.setState({gender: boyOrGirl})
  }



  render() {
    if (this.state.gender.length === 0) {
      return ( <div>
        <p>Hi! Sorry to keep you waiting! Welcome to the world of Pokemon!{"\n"}My name is Birch. But everyone calls me the Pokemon Professor...{"\n"}and you are?</p>
         <Professor setGender={this.setGender}/>
       </div>)
    } else {
      return (<div>
       <Encounter gender={this.state.gender}/>
     </div>)
    }
  }
}
ReactDOM.render(<App />, document.getElementById('app'));