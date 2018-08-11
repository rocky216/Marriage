import {Member, MemberInfo, MemberIntegral, MemberIntegralRecode} from "../../db/model"
import HomeController from "./HomeController"
import {verfiyMobile} from "../../utils/index"
import {setToken, verifyToken, createPassword, verifyPassword} from "../../utils/auth"
import areaData from "../areaData"

class SmallProContrller {
  constructor() {

  }

  async updateAll(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {
      token,
      username,sex,age,signature,
      education,salary,address,imgs
    } = req.body
    try {
      var user = await verifyToken(token)

      var base = await Member.update({username,sex,age,signature},{
        where: {id: user.id}
      })
      
      var detail = await MemberInfo.update({education,salary,address,imgs},{
        where: {member_id: user.id}
      })

      dataIntial.res = {token, base, detail, imgs}
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async getAllDetail(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {token} = req.body
    try {
      var user = await verifyToken(token)
      var base = await Member.findOne({
        where: {id: user.id}
      })
      var detail = await MemberInfo.findOne({
        where: {member_id: user.id}
      })
      dataIntial.res = {base, detail}
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async seeBeauty(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {token, integral, see_id} = req.body
    try {
      let user = await verifyToken(token)

      let totalInteral =await MemberIntegral.findOne({where: {member_id: user.id}})

      var count = parseFloat(totalInteral.integral)-parseFloat(integral)
      var data = await MemberIntegral.update({
        integral: count
      },{
        where: {member_id: user.id}
      })

      var create = await MemberIntegralRecode.create({
        member_id: user.id,
        integral: integral,
        type: 1,
        status: 2
      })
      var member = await Member.findOne({
        where:{id: user.id},
        attributes:["see_ids"]
      })
      var arr = member.see_ids?member.see_ids.split(','):[]
      arr.push(see_id)

      var updateSeeids = await Member.update({see_ids: arr.join()},{
        where: {id: user.id}
      })
      dataIntial.res = updateSeeids
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async getIntegral(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {token} = req.body
    try {
      var user = await verifyToken(token)
      var data = await MemberIntegral.findOne({where: {member_id: user.id}})
      dataIntial.res = data
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }

  }

  async updateUser(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {username, mobile, headimg, token} = req.body
    var user = await verifyToken(token)
    try {
      var data = await Member.update({
        username, mobile, headimg
      },{
        where: {id: user.id}
      })
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async getUserInfo(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {token} = req.body
    try {
      var info = await verifyToken(token)
      var id = info.id
      try {
        var base = await Member.findOne({
          where: {id},
          attributes: ["id","username", "mobile", "headimg"]
        })
        // var detail = await MemberInfo.findOne({where: {member_id: id}})
        dataIntial.res = base
        res.json(dataIntial)
      } catch (e) {
        dataIntial.status= 0
        dataIntial.msg = "token参数错误！"
        res.json(dataIntial)
      }
    } catch (e) {
      dataIntial.status= 0
      dataIntial.msg = "token参数错误！"
      res.json(dataIntial)
    }

  }

  async getDetail(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {id} = req.body
    try {
      var base = await Member.findOne({where: {id}})
      var detail = await MemberInfo.findOne({where: {member_id: id}})
      dataIntial.res = {base,detail}
      res.json(dataIntial)
    } catch (e) {
      dataIntial.status = 0
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async getMarrList(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    let {sex, token} = req.body
    let user = await verifyToken(token)
    try {
      let seeIds = await Member.findOne({
        where: {id: user.id},
        attributes: ["see_ids"]
      })
      let cond = sex==undefined?{is_marriage: 1}:{is_marriage: 1, sex}
      try {
        var data = await Member.findAll({where: cond})

        dataIntial.res = {marriageList: data, seeIds: seeIds.see_ids}
        res.json(dataIntial)
      } catch (e) {
        dataIntial.status=0;
        dataIntial.msg = "请求失败！"
        res.json(dataIntial)
      }

    } catch (e) {
      dataIntial.status=0;
      dataIntial.msg = "请求失败！"
      res.json(dataIntial)
    }
  }

  async login(req, res){
    var dataIntial={
      status: 1,
      msg: "请求成功",
      res: null
    }
    var {mobile, password} = req.body
    if (!verfiyMobile(mobile)) {
      dataIntial.status=0
      dataIntial.msg="手机号码格式不正确！"
      res.json(dataIntial)
      return
    }

    try {
      var checkMobile = await Member.findOne({
        where: {mobile}
      })

      if (!verifyPassword(password,checkMobile.password)) {
        dataIntial.status=0
        dataIntial.msg="手机号或密码错误！"
        res.json(dataIntial)
      }else {
        let token = setToken({id: checkMobile.id})
        dataIntial.res={
          stoken: token
        }
        res.json(dataIntial)
      }

    } catch (e) {
      dataIntial.status=0
      dataIntial.msg="手机号或密码错误！"
      res.json(dataIntial)
    }
  }

}

export default new SmallProContrller()
