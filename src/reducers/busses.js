const initialState = {
    busses: [],
    stops: []
}


const Busses = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_BUSSES':
            return Object.assign({}, state, {
                busses: action.busses
            }) 

        case 'REFRESH_STOPS':
            return Object.assign({}, state, {
                stops: action.stops
            }) 

        default:
            return state
    }
}

export default Busses