import React, { useState } from "react";
import Checkbox from "../Checkbox";
import TodoSection from "../TodoSection";
import LoadingSpinner from "../LoadingSpinner";

import "./TodoPanel.css";

export default function TodoPanel({ loading, setTodos, todos, theme }) {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("All");

  let itemsLeft;

  if (!loading) {
    itemsLeft = todos.todos.filter((todoState) => todoState.completed === false).length;
  }

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

  function clearCompleted(e) {
    e.preventDefault();
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
        {loading && (
          <div className={`loading ${theme === "dark" ? "loading-dark" : ""}`}>
            <LoadingSpinner theme={theme} />
          </div>
        )}
        {!loading &&
          todos.todos.map((todo, index) => {
            return <TodoSection todo={todo} theme={theme} key={index} borderRadius={index === 0} todos={todos} setTodos={setTodos} />;
          })}
        <div className={`todos-filter ${theme === "dark" ? "todos-filter-dark" : ""}`}>
          <p className={`todo-items ${theme === "dark" ? "todo-items-dark" : ""}`}>{itemsLeft} items left</p>
          <div className="filters-container">
            <button onClick={() => setFilter("All")}>
              {" "}
              <p className={`todo-filter ${theme === "dark" ? "todo-filter-dark" : ""} ${filter === "All" ? "todo-filter-active" : ""}`}>All</p>
            </button>
            <button onClick={() => setFilter("Active")}>
              <p className={`todo-filter ${theme === "dark" ? "todo-filter-dark" : ""} ${filter === "Active" ? "todo-filter-active" : ""}`}>Active</p>
            </button>
            <button onClick={() => setFilter("Completed")}>
              <p className={`todo-filter ${theme === "dark" ? "todo-filter-dark" : ""} ${filter === "Completed" ? "todo-filter-active" : ""}`}>
                Completed
              </p>
            </button>
          </div>
          <button onClick={(e) => clearCompleted(e)}>
            <p className={`todo-clear ${theme === "dark" ? "todo-clear-dark" : ""}`}>Clear Completed</p>
          </button>
        </div>
      </ul>
    </>
  );
}
