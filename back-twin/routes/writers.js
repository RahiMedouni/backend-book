var express = require("express");
var router = express.Router();
const Writer = require("../model/writer");
const { is } = require("express/lib/request");
const {
  verifySignupWriterRequestBody,
  verifySigninWriterRequestBody,
} = require("../utils/JoiSchemas");
var jwt = require("jsonwebtoken");
const WritersController = require("../controllers/WriterssController");
const { verifyProfileWriter } = require("../controllers/WritersController");

/* GET users listing. */
router.post(
  "/signupWriter",
  verifySignupWriterRequestBody,
  WritersController.signupWriter
);
router.post(
  "/signinWriter",
  verifySigninWriterRequestBody,
  WritersController.signinWriter
);
router.post(
  "/profileWriter",
  verifyProfileWriter,
  WritersController.profileWriter
);

module.exports = router;
