'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequelize = require("sequelize");
var _process$env = process.env,
    DB_DATABASE = _process$env.DB_DATABASE,
    DB_USER = _process$env.DB_USER,
    DB_PASS = _process$env.DB_PASS,
    DB_HOST = _process$env.DB_HOST;

var sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// 或者你可以简单地使用 uri 连接
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize.authenticate().then(function () {
  console.log('数据库链接成功！');
}).catch(function (err) {
  console.error('数据库链接失败！', err);
});

exports.default = sequelize;