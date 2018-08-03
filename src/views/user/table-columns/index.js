import React from "react"
import moment from "moment"

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
  },{
    title: "生日",
    dataIndex: "birthday",
    render(text){
      return <span>{moment(text).format("YYYY-MM-DD")}</span>
    }
  }
]
