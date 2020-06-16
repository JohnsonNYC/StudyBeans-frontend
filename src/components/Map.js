import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import '../App.css'
const access = process.env.REACT_APP_API_KEY

class MyGoogleMap extends Component {
    state = {}
    shouldComponentUpdate() {
        return false
    }
    Map = () => {
        const { cafe } = this.props
        return (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{ lat: parseFloat(cafe.lat), lng: parseFloat(cafe.lng) }}>
                <Marker position={{ lat: parseFloat(cafe.lat), lng: parseFloat(cafe.lng) }} />
            </GoogleMap>
        )
    }

    render() {
        const WrappedMap = withScriptjs(withGoogleMap(this.Map))
        const {cafe} = this.props
        return (
            <div className='row'>
                <div className='column' style={{ width: '50vw', height: '50vh'}} >
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${null}`}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                </div>
                <div className='column' style={{ width: '50vw', height: '50vh'}} >
                    <img style={{width: '50vw', height: '50vh'}} src={cafe.img} />
                </div>
            </div>
        )
    }
}

export default MyGoogleMap;