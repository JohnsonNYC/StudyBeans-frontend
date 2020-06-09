import React, { Component } from 'react';

class Rating extends Component {

    

    render() {
        const { rating, cafe, currentUser, toggleDelete } = this.props
        const renderDelete = <button onClick={() => toggleDelete(rating)}>Delete</button>
        return (
            <div className='rating'>
                <div className='stars'>Rating:{rating.stars} Stars</div>
                <div className='comments-container'>Comments:
                    <div className='comments'>{rating.comments}</div>
                </div>
                <div className='author'>by:{rating.user.name}</div>
                {currentUser && currentUser.id === rating.user_id ? renderDelete : null}
            </div>
        );
    }
}

export default Rating;