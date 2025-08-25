import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "root",
  port: 5432,
});

// READ: GET all todos
export async function GET(req) {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return new Response(JSON.stringify(result.rows), {
    headers: { "Content-Type": "application/json" },
  });
}

// CREATE: POST new todo
export async function POST(req) {
  const body = await req.json();
  const { title } = body;

  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );

  return new Response(JSON.stringify(result.rows[0]), {
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE: DELETE a todo by id
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await pool.query("DELETE FROM todos WHERE id = $1", [id]);

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
