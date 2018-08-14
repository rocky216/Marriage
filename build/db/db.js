'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.Operation = Operation;
exports.findById = findById;
exports.add = add;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql');
var dbconfig = require("./database");
var pool = mysql.createPool(dbconfig.connection);

function Operation(sql) {
  return new _promise2.default(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('与MySQL数据库建立连接失败！');
        reject(err);
        return;
      } else {
        connection.query(sql, function (err, result) {
          if (err) {
            reject(err);
            console.log('插入数据失败');
            connection.release(); // 释放连接池的连接，因为连接池默认最大连接数是10，如果点击数超过10 则不会与客户端连接，客户端的请求也会因为长时间无反应报错，下面会粘出报错的图
          } else {
            resolve(result);
            connection.release();
          }
        });
      }
    });
  });
}

function findById(table, id) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

  return 'select ' + field + ' from ' + table + ' where id= ' + id;
}

function add(table, json) {
  var arr1 = [],
      arr2 = [];

  _.each(json, function (item, attr) {
    arr1.push(attr);
    arr2.push("'" + item + "'");
  });
  var sql = 'insert into ' + table + ' (' + arr1.join() + ') values (' + arr2.join() + ')';
  return sql;
}
//
//
// export function update(table, array, array, id){
//
// }
//
//
// export function deleteById(table, id){
//
// }

exports.default = pool;