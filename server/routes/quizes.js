// quiz.js

const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Route to add a quiz
router.post("/add", (req, res) => {
  const { quizName } = req.body;
  const dateTime = new Date().toLocaleDateString();
  console.log(req.body);

  pool.query(
    "INSERT INTO quizes(quizName, dateTime) VALUES ($1, $2) RETURNING id",
    [quizName, dateTime],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: "Quiz added successfully", id: result.rows[0].id });
    }
  );
});

// Route to update a quiz
router.post("/update", (req, res) => {
  const { quizName, id } = req.body;

  pool.query(
    "UPDATE quizes SET quizName = $1 WHERE id = $2",
    [quizName, id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({
        message: "Quiz updated successfully",
        rowsAffected: result.rowCount,
      });
    }
  );
});

// Route to delete a quiz
router.post("/delete", (req, res) => {
  const { id } = req;

  pool.query("DELETE FROM quizes WHERE id = ?", [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({
      message: "Quiz deleted successfully",
      rowsAffected: result.rowCount,
    });
  });
});

// Route to retrieve all quizzes
router.get("/retrieve", (req, res) => {
  pool.query("SELECT * FROM quizes", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ quizzes: result.rows });
  });
});

module.exports = router;