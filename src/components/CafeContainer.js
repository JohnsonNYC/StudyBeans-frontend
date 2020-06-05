import React, { Component } from 'react';
import Cafe from './Cafe'
import Searchbar from './Searchbar'

class CafeContainer extends Component {

    state ={
        ratings:[]
    }

    componentDidMount() {
        
    }
    render() {
        const {cafes}=this.props
        return (
            <div className='cafe-container'>
                <Searchbar />
                A L L   C A F E S
                {cafes.map((cafe)=>
                <Cafe key={cafe.id} cafe={cafe} {...this.props.history}/>
                )}
            </div>
        );
    }
}

export default CafeContainer;