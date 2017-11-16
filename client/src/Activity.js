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
          <div>
            <Paper style={style} zDepth={2}>
              <button onClick={(e) => this.handleClickActivity(e, item.pmaid)}>{item.name}</button>
              <h3>{item.hours}</h3>
            </Paper>
          </div>
        )
      }
    });

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/park'/>
      }

      const style = {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      };

    return (
      <div>
          <h1>This is the main Feature/Activity Page</h1>
          <h3>Hello, {this.props.user.name}!</h3>
          <a onClick={this.props.logout}>Logout</a>
          <WeatherWidget />
          <hr/>
          <h1>All of these parks have:  {this.state.activity}</h1>
          {parkList}
          <MapAll user={this.state.user} lift={this.liftTokenToState} parks={this.state.parks}/>
      </div>
    );
  }
}

export default Activity;
