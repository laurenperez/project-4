import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      activity: this.props.activity,
      parks: this.props.parks,
    };
  }


  render() {
    console.log(this.props.parks)
    var parkLocations = this.props.parks.map((item, index) => {
      if (item.location !== undefined){
        return (
        <Marker
          title={`${item.name}`}
          name={`${item.name}`}
          position={{lat: item.location.coordinates[1], lng: item.location.coordinates[0]}}
        />
        )
      }
    });


    const style = {
    width: 400,
    height: 500,
    }
    return (
      <div className="map-frame">
        <div ref="map" style={{width: 400, height: 500}}>
          <Map
            google={this.props.google}
            style={style}
            initialCenter={{
              lat: 47.608013,
              lng: -122.335167
            }}
            zoom={11}
          >

          {parkLocations}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw"
})(MapContainer);

// <InfoWindow
//   marker={this.state.activeMarker}
//   visible={this.state.showingInfoWindow}>
//     <div>
//       <h1>Hey!</h1>
//     </div>
// </InfoWindow>
