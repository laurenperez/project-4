import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      park: this.props.park,
      parkData: '',
      x: this.props.x,
      y: this.props.y,
      name: this.props.name
    };
  }

  componentDidMount(){
    //API call to get park data
    var pmaid = this.state.park;
    let seattleParks = "https://data.seattle.gov/resource/ye65-jqxk.json?pmaid=" + pmaid
    axios.get(seattleParks)
      .then(response => {
        this.setState({
          parkData: response.data
      })
    })
    .catch(error => console.log(error))
  }


  render() {

    console.log(this.state.parkData[0]);
    //this is as far in as you can go

    const style = {
    width: 400,
    height: 500,
    }

    return (
      <div className="map-frame" ref="map" style={{width: 400, height: 500}}>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 47.608013,
            lng: -122.335167
          }}
          zoom={12}
        >


        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw"
})(MapContainer);


// <Marker
//   title={this.state.name}
//   name={this.state.name}
//   position={{lat: this.state.y, lng: this.state.x}}
// />
