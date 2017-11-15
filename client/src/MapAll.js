import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: this.props.activity,
      parks: this.props.parks
    };
  }
  render() {

    console.log(this.props.parks)

    var parkLocations = this.props.parks.map((item, index) => (
      <Marker
        title={`${item.name}`}
        name={`${item.name}`}
        position={{lat: item.location.coordinates[1], lng: item.location.coordinates[0]}}
      />
    ));


    const style = {
    width: 400,
    height: 400
    }
    return (
      <div ref="map" style={{width: 400, height: 400, border: '1px solid black'}}>
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 47.608013,
          lng: -122.335167
        }}
        zoom={11}
        onClick={this.onMapClicked}
      >

      {parkLocations}



      </Map>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw"
})(MapContainer);


// icon={{
//   url: iconUrl
// }}

// google maps API key : AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw
//
// <Marker onClick={this.onMarkerClick}
//         name={'Current location'} />
//
// <InfoWindow onClose={this.onInfoWindowClose}>
//     <div>
//       <h1>{this.state.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>

//
//
<Marker
  title={'Name of Park'}
  name={'SOMA'}
  position={{lat: 47.608013, lng: -122.335167}}
/>
//
// <Marker
//   title={'Name of Park'}
//   name={'Dolores park'}
//   position={{lat: 47.680304, lng: -122.255084}}
//
// />
