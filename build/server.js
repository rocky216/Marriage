"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");
var express = require("express");
var webpack = require("webpack");
var WebpackDevMiddle = require("webpack-dev-middleware");
var WebpackHotMiddle = require("webpack-hot-middleware");
var webpackConfig = require("../webpack.config");
var dotenv = require("dotenv").config();
var passport = require("passport");
var session = require("express-session");
var bodyparser = require("body-parser");
var flash = require('connect-flash');


require("./db/model");
global._ = _lodash2.default;

var app = express();
var compiler = webpack(webpackConfig);
var staticPath = path.join(__dirname, "../dist");
app.use(express.static(staticPath));

app.use(WebpackDevMiddle(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true //显示不同的颜色区分打包的文件
  }
}));
app.use(WebpackHotMiddle(compiler));

//设置模板
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

//设置post请求
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//seesion设置
app.use(session({
  secret: "secret:",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 设置 session 的有效时间，单位毫秒
  }
}));

require("./db/passport")(passport);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(require("./routers/index")(passport));

app.get("*", function (req, res) {
  res.render('index');
});

// app.get("/", (req, res)=>{
//   res.render("home/index",{})
// })
// app.get("/login", (req, res)=>{
//   res.render("login/index",{})
// })

app.listen(process.env.PORT, function (err) {
  if (!err) {
    console.log("localhost:" + process.env.PORT);
  }
});