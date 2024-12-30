const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("../middleware/verifyToken");

router.use(cors());

router.get("/:userId", verifyToken, (req, res) => {
  const userId = req.params.userId;

  const sql = `SELECT * FROM profile_settings WHERE userId = ?`;
  const value = [userId];

  connection.query(sql, value, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    if (Object.keys(result).length === 0) {
      res.status(404).json({ message: "No settings where found" });
    } else {
      res.json(result);
    }
  });
});

router.post("/add", verifyToken, (req, res) => {
  const { userId, age, gender, weight, height, healthIssues, physicsLevel } =
    req.body;

  const sql = `INSERT into profile_settings (userId, age, gender, weight, height, healthIssues, physicsLevel) VALUES ( ?, ?, ?, ?, ?, ?, ?) `;
  const values = [
    userId,
    age,
    gender,
    weight,
    height,
    healthIssues,
    physicsLevel,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    let sql = `SELECT * FROM profile_settings WHERE userId = ?`;
    let values = [userId];

    connection.query(sql, values, (err, result) => {
      if (err) console.log(err);

      res.status(201).json(result);
    });
  });
});

router.put("/update/:userId", verifyToken, (req, res) => {
  const userId = req.params.userId;
  const { age, gender, weight, height, healthIssues, physicsLevel } = req.body;

  const sql = `UPDATE profile_settings SET age = ?, gender = ?, weight = ?, height = ?, healthIssues = ?, physicsLevel = ? WHERE userId = ?`;
  const values = [
    age,
    gender,
    weight,
    height,
    healthIssues,
    physicsLevel,
    userId,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user profile:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Users profile not found" });
    }

    res.json({ message: "Uppdated successfully" });
  });
});

module.exports = router;
