import React, { Component } from 'react';
import axios from 'axios';


class WeatherWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      weatherCondition: '',
      temp: '',
      wind: '',
      humidity: '',
      pressure: '',
      high: '',
      low: ''
    }
  }

  componentDidMount(){
    //API call goes here
    let weatherData = "http://api.openweathermap.org/data/2.5/weather?zip=98102,us&appid=052f26926ae9784c2d677ca7bc5dec98&units=imperial"
    axios.get(weatherData)
      .then(response => {
        this.setState({
          city: response.data.name,
          weatherCondition: response.data.weather[0].main,
          temp: response.data.main.temp,
          high: response.data.main.temp_max,
          low: response.data.main.temp_min,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
      })
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
      <div className="weather-widget">
        <h3>Current Weather for {this.state.city} </h3>
        <h1>{this.state.temp} degrees F</h1>
        <h5>Expected high of {this.state.high} and a low of {this.state.low}</h5>
        <h4>Expect {this.state.weatherCondition}</h4>
        <h4>Wind speed {this.state.wind} mph.</h4>
        <h4>Humidity {this.state.humidity}% | Pressure {this.state.pressure} hPa</h4>
      </div>
    );
  }
}


export default WeatherWidget;
