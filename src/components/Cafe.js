import React, { Component } from 'react';
class Cafe extends Component {
    render() {
        const {cafe} = this.props
        // console.log(cafe.id)
        return (
            <div className="cafe-card" style={{border:"1px solid purple"}} onClick={()=> this.props.push(`/cafes/${cafe.id}`)}>
                <span>{cafe.name}</span>
                <span>{cafe.address}</span>
            </div>
        );
    }
}
export default Cafe;