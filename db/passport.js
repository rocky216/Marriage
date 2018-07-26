var mysql = require("mysql");
var dbconfig = require("./database")
var connection = mysql.createConnection(dbconfig.connection)
var bcrypt = require("bcrypt-nodejs")
var LocalStrategy   = require('passport-local').Strategy;

// var hash = bcrypt.hashSync("bacon");

module.exports = function(passport){
  
  passport.use(
    "local-login",
    new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    }, function(req, username, password, done){
      return done(null);
    })
  )

}
