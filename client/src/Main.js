import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Signup from './Signup';
import Login from './Login';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
      redirect: false
		}
	}

  exploreSite = () => {
    this.setState({
      redirect: true
    })
  }

  render() {

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/user-profile'/>
      }

    return (
      <Grid fluid>
        <Row className="home-page" around="xs" middle="xs">
          <Col>
            <div className="welcome">
              <div className='nav-buttons'>
                <Signup lift={this.props.lift} />
              </div>
              <div className='nav-buttons'>
                <Login lift={this.props.lift} />
              </div>
              <h2> Welcome to <span className="logo">Unplug Seattle</span></h2>
              <h4>You can explore the site without creating an account.</h4>
              <h4>If you want to save your favorites, sign up!</h4>
              <RaisedButton onClick={this.exploreSite}><span>TEST DRIVE</span></RaisedButton>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

};


export default Main;
