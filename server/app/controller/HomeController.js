var path = require("path")
import {Operation, add} from "../../db/db"
import {Member, MemberInfo} from "../../db/model"
import Password from "node-php-password"
import {setToken, verifyToken, createPassword, verifyPassword} from "../../utils/auth"
import areaData from "../areaData"
import {writeInto, readFileToArr, verfiyMobile} from "../../utils/index"
import {salary, education} from "../dataBase"


class HomeController {
  constructor() {

  }

  async getUserDetail(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var {id} = req.body
    try {
      var base = await Member.findOne({where: {id}})
      var member_id = base.id
      try {
        var detail = await MemberInfo.findOne({where: {member_id: member_id}})
        dataIntial.res = {base, detail}
        res.json(dataIntial)
      } catch (e) {
        dataIntial.res = {base, detail: ''}
        res.json(dataIntial)
      }
    } catch (e) {
      dataIntial.msg = "请求失败！"
      dataIntial.status = 0
      res.json(dataIntial)
    }
  }

  async deleteUser(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var {id} = req.body
    try {
      var member = Member.update({
        is_del: 1
      },{where: {id}})
      console.log(member, 666);
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }

  }

  async getAdmin(req, res){
    var {token} = req.body

    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }

    try {
      var dataId = await verifyToken(token)

      try {
        var  data = await Member.findOne( {
          where: {id: dataId.id},
          attributes: ["username"]
        })
        dataIntial.res = data
        res.json(dataIntial)
      } catch (e) {
        dataIntial.status = 0,
        dataIntial.msg = "请求失败！"
        res.json(dataIntial)
      }

    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "token参数错误!"
      res.json(dataIntial)
    }

  }

  async getEduSal(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    dataIntial.res = {salary, education}
    res.json(dataIntial)
  }

  async addUser(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var {
      age, area, birthday, city, headimg, mobile, nickname, province, sex, username, password,
      description, address, integral, imgs, education, salary
    } = req.body

    if (!verfiyMobile(mobile)) {
      dataIntial.status = 0
      dataIntial.msg = "手机号码格式不正确！"
      res.json(dataIntial)
      return
    }

    var isExist = await Member.findOne({where: {mobile}})

    if (!isExist) {
      password = password?createPassword(password):createPassword('123456')
      try {
        var memberData = await Member.create({
          age, area, birthday, city, headimg, mobile, nickname, province, sex, username, password
        })
        var member_id = memberData.id
        try {
          var memberInfo = MemberInfo.create({
           member_id, description, address, integral, imgs, education, salary
          })
          dataIntial.res = memberInfo
          res.json(dataIntial)
        } catch (e) {
          dataIntial.status = 0
          dataIntial.msg = "请求失败！",
          res.json(dataIntial)
        }
      } catch (e) {
        dataIntial.status = 0
        dataIntial.msg = "请求失败！",
        res.json(dataIntial)
      }
    }else {
      dataIntial.status = 0
      dataIntial.msg = "手机号已存在！",
      res.json(dataIntial)
    }
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
    var data = await Member.findAll({
      where: {is_del: 0}
    })
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
    let {username, password} = req.body
    let data = await Member.findOne({
      where: {username: username},
      attributes: ['id','password']
    })
    if (!data) {
      dataIntial.status = 0
      dataIntial.msg = "用户名不存在！"
      res.json(dataIntial)
      return
    }
    if (!verifyPassword(password,data.password)) {
      dataIntial.status = 0
      dataIntial.msg = "密码不正确！"
      res.json(dataIntial)
      return
    }
    var token = setToken({
      id: data.id
    })
    var keyId = data.id.toString()
    readFileToArr((arr)=>{
      if (arr.length==0) {
        arr.push({[keyId]: token})
        writeInto(arr)
        return
      }
      var newArr=[]
      _.each(arr, (item, index)=>{
        if (item.hasOwnProperty(keyId)) {
          item[keyId] = token
        }
        newArr.push(item)
      })
      writeInto(newArr)
    })
    dataIntial.res = {token}
    res.json(dataIntial)
  }
}

export default new HomeController()
