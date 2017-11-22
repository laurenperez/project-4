import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import rain from './img/rain.jpg'
import sunny from './img/sunny.jpg'
import cloudy from './img/cloudy.jpg'
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
    var pic = ''
    if(this.state.weatherCondition === "Rain"){
      pic = <img className="weather-photo" src={rain} alt="Weather-Image" />
    } else if (this.state.weatherCondition === "Clear"){
      pic = <img className="weather-photo" src={sunny} alt="Weather-Image" />
    } else if (this.state.weatherCondition === "Sunny"){
      pic = <img className="weather-photo" src={sunny} alt="Weather-Image" />
    }  else if (this.state.weatherCondition === "Cloudy"){
      pic = <img className="weather-photo" src={cloudy} alt="Weather-Image" />
    } else if (this.state.weatherCondition === "Mist"){
      pic = <img className="weather-photo" src={rain} alt="Weather-Image" />
    } else {
      pic = <img className="weather-photo" src={rain} alt="Weather-Image" />
    }

    return (

      <div className="weather-widget">
        <h2><span>Current Weather {this.state.city} </span></h2>
        <h1>{this.state.temp} F</h1>
        {pic}
        <p><span>High of {this.state.high} and a Low of {this.state.low}</span></p>
        <h2><span>Now: {this.state.weatherCondition}</span></h2>
        <p><span>Wind speeds {this.state.wind} mph.</span></p>
        <p><span>Humidity {this.state.humidity}%</span></p>
      </div>

    );
  }
}


export default WeatherWidget;



//response.data.weather[0].main,
