import React from "react"

export default [
  {
    title: "姓名",
    dataIndex: "username"
  },
  {
    title: "手机号",
    dataIndex: "mobile"
  },{
    title: "性别",
    dataIndex: "sex",
    render(text){
      return <span>{parseInt(text)?"男":"女"}</span>
    }
  }
]
