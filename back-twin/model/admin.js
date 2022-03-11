let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

let adminSchema = new Schema(
  {
    adminname: String,
    email: String,
    password: String,
    // role: {
    //   addBooks,
    //   acceptBooks,
    //   verifyWriters,
    // },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  var admin = this;

  // only hash the password if it has been modified (or is new)
  if (!admin.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(admin.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      admin.password = hash;
      next();
    });
  });
});

adminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
