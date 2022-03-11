var express = require("express");
var router = express.Router();
const Admin = require("../model/admin");
const { is } = require("express/lib/request");
const {
  verifySignupAdminRequestBody,
  verifySigninAdminRequestBody,
} = require("../utils/JoiSchemas");
var jwt = require("jsonwebtoken");
const AdminsController = require("../controllers/AdminsController");
const { verifyProfileAdmin } = require("../controllers/AdminsController");

/* GET users listing. */
router.post(
  "/signupAdmin",
  verifySignupAdminRequestBody,
  AdminsController.signupAdmin
);
router.post(
  "/signinAdmin",
  verifySigninAdminRequestBody,
  AdminsController.signinAdmin
);
router.post("/profileAdmin", verifyProfileAdmin, AdminsController.profileAdmin);

module.exports = router;
