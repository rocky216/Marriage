"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.verfiyMobile = verfiyMobile;
exports.writeInto = writeInto;
exports.readFileToArr = readFileToArr;
exports.isPush = isPush;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var readline = require("readline");
var path = require("path");

var logintextPath = path.join(__dirname, "login.txt");

function verfiyMobile(str) {
  var reg = /^1[345678]\d{9}$/;
  return reg.test(str);
}

function writeInto(arr) {
  var data = fs.writeFileSync(logintextPath, '');
  _.each(arr, function (item, index) {
    var enter = index == 0 ? '' : '\r\n';
    var str = '';
    for (var attr in item) {
      str = attr + ':' + item[attr];
    }
    fs.appendFile(logintextPath, enter + str, function (err) {
      //+JSON.stringify(item)
      if (err) throw err;
    });
  });
}

function readFileToArr(callback) {
  var fRead = fs.createReadStream(logintextPath);
  var objReadline = readline.createInterface({
    input: fRead
  });
  var arr = new Array();
  objReadline.on('line', function (line) {
    arr.push(line);
    //console.log('line:'+ line);
  });
  objReadline.on('close', function () {
    // console.log(arr);
    var myArr = [];
    _.each(arr, function (item, attr) {
      var newArr = item.split(":");
      var newObj = (0, _defineProperty3.default)({}, newArr[0], newArr[1]);
      myArr.push(newObj);
    });

    callback(myArr);
  });
}

function isPush(id, token) {
  return new _promise2.default(function (resolve, reject) {
    readFileToArr(function (arr) {
      if (arr.length == 0) {}
      _.each(arr, function (item, index) {
        if (!item.hasOwnProperty(id)) {
          resolve(true);
          return;
        } else {
          if (item[id] == token) {
            resolve(true);
            return;
          } else {
            reject(false);
            return;
          }
        }
      });
    });
  });
}