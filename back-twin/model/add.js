let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let addSchema = new Schema(
  {
    book_name: String,
    book_type: String,
    number_of_pages: Number,
  },
  { timestamps: true }
);

const Add = mongoose.model("add", addSchema);

module.exports = Add;
