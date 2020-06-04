import React, { Component } from 'react';
import Cafe from './Cafe'

class CafeContainer extends Component {
    render() {
        const {cafes}=this.props
        console.log('cafes',cafes)
        return (
            <div className='cafe-container'>
                A L L   C A F E S
                {cafes.map((cafe)=>
                <Cafe key={cafe.id} cafe={cafe}/>
                )}
            </div>
        );
    }
}

export default CafeContainer;