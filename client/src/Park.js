import React, { Component } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';
import MapOne from './MapOne'



class Park extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parkPmaid: localStorage.getItem('park'),
      parkData: []
		}
	}

  componentDidMount(){
    //API call to get park data
    var pmaid = this.state.parkPmaid;
    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?pmaid=" + pmaid;
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          parkData: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    let features = this.state.parkData.map((item, index) => {
      return (
        <div>
          <h3>{item.feature_desc}</h3>
        </div>
      )
    });
		let name = this.state.parkData.map((item, index) => {
      return (
        item.name
      )
    });
		let location = this.state.parkData.map((item, index) => {
      return (
        item.location.coordinates
      )
    });

    return (
      <div>
        <WeatherWidget />
        <h3>Hello, {this.props.user.name}!</h3>
        <a onClick={this.props.logout}>Logout</a>

				<h1>{name[0]}</h1>
        <h3>Features Page!</h3>
        {features}

        <MapOne />
      </div>
    )
  }

};


export default Park;

// parkData={this.state.parkData}
