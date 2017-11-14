import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// redirect: false,
		}
	}

  render() {
    return (
      <div>

        <div className='SignupBox'>
          <Signup lift={this.props.lift} />
        </div>

        <div className='LoginBox'>
          <Login lift={this.props.lift} />
        </div>

      </div>
    )
  }

};


export default Main;
