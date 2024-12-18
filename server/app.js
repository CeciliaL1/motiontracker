const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const connection = require("./lib/conn.js");

const usersRouter = require("./routes/users.js");
const workoutSchedule = require("./routes/workoutSchedule.js");
const profileSettings = require("./routes/profileSettings.js");

const app = express();

connection.connect(function (err) {
  if (err) throw err;
  else console.log(`Connected to the database ${process.env.DATABASE_NAME}`);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/workout", workoutSchedule);
app.use("/api/profile", profileSettings);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
