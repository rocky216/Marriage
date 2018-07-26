var express = require("express")
var dotenv = require("dotenv").config()
var passport = require("passport")
var session = require("express-session")
var bodyparser = require("body-parser")
var flash = require('connect-flash');

var app = express()

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
  cookie : {
    maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
  }
}))

require("./db/passport")(passport)


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(require("./routers/index")(passport))

app.get("/", (req, res)=>{
  res.render("home/index",{})
})
app.get("/login", (req, res)=>{
  res.render("login/index",{})
})

app.listen(process.env.PORT, (err)=>{
  if (!err) {
    console.log(`localhost:${process.env.PORT}`);
  }
})
