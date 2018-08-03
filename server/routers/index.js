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
  return router
}



module.exports = setRouter
