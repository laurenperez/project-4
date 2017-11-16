import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
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
      redirect: false
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
    const style = {
      height: 200,
      width: 200,
      margin: 20,
      textAlign: 'center',
      lineHeight: '200px',
      display: 'inline-block',
    };

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/activity'/>
      }

    return (
      <Grid fluid>
        <Row className="top-nav">
          <Col xs={12} md={12}>
            <p>Hello, {this.props.user.name}!</p>
            <a onClick={this.props.logout}>Logout</a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <WeatherWidget />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Dog Off Leash Area" onClick={(e) => this.handleClickActivity(e, "Dog Off Leash Area")}>Dogs: Off Leash Area</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Hiking Trails" onClick={(e) => this.handleClickActivity(e, "Hiking Trails")}>Hiking Trails</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Paths" onClick={(e) => this.handleClickActivity(e, "Paths")}>Paths</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="View" onClick={(e) => this.handleClickActivity(e, "Views")}>Scenic Views</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Woods" onClick={(e) => this.handleClickActivity(e, "Woods")}>Woods</div>
              </Paper>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Bike Trail" onClick={(e) => this.handleClickActivity(e, "Bike Trail")}>Bike Trails</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Creek" onClick={(e) => this.handleClickActivity(e, "Creek")}>Creeks</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Disc Golf" onClick={(e) => this.handleClickActivity(e, "Disc Golf")}>Disc Golf</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Fire Pit" onClick={(e) => this.handleClickActivity(e, "Fire Pit")}>Outdoor Fire Pits</div>
              </Paper>
              <Paper style={style} zDepth={3} circle={true}>
                <div className="paper-bubbles" value="Guarded Beach" onClick={(e) => this.handleClickActivity(e, "Guarded Beach")}>Swimming Beaches</div>
              </Paper>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default UserProfile;













// end
