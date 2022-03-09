const Admin = require("../model/admin");
var jwt = require("jsonwebtoken");

module.exports = {
  signupAdmin: function (req, res, next) {
    let { email, adminname, password1, password2 } = req.body;

    let newAdmin = new Admin({
      adminname,
      email,
      password: password1,
    });
    // commit
    admin.findOne(
      { $or: [{ email: email }, { adminname: adminname }] },
      (err, doc) => {
        if (err) return res.status(500).json({ msg: "Database Error ! " });

        if (doc) {
          return res
            .status(400)
            .json({ msg: "Email Or Adminname Already Used" });
        } else {
          newAdmin.save((err, doc) => {
            if (err) {
              console.log("error saving new admin !");
            }
            //
            res.send("Signed up successfully !");
          });
        }
      }
    );
  },

  signinAdmin: function (req, res, next) {
    let { email, password } = req.body;

    Admin.findOne({ email }, (err, doc) => {
      if (err) return res.status(500).json({ msg: "Database Error" });

      if (doc) {
        doc.comparePassword(password, (err, isMatch) => {
          if (err) return res.status(401).json({ msg: "wrong password" });

          if (isMatch) {
            var token = jwt.sign({ _id: doc._id }, process.env.SECRET);
            return res
              .status(200)
              .json({ msg: "Welcome to hackers academy !", token });
          } else {
            return res.status(401).json({ msg: "Nice try hacker !" });
          }
        });
      } else {
        return res.status(400).json({ msg: "Email Not Found!" });
      }
    });
  },

  // verify a token symmetric
  verifyProfileAdmin: (req, res, next) => {
    jwt.verify(
      req.headers.authorization,
      process.env.SECRET,
      function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).json({ msg: "Nice try HACKER !" });
        }

        console.log(decoded);

        req.decoded = decoded;
        next();
      }
    );
  },

  profileAdmin: function (req, res, next) {
    console.log({ headers: req.headers });

    Admin.findOne({ _id: req.decoded._id }, (err, admin) => {
      console.log({ admin });

      return res.send({ ...admin._doc, password: null });
    });
  },
};
