import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
import Logout from './Logout';
import MapAll from './MapAll';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
      redirect: false,
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
            <p>Open:</p>
            <p>{item.hours}</p>
          </div>
        )
      }
    });

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/park'/>
      }

      var name;
      if (this.props.user !== undefined){
        name = this.props.user.name
      } else {
        name = "Guest"
      }

      var logged;
      if (this.props.user !== undefined){
        logged = <RaisedButton className="margin" onClick={this.props.logout}><span>Logout</span></RaisedButton>
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
            <h2><span>{this.state.activity}</span></h2>
          </Col>
          <Col>
            {logged}
          </Col>
        </Row>

        <Row middle="xs">

          <Col xs={12} md={3}>
            <WeatherWidget />
          </Col>

          <Col xs={12} md={5}>
            <span><h2 className="black">Select a park for more info...</h2></span>
            <div className="park-cards-container">
              {parkList}
            </div>
          </Col>

          <Col xs={12} md={4}>
            <span><h2 className="black">Hover for park name</h2></span>
            <MapAll user={this.state.user} lift={this.liftTokenToState} parks={this.state.parks}/>
          </Col>

        </Row>

      </Grid>
    );
  }
}

export default Activity;
