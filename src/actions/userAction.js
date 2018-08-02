import {fetch} from "utils"

export const USER_ACTION_LOADER = "USER_ACTION_LOADER"
export const USER_ACTION_COMPLETE = "USER_ACTION_COMPLETE"

export function getEduSal(payload){
  return async function(dispatch, getState){
    dispatch({type: USER_ACTION_LOADER})
    const options = {
      url: "/getEduSal",
      method: "post"
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: USER_ACTION_COMPLETE,
        salary: data.salary,
        education: data.education
      })

    } catch (e) {
      console.log(e);
      dispatch({
        type: USER_ACTION_COMPLETE
      })
    }
  }
}

export function login(payload, next){
  return async function(dispatch, getState){
    dispatch({type: USER_ACTION_LOADER})
    const options = {
      url: "/login",
      method: "post",
      data:payload
    }
    let data = await fetch(options)
    if (data) {
      next(data)
      dispatch({
        type: USER_ACTION_COMPLETE,
        loginInfo: data
      })
    }
  }
}

export function addUser(payload){
  return async function(dispatch, getState){
    dispatch({type: USER_ACTION_LOADER})
    const options = {
      url: "/addUser",
      method: "post",
      data:payload
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_COMPLETE,
      userList: data
    })
  }
}

export function getUserList(payload){
  return async function(dispatch, getState){
    dispatch({type: USER_ACTION_LOADER})
    const options = {
      url: "/getUserList",
      method: "post",
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_COMPLETE,
      userList: data
    })
  }
}

export function getAreaInfo(payload){
  return async function(dispatch, getState){
    dispatch({type: USER_ACTION_LOADER})
    const options = {
      url: "/getAreaInfo",
      method: "post",
    }
    let data = await fetch(options)
    dispatch({
      type: USER_ACTION_COMPLETE,
      areaList: data
    })
  }
}
