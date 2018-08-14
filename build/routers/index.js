"use strict";

var _index = require("../app/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();

var auth = require("../utils/auth").auth;
var upload = require("./uploadConf");

function setRouter(passport) {
  router.post("/login", _index2.default.HomeController.Login); //登录
  router.post("/getUserList", auth, _index2.default.HomeController.getUserList); //获取用户列表
  router.post("/getAreaInfo", auth, _index2.default.HomeController.getAreaInfo); //获取省市三级联动
  router.post("/uploadImg", upload.single('avatar'), _index2.default.HomeController.uploadImg); //上传图片
  router.post("/addUser", auth, _index2.default.HomeController.addUser); //添加用户
  router.post("/getEduSal", auth, _index2.default.HomeController.getEduSal); //获取薪资/学历
  router.post("/getAdmin", auth, _index2.default.HomeController.getAdmin);
  router.post("/deleteUser", auth, _index2.default.HomeController.deleteUser);
  router.post("/getUserDetail", auth, _index2.default.HomeController.getUserDetail);
  router.post("/editUser", auth, _index2.default.HomeController.editUser); //用户信息编辑
  router.post("/addBanner", auth, _index2.default.HomeController.addBanner);
  router.post("/getBannerList", auth, _index2.default.HomeController.getBannerList);
  router.post("/deleteBanner", auth, _index2.default.HomeController.deleteBanner);

  /* 小程序接口 */

  router.post("/Api/login", _index2.default.SmallProController.login); //用户信息编辑
  router.post("/Api/getMarrList", auth, _index2.default.SmallProController.getMarrList); //用户信息编辑
  router.post("/Api/getBannerList", auth, _index2.default.HomeController.getBannerList); //获取banner
  router.post("/Api/getDetail", auth, _index2.default.SmallProController.getDetail); //获取详情
  router.post("/Api/getUserInfo", auth, _index2.default.SmallProController.getUserInfo);
  router.post("/Api/updateUser", auth, _index2.default.SmallProController.updateUser);
  router.post("/Api/getIntegral", auth, _index2.default.SmallProController.getIntegral);
  router.post("/Api/seeBeauty", auth, _index2.default.SmallProController.seeBeauty);
  router.post("/Api/getAllDetail", auth, _index2.default.SmallProController.getAllDetail);
  router.post("/Api/updateAll", auth, _index2.default.SmallProController.updateAll);

  return router;
}

module.exports = setRouter;