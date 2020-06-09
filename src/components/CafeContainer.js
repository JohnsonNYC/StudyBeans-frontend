import React, { Component } from 'react';
import Cafe from './Cafe'
import Searchbar from './Searchbar'

class CafeContainer extends Component {

    render() {
        const {cafes}=this.props
        console.log('search',this.props.search)
        return (
            <div className='cafe-container'>
                <Searchbar cafes = {cafes} searchChange={this.props.searchChange} search={this.props.search}/>
                A L L   C A F E S
                {cafes.map((cafe)=>
                <Cafe key={cafe.id} cafe={cafe} {...this.props.history}/>
                )}
            </div>
        );
    }
}

export default CafeContainer;