import React, { useState } from "react";
import Checkbox from "../Checkbox";

import "./TodoPanel.css";

export function TodoSection({ theme, children, className }) {
  return <div className={`todo-section ${theme === "dark" ? "todo-section-dark" : ""}`}>{children}</div>;
}

export default function TodoPanel({ loading, todos, theme }) {
  const [value, setValue] = useState("");

  function createTodo() {}

  return (
    <>
      <form className={`todo-section ${theme === "dark" ? "todo-section-dark" : ""}`}>
        <Checkbox add={true} onClick={createTodo} theme={theme} />
        <label htmlFor="todo" className="todo-label">
          Todo:
        </label>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="todo-input"
          id="todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
}
