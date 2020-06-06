import React, { Component } from 'react';
import './App.css'
import { GoogleMap, withScriptjs, withGoogleMap, Marker }
  from 'react-google-maps'
import * as cafeData from './data/cafeNYC'
import { Route, Switch } from 'react-router-dom'
//COMPONENTS 
import Navbar from './components/Navbar'
import CafeContainter from './components/CafeContainer'
import Auth from './components/Auth'
import CafeProfile from './components/CafeProfile'
import Home from './components/Home'
// import Cafe from './components/Cafe';

const shopURL = 'http://localhost:3000/shops'
const ratingURL = 'http://localhost:3000/ratings'

const access = process.env.REACT_APP_API_KEY

// GOOGLE MAP RENDER
function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.719570, lng: -74.008392 }}>
      {cafeData.data.map((cafe, index) => {
        return <Marker key={index} position={{ lat: cafe.coordinates[0], lng: cafe.coordinates[1] }} />
      })}
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class App extends Component {
  state = {
    cafes: [],
    place: null,
    currentUser:null,
    ratings:[]
  }
  // POPULATES WITH CAFES 
  componentDidMount() {
    fetch(shopURL)
      .then(resp => resp.json())
      .then(cafes => {
        this.setState({ cafes });
      })

      fetch(ratingURL)
            .then(resp => resp.json())
            .then(ratings => {
                this.setState({ ratings });
            })
  }
  // updates state of 'user' to peron who is logged in
  updateUser =(userObj)=> {
    this.setState({ currentUser: userObj  });
  }
// when logged out, state of 'user' is cleared
  toggleLogout=()=>{
    this.setState({ currentUser: null  });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} toggleLogout={this.toggleLogout}/>
        <Switch>
          <Route path="/cafes/:id" render={(routerProps)=> <CafeProfile {...routerProps} currentUser={this.state.currentUser} ratings={this.state.ratings}/>} />
          <Route path="/cafes" render={(routerProps) => <CafeContainter {...routerProps} cafes={this.state.cafes} />} />
          <Route path="/login" render={(routerProps)=> <Auth {...routerProps} currentUser={this.state.currentUser} updateUser={this.updateUser}/>} />
          <Route path="/" component={Home} />
        </Switch>
  
        <div style={{ width: '100vw', height: '50vh' }}>
          {/* <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${null}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        /> */}
        </div>
      </div>
    );
  }
}