import React from "react";
import "./App.css";

import Home from "./pages/Home";

const lightTheme = {
  light: "#FFFFFF",
  mid: "#89898D",
  dark: "#F2F2F7",
  darkest: "#000000",
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
  return (
    <React.Fragment>
      <Home dark={darkTheme} light={lightTheme} />
    </React.Fragment>
  );
}

export default App;
