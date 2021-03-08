import React, { useState } from "react";
import Checkbox from "./Checkbox";
import deleteIcon from "../assets/icon-cross.svg";

import "./TodoSection.css";

export default function TodoSection({ todo, theme, borderRadius }) {
  const [hovered, setHovered] = useState(false);

  function completeTodo() {}

  function deleteTodo() {}

  return (
    <li
      className={`todo-section  ${theme === "dark" ? "todo-section-dark" : ""} ${borderRadius ? "todo-radius" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Checkbox add={false} onClick={completeTodo} theme={theme} />
      <p className={`todo-title ${theme === "dark" ? "todo-title-dark" : ""}`}>{todo.title}</p>
      {hovered && (
        <button className="delete-todo" arialabelledby="Delete todo" onClick={deleteTodo}>
          <img src={deleteIcon} alt="Delete todo icon" />
        </button>
      )}
    </li>
  );
}
