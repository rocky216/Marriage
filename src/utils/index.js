import React from "react"
import {browserHistory} from "react-router"
import axios from "./http"
import qs from "qs"
import {notification, Icon} from "antd"
import cookie from 'react-cookies'

export function getCookie(key){
  return cookie.load(key)
}

export function setCookie(key, value){
  const expires = new Date()
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
  cookie.save(
    key,
    value,
    {
      path: '/',
      expires: expires,
      maxAge: 1000,
      secure: false,
      httpOnly: false
    }
  )
}

export function addIndex(arr){
  var newArr =[]
  _.each(arr, (item, index)=>{
    item.key=index
    newArr.push(item)
  })
  return newArr
}

export function notificate(type=true, msg){
  notification.config({
    placement: 'topRight',
    top: 10,
    right: -30,
    duration: 3,
  });
  notification.open({
    message: type?"操作成功！":msg,
    icon:type?<Icon type="smile-o" style={{ color: '#108ee9' }} />:<Icon type="frown-o" style={{ color: '#108ee9' }} />,
    style:{
      width: 300
    }
  });
}

export function fetch(opt){
  if (!opt.data) {
    opt.data = {
      token: getCookie("stoken")?getCookie("stoken"):''
    }
  }else {
    opt.data.token = getCookie("stoken")?getCookie("stoken"):''
  }


  var setting = {
    url: opt.url,
    method: (opt.method?opt.method:'get').toLowerCase()
  }

  function prefix(method){

    return axios({
      url: setting.url,
      method: setting.method,
      [setting.method == 'get'?'params':'data']: qs.stringify(opt.data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
  }

  return new Promise((resolve, reject)=>{
    prefix(setting.method).then((response)=>{
      if (response.data.status==1) {
        resolve(response.data.res)
      }else if(response.data.status==-1 || response.data.status==-2){
        notificate(false, response.data.msg)
        browserHistory.push("/login")
      } else {
        notificate(false, response.data.msg)
      }

    }).catch((err)=>{
      console.log('%c','color:red', err);
    })
  })
  // prefix(setting.method).then((response)=>{
  //   if (response.data.status) {
  //     cb(response.data.res)
  //   }else {
  //     Toast(response.data.message);
  //   }
  // }).catch((err)=>{
  //   console.log('%c','color:red', err);
  // })

}
