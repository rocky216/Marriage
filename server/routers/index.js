var express = require("express");
var router = express.Router()
import controller from "../app/index"
var auth = require("../utils/auth").auth
var upload = require("./uploadConf")


function setRouter(passport){
  router.post("/login", controller.HomeController.Login)  //登录
  router.post("/getUserList", controller.HomeController.getUserList)  //获取用户列表
  router.post("/getAreaInfo", controller.HomeController.getAreaInfo)  //获取省市三级联动
  router.post("/uploadImg", upload.single('avatar'), controller.HomeController.uploadImg)  //上传图片
  router.post("/addUser", controller.HomeController.addUser)  //添加用户
  return router
}



module.exports = setRouter