import {
  USER_ACTION_LOADER
} from "actions/homeAction"


const stateInitial = {
  spending: true
}

export default function(state = stateInitial, action){
  switch (action.type) {
    case USER_ACTION_LOADER:
      return Object.assign({},state, action, {spending: false})
    default:
      return  state
  }
}
