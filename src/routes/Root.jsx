import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Router,
  Route,
  Switch
} from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'

import history from './history'

import Header from '../components/Header'
import Map from '../components/Map'

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <Router history={history}>
        <div className="root-container">
          <Switch>
            <Route exact path='/' >
              <Fragment>
                <Header />
                <Map />                
              </Fragment>
            </Route>
          </Switch>
        </div>
      </Router>
    </PersistGate>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired
}

export default Root
