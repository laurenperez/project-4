import React, { Component } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';



class Park extends Component {
	constructor(props) {
		super(props);
		this.state = {
			park: this.props.park,
      thisPark: []
		}
	}

  componentDidMount(){
    //API call to get parks
    var park = this.state.park;

    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?pmaid=" + park
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          thisPark: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    let parkData = this.state.thisPark.map((item, index) => {
      return (
        <div>
          <h3>{item.feature_desc}</h3>
        </div>
      )
    });

    return (
      <div>
      <WeatherWidget />
      <h3>Features Page!</h3>
      {parkData}
      </div>
    )
  }

};


export default Park;

// <h1>{this.state.thisPark[0].name}</h1>
// <h2>{this.state.thisPark[0].hours}</h2>
