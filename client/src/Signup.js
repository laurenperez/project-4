import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Col, Row } from 'react-flexbox-grid';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      open: false,
      redirect: false
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      console.log(result)
      localStorage.setItem('mernToken', result.data.token);
      this.props.lift(result.data);
      this.handleClose();
    }).catch(error => {
      console.log(error)
    })
    this.setState({
      redirect: true
    })
  }

  clearAlert = () => {
    this.setState({showAlert: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
      name: '',
      email: '',
      password: '',
    });
  };

  render() {

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/user-profile'/>
      }

    const buttonStyle = {
      margin: '.25em',
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
        style={{margin: '.25em'}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={false}
        onClick={this.handleSubmit}
        style={{margin: '.25em'}}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Signup" onClick={this.handleOpen} primary={this.props.primary}/>
        <Dialog
          title="Signup"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='modal-content' >

            <Row>
              <TextField
               hintText="Name"
               floatingLabelText="What is your first name?"
               value={this.state.name}
               onChange={this.handleNameChange}
              />
            </Row>
            <Row>
              <TextField
               hintText="Email"
               floatingLabelText="What is your email?"
               value={this.state.email}
               onChange={this.handleEmailChange}
              />
            </Row>
            <Row>
              <TextField
               hintText="Password"
               floatingLabelText="Choose a password"
               type="password"
               value={this.state.password}
               onChange={this.handlePasswordChange}
              />
            </Row>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Signup;
