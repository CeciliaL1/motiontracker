const express = require("express");
const router = express.Router();
const cors = require("cors");
const cryptoJS = require("crypto-js");
require("dotenv").config();
const { randomUUID } = require("crypto");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

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
      if (err) {
        return res.status(400).json({ message: "Login unavalible" });
      }

      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign(
          {
            id: user.userId,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        const refreshToken = generateRefreshToken();
        const updateQuery =
          "UPDATE users SET refreshToken = ? WHERE userId = ?";
        const updateValues = [refreshToken, user.userId];

        connection.query(updateQuery, updateValues, (err, updateResult) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error saving refresh token" });
          }
          const {
            password,
            active,
            refreshToken,
            resetToken,
            resetTokenExpires,
            ...userData
          } = user;

          res.json({
            user: userData,
            token,
            refreshToken,
          });
        });
      } else {
        return res.json({ message: "Wrong email or password." });
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
