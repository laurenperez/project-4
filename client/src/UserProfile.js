import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
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
    };
  }

  handleClickActivity = (e, string) => {
    e.preventDefault();
    this.props.setActivity(string);
    this.setState({
      redirect: true
    })
  }

  render() {

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/activity'/>
      }

    return (
      <Grid fluid>
        <Row className="top-nav">
          <Col xs={12} md={12}>
            <p>Hello, {this.props.user.name}!</p>
            <RaisedButton onClick={this.props.logout}>Logout</RaisedButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <WeatherWidget />
          </Col>
        </Row>
        <Row  center="xs">
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
        <Row  center="xs">
          <Col>
            <div className="paper-bubbles" value="Bike Trail" onClick={(e) => this.handleClickActivity(e, "Bike Trail")}>Bike Trails</div>
          </Col>
          <Col>
            <div className="paper-bubbles" value="Dog Off Leash Area" onClick={(e) => this.handleClickActivity(e, "Dog Off Leash Area")}>Dogs: Off Leash Area</div>
          </Col>
          <Col>
            <div className="paper-bubbles" value="Guarded Beach" onClick={(e) => this.handleClickActivity(e, "Guarded Beach")}>Swimming Beaches</div>
          </Col>
          <Col>
            <div className="paper-bubbles" value="View" onClick={(e) => this.handleClickActivity(e, "View")}>Scenic Views</div>
          </Col>
        </Row>
        <Row  center="xs">
          <Col>
            <div className="paper-bubbles" value="Fire Pit" onClick={(e) => this.handleClickActivity(e, "Fire Pit")}>Outdoor Fire Pits</div>
          </Col>
          <Col>
            <div className="paper-bubbles" value="Disc Golf" onClick={(e) => this.handleClickActivity(e, "Disc Golf")}>Disc Golf</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default UserProfile;













// end
