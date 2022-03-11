let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

let writerSchema = new Schema(
  {
    writername: String,
    email: String,
    password: String,
    // role: {
    //   addBooks,
    // },
  },
  { timestamps: true }
);

writerSchema.pre("save", function (next) {
  var writer = this;

  // only hash the password if it has been modified (or is new)
  if (!writer.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(writer.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      writer.password = hash;
      next();
    });
  });
});

writerSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Writer = mongoose.model("writer", writerSchema);
module.exports = Writer;
