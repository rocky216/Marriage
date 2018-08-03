export const HOME_ACTION_LOADER = 'HOME_ACTION_LOADER'
export const HOME_ACTION_COMPLETE = 'HOME_ACTION_COMPLETE'
import {fetch} from "utils"



export function getAdmin(params){
  return async function(dispatch, getState){
    dispatch({type: HOME_ACTION_LOADER})
    const options = {
      url: "/getAdmin",
      method: "post"
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: HOME_ACTION_COMPLETE,
        getAdmin: data
      })

    } catch (e) {
      console.log(e);
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
    }
  }
}
