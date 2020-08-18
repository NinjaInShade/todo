import React from "react";
import "./Card.css";

import Button from "./Button";

export default function Card(props) {
  // eslint-disable-next-line
  const { w, h, title, children, todo, colour } = props;
  const buttons = (
    <div>
      <Button text="Edit" onClick={editHandler} />
      <Button text="Delete" onClick={deleteHandler} />
      <Button text="Complete!" onClick={completeHandler} />
    </div>
  );

  function editHandler() {
    console.log("edited");
  }

  function deleteHandler() {
    console.log("deleted");
  }

  function completeHandler() {
    console.log("completed");
  }

  return (
    <div className={todo ? "mx-auto rounded my-5 py-3 px-3 cardContainer" : "mx-auto rounded py-3 px-3 cardContainer"} style={{ width: w, height: h ? h : "auto", backgroundColor: colour.darkest }}>
      {todo ? (
        <h2 className="pb-3" style={{ color: colour.light }}>
          {title}
        </h2>
      ) : (
        title
      )}
      {todo ? <p style={{ color: colour === "dark" ? colour.mid : colour.light }}>{children}</p> : children}
      {todo && <hr className="mt-5 mb-4" style={{ color: colour === "dark" ? colour.dark : colour.light }} />}
      {todo && buttons}
    </div>
  );
}
