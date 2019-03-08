/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * route display a home page
 */

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
