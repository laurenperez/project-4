import React, { Component } from 'react';
import Logout from './Logout';
import UserProfile from './UserProfile';

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  // componentDidMount(){
    //API call goes here
  //   let seattleParks = "http://api.openweathermap.org/data/2.5/weather?zip=98102,us&appid=052f26926ae9784c2d677ca7bc5dec98&units=imperial"
  //   let category
  //   axios(weatherData)
  //   .then(response => response.json())
  //   .then(response => this.setState({
  //     city: response.name,
  //     weatherCondition: response.weather[0].main,
  //     temp: response.main.temp,
  //     wind: response.wind.speed,
  //     lat: response.coord.lat,
  //     lon: response.coord.lon,
  //     humidity: response.main.humidity,
  //     pressure: response.main.pressure,
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
      </div>
    );
  }
}

export default Activity;
