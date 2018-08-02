import {
  USER_ACTION_COMPLETE,
  USER_ACTION_LOADER
} from "actions/userAction"


const stateInitial = {
  spending: true
}

export default function(state = stateInitial, action){

  switch (action.type) {
    case USER_ACTION_LOADER:
      return Object.assign({},state, action, {spending: true})
    case USER_ACTION_COMPLETE:
      return Object.assign({},state, action, {spending: false})
    default:
      return  state
  }
}
