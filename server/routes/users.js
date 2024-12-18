const express = require("express");
const router = express.Router();
const cors = require("cors");
const cryptoJS = require("crypto-js");
require("dotenv").config();
const { randomUUID } = require("crypto");

router.use(cors());

router.post("/add", (req, res) => {
  const { firstName, lastName, userName, userEmail, userPassword } = req.body;
  const userId = randomUUID();

  const cryptoPassWord = cryptoJS
    .HmacSHA256(userPassword, process.env.SALT_KEY)
    .toString();

  const sql =
    "INSERT into users (userId, userName, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
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

    const sql = `SELECT * FROM users WHERE userId = ?`;
    const values = [userId];

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
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const cryptoPassWord = cryptoJS
    .HmacSHA256(userPassword, process.env.SALT_KEY)
    .toString();

  connection.connect((err) => {
    if (err) {
      return res.status(500).json({ error: "Server error while login" });
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [userEmail, cryptoPassWord];

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

router.put("/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const { password } = req.body;

  const cryptoPassWord = cryptoJS
    .HmacSHA256(password, process.env.SALT_KEY)
    .toString();

  const sql = `UPDATE users SET password = ? WHERE userId = ?`;
  const values = [cryptoPassWord, userId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user password:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password uppdated successfully" });
  });
});

module.exports = router;
