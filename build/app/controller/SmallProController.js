"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _model = require("../../db/model");

var _HomeController = require("./HomeController");

var _HomeController2 = _interopRequireDefault(_HomeController);

var _index = require("../../utils/index");

var _auth = require("../../utils/auth");

var _areaData = require("../areaData");

var _areaData2 = _interopRequireDefault(_areaData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmallProContrller = function () {
  function SmallProContrller() {
    (0, _classCallCheck3.default)(this, SmallProContrller);
  }

  (0, _createClass3.default)(SmallProContrller, [{
    key: "updateAll",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var dataIntial, _req$body, token, username, sex, age, signature, education, salary, address, imgs, user, base, detail;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body = req.body, token = _req$body.token, username = _req$body.username, sex = _req$body.sex, age = _req$body.age, signature = _req$body.signature, education = _req$body.education, salary = _req$body.salary, address = _req$body.address, imgs = _req$body.imgs;
                _context.prev = 2;
                _context.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                user = _context.sent;
                _context.next = 8;
                return _model.Member.update({ username: username, sex: sex, age: age, signature: signature }, {
                  where: { id: user.id }
                });

              case 8:
                base = _context.sent;
                _context.next = 11;
                return _model.MemberInfo.update({ education: education, salary: salary, address: address, imgs: imgs }, {
                  where: { member_id: user.id }
                });

              case 11:
                detail = _context.sent;


                dataIntial.res = { token: token, base: base, detail: detail, imgs: imgs };
                res.json(dataIntial);
                _context.next = 21;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 16]]);
      }));

      function updateAll(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return updateAll;
    }()
  }, {
    key: "getAllDetail",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var dataIntial, token, user, base, detail;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                token = req.body.token;
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                user = _context2.sent;
                _context2.next = 8;
                return _model.Member.findOne({
                  where: { id: user.id }
                });

              case 8:
                base = _context2.sent;
                _context2.next = 11;
                return _model.MemberInfo.findOne({
                  where: { member_id: user.id }
                });

              case 11:
                detail = _context2.sent;

                dataIntial.res = { base: base, detail: detail };
                res.json(dataIntial);
                _context2.next = 21;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 16]]);
      }));

      function getAllDetail(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getAllDetail;
    }()
  }, {
    key: "seeBeauty",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var dataIntial, _req$body2, token, integral, see_id, user, totalInteral, count, data, create, member, arr, updateSeeids;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body2 = req.body, token = _req$body2.token, integral = _req$body2.integral, see_id = _req$body2.see_id;
                _context3.prev = 2;
                _context3.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                user = _context3.sent;
                _context3.next = 8;
                return _model.MemberIntegral.findOne({ where: { member_id: user.id } });

              case 8:
                totalInteral = _context3.sent;
                count = parseFloat(totalInteral.integral) - parseFloat(integral);
                _context3.next = 12;
                return _model.MemberIntegral.update({
                  integral: count
                }, {
                  where: { member_id: user.id }
                });

              case 12:
                data = _context3.sent;
                _context3.next = 15;
                return _model.MemberIntegralRecode.create({
                  member_id: user.id,
                  integral: integral,
                  type: 1,
                  status: 2
                });

              case 15:
                create = _context3.sent;
                _context3.next = 18;
                return _model.Member.findOne({
                  where: { id: user.id },
                  attributes: ["see_ids"]
                });

              case 18:
                member = _context3.sent;
                arr = member.see_ids ? member.see_ids.split(',') : [];

                arr.push(see_id);

                _context3.next = 23;
                return _model.Member.update({ see_ids: arr.join() }, {
                  where: { id: user.id }
                });

              case 23:
                updateSeeids = _context3.sent;

                dataIntial.res = updateSeeids;
                res.json(dataIntial);
                _context3.next = 33;
                break;

              case 28:
                _context3.prev = 28;
                _context3.t0 = _context3["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 28]]);
      }));

      function seeBeauty(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return seeBeauty;
    }()
  }, {
    key: "getIntegral",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var dataIntial, token, user, data;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                token = req.body.token;
                _context4.prev = 2;
                _context4.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                user = _context4.sent;
                _context4.next = 8;
                return _model.MemberIntegral.findOne({ where: { member_id: user.id } });

              case 8:
                data = _context4.sent;

                dataIntial.res = data;
                res.json(dataIntial);
                _context4.next = 18;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 13]]);
      }));

      function getIntegral(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getIntegral;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var dataIntial, _req$body3, username, mobile, headimg, token, user, data;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body3 = req.body, username = _req$body3.username, mobile = _req$body3.mobile, headimg = _req$body3.headimg, token = _req$body3.token;
                _context5.next = 4;
                return (0, _auth.verifyToken)(token);

              case 4:
                user = _context5.sent;
                _context5.prev = 5;
                _context5.next = 8;
                return _model.Member.update({
                  username: username, mobile: mobile, headimg: headimg
                }, {
                  where: { id: user.id }
                });

              case 8:
                data = _context5.sent;

                res.json(dataIntial);
                _context5.next = 17;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](5);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 12]]);
      }));

      function updateUser(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var dataIntial, token, info, id, base;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                token = req.body.token;
                _context6.prev = 2;
                _context6.next = 5;
                return (0, _auth.verifyToken)(token);

              case 5:
                info = _context6.sent;
                id = info.id;
                _context6.prev = 7;
                _context6.next = 10;
                return _model.Member.findOne({
                  where: { id: id },
                  attributes: ["id", "username", "mobile", "headimg"]
                });

              case 10:
                base = _context6.sent;

                // var detail = await MemberInfo.findOne({where: {member_id: id}})
                dataIntial.res = base;
                res.json(dataIntial);
                _context6.next = 20;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](7);

                dataIntial.status = 0;
                dataIntial.msg = "token参数错误！";
                res.json(dataIntial);

              case 20:
                _context6.next = 27;
                break;

              case 22:
                _context6.prev = 22;
                _context6.t1 = _context6["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "token参数错误！";
                res.json(dataIntial);

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 22], [7, 15]]);
      }));

      function getUserInfo(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: "getDetail",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var dataIntial, id, base, detail;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                id = req.body.id;
                _context7.prev = 2;
                _context7.next = 5;
                return _model.Member.findOne({ where: { id: id } });

              case 5:
                base = _context7.sent;
                _context7.next = 8;
                return _model.MemberInfo.findOne({ where: { member_id: id } });

              case 8:
                detail = _context7.sent;

                dataIntial.res = { base: base, detail: detail };
                res.json(dataIntial);
                _context7.next = 18;
                break;

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](2);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 13]]);
      }));

      function getDetail(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getDetail;
    }()
  }, {
    key: "getMarrList",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var dataIntial, _req$body4, sex, token, user, seeIds, cond, data;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body4 = req.body, sex = _req$body4.sex, token = _req$body4.token;
                _context8.next = 4;
                return (0, _auth.verifyToken)(token);

              case 4:
                user = _context8.sent;
                _context8.prev = 5;
                _context8.next = 8;
                return _model.Member.findOne({
                  where: { id: user.id },
                  attributes: ["see_ids"]
                });

              case 8:
                seeIds = _context8.sent;
                cond = sex == undefined ? { is_marriage: 1 } : { is_marriage: 1, sex: sex };
                _context8.prev = 10;
                _context8.next = 13;
                return _model.Member.findAll({ where: cond });

              case 13:
                data = _context8.sent;


                dataIntial.res = { marriageList: data, seeIds: seeIds.see_ids };
                res.json(dataIntial);
                _context8.next = 23;
                break;

              case 18:
                _context8.prev = 18;
                _context8.t0 = _context8["catch"](10);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 23:
                _context8.next = 30;
                break;

              case 25:
                _context8.prev = 25;
                _context8.t1 = _context8["catch"](5);

                dataIntial.status = 0;
                dataIntial.msg = "请求失败！";
                res.json(dataIntial);

              case 30:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 25], [10, 18]]);
      }));

      function getMarrList(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return getMarrList;
    }()
  }, {
    key: "login",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var dataIntial, _req$body5, mobile, password, checkMobile, token;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dataIntial = {
                  status: 1,
                  msg: "请求成功",
                  res: null
                };
                _req$body5 = req.body, mobile = _req$body5.mobile, password = _req$body5.password;

                if ((0, _index.verfiyMobile)(mobile)) {
                  _context9.next = 7;
                  break;
                }

                dataIntial.status = 0;
                dataIntial.msg = "手机号码格式不正确！";
                res.json(dataIntial);
                return _context9.abrupt("return");

              case 7:
                _context9.prev = 7;
                _context9.next = 10;
                return _model.Member.findOne({
                  where: { mobile: mobile }
                });

              case 10:
                checkMobile = _context9.sent;


                if (!(0, _auth.verifyPassword)(password, checkMobile.password)) {
                  dataIntial.status = 0;
                  dataIntial.msg = "手机号或密码错误！";
                  res.json(dataIntial);
                } else {
                  token = (0, _auth.setToken)({ id: checkMobile.id });

                  dataIntial.res = {
                    stoken: token
                  };
                  res.json(dataIntial);
                }

                _context9.next = 19;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](7);

                dataIntial.status = 0;
                dataIntial.msg = "手机号或密码错误！";
                res.json(dataIntial);

              case 19:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[7, 14]]);
      }));

      function login(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return SmallProContrller;
}();

exports.default = new SmallProContrller();