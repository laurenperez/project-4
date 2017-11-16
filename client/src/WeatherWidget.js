import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import rain from './img/rain.jpg'
import Paper from 'material-ui/Paper';
import './App.css';


class WeatherWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      weatherCondition: '',
      temp: '',
      wind: '',
      humidity: '',
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
      })
    })
    .catch(error => console.log(error))
  }


  render() {

    return (

      <div className="weather-widget">
        <h2>Current Weather {this.state.city} </h2>
        <h1>{this.state.temp} F</h1>
        <img className="weather-photo" src={rain} alt="Weather-Image" />
        <p>High of {this.state.high} and a Low of {this.state.low}</p>
        <h2>Now: {this.state.weatherCondition}</h2>
        <p>Wind speeds {this.state.wind} mph.</p>
        <p>Humidity {this.state.humidity}%</p>
      </div>

    );
  }
}


export default WeatherWidget;
