"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _db = require("../../db/db");

var _model = require("../../db/model");

var _nodePhpPassword = require("node-php-password");

var _nodePhpPassword2 = _interopRequireDefault(_nodePhpPassword);

var _auth = require("../../utils/auth");

var _areaData = require("../areaData");

var _areaData2 = _interopRequireDefault(_areaData);

var _index = require("../../utils/index");

var _dataBase = require("../dataBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");
var http = require('http');

var HomeController = function () {
  function HomeController() {
    (0, _classCallCheck3.default)(this, HomeController);

    this.name = "name";
  }

  (0, _createClass3.default)(HomeController, [{
    key: "deleteBanner",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var dataIntial, id, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                id = req.body.id;
                _context.prev = 2;
                _context.next = 5;
                return _model.Banner.destroy({ where: { id: id } });

              case 5:
                data = _context.sent;

                console.log(id, 999);
                dataIntial.res = data;
                res.json(dataIntial);
                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
      }));

      function deleteBanner(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return deleteBanner;
    }()
  }, {
    key: "getBannerList",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var dataIntial, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _context2.prev = 1;
                _context2.next = 4;
                return _model.Banner.findAll({ where: { is_marriage: 1 } });

              case 4:
                data = _context2.sent;

                dataIntial.res = data;
                res.json(dataIntial);
                _context2.next = 14;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function getBannerList(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getBannerList;
    }()
  }, {
    key: "addBanner",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var dataIntial, _req$body, title, save_path, url, data;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body = req.body, title = _req$body.title, save_path = _req$body.save_path, url = _req$body.url;
                _context3.prev = 2;
                _context3.next = 5;
                return _model.Banner.create({ title: title, save_path: save_path, url: url, is_marriage: 1 });

              case 5:
                data = _context3.sent;

                dataIntial.res = data;
                res.json(dataIntial);
                _context3.next = 15;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function addBanner(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return addBanner;
    }()
  }, {
    key: "editUser",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var dataIntial, _req$body2, id, mobile, username, age, birthday, headimg, nickname, sex, signature, idcard, address, description, education, integral, salary, imgs, base;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body2 = req.body, id = _req$body2.id, mobile = _req$body2.mobile, username = _req$body2.username, age = _req$body2.age, birthday = _req$body2.birthday, headimg = _req$body2.headimg, nickname = _req$body2.nickname, sex = _req$body2.sex, signature = _req$body2.signature, idcard = _req$body2.idcard, address = _req$body2.address, description = _req$body2.description, education = _req$body2.education, integral = _req$body2.integral, salary = _req$body2.salary, imgs = _req$body2.imgs;

                console.log(req.body);
                _context4.prev = 3;
                _context4.next = 6;
                return _model.Member.update({
                  mobile: mobile, username: username, age: age, birthday: birthday, headimg: headimg, nickname: nickname, sex: sex, signature: signature, idcard: idcard, integral: integral
                }, {
                  where: { id: id }
                });

              case 6:
                base = _context4.sent;
                _context4.prev = 7;
                _context4.next = 10;
                return _model.MemberInfo.update({
                  address: address, description: description, education: education, integral: integral, salary: salary, imgs: imgs
                }, {
                  where: { member_id: id }
                });

              case 10:
                base = _context4.sent;

                res.json(dataIntial);
                _context4.next = 20;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](7);

                console.log(2);
                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 20:
                _context4.next = 28;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t1 = _context4["catch"](3);

                console.log(1);
                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 22], [7, 14]]);
      }));

      function editUser(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return editUser;
    }()
  }, {
    key: "getUserDetail",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var dataIntial, id, base, member_id, detail;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                id = req.body.id;
                _context5.prev = 2;
                _context5.next = 5;
                return _model.Member.findOne({ where: { id: id } });

              case 5:
                base = _context5.sent;
                member_id = base.id;
                _context5.prev = 7;
                _context5.next = 10;
                return _model.MemberInfo.findOne({ where: { member_id: member_id } });

              case 10:
                detail = _context5.sent;

                dataIntial.res = { base: base, detail: detail };
                res.json(dataIntial);
                _context5.next = 19;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](7);

                dataIntial.res = { base: base, detail: '' };
                res.json(dataIntial);

              case 19:
                _context5.next = 26;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t1 = _context5["catch"](2);

                dataIntial.msg = "请求失败！";
                dataIntial.status = 0;
                res.json(dataIntial);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 21], [7, 15]]);
      }));

      function getUserDetail(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getUserDetail;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var dataIntial, id, member;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                id = req.body.id;

                try {
                  member = _model.Member.update({
                    is_del: 1
                  }, { where: { id: id } });

                  console.log(member, 666);
                  res.json(dataIntial);
                } catch (e) {
                  dataIntial.status = 0;
                  dataIntial.msg = "请求失败！";
                  res.json(dataIntial);
                }

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteUser(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "getAdmin",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var token, dataIntial, dataId, data;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                token = req.body.token;
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _context7.prev = 2;
                _context7.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                dataId = _context7.sent;
                _context7.prev = 6;
                _context7.next = 9;
                return _model.Member.findOne({
                  where: { id: dataId.id },
                  attributes: ["username"]
                });

              case 9:
                data = _context7.sent;

                dataIntial.res = data;
                res.json(dataIntial);
                _context7.next = 18;
                break;

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](6);

                dataIntial.status = 0, dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 18:
                _context7.next = 25;
                break;

              case 20:
                _context7.prev = 20;
                _context7.t1 = _context7["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "token参数错误!";
                res.json(dataIntial);

              case 25:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 20], [6, 14]]);
      }));

      function getAdmin(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getAdmin;
    }()
  }, {
    key: "getEduSal",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var dataIntial;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };

                dataIntial.res = { salary: _dataBase.salary, education: _dataBase.education };
                res.json(dataIntial);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getEduSal(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return getEduSal;
    }()
  }, {
    key: "addUser",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var dataIntial, _req$body3, age, area, birthday, city, headimg, mobile, nickname, province, sex, username, password, description, address, integral, imgs, education, salary, isExist, memberData, member_id, memberInfo;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body3 = req.body, age = _req$body3.age, area = _req$body3.area, birthday = _req$body3.birthday, city = _req$body3.city, headimg = _req$body3.headimg, mobile = _req$body3.mobile, nickname = _req$body3.nickname, province = _req$body3.province, sex = _req$body3.sex, username = _req$body3.username, password = _req$body3.password, description = _req$body3.description, address = _req$body3.address, integral = _req$body3.integral, imgs = _req$body3.imgs, education = _req$body3.education, salary = _req$body3.salary;

                if ((0, _index.verfiyMobile)(mobile)) {
                  _context9.next = 7;
                  break;
                }

                dataIntial.status = 0;
                dataIntial.msg = "手机号码格式不正确！";
                res.json(dataIntial);
                return _context9.abrupt("return");

              case 7:
                _context9.next = 9;
                return _model.Member.findOne({ where: { mobile: mobile } });

              case 9:
                isExist = _context9.sent;

                if (isExist) {
                  _context9.next = 37;
                  break;
                }

                password = password ? (0, _auth.createPassword)(password) : (0, _auth.createPassword)('123456');
                _context9.prev = 12;
                _context9.next = 15;
                return _model.Member.create({
                  age: age, area: area, birthday: birthday, city: city, headimg: headimg, mobile: mobile, nickname: nickname, province: province, sex: sex, username: username, password: password, is_marriage: 1, integral: integral
                });

              case 15:
                memberData = _context9.sent;
                member_id = memberData.id;
                _context9.prev = 17;
                _context9.next = 20;
                return _model.MemberInfo.create({
                  member_id: member_id, description: description, address: address, integral: integral, imgs: imgs, education: education, salary: salary
                });

              case 20:
                memberInfo = _context9.sent;

                dataIntial.res = memberInfo;
                res.json(dataIntial);
                _context9.next = 29;
                break;

              case 25:
                _context9.prev = 25;
                _context9.t0 = _context9["catch"](17);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！", res.json(dataIntial);

              case 29:
                _context9.next = 35;
                break;

              case 31:
                _context9.prev = 31;
                _context9.t1 = _context9["catch"](12);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！", res.json(dataIntial);

              case 35:
                _context9.next = 39;
                break;

              case 37:
                dataIntial.status = 0;
                dataIntial.msg = "手机号已存在！", res.json(dataIntial);

              case 39:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[12, 31], [17, 25]]);
      }));

      function addUser(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "uploadImg",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res, next) {
        var arr, type;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                //单图上传
                arr = req.file.originalname.split(".");
                type = arr[arr.length - 1];

                res.json({
                  path: process.env.HOST + "/Uploads/" + req.file.filename
                });

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function uploadImg(_x19, _x20, _x21) {
        return _ref10.apply(this, arguments);
      }

      return uploadImg;
    }()
  }, {
    key: "getAreaInfo",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
        var dataIntial, arr;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                //获取省市区三级联动
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                arr = [];


                _.each(_areaData2.default.provinces, function (item, index) {
                  var obj1 = {
                    value: index,
                    label: item.name,
                    children: []
                  };
                  _.each(item.citys, function (elem, i) {
                    var obj2 = {
                      value: i,
                      label: elem.name,
                      children: []
                    };
                    _.each(elem.countys, function (citem, cindex) {
                      var obj3 = {
                        value: cindex,
                        label: citem.name
                      };
                      obj2.children.push(obj3);
                    });
                    obj1.children.push(obj2);
                  });
                  arr.push(obj1);
                });
                dataIntial.res = arr;
                res.json(dataIntial);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getAreaInfo(_x22, _x23) {
        return _ref11.apply(this, arguments);
      }

      return getAreaInfo;
    }()
  }, {
    key: "getUserList",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
        var dataIntial, data;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _context12.next = 3;
                return _model.Member.findAll({
                  where: { is_del: 0, is_marriage: 1 }
                });

              case 3:
                data = _context12.sent;

                if (data) {
                  dataIntial.res = data;
                }
                res.json(dataIntial);

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getUserList(_x24, _x25) {
        return _ref12.apply(this, arguments);
      }

      return getUserList;
    }()

    // 登录获取token

  }, {
    key: "Login",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
        var dataIntial, _req$body4, username, password, data, token, keyId;

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                  // dataIntial.res = createPassword('admin')
                  //
                  // res.json(dataIntial)
                  // return
                  // var pwd = Password.hash("xb921214", "PASSWORD_BCRYPT", {cost: 12})
                };
                _req$body4 = req.body, username = _req$body4.username, password = _req$body4.password;
                _context13.next = 4;
                return _model.Member.findOne({
                  where: { username: username },
                  attributes: ['id', 'password']
                });

              case 4:
                data = _context13.sent;

                if (data) {
                  _context13.next = 10;
                  break;
                }

                dataIntial.status = 0;
                dataIntial.msg = "用户名不存在！";
                res.json(dataIntial);
                return _context13.abrupt("return");

              case 10:
                if ((0, _auth.verifyPassword)(password, data.password)) {
                  _context13.next = 15;
                  break;
                }

                dataIntial.status = 0;
                dataIntial.msg = "密码不正确！";
                res.json(dataIntial);
                return _context13.abrupt("return");

              case 15:
                token = (0, _auth.setToken)({
                  id: data.id
                });
                keyId = data.id.toString();

                (0, _index.readFileToArr)(function (arr) {
                  if (arr.length == 0) {
                    arr.push((0, _defineProperty3.default)({}, keyId, token));
                    (0, _index.writeInto)(arr);
                    return;
                  }
                  var newArr = [];
                  _.each(arr, function (item, index) {
                    if (item.hasOwnProperty(keyId)) {
                      item[keyId] = token;
                    }
                    newArr.push(item);
                  });
                  (0, _index.writeInto)(newArr);
                });
                dataIntial.res = { token: token };
                res.json(dataIntial);

              case 20:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function Login(_x26, _x27) {
        return _ref13.apply(this, arguments);
      }

      return Login;
    }()
  }]);
  return HomeController;
}();

exports.default = new HomeController();