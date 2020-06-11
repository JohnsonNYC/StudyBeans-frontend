import React, { Component } from 'react'
import Rating from './Rating'

class UserProfile extends Component {

    state = {
        rating: [],
        reservations: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/ratings')
            .then(resp => resp.json())
            .then(rating => this.setState({ rating: rating.reverse() }))

        fetch('http://localhost:3000/reservations')
            .then(resp => resp.json())
            .then(reservations => {
                this.setState({ reservations });
            })

        if (this.props.ratingObj !== null) {
            this.setState({ rating: [this.props.ratingObj, ...this.state.rating] });
        }

    }

    toggleDelete = (ratingObj) => {
        const { rating } = this.state
        const newRatings = rating.filter(rating => rating !== ratingObj)
        this.setState({ rating: newRatings })

        fetch(`http://localhost:3000/ratings/${ratingObj.id}`, {
            method: 'DELETE'
        })
    }

    renderUserInfo = () => {
        const { currentUser } = this.props
        const { rating, reservations } = this.state

        if (currentUser !== null) {
            return <div>
                <h3> Ratings History </h3>
                <div> {currentUser.name} </div>
                {rating.map((rating) => {
                    if (rating && rating.user_id === currentUser.id) {
                        return <Rating key={rating.id} rating={rating} currentUser={currentUser} toggleDelete={this.toggleDelete} />
                    }
                })}
                <h3> Reservation History</h3>
                {reservations.map((reservation) => {
                    if (reservation.user_id === currentUser.id) {
                        return <div className='reservation-history' style={{border:'black'}}>
                            <div>Shop Name:{reservation.shop.name} </div>
                            <div>Shop Address: {reservation.shop.address} </div>
                            <div>Seats: {reservation.seats} </div>
                        </div>
                    }
                })}
            </div>
        } else {
            return null
        }
    }

    render() {
        const { currentUser } = this.props
        const { rating, reservations } = this.state
        console.log(currentUser)
        console.log(rating)
        console.log(reservations)
        return (
            <div>
                {this.renderUserInfo()}
            </div>
        );
    }
}

export default UserProfile;