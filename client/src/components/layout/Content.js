import React from "react";
import TodoPanel from "./TodoPanel.js";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";

import "./Content.css";

export default function Content({ theme, changeHandler, todos, setTodos, loading }) {
  return (
    <section className="content-container">
      <header className="header">
        <h1 className="title">TODO</h1>
        <button className="change-theme" onClick={changeHandler} tabIndex="0" aria-labelledby="Change theme button">
          <img src={theme === "dark" ? sun : moon} alt="change theme icon" />
        </button>
      </header>
      <TodoPanel todos={todos} setTodos={setTodos} loading={loading} theme={theme} />
    </section>
  );
}
