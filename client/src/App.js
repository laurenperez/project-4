import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';
import Main from './Main';
import Activity from './Activity';
import UserProfile from './UserProfile';
import MapAll from './MapAll';
import axios from 'axios';
import Park from './Park';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      activity: '',
      park: '',
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
      user: {},
    })
    return <Redirect to ='/'/>
  }

  setActivity = (activity) => {
    localStorage.setItem('activity', activity)
    this.setState({
      activity: activity
    })
  }

  setPark = (pmaid) => {
    localStorage.setItem('park', pmaid)
    this.setState({
      park: pmaid
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
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      authorizedRoutes =
      <div>
        <nav className="top-nav">
          <Link to="/">Home</Link>{'  '}
          <Link to="/user-profile">Activities</Link>{'  '}
        </nav>
        <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
        <Route path="/user-profile" render={() => <UserProfile user={this.state.user} logout={this.logout} setActivity={this.setActivity}/>} />
        <Route path="/activity" render={() => <Activity user={this.state.user} logout={this.logout} activity={this.state.activity} setPark={this.setPark}/>} />
        <Route path="/park" render={() => <Park user={this.state.user} lift={this.liftTokenToState} logout={this.logout} park={this.state.park}/>} />
      </div>
    } else {
      authorizedRoutes =
      <div>
        <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
      </div>
    }
    return (
      <Router>
        {authorizedRoutes}
      </Router>
    );
  }
}

export default App;
