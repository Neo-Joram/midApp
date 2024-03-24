// attempts.js

const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Route to add an attempt
router.post("/add", (req, res) => {
  const { userId, quizId, marks } = req.body;

  pool.query(
    "INSERT INTO attempts(userId, quizId, marks) VALUES ($1, $2, $3)",
    [userId, quizId, marks],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: "Attempt added successfully", id: result.insertId });
    }
  );
});

// Route to retrieve attempts by user ID
router.get("/retrieve/:userId", (req, res) => {
  const userId = req.params.userId;

  pool.query(
    "SELECT * FROM attempts WHERE userId = $1 ORDER BY id DESC",
    [userId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ attempts: result.rows });
    }
  );
});

module.exports = router;
