import React, { Component } from 'react';
import './App.css'
import { Route, Switch } from 'react-router-dom'


//COMPONENTS 
import Navbar from './components/Navbar'
import CafeContainter from './components/CafeContainer'
import Auth from './components/Auth'
import CafeProfile from './components/CafeProfile'
import Home from './components/Home'
import UserProfile from './components/UserProfile'

const shopURL = 'http://localhost:3000/shops'

export default class App extends Component {
  state = {
    cafes: [],
    place: null,
    currentUser:null,
    search: "",
    filtered: null,
    ratingObj: null
  }
  //Search  Bar Logic
  searchChange= (e) =>{
    this.setState({ [e.target.name]: e.target.value });
}
  // POPULATES WITH CAFES 
  componentDidMount() {
    fetch(shopURL)
      .then(resp => resp.json())
      .then(cafes => {
        this.setState({ cafes });
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

  currentRating =(ratObj)=>{
    this.setState({ ratingObj: ratObj  });
  }

  render() {
    let filtered = this.state.cafes.filter(cafe => {
      return cafe.name.toLowerCase().includes(this.state.search.toLowerCase())
    })
    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} toggleLogout={this.toggleLogout} ratingObj={this.state.ratingObj}/>
        <Switch>
          <Route path="/users/:id" render={(routerProps)=> <UserProfile {...routerProps} currentUser={this.state.currentUser} /> }/>
          <Route path="/cafes/:id" render={(routerProps)=> <CafeProfile {...routerProps} currentUser={this.state.currentUser} currentRating={this.currentRating} />} />
          <Route exact path="/cafes" render={(routerProps) => <CafeContainter {...routerProps} cafes={this.state.search !==""? filtered: this.state.cafes} searchChange={this.searchChange} search={this.state.search}/>} />
          <Route path="/login" render={(routerProps)=> <Auth {...routerProps} currentUser={this.state.currentUser} updateUser={this.updateUser}/>} />
          <Route path="/" component={Home} />
        </Switch>
  
      </div>
    );
  }
}