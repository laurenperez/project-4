import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect
  } from 'react-router-dom';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



class AddFavorite extends Component {
	constructor(props) {
		super(props);
		this.state = {
      user: this.props.user,
      name: this.props.name,
      redirect: false
		}
	}


  addItem = (e) => {
    console.log("This is working")
    console.log(this.props.name)
    e.preventDefault();
    axios.post('/users/favorite', {
      user: this.props.user,
      name: this.props.name,
    }).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    })
    this.setState({
      redirect: true
    })
  }

 //Jenna's example for reference
 tileClick = (index) =>{
       let newSrc = this.state.unsplash[index]
       axios.post('/image/new', {
         user: this.props.user,
         src: newSrc
       }).then(result => {
       this.setState({
         src: newSrc,
         slideIndex: 1
       })
     })
   }

  render() {

    const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/user-profile'/>
      }

    return (
      <FlatButton
        label="favorite"
        primary={true}
        keyboardFocused={true}
        onClick={(e) => this.addItem(e)}
      />
    )
  }

};


export default AddFavorite;


//
// let favoritesArray = result.data.favoritesArray
// this.props.liftFavorites(favoritesArray);
