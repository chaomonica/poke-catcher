import React from 'react';


class Professor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trainerGender: ""
    }
  this.handleGenderSelection = this.handleGenderSelection.bind(this);
  }

 handleGenderSelection(e) {
   alert(`Oh silly me, you are a ${e.target.value}!`)
   this.props.setGender(e.target.value)
 }

  render () {
    console.log(this.props)
    return (<div>
      <img id='professor' className='professor' src={'./professorBirch.jpg'} />
      <br></br>
      <br></br>
      <button onClick={this.handleGenderSelection} value="boy">Boy</button>
      <button onClick={this.handleGenderSelection} value="girl">Girl</button>
    </div>)
  }

}

export default Professor;
