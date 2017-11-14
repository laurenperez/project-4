import React, { Component } from 'react';
import Logout from './Logout';
import UserProfile from './UserProfile';

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: this.props.activity
    };
  }

  // componentDidMount(){
  //   //API call goes here
  //   let activity = "";
  //   let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?feature_desc=" + activity
  //
  //   axios(weatherData)
  //     .then(response => response.json())
  //     .then(response => this.setState({
  //     city: response.name,
  //     lat: response.coord.lat,
  //     lon: response.coord.lon,
  //     high: response.main.temp_max,
  //     low: response.main.temp_min,
  //   }))
  //   .catch(ex => console.log("We got an error!"))
  // }

  render() {
    return (
      <div>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <h1>This is an activity!</h1>
        <h2>{this.state.activity}</h2>
      </div>
    );
  }
}

export default Activity;
