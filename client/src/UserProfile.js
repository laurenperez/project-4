import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
  import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import WeatherWidget from './WeatherWidget';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import './App.css';



class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: '',
      redirect: false,
      favoritesArray: this.props.favoritesArray
    };
  }

  handleClickActivity = (e, string) => {
    e.preventDefault();
    this.props.setActivity(string);
    this.setState({
      redirect: true
    })
  }

  componentDidMount = () => {
    axios.post('/users/favoriteList', {
      user: this.props.user
    }).then(result =>{
      this.setState({
        favoritesArray:result.data.favorites,
      })
    })
  }


  render() {
    var favorites;
    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/activity'/>
      }

      var favorites;
      if (this.state.favoritesArray !== undefined){
        favorites = this.state.favoritesArray.map((item, index) => {
          return (
            <h3>{item}</h3>
          )
        });
      } else {
        favorites = <h3>Your favorites here...</h3>
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
            <h2 className="margin">Hello, <span>{name}</span></h2>
          </Col>
          <Col>
            <h1><span>Unplug Seattle</span></h1>
          </Col>
          <Col>
            {logged}
          </Col>
        </Row>

        <Row middle="xs" between="xs">

          <Col>
            <WeatherWidget />
          </Col>

          <Col>
          <h2 className="black"><span>Choose your next adventure...</span></h2>
            <Row>
              <Col>
                <div className="paper-bubbles" value="Hiking Trails" onClick={(e) => this.handleClickActivity(e, "Hiking Trails")}>Hiking Trails</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Paths" onClick={(e) => this.handleClickActivity(e, "Paths")}>Walking Paths</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Woods" onClick={(e) => this.handleClickActivity(e, "Woods")}>Woods</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Creek" onClick={(e) => this.handleClickActivity(e, "Creek")}>Creeks</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="paper-bubbles" value="Bike Trail" onClick={(e) => this.handleClickActivity(e, "Bike Trail")}>Bike Trails</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Dog Off Leash Area" onClick={(e) => this.handleClickActivity(e, "Dog Off Leash Area")}>Dog Off Leash Area</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Guarded Beach" onClick={(e) => this.handleClickActivity(e, "Guarded Beach")}>Swimming Beaches</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="View" onClick={(e) => this.handleClickActivity(e, "View")}>Scenic Views</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="paper-bubbles" value="Fire Pit" onClick={(e) => this.handleClickActivity(e, "Fire Pit")}>Outdoor Fire Pits</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Disc Golf" onClick={(e) => this.handleClickActivity(e, "Disc Golf")}>Disc Golf</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Picnic Sites" onClick={(e) => this.handleClickActivity(e, "Picnic Sites")}>Picnic Sites</div>
              </Col>
              <Col>
                <div className="paper-bubbles" value="Play Area" onClick={(e) => this.handleClickActivity(e, "Play Area")}>Childrens Play Areas</div>
              </Col>
            </Row>
          </Col>

          <Col>
            <div className="favs-container">
              <h2><span>My Favorite Parks</span></h2>
              {favorites}
            </div>
          </Col>

        </Row>
      </Grid>
    );
  }
}

export default UserProfile;
