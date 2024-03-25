// questions.js

const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Route to retrieve all questions
router.get("/retrieve", (req, res) => {
  pool.query("SELECT * FROM questions order by id asc", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ questions: result.rows });
  });
});

// Route to delete a question
router.delete("/delete", (req, res) => {
  const { id } = req.body;

  pool.query("DELETE FROM questions WHERE id = $1", [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({
      message: "Question deleted successfully",
      rowsAffected: result.rowCount,
    });
  });
});

// Route to update a question
router.put("/update", (req, res) => {
  const { question, id } = req.body;

  pool.query(
    "UPDATE questions SET question = $1 WHERE id = $2",
    [question, id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({
        message: "Question updated successfully",
        rowsAffected: result.rowCount,
      });
    }
  );
});

// Route to add a question
router.post("/add", (req, res) => {
  const { id, selectedValue, question } = req.body;

  pool.query(
    "INSERT INTO questions(id, quizId, question) VALUES ($1, $2, $3)",
    [id, selectedValue, question],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: "Question added successfully", id: result.insertId });
    }
  );
});

module.exports = router;
