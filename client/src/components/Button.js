import React from "react";

export default function Button(props) {
  const { text, onClick, submit, w, h } = props;

  return (
    <button type={submit ? "submit" : "button"} className={text.toLowerCase() === "delete" ? "btn btn-danger mx-2" : text.toLowerCase() === "complete!" ? "btn btn-success mx-2" : "btn btn-info mx-2"} onClick={onClick} style={{ width: w, height: h }}>
      {text}
    </button>
  );
}
