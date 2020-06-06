import React, { Component } from 'react';
import Rating from './Rating'
const shopURL = 'http://localhost:3000/shops'
const reservationURL = 'http://localhost:3000/reservations'

class CafeProfile extends Component {
    state = {
        cafe: null,
        seats: 5,
        comment: ''
    }
    //fetches the information for one shop as well as the ratings 
    componentDidMount() {
        fetch(`${shopURL}/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(cafe => { this.setState({ cafe }); })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleReservation = () => {
        const { cafe } = this.state
        const { currentUser } = this.props

        if (currentUser !== null) {
            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    shop_id: cafe.id,
                    seats: 4,
                    time: new Date().toLocaleTimeString()
                })
            }
            fetch(reservationURL, configObj)
                .then(resp => resp.json())
                .then(res => console.log(res))
        } else {
            alert('please sign in')
            this.props.history.push('/login')            
        }
    }

    renderCafe = () => {
        const { cafe } = this.state
        const { ratings } = this.props
        return (
            <div className='cafe-profile'>
                <div>{cafe.name}</div>
                <div>{cafe.address}</div>
                <div>Available Seats: {this.state.seats}</div>
                {ratings.map((rating) => {
                    if (rating.shop.id === cafe.id) {
                        return <Rating key={rating.id} cafe={cafe} rating={rating} />
                    }
                })}
                <button onClick={this.handleReservation/*create your reservation*/}>Reserve</button>
                <form>
                    <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                    <input type='submit' />
                </form>
            </div>
        )
    }

    render() {
        const { cafe } = this.state
        const { currentUser } = this.props
        console.log('user_id', currentUser)
        console.log('cafe_id', cafe)
        // console.log(this.handleReservation())
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;