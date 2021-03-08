import React, { useState, useEffect } from "react";
import Content from "../components/layout/Content";

import "./Home.css";

export default function Home({ theme, changeHandler }) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  // Load todo's from API
  useEffect(function () {
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTodos(data);
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <div className={`background ${theme === "dark" ? "background-dark" : ""}`}></div>
      <div className={`bottom ${theme === "dark" ? "bottom-dark" : ""}`}></div>
      <Content theme={theme} changeHandler={changeHandler} todos={todos} loading={loading} />
    </main>
  );
}
