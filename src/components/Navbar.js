import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function Navbar(props) {
    const { currentUser, toggleLogout } = props
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <ButtonGroup size="large" aria-label="outlined primary button group">
                <Button><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></Button>
                <Button> <Link to='/cafes' style={{ textDecoration: 'none' }}>Cafes</Link> </Button>
                {currentUser !== null ? <Button><Link to={`/users/${currentUser.id}`} style={{ textDecoration: 'none' }}>Profile</Link></Button> : null}
                {currentUser === null ? <Button><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></Button> : <Button onClick={toggleLogout}><Link to='/' style={{ textDecoration: 'none' }}>logout</Link></Button>}
            </ButtonGroup>
        </div>
    );
}
