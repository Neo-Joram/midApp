const express = require("express");
const pool = require("./connection");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    password VARCHAR,
    role VARCHAR
  );

  CREATE TABLE IF NOT EXISTS quizes (
    id SERIAL PRIMARY KEY,
    quizName VARCHAR,
    dateTime VARCHAR
  );

  CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    quizId INTEGER REFERENCES quizes(id),
    question VARCHAR
  );

  CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    questionId INTEGER REFERENCES questions(id),
    answer VARCHAR,
    isCorrect VARCHAR
  );

  CREATE TABLE IF NOT EXISTS attempts (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    quizId INTEGER REFERENCES quizes(id),
    marks INTEGER
  );
`;

const truncateQuery =
  "DROP TABLE attempts; DROP TABLE answers; DROP TABLE questions; DROP TABLE quizes;";
const viewTablesQuery =
  "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'";

async function createTables() {
  try {
    const client = await pool.connect();
    await client.query(truncateQuery);
    await client.query(createTablesQuery);
    const result = await client.query(viewTablesQuery);
    result.rows.forEach((row) => {
      console.log(row.table_name);
    });
    client.release();
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}
createTables();

app.use("/quiz", require("./routes/quizes"));
app.use("/questions", require("./routes/questions"));
app.use("/answers", require("./routes/answers"));
app.use("/attempts", require("./routes/attempts"));

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to this server" });
});

app.get("/clear", (req, res) => {
  createTables();
  res.send({ msg: "Cleared" });
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
