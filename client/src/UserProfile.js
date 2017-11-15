import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect
  } from 'react-router-dom';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: '',
      redirect: false
    };
  }

  handleClickActivity = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.props.setActivity(e.target.value);
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
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <hr/>
        <button value="Dog Off Leash Area" onClick={(e) => this.handleClickActivity(e)}>Dogs: Off Leash Area</button>
        <button value="Hiking Trails" onClick={(e) => this.handleClickActivity(e)}>Hiking Trails</button>
        <button value="Paths" onClick={(e) => this.handleClickActivity(e)}>Paths</button>
        <button value="View" onClick={(e) => this.handleClickActivity(e)}>View</button>
        <button value="Woods" onClick={(e) => this.handleClickActivity(e)}>Woods</button>
      </div>
    );
  }
}

export default UserProfile;
