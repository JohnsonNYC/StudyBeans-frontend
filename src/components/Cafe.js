import React, { Component } from 'react';
import Rating from './Rating'
class Cafe extends Component {
    render() {
        const {cafe} = this.props
        return (
            <div classname='cafe-card'>
                <span>{cafe.name}</span>
                <span>{cafe.address}</span>
                <Rating />
            </div>
        );
    }
}
export default Cafe;