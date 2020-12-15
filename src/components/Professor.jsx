import React from 'react';


//import storage from '../../main.js'
const fs = require('fs');


class Professor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trainerGender: ""
    }
  this.handleGenderSelection = this.handleGenderSelection.bind(this);
  }

 handleGenderSelection(e) {
   console.log(e.target.value)
   this.props.setGender(e.target.value)
 }

  render () {
    console.log(this.props)
    return (<div>Welcome
      <img id='professor' src={'./professorBirch.jpg'} />
      <p>Are you a boy or a girl?</p>
      <button onClick={this.handleGenderSelection} value="boy">Boy</button>
      <button onClick={this.handleGenderSelection} value="girl">Girl</button>
    </div>)
  }

}

export default Professor;
