import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WeatherWidget from './WeatherWidget';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MapOne from './MapOne';
import AddFavorite from './AddFavorite';



class Park extends Component {
	constructor(props) {
		super(props);
		this.state = {
      user: this.props.user,
			parkPmaid: localStorage.getItem('park'),
      parkData: [],
			name: '',
			x: '',
			y: '',
      redirect: false
		}
	}

  componentDidMount(){
    //API call to get park data
    var pmaid = this.state.parkPmaid;
    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?pmaid=" + pmaid;
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          redirect: false,
          parkData: response.data,
					name: response.data[0].name,
					x: response.data[0].location.coordinates[0],
					y: response.data[0].location.coordinates[1]
      })
    })
    .catch(error => console.log(error))
  }

  add = () => {
    this.props.addToFavs(this.state.name)
    this.setState({
      redirect: true
    })
  }

  toDash = () => {
    this.setState({
      redirect: true
    })
  }


  render() {

    let features = this.state.parkData.map((item, index) => {
      return (
        <div>
          <h3>{item.feature_desc}</h3>
        </div>
      )
    });

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/user-profile'/>
      }

      var name;
      if (this.props.user !== undefined){
        name = this.props.user.name
      } else {
        name = "Guest"
      }

      var logged;
      if (this.props.user !== undefined){
        logged = <RaisedButton onClick={this.props.logout}><span>Logout</span></RaisedButton>
      } else {
        logged = " "
      }

    return (
			<Grid fluid>

        <Row middle="xs" between="xs" className="top-nav">
          <Col>
            <h2 className="margin">Hello, {name}</h2>
          </Col>
          <Col>
            <h2><span>Park Info</span></h2>
          </Col>
          <Col>
            <RaisedButton onClick={this.toDash}><span>Dashboard</span></RaisedButton>
          </Col>
          <Col>
            {logged}
          </Col>
        </Row>

				<Row around="xs" center="xs">
					<Col>
						<WeatherWidget />
					</Col>
					<Col>
						<div className="park-info">
							<span><h1>{this.state.name}</h1></span>
			        <h2>Park Amenities:</h2>
			        {features}
              <AddFavorite name={this.state.name} user={this.props.user}/>
			      </div>
					</Col>
					<Col>
						<MapOne name={this.state.name} x={this.state.x} y={this.state.y} />
					</Col>
				</Row>
			</Grid>
    )
  }

};


export default Park;



// parkData={this.state.parkData}
