import React, { Component } from 'react';
import Rating from './Rating'
const shopURL = 'http://localhost:3000/shops'
const reservationURL = 'http://localhost:3000/reservations'

class CafeProfile extends Component {
    state = {
        cafe: null,
        seats: null,
        comment: '',
        value: 0 // controlled form for dropdown
    }
    //fetches the information for one shop as well as the ratings 
    componentDidMount() {
        fetch(`${shopURL}/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(cafe => {
                this.setState({
                    cafe: cafe,
                    seats: cafe.seats
                })
            })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleDropdown = (e) => {
        this.setState({ value: parseInt(e.target.value) })
    }

    handleReservation = () => {
        const { cafe, value } = this.state
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
                    seats: value,
                    time: new Date().toLocaleTimeString()
                })
            }
            fetch(reservationURL, configObj)
                .then(resp => resp.json())
                .then(res => console.log(res))

            fetch(`http://localhost:3000/shops/${cafe.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    seats: cafe.seats - value
                })
            }).then(resp => resp.json()).then(cafe => this.setState({ seats: cafe.seats }))
            
        } else {
            alert('please sign in')
            this.props.history.push('/login')
        }
    }


    renderCafe = () => {
        const { cafe } = this.state
        const { ratings } = this.props
        let seats = []
        for (let i = 0; i < cafe.seats; i++) {
            seats.push(<option value={i + 1}>{i + 1}</option>)
        }
        return (
            <div className='cafe-profile'>
                <div>{cafe.name}</div>
                <div>{cafe.address}</div>
                <div>Available Seats: {this.state.seats}</div>

                <select value={this.state.value} onChange={this.handleDropdown}>
                    {seats.map(option => {
                        return option
                    })}
                </select>

                {ratings.map((rating) => {
                    if (rating.shop.id === cafe.id) {
                        return <Rating key={rating.id} cafe={cafe} rating={rating} />
                    }
                })}
                <button onClick={this.handleReservation}>Reserve</button>
                <form>
                    <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                    <input type='submit' />
                </form>
            </div>
        )
    }

    render() {
        const { cafe } = this.state
        // console.log(`http://localhost:3000/shops/${cafe.id}`)
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;