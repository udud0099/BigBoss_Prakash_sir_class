"use client"; // make this a client component

import { useState, useEffect } from "react";

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const API_URL = "/api/todos";

  // fetch all todos from backend
  const loadTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  // add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    loadTodos();
  };

  // delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
    loadTodos();
  };

  // load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>My Todos</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
