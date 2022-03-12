var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.send("welcome to express back end project");
});



module.exports = router;
