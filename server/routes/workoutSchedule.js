const express = require("express");
const router = express.Router();
const cors = require("cors");
const verifyToken = require("../middleware/verifyToken");
const axios = require("axios");

router.use(cors());

router.get("/:userId", verifyToken, (req, res) => {
  const userId = req.params.userId;
  console.log(req.user);

  const sql = "SELECT * FROM workout_schedule WHERE userId = ?";
  const value = [userId];

  connection.query(sql, value, (err, result) => {
    if (err) throw err;

    if (Object.keys(result).length === 0) {
      res.status(404).json({ message: "No workout for the userId found" });
    } else {
      res.json(result);
    }
  });
});

router.post("/create", verifyToken, (req, res) => {
  const { userId, workoutDetails } = req.body;

  const sql =
    "INSERT into workout_schedule (userId, workoutDetails) VALUES ( ?, ? )";
  const values = [userId, JSON.stringify(workoutDetails)];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;

    let sql = `SELECT * FROM workout_schedule WHERE userId = ?`;
    let values = [userId];

    connection.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Could not find any workout based on userId" + userId,
        });
      }

      res.status(201).json(result);
    });
  });
});

router.post("/generate-workout", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: req.body.messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from OpenAI:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/update/:userId", verifyToken, (req, res) => {
  const userId = req.params.userId;
  const { workoutDetails } = req.body;

  const sql = `UPDATE workout_schedule SET workoutDetails = ? WHERE userId = ?`;
  const values = [JSON.stringify(workoutDetails), userId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Uppdated successfully" });
  });
});

module.exports = router;
