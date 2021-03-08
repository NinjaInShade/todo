import React, { useState } from "react";
import Checkbox from "./Checkbox";
import deleteIcon from "../assets/icon-cross.svg";

import "./TodoSection.css";

export default function TodoSection({ todos, setTodos, todo, theme, borderRadius }) {
  const [hovered, setHovered] = useState(false);

  function completeTodo() {
    const updated_todos = { todos: [...todos.todos] };
    const existing_todo_index = todos.todos.findIndex((todoState) => todoState._id === todo._id);

    fetch(`${process.env.REACT_APP_API_URL}/${todo._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        updated_todos.todos[existing_todo_index].completed = data.todo.completed;

        setTodos(updated_todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTodo() {
    const updated_todos = todos.todos.filter((todoState) => todoState._id !== todo._id);

    fetch(`${process.env.REACT_APP_API_URL}/${todo._id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos((prevState) => ({ ...prevState, todos: updated_todos }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <li
      className={`todo-section  ${theme === "dark" ? "todo-section-dark" : ""} ${borderRadius ? "todo-radius" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Checkbox add={false} onClick={completeTodo} theme={theme} active={todo.completed} />
      <p
        className={`todo-title ${theme === "dark" ? "todo-title-dark" : ""} ${todo.completed ? "todo-completed" : ""} ${
          todo.completed && theme === "dark" ? "todo-completed-dark" : ""
        }`}
      >
        {todo.title}
      </p>
      <button className={`delete-todo ${hovered ? "delete-todo-hovered" : ""}`} arialabelledby="Delete todo" onClick={deleteTodo}>
        <img src={deleteIcon} alt="Delete todo icon" />
      </button>
    </li>
  );
}
