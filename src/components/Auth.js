import React, { Component } from 'react';
const userURL = 'http://localhost:3000/users'
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
        // isNewUser // if new user is true 
        //     ? password === confirmation // if password and confirmation match
        //         ? alert('created new account!') : alert('try again!') // alert 'created new account' else 'try again'
        //     : alert(`welcome back, ${username}`) // if new user is false

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
        const { username, password } = this.state;
        return (
            <>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange} />
            </>
        )
    }
    // SIGN UP PAGE
    renderSignup = () => {
        const { username, password, name, confirmation, email } = this.state;
        return (
            <>
                <input name="name" placeholder="Name" value={name} onChange={this.handleChange} />
                <input name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange} />
                <input name="confirmation" placeholder="Confirm Password" type="password" value={confirmation} onChange={this.handleChange} />
            </>
        )
    }
    render() {
        const { isNewUser } = this.state
        return (
            <div>
                <h3>{isNewUser ? 'Sign Up' : 'Login'}</h3>
                {isNewUser ? this.renderSignup() : this.renderLogin()}
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
                <div onClick={this.toggleNewUser}>{isNewUser ? "Login" : "New Member? Sign up!"}</div>
            </div>
        );
    }
}

export default Auth;