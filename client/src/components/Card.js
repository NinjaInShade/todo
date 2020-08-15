import React from "react";
import "./Card.css";

export default function Card(props) {
  // eslint-disable-next-line
  const { w, h, title, children, todo, colour } = props;

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
      {todo && <hr className="my-5" style={{ color: colour === "dark" ? colour.dark : colour.light }} />}
    </div>
  );
}
