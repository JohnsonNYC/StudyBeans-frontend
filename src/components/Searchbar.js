import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


class Searchbar extends Component {

    render() {
        const {search, searchChange} = this.props
        return (
            <div className='search'>
                <SearchIcon style={{marginTop: "20px"}}/>
                <TextField id="outlined-basic" value={search} name='search' placeholder='search by cafe name' onChange={searchChange} variant="outlined" style={{color:'white',backgroundColor:'white', marginBottom: "15px"}}/>
            </div>
        );
    }
}

export default Searchbar;