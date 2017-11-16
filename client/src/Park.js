import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WeatherWidget from './WeatherWidget';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MapOne from './MapOne'



class Park extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parkPmaid: localStorage.getItem('park'),
      parkData: [],
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
		// let location = this.state.parkData.map((item, index) => {
    //   return (
    //     item.location.coordinates
    //   )
    // });

    return (

			<Grid fluid>

				<Row className="top-nav">
					<Col xs={12} md={12}>
						<p>Hello, {this.props.user.name}!</p>
						<RaisedButton onClick={this.props.logout}>Logout</RaisedButton>
					</Col>
				</Row>

				<Row around="xs" center="xs">
					<Col>
						<WeatherWidget />
					</Col>
					<Col>
						<div className="park-info">
							<span><h1>{name[0]}</h1></span>
			        <h2>Additional Amenities:</h2>
			        {features}
			      </div>
					</Col>
					<Col>
						<MapOne />
					</Col>
				</Row>

			</Grid>

    )
  }

};


export default Park;

// parkData={this.state.parkData}
