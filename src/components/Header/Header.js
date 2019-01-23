import React, { Component } from 'react'

import moment from 'moment'

class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      time: moment().format('HH:mm')
    }
  }

  componentDidMount = () => {
    this.props.getBusses()
    this.props.getStops()

    const UPDATE_INTERVAL = 1000
    const UPDATE_BUSSES = 3000
    const react = this

    this.updateBusses = setInterval(() => {
      this.props.getBusses()
      this.props.getStops()
    }, UPDATE_BUSSES)

    this.updateClock = setInterval(() => {
        react.setState({
            time: moment().format('HH:mm')
        })
    }, UPDATE_INTERVAL)
  }

  componentWillUnmount = () => {
    clearInterval(this.updateClock)
    clearInterval(this.updateBusses)
  }

  render () {
    return (
      <div className="header-header">
        <div className="header-innerContainer">
            <div className="header-time">
                <div className="header-imageContainer">
                    <img className="header-logo" src="logo.png" alt="logo" />
                </div>
                <p className="bigtext" >
                  {this.state.time}
                </p>
            </div>
        </div>
      </div>
    )
  }
}

export default Header
