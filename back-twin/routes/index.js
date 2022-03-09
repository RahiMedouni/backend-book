var express = require("express");
var router = express.Router();
var path = require("path");
// let Add = require("../model/add");

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.sendFile(path.resolve("public", "index.html"));
});

router.get("/Books", function (req, res, next) {
  res.send("index users");
});

// router.post("/add_new_book", function (req, res, next) {
//   Add.findOne({ book_name: req.body.book_name }, (err, doc) => {
//     if (err) return res.json({ msg: "Error!" });

//     if (doc !== null) {
//       // there's a food with this food_name

//       Add.updateOne(
//         { book_name: req.body.book_name },
//         { book_type: req.body.book_type },
//         { number_of_pages: req.body.number_of_pages },
//         (err2, doc2) => {
//           if (err2) return res.json({ msg: "Error Updating book!!" });
//           else return res.json({ msg: "Success!" });
//         }
//       );
//     } else {
//       // we should create a food with this food_name
//       let newAdd = new Add({
//         book_name: req.body.book_name,
//         book_type: req.body.book_type,
//         number_of_pages: req.body.number_of_pages,
//       });

//       newAdd.save((err, doc) => {
//         if (err) return res.send("Error saving new book");

//         //console.log({doc});
//         return res.send("success!");
//       });
//     }
//   });
// });

module.exports = router;
