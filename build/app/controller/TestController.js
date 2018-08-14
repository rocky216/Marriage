"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSyncTime() {
  return new _promise2.default(function (resolve, reject) {
    try {
      var startTime = new Date().getTime();
      setTimeout(function () {
        var endTime = new Date().getTime();
        var data = endTime - startTime;
        resolve(data);
      }, 2000);
    } catch (err) {
      reject(err);
    }
  });
}

var TestController = function () {
  function TestController() {
    (0, _classCallCheck3.default)(this, TestController);
  }

  (0, _createClass3.default)(TestController, [{
    key: "testSession",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                body = req.body;
                // var data = await getSyncTime()

                req.session.username = body.username;

                res.json({
                  aa: body.username
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testSession(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return testSession;
    }()
  }]);
  return TestController;
}();

module.exports = new TestController();