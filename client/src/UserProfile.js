import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';




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
    console.log("im in user profile button click")
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
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <hr/>
        <button value="Dog Off Leash Area" onClick={(e) => this.handleClickActivity(e, "Dog Off Leash Area")}>Dogs: Off Leash Area</button>
        <button value="Hiking Trails" onClick={(e) => this.handleClickActivity(e, "Hiking Trails")}>Hiking Trails</button>
        <button value="Paths" onClick={(e) => this.handleClickActivity(e, "Paths")}>Paths</button>
        <button value="View" onClick={(e) => this.handleClickActivity(e, "Views")}>View</button>
        <button value="Woods" onClick={(e) => this.handleClickActivity(e, "Woods")}>Woods</button>
        <WeatherWidget />
      </div>
    );
  }
}

export default UserProfile;
