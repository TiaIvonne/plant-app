var express = require("express");
var router = express.Router();
var User = require("../model/Users.js");
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
