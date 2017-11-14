import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,
  } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Activity from './Activity';
import UserProfile from './UserProfile';
import MapAll from './MapAll';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      activity: ''
    }
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user})
  }

  logout = () => {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: {}
    })
  }

  setActivity = (activity) => {
    this.setState({
      activity: activity
    })
  }


  componentDidMount = () => {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      // Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        // Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        // Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }


  render() {
    let authorizedRoutes = '';
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== null) {
      authorizedRoutes =
      <div>
        <nav>
          <Link to="/">Home</Link>{' '}
          <Link to="/user-profile">My Dashboard</Link>{' '}
          <Link to="/map">Map</Link>{' '}
        </nav>
        <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
        <Route exact path="/user-profile" render={() => <UserProfile user={this.state.user} logout={this.logout} setActivity={this.setActivity}/>} />
        <Route exact path="/activity" render={() => <Activity user={this.state.user} logout={this.logout} activity={this.state.activity}/>} />
        <Route exact path="/map" render={() => <MapAll user={this.state.user} lift={this.liftTokenToState}/>} />
      </div>
    } else {
      authorizedRoutes =
      <div>
        <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} /> //not logged in
      </div>
    }
    return (
      <div>
        <Router>
          {authorizedRoutes}
        </Router>
      </div>
    );
  }
}

export default App;
