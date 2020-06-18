import React, { Component } from 'react';
import Rating from './Rating';
import '../App.css';
import { FaStar } from 'react-icons/fa';
import MyGoogleMap from './Map';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';


const shopURL = 'http://localhost:3000/shops'
const reservationURL = 'http://localhost:3000/reservations'
const ratingURL = 'http://localhost:3000/ratings'


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class CafeProfile extends Component {
    state = {
        cafe: null, // cafe data cdm
        seats: null, // seats picked for reservatoin
        comment: '', // controlled form 
        value: 1, // controlled form for dropdown
        stars: 0, // hard corded star for POST reservation 
        ratings: [], // ratings data cdm
        currentReservation: null, // ALL ratings 
        currentRating: null,
        hover: null,
        isOpen: false
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
                this.setState({ ratings: ratings.reverse() })
            })
    }
    // D E L E T E   A   R A T I N G   
    toggleDelete = (ratingObj) => {
        const { ratings } = this.state
        const newRatings = ratings.filter(rating => rating !== ratingObj)
        this.setState({ ratings: newRatings })
        fetch(`${ratingURL}/${ratingObj.id}`, {
            method: 'DELETE'
        })
    }
    // D E L E T E   A   R E S E R V A T I O  N 
    deleteRes = () => {

        fetch(`${reservationURL}/${this.state.currentReservation.id}`, {
            method: 'DELETE'
        })

        this.setState({
            seats: this.state.seats + this.state.currentReservation.seats,
            currentReservation: null
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
            }).then(resp => resp.json()).then(cafe => this.setState({ seats: cafe.seats}))
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
            }).then(resp => resp.json()).then(res => {
                this.props.currentRating(res)
                this.setState({
                    ratings: [res, ...this.state.ratings],
                    currentRating: res,
                    comment: '',
                    stars: 0
                })
                console.log('res',res)
            })
        } else if (currentUser === null || currentUser === undefined) {
            alert('please login or signup')
        }
    }

    reservationInfo = () => {
        const { currentReservation } = this.state
        let time = currentReservation.time.slice(0, 8) // Original Time
        let timeToadd = "00:10:00";  // Time to be added in min
        let timeToAddArr = timeToadd.split(":");
        let ms = (60 * 60 * parseInt(timeToAddArr[0]) + 60 * (parseInt(timeToAddArr[1]))) * 1000;
        let newTime = new Date('1970-01-01T' + time).getTime() + ms
        let finalTime = `${new Date(newTime).toLocaleString('en-GB').slice(12, 17)} ${currentReservation.time.slice(9)}`

        return (
            <div className='reservation'>
                <div>Thank you for reserving {currentReservation.seats} {currentReservation.seats > 1 ? `seats` : `seat`} with us!</div>
                <div>Please be here by {finalTime}</div>
            </div>
        )
    }

    toggleStar = (ratingValue) => {
        this.setState({ stars: ratingValue });
    }

    setHover = (value) => {
        this.setState({ hover: value });
    }

    avgStars = () => {
        const { cafe } = this.state
        let ratingArray = this.state.ratings.filter(rating => {
            if (cafe != undefined && cafe.id === rating.shop_id) {
                return rating
            }
        })
        let starsArray = ratingArray.map(rating => (
            rating.stars
        ))
        const avg = starsArray.reduce((a, b) => a + b, 0) / starsArray.length;

        return [...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            console.log(avg)
            return (
                <label>
                    <FaStar className='star' color={ratingValue <= avg ? "#ffc107" : "#e4e5e9"} size={20} />
                </label>
            )

        })
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
                <div className='shopinfo'>
                    <h1 className='shopname'>{cafe.name}</h1>
                    <h3 className='shopaddress'>{cafe.address}</h3>
                    {this.avgStars()}
                </div>
                {/* ////////////////////////////////////////GOOGLE STUFF//////////////////////////////////////// */}
                <MyGoogleMap cafe={cafe} />
                {/* ////////////////////////////////////////GOOGLE STUFF//////////////////////////////////////// */}

                <div className='reservationform'>
                    <div>Available Seats: {this.state.seats}</div>
                    {this.state.currentReservation !== null ? null :
                        <NativeSelect id="demo-customized-select-native" value={this.state.value} onChange={this.handleDropdown} input={<BootstrapInput />}>
                            {seats.map(option => {
                                return option
                            })}
                        </NativeSelect>
                    }
                    {this.state.currentReservation == null ? <Button variant="contained" color="primary" onClick={this.handleReservation}>Reserve</Button> : this.reservationInfo()}
                    {this.state.currentReservation == null ? null : <Button onClick={this.deleteRes}> Delete Reservation </Button>}
                </div>

                {/* R E S E R V A T I O N  I N F O  */}

                {/* R A T I N G  F O R M  */}
                <br></br>

                <div className='ratingform'>
                    <span>Rate this cafe!</span>
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label>
                                <input type='radio' name='rating' value={ratingValue} onClick={() => this.toggleStar(ratingValue)} />
                                <FaStar className='star' color={ratingValue <= (this.state.hover || this.state.stars) ? "#ffc107" : "#e4e5e9"} size={20} onMouseEnter={() => this.setHover(ratingValue)} onMouseLeave={() => this.setHover(null)} />
                            </label>
                        )

                    })}
                    {/* P O S T   A   R A T I N G  */}
                    <form onSubmit={this.handleSubmit}>
                        <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                        <input type='submit' value='Submit' />
                    </form>
                    {/* L I S T   O F   C O M M E N T S  */}
                    {ratings.map((rating) => {
                        if (rating.shop_id === cafe.id) {
                            return <Rating key={rating.id} cafe={cafe} rating={rating} currentUser={currentUser} toggleDelete={this.toggleDelete} />
                        }
                    })}
                </div>

            </div>
        )
    }





    render() {
        const { cafe } = this.state
        this.avgStars()
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;