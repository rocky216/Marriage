import {fetch} from "utils"

export const USER_ACTION_LOADER = "USER_ACTION_LOADER"


export function addUser(payload){
  return async function(dispatch, getState){
    const options = {
      url: "/addUser",
      method: "post",
      data:payload
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_LOADER,
      userList: data
    })
  }
}

export function getUserList(payload){
  return async function(dispatch, getState){
    const options = {
      url: "/getUserList",
      method: "post",
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_LOADER,
      userList: data
    })
  }
}

export function getAreaInfo(payload){
  return async function(dispatch, getState){
    const options = {
      url: "/getAreaInfo",
      method: "post",
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_LOADER,
      areaList: data
    })
  }
}
