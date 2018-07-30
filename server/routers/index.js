var express = require("express");
var router = express.Router()
import controller from "../app/index"
var auth = require("../utils/auth").auth

function setRouter(passport){
  router.post("/login", controller.HomeController.Login)  //登录
  router.post("/getUserList", controller.HomeController.getUserList)  //获取用户列表
  router.post("/getProvince", controller.HomeController.getAreaInfo)  //获取省
  return router
}



module.exports = setRouter
