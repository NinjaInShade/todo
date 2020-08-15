import React, { useState } from "react";
import "./App.css";

import Home from "./pages/Home";

const lightTheme = {
  light: "#000000",
  mid: "#89898D",
  dark: "#c9c9c9",
  darkest: "#c2c2c2",
  contrast: "#3B82F7",
};

const darkTheme = {
  light: "#FFFFFF",
  mid: "#c9c9c9",
  dark: "#808080",
  darkest: "#1C1C1D",
  contrast: "#3B82F7",
};

function App() {
  // true = dark || false = light
  const [theme, setTheme] = useState(false);

  function changeHandler() {
    const bg = document.body;
    if (theme) {
      bg.classList.remove("dark");
      bg.classList.add("light");
    }
    if (!theme) {
      bg.classList.remove("light");
      bg.classList.add("dark");
    }
    setTheme(!theme);
  }

  return (
    <React.Fragment>
      <Home dark={darkTheme} light={lightTheme} theme={theme} changeHandler={changeHandler} />
    </React.Fragment>
  );
}

export default App;
