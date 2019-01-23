import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getBusses, getStops } from '../../actions/data'

import Header from './Header'

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  getBusses: () => {
    dispatch(getBusses())
  },
  getStops: () => {
    dispatch(getStops())
  }
})

const HeaderContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))

export default HeaderContainer
