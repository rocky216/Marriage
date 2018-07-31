var path = require("path")
import {Operation, add} from "../../db/db"
import Password from "node-php-password"
import {setToken, verifyToken} from "../../utils/auth"
import areaData from "../areaData"




class HomeController {
  constructor() {

  }

  async addUser(req, res){
    var body = req.body
    var mobileSql = findById('sr_member', body.mobile)
    Operation()

    var sql = add('sr_member', req.body)
    res.json({
      sql:sql
    })
  }

  async uploadImg(req, res, next){ //单图上传
    var arr = req.file.originalname.split(".")
    var type = arr[arr.length-1]
    res.json({
      path: `/Uploads/${req.file.filename}`
    })
  }

  async getAreaInfo(req, res){  //获取省市区三级联动
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var arr=[]

    _.each(areaData.provinces, (item, index)=>{
      var obj1 = {
        value: index,
        label: item.name,
        children:[]
      }
      _.each(item.citys, (elem, i)=>{
        var obj2 = {
          value: i,
          label: elem.name,
          children: []
        }
        _.each(elem.countys, (citem, cindex)=>{
          var obj3 = {
            value: cindex,
            label: citem.name
          }
          obj2.children.push(obj3)
        })
        obj1.children.push(obj2)
      })
      arr.push(obj1)
    })
    dataIntial.res = arr
    res.json(dataIntial)
  }

  async getUserList(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var data = await Operation(`select * from sr_member`)
    if (data) {
      dataIntial.res = data
    }
    res.json(dataIntial)
  }

  // 登录获取token
  async Login(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    // var pwd = Password.hash("xb921214", "PASSWORD_BCRYPT", {cost: 12})
    let body = req.body
    var data = await Operation(`select * from sr_member where mobile=${body.mobile}`)
    data = data[0]

    if (!data ) {
      dataIntial.status="0"
      dataIntial.msg = "用户名或密码错误!"
    }else {
      var token = setToken({userid: data.id})
      req.session[token] = data.id
      dataIntial.res=token
    }

    res.json(dataIntial)
  }
}

export default new HomeController()
