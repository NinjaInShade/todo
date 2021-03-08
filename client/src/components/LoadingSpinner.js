import React from "react";

import "./LoadingSpinner.css";

export default function LoadingSpinner({ theme }) {
  return (
    <div className={`lds-roller ${theme === "dark" ? "lds-roller-dark" : ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
