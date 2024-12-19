const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const { randomUUID } = require("crypto");

router.use(cors());

router.get("/:userId", (req, res) => {
  const userId = req.query.userId;

  const sql = "SELECT * FROM workout_schedule WHERE userId = ?";
  const value = [userId];

  connection.query(sql, value, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(204).json({ message: "No workout for the userId found" });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
