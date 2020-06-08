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
        value: 0, // controlled form for dropdown
        stars: 5,
        ratings: [] // ALL ratings 
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
        const {ratings}=this.state
        const newRatings = ratings.filter(rating => rating !==ratingObj)
        this.setState({ ratings: newRatings  })

        fetch(`${ratingURL}/${ratingObj.id}`,{
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
        }else{ alert('please login or signup')}
    }
    ////////////////////////////////


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

                <select value={this.state.value} onChange={this.handleDropdown}>
                    {seats.map(option => {
                        return option
                    })}
                </select>
                {/* R E S E R V A T I O N   B U T T O N   */}
                <button onClick={this.handleReservation}>Reserve</button>
                {/* C O M M E N T   F O R M  */}
                <form onSubmit={this.handleSubmit}>
                    <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                    <input type='submit' value='Submit' />
                </form>
                {/* L I S T   O F   C O M M E N T S  */}
                {/* {this.cafeRatings()} */}
                {ratings.map((rating) => {
                    if (rating.shop_id === cafe.id) {
                        return <Rating key={rating.id} cafe={cafe} rating={rating} currentUser={currentUser} toggleDelete={this.toggleDelete}/>
                    }
                })}
            </div>
        )
    }

    render() {
        const { cafe } = this.state
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;