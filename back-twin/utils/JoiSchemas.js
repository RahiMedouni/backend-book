const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(8).max(30).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password1: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  password2: Joi.ref("password1"),
}).with("password1", "password2");

const signinSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const verifySignupRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestBody function");

  let result = signupSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const verifySigninRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestBody function");

  let result = signinSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const signupWriterSchema = Joi.object({
  writername: Joi.string().alphanum().min(8).max(30).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password1: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  password2: Joi.ref("password1"),
}).with("password1", "password2");

const signinWriterSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const verifySignupWriterRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestWriterBody function");

  let result = signupWriterSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const verifySigninWriterRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestWriterBody function");

  let result = signinWriterSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const signupAdminSchema = Joi.object({
  adminname: Joi.string().alphanum().min(8).max(30).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  task: Joi.string().required(),
  password1: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  password2: Joi.ref("password1"),
}).with("password1", "password2");

const signinAdminSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const verifySignupAdminRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestAdminBody function");

  let result = signupAdminSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const verifySigninAdminRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestAdminBody function");

  let result = signinAdminSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

module.exports = {
  signupSchema,
  signinSchema,
  verifySignupRequestBody,
  verifySigninRequestBody,
  signupWriterSchema,
  signinWriterSchema,
  verifySignupWriterRequestBody,
  verifySigninWriterRequestBody,
  signupAdminSchema,
  signinAdminSchema,
  verifySignupAdminRequestBody,
  verifySigninAdminRequestBody,
};
