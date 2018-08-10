export const HOME_ACTION_LOADER = 'HOME_ACTION_LOADER'
export const HOME_ACTION_COMPLETE = 'HOME_ACTION_COMPLETE'
import {fetch} from "utils"

export function deleteBanner(params, next){
  return async function(dispatch, getState){
    dispatch({type: HOME_ACTION_LOADER})
    const options = {
      url: "/deleteBanner",
      method: "post",
      data: params
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
      next()
    } catch (e) {
      console.log(e);
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
    }
  }
}

export function getBannerList(params, next){
  return async function(dispatch, getState){
    dispatch({type: HOME_ACTION_LOADER})
    const options = {
      url: "/getBannerList",
      method: "post"
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: HOME_ACTION_COMPLETE,
        bannerList: data
      })
    } catch (e) {
      console.log(e);
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
    }
  }
}

export function addBanner(params, next){
  return async function(dispatch, getState){
    dispatch({type: HOME_ACTION_LOADER})
    const options = {
      url: "/addBanner",
      method: "post",
      data:params
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
      next()
    } catch (e) {
      console.log(e);
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
    }
  }
}

export function getSmallLogin(params){
  return async function(dispatch, getState){
    dispatch({type: HOME_ACTION_LOADER})
    const options = {
      url: "/Api/login",
      method: "post",
      data: {
        aa: "aa"
      }
    }
    try {
      let data = await fetch(options)
      dispatch({
        type: HOME_ACTION_COMPLETE
      })

    } catch (e) {
      console.log(e);
      dispatch({
        type: HOME_ACTION_COMPLETE
      })
    }
  }
}

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
