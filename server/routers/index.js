var express = require("express");
var router = express.Router()
import controller from "../app/index"
var auth = require("../utils/auth").auth
var upload = require("./uploadConf")


function setRouter(passport){
  router.post("/login", controller.HomeController.Login)  //登录
  router.post("/getUserList", auth, controller.HomeController.getUserList)  //获取用户列表
  router.post("/getAreaInfo",auth, controller.HomeController.getAreaInfo)  //获取省市三级联动
  router.post("/uploadImg", upload.single('avatar'), controller.HomeController.uploadImg)  //上传图片
  router.post("/addUser",auth, controller.HomeController.addUser)  //添加用户
  router.post("/getEduSal",auth, controller.HomeController.getEduSal)  //获取薪资/学历
  router.post("/getAdmin",auth, controller.HomeController.getAdmin)
  router.post("/deleteUser",auth, controller.HomeController.deleteUser)
  router.post("/getUserDetail",auth, controller.HomeController.getUserDetail)
  router.post("/editUser",auth, controller.HomeController.editUser)  //用户信息编辑
  router.post("/addBanner",auth, controller.HomeController.addBanner)
  router.post("/getBannerList",auth, controller.HomeController.getBannerList)
  router.post("/deleteBanner",auth, controller.HomeController.deleteBanner)

  /* 小程序接口 */

  router.post("/Api/login", controller.SmallProController.login)  //用户信息编辑
  router.post("/Api/getMarrList", auth, controller.SmallProController.getMarrList)  //用户信息编辑
  router.post("/Api/getBannerList", auth, controller.HomeController.getBannerList)  //获取banner
  router.post("/Api/getDetail", auth, controller.SmallProController.getDetail)   //获取详情
  router.post("/Api/getUserInfo", auth, controller.SmallProController.getUserInfo)
  router.post("/Api/updateUser", auth, controller.SmallProController.updateUser)
  router.post("/Api/getIntegral", auth, controller.SmallProController.getIntegral)
  router.post("/Api/seeBeauty", auth, controller.SmallProController.seeBeauty)
  router.post("/Api/getAllDetail", auth, controller.SmallProController.getAllDetail)
  router.post("/Api/updateAll", auth, controller.SmallProController.updateAll)

  return router
}



module.exports = setRouter
