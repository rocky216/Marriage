import {
  USER_ACTION_LOADER,
  HOME_ACTION_COMPLETE
} from "actions/homeAction"


const stateInitial = {
  spending: true
}

export default function(state = stateInitial, action){
  switch (action.type) {
    case HOME_ACTION_COMPLETE:
      return Object.assign({},state, action, {spending: false})
    case USER_ACTION_LOADER:
      return Object.assign({},state, action, {spending: true})
    default:
      return  state
  }
}
