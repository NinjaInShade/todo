import React, { useState } from "react";
import checkedIcon from "../assets/icon-check.svg";

import "./Checkbox.css";

export default function Checkbox({ onClick, add, theme, active }) {
  const [checked, setChecked] = useState(active);

  function toggleCheckbox(e) {
    e.preventDefault();

    // Toggle checked state (if we're adding a todo we want to show checked state for a tiny bit)
    setChecked(!checked);

    if (add) {
      setTimeout(() => {
        setChecked(false);
      }, 100);
    }

    // Run external onClick function (create or complete the todo)
    onClick();
  }

  return (
    <div className="checkbox-container">
      <button
        className={`custom-checkbox ${theme === "dark" ? "custom-checkbox-dark" : ""}`}
        onClick={(e) => toggleCheckbox(e)}
        aria-labelledby={add ? "Create new todo" : "Complete todo"}
        type="submit"
        style={checked || active ? { background: "var(--primary-check-background)", border: "none", padding: "5px 7px" } : {}}
      >
        <img src={checkedIcon} alt="checkbox checked icon" style={checked ? {} : { visibility: "hidden" }} />
      </button>
    </div>
  );
}
