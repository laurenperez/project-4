import React, { Component } from 'react';
import Logout from './Logout';
import MapAll from './MapAll';
import axios from 'axios';

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: this.props.activity,
      parks: [],
    };
  }

  componentDidMount(){
    //API call to get parks
    var activity = this.state.activity;
    if (activity.indexOf(' ') >= 0){
      let temp = this.state.activity;
      activity = temp.replace(" ", "%20");
    };

    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?feature_desc=" + activity;
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          parks: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render() {
      let parkList = this.state.parks.map((item, index) => (
        <div>
          <h3>{item.name}</h3>
          <h3>{item.hours}</h3>
        </div>
      ))
      //get locations

    return (
      <div>
        <MapAll user={this.state.user} lift={this.liftTokenToState} parks={this.state.parks}/>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <h1>Here are all the places you can do this Activity!</h1>
        {parkList}
      </div>
    );
  }
}

export default Activity;


// if(hours.charAt(1) !== "<"){
