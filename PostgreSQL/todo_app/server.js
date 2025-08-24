const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = 5000;

// database connection (using postgres superuser for now)
const pool = new Pool({
  user: "postgres", // default user
  host: "localhost",
  database: "todo_app", // your db name
  password: "root", // the one you set when installing postgres
  port: 5432,
});

// middlewares
app.use(cors());
app.use(express.json());

// --- CRD ROUTES ---

// READ: get all todos
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
});

// CREATE: add new todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.json(result.rows[0]);
});

// DELETE: delete by id
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.json({ success: true });
});

// start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
