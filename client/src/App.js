import React, { useState, useEffect } from "react";

import Home from "./pages/Home";
const lightTheme = {
  contrast: "#3CA7D1",
  alternateContrast:"#B5E6FA",
  base: "#fff",
  text: "#000",
  alternateText: "#686464",
  buttonText: "#fff"
};

const darkTheme = {
  contrast: "#45297d",
  alternateContrast:"#a981f7",
  base: "#fff",
  text: "#000",
  alternateText: "#686464",
  buttonText: "#fff"
};

function App() {
  // true = dark || false = light
  const [theme, setTheme] = useState(false);
  const colour = theme ? darkTheme : lightTheme;

  useEffect(() => {
    const bg = document.body;
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    } else {
      let currentTheme = localStorage.getItem("theme");
      if (currentTheme === "dark") {
        setTheme(true);
        bg.classList.remove("light");
        bg.classList.add("dark");
      }
      if (currentTheme === "light") {
        setTheme(false);
        bg.classList.remove("dark");
        bg.classList.add("light");
      }
    }
  }, []);

  function changeHandler() {
    const bg = document.body;
    if (theme) {
      setTheme(false);
      bg.classList.remove("dark");
      bg.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    if (!theme) {
      setTheme(true);
      bg.classList.remove("light");
      bg.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <React.Fragment>
      <Home theme={theme} changeHandler={changeHandler} colour={colour} />
    </React.Fragment>
  );
}

export default App;
