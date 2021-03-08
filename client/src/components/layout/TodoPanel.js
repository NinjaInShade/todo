import React, { useState } from "react";
import Checkbox from "../Checkbox";
import TodoSection from "../TodoSection";
import LoadingSpinner from "../LoadingSpinner";

import "./TodoPanel.css";

export default function TodoPanel({ loading, setTodos, todos, theme }) {
  const [value, setValue] = useState("");

  function createTodo() {
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setValue("");
        setTodos((prevState) => ({ ...prevState, todos: [...prevState.todos, data.todo] }));
      })
      .catch((err) => {
        console.log(err);
      });
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
            return <TodoSection todo={todo} theme={theme} key={index} borderRadius={index === 0} todos={todos} setTodos={setTodos} />;
          })
        ) : (
          <div className={`loading ${theme === "dark" ? "loading-dark" : ""}`}>
            <LoadingSpinner theme={theme} />
          </div>
        )}
        <div className={`todos-filter ${theme === "dark" ? "todos-filter-dark" : ""}`}></div>
      </ul>
    </>
  );
}
