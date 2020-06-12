import React, { Component } from 'react';
import '../App.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const userURL = 'http://localhost:3000/users'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                Study Beans
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Auth extends Component {
    state = {
        isNewUser: false,
        name: '',
        email: '',
        username: '',
        password: '',
        confirmation: '',
        users: []
    }

    componentDidMount() {
        fetch(userURL)
            .then(resp => resp.json())
            .then(users => { this.setState({ users }); })
    }

    //Renders different form 
    toggleNewUser = () => this.setState(prevState => ({ isNewUser: !prevState.isNewUser, username: '', password: '', name: '', confirmation: '' }))
    // Changes State as User fills form
    handleChange = e => this.setState({ [e.target.name]: e.target.value })
    // When Submit button is toggled
    handleSubmit = e => {
        const { isNewUser, password, confirmation, username, name, email } = this.state;

        let currentUser
        if (isNewUser === true && password === confirmation) {
            fetch(userURL, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    password: password,
                    email: email
                })
            }).then(resp => resp.json()).then(resp => alert('created new account!'))
            this.props.history.push('cafes')
        } else if (isNewUser === false) {
            currentUser = this.state.users.find(user => {
                return user.username === this.state.username
            })
            if (currentUser != null) {
                this.props.updateUser(currentUser)
                this.props.history.push('cafes')
            } else { alert('try again') }
        }
    }
    // LOGIN PAGE
    renderLogin = () => {
        const { username, password } = this.state
    
        return (
            <Grid container component="main" className='rootTwo' style={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className='image' style={{ backgroundImage: 'url(https://source.unsplash.com/random)', backgroundRepeat: 'no-repeat', backgroundColor: '#A9A9A9', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className='paper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',margin: 30  }} >
                        <Avatar className='avatar' style={{margin: 8, backgroundColor:'#CD5C5C',border:"1px solid purple"}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className='form' style={{width:'100%',marginTop:100}}>
                            <TextField variant="outlined" margin="normal" required fullWidth name="username" id="username" label="Username" name="username" value={username} onChange={this.handleChange} autoFocus />
                            <TextField variant="outlined" margin="normal" required fullWidth name="password" id="password" label="Password" name="password" type="password" value={password} onChange={this.handleChange} autoFocus />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button //Remember to set state and use function to control this 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className='submit'
                                type="submit"
                                onClick={this.handleSubmit}
                                style={{margin: 3 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={this.toggleNewUser}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
    // SIGN UP PAGE
    renderSignup = () => {
        const { username, password, name, confirmation, email } = this.state;
        return (
            // <>
            //     <input name="name" placeholder="Name" value={name} onChange={this.handleChange} />
            //     <input name="email" placeholder="Email" value={email} onChange={this.handleChange} />
            //     <input name="username" placeholder="Username" value={username} onChange={this.handleChange} />
            //     <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange} />
            //     <input name="confirmation" placeholder="Confirm Password" type="password" value={confirmation} onChange={this.handleChange} />
            // </>
            <Grid container component="main" className={'height'} style={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={'image'} style={{ backgroundImage: 'url(https://source.unsplash.com/random)', backgroundRepeat: 'no-repeat', backgroundColor: '#A9A9A9', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className='paper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',margin: 30  }}>
                        <Avatar className='avatar' style={{margin: 8, backgroundColor:'#CD5C5C',border:"1px solid purple"}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create Account
                        </Typography>
                        <form style={{width:'100%',marginTop:100}}>
                            <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Name" name="name" value={name} onChange={this.handleChange} autoFocus />
                            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" value={email} onChange={this.handleChange} autoFocus />
                            <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" value={username} onChange={this.handleChange} autoFocus />
                            <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" type="password" value={password} onChange={this.handleChange} autoFocus />
                            <TextField variant="outlined" margin="normal" required fullWidth id="confirm-password" label="Confirm-password" name="confirmation" type="password" value={confirmation} onChange={this.handleChange} autoFocus />

                            <Button //Remember to set state and use function to control this 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className='submit'
                                type="submit"
                                onClick={this.handleSubmit}
                                style={{margin: 3 }}
                            >
                                Create Account
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={this.toggleNewUser}>
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
    render() {
        const { isNewUser } = this.state
        return (
            <div>
                {isNewUser ? this.renderSignup() : this.renderLogin()}
            </div>
        );
    }
}

export default Auth;