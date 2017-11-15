import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
import Logout from './Logout';
import MapAll from './MapAll';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';




class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: this.props.activity,
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
    console.log("in handle click");
    console.log(name);
    e.preventDefault();
    this.props.setPark(name);
    this.setState({
      redirect: true
    })
  }
  jenna = () =>{
    console.log("fuck react this works")
  }

  render() {
    let parkList = this.state.parks.map((item, index) => {
      if (item.hours.indexOf('<') < 0){
        return (
          <div>
            <button onClick={(e) => this.handleClickActivity(e, item.pmaid)}>{item.name}</button>
            <h3>{item.hours}</h3>
          </div>
        )
      }
    });
    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/park'/>
      }

    return (
      <div>
          <h1>This is the main Feature/Activity Page</h1>
          <h3>Hello, {this.props.user.name}!</h3>
          <a onClick={this.props.logout}>Logout</a>
          <WeatherWidget />
          <hr/>
          <button onClick={this.jenna}> fuck react </button>
          <h1>All of these parks have:  {this.state.activity}</h1>
          {parkList}
          <MapAll user={this.state.user} lift={this.liftTokenToState} parks={this.state.parks}/>
      </div>
    );
  }
}

export default Activity;
