import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { Row, Col, Grid } from 'react-flexbox-grid';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      open: false,
      loading: false,
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange= (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.props.lift(result.data);
      this.handleClose();
    }).catch((error) => {
      console.log(error);
    });
  }

  clearAlert = () => {
    this.setState({showAlert: false,});
  }

  handleClose = () => {
    this.setState({
      open: false,
      email: '',
      password: ''
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  render() {
    /**
    * Dialog with action buttons. The actions are passed in as an array of React objects,
    * in this example [FlatButtons](/#/components/flat-button).
    *
    * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
    */
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{margin: '.25em'}}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Login"
        primary={true}
        style={{margin: '.25em'}}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='modal-content'>
            <Row>
              <TextField
                hintText="Email"
                floatingLabelText="Enter your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Row>
            <Row>
              <TextField
                hintText="Password"
                floatingLabelText="Enter your password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Row>
            <Row>
            </Row>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Login;
