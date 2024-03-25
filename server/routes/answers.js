// answers.js

const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Route to retrieve all answers
router.get("/retrieve", (req, res) => {
  pool.query("SELECT * FROM answers order by id asc", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ answers: result.rows });
  });
});

// Route to delete an answer
router.delete("/delete", (req, res) => {
  const { id } = req.body;

  pool.query("DELETE FROM answers WHERE id = $1", [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({
      message: "Answer deleted successfully",
      rowsAffected: result.rowCount,
    });
  });
});

// Route to update an answer
router.put("/update", (req, res) => {
  const { answer, isCorrect, id } = req.body;

  pool.query(
    "UPDATE answers SET answer = $1, isCorrect = $2 WHERE id = $3",
    [answer, isCorrect, id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({
        message: "Answer updated successfully",
        rowsAffected: result.rowCount,
      });
    }
  );
});

// Route to add an answer
router.post("/add", (req, res) => {
  const { id, questionId, answer, isCorrect } = req.body;

  pool.query(
    "INSERT INTO answers(id, questionId, answer, isCorrect) VALUES ($1, $2, $3, $4)",
    [id, questionId, answer, isCorrect],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: "Answer added successfully", id: result.insertId });
    }
  );
});

module.exports = router;
