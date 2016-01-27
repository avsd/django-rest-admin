import React from 'react';
import ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'

import reducers from './modules/reducers.js'
import django_apps from './routes/django_apps/index.js'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Middlewares
const loggerMiddleware = createLogger()
const reduxRouterMiddleware = syncHistory(browserHistory)

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,  // Sync dispatched route actions to the history
  thunkMiddleware,        // lets us dispatch() functions
  loggerMiddleware        // neat middleware that logs actions
)(createStore)

const store = createStoreWithMiddleware(reducer)

document.addEventListener("DOMContentLoaded", function(event) { 
    ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/rest_admin/">
            <IndexRoute component={django_apps.Apps} />
          </Route>
        </Router>
    </Provider>,
    document.getElementById('content')
    )
});
