import {createStore, applyMiddleware, compose} from "redux"
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'reducers'

const loggerMiddleware = createLogger()

const history = createHistory()
const middleware = [thunkMiddleware, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middleware));

function configureStore(preloadedState) {

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
  )
  return store
}

export default configureStore()
