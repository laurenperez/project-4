import React, { Component } from 'react';
import { BrowserRouter as Link, Redirect
  } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';
import Paper from 'material-ui/Paper';




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
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <hr/>
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
        <div className="paper-bubbles" value="View" onClick={(e) => this.handleClickActivity(e, "Views")}>View</div>
        </Paper>
        <Paper style={style} zDepth={3} circle={true}>
        <div className="paper-bubbles" value="Woods" onClick={(e) => this.handleClickActivity(e, "Woods")}>Woods</div>
        </Paper>
        <WeatherWidget />
      </div>
    );
  }
}

export default UserProfile;
