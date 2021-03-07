import React, { useState, useEffect } from "react";

import Home from "./pages/Home";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Set default light theme for user's first load
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    } else {
      const currentTheme = localStorage.getItem("theme");

      if (currentTheme === "light") {
        return setTheme("light");
      }

      setTheme("dark");
    }
  }, []);

  function changeHandler() {
    if (theme === "light") {
      setTheme("dark");
      return localStorage.setItem("theme", "dark");
    }

    setTheme("light");
    localStorage.setItem("theme", "light");
  }

  return (
    <>
      <Home theme={theme} changeHandler={changeHandler} />
    </>
  );
}

export default App;
