import React from "react"

export default [
  {
    title: "标题",
    dataIndex: "title"
  },
  {
    title: "图片",
    dataIndex: "save_path",
    render(text){
      return <img style={{width: "100px", height: "100px"}} src={text}/>
    }
  },
  {
    title: "链接地址",
    dataIndex: "url"
  }
]
