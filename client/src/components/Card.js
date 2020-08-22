import React, { useState } from "react";
import "./Card.css";

import Button from "./Button";
import Modal from "./Modal";

export default function Card(props) {
  const { w, h, title, children, todo, colour, id } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const buttons = (
    <div>
      <Button text="Edit" onClick={editHandler} />
      <Button text="Delete" onClick={deleteHandler} />
      <Button text="Complete!" onClick={completeHandler} />
    </div>
  );

  function editHandler() {
    setShowEdit(true);
  }

  async function deleteHandler() {
    setShowDelete(true);
  }

  async function completeHandler() {
    setShowComplete(true);
  }

  return (
    <React.Fragment>
      {showEdit && <Modal id={id} type="edit" close={setShowEdit} />}
      {showDelete && <Modal id={id} type="delete" close={setShowDelete} />}
      {showComplete && <Modal id={id} type="complete!" close={setShowComplete} />}
      <div className={todo ? "mx-auto rounded my-5 py-3 px-3 cardContainer" : "mx-auto rounded py-3 px-3 cardContainer customH"} style={{ width: w, height: h ? h : "auto", backgroundColor: colour.darkest }}>
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
    </React.Fragment>
  );
}
