import React, { Component } from 'react';
import {GoogleMap,withScriptjs,withGoogleMap,Marker} 
from 'react-google-maps'
import * as cafeData from './data/cafeNYC'
import Navbar from './components/Navbar'
import CafeContainter from './components/CafeContainer'

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

const shopURL='http://localhost:3000/shops'

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class App extends Component {
  state={
    cafes: [],
    place:null 
  }

  componentDidMount() {
    fetch(shopURL)
    .then(resp => resp.json())
    .then(cafes => {
      this.setState({ cafes });
    })
  }

  render() {
    // console.log(this.state.cafes)
    const access = process.env.REACT_APP_API_KEY
    return (
      <div style={{ width: '100vw', height: '50vh' }}>
        <Navbar />
        {/* <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${null}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        /> */}
        <CafeContainter cafes = {this.state.cafes}/>
      </div>
    );
  }
}