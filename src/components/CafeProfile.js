import React, { Component } from 'react';
import Rating from './Rating'
const shopURL = 'http://localhost:3000/shops'
const reservationURL = 'http://localhost:3000/reservations'
const ratingURL = 'http://localhost:3000/ratings'


class CafeProfile extends Component {
    state = {
        cafe: null,
        seats: null,
        comment: '',
        value: 1, // controlled form for dropdown
        stars: 5,
        ratings: [],
        currentReservation: null // ALL ratings 
    }
    //fetch all shops and ratings 
    componentDidMount() {
        fetch(`${shopURL}/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(cafe => {
                this.setState({
                    cafe: cafe,
                    seats: cafe.seats
                })
            })

        fetch(ratingURL)
            .then(resp => resp.json())
            .then(ratings => {
                this.setState({ ratings })
            })
    }
    // delete a rating
    toggleDelete = (ratingObj) => {
        const { ratings } = this.state
        const newRatings = ratings.filter(rating => rating !== ratingObj)
        this.setState({ ratings: newRatings })

        fetch(`${ratingURL}/${ratingObj.id}`, {
            method: 'DELETE'
        })

    }

    // E V E N T   L I S T E N E R S  
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
                    time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                })
            }

            fetch(reservationURL, configObj)
                .then(resp => resp.json())
                .then(res => this.setState({ currentReservation: res }))

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

    handleSubmit = (event) => {
        event.preventDefault()
        const { cafe, stars, comment } = this.state
        const { currentUser } = this.props
        if (currentUser !== null) {

            fetch(ratingURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    shop_id: cafe.id,
                    stars: stars,
                    comments: comment
                })
            }).then(resp => resp.json()).then(res => this.setState({ ratings: [...this.state.ratings, res] })) // SETSTATE HERE?
        } else { alert('please login or signup') }
    }
    ////////////////////////////////

    reservationInfo = () => {
        const { currentReservation } = this.state
        let time = currentReservation.time.slice(0,8) // Original Time
        let timeToadd = "00:10:00";  // Time to be added in min
        let timeToAddArr = timeToadd.split(":");
        let ms = (60 * 60 * parseInt(timeToAddArr[0]) + 60 * (parseInt(timeToAddArr[1]))) * 1000;
        let newTime = new Date('1970-01-01T' + time).getTime() + ms
        let finalTime = `${new Date(newTime).toLocaleString('en-GB').slice(12, 17)} ${currentReservation.time.slice(9)}`

        return (
            <div className='reservation'>
                <div>Thank you for reserving {currentReservation.seats} {currentReservation.seats > 1 ? `seats` : `seat`} with us!</div>
                <div>Please be here by {finalTime}</div>
                <div> put countdown in here</div>
            </div>
        )
    }


    renderCafe = () => {
        const { cafe, ratings } = this.state
        const { currentUser } = this.props
        let seats = []
        for (let i = 0; i < cafe.seats; i++) {
            seats.push(<option value={i + 1}>{i + 1}</option>)
        }
        return (
            <div className='cafe-profile'>
                <div>{cafe.name}</div>
                <div>{cafe.address}</div>
                <div>Available Seats: {this.state.seats}</div>

                {this.state.currentReservation !== null ? null :
                    <select value={this.state.value} onChange={this.handleDropdown}>
                        {seats.map(option => {
                            return option
                        })}
                    </select>
                }
                {/* R E S E R V A T I O N  I N F O  */}

                {this.state.currentReservation == null ? <button onClick={this.handleReservation}>Reserve</button> : this.reservationInfo()}

                {/* C O M M E N T   F O R M  */}
                <form onSubmit={this.handleSubmit}>
                    <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                    <input type='submit' value='Submit' />
                </form>
                {/* L I S T   O F   C O M M E N T S  */}
                {/* {this.cafeRatings()} */}
                {ratings.map((rating) => {
                    if (rating.shop_id === cafe.id) {
                        return <Rating key={rating.id} cafe={cafe} rating={rating} currentUser={currentUser} toggleDelete={this.toggleDelete} />
                    }
                })}
            </div>
        )
    }

    render() {
        const { cafe } = this.state
        console.log(this.state.currentReservation)
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;