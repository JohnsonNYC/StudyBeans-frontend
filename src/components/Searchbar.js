import React, { Component } from 'react';

class Searchbar extends Component {

    render() {
        const {search, searchChange} = this.props
        return (
            <div className='search'>
                <input value={search} name='search' placeholder='search by cafe name' onChange={searchChange}/>
            </div>
        );
    }
}

export default Searchbar;