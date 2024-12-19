const express = require("express");
const router = express.Router();
const cors = require("cors");
let cryptoJS = require("crypto-js");
require("dotenv").config();
const { randomUUID } = require("crypto");

router.use(cors());

router.post("/add", (req, res) => {
  let { firstName, lastName, userName, userEmail, userPassword } = req.body;
  let userId = randomUUID();

  let cryptoPassWord = cryptoJS
    .HmacSHA256(userPassword, process.env.SALT_KEY)
    .toString();

  let sql =
    "INSERT into users (userId, userName, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?)";
  let values = [
    userId,
    userName,
    userEmail,
    cryptoPassWord,
    firstName,
    lastName,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: err.sqlMessage });
      }
      return res
        .status(500)
        .json({ message: "Server error while creating user" });
    }

    let sql = `SELECT * FROM users WHERE userId = ?`;
    let values = [userId];

    connection.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Get users not avalible" });
      }

      result.map((user) => {
        delete user.password;
      });

      res.status(201).json(result);
    });
  });
});

router.post("/login", (req, res) => {
  let { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let cryptoPassWord = cryptoJS
    .HmacSHA256(userPassword, process.env.SALT_KEY)
    .toString();

  connection.connect((err) => {
    if (err) {
      return res.status(500).json({ error: "Server error while login" });
    }

    let query = "SELECT * FROM users WHERE email = ? AND password = ?";
    let values = [userEmail, cryptoPassWord];

    connection.query(query, values, (err, result) => {
      console.log(result);
      if (err) {
        return res.status(400).json({ message: "Login unavalible" });
      }

      if (result.length > 0) {
        result.map((user) => {
          delete user.password;
        });
        res.json(result);
      } else {
        res.status(401).json({ message: "Wrong email or password." });
      }
    });
  });
});

module.exports = router;
