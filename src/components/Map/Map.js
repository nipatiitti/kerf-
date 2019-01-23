import React, {Component} from 'react'

import {
    Map,
    ScaleControl,
    TileLayer,
    Marker
} from 'react-leaflet'

import L from 'leaflet'

import Stops from '../Stops'

const STOPS = [
    {
        id: 133,
        pos: {
            lat: 60.44818816,
            lng: 22.28093279
        }
    },
    {
        id: 163,
        pos: {
            lat: 60.44866539,
            lng: 22.28069962
        }
    },
    {
        id: 66,
        pos: {
            lat: 60.45148812,
            lng: 22.28068962
        }
    },
    {
        id: 114,
        pos: {
            lat: 60.4513246,
            lng: 22.28089541
        }
    },
    {
        id: 867,
        pos: {
            lat: 60.44913849,
            lng: 22.28618174
        }
    },
    {
        id: 851,
        pos: {
            lat: 60.44961693,
            lng: 22.28547526
        }
    }
]

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
                {
                    STOPS.map(stop => (
                        <Marker
                            icon={new L.divIcon({
                                className: 'markerstop',
                                html: `<span class="markerstop-text">${stop.id}</span>`
                            })}
                            key={stop.id}
                            position={stop.pos}
                        />
                    ))
                }
            </Map>
            <Stops stops={this.props.stops} />
        </div>
    )

}

export default MapComponent