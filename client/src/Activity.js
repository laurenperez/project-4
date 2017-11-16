import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
import Logout from './Logout';
import MapAll from './MapAll';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';


class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: localStorage.getItem('activity'),
      parks: [],
      redirect: false
    };
  }

  componentDidMount(){
    //API call to get parks
    var activity = this.state.activity;
    if (activity.indexOf(' ') >= 0){
      let temp = this.state.activity;
      activity = temp.replace(" ", "%20");
    };

    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?feature_desc=" + activity;
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          parks: response.data
      })
    })
    .catch(error => console.log(error))
  }

  handleClickActivity = (e, name) => {
    e.preventDefault();
    this.props.setPark(name);
    this.setState({
      redirect: true
    })
  }

  render() {
    let parkList = this.state.parks.map((item, index) => {
      if (item.hours.indexOf('<') < 0){
        return (

            <div className="park-cards">
              <h3 className="park-name" onClick={(e) => this.handleClickActivity(e, item.pmaid)}>{item.name}</h3>
              <h3>Open:</h3>
              <p>{item.hours}</p>
            </div>

        )
      }
    });

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/park'/>
      }

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <h1>This is the main Feature/Activity Page</h1>
            <h3>Hello, {this.props.user.name}!</h3>
            <a onClick={this.props.logout}>Logout</a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <WeatherWidget />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <span><h1>Find {this.state.activity} near you...</h1></span>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="park-cards-container">
              {parkList}
            </div>
          </Col>
          <Col xs={6} md={6}>
            <MapAll user={this.state.user} lift={this.liftTokenToState} parks={this.state.parks}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Activity;
