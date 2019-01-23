import React, {Component} from 'react'

import FlipMove from 'react-flip-move'
import moment from 'moment'

class Stops extends Component {
    constructor(props) {
        super(props)

    }


    render = () => (
        <div className="stops-container" >
            <FlipMove className="stops-flipper" >
                {
                    this.props.stops.map(stop => (
                        <div className="stops-stop" key={stop.key} >
                              <span className="stops-lineref" >{stop.id}</span>
                              <span className={`stops-name ${stop.name.length > 14 && 'stops-name-small'}`} >{stop.name}</span>
                              <span className="stops-time">{moment.unix(stop.time).toNow(true)}</span>
                              <span className="stops-stopref" >{stop.stop}</span>
                        </div>
                    ))
                }
            </FlipMove>
        </div>
    )

}

export default Stops