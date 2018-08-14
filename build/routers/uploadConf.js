"use strict";

var path = require("path");
var multer = require('multer');
// var upload = multer({ dest: path.join(__dirname, "../../dist/Uploads") })
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../dist/Uploads"));
  },
  filename: function filename(req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

module.exports = upload;