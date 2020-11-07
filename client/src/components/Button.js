import React from "react";
import "./Button.css"

export default function Button(props) {
  const { children, onClick, submit, colour } = props;

  return (
    <button
      type={submit ? "submit" : "button"}
      className="add-todo-button"
      onClick={onClick}
      style={{backgroundColor: colour.contrast, color: colour.buttonText}}
    >
      {children}
    </button>
  );
}
