"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HomeController = require("./controller/HomeController");

var _HomeController2 = _interopRequireDefault(_HomeController);

var _SmallProController = require("./controller/SmallProController");

var _SmallProController2 = _interopRequireDefault(_SmallProController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestController = require("./controller/TestController");

exports.default = {
  TestController: TestController,
  HomeController: _HomeController2.default,
  SmallProController: _SmallProController2.default
};