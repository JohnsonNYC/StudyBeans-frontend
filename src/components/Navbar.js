import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import Searchbar from './Searchbar'
// import Login from './Login'
class Navbar extends Component {
    state = {}



    render() {
        const {currentUser,toggleLogout} = this.props
        return (
            <div>
                Logo
                <Link to='/'>Home</Link>
                <Link to='/cafes'>Cafes</Link>
                {currentUser===null? <Link to='/login'>Login</Link>: <button onClick={toggleLogout}><Link to='/'>logout</Link></button> }
            </div>
        );
    }
}

export default Navbar;