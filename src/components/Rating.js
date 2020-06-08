import React, { Component } from 'react';

class Rating extends Component {
    render() {
        const { rating, cafe } = this.props
        

        return (
            <div className='rating'>
                <div>Rating:{rating.stars} Stars</div>
                <div>Comments:
                    <div>{rating.comments}</div>
                </div> {/* THIS WILL BE AN ARRAY */}
            </div>
        );
    }
}

export default Rating;