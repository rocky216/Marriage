var express = require("express");
var router = express.Router()
var controller = require("../app/index")
var auth = require("../utils/auth").auth

function setRouter(passport){
  router.post('/test', auth , controller.TestController.testSession)
  router.post("/login", controller.HomeController.Login)  //登录

  return router
}



module.exports = setRouter
