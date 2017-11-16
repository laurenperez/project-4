import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

  render() {

    return (
      <Grid fluid>
				<Row around="xs" end="xs">
					<Col>
		        <div className='nav-buttons'>
		          <Signup lift={this.props.lift} />
		        </div>
		        <div className='nav-buttons'>
		          <Login lift={this.props.lift} />
		        </div>
					</Col>
				</Row>
      </Grid>
    )
  }

};


export default Main;
