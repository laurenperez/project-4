import React, { Component } from 'react';
import Logout from './Logout';
import Activity from './Activity';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <ul>
          <li> <a href="/activity">Dogs: Off Leash Areas</a></li>
          <li> <a href="/activity">Hiking Trails</a></li>
          <li> <a href="/activity">Walking Paths</a></li>
          <li> <a href="/activity">Scenic Woods</a></li>
          <li> <a href="/activity">Seattle Views</a></li>
        </ul>
      </div>
    );
  }
}

export default UserProfile;
