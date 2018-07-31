import React from "react"
import axios from "./http"
import qs from "qs"
import {notification, Icon} from "antd"

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
    message: type?"操作成功！":"操作失败！",
    description: msg?msg:'',
    icon:type?<Icon type="smile-o" style={{ color: '#108ee9' }} />:<Icon type="frown-o" style={{ color: '#108ee9' }} />,
    style:{
      width: 300
    }
  });
}

export function fetch(opt){

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
      }else {
        notificate(false)
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
