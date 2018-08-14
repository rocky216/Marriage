"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.dataIntial = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var auth = exports.auth = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var dataIntial, token, isVerify, id, ispush;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //token 是否合格

            dataIntial = {
              status: -1,
              msg: "token参数错误！",
              res: null
            };
            token = req.body.token;
            _context.prev = 2;
            _context.next = 5;
            return verifyToken(token);

          case 5:
            isVerify = _context.sent;
            id = isVerify.id;
            _context.prev = 7;
            _context.next = 10;
            return (0, _index.isPush)(id, token);

          case 10:
            ispush = _context.sent;

            next();
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);

            dataIntial.msg = "你的账号在别处登录！";
            dataIntial.status = -1;
            res.json(dataIntial);

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context["catch"](2);

            res.json(dataIntial);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 21], [7, 14]]);
  }));

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPassword = createPassword;
exports.verifyPassword = verifyPassword;
exports.setToken = setToken;
exports.verifyToken = verifyToken;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _nodePhpPassword = require("node-php-password");

var _nodePhpPassword2 = _interopRequireDefault(_nodePhpPassword);

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataIntial = exports.dataIntial = {
  status: -1,
  msg: "token参数错误！",
  res: null
};

function createPassword(pwd) {
  //生成hash密码
  return _nodePhpPassword2.default.hash(pwd, "PASSWORD_BCRYPT", { cost: 12 });
}

function verifyPassword(pwd, hash) {
  //判断hash密码
  return _nodePhpPassword2.default.verify(pwd, hash);
}

function setToken(userInfo) {
  return _jsonwebtoken2.default.sign(userInfo, process.env.CERT_KEY, { expiresIn: '10h' });
}

function verifyToken(token) {
  token = token ? token : "";
  return new _promise2.default(function (resolve, reject) {
    _jsonwebtoken2.default.verify(token, process.env.CERT_KEY, function (err, decoded) {
      err ? reject(err) : resolve(decoded);
    });
  });
}