import React, { useState } from "react";
import Checkbox from "../Checkbox";
import TodoSection from "../TodoSection";

import "./TodoPanel.css";

export default function TodoPanel({ loading, todos, theme }) {
  const [value, setValue] = useState("");

  function createTodo() {
    setValue("");
  }

  return (
    <>
      <form className={`todo-section add-form ${theme === "dark" ? "todo-section-dark" : ""}`}>
        <Checkbox add={true} onClick={createTodo} theme={theme} />
        <label htmlFor="todo" className="todo-label">
          Todo:
        </label>
        <input
          type="text"
          placeholder="Create a new todo..."
          className={`todo-input ${theme === "dark" ? "todo-input-dark" : ""}`}
          id="todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <ul className="todos">
        {!loading ? (
          todos.todos.map((todo, index) => {
            return <TodoSection todo={todo} theme={theme} key={index} borderRadius={index === 0} />;
          })
        ) : (
          <p>Loading</p>
        )}
        <div className={`todos-filter ${theme === "dark" ? "todos-filter-dark" : ""}`}></div>
      </ul>
    </>
  );
}
