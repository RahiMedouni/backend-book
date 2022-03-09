const Writer = require("../model/writer");
var jwt = require("jsonwebtoken");

module.exports = {
  signupWriter: function (req, res, next) {
    let { email, writername, password1, password2 } = req.body;

    let newWriter = new Writer({
      writername,
      email,
      password: password1,
    });

    Writer.findOne(
      { $or: [{ email: email }, { writername: writername }] },
      (err, doc) => {
        if (err) return res.status(500).json({ msg: "Database Error ! " });

        if (doc) {
          return res
            .status(400)
            .json({ msg: "Email Or Writername Already Used" });
        } else {
          newWriter.save((err, doc) => {
            if (err) {
              console.log("error saving new writer !");
            }
            //
            res.send("Signed up successfully !");
          });
        }
      }
    );
  },

  signinWriter: function (req, res, next) {
    let { email, password } = req.body;

    Writer.findOne({ email }, (err, doc) => {
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
  verifyProfileWriter: (req, res, next) => {
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

  profileWriter: function (req, res, next) {
    console.log({ headers: req.headers });

    Writer.findOne({ _id: req.decoded._id }, (err, writer) => {
      console.log({ writer });

      return res.send({ ...writer._doc, password: null });
    });
  },
};
