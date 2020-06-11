import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Searchbar extends Component {

    render() {
        const {search, searchChange} = this.props
        return (
            <div className='search'>
                <TextField id="outlined-basic" value={search} name='search' placeholder='search by cafe name' onChange={searchChange} variant="outlined"/>
            </div>
        );
    }
}

export default Searchbar;