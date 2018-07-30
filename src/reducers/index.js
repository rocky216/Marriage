import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import home from "./homeReducer"
import users from "./userReducer"


const reducers = combineReducers({
  routing:routerReducer,
  home,
  users
})

export default reducers
