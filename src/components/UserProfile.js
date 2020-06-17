import React, { Component } from 'react'
import Rating from './Rating'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Avatar } from '@material-ui/core';



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
                <Avatar src={currentUser.avatar} style={{ margin: "auto" }} />
                <Typography>
                    <h1>{currentUser.name}</h1>
                </Typography>
                <Grid container spacing={3} style={{ border: '2px solid purple', marginTop: 'auto' }}>
                    <Grid item xs={12} sm={6} >
                        <h3> Ratings History </h3>
                        {rating.map((rating) => {
                            if (rating && rating.user_id === currentUser.id) {
                                return <Rating key={rating.id} rating={rating} currentUser={currentUser} toggleDelete={this.toggleDelete} />
                            }
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <h3> Reservation History</h3>
                        {reservations.map((reservation) => {
                            if (reservation.user_id === currentUser.id) {
                                return <div className='reservation-history' style={{ border: "1px solid black", position: 'relative', marginRight: '220px', marginLeft: '220px' }}>
                                    <div>{reservation.shop.name} </div>
                                    <div>{reservation.shop.address} </div>
                                    <div>{reservation.seats} </div>
                                </div>
                            }
                        })}
                    </Grid>
                </Grid>
            </div>
        } else {
            return null
        }
    }

    render() {
        const { currentUser } = this.props
        const { rating, reservations } = this.state
        return (
            <div>
                {this.renderUserInfo()}
            </div>
        );
    }
}

export default UserProfile;