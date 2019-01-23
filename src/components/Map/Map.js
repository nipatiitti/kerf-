import React, {Component} from 'react'

import {
    Map,
    ScaleControl,
    TileLayer,
    Marker
} from 'react-leaflet'

import L from 'leaflet'

import Stops from '../Stops'

class MapComponent extends Component {
    constructor(props) {
        super(props)

    }


    render = () => (
        <div className='map-container' >
            <Map
                center={{ lat: 60.449335, lng: 22.283266 }}
                zoom={14.91}
                className='map-element'
                ref={this.map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <ScaleControl
                    position='topright'
                    imperial={false}
                />
                {
                    this.props.busses.map(bus => (
                        <Marker
                            icon={new L.divIcon({
                                className: 'marker',
                                html: `<span class="marker-text">${bus.id}</span>`
                            })}
                            key={bus.key}
                            position={bus.position}
                        />
                    ))
                }
            </Map>
            <Stops stops={this.props.stops} />
        </div>
    )

}

export default MapComponent