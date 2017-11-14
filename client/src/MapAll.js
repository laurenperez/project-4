import React, { Component } from 'react';
/* global google */






class MapAll extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
  this.map = new google.maps.Map(this.refs.map, {
        center: { lat: 47.608013, lon: -122.335167},
        zoom: 8
      });
    }


  render() {
    return (
      <div ref="map" style={{width: 400, height: 400, border: '1px solid black'}}>
        I should be a map!
      </div>
    )
  }
}

export default MapAll;



// google maps API key : AIzaSyDIq_UgKoQ5Du5X_f_S7nCE4mcH2qLqhdw
