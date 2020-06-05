import React, { Component } from 'react';
import Rating from './Rating'
const shopURL = 'http://localhost:3000/shops'

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
                <button>Reserve</button>
                <form>
                    <input name="comment" placeholder="comment" value={this.state.comment} onChange={this.handleChange} />
                    <input type='submit' />
                </form>
            </div>
        )
    }

    render() {
        const { cafe } = this.state
        console.log('props', this.props)
        console.log('state', this.state)
        return (
            <div>
                {cafe ? this.renderCafe() : <div>No Cafe Selected</div>}
            </div>
        );
    }
}

export default CafeProfile;