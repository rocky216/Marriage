import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from "react-redux"
import {applyMiddleware } from "redux"
import { Router, Route, browserHistory } from 'react-router'
import {syncHistoryWithStore} from "react-router-redux"
import _ from "lodash"
import store from "store"
import allRoutes from "routers"

window._ = _;



const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {allRoutes()}
    </Router>
  </Provider>,
  document.getElementById('root')
);
