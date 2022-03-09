var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var usersRouter = require("./routes/users");
var writersRouter = require("./routes/writers");
var adminsRouter = require("./routes/admins");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/virtualLibrary", function (error) {
  if (error) {
    console.log("error" + error);
  } else {
    console.log("open done");
  }
});

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

module.exports = app;
