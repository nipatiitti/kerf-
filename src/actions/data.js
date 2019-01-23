import axios from 'axios'

import {loading, error, baseUrl} from './utils.js'

const stopIds = [851, 867, 163, 133, 66, 114]

export const getStops = () => dispatch => {
  dispatch(loading(true))
  axios.all(stopIds.map(id => getStop(id)))
    .then(response => {
      const data = response.map(res => res.data)
      let stops = []

      data.forEach((stop, i) => {
        if(stop.status === 'OK') {
          stop.result.forEach(bus => {
            if(bus.monitored) {
              stops.push({
                key: bus.vehicleref,
                id: bus.lineref,
                name: bus.destinationdisplay,
                time: bus.expectedarrivaltime,
                stop: stopIds[i]
              })
            }
          })
        }
      })
      stops = stops.sort((a, b) => a.time > b.time ? 1 : b.time > a.time ? -1 : 0).filter((a, pos) => stops.findIndex(b => b.key == a.key) >= pos).slice(0, 12)
      console.log(stops, 'stops')
      dispatch(refreshStops(stops))
      dispatch(loading(false))
    })
    .catch(e => console.error(e))
}

const getStop = id => axios.get(`https://data.foli.fi/siri/sm/${id}`)

export const getBusses = () => dispatch => {
  dispatch(loading(true))
  axios.get('https://data.foli.fi/siri/vm')
    .then(({data}) => {
      if(data.status === 'OK') {
        const busses = data.result.vehicles
        const bussesProcessed = []

        for (const id in busses) {
          if (busses.hasOwnProperty(id)) {
            const element = busses[id]
            if(element.monitored  && 1 >= calcDistance(element.latitude, element.longitude)) {
              bussesProcessed.push({
                key: id,
                id: element.lineref,
                position: {
                  lat: element.latitude,
                  lng: element.longitude
                }
              })
            }
          }
        }
        dispatch(refreshBusses(bussesProcessed))
        console.log(bussesProcessed, 'Busses')
        dispatch(loading(false))
      } else {
        dispatch(error('Föli offline'))
      }
    })
    .catch((e) => {
      console.error(e)
    })
}

const calcDistance = (lat2,lng2) => {
  const lat = 60.448729
  const lng = 22.289688
  const R = 6371
  const dLat = deg2rad(lat2-lat) 
  const dlng = deg2rad(lng2-lng) 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dlng/2) * Math.sin(dlng/2)
     
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
  const d = R * c
  return d
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

const refreshBusses = busses => ({
  type: 'REFRESH_BUSSES',
  busses
})


const refreshStops = stops => ({
  type: 'REFRESH_STOPS',
  stops
})
