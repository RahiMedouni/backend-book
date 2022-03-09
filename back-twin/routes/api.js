var express = require("express");
var router = express.Router();
var usersRouter = require("./users");
var writersRouter = require("./writers");
var adminsRouter = require("./admins");

/* GET users listing. */
router.use("/users", usersRouter);
router.use("/writers", writersRouter);
router.use("/admins", adminsRouter);

module.exports = router;
