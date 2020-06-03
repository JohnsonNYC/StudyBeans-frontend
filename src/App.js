import React, { Component } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'


import * as cafeData from './data/cafeNYC'

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.719570, lng: -74.008392 }}>
      {cafeData.data.map((cafe, index) => {
        return <Marker key={index} position={{lat: cafe.coordinates[0], lng:cafe.coordinates[1]}}/>
      })}
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class App extends Component {
  state={
    place:null 
  }

  render() {
    console.log(cafeData)
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}