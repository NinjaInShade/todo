import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

import CloseIcon from "../static/Close.svg";
import Button from "./Button";

export default function Modal(props) {
  const { type, id, close } = props;

  async function clickHandler() {
    if (type === "edit") {
    }
    if (type === "delete") {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}`, { method: "DELETE" });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "complete!") {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}`, { method: "DELETE" });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const content = (
    <React.Fragment>
      <div className="modalOverlay" onClick={() => close(false)}></div>
      <div className="modalContainer">
        <img src={CloseIcon} alt="close" className="modalClose" onClick={() => close(false)} />
        {type === "edit" && <h2 className="modalTitle">Fill in the form (any unchanged fields dont get overwritten)</h2>}
        {type === "delete" && <h2 className="modalTitle">Are you sure you want to delete this todo (cannot go back)</h2>}
        {type === "complete!" && <h2 className="modalTitle">Are you sure you want to complete this todo (deletes it)</h2>}
        <Button text={type} onClick={clickHandler} h="20%" w="35%" />
      </div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
}
