import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import rain from './img/rain.jpg'

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
    const style = {
      height: 500,
      width: 400,
      textAlign: 'center',
      backgroundColor:'white'
    };

    return (
      <div className="weather-widget">
        <Card style={style}>
          <CardHeader>
            <h3>Current Weather for {this.state.city} </h3>
          </CardHeader>
          <CardMedia
            overlay={
              <div>
                <h1>Current Weather for {this.state.city} </h1>
                <h1>{this.state.temp} F</h1>
              </div>
            }
            >
            <img className="weather-photo" src={rain} alt="Weather-Image" />
          </CardMedia>
          <CardTitle title="Current Conditions" subtitle="Be prapared before you play" />
          <CardText>
            <h3>High of {this.state.high} and a Low of {this.state.low}</h3>
            <h1>{this.state.weatherCondition}</h1>
            <h3>Wind speeds {this.state.wind} mph.</h3>
            <h3>Humidity {this.state.humidity}%</h3>
          </CardText>
        </Card>
      </div>
    );
  }
}


export default WeatherWidget;
