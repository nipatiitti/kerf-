import { connect } from 'react-redux'

import Map from './Map'

const mapStateToProps = state => ({
    busses: state.busses.busses,
    stops: state.busses.stops
})


const mapDispatchToProps = (dispatch) => ({
    
})


const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map)

export default MapContainer