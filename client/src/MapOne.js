import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      park: this.props.park,
      name: this.props.name,
      x: this.props.x,
      y: this.props.y
    };
  }

  render() {

    console.log("****THE RESPONSE*****  " + this.props.park)
    console.log("****THE RESPONSE*****  " + this.props.name)
    console.log("****THE RESPONSE*****  " + this.props.x)
    console.log("****THE RESPONSE*****  " + this.props.y)


    const style = {
    width: 400,
    height: 500,
    }

    return (
      <div className="map-frame2" ref="map" style={{width: 400, height: 500}}>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 47.608013,
            lng: -122.335167
          }}
          zoom={10}
          >
          <Marker
            title={this.props.name}
            name={this.props.name}
            position={{lat: this.props.y, lng: this.props.x}}
          />

          </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw"
})(MapContainer);


//// {parkLocation}
//
