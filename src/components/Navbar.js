import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import Searchbar from './Searchbar'
// import Login from './Login'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';

class Navbar extends Component {

    render() {
        const { currentUser, toggleLogout } = this.props
        return (
            <div>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    <Button><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></Button>
                    <Button> <Link to='/cafes' style={{ textDecoration: 'none' }}>Cafes</Link> </Button>
                    {currentUser !== null ? <Button><Link to={`/users/${currentUser.id}`} style={{ textDecoration: 'none' }}>Profile</Link></Button> : null}
                    {currentUser === null ? <Button><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></Button> : <Button onClick={toggleLogout}><Link to='/' style={{ textDecoration: 'none' }}>logout</Link></Button>}
                </ButtonGroup>
            </div>
        );
    }
}

export default Navbar;